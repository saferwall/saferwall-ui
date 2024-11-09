import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";

const processor = unified()
	.use(remarkParse)
	.use(remarkGfm);

self.onmessage = (e: MessageEvent<string>) => {
	let ret = processor.parse(e.data);
	postMessage(JSON.stringify(ret));
}