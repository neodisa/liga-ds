import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { expectNoA11yViolations } from '../../../test/axe';
import { Input, SearchInput } from './Input';
import { Textarea } from '../Textarea/Textarea';
import { Field } from '../Field/Field';

describe('Input', () => {
  it('renders a textbox and accepts typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input aria-label="Name" onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: 'Name' });
    await user.type(input, 'Liga');
    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue('Liga');
  });

  it('forwards ref to the native input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="x" />);
    expect(ref.current?.tagName).toBe('INPUT');
  });

  it('sets aria-invalid when invalid', () => {
    render(<Input aria-label="x" invalid />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders left and right icons', () => {
    render(<Input aria-label="x" leftIcon={<svg data-testid="l" />} rightIcon={<svg data-testid="r" />} />);
    expect(screen.getByTestId('l')).toBeInTheDocument();
    expect(screen.getByTestId('r')).toBeInTheDocument();
  });

  it('is disabled when disabled', () => {
    render(<Input aria-label="x" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Input aria-label="Email" placeholder="you@liga.ua" />);
    await expectNoA11yViolations(container);
  });
});

describe('SearchInput', () => {
  it('renders a search field with a glyph', () => {
    render(<SearchInput aria-label="Search" />);
    const input = screen.getByRole('searchbox', { name: 'Search' });
    expect(input).toHaveAttribute('type', 'search');
  });
});

describe('Textarea', () => {
  it('renders a multiline textbox', () => {
    render(<Textarea aria-label="Bio" />);
    expect(screen.getByRole('textbox', { name: 'Bio' }).tagName).toBe('TEXTAREA');
  });

  it('sets aria-invalid when invalid', () => {
    render(<Textarea aria-label="Bio" invalid />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });
});

describe('Field', () => {
  it('links the label to the control', () => {
    render(
      <Field label="Email">
        <Input />
      </Field>,
    );
    // getByLabelText resolves the label→control association
    expect(screen.getByLabelText('Email')).toHaveRole('textbox');
  });

  it('wires description via aria-describedby', () => {
    render(
      <Field label="Email" description="We never share it.">
        <Input />
      </Field>,
    );
    const input = screen.getByLabelText('Email');
    const descId = input.getAttribute('aria-describedby');
    expect(descId).toBeTruthy();
    expect(document.getElementById(descId!.split(' ')[0])).toHaveTextContent('We never share it.');
  });

  it('marks invalid and announces the error', () => {
    render(
      <Field label="Email" error="Required">
        <Input />
      </Field>,
    );
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
    expect(input.getAttribute('aria-describedby')).toContain('-err');
  });

  it('marks required', () => {
    render(
      <Field label="Email" required>
        <Input />
      </Field>,
    );
    // asterisk is aria-hidden, so the accessible name stays "Email"
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('aria-required', 'true');
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <Field label="Email" description="Helper" required>
        <Input placeholder="you@liga.ua" />
      </Field>,
    );
    await expectNoA11yViolations(container);
  });
});
