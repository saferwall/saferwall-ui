import { processor } from "./viewer_processor";

self.onmessage = (e: MessageEvent<string>) => {
	processor.process(e.data).then((res) => {
		postMessage(res.toString());
	})
}