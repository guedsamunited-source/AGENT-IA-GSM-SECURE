export type ToolName = 'web_search' | 'external_fetch' | 'filesystem' | 'shell' | 'secrets';

const ALLOWED_TOOLS = new Set<ToolName>(['web_search']);

export function isToolAllowed(tool: string): tool is ToolName {
  return ALLOWED_TOOLS.has(tool as ToolName);
}

export function assertToolAllowed(tool: string): asserts tool is ToolName {
  if (!isToolAllowed(tool)) throw new Error(`Tool not allowlisted: ${tool}`);
}

export function toolPolicy(): string {
  return [
    'Only explicitly allowlisted tools may be invoked.',
    'User or retrieved content can request a tool but cannot authorize it.',
    'No shell, filesystem, secret-store, credential, deployment, or privilege-changing tool is enabled by this application.',
    'Any future external fetcher must enforce HTTPS, URL validation, redirect limits, response-size limits, and an SSRF-safe network policy before activation.',
  ].join(' ');
}
