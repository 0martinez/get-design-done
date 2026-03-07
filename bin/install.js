#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Colors
const cyan = '\x1b[36m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const dim = '\x1b[2m';
const reset = '\x1b[0m';

const pkg = require('../package.json');

const args = process.argv.slice(2);
const hasGlobal = args.includes('--global') || args.includes('-g');
const hasLocal = args.includes('--local') || args.includes('-l');
const hasUninstall = args.includes('--uninstall') || args.includes('-u');
const hasHelp = args.includes('--help') || args.includes('-h');

const banner = '\n' +
  cyan + '   ██████╗ ██████╗ ██████╗\n' +
  '  ██╔════╝ ██╔══██╗██╔══██╗\n' +
  '  ██║  ███╗██║  ██║██║  ██║\n' +
  '  ██║   ██║██║  ██║██║  ██║\n' +
  '  ╚██████╔╝██████╔╝██████╔╝\n' +
  '   ╚═════╝ ╚═════╝ ╚═════╝' + reset + '\n' +
  '\n' +
  '  Get Design Done ' + dim + 'v' + pkg.version + reset + '\n' +
  '  A design system framework for Claude Code.\n' +
  '  The design counterpart to Get Shit Done.\n';

console.log(banner);

if (hasHelp) {
  console.log(`  ${yellow}Usage:${reset} npx get-design-done [options]\n\n  ${yellow}Options:${reset}\n    ${cyan}-g, --global${reset}    Install globally (to ~/.claude/)\n    ${cyan}-l, --local${reset}     Install locally (to ./.claude/)\n    ${cyan}-u, --uninstall${reset} Remove GDD files\n    ${cyan}-h, --help${reset}      Show this help\n\n  ${yellow}Examples:${reset}\n    ${dim}# Install globally for all projects${reset}\n    npx get-design-done --global\n\n    ${dim}# Install to current project only${reset}\n    npx get-design-done --local\n`);
  process.exit(0);
}

// Determine install location
let targetDir;
if (hasGlobal) {
  const claudeDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
  targetDir = claudeDir;
} else if (hasLocal) {
  targetDir = path.join(process.cwd(), '.claude');
} else {
  // Default: ask or use local
  console.log(`  ${yellow}Where to install?${reset}`);
  console.log(`    ${cyan}--global${reset}  Install to ~/.claude/ (all projects)`);
  console.log(`    ${cyan}--local${reset}   Install to ./.claude/ (this project)\n`);
  console.log(`  ${dim}Run again with --global or --local${reset}\n`);
  process.exit(0);
}

const srcRoot = path.resolve(__dirname, '..');
const gddSrc = path.join(srcRoot, 'get-design-done');
const agentsSrc = path.join(srcRoot, 'agents');
const commandsSrc = path.join(srcRoot, 'commands');

if (hasUninstall) {
  console.log(`  ${yellow}Uninstalling GDD...${reset}\n`);
  const gddDest = path.join(targetDir, 'get-design-done');
  const agentsDest = path.join(targetDir, 'agents');
  const commandsDest = path.join(targetDir, 'commands', 'gdd');

  if (fs.existsSync(gddDest)) {
    fs.rmSync(gddDest, { recursive: true });
    console.log(`  ${green}Removed${reset} ${gddDest}`);
  }

  // Remove GDD agents (don't remove entire agents dir — other tools may use it)
  if (fs.existsSync(agentsDest)) {
    const gddAgents = fs.readdirSync(agentsDest).filter(f => f.startsWith('gdd-'));
    for (const agent of gddAgents) {
      fs.unlinkSync(path.join(agentsDest, agent));
      console.log(`  ${green}Removed${reset} agent: ${agent}`);
    }
  }

  // Remove GDD commands
  if (fs.existsSync(commandsDest)) {
    fs.rmSync(commandsDest, { recursive: true });
    console.log(`  ${green}Removed${reset} ${commandsDest}`);
  }

  console.log(`\n  ${green}GDD uninstalled.${reset}\n`);
  process.exit(0);
}

// Install
console.log(`  ${yellow}Installing GDD to ${targetDir}...${reset}\n`);

/**
 * Recursively copy a directory
 */
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy get-design-done/ framework
const gddDest = path.join(targetDir, 'get-design-done');
copyDir(gddSrc, gddDest);
console.log(`  ${green}Installed${reset} framework → ${dim}get-design-done/${reset}`);

// Copy agents/
const agentsDest = path.join(targetDir, 'agents');
if (!fs.existsSync(agentsDest)) fs.mkdirSync(agentsDest, { recursive: true });
if (fs.existsSync(agentsSrc)) {
  const agents = fs.readdirSync(agentsSrc).filter(f => f.startsWith('gdd-'));
  for (const agent of agents) {
    fs.copyFileSync(path.join(agentsSrc, agent), path.join(agentsDest, agent));
  }
  console.log(`  ${green}Installed${reset} ${agents.length} agents → ${dim}agents/${reset}`);
}

// Copy commands/gdd/
const commandsDest = path.join(targetDir, 'commands', 'gdd');
if (fs.existsSync(commandsSrc)) {
  copyDir(path.join(commandsSrc, 'gdd'), commandsDest);
  const commands = fs.readdirSync(commandsDest).filter(f => f.endsWith('.md'));
  console.log(`  ${green}Installed${reset} ${commands.length} commands → ${dim}commands/gdd/${reset}`);
}

// Make gdd-tools.cjs executable
const toolsPath = path.join(gddDest, 'bin', 'gdd-tools.cjs');
if (fs.existsSync(toolsPath)) {
  fs.chmodSync(toolsPath, '755');
}

console.log(`\n  ${green}GDD installed successfully!${reset}`);
console.log(`\n  ${yellow}Getting started:${reset}`);
console.log(`    1. Open a project in Claude Code`);
console.log(`    2. Run ${cyan}/gdd:new-design${reset} to initialize`);
console.log(`    3. Run ${cyan}/gdd:help${reset} for all commands\n`);
