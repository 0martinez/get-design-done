#!/usr/bin/env node
'use strict';

/**
 * GDD Tools CLI — command router for Get Design Done workflows.
 *
 * Centralizes operations that workflows call via Bash, keeping
 * workflow markdown files clean of repetitive shell logic.
 *
 * Categories:
 *   State:     state-load, state-update, state-snapshot, state-add-decision, state-advance-phase
 *   Config:    config-load, config-update, config-get-adapter
 *   Init:      init-new-design, init-phase, init-resume
 *   Phase:     phase-list, phase-status, phase-create, phase-find
 *   Roadmap:   roadmap-parse, roadmap-progress, roadmap-add-phase
 *   Tokens:    tokens-parse, tokens-resolve, tokens-to-css, tokens-to-tailwind
 *   Template:  template-render, template-list
 *   Adapter:   adapter-detect, adapter-list, adapter-load
 *   Commands:  commands-list
 */

const { loadConfig, saveConfig, updateConfig, getAdapter } = require('./lib/config.cjs');
const { ensureDesignDir, readDesignFile, writeDesignFile, projectExists, formatOutput } = require('./lib/core.cjs');
const { cmdStateUpdate, cmdStateSnapshot, cmdStateAddDecision, cmdStateAdvancePhase } = require('./lib/state.cjs');
const { cmdInitNewDesign, cmdInitPhase, cmdInitResume, initProject } = require('./lib/init.cjs');
const { listPhases, phaseStatus, createPhase, findPhaseDir } = require('./lib/phase.cjs');
const { parseRoadmap, getProgress, addPhase } = require('./lib/roadmap.cjs');
const { parseTokens, resolveToken, tokensToCSSProperties, tokensToTailwind } = require('./lib/tokens.cjs');
const { renderTemplate, listTemplates } = require('./lib/template.cjs');
const { detectAdapter, listAdapters, loadAdapter } = require('./lib/adapter.cjs');
const { listCommands } = require('./lib/commands.cjs');

async function main() {
  const args = process.argv.slice(2);
  const raw = args.includes('--raw');

  // Support --cwd override for subagents
  let cwd = process.cwd();
  const cwdIdx = args.indexOf('--cwd');
  if (cwdIdx !== -1 && args[cwdIdx + 1]) {
    cwd = args[cwdIdx + 1];
    process.chdir(cwd);
  }

  const command = args[0];
  if (!command) {
    console.log('Usage: gdd-tools <command> [options]');
    console.log('Run "gdd-tools commands-list" for available commands.');
    process.exit(1);
  }

  let result;

  switch (command) {
    // === State operations ===
    case 'state-update': {
      const field = args[1];
      const value = args.slice(2).filter(a => !a.startsWith('--')).join(' ');
      result = cmdStateUpdate(field, value);
      break;
    }
    case 'state-snapshot': {
      result = cmdStateSnapshot();
      break;
    }
    case 'state-add-decision': {
      const decision = args.slice(1).filter(a => !a.startsWith('--')).join(' ');
      result = cmdStateAddDecision(decision);
      break;
    }
    case 'state-advance-phase': {
      const nextPhase = args[1];
      result = cmdStateAdvancePhase(nextPhase);
      break;
    }

    // === Config operations ===
    case 'config-load': {
      result = loadConfig();
      break;
    }
    case 'config-update': {
      const updates = JSON.parse(args[1] || '{}');
      result = updateConfig(updates);
      break;
    }
    case 'config-get-adapter': {
      result = { adapter: getAdapter() };
      break;
    }

    // === Init operations (compound) ===
    case 'init': {
      // Compound init commands for workflows
      const subcommand = args[1];
      switch (subcommand) {
        case 'new-design':
          result = cmdInitNewDesign(cwd);
          break;
        case 'phase':
          result = cmdInitPhase(args[2], cwd);
          break;
        case 'resume':
          result = cmdInitResume(cwd);
          break;
        default:
          result = { error: `Unknown init subcommand: ${subcommand}` };
      }
      break;
    }
    case 'init-project': {
      const adapter = args[1] || null;
      const mode = args[2] || 'interactive';
      result = initProject(cwd, { adapter, mode });
      break;
    }

    // === Phase operations ===
    case 'phase-list': {
      result = listPhases();
      break;
    }
    case 'phase-status': {
      const phaseNum = parseInt(args[1], 10);
      result = { phase: phaseNum, status: phaseStatus(phaseNum) };
      break;
    }
    case 'phase-create': {
      const phaseNum = parseInt(args[1], 10);
      const phaseName = args.slice(2).filter(a => !a.startsWith('--')).join(' ');
      const dir = createPhase(phaseNum, phaseName);
      result = { success: true, dir };
      break;
    }
    case 'phase-find': {
      const phaseNum = parseInt(args[1], 10);
      const dir = findPhaseDir(phaseNum);
      result = { phase: phaseNum, dir };
      break;
    }

    // === Roadmap operations ===
    case 'roadmap-parse': {
      result = parseRoadmap();
      break;
    }
    case 'roadmap-progress': {
      result = getProgress();
      break;
    }
    case 'roadmap-add-phase': {
      const name = args[1];
      const description = args[2] || '';
      const reqs = args[3] ? args[3].split(',') : [];
      result = addPhase(name, description, reqs);
      break;
    }

    // === Token operations ===
    case 'tokens-parse': {
      result = parseTokens();
      break;
    }
    case 'tokens-resolve': {
      const tokenName = args[1];
      const tokens = parseTokens();
      result = tokens ? { token: tokenName, value: resolveToken(tokenName, tokens) } : { error: 'No TOKENS.md found' };
      break;
    }
    case 'tokens-to-css': {
      const tokens = parseTokens();
      if (tokens) {
        result = { css: tokensToCSSProperties(tokens) };
      } else {
        result = { error: 'No TOKENS.md found' };
      }
      break;
    }
    case 'tokens-to-tailwind': {
      const tokens = parseTokens();
      if (tokens) {
        result = { tailwind: tokensToTailwind(tokens) };
      } else {
        result = { error: 'No TOKENS.md found' };
      }
      break;
    }

    // === Template operations ===
    case 'template-render': {
      const templateName = args[1];
      const vars = args[2] ? JSON.parse(args[2]) : {};
      const rendered = renderTemplate(templateName, vars);
      result = rendered ? { content: rendered } : { error: `Template not found: ${templateName}` };
      break;
    }
    case 'template-list': {
      result = { templates: listTemplates() };
      break;
    }

    // === Adapter operations ===
    case 'adapter-detect': {
      const tools = args[1] ? args[1].split(',') : [];
      result = { adapter: detectAdapter(tools) };
      break;
    }
    case 'adapter-list': {
      result = { adapters: listAdapters() };
      break;
    }
    case 'adapter-load': {
      const adapterName = args[1] || getAdapter();
      const content = loadAdapter(adapterName);
      result = content ? { adapter: adapterName, content } : { error: `Adapter not found: ${adapterName}` };
      break;
    }

    // === Command operations ===
    case 'commands-list': {
      result = { commands: listCommands() };
      break;
    }

    default:
      result = { error: `Unknown command: ${command}` };
      process.exit(1);
  }

  const output = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
  console.log(formatOutput(output, raw));
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
