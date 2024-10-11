import fs from "node:fs";

export async function GET() {
	const res = fs.readFileSync("./static/data/w32apis-ui.json", { encoding: "utf-8" });
	const oneWeekInSec = 60 * 60 * 24 * 7 /* one week */;
	return new Response(res, {
		headers: {
			"Cache-control": `public, max-age=${oneWeekInSec}, s-maxage=${oneWeekInSec}`,
			"Content-type": "application/json; charset=UTF-8",
			"Content-length": res.length.toString(),
		},
	});
};