#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const readline = require('readline');

// Colors
const cyan = '\x1b[36m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const red = '\x1b[31m';
const dim = '\x1b[2m';
const bold = '\x1b[1m';
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

// ── Helpers ─────────────────────────────────────────────────

function resolveTarget(isGlobal) {
  if (isGlobal) {
    return process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
  }
  return path.join(process.cwd(), '.claude');
}

const srcRoot = path.resolve(__dirname, '..');
const gddSrc = path.join(srcRoot, 'get-design-done');
const agentsSrc = path.join(srcRoot, 'agents');
const commandsSrc = path.join(srcRoot, 'commands');

// ── SHA256 Manifest ─────────────────────────────────────────

function fileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function generateManifest(dir, baseDir) {
  baseDir = baseDir || dir;
  const manifest = {};
  if (!fs.existsSync(dir)) return manifest;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      Object.assign(manifest, generateManifest(full, baseDir));
    } else {
      const rel = path.relative(baseDir, full);
      manifest[rel] = fileHash(full);
    }
  }
  return manifest;
}

function manifestPath(targetDir) {
  return path.join(targetDir, 'gdd-file-manifest.json');
}

function readManifest(targetDir) {
  const mp = manifestPath(targetDir);
  if (!fs.existsSync(mp)) return null;
  try { return JSON.parse(fs.readFileSync(mp, 'utf8')); }
  catch { return null; }
}

function writeManifest(targetDir, manifest) {
  fs.writeFileSync(manifestPath(targetDir), JSON.stringify(manifest, null, 2) + '\n');
}

/**
 * Before overwriting, detect user-modified files by comparing current hashes
 * to the stored manifest. Back up modified files to gdd-local-patches/.
 */
function saveLocalPatches(targetDir) {
  const oldManifest = readManifest(targetDir);
  if (!oldManifest) return [];

  const patches = [];
  const patchDir = path.join(targetDir, 'gdd-local-patches');

  for (const [rel, oldHash] of Object.entries(oldManifest)) {
    const absPath = path.join(targetDir, rel);
    if (!fs.existsSync(absPath)) continue;
    const currentHash = fileHash(absPath);
    if (currentHash !== oldHash) {
      // User modified this file — back it up
      const dest = path.join(patchDir, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(absPath, dest);
      patches.push(rel);
    }
  }

  return patches;
}

function reportLocalPatches(patches) {
  if (patches.length === 0) return;
  console.log(`\n  ${yellow}Local modifications detected and backed up:${reset}`);
  for (const p of patches) {
    console.log(`    ${dim}→${reset} gdd-local-patches/${p}`);
  }
  console.log(`  ${dim}Your changes are safe. Merge them back manually if needed.${reset}`);
}

// ── Orphan Cleanup ──────────────────────────────────────────

/**
 * Files removed in newer versions. Add relative paths here as needed.
 * Example: ['get-design-done/old-file.md']
 */
const ORPHANED_FILES = [];

function cleanupOrphanedFiles(targetDir) {
  for (const rel of ORPHANED_FILES) {
    const abs = path.join(targetDir, rel);
    if (fs.existsSync(abs)) {
      fs.unlinkSync(abs);
      console.log(`  ${dim}Cleaned up${reset} ${rel}`);
    }
  }
}

// ── File Copy ───────────────────────────────────────────────

function copyDir(src, dest, manifest, baseDir) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, manifest, baseDir);
    } else {
      fs.copyFileSync(srcPath, destPath);
      if (manifest && baseDir) {
        const rel = path.relative(baseDir, destPath);
        manifest[rel] = fileHash(destPath);
      }
    }
  }
}

// ── CLAUDE.md Injection (local installs only) ───────────────

const GDD_SECTION_START = '<!-- GDD:START -->';
const GDD_SECTION_END = '<!-- GDD:END -->';

function gddClaudeSection() {
  return `${GDD_SECTION_START}
## Get Design Done (GDD)

Framework installed at \`.claude/get-design-done/\`.

**Key commands:** \`/gdd:new-design\` · \`/gdd:help\` · \`/gdd:spec-phase N\` · \`/gdd:render-phase N\` · \`/gdd:critique-phase N\`

Run \`/gdd:new-design\` to get started, or \`/gdd:help\` for all commands.
${GDD_SECTION_END}`;
}

