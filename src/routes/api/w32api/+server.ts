export async function GET({fetch}) {
	const res = await fetch("/data/w32apis-ui.json");
	const text = await res.text();
	const oneWeekInSec = 60 * 60 * 24 * 7 /* one week */;
	return new Response(text, {
		headers: {
			"Cache-control": `public, max-age=${oneWeekInSec}, s-maxage=${oneWeekInSec}`,
			"Content-type": "application/json; charset=UTF-8",
			"Content-length": text.length.toString(),
		},
	});
};