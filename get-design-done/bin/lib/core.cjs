'use strict';

const fs = require('fs');
const path = require('path');
const { DESIGN_DIR, findDesignRoot } = require('./config.cjs');

/**
 * Ensure .design/ directory exists with required subdirectories
 */
function ensureDesignDir(baseDir) {
  const root = path.join(baseDir || process.cwd(), DESIGN_DIR);
  const dirs = [
    '',
    'moodboard',
    'research',
    'system',
    'phases'
  ];
  for (const dir of dirs) {
    const fullPath = path.join(root, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  }
  return root;
}

/**
 * Read a file from .design/ directory
 */
function readDesignFile(relativePath, designRoot) {
  const root = designRoot || findDesignRoot();
  if (!root) return null;
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Write a file to .design/ directory
 */
function writeDesignFile(relativePath, content, designRoot) {
  const root = designRoot || findDesignRoot();
  if (!root) throw new Error('No .design/ directory found');
  const filePath = path.join(root, relativePath);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content);
  return filePath;
}

/**
 * Check if a .design/ project exists
 */
function projectExists(baseDir) {
  return findDesignRoot(baseDir) !== null;
}

/**
 * Format output — strip ANSI if --raw flag
 */
function formatOutput(text, raw) {
  if (raw) return text.replace(/\x1b\[[0-9;]*m/g, '');
  return text;
}

module.exports = {
  ensureDesignDir,
  readDesignFile,
  writeDesignFile,
  projectExists,
  formatOutput
};