function injectClaudeMd(projectDir) {
  const claudeMdPath = path.join(projectDir, 'CLAUDE.md');
  const section = gddClaudeSection();

  if (!fs.existsSync(claudeMdPath)) {
    fs.writeFileSync(claudeMdPath, section + '\n');
    console.log(`  ${green}✓${reset} Created CLAUDE.md with GDD section`);
    return;
  }

  let content = fs.readFileSync(claudeMdPath, 'utf8');
  const startIdx = content.indexOf(GDD_SECTION_START);
  const endIdx = content.indexOf(GDD_SECTION_END);

  if (startIdx !== -1 && endIdx !== -1) {
    // Replace existing section
    content = content.slice(0, startIdx) + section + content.slice(endIdx + GDD_SECTION_END.length);
  } else {
    // Append
    content = content.trimEnd() + '\n\n' + section + '\n';
  }

  fs.writeFileSync(claudeMdPath, content);
  console.log(`  ${green}✓${reset} Updated CLAUDE.md with GDD section`);
}

function removeClaudeMdSection(projectDir) {
  const claudeMdPath = path.join(projectDir, 'CLAUDE.md');
  if (!fs.existsSync(claudeMdPath)) return;

  let content = fs.readFileSync(claudeMdPath, 'utf8');
  const startIdx = content.indexOf(GDD_SECTION_START);
  const endIdx = content.indexOf(GDD_SECTION_END);

  if (startIdx === -1 || endIdx === -1) return;

  // Remove section and any surrounding blank lines
  const before = content.slice(0, startIdx).replace(/\n{2,}$/, '\n');
  const after = content.slice(endIdx + GDD_SECTION_END.length).replace(/^\n{1,2}/, '\n');
  const result = (before + after).trim();

  if (result.length === 0) {
    fs.unlinkSync(claudeMdPath);
    console.log(`  ${green}✓${reset} Removed CLAUDE.md (was GDD-only)`);
  } else {
    fs.writeFileSync(claudeMdPath, result + '\n');
    console.log(`  ${green}✓${reset} Removed GDD section from CLAUDE.md`);
  }
}

// ── Install ─────────────────────────────────────────────────

function install(isGlobal) {
  const targetDir = resolveTarget(isGlobal);
  const locationLabel = isGlobal
    ? `${dim}~/.claude/${reset} ${dim}(global)${reset}`
    : `${dim}./.claude/${reset} ${dim}(local)${reset}`;

  console.log(`  ${yellow}Installing GDD to${reset} ${locationLabel}\n`);

  // 1. Save local patches (before overwriting)
  const patches = saveLocalPatches(targetDir);

  // 2. Clean up orphaned files from previous versions
  cleanupOrphanedFiles(targetDir);

  // 3. Copy files with fresh manifest
  const manifest = {};

  // Framework core
  const gddDest = path.join(targetDir, 'get-design-done');
  copyDir(gddSrc, gddDest, manifest, targetDir);
  console.log(`  ${green}✓${reset} Framework ${dim}get-design-done/${reset}`);

  // Agents
  const agentsDest = path.join(targetDir, 'agents');
  if (!fs.existsSync(agentsDest)) fs.mkdirSync(agentsDest, { recursive: true });
  if (fs.existsSync(agentsSrc)) {
    const agents = fs.readdirSync(agentsSrc).filter(f => f.startsWith('gdd-'));
    for (const agent of agents) {
      const src = path.join(agentsSrc, agent);
      const dest = path.join(agentsDest, agent);
      fs.copyFileSync(src, dest);
      manifest[path.relative(targetDir, dest)] = fileHash(dest);
    }
    console.log(`  ${green}✓${reset} ${agents.length} agents ${dim}agents/gdd-*${reset}`);
  }

  // Commands
  const commandsDest = path.join(targetDir, 'commands', 'gdd');
  if (fs.existsSync(commandsSrc)) {
    copyDir(path.join(commandsSrc, 'gdd'), commandsDest, manifest, targetDir);
    const commands = fs.readdirSync(commandsDest).filter(f => f.endsWith('.md'));
    console.log(`  ${green}✓${reset} ${commands.length} commands ${dim}commands/gdd/${reset}`);
  }

  // Make gdd-tools.cjs executable
  const toolsPath = path.join(gddDest, 'bin', 'gdd-tools.cjs');
  if (fs.existsSync(toolsPath)) {
    fs.chmodSync(toolsPath, '755');
  }

  // 4. Write manifest
  writeManifest(targetDir, manifest);

  // 5. Report patches
  reportLocalPatches(patches);

  // 6. CLAUDE.md injection (local only)
  if (!isGlobal) {
    injectClaudeMd(process.cwd());
  }

  // 7. Success
  console.log(`\n  ${green}${bold}GDD installed successfully!${reset}`);
  console.log(`\n  ${yellow}Getting started:${reset}`);
  console.log(`    1. Open a project in Claude Code`);
  console.log(`    2. Run ${cyan}/gdd:new-design${reset} to initialize`);
  console.log(`    3. Run ${cyan}/gdd:help${reset} for all commands\n`);
}

// ── Uninstall ───────────────────────────────────────────────

