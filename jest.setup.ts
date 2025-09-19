import '@testing-library/jest-dom';

global.matchMedia =
  global.matchMedia ||
  function matchMedia() {
    return {
      matches: false,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
      media: '',
      onchange: null,
    } as MediaQueryList;
  };
