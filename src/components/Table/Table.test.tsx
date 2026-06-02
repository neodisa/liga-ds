import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../test/axe';
import { Table } from './Table';

function Basic() {
  return (
    <Table caption="Users" zebra hoverable>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Role</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Serhii</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Olena</Table.Cell>
          <Table.Cell>Editor</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

describe('Table', () => {
  it('renders an accessible table with headers and rows', () => {
    render(<Basic />);
    expect(screen.getByRole('table', { name: 'Users' })).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    // 1 header row + 2 body rows
    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getByRole('cell', { name: 'Serhii' })).toBeInTheDocument();
  });

  it('supports a sortable header with aria-sort and onSort', async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell sortable sortDirection="ascending" onSort={onSort}>
              Name
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>A</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', 'ascending');
    await user.click(screen.getByRole('button', { name: /Name/ }));
    expect(onSort).toHaveBeenCalledTimes(1);
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Basic />);
    await expectNoA11yViolations(container);
  });
});
