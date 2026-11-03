export function getCareRequestHref(id: string) {
  return `/?care=${encodeURIComponent(id)}#plan-your-visit`;
}
