import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../test/axe';
import { Menu } from './Menu';

function Example({ onEdit = () => {}, onDelete = () => {} }) {
  return (
    <Menu trigger={<button type="button">Actions</button>}>
      <Menu.Item onSelect={onEdit}>Edit</Menu.Item>
      <Menu.Item>Duplicate</Menu.Item>
      <Menu.Separator />
      <Menu.Item danger onSelect={onDelete}>Delete</Menu.Item>
    </Menu>
  );
}

describe('Menu', () => {
  it('opens on click and exposes role="menu" with menuitems', async () => {
    const user = userEvent.setup();
    render(<Example />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem')).toHaveLength(3);
  });

  it('calls onSelect and closes when an item is chosen', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    render(<Example onEdit={onEdit} />);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('has no a11y violations (open)', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await expectNoA11yViolations(screen.getByRole('menu'));
  });
});
