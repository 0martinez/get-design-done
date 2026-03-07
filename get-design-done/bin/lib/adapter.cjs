'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Known MCP tool prefixes for each supported design tool
 */
const TOOL_SIGNATURES = {
  paper: 'mcp__paper__',
  pencil: 'mcp__pencil__'
};

/**
 * Detect which design tool MCP is available by checking for known tool prefixes.
 * This is called during gdd:new-design to auto-detect the adapter.
 *
 * Returns: 'paper' | 'pencil' | 'generic'
 */
function detectAdapter(availableTools) {
  if (!availableTools || !Array.isArray(availableTools)) return 'generic';

  for (const [adapter, prefix] of Object.entries(TOOL_SIGNATURES)) {
    if (availableTools.some(t => t.startsWith(prefix))) {
      return adapter;
    }
  }
  return 'generic';
}

/**
 * Get the adapter file path for a given adapter name
 */
function getAdapterPath(adapterName) {
  const gddRoot = path.resolve(__dirname, '..', '..');
  return path.join(gddRoot, 'adapters', `${adapterName}.md`);
}

/**
 * Load adapter content
 */
function loadAdapter(adapterName) {
  const adapterPath = getAdapterPath(adapterName);
  if (!fs.existsSync(adapterPath)) return null;
  return fs.readFileSync(adapterPath, 'utf8');
}

/**
 * Validate that an adapter file exists
 */
function adapterExists(adapterName) {
  return fs.existsSync(getAdapterPath(adapterName));
}

/**
 * List available adapters
 */
function listAdapters() {
  const gddRoot = path.resolve(__dirname, '..', '..');
  const adaptersDir = path.join(gddRoot, 'adapters');
  if (!fs.existsSync(adaptersDir)) return [];
  return fs.readdirSync(adaptersDir)
    .filter(f => f.endsWith('.md') && f !== 'adapter-interface.md')
    .map(f => f.replace('.md', ''));
}

module.exports = {
  TOOL_SIGNATURES,
  detectAdapter,
  getAdapterPath,
  loadAdapter,
  adapterExists,
  listAdapters
};
