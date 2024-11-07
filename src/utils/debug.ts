const isDevelopment = import.meta.env.DEV;

export const debug = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log('[Debug]:', ...args);
    }
  },
  error: (...args: unknown[]) => {
    if (isDevelopment) {
      console.error('[Error]:', ...args);
    }
  },
  info: (...args: unknown[]) => {
    if (isDevelopment) {
      console.info('[Info]:', ...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn('[Warning]:', ...args);
    }
  }
};