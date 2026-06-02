import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import { expectNoA11yViolations } from '../../../test/axe';
import { Checkbox } from './Checkbox';
import { Radio } from '../Radio/Radio';
import { RadioGroup } from '../Radio/RadioGroup';

describe('Checkbox', () => {
  it('renders a checkbox with a label and toggles on click', async () => {
    const user = userEvent.setup();
    render(<Checkbox defaultChecked={false}>Accept</Checkbox>);
    const cb = screen.getByRole('checkbox', { name: 'Accept' });
    expect(cb).not.toBeChecked();
    await user.click(cb);
    expect(cb).toBeChecked();
  });

  it('supports controlled checked + onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox checked={false} onChange={onChange}>x</Checkbox>);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('checkbox')).not.toBeChecked(); // stays controlled
  });

  it('reflects indeterminate on the DOM node', () => {
    render(<Checkbox indeterminate>x</Checkbox>);
    expect((screen.getByRole('checkbox') as HTMLInputElement).indeterminate).toBe(true);
  });

  it('can be disabled', () => {
    render(<Checkbox disabled>x</Checkbox>);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Checkbox defaultChecked>Subscribe</Checkbox>);
    await expectNoA11yViolations(container);
  });
});

describe('Radio / RadioGroup', () => {
  it('renders a radiogroup and selects on click (uncontrolled)', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup defaultValue="a" aria-label="Choice">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>,
    );
    expect(screen.getByRole('radio', { name: 'A' })).toBeChecked();
    await user.click(screen.getByRole('radio', { name: 'B' }));
    expect(screen.getByRole('radio', { name: 'B' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'A' })).not.toBeChecked();
  });

  it('supports controlled value', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [v, setV] = useState('a');
      return (
        <RadioGroup value={v} onChange={setV} aria-label="Choice">
          <Radio value="a">A</Radio>
          <Radio value="b">B</Radio>
        </RadioGroup>
      );
    }
    render(<Controlled />);
    await user.click(screen.getByRole('radio', { name: 'B' }));
    expect(screen.getByRole('radio', { name: 'B' })).toBeChecked();
  });

  it('disables all radios when the group is disabled', () => {
    render(
      <RadioGroup defaultValue="a" disabled aria-label="Choice">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>,
    );
    expect(screen.getByRole('radio', { name: 'A' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'B' })).toBeDisabled();
  });

  it('shares the same name across the group', () => {
    render(
      <RadioGroup defaultValue="a" aria-label="Choice">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>,
    );
    const a = screen.getByRole('radio', { name: 'A' }) as HTMLInputElement;
    const b = screen.getByRole('radio', { name: 'B' }) as HTMLInputElement;
    expect(a.name).toBe(b.name);
    expect(a.name).toBeTruthy();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <RadioGroup defaultValue="a" aria-label="Choice">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>,
    );
    await expectNoA11yViolations(container);
  });
});
