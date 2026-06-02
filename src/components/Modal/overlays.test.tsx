import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { expectNoA11yViolations } from '../../../test/axe';
import { Tooltip } from '../Tooltip/Tooltip';
import { Popover } from '../Popover/Popover';
import { Modal } from './Modal';

describe('Tooltip', () => {
  it('shows on focus and hides on Escape', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Helpful tip" delay={0}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Trigger' })).toHaveFocus();
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Helpful tip');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

describe('Popover', () => {
  it('opens on click and closes on Escape', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <Popover.Trigger>
          <button type="button">Open</button>
        </Popover.Trigger>
        <Popover.Content>Panel content</Popover.Content>
      </Popover>,
    );
    expect(screen.queryByText('Panel content')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Panel content')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByText('Panel content')).not.toBeInTheDocument();
  });
});

describe('Modal', () => {
  function Example() {
    return (
      <Modal>
        <Modal.Trigger>
          <button type="button">Open modal</button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Title>Delete item</Modal.Title>
          <Modal.Description>This cannot be undone.</Modal.Description>
          <Modal.Close />
        </Modal.Content>
      </Modal>
    );
  }

  it('opens with an accessible name and closes via the close button', async () => {
    const user = userEvent.setup();
    render(<Example />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Open modal' }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAccessibleName('Delete item');
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Open modal' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('has no a11y violations when open', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Open modal' }));
    // Scan the dialog itself; @floating-ui's focus-guard spans are siblings, not part of the dialog.
    await expectNoA11yViolations(screen.getByRole('dialog'));
  });
});
