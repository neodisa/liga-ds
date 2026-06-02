import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { expectNoA11yViolations } from '../../../test/axe';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders initials from the name when there is no image', () => {
    render(<Avatar name="Serhii Arkhipov" />);
    const el = screen.getByRole('img', { name: 'Serhii Arkhipov' });
    expect(el).toHaveTextContent('SA');
  });

  it('renders an image when src is provided', () => {
    render(<Avatar name="Liga" src="/avatar.png" alt="Liga avatar" />);
    const el = screen.getByRole('img', { name: 'Liga avatar' });
    expect(el.querySelector('img')).toHaveAttribute('src', '/avatar.png');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Avatar name="Test User" />);
    await expectNoA11yViolations(container);
  });
});