function uninstall(isGlobal) {
  const targetDir = resolveTarget(isGlobal);

  console.log(`  ${yellow}Uninstalling GDD...${reset}\n`);

  const gddDest = path.join(targetDir, 'get-design-done');
  const agentsDest = path.join(targetDir, 'agents');
  const commandsDest = path.join(targetDir, 'commands', 'gdd');
  const mp = manifestPath(targetDir);
  const patchDir = path.join(targetDir, 'gdd-local-patches');

  // Remove framework
  if (fs.existsSync(gddDest)) {
    fs.rmSync(gddDest, { recursive: true });
    console.log(`  ${green}✓${reset} Removed ${dim}get-design-done/${reset}`);
  }

  // Remove GDD agents (don't nuke entire agents dir)
  if (fs.existsSync(agentsDest)) {
    const gddAgents = fs.readdirSync(agentsDest).filter(f => f.startsWith('gdd-'));
    for (const agent of gddAgents) {
      fs.unlinkSync(path.join(agentsDest, agent));
    }
    if (gddAgents.length > 0) {
      console.log(`  ${green}✓${reset} Removed ${gddAgents.length} agents`);
    }
  }

  // Remove GDD commands
  if (fs.existsSync(commandsDest)) {
    fs.rmSync(commandsDest, { recursive: true });
    console.log(`  ${green}✓${reset} Removed ${dim}commands/gdd/${reset}`);
  }

  // Remove manifest
  if (fs.existsSync(mp)) {
    fs.unlinkSync(mp);
    console.log(`  ${green}✓${reset} Removed manifest`);
  }

  // Remove patches dir
  if (fs.existsSync(patchDir)) {
    fs.rmSync(patchDir, { recursive: true });
    console.log(`  ${green}✓${reset} Removed local patches`);
  }

  // Remove CLAUDE.md section (local only)
  if (!isGlobal) {
    removeClaudeMdSection(process.cwd());
  }

  console.log(`\n  ${green}GDD uninstalled.${reset}\n`);
}

// ── Interactive Prompt ──────────────────────────────────────

function promptLocation(callback) {
  // Non-TTY (CI, piped input) → default to global silently
  if (!process.stdin.isTTY) {
    callback(true);
    return;
  }

  console.log(`  ${yellow}Where would you like to install?${reset}\n`);
  console.log(`    ${bold}1)${reset} Global ${dim}(~/.claude/)${reset} — available in all projects`);
  console.log(`    ${bold}2)${reset} Local  ${dim}(./.claude/)${reset} — this project only\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Handle Ctrl+C
  rl.on('close', () => {
    console.log(`\n  ${dim}Cancelled.${reset}\n`);
    process.exit(0);
  });

  rl.question(`  ${cyan}Choose [1]:${reset} `, (answer) => {
    rl.close();
    const choice = answer.trim();
    if (choice === '' || choice === '1') {
      console.log('');
      callback(true);
    } else if (choice === '2') {
      console.log('');
      callback(false);
    } else {
      console.log(`\n  ${red}Invalid choice.${reset} Please enter 1 or 2.\n`);
      process.exit(1);
    }
  });
}

// ── Main ────────────────────────────────────────────────────

console.log(banner);

if (hasHelp) {
  console.log(`  ${yellow}Usage:${reset} npx get-design-done [options]\n`);
  console.log(`  ${yellow}Options:${reset}`);
  console.log(`    ${cyan}-g, --global${reset}    Install globally (to ~/.claude/)`);
  console.log(`    ${cyan}-l, --local${reset}     Install locally (to ./.claude/)`);
  console.log(`    ${cyan}-u, --uninstall${reset} Remove GDD files`);
  console.log(`    ${cyan}-h, --help${reset}      Show this help\n`);
  console.log(`  ${yellow}Examples:${reset}`);
  console.log(`    ${dim}# Interactive install${reset}`);
  console.log(`    npx get-design-done\n`);
  console.log(`    ${dim}# Install globally (non-interactive)${reset}`);
  console.log(`    npx get-design-done --global\n`);
  console.log(`    ${dim}# Install to current project only${reset}`);
  console.log(`    npx get-design-done --local\n`);
  console.log(`    ${dim}# Uninstall${reset}`);
  console.log(`    npx get-design-done --local --uninstall\n`);
  process.exit(0);
}

// Validate conflicting flags
if (hasGlobal && hasLocal) {
  console.log(`  ${red}Error:${reset} Cannot use --global and --local together.\n`);
  process.exit(1);
}

if (hasUninstall && !hasGlobal && !hasLocal) {
  console.log(`  ${red}Error:${reset} --uninstall requires --global or --local.\n`);
  process.exit(1);
}

// Dispatch
if (hasUninstall) {
  uninstall(hasGlobal);
} else if (hasGlobal || hasLocal) {
  install(hasGlobal);
} else {
  // Interactive mode
  promptLocation((isGlobal) => {
    install(isGlobal);
  });
}
