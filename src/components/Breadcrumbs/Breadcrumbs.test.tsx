import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { expectNoA11yViolations } from '../../../test/axe';
import { Breadcrumbs } from './Breadcrumbs';

function Example() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/docs">Docs</Breadcrumbs.Item>
      <Breadcrumbs.Item current>Tabs</Breadcrumbs.Item>
    </Breadcrumbs>
  );
}

describe('Breadcrumbs', () => {
  it('renders a navigation landmark with an accessible name', () => {
    render(<Example />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('renders links for non-current items and marks the current page', () => {
    render(<Example />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Docs' })).toBeInTheDocument();
    // current item is not a link
    expect(screen.queryByRole('link', { name: 'Tabs' })).not.toBeInTheDocument();
    expect(screen.getByText('Tabs')).toHaveAttribute('aria-current', 'page');
  });

  it('renders separators between items but not after the last', () => {
    const { container } = render(<Example />);
    expect(container.querySelectorAll('[aria-hidden="true"] svg').length).toBe(2);
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Example />);
    await expectNoA11yViolations(container);
  });
});
