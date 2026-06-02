import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../test/axe';
import { Badge } from './Badge';
import { Tag } from '../Tag/Tag';
import { Chip } from '../Chip/Chip';

describe('Badge', () => {
  it('renders its content', () => {
    render(<Badge tone="success" variant="solid">New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders a dot with no text', () => {
    const { container } = render(<Badge tone="danger" dot />);
    expect(container.textContent).toBe('');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Badge tone="info" variant="subtle">Beta</Badge>);
    await expectNoA11yViolations(container);
  });
});

describe('Tag', () => {
  it('renders the label', () => {
    render(<Tag tone="primary">Frontend</Tag>);
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });

  it('renders a remove button that fires onRemove', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(
      <Tag onRemove={onRemove} removeLabel="Remove Frontend">
        Frontend
      </Tag>,
    );
    await user.click(screen.getByRole('button', { name: 'Remove Frontend' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('has no a11y violations with remove', async () => {
    const { container } = render(
      <Tag tone="success" onRemove={() => {}}>
        Done
      </Tag>,
    );
    await expectNoA11yViolations(container);
  });
});

describe('Chip', () => {
  it('reflects selected via aria-pressed', () => {
    const { rerender } = render(<Chip>Filter</Chip>);
    expect(screen.getByRole('button', { name: 'Filter' })).toHaveAttribute('aria-pressed', 'false');
    rerender(<Chip selected>Filter</Chip>);
    expect(screen.getByRole('button', { name: 'Filter' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('fires onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Chip onClick={onClick}>Filter</Chip>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Chip tone="primary" selected>Active</Chip>);
    await expectNoA11yViolations(container);
  });
});
