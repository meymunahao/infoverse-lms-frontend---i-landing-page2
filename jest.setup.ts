import '@testing-library/jest-dom';

// Polyfill missing browser APIs for JSDOM
Object.defineProperty(global, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});
