import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../test/axe';
import { Header } from './Header';

function FullExample() {
  return (
    <Header>
      <Header.Leading>
        <Header.Burger aria-label="Open menu" icon={<svg aria-hidden="true" />} />
        <Header.Brand href="/">LIGA360</Header.Brand>
      </Header.Leading>
      <Header.Nav aria-label="Main">
        <Header.NavItem href="/law" active>
          Законодавство
        </Header.NavItem>
        <Header.NavItem href="/court">Судова робота</Header.NavItem>
      </Header.Nav>
      <Header.Actions>
        <button aria-label="Search">S</button>
      </Header.Actions>
    </Header>
  );
}

describe('Header', () => {
  it('renders a banner landmark with the brand link', () => {
    render(
      <Header>
        <Header.Leading>
          <Header.Brand href="/">LIGA360</Header.Brand>
        </Header.Leading>
      </Header>,
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'LIGA360' })).toHaveAttribute('href', '/');
  });

  it('marks the active nav item with aria-current="page"', () => {
    render(
      <Header>
        <Header.Nav aria-label="Main">
          <Header.NavItem href="/law" active>
            Законодавство
          </Header.NavItem>
          <Header.NavItem href="/court">Судова робота</Header.NavItem>
        </Header.Nav>
      </Header>,
    );
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Законодавство' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Судова робота' })).not.toHaveAttribute('aria-current');
  });

  it('renders trailing actions', () => {
    render(
      <Header>
        <Header.Actions>
          <button aria-label="Search">S</button>
        </Header.Actions>
      </Header>,
    );
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('toggles the burger open state (uncontrolled) and reports changes', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Header onOpenChange={onOpenChange}>
        <Header.Leading>
          <Header.Burger aria-label="Open menu" icon={<svg aria-hidden="true" />} />
        </Header.Leading>
      </Header>,
    );
    // The burger is display:none on desktop (shown only when the nav collapses), so the
    // accessible-name algorithm doesn't compute its name at the test viewport. Query the lone
    // button directly; its name wiring (aria-label) is asserted separately.
    const burger = screen.getByRole('button', { hidden: true });
    expect(burger).toHaveAttribute('aria-label', 'Open menu');
    expect(burger).toHaveAttribute('aria-expanded', 'false');
    await user.click(burger);
    expect(burger).toHaveAttribute('aria-expanded', 'true');
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
  });

  it('respects a controlled open prop', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Header open onOpenChange={onOpenChange}>
        <Header.Leading>
          <Header.Burger aria-label="Open menu" icon={<svg aria-hidden="true" />} />
        </Header.Leading>
      </Header>,
    );
    // The burger is display:none on desktop (shown only when the nav collapses), so the
    // accessible-name algorithm doesn't compute its name at the test viewport. Query the lone
    // button directly; its name wiring (aria-label) is asserted separately.
    const burger = screen.getByRole('button', { hidden: true });
    expect(burger).toHaveAttribute('aria-expanded', 'true');
    await user.click(burger);
    expect(burger).toHaveAttribute('aria-expanded', 'true'); // controlled: unchanged
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('drops the signed-in flag when signedIn=false', () => {
    render(
      <Header signedIn={false}>
        <Header.Leading>
          <Header.Brand href="/">LIGA360</Header.Brand>
        </Header.Leading>
      </Header>,
    );
    expect(screen.getByRole('banner')).not.toHaveAttribute('data-signed-in');
  });

  it('sets the signed-in flag by default', () => {
    render(
      <Header>
        <Header.Leading>
          <Header.Brand href="/">LIGA360</Header.Brand>
        </Header.Leading>
      </Header>,
    );
    expect(screen.getByRole('banner')).toHaveAttribute('data-signed-in');
  });

  it('has no a11y violations (Liga360)', async () => {
    const { container } = render(<FullExample />);
    await expectNoA11yViolations(container);
  });

  it('has no a11y violations (United brand)', async () => {
    const { container } = render(
      <div data-brand="united">
        <FullExample />
      </div>,
    );
    await expectNoA11yViolations(container);
  });
});
