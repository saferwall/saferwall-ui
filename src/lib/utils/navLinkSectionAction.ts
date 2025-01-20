import type { Action } from "svelte/action";
import { replaceState } from "$app/navigation";

export const navLinkSectionAction: Action = (node) => {
	let box: ResizeObserverSize;
	let scrollListener = () => {
		let { scrollTop } = document.documentElement;
		if (scrollTop <= node.offsetTop + box.blockSize  && scrollTop >= node.offsetTop) {
			if (location.hash !== "#" + node.id) {
				// console.log({h: location.hash, id: node.id});
				// let temp = node.id;
				// node.id = "__invalid__";
				// location.hash = "#" + temp;
				// node.id = temp;
				replaceState(new URL(location.pathname + "#" + node.id, location.href), {})
			}
		}
		// else {
		// 	if (location.hash === "#" + node.id) {
		// 		// console.log({h: location.hash, id: node.id});
		// 		replaceState(location.pathname, {})
		// 	}
		// }
	}
	let observer = new ResizeObserver(([e]) => {
		[box] = e.borderBoxSize;
		scrollListener()
	})
	window.addEventListener("scroll", scrollListener);
	observer.observe(node, { box: "border-box" });
	return {
		destroy() {
			observer.disconnect();
			window.removeEventListener("scroll", scrollListener);
		}
	}
}