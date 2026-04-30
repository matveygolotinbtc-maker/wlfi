export async function withRetry<T>(fn: () => Promise<T>, retries = 4, baseMs = 350): Promise<T> {
  let err: unknown;
  for (let i = 0; i <= retries; i += 1) {
    try { return await fn(); } catch (e) { err = e; }
    await new Promise((r) => setTimeout(r, baseMs * (2 ** i)));
  }
  throw err;
}
