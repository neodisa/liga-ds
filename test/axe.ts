import axe from 'axe-core';
import { expect } from 'vitest';

/**
 * Run axe-core against a container and assert zero violations.
 *
 * Note: jsdom has no layout engine, so `color-contrast` cannot be evaluated here —
 * it is disabled in this helper and verified instead by the Playwright + axe pass
 * (finalize batch) which runs in a real browser.
 */
export async function expectNoA11yViolations(
  container: Element,
  options?: axe.RunOptions,
): Promise<void> {
  const results = await axe.run(container, {
    rules: { 'color-contrast': { enabled: false } },
    ...options,
  });

  if (results.violations.length > 0) {
    const summary = results.violations
      .map((v) => {
        const nodes = v.nodes.map((n) => `      ${n.target.join(' ')} → ${n.html}`).join('\n');
        return `  • [${v.id}] ${v.help} (${v.nodes.length} node(s))\n    ${v.helpUrl}\n${nodes}`;
      })
      .join('\n');
    expect.fail(`Expected no accessibility violations but found ${results.violations.length}:\n${summary}`);
  }

  expect(results.violations).toHaveLength(0);
}
