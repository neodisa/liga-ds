import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createRef } from 'react';
import { expectNoA11yViolations } from '../../../test/axe';
import { Text } from './Text';
import { Heading } from '../Heading/Heading';

describe('Text', () => {
  it('renders children in a span by default', () => {
    render(<Text>Закон і право</Text>);
    const el = screen.getByText('Закон і право');
    expect(el.tagName).toBe('SPAN');
  });

  it('applies the typography variant class', () => {
    render(<Text variant="h600-bold">Title</Text>);
    expect(screen.getByText('Title')).toHaveClass('liga-typo-h600-bold');
  });

  it('renders as a different element via `as`', () => {
    render(<Text as="p">Body</Text>);
    expect(screen.getByText('Body').tagName).toBe('P');
  });

  it('forwards ref and merges className', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Text ref={ref} className="custom">
        Hi
      </Text>,
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current).toHaveClass('custom');
  });

  it('passes through DOM props', () => {
    render(<Text data-testid="t" title="tip">x</Text>);
    expect(screen.getByTestId('t')).toHaveAttribute('title', 'tip');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Text as="p">Accessible paragraph</Text>);
    await expectNoA11yViolations(container);
  });
});

describe('Heading', () => {
  it('renders the matching heading element for the level', () => {
    render(<Heading level={1}>Page title</Heading>);
    expect(screen.getByRole('heading', { level: 1, name: 'Page title' })).toBeInTheDocument();
  });

  it('defaults to h2', () => {
    render(<Heading>Section</Heading>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('allows overriding the text style variant', () => {
    render(<Heading level={3} variant="h400-bold">Small h3</Heading>);
    expect(screen.getByRole('heading', { level: 3 })).toHaveClass('liga-typo-h400-bold');
  });
});
