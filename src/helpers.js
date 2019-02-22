export function kebabToCamelCase(text) {
  return text.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}

export function spacesToBreak(text) {
  return text.replace(/\s/g, "<br>");
}

export function replaceUrl(str, decorator = '') {
  return str.replace(
    /https:\/\/instruction.austincc.edu\/tled/gi,
    decorator
  );
}

// negi - negative index
// This implements the use of negative indexes to count from the end of the array
// ie. array[-1] is always the last element
// The same as Python except the index can exceed the length of the array

export function negi(arr, index) {
  const length = arr.length;
  if (Math.abs(index) >= length) {
    index = index % length;
  }
  return index < 0 ? arr[length + index] : arr[index];
}
