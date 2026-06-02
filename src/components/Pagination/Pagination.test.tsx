import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import { expectNoA11yViolations } from '../../../test/axe';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders a navigation landmark and marks the current page', () => {
    render(<Pagination count={5} defaultPage={2} />);
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
  });

  it('navigates on click (uncontrolled)', async () => {
    const user = userEvent.setup();
    render(<Pagination count={5} defaultPage={1} />);
    await user.click(screen.getByRole('button', { name: 'Go to page 3' }));
    expect(screen.getByRole('button', { name: 'Page 3' })).toHaveAttribute('aria-current', 'page');
  });

  it('disables previous at the start and next at the end', () => {
    const { rerender } = render(<Pagination count={5} page={1} />);
    expect(screen.getByRole('button', { name: 'Go to previous page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Go to next page' })).not.toBeDisabled();
    rerender(<Pagination count={5} page={5} />);
    expect(screen.getByRole('button', { name: 'Go to next page' })).toBeDisabled();
  });

  it('fires onPageChange and stays controlled', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination count={5} page={1} onPageChange={onPageChange} />);
    await user.click(screen.getByRole('button', { name: 'Go to next page' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
    // still controlled on page 1
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page');
  });

  it('collapses long ranges with an ellipsis', () => {
    render(<Pagination count={20} defaultPage={10} />);
    // ellipses on both sides
    const ellipses = screen.getAllByText('…');
    expect(ellipses.length).toBe(2);
    // boundaries present
    expect(screen.getByRole('button', { name: 'Go to page 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to page 20' })).toBeInTheDocument();
  });

  it('works as a controlled component', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [p, setP] = useState(1);
      return <Pagination count={5} page={p} onPageChange={setP} />;
    }
    render(<Controlled />);
    await user.click(screen.getByRole('button', { name: 'Go to page 4' }));
    expect(screen.getByRole('button', { name: 'Page 4' })).toHaveAttribute('aria-current', 'page');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Pagination count={10} defaultPage={3} />);
    await expectNoA11yViolations(container);
  });
});
