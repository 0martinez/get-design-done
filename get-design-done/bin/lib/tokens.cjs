'use strict';

const fs = require('fs');
const path = require('path');
const { findDesignRoot } = require('./config.cjs');
const { readDesignFile, writeDesignFile } = require('./core.cjs');

const TOKENS_FILE = 'TOKENS.md';

/**
 * Parse TOKENS.md into structured data.
 * Extracts color, typography, spacing, and other tokens from markdown tables and code blocks.
 */
function parseTokens(designRoot) {
  const content = readDesignFile(TOKENS_FILE, designRoot || findDesignRoot());
  if (!content) return null;

  const tokens = {
    colors: {},
    typography: {},
    spacing: {},
    radii: {},
    shadows: {},
    layout: {},
    raw: content
  };

  // Parse color tokens from tables: | token-name | #hex | role |
  const colorTablePattern = /\|\s*([a-z0-9-]+)\s*\|\s*(#[0-9a-fA-F]{3,8}|(?:oklch|hsl|rgb)\([^)]+\))\s*\|\s*([^|]*)\|/g;
  let match;
  while ((match = colorTablePattern.exec(content)) !== null) {
    tokens.colors[match[1].trim()] = {
      value: match[2].trim(),
      role: match[3].trim()
    };
  }

  // Parse spacing tokens: | token-name | value |
  const spacingSection = extractSection(content, 'Spacing');
  if (spacingSection) {
    const spacingPattern = /\|\s*([a-z0-9-]+)\s*\|\s*(\d+(?:px|rem|em))\s*\|/g;
    while ((match = spacingPattern.exec(spacingSection)) !== null) {
      tokens.spacing[match[1].trim()] = match[2].trim();
    }
  }

  // Parse typography tokens from code blocks
  const typoSection = extractSection(content, 'Typography');
  if (typoSection) {
    const fontFamilyMatch = typoSection.match(/font-family:\s*(.+)/);
    if (fontFamilyMatch) tokens.typography.fontFamily = fontFamilyMatch[1].trim();

    const scalePattern = /\|\s*([a-z0-9-]+)\s*\|\s*(\d+px)\s*\|\s*([^|]*)\|\s*([^|]*)\|/g;
    while ((match = scalePattern.exec(typoSection)) !== null) {
      tokens.typography[match[1].trim()] = {
        size: match[2].trim(),
        weight: match[3].trim(),
        lineHeight: match[4].trim()
      };
    }
  }

  // Parse radii
  const radiiSection = extractSection(content, 'Border Radius');
  if (radiiSection) {
    const radiiPattern = /\|\s*([a-z0-9-]+)\s*\|\s*(\d+px)\s*\|/g;
    while ((match = radiiPattern.exec(radiiSection)) !== null) {
      tokens.radii[match[1].trim()] = match[2].trim();
    }
  }

  // Parse shadows
  const shadowSection = extractSection(content, 'Shadows');
  if (shadowSection) {
    const shadowPattern = /\|\s*([a-z0-9-]+)\s*\|\s*([^|]+)\s*\|/g;
    while ((match = shadowPattern.exec(shadowSection)) !== null) {
      const name = match[1].trim();
      const value = match[2].trim();
      if (name !== '---' && name !== 'Token') {
        tokens.shadows[name] = value;
      }
    }
  }

  return tokens;
}

/**
 * Extract a section from markdown by heading
 */
function extractSection(content, heading) {
  const pattern = new RegExp(`## ${heading}[^\n]*\n([\s\S]*?)(?=\n## |$)`, 'i');
  const match = content.match(pattern);
  return match ? match[1] : null;
}

/**
 * Resolve a token name to its CSS value
 */
function resolveToken(tokenName, tokens) {
  // Check each category
  for (const category of ['colors', 'spacing', 'radii', 'shadows']) {
    if (tokens[category] && tokens[category][tokenName]) {
      const val = tokens[category][tokenName];
      return typeof val === 'object' ? val.value : val;
    }
  }
  if (tokens.typography && tokens.typography[tokenName]) {
    return tokens.typography[tokenName];
  }
  return null;
}

/**
 * Generate CSS custom properties from tokens
 */
function tokensToCSSProperties(tokens) {
  const lines = [':root {'];

  // Colors
  for (const [name, data] of Object.entries(tokens.colors || {})) {
    const value = typeof data === 'object' ? data.value : data;
    lines.push(`  --color-${name}: ${value};`);
  }

  // Spacing
  for (const [name, value] of Object.entries(tokens.spacing || {})) {
    lines.push(`  --space-${name}: ${value};`);
  }

  // Radii
  for (const [name, value] of Object.entries(tokens.radii || {})) {
    lines.push(`  --radius-${name}: ${value};`);
  }

  // Shadows
  for (const [name, value] of Object.entries(tokens.shadows || {})) {
    lines.push(`  --shadow-${name}: ${value};`);
  }

  lines.push('}');
  return lines.join('\n');
}

/**
 * Generate Tailwind config from tokens
 */
function tokensToTailwind(tokens) {
  const config = {
    theme: {
      extend: {
        colors: {},
        spacing: {},
        borderRadius: {},
        boxShadow: {}
      }
    }
  };

  for (const [name, data] of Object.entries(tokens.colors || {})) {
    config.theme.extend.colors[name] = typeof data === 'object' ? data.value : data;
  }
  for (const [name, value] of Object.entries(tokens.spacing || {})) {
    config.theme.extend.spacing[name] = value;
  }
  for (const [name, value] of Object.entries(tokens.radii || {})) {
    config.theme.extend.borderRadius[name] = value;
  }
  for (const [name, value] of Object.entries(tokens.shadows || {})) {
    config.theme.extend.boxShadow[name] = value;
  }

  return `/** @type {import('tailwindcss').Config} */\nmodule.exports = ${JSON.stringify(config, null, 2)};\n`;
}

module.exports = {
  parseTokens,
  extractSection,
  resolveToken,
  tokensToCSSProperties,
  tokensToTailwind
};
