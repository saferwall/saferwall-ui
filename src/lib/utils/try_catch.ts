export function tryCatch<T>(arg: Promise<T>): Promise<[T, null]> | Promise<[null, { error: any }]> {
	// @ts-ignore
	return arg.then(res => { return [res, null] as [T, null] }).catch(e => { return [null, { error: e }] });
}