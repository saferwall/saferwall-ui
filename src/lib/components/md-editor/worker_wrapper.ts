export class WorkerWrapper<Request, Response = Request> {
	busy = false;
	cacheForNext: Request | undefined;
	worker: Worker;
	constructor(Worker: new () => Worker) {
		this.worker = new Worker();
	}
	postMessage(msg: Request) {
		if (this.busy) {
			this.cacheForNext = msg;
		} else {
			this.busy = true;
			this.worker.postMessage(msg);
		}
	}
	set onmessage(v: ((ev: MessageEvent<Response>) => any) | null) {
		if (!v)	return;
		this.worker.onmessage = (e: MessageEvent<Response>) => {
			v(e);
			if (this.cacheForNext !== undefined) {
				this.worker.postMessage(this.cacheForNext);
				this.cacheForNext = undefined;
			} else {
				this.busy = false;
			}
		};
	}
	terminate() {
		this.worker.terminate();
	}
}