'use strict';

const fs = require('fs');
const path = require('path');
const { findDesignRoot } = require('./config.cjs');
const { readDesignFile, writeDesignFile } = require('./core.cjs');

const STATE_FILE = 'STATE.md';

/**
 * Extract a field value from STATE.md using **Field:** pattern
 */
function getField(content, fieldName) {
  const pattern = new RegExp(`\\*\\*${fieldName}:\\*\\*\\s*(.+)`, 'i');
  const match = content.match(pattern);
  return match ? match[1].trim() : null;
}

/**
 * Set a field value in STATE.md
 */
function setField(content, fieldName, value) {
  const pattern = new RegExp(`(\\*\\*${fieldName}:\\*\\*)\\s*.+`, 'i');
  if (pattern.test(content)) {
    return content.replace(pattern, `$1 ${value}`);
  }
  return content;
}

/**
 * Load STATE.md
 */
function loadState(designRoot) {
  const root = designRoot || findDesignRoot();
  if (!root) return null;
  return readDesignFile(STATE_FILE, root);
}

/**
 * Save STATE.md
 */
function saveState(content, designRoot) {
  return writeDesignFile(STATE_FILE, content, designRoot);
}

/**
 * Update a specific field in STATE.md
 */
function cmdStateUpdate(fieldName, value, designRoot) {
  const content = loadState(designRoot);
  if (!content) return { error: 'No STATE.md found' };
  const updated = setField(content, fieldName, value);
  saveState(updated, designRoot);
  return { success: true, field: fieldName, value };
}

/**
 * Get a snapshot of current state
 */
function cmdStateSnapshot(designRoot) {
  const content = loadState(designRoot);
  if (!content) return { error: 'No STATE.md found' };

  return {
    currentPhase: getField(content, 'Current Phase'),
    status: getField(content, 'Status'),
    adapter: getField(content, 'Adapter'),
    lastAction: getField(content, 'Last Action'),
    progress: getField(content, 'Progress')
  };
}

/**
 * Add a decision to the accumulated context
 */
function cmdStateAddDecision(decision, designRoot) {
  const content = loadState(designRoot);
  if (!content) return { error: 'No STATE.md found' };

  const marker = '## Accumulated Context';
  const idx = content.indexOf(marker);
  if (idx === -1) return { error: 'No Accumulated Context section' };

  const decisionsMarker = '### Recent Decisions';
  const dIdx = content.indexOf(decisionsMarker);
  if (dIdx === -1) {
    const insertAt = idx + marker.length;
    const updated = content.slice(0, insertAt) +
      `\n\n${decisionsMarker}\n- ${decision}` +
      content.slice(insertAt);
    saveState(updated, designRoot);
  } else {
    const insertAt = dIdx + decisionsMarker.length;
    const updated = content.slice(0, insertAt) +
      `\n- ${decision}` +
      content.slice(insertAt);
    saveState(updated, designRoot);
  }
  return { success: true };
}

/**
 * Advance to next phase
 */
function cmdStateAdvancePhase(nextPhase, designRoot) {
  let content = loadState(designRoot);
  if (!content) return { error: 'No STATE.md found' };

  content = setField(content, 'Current Phase', nextPhase);
  content = setField(content, 'Status', 'exploring');
  content = setField(content, 'Last Action', `Advanced to Phase ${nextPhase}`);
  saveState(content, designRoot);
  return { success: true, phase: nextPhase };
}

module.exports = {
  getField,
  setField,
  loadState,
  saveState,
  cmdStateUpdate,
  cmdStateSnapshot,
  cmdStateAddDecision,
  cmdStateAdvancePhase
};
