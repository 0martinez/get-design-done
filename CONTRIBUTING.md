# Contributing to Get Design Done

Thanks for your interest in contributing! GDD is a design framework for Claude Code — contributions don't require traditional coding skills.

## Adding a New Adapter

An adapter is a single markdown file that maps abstract design operations to MCP tool calls for a specific design tool. To add one:

1. Read `get-design-done/adapters/adapter-interface.md` — this defines every operation your adapter must implement.
2. Copy an existing adapter (e.g., `adapter-paper.md`) as a starting point.
3. Replace the MCP tool calls with the ones for your design tool.
4. Place your file in `get-design-done/adapters/` as `adapter-<toolname>.md`.

That's it. GDD will detect it automatically when the user's MCP config includes the matching tool.

## Adding Reference Files

Reference files encode design knowledge that agents load behind the scenes. They live in `get-design-done/references/` and cover topics like color theory, typography, spacing, and accessibility.

To add or improve a reference file:
- Keep the language precise but accessible — agents consume these, not end users.
- Include concrete examples and values, not just theory.
- Follow the structure of existing reference files.

## Adding Templates

Templates in `get-design-done/templates/` define the structure of generated artifacts (briefs, specs, critiques, etc.). Follow the `{{variable}}` placeholder convention used in existing templates.

## Project Structure

See the [README](README.md) for an overview. For deeper pattern reference, see [Get Shit Done](https://github.com/gsd-build/get-shit-done) — GDD follows the same architectural conventions for workflows, commands, and agents.

## Reporting Issues

Open an issue at [github.com/0martinez/get-design-done/issues](https://github.com/0martinez/get-design-done/issues). Include:
- What you expected vs. what happened
- Which design tool (Paper, generic, etc.)
- The phase/command you were running
