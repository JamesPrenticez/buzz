// Reusable debounce function
export function debounce(func: (...args: any[]) => void, delay: number): () => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}
