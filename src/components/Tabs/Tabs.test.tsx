import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { expectNoA11yViolations } from '../../../test/axe';
import { Tabs } from './Tabs';

function Example() {
  return (
    <Tabs defaultValue="one">
      <Tabs.List aria-label="Sections">
        <Tabs.Tab value="one">One</Tabs.Tab>
        <Tabs.Tab value="two">Two</Tabs.Tab>
        <Tabs.Tab value="three">Three</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="one">Panel one</Tabs.Panel>
      <Tabs.Panel value="two">Panel two</Tabs.Panel>
      <Tabs.Panel value="three">Panel three</Tabs.Panel>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('renders a tablist and shows the selected panel only', () => {
    render(<Example />);
    expect(screen.getByRole('tablist', { name: 'Sections' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Panel one')).toBeInTheDocument();
    expect(screen.queryByText('Panel two')).not.toBeInTheDocument();
  });

  it('switches panels on click', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('tab', { name: 'Two' }));
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Panel two')).toBeInTheDocument();
    expect(screen.queryByText('Panel one')).not.toBeInTheDocument();
  });

  it('navigates with arrow keys', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('tab', { name: 'One' }));
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute('aria-selected', 'true');
  });

  it('wires tab/panel aria relationships', () => {
    render(<Example />);
    const tab = screen.getByRole('tab', { name: 'One' });
    const panel = screen.getByRole('tabpanel');
    expect(tab.getAttribute('aria-controls')).toBe(panel.id);
    expect(panel.getAttribute('aria-labelledby')).toBe(tab.id);
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Example />);
    await expectNoA11yViolations(container);
  });
});
