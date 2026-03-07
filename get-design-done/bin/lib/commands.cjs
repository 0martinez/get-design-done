'use strict';

const path = require('path');
const fs = require('fs');

/**
 * Get the GDD framework root directory
 */
function getGddRoot() {
  return path.resolve(__dirname, '..', '..');
}

/**
 * List all available GDD commands
 */
function listCommands() {
  const commandsDir = path.resolve(getGddRoot(), '..', 'commands', 'gdd');
  if (!fs.existsSync(commandsDir)) return [];
  return fs.readdirSync(commandsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));
}

/**
 * Get a command definition file path
 */
function getCommandPath(commandName) {
  const commandsDir = path.resolve(getGddRoot(), '..', 'commands', 'gdd');
  return path.join(commandsDir, `${commandName}.md`);
}

/**
 * Get a workflow definition file path
 */
function getWorkflowPath(workflowName) {
  return path.join(getGddRoot(), 'workflows', `${workflowName}.md`);
}

/**
 * Get an agent definition file path
 */
function getAgentPath(agentName) {
  const agentsDir = path.resolve(getGddRoot(), '..', '..', 'agents');
  return path.join(agentsDir, agentName.endsWith('.md') ? agentName : `${agentName}.md`);
}

/**
 * Get a reference file path
 */
function getReferencePath(refName) {
  return path.join(getGddRoot(), 'references', `${refName}.md`);
}

module.exports = {
  getGddRoot,
  listCommands,
  getCommandPath,
  getWorkflowPath,
  getAgentPath,
  getReferencePath
};
