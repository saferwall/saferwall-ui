import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";
import rehypeStarryNight from "rehype-starry-night";
import remarkCustomHeaderId from "remark-custom-header-id";
import { visit } from "unist-util-visit";
import type { Element } from "hast";

export const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(() => {
		return (tree) => {
		}
	})
	.use(remarkCustomHeaderId)
	.use(remarkRehype)
	.use(rehypeSanitize, { clobberPrefix: "" })
	.use(() => {
		return (tree) => {
			visit(tree, "element", (node: Element) => {
				if (node.tagName.match(/h[1-6]/) && typeof node.properties.id === "string") {
					let span: Element = {
						type: "element",
						tagName: "span",
						properties: {},
						children: node.children,
					}
					let anchor: Element = {
						type: "element",
						tagName: "a",
						properties: {
							href: "#" + node.properties.id,
							style: "padding: 0.1rem; border-radius: 5px; color: currentColor; text-align: baseline"
						},
						children: [
							{
								type: "element",
								tagName: "svg",
								properties: {
									"viewBox": "0 0 16 16",
									"version": "1.1",
									"width": "16",
									"height": "16",
									"aria-hidden": "true",
								},
								children: [
									{
										type: "element",
										tagName: "path",
										properties: {
											d: "m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z",
											fill: "currentColor",
										},
										children: [],
									}
								]
							}
						],
					}
					node.children = [
						span,
						anchor,
					]
					node.properties.class = "header-link"
				}
			})
		}
	})
	.use(rehypeStarryNight)
	.use(rehypeStringify);