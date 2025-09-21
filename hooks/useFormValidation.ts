"use client";

import { useCallback, useMemo, useState } from "react";
import type { ZodSchema, ZodTypeAny } from "zod";

interface FormValidationState<T> {
  values: T;
  errors: Partial<Record<keyof T, string[]>>;
  isValid: boolean;
}

export const useFormValidation = <T extends Record<string, unknown>>(
  schema: ZodSchema<T> | ZodTypeAny,
  initialState: T,
) => {
  const [state, setState] = useState<FormValidationState<T>>({
    values: initialState,
    errors: {},
    isValid: true,
  });

  const validate = useCallback(
    (values: T) => {
      const result = schema.safeParse(values);
      if (result.success) {
        setState((prev) => ({
          ...prev,
          values,
          errors: {},
          isValid: true,
        }));
        return { isValid: true, errors: {} };
      }

      const errors = result.error.formErrors.fieldErrors as FormValidationState<T>["errors"];
      setState((prev) => ({
        ...prev,
        values,
        errors,
        isValid: false,
      }));
      return { isValid: false, errors };
    },
    [schema],
  );

  const setFieldValue = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setState((prev) => {
        const values = { ...prev.values, [key]: value } as T;
        const result = schema.safeParse(values);
        if (result.success) {
          return {
            values,
            errors: {},
            isValid: true,
          };
        }

        const errors = result.error.formErrors.fieldErrors as FormValidationState<T>["errors"];
        return {
          values,
          errors,
          isValid: false,
        };
      });
    },
    [schema],
  );

  const reset = useCallback(() => {
    setState({ values: initialState, errors: {}, isValid: true });
  }, [initialState]);

  return useMemo(
    () => ({
      values: state.values,
      errors: state.errors,
      isValid: state.isValid,
      setFieldValue,
      validate,
      reset,
    }),
    [state.errors, state.isValid, state.values, setFieldValue, validate, reset],
  );
};
