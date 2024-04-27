import { debounce } from "./debounce";

/**
 * Observes the intersection of an element with the viewport and triggers a callback when it becomes visible.
 * @param {HTMLElement} element - The element to observe for intersection.
 * @param {Function} callback - The callback function to execute when the element becomes visible.
 * @param {string} [eventType] - Optional. The HTML event type to listen for after the element becomes visible (e.g., "resize", "click", "keydown").
 * @param {number} [debounceTime] - Optional. The debounce time (in milliseconds) for the callback. If not provided, the callback will not be debounced.
 * @returns {void}
 * 
 * Example usage:
 * const containers = document.querySelectorAll('.my-container');
 * const firstContainer = containers[0];
 * 
 * function handleClick(){
 *   console.log("click")
 * }
 * 
 * observeIntersection(firstContainer, handleClick, "click", 200));
**/

// Reusable intersection observer function
export function observeIntersection(
  element: HTMLElement,
  callback: (e?: any) => void,
  eventType?: string,
  debounceTime?: number
): void {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback();

        // Remove the observer if needed
        observer.unobserve(entry.target);

        // Add the event listener when the container is in viewport
        if (eventType) {
          if (debounceTime) {
            window.addEventListener(eventType, debounce(callback, debounceTime));
          } else {
            window.addEventListener(eventType, callback);
          }
        } else {
          if (debounceTime) {
            debounce(callback, debounceTime)();
          }
        }
      }
    });
  });

  observer.observe(element);
}

