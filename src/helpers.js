export function kebabToCamelCase(text) {
  return text.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}

export function spacesToBreak(text) {
  return text.replace(/\s/g, "<br>");
}

export function replaceUrl(str) {
  return str.replace(/href="https:\/\/instruction.austincc.edu\/tled/gi, 'href="');
}