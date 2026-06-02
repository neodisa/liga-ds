import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../test/axe';
import { Alert } from './Alert';
import { Divider } from '../Divider/Divider';
import { Skeleton } from '../Skeleton/Skeleton';

describe('Alert', () => {
  it('renders title and message', () => {
    render(<Alert title="Heads up">Something happened</Alert>);
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('uses role="status" for info and role="alert" for danger', () => {
    const { rerender } = render(<Alert tone="info">x</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
    rerender(<Alert tone="danger">x</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('fires onClose from the dismiss button', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Alert onClose={onClose} closeLabel="Close alert">x</Alert>);
    await user.click(screen.getByRole('button', { name: 'Close alert' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <Alert tone="success" title="Saved" onClose={() => {}}>
        Your changes are saved.
      </Alert>,
    );
    await expectNoA11yViolations(container);
  });
});

describe('Divider', () => {
  it('renders a separator with orientation', () => {
    const { rerender } = render(<Divider />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
    rerender(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });
});

describe('Skeleton', () => {
  it('renders a decorative placeholder', () => {
    const { container } = render(<Skeleton width={120} height={16} />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders multiple lines', () => {
    const { container } = render(<Skeleton lines={3} />);
    expect(container.firstElementChild?.children).toHaveLength(3);
  });
});
