export function* makeRanges(from: number, to: number, chunk: number): Generator<[number, number]> {
  let start = from;
  while (start <= to) {
    const end = Math.min(to, start + chunk - 1);
    yield [start, end];
    start = end + 1;
  }
}
