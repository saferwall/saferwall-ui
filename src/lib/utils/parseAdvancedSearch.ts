export const autoCompleteData = {
	logicalOperators: [
		{
			value: "and",
			description: "AND logical operator"
		},
		{
			value: "or",
			description: "OR logical operator"
		},
		{
			value: "AND",
			description: "AND logical operator"
		},
		{
			value: "OR",
			description: "OR logical operator"
		},
	],
	groupingOperators: [
		{
			value: "(",
			description: "Opening grouping operator"
		},
		{
			value: ")",
			description: "Closing grouping operator"
		}
	],
	comparisonOperators: [
		{
			value: "=",
			description: "Equality comparison operator"
		},
		{
			value: "!=",
			description: "Innequality comparison operator"
		},
		{
			value: ">",
			description: "Strictly greater than comparison operator"
		},
		{
			value: "<",
			description: "Strictly lesser than comparison operator"
		},
		{
			value: ">=",
			description: "Greater or equal to comparison operator"
		},
		{
			value: "<=",
			description: "Lesser or equal to comparison operator"
		}
	],
	keys: [] as { value: string; description: string }[]
} satisfies Record<string, { value: string; description: string }[]>;

const logicalOperators = autoCompleteData.logicalOperators.map((o) => o.value);
const groupingOperators = autoCompleteData.groupingOperators.map((o) => o.value);
const comparisonOperators = autoCompleteData.comparisonOperators.map((o) => o.value);

let i = 0;
let str = "";
let parsingResult = [] as ParsingResult

type ParsingResult = {type: ConsumerStrings, value: string}[]
function consumerMain(re: RegExp | string, flags = "") {
	re = new RegExp(re, "y" + flags);
	re.lastIndex = i;
	let res = re.exec(str);
	if (res) {
		i = re.lastIndex;
	}
	return [res, re] as [RegExpExecArray | null, RegExp];
}

export type ConsumerStrings = Exclude<keyof typeof Consumers, "prototype">;
export type ConsumerThrow = [
	lastIndex: number,
	// fatal: boolean,
	expected: ConsumerStrings[],
	regexes: string[]
]

function toReLiteral(str: string) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function whitespace(wsRe: string | RegExp, re: string | RegExp) {
	function reStr(str: string | RegExp) {
		return new RegExp(str).source;
	}
	return reStr(`(${reStr(wsRe)})(${reStr(re)})`);
}

function groupStart() {
	return !!parsingResult.length && parsingResult.at(-1)?.type === "openingGroupingOperator";
}

const comparisonOperatorRe = whitespace(/\s*/, comparisonOperators.map((o) => toReLiteral(o)).toSorted((strA, strB) => strB.length - strA.length).join("|"));
const keyRe = () => whitespace(groupStart() ? /\s*/ : /^|\s+/, `[^\\s${toReLiteral(groupingOperators.join("") + comparisonOperators.join(""))}]+`);
const valueRe = whitespace(/\s*/, `[^\\s${toReLiteral(groupingOperators[1])}]+`);
const logicalOperatorRe = whitespace(/\s+/, logicalOperators.map((o) => toReLiteral(o)).join("|"));
const openingGroupingOperatorRe = () => whitespace(groupStart() ? /\s*/ : /^|\s+/, toReLiteral(groupingOperators[0]));
const closingGroupingOperatorRe = whitespace(/\s*/, toReLiteral(groupingOperators[1]));
const endOfStringRe = whitespace(/\s*/, /$/);

class Consumers {
	static whitespace() {}
	static key() {
		return consumerMain(keyRe());
	}
	static comparisonOperator() {
		return consumerMain(comparisonOperatorRe);
	}
	static value() {
		return consumerMain(valueRe);
	}
	static logicalOperator() {
		return consumerMain(logicalOperatorRe
			// , "i" <-- unnecessary if uppercase and lowercase are both present in logical operators
		);
	}
	static openingGroupingOperator() {
		return consumerMain(openingGroupingOperatorRe());
	}
	static closingGroupingOperator() {
		return consumerMain(closingGroupingOperatorRe);
	}
	static endOfString() {
		return consumerMain(endOfStringRe);
	}
}

export function parseSearch(_str: string): [ParsingResult, ConsumerThrow | null] {

	/*** INIT ***/
	// console.log("parseSearch");
	str = _str;
	i = 0;
	parsingResult = []
	/*** INIT ***/

	function parse(depth = 0) {
		// let fatal = () => i != str.length;
		function consume(consumers: {
			[K in ConsumerStrings]?: Parameters<(typeof Consumers)[K]> | (typeof Consumers)[K];
		}, options: { mode: "or" | "and", targets?: ConsumerStrings[] } = { mode: "or", targets: undefined }) {
			let { targets, mode } = options;
			let key: ConsumerStrings;
			let regexes = [] as RegExp[];
			if (mode === "or") {
				for (key in consumers) {
					let args = consumers[key] as any[];
					if (typeof consumers[key] === "function") {
						args = [];
					}
					let [res, re] = (Consumers[key] as (...args: any[]) => [RegExpExecArray | null, RegExp])(...args);
					regexes.push(re);
					if (res) {
						parsingResult.push({ type: "whitespace", value: res[1] })
						parsingResult.push({ type: key, value: res[2] })
						return [res[2]] as [string]
					};
				}
				throw [
					i,
					// fatal(),
					targets || Object.keys(consumers) as ConsumerStrings[]
					// .map((key) =>
					// 	key.replace(/[A-Z]/g, (letter: string) => ` ${letter.toLowerCase()}`).trim()
					// )
					,
					regexes.map(re => re.source),
				] satisfies ConsumerThrow;
			} else {
				let pTargets: RegExpExecArray = [] as any as RegExpExecArray;
				for (key in consumers) {
					let args = consumers[key] as any[];
					if (typeof consumers[key] === "function") {
						args = [];
					}
					let [res, re] = (Consumers[key] as (...args: any[]) => [RegExpExecArray | null, RegExp])(...args);
					regexes.push(re);
					if (res) {
						pTargets[pTargets.length] = res[0]
						pTargets.length++;
						parsingResult.push({ type: key, value: res[0] })
						// return res
					} else {
						throw [
							i,
							// fatal(),
							targets || Object.keys(consumers) as ConsumerStrings[]
							// .map((key) =>
							// 	key.replace(/[A-Z]/g, (letter: string) => ` ${letter.toLowerCase()}`).trim()
							// )
							,
							regexes.map(re => re.source),
						] satisfies ConsumerThrow;
					};
				}
				return pTargets;
			}
		}
		let {
			key,
			comparisonOperator,
			value,
			logicalOperator,
			openingGroupingOperator,
			closingGroupingOperator,
			endOfString,
		} = Consumers;
		function parseKeyCmpValue() {
			let [res] = consume({ key, openingGroupingOperator });
			if (res === groupingOperators[0]) {
				parse(depth + 1);
				return;
			}
			consume({ comparisonOperator });
			consume({ value });
		}
		parseKeyCmpValue();
		while (true) {
			consume({ ...(depth ? { closingGroupingOperator } : { endOfString }), logicalOperator });
			if (parsingResult.at(-1)!.type !== "logicalOperator") {
				return;
			}
			parseKeyCmpValue();
		}
	}
	try {
		parse();
	} catch (e: any) {
		return [parsingResult, e]
	}
	return [parsingResult, null]
}