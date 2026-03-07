'use strict';

const fs = require('fs');
const path = require('path');

const DESIGN_DIR = '.design';
const CONFIG_FILE = 'config.json';

/**
 * Default configuration for a new GDD project
 */
function getDefaultConfig() {
  return {
    version: '0.1.0',
    adapter: null,
    preferences: {
      color_scheme: 'light',
      commit_docs: true,
      search_gitignored: false
    },
    workflow: {
      mode: 'interactive',
      agents: {
        researcher: true,
        moodboard: true,
        critic: true,
        accessibility: true
      }
    }
  };
}

/**
 * Find the .design directory, walking up from cwd
 */
function findDesignRoot(startDir) {
  let dir = startDir || process.cwd();
  while (true) {
    const candidate = path.join(dir, DESIGN_DIR);
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

/**
 * Load config.json from .design/
 */
function loadConfig(designRoot) {
  const configPath = path.join(designRoot || findDesignRoot(), CONFIG_FILE);
  if (!fs.existsSync(configPath)) return getDefaultConfig();
  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch {
    return getDefaultConfig();
  }
}

/**
 * Save config.json to .design/
 */
function saveConfig(config, designRoot) {
  const root = designRoot || findDesignRoot();
  const configPath = path.join(root, CONFIG_FILE);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
}

/**
 * Update specific fields in config
 */
function updateConfig(updates, designRoot) {
  const config = loadConfig(designRoot);
  Object.assign(config, updates);
  saveConfig(config, designRoot);
  return config;
}

/**
 * Get the adapter name from config
 */
function getAdapter(designRoot) {
  const config = loadConfig(designRoot);
  return config.adapter || 'generic';
}

module.exports = {
  DESIGN_DIR,
  CONFIG_FILE,
  getDefaultConfig,
  findDesignRoot,
  loadConfig,
  saveConfig,
  updateConfig,
  getAdapter
};
