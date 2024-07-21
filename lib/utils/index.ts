export function randomElement(array: Array<any>) {
  return array[Math.floor(Math.random() * array.length)];
}

export * from "./cssVar";
export * from "./getRenderContainer";
export * from "./isTextSelected";
