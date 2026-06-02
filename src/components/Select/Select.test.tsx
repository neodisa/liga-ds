import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import { expectNoA11yViolations } from '../../../test/axe';
import { Select, type SelectOption } from './Select';

const OPTIONS: SelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular', disabled: true },
];

describe('Select', () => {
  it('shows the placeholder when nothing is selected', () => {
    render(<Select options={OPTIONS} placeholder="Pick framework" aria-label="Framework" />);
    expect(screen.getByRole('combobox', { name: 'Framework' })).toHaveTextContent('Pick framework');
  });

  it('opens a listbox of options on click and selects one (uncontrolled)', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} aria-label="Framework" />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(4);
    await user.click(screen.getByRole('option', { name: 'Vue' }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveTextContent('Vue');
  });

  it('supports controlled value + onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    function Controlled() {
      const [v, setV] = useState('react');
      return (
        <Select
          options={OPTIONS}
          value={v}
          onChange={(next) => {
            setV(next);
            onChange(next);
          }}
          aria-label="Framework"
        />
      );
    }
    render(<Controlled />);
    expect(screen.getByRole('combobox')).toHaveTextContent('React');
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: 'Svelte' }));
    expect(onChange).toHaveBeenCalledWith('svelte');
    expect(screen.getByRole('combobox')).toHaveTextContent('Svelte');
  });

  it('marks the selected option with aria-selected', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} defaultValue="vue" aria-label="Framework" />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: 'Vue' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('option', { name: 'React' })).toHaveAttribute('aria-selected', 'false');
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} disabled aria-label="Framework" />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('has no a11y violations (open)', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} defaultValue="react" aria-label="Framework" />);
    await user.click(screen.getByRole('combobox'));
    await expectNoA11yViolations(screen.getByRole('listbox'));
  });
});
