'use strict';

const fs = require('fs');
const path = require('path');
const { ensureDesignDir, writeDesignFile } = require('./core.cjs');
const { getDefaultConfig, saveConfig, DESIGN_DIR } = require('./config.cjs');
const { renderTemplate } = require('./template.cjs');

/**
 * Initialize a new .design/ project directory with all required files
 */
function initProject(baseDir, options = {}) {
  const root = ensureDesignDir(baseDir);
  const config = getDefaultConfig();

  if (options.adapter) config.adapter = options.adapter;
  if (options.mode) config.workflow.mode = options.mode;

  saveConfig(config, root);

  return {
    success: true,
    root,
    config
  };
}

/**
 * Compound init for new-design workflow.
 * Returns paths and context needed by the workflow.
 */
function cmdInitNewDesign(baseDir) {
  const cwd = baseDir || process.cwd();
  const existingRoot = path.join(cwd, DESIGN_DIR);
  const exists = fs.existsSync(existingRoot);

  // Get GDD installation path for reference loading
  const gddRoot = path.resolve(__dirname, '..', '..');

  return {
    projectDir: cwd,
    designDir: existingRoot,
    exists,
    gddRoot,
    referencesDir: path.join(gddRoot, 'references'),
    templatesDir: path.join(gddRoot, 'templates'),
    adaptersDir: path.join(gddRoot, 'adapters'),
    workflowsDir: path.join(gddRoot, 'workflows')
  };
}

/**
 * Compound init for phase workflows.
 * Returns all context needed to work on a specific phase.
 */
function cmdInitPhase(phaseNum, baseDir) {
  const cwd = baseDir || process.cwd();
  const designRoot = path.join(cwd, DESIGN_DIR);

  if (!fs.existsSync(designRoot)) {
    return { error: 'No .design/ directory found. Run /gdd:new-design first.' };
  }

  const gddRoot = path.resolve(__dirname, '..', '..');
  const phasesDir = path.join(designRoot, 'phases');
  const num = String(phaseNum).padStart(2, '0');

  // Find existing phase dir
  let phaseDir = null;
  if (fs.existsSync(phasesDir)) {
    const entries = fs.readdirSync(phasesDir);
    const match = entries.find(e => e.startsWith(`${num}-`));
    if (match) phaseDir = path.join(phasesDir, match);
  }

  return {
    projectDir: cwd,
    designDir: designRoot,
    gddRoot,
    phaseNum: parseInt(phaseNum, 10),
    phaseDir,
    referencesDir: path.join(gddRoot, 'references'),
    adaptersDir: path.join(gddRoot, 'adapters'),
    briefPath: path.join(designRoot, 'BRIEF.md'),
    tokensPath: path.join(designRoot, 'TOKENS.md'),
    roadmapPath: path.join(designRoot, 'ROADMAP.md'),
    statePath: path.join(designRoot, 'STATE.md'),
    configPath: path.join(designRoot, 'config.json')
  };
}

/**
 * Compound init for progress/resume workflows
 */
function cmdInitResume(baseDir) {
  const cwd = baseDir || process.cwd();
  const designRoot = path.join(cwd, DESIGN_DIR);

  if (!fs.existsSync(designRoot)) {
    return { error: 'No .design/ directory found. Run /gdd:new-design first.' };
  }

  return {
    projectDir: cwd,
    designDir: designRoot,
    briefPath: path.join(designRoot, 'BRIEF.md'),
    tokensPath: path.join(designRoot, 'TOKENS.md'),
    roadmapPath: path.join(designRoot, 'ROADMAP.md'),
    statePath: path.join(designRoot, 'STATE.md'),
    configPath: path.join(designRoot, 'config.json')
  };
}

module.exports = {
  initProject,
  cmdInitNewDesign,
  cmdInitPhase,
  cmdInitResume
};
