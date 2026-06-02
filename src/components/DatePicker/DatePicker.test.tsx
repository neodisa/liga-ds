import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import { expectNoA11yViolations } from '../../../test/axe';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('shows the placeholder and opens a calendar grid', async () => {
    const user = userEvent.setup();
    render(<DatePicker aria-label="Date" placeholder="дд.мм.рррр" />);
    expect(screen.getByRole('button', { name: /Date/ })).toHaveTextContent('дд.мм.рррр');
    await user.click(screen.getByRole('button', { name: /Date/ }));
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('selects a day, closes, and reflects the value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    function Controlled() {
      const [d, setD] = useState<Date | null>(new Date(2026, 5, 1)); // 1 Jun 2026
      return (
        <DatePicker
          aria-label="Date"
          value={d}
          onChange={(next) => {
            setD(next);
            onChange(next);
          }}
        />
      );
    }
    render(<Controlled />);
    await user.click(screen.getByRole('button', { name: /Date/ }));
    await user.click(screen.getByRole('gridcell', { name: '15' }));
    expect(onChange).toHaveBeenCalledTimes(1);
    const picked = onChange.mock.calls[0][0] as Date;
    expect(picked.getDate()).toBe(15);
    expect(picked.getMonth()).toBe(5);
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
  });

  it('navigates months with the next/prev buttons', async () => {
    const user = userEvent.setup();
    render(<DatePicker aria-label="Date" value={new Date(2026, 5, 1)} />);
    await user.click(screen.getByRole('button', { name: /Date/ }));
    expect(screen.getByRole('grid')).toHaveAccessibleName(/червень 2026|June 2026/i);
    await user.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByRole('grid')).toHaveAccessibleName(/липень 2026|July 2026/i);
  });

  it('has no a11y violations (open)', async () => {
    const user = userEvent.setup();
    render(<DatePicker aria-label="Date" value={new Date(2026, 5, 1)} />);
    await user.click(screen.getByRole('button', { name: /Date/ }));
    await expectNoA11yViolations(screen.getByRole('grid'));
  });
});
