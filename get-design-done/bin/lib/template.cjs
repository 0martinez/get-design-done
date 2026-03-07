'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Get the templates directory path
 */
function getTemplatesDir() {
  return path.resolve(__dirname, '..', '..', 'templates');
}

/**
 * Load a template file
 */
function loadTemplate(templateName) {
  const templatesDir = getTemplatesDir();
  const filePath = path.join(templatesDir, templateName);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Fill a template with variables.
 * Variables use {{VARIABLE_NAME}} syntax.
 */
function fillTemplate(template, vars) {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    const pattern = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    result = result.replace(pattern, value || '');
  }
  return result;
}

/**
 * Load and fill a template in one step
 */
function renderTemplate(templateName, vars) {
  const template = loadTemplate(templateName);
  if (!template) return null;
  return fillTemplate(template, vars || {});
}

/**
 * List available templates
 */
function listTemplates() {
  const dir = getTemplatesDir();
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { recursive: true })
    .filter(f => f.endsWith('.md') || f.endsWith('.json'));
}

module.exports = {
  getTemplatesDir,
  loadTemplate,
  fillTemplate,
  renderTemplate,
  listTemplates
};
