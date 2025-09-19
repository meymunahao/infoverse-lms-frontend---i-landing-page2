import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CourseCard, { type Course } from '@/components/enhanced/CourseCard';

const course: Course = {
  id: 'test-course',
  title: 'Test Driven Learning',
  description: 'Master algorithms with practical challenges.',
  category: 'STEM',
  level: 'Intermediate',
  duration: '6 weeks',
  price: '£149',
  image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80',
};

describe('CourseCard', () => {
  it('renders course content and metadata', () => {
    render(<CourseCard course={course} />);

    expect(screen.getByRole('button', { name: course.title })).toBeInTheDocument();
    expect(screen.getByText(course.title)).toBeInTheDocument();
    expect(screen.getByText(course.description)).toBeInTheDocument();
    expect(screen.getByText(course.level)).toBeInTheDocument();
    expect(screen.getByText(course.price)).toBeInTheDocument();
    expect(screen.getByText(course.duration)).toBeInTheDocument();
  });

  it('invokes onSelect when activated', async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();

    render(<CourseCard course={course} onSelect={handleSelect} />);

    const button = screen.getByRole('button', { name: course.title });

    await user.click(button);
    expect(handleSelect).toHaveBeenCalledTimes(1);

    button.focus();
    await user.keyboard('{Enter}');
    expect(handleSelect).toHaveBeenCalledTimes(2);
  });
});
