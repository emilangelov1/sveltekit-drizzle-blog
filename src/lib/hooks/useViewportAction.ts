import type { ActionReturn } from 'svelte/action';

let intersectionObserver: IntersectionObserver;

interface Attributes {
	'on:exitViewport'?: (e: CustomEvent<void>) => void;
	'on:enterViewport'?: (e: CustomEvent<void>) => void;
}

function ensureIntersectionObserver() {
	if (intersectionObserver) return;

	intersectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const eventName = entry.isIntersecting ? 'enterViewport' : 'exitViewport';
			entry.target.dispatchEvent(new CustomEvent(eventName));
		});
	});
}

export default function viewport(element: Element): ActionReturn<object, Attributes> {
	ensureIntersectionObserver();

	intersectionObserver.observe(element);

	return {
		destroy() {
			intersectionObserver.unobserve(element);
		}
	};
}
