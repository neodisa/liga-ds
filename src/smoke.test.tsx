import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { expectNoA11yViolations } from '../test/axe';
import { version } from './index';

describe('toolchain smoke', () => {
  it('renders and queries DOM via Testing Library', () => {
    render(<button type="button">Hello Liga</button>);
    expect(screen.getByRole('button', { name: 'Hello Liga' })).toBeInTheDocument();
  });

  it('runs axe with zero violations on accessible markup', async () => {
    const { container } = render(
      <main>
        <h1>Liga DS</h1>
        <button type="button">Action</button>
      </main>,
    );
    await expectNoA11yViolations(container);
  });

  it('exposes a package version', () => {
    expect(version).toBeTypeOf('string');
  });
});
