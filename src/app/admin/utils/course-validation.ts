import type { CourseFormErrors, CourseFormValues } from "../types";

const pricePattern = /^(?:\d+\.?\d{0,2})$/;

export function validateCourseForm(values: CourseFormValues): CourseFormErrors {
  const errors: CourseFormErrors = {};

  if (!values.title.trim()) {
    errors.title = "Course title is required.";
  }

  if (!values.instructor.trim()) {
    errors.instructor = "Instructor name is required.";
  }

  if (!values.price.trim()) {
    errors.price = "Price is required.";
  } else if (!pricePattern.test(values.price.trim())) {
    errors.price = "Enter a valid price (up to two decimals).";
  } else if (Number.parseFloat(values.price) < 0) {
    errors.price = "Price cannot be negative.";
  }

  if (!values.category.trim()) {
    errors.category = "Category is required.";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required.";
  } else if (values.description.trim().length < 20) {
    errors.description = "Description should be at least 20 characters long.";
  }

  if (!values.syllabus.trim()) {
    errors.syllabus = "Syllabus details are required.";
  } else if (values.syllabus.trim().length < 40) {
    errors.syllabus = "Syllabus should include more detail (minimum 40 characters).";
  }

  return errors;
}

export function hasFormErrors(errors: CourseFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
