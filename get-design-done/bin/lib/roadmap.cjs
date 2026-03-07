'use strict';

const fs = require('fs');
const path = require('path');
const { findDesignRoot } = require('./config.cjs');
const { readDesignFile, writeDesignFile } = require('./core.cjs');
const { phaseStatus } = require('./phase.cjs');

const ROADMAP_FILE = 'ROADMAP.md';

/**
 * Parse ROADMAP.md into structured phase data
 */
function parseRoadmap(designRoot) {
  const content = readDesignFile(ROADMAP_FILE, designRoot || findDesignRoot());
  if (!content) return null;

  const phases = [];
  // Match phase entries: ## Phase N: Name
  const phasePattern = /## Phase (\d+): (.+)\n([\s\S]*?)(?=\n## Phase \d|$)/g;
  let match;
  while ((match = phasePattern.exec(content)) !== null) {
    const num = parseInt(match[1], 10);
    const name = match[2].trim();
    const body = match[3].trim();

    // Extract requirements mapped
    const reqPattern = /DES-\d+/g;
    const requirements = [];
    let reqMatch;
    while ((reqMatch = reqPattern.exec(body)) !== null) {
      requirements.push(reqMatch[0]);
    }

    // Extract success criteria
    const criteria = [];
    const criteriaSection = body.match(/### Success Criteria\n([\s\S]*?)(?=\n###|$)/);
    if (criteriaSection) {
      const lines = criteriaSection[1].split('\n').filter(l => l.trim().startsWith('-'));
      criteria.push(...lines.map(l => l.replace(/^-\s*/, '').trim()));
    }

    phases.push({
      number: num,
      name,
      requirements,
      successCriteria: criteria,
      status: phaseStatus(num, designRoot)
    });
  }

  return { phases, raw: content };
}

/**
 * Get progress summary
 */
function getProgress(designRoot) {
  const roadmap = parseRoadmap(designRoot);
  if (!roadmap) return null;

  const total = roadmap.phases.length;
  const completed = roadmap.phases.filter(p => p.status === 'critiqued').length;
  const inProgress = roadmap.phases.filter(p => !['not-started', 'critiqued'].includes(p.status)).length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Build progress bar
  const barLen = 20;
  const filled = Math.round(barLen * pct / 100);
  const bar = '\u2588'.repeat(filled) + '\u2591'.repeat(barLen - filled);

  return {
    total,
    completed,
    inProgress,
    percentage: pct,
    bar: `[${bar}] ${pct}%`,
    phases: roadmap.phases
  };
}

/**
 * Add a phase to the roadmap
 */
function addPhase(name, description, requirements, designRoot) {
  const root = designRoot || findDesignRoot();
  const content = readDesignFile(ROADMAP_FILE, root);
  if (!content) return { error: 'No ROADMAP.md found' };

  const roadmap = parseRoadmap(root);
  const nextNum = roadmap.phases.length + 1;

  const entry = `\n## Phase ${nextNum}: ${name}\n\n${description}\n\n### Requirements\n${(requirements || []).map(r => `- ${r}`).join('\n')}\n\n### Success Criteria\n- (to be defined during spec phase)\n`;

  const updated = content.trimEnd() + '\n' + entry;
  writeDesignFile(ROADMAP_FILE, updated, root);

  return { success: true, phase: nextNum, name };
}

module.exports = {
  parseRoadmap,
  getProgress,
  addPhase
};
