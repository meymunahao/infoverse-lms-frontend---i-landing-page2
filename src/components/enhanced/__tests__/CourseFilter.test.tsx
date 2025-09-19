import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import CourseFilter, { CourseFilterValues } from '../CourseFilter';
import { AccessibilityProvider } from '@/hooks/useA11y';

const defaultValues: CourseFilterValues = {
  query: '',
  category: '',
  level: '',
  duration: '',
  price: '',
};

describe('CourseFilter', () => {
  it('notifies when filters change', () => {
    const handleChange = jest.fn();

    function Wrapper() {
      const [values, setValues] = useState(defaultValues);
      return (
        <AccessibilityProvider>
          <CourseFilter
            values={values}
            onChange={(updated) => {
              setValues(updated);
              handleChange(updated);
            }}
            categories={[
              { label: 'All categories', value: '' },
              { label: 'AI', value: 'AI' },
            ]}
            levels={[
              { label: 'All levels', value: '' },
              { label: 'Beginner', value: 'Beginner' },
            ]}
            durations={[
              { label: 'Any', value: '' },
              { label: '4 weeks', value: '4 weeks' },
            ]}
            priceRanges={[
              { label: 'Any', value: '' },
              { label: 'Under $800', value: 'under-800' },
            ]}
          />
        </AccessibilityProvider>
      );
    }

    render(<Wrapper />);

    fireEvent.change(screen.getByLabelText('Search courses'), {
      target: { value: 'AI' },
    });
    expect(handleChange).toHaveBeenCalledWith({ ...defaultValues, query: 'AI' });

    fireEvent.change(screen.getByRole('combobox', { name: /category/i }), {
      target: { value: 'AI' },
    });
    expect(handleChange).toHaveBeenLastCalledWith({ ...defaultValues, query: 'AI', category: 'AI' });
  });
});
