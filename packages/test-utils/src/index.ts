let counter = 0;

export function deterministicId(prefix = "TEST"): string {
  counter += 1;
  return prefix + "-" + String(counter).padStart(4, "0");
}

export function resetDeterministicIds(): void {
  counter = 0;
}
