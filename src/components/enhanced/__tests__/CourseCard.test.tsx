import { render, screen } from '@testing-library/react';
import CourseCard from '../CourseCard';

describe('CourseCard', () => {
  it('renders title, description and badges', () => {
    render(
      <CourseCard
        title="AI Leadership Studio"
        description="Transform strategy with applied AI"
        duration="6 weeks"
        level="Intermediate"
        price="$980"
        category="AI & Automation"
        image="https://picsum.photos/seed/ai/400/300"
      />,
    );

    expect(screen.getByText('AI Leadership Studio')).toBeInTheDocument();
    expect(screen.getByText('Transform strategy with applied AI')).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    expect(screen.getByText('6 weeks')).toBeInTheDocument();
    expect(screen.getByText('$980')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view curriculum/i })).toBeInTheDocument();
  });
});
