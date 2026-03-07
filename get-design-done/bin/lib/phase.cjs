'use strict';

const fs = require('fs');
const path = require('path');
const { findDesignRoot } = require('./config.cjs');
const { readDesignFile, writeDesignFile } = require('./core.cjs');

/**
 * Get phase directory name from phase number
 * Phase 1 is always "01-design-system"
 */
function phaseDir(phaseNum, phaseName) {
  const num = String(phaseNum).padStart(2, '0');
  const slug = phaseName ? phaseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') : `phase-${num}`;
  return `${num}-${slug}`;
}

/**
 * Get the path to a phase directory
 */
function phasePath(phaseNum, phaseName, designRoot) {
  const root = designRoot || findDesignRoot();
  return path.join(root, 'phases', phaseDir(phaseNum, phaseName));
}

/**
 * Find existing phase directory by number (searches for NN-*)
 */
function findPhaseDir(phaseNum, designRoot) {
  const root = designRoot || findDesignRoot();
  if (!root) return null;
  const phasesDir = path.join(root, 'phases');
  if (!fs.existsSync(phasesDir)) return null;

  const num = String(phaseNum).padStart(2, '0');
  const entries = fs.readdirSync(phasesDir);
  const match = entries.find(e => e.startsWith(`${num}-`));
  return match ? path.join(phasesDir, match) : null;
}

/**
 * List all phases
 */
function listPhases(designRoot) {
  const root = designRoot || findDesignRoot();
  if (!root) return [];
  const phasesDir = path.join(root, 'phases');
  if (!fs.existsSync(phasesDir)) return [];

  return fs.readdirSync(phasesDir)
    .filter(d => /^\d{2}-/.test(d))
    .sort()
    .map(d => {
      const num = parseInt(d.split('-')[0], 10);
      const name = d.replace(/^\d{2}-/, '').replace(/-/g, ' ');
      return { number: num, name, dir: d };
    });
}

/**
 * Create a phase directory with initial files
 */
function createPhase(phaseNum, phaseName, designRoot) {
  const root = designRoot || findDesignRoot();
  const dir = phasePath(phaseNum, phaseName, root);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Read a phase artifact (SPEC.md, CONTEXT.md, RENDERED.md, CRITIQUE.md)
 */
function readPhaseFile(phaseNum, fileName, designRoot) {
  const dir = findPhaseDir(phaseNum, designRoot);
  if (!dir) return null;
  const filePath = path.join(dir, fileName);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Write a phase artifact
 */
function writePhaseFile(phaseNum, fileName, content, designRoot) {
  const dir = findPhaseDir(phaseNum, designRoot);
  if (!dir) throw new Error(`Phase ${phaseNum} directory not found`);
  const filePath = path.join(dir, fileName);
  fs.writeFileSync(filePath, content);
  return filePath;
}

/**
 * Get phase status from its files
 */
function phaseStatus(phaseNum, designRoot) {
  const dir = findPhaseDir(phaseNum, designRoot);
  if (!dir) return 'not-started';

  const hasContext = fs.existsSync(path.join(dir, 'CONTEXT.md'));
  const hasSpec = fs.existsSync(path.join(dir, 'SPEC.md'));
  const hasRendered = fs.existsSync(path.join(dir, 'RENDERED.md'));
  const hasCritique = fs.existsSync(path.join(dir, 'CRITIQUE.md'));

  if (hasCritique) return 'critiqued';
  if (hasRendered) return 'rendered';
  if (hasSpec) return 'specified';
  if (hasContext) return 'explored';
  return 'created';
}

module.exports = {
  phaseDir,
  phasePath,
  findPhaseDir,
  listPhases,
  createPhase,
  readPhaseFile,
  writePhaseFile,
  phaseStatus
};
