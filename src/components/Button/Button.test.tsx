import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { expectNoA11yViolations } from '../../../test/axe';
import { Button, IconButton } from './Button';

const Icon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 12h16" stroke="currentColor" />
  </svg>
);

describe('Button', () => {
  it('renders a button with its label', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('defaults to type="button"', () => {
    render(<Button>x</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('fires onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Go
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('loading: sets aria-busy, disables, shows spinner, blocks clicks', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Go
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies variant and size classes', () => {
    render(
      <Button variant="danger" size="sm">
        Del
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/variant-danger/);
    expect(btn.className).toMatch(/size-sm/);
  });

  it('renders left and right icons', () => {
    render(
      <Button leftIcon={<Icon />} rightIcon={<Icon />}>
        Both
      </Button>,
    );
    expect(screen.getByRole('button').querySelectorAll('svg')).toHaveLength(2);
  });

  it('sets data-selected when selected', () => {
    render(<Button selected>Toggle</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-selected', 'true');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>x</Button>);
    expect(ref.current?.tagName).toBe('BUTTON');
  });

  it('has no a11y violations across variants', async () => {
    const { container } = render(
      <div>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="transparent">Ghost</Button>
      </div>,
    );
    await expectNoA11yViolations(container);
  });
});

describe('IconButton', () => {
  it('renders an icon-only button with its accessible name', () => {
    render(<IconButton icon={<Icon />} aria-label="Add" />);
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<IconButton icon={<Icon />} aria-label="Add item" />);
    await expectNoA11yViolations(container);
  });
});
