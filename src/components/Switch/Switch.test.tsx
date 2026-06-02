import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../test/axe';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders a switch with a label and toggles on click (uncontrolled)', async () => {
    const user = userEvent.setup();
    render(<Switch defaultChecked={false}>Notifications</Switch>);
    const sw = screen.getByRole('switch', { name: 'Notifications' });
    expect(sw).not.toBeChecked();
    await user.click(sw);
    expect(sw).toBeChecked();
  });

  it('supports controlled checked + onChange (stays controlled)', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Switch checked={false} onChange={onChange}>
        x
      </Switch>,
    );
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('toggles with the keyboard (Space)', async () => {
    const user = userEvent.setup();
    render(<Switch defaultChecked={false}>x</Switch>);
    const sw = screen.getByRole('switch');
    sw.focus();
    await user.keyboard(' ');
    expect(sw).toBeChecked();
  });

  it('can be disabled', () => {
    render(<Switch disabled>x</Switch>);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('exposes aria-invalid when invalid', () => {
    render(<Switch invalid>x</Switch>);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-invalid', 'true');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Switch defaultChecked>Subscribe</Switch>);
    await expectNoA11yViolations(container);
  });
});
