export default function checkUrl(urlToCheck: string) {
  try {
    return new URL(urlToCheck);
  } catch {
    return false;
  }
}
