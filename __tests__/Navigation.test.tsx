import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from '@/components/enhanced/Navigation';

describe('Navigation', () => {
  it('renders top-level navigation items', () => {
    render(<Navigation />);

    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /infoverse digital-ed home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /programs/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /join the waitlist/i }).length).toBeGreaterThan(0);
  });

  it('opens dropdown and mobile navigation', async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    const dropdownTrigger = screen.getByRole('button', { name: /programs/i });
    await user.click(dropdownTrigger);
    const dropdown = screen.getByRole('menu');
    expect(within(dropdown).getByText(/STEM Excellence/i)).toBeInTheDocument();

    const toggle = screen.getByRole('button', { name: /toggle navigation/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    const mobileNav = screen.getByRole('navigation', { name: 'Mobile' });
    expect(mobileNav.parentElement?.className).toContain('max-h-[24rem]');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
