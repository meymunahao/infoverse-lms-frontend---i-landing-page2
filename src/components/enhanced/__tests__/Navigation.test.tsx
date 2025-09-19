import { fireEvent, render, screen } from '@testing-library/react';
import Navigation from '../Navigation';
import { AccessibilityProvider } from '@/hooks/useA11y';

describe('Navigation', () => {
  const setup = () =>
    render(
      <AccessibilityProvider>
        <Navigation />
      </AccessibilityProvider>,
    );

  it('toggles the mobile navigation menu', async () => {
    setup();
    const toggle = screen.getByRole('button', { name: /toggle navigation/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    const programButtons = screen.getAllByRole('button', { name: /programs/i });
    const mobileProgramsButton = programButtons[programButtons.length - 1];
    fireEvent.click(mobileProgramsButton);

    const aiLinks = await screen.findAllByText('AI Literacy');
    expect(aiLinks.length).toBeGreaterThan(0);
  });
});
