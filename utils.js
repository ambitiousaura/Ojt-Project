// Small helper: creates a debounced version of a function.
// The returned function will wait "delay" ms after the last call before running.

export function debounce(fn, delay) {
  let timeoutId = null;

  return function (...args) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(function () {
      fn.apply(null, args);
    }, delay);
  };
}