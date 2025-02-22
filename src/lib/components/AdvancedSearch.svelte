<script lang="ts">
	import { onMount } from "svelte";
	import TabsImproved from "./cards/TabsImproved.svelte";
	import Button from "./form/Button.svelte";
	import Input from "./form/Input.svelte";
	import Icon from "./Icon.svelte";
	import { Configuration, FileApi, type FileFileSearchAutocomplete, type PaginationPages } from "$lib/api";
	import { autoCompleteData, parseSearch, type ConsumerThrow, type ParsingResult } from "$lib/utils/parseAdvancedSearch";
	import type { Saferwall } from "$lib/types";
	import CheckBox from "./form/CheckBox.v2.svelte";
	import { convertBytes, timestampToFormattedDate } from "$lib/utils";

	export let advanced: boolean;
	export let session: Saferwall.Session;

	const api = new FileApi(new Configuration({accessToken: session.token}));

	let search = "";
	let searchEditHistory = [search];
	let searchEditHistoryIndex = 0;
	function searchEditHistoryPush(...newValues: string[]) {
		let spliced = searchEditHistory.toSpliced(searchEditHistoryIndex + 1);
		newValues = newValues.filter((nv, index) => newValues.indexOf(nv) === index).filter((nv, index, arr) => {
			let idx = -1 - index;
			return spliced.at(idx) !== nv
		});
		if (newValues.length) {
			searchEditHistory = spliced;
			searchEditHistory = [...searchEditHistory, ...newValues];
			searchEditHistoryIndex = searchEditHistory.length - 1;
		}
	}
	function setSearch(nv: string, pushOldValue = true) {
		nv = nv.replace(/\u200B/g, "");
		if (pushOldValue) {
			searchEditHistoryPush(search, nv);
		} else {
			searchEditHistoryPush(nv);
		}
		search = nv;
	}
	let suggestion = "";
	let currentTab = "Search all";
	let perPage = 10;
	let page = 1;

	let pages: PaginationPages | undefined = JSON.parse(`{"page":1,"per_page":100,"page_count":1180,"total_count":117903,"items":[{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709148914,"id":"08740b537f34e0aed31e7fc629bd51995f946aa3b82504c7e5623b1e70d6f227","last_scanned":1709148937,"multiav":{"hits":12,"total":14},"name":"08740b537f34e0aed31e7fc629bd51995f946aa3b82504c7e5623b1e70d6f227","size":37153,"tags":{"avira":"Spy","pe":"sys","windefender":"Lolyda"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709757294,"id":"0989bd8c42893746a888d2eb8ee2639983e628351c7864d822b000ad3b198f4c","last_scanned":1709757317,"multiav":{"hits":11,"total":14},"name":"0989bd8c42893746a888d2eb8ee2639983e628351c7864d822b000ad3b198f4c","size":37153,"tags":{"avira":"Spy","pe":"sys","windefender":"Lolyda"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709254237,"id":"0893ca2d3e81e1169cb336fc3bd6c1980ca7cb02feb93e25ed733277374909e4","last_scanned":1709254260,"multiav":{"hits":11,"total":14},"name":"0893ca2d3e81e1169cb336fc3bd6c1980ca7cb02feb93e25ed733277374909e4","size":6524,"tags":{"avira":"Gamarue","eset":"Bundpil","packer":"vc","pe":"sys","windefender":"Gamarue"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709221722,"id":"08883147d60182712bbab0be4862850bc69fc222b22e6954cfff6d17f3595a11","last_scanned":1709221747,"multiav":{"hits":8,"total":14},"name":"08883147d60182712bbab0be4862850bc69fc222b22e6954cfff6d17f3595a11","size":602112,"tags":{"avira":"Agent","packer":"vc","pe":"sys"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709084254,"id":"0860035804c420b4b2292c3f4b0fb0e54d7cdca73d13e26f8664cb07928a9f4a","last_scanned":1709084277,"multiav":{"hits":11,"total":14},"name":"0860035804c420b4b2292c3f4b0fb0e54d7cdca73d13e26f8664cb07928a9f4a","size":4096,"tags":{"avira":"kdz","eset":"Bundpil","packer":"vc","pe":"sys","windefender":"Gamarue"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1708999688,"id":"0844425243d96cef71fdc6ae5ac682d70bb6afc0001cde30a6f414045d718cf0","last_scanned":1708999718,"multiav":{"hits":8,"total":14},"name":"0844425243d96cef71fdc6ae5ac682d70bb6afc0001cde30a6f414045d718cf0","size":135168,"tags":{"avira":"Vundo","packer":"vc","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709611865,"id":"0961fb4102916de7d7760299e4ceb7ebf6f6397195671e60ba8dfa068281a9d6","last_scanned":1709611888,"multiav":{"hits":8,"total":14},"name":"0961fb4102916de7d7760299e4ceb7ebf6f6397195671e60ba8dfa068281a9d6","size":86016,"tags":{"avira":"Linkury","eset":"Linkury","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1708891066,"id":"0823b6bf2f76165be9cf853936483e3ef4405e7ae6b8d884ab19aba18bfd24cc","last_scanned":1708891091,"multiav":{"hits":6,"total":14},"name":"0823b6bf2f76165be9cf853936483e3ef4405e7ae6b8d884ab19aba18bfd24cc","size":543848,"tags":{"avira":"Adware","packer":"mfc","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1708933732,"id":"0830f238857bbc4c972f17f378150e8c68b34fb83707e39259f8d3918ee2ba17","last_scanned":1708933757,"multiav":{"hits":8,"total":14},"name":"0830f238857bbc4c972f17f378150e8c68b34fb83707e39259f8d3918ee2ba17","size":96768,"tags":{"avira":"Arcadeweb","eset":"Gamevance","packer":"vc","pe":"sys"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1612176781,"id":"04bcf8e891d6e6dc071f51852c17bbf4da69f4b3de885faf128f89d73a3e7723","last_scanned":1693635711,"multiav":{"hits":10,"total":14},"name":"04bcf8e891d6e6dc071f51852c17bbf4da69f4b3de885faf128f89d73a3e7723","size":49152,"tags":{"avira":"BHO","eset":"Koutodoor","packer":"vc","pe":"sys","windefender":"Koutodoor"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709567377,"id":"0953ce8ab8ad17c462b8eb322db8aeda32237335fa73126fa1111aeefc3c07bb","last_scanned":1709567400,"multiav":{"hits":2,"total":14},"name":"0953ce8ab8ad17c462b8eb322db8aeda32237335fa73126fa1111aeefc3c07bb","size":19245,"tags":{"packer":"mingw","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709065487,"id":"08562151225c11eb0acf61fa21983a2cd76dd0a8250e88f86356cf8fe60aa648","last_scanned":1709065512,"multiav":{"hits":1,"total":14},"name":"08562151225c11eb0acf61fa21983a2cd76dd0a8250e88f86356cf8fe60aa648","size":393216,"tags":{"eset":"GameHack","packer":"vc","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1708919146,"id":"08289712cf2938b9af6335c0b0bf9dd709ebe94f2aeff5146c80594309f41780","last_scanned":1708919171,"multiav":{"hits":0,"total":14},"name":"08289712cf2938b9af6335c0b0bf9dd709ebe94f2aeff5146c80594309f41780","size":696832,"tags":{"packer":"delphi","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1612176177,"id":"046ad50453e46b42cabba5ba0aef7fee5a590da0fac3477d96ffbeda84c7929d","last_scanned":1693424020,"multiav":{"hits":8,"total":14},"name":"046ad50453e46b42cabba5ba0aef7fee5a590da0fac3477d96ffbeda84c7929d","size":233472,"tags":{"avira":"AdSpy","packer":"vc","pe":"sys","windefender":"Zlob"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709026355,"id":"08492a254bd2168d0df792a11590a7da69a8f4821570d2ee06e99b8ca7ffe34b","last_scanned":1709026379,"multiav":{"hits":11,"total":14},"name":"08492a254bd2168d0df792a11590a7da69a8f4821570d2ee06e99b8ca7ffe34b","size":83504,"tags":{"avira":"ULPM","packer":["upx","mfc"],"pe":"sys","windefender":"OnLineGames"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709387545,"id":"0920e3d5b6044360da9d54d673031ad91fe54354f9622901830d4b357d761f22","last_scanned":1709387569,"multiav":{"hits":9,"total":14},"name":"0920e3d5b6044360da9d54d673031ad91fe54354f9622901830d4b357d761f22","size":254292,"tags":{"eset":"Kryptik","packer":"vc","pe":"sys","windefender":"Reveton"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1708768710,"id":"08015e6e34027e0ca690ee2ccca38228a63092b0e9351997e0b992d946c765f0","last_scanned":1708768737,"multiav":{"hits":11,"total":14},"name":"08015e6e34027e0ca690ee2ccca38228a63092b0e9351997e0b992d946c765f0","size":9728,"tags":{"avira":"Gamarue","eset":"Bundpil","packer":"vc","pe":"sys","windefender":"Andromeda"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1708857279,"id":"0817914fd7e4fed09d7e94cbba63f1e6fc37fb985100f80f3a57c4ee580a0873","last_scanned":1708857304,"multiav":{"hits":9,"total":14},"name":"0817914fd7e4fed09d7e94cbba63f1e6fc37fb985100f80f3a57c4ee580a0873","size":308224,"tags":{"avira":"XPACK","eset":"Medfos","packer":"vc","pe":"sys","windefender":"Medfos"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709655603,"id":"09700a672f6a61f749ab973d078e2a6d1f42338e3b6ee416f4064abdfac9acfb","last_scanned":1709655630,"multiav":{"hits":11,"total":14},"name":"09700a672f6a61f749ab973d078e2a6d1f42338e3b6ee416f4064abdfac9acfb","size":244082,"tags":{"avira":"Ramnit","pe":"sys","windefender":"Ramnit"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709049762,"id":"0853769fe12a67666a517536ebf92123e9208dfffe116af25f12a646e9651833","last_scanned":1709049787,"multiav":{"hits":7,"total":14},"name":"0853769fe12a67666a517536ebf92123e9208dfffe116af25f12a646e9651833","size":244110,"tags":{"packer":"vc","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1708867614,"id":"081959ba333c797a6b4905720cf08ba4b09fde4d875f0cc011feafbb700d27e9","last_scanned":1708867638,"multiav":{"hits":12,"total":14},"name":"081959ba333c797a6b4905720cf08ba4b09fde4d875f0cc011feafbb700d27e9","size":34461,"tags":{"avira":"Spy","pe":"sys","windefender":"Lolyda"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709508912,"id":"09433a3f7a53286fc92a56aab6d85e7bc02bfc71fc2ad8f282ee386bd1688f30","last_scanned":1709508937,"multiav":{"hits":9,"total":14},"name":"09433a3f7a53286fc92a56aab6d85e7bc02bfc71fc2ad8f282ee386bd1688f30","size":669696,"tags":{"avira":"AdMoke","eset":"BHO","packer":"delphi","pe":"sys","windefender":"BHO"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1708535822,"id":"06048405e76416fd7b90f3b0d37311b5b859fcc2b44dff11b414f9874010ceb6","last_scanned":1708553918,"multiav":{"hits":11,"total":14},"name":"06048405e76416fd7b90f3b0d37311b5b859fcc2b44dff11b414f9874010ceb6","size":130252,"tags":{"avira":"Kykymber","packer":["upx","vc"],"pe":"sys","windefender":"OnLineGames"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1613795771,"id":"0505abb6a7691ee33311800583bdc56c6c99516c5cc8056fb5ee0b4225dabe65","last_scanned":1693802866,"multiav":{"hits":0,"total":14},"name":"0505abb6a7691ee33311800583bdc56c6c99516c5cc8056fb5ee0b4225dabe65","size":18432,"tags":{"packer":"masm","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709109181,"id":"086452d410f2eed6a981894fceb15ce8c5da5380e73946afd2e7928b70702142","last_scanned":1709109205,"multiav":{"hits":12,"total":14},"name":"086452d410f2eed6a981894fceb15ce8c5da5380e73946afd2e7928b70702142","size":87904,"tags":{"avira":"Kykymber","eset":"Kykymber","packer":"vc","pe":"sys","windefender":"OnLineGames"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1708882116,"id":"082231e59c7cc18173cca839936112da845b6091dde3d54953019dae4238e16b","last_scanned":1708882140,"multiav":{"hits":11,"total":14},"name":"082231e59c7cc18173cca839936112da845b6091dde3d54953019dae4238e16b","size":71303,"tags":{"avira":"Vundo","pe":"sys","windefender":"Vundo"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1708987357,"id":"0842104cbf321f11bbd1e3dab6ae643bd4368ddd6e64cba0ca7b9c8d3b69b9fe","last_scanned":1708987385,"multiav":{"hits":12,"total":14},"name":"0842104cbf321f11bbd1e3dab6ae643bd4368ddd6e64cba0ca7b9c8d3b69b9fe","size":78836,"tags":{"avira":"Kykymber","eset":"Kykymber","packer":"vc","pe":"sys","windefender":"OnLineGames"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709796282,"id":"0998b4b3e74b1051356f376fe887e483f6ec2869e79846abe1dd99fd6421fd94","last_scanned":1709796308,"multiav":{"hits":10,"total":14},"name":"0998b4b3e74b1051356f376fe887e483f6ec2869e79846abe1dd99fd6421fd94","size":1764222,"tags":{"avira":"XPACK","eset":"Kryptik","packer":"vc","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709433124,"id":"09292c7861f688a50334c10663ceeb7c3c01552e1be5962214179ce16b30cb9e","last_scanned":1709433148,"multiav":{"hits":1,"total":14},"name":"09292c7861f688a50334c10663ceeb7c3c01552e1be5962214179ce16b30cb9e","size":182384,"tags":{"packer":"vc","pe":"sys"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709524260,"id":"094623c4b3e2430878a7383d8fa537f470657335c526124aab4435c20dfc3541","last_scanned":1709524283,"multiav":{"hits":11,"total":14},"name":"094623c4b3e2430878a7383d8fa537f470657335c526124aab4435c20dfc3541","size":9728,"tags":{"avira":"Gamarue","eset":"Bundpil","packer":"vc","pe":"sys","windefender":"Andromeda"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709617508,"id":"0962f7741c07fe7a93afe5d1e38e96f72fce999988c8409290fb82a7851829b8","last_scanned":1709617537,"multiav":{"hits":7,"total":14},"name":"0962f7741c07fe7a93afe5d1e38e96f72fce999988c8409290fb82a7851829b8","size":131072,"tags":{"avira":"Agent","packer":"vc","pe":"sys"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709478895,"id":"09377a425a0d494fb9c6eb74e658cae9dfdd80d16a8103cbb8186b7019cb4e8d","last_scanned":1709478918,"multiav":{"hits":12,"total":14},"name":"09377a425a0d494fb9c6eb74e658cae9dfdd80d16a8103cbb8186b7019cb4e8d","size":69836,"tags":{"avira":"Kykymber","eset":"Kykymber","packer":"vc","pe":"sys","windefender":"OnLineGames"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1670923786,"id":"1043eba9c054650c309f9574e02c99af8afb5468d100181bafd6144b0b5b583b","last_scanned":1670923809,"multiav":{"hits":12,"total":14},"name":"VirusShare_1fac2e76ad7fc439038469da8138bcf0","size":6145,"tags":{"avira":"ATRAPS","eset":"Padodor","pe":"sys","windefender":"Berbew"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709235664,"id":"0890a848dbb1d5d109fea711d6d9a05b318e38fd9406ff85eff776deecf187fe","last_scanned":1709235688,"multiav":{"hits":8,"total":14},"name":"0890a848dbb1d5d109fea711d6d9a05b318e38fd9406ff85eff776deecf187fe","size":86016,"tags":{"avira":"Linkury","eset":"Linkury","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709745917,"id":"0987a91f8d2dace9cd253df2ba059bb16ebdeb7663364b9c77276f5bb49b621f","last_scanned":1709745939,"multiav":{"hits":1,"total":14},"name":"0987a91f8d2dace9cd253df2ba059bb16ebdeb7663364b9c77276f5bb49b621f","size":52606,"tags":{"packer":"vc","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709681835,"id":"09755ed10abd0252277e8e4ca635c0577e33769717c80e56bbadeafe00d30ea5","last_scanned":1709681858,"multiav":{"hits":9,"total":14},"name":"09755ed10abd0252277e8e4ca635c0577e33769717c80e56bbadeafe00d30ea5","size":51712,"tags":{"avira":"ATRAPS","pe":"sys","windefender":"Vundo"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709663682,"id":"0971f25452cd7087bc883fa7531c98ef30e1c0e0bcbdcb8d0240249870ac5386","last_scanned":1709663710,"multiav":{"hits":10,"total":14},"name":"0971f25452cd7087bc883fa7531c98ef30e1c0e0bcbdcb8d0240249870ac5386","size":368128,"tags":{"avira":"Patched","eset":"Patched","packer":"vc","pe":"sys","windefender":"Patchload"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709715564,"id":"098235d276893c817960003bd739f9b93e2a41572bc804fbe3ce7d720ffd120d","last_scanned":1709715587,"multiav":{"hits":11,"total":14},"name":"098235d276893c817960003bd739f9b93e2a41572bc804fbe3ce7d720ffd120d","size":70392,"tags":{"avira":"Kykymber","packer":"vc","pe":"sys","windefender":"OnLineGames"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709552908,"id":"095125b94a327384af07e2407820b84ef14962c226c53a75703534395a619a84","last_scanned":1709552934,"multiav":{"hits":12,"total":14},"name":"095125b94a327384af07e2407820b84ef14962c226c53a75703534395a619a84","size":648320,"tags":{"avira":"ATRAPS","eset":"BHO","packer":["aspack","delphi"],"pe":"sys","windefender":"Ldpinch"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709399365,"id":"092301f1c7df3bc2fd161d1c6deffcd4b65827135f8a19807487b1783cdee6d6","last_scanned":1709399389,"multiav":{"hits":12,"total":14},"name":"092301f1c7df3bc2fd161d1c6deffcd4b65827135f8a19807487b1783cdee6d6","size":123392,"tags":{"avira":"XPACK","pe":"sys","windefender":"Sality"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709261348,"id":"08951275491ad38d89befabb2c4e8b9f5ca3405d7c0f74e0d37e0d7fd41fd93c","last_scanned":1709261372,"multiav":{"hits":7,"total":14},"name":"08951275491ad38d89befabb2c4e8b9f5ca3405d7c0f74e0d37e0d7fd41fd93c","size":70656,"tags":{"avira":"Gamevan","eset":"Gamevance","packer":"vc","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709235462,"id":"0890a2c8ebe73fe1eaf8e54909f0544dc4798f1031b78229e7c73d95405b622a","last_scanned":1709235486,"multiav":{"hits":9,"total":14},"name":"0890a2c8ebe73fe1eaf8e54909f0544dc4798f1031b78229e7c73d95405b622a","size":69632,"tags":{"avira":"Backdoor","eset":"Farfli","packer":"vc","pe":"sys","windefender":"Farfli"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709154200,"id":"08750840e3161933820e40d7f21bb382938c3e5a15e94aaf7c014f1e8c0ec254","last_scanned":1709154229,"multiav":{"hits":11,"total":14},"name":"08750840e3161933820e40d7f21bb382938c3e5a15e94aaf7c014f1e8c0ec254","size":322417,"tags":{"avira":"Ramnit","packer":"vc","pe":"sys","windefender":"Ramnit"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709421658,"id":"0927229ff7c8a827ca8e4e0795eaa34edb3841fe9c3d6e5150b32d6ff28865cb","last_scanned":1709421681,"multiav":{"hits":12,"total":14},"name":"0927229ff7c8a827ca8e4e0795eaa34edb3841fe9c3d6e5150b32d6ff28865cb","size":45056,"tags":{"avira":"Kykymber","packer":["upx","vc"],"pe":"sys","windefender":"OnLineGames"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709588813,"id":"0957d8b37b8b32a5015c34d58df5eea1e405780c86b9ee501b67ce99a7487116","last_scanned":1709588837,"multiav":{"hits":10,"total":14},"name":"0957d8b37b8b32a5015c34d58df5eea1e405780c86b9ee501b67ce99a7487116","size":143393,"tags":{"avira":"Cendelf","eset":"Delf","packer":"delphi","pe":"sys","windefender":"Cendelf"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709340772,"id":"0910fb5474f6d9c000869d982eaf217c70478d6bfa1858d924bd1ed221607f54","last_scanned":1709340795,"multiav":{"hits":9,"total":14},"name":"0910fb5474f6d9c000869d982eaf217c70478d6bfa1858d924bd1ed221607f54","size":104960,"tags":{"avira":"Vundo","eset":"Kryptik","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709219963,"id":"0887e384943defad37901da18799814232cc550f5e309a038d583e7306bb5ba6","last_scanned":1709219987,"multiav":{"hits":8,"total":14},"name":"0887e384943defad37901da18799814232cc550f5e309a038d583e7306bb5ba6","size":147456,"tags":{"avira":"ZPACK","eset":"Kryptik","packer":"vc","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709735834,"id":"0985d84fcf68a85ef1269c5146cc153829e42bb410dc0575ec32d0e2cda0245f","last_scanned":1709735857,"multiav":{"hits":10,"total":14},"name":"0985d84fcf68a85ef1269c5146cc153829e42bb410dc0575ec32d0e2cda0245f","size":31073,"tags":{"avira":"NSPM","pe":"sys","windefender":"Obfuscator"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1708928414,"id":"08301de92446e557610256819052b45c25844ae6ea8dec2f6ddebdc949da1c63","last_scanned":1708928439,"multiav":{"hits":10,"total":14},"name":"08301de92446e557610256819052b45c25844ae6ea8dec2f6ddebdc949da1c63","size":237568,"tags":{"avira":"AGEN","eset":"Phobiq","packer":"vc","pe":"sys","windefender":"BHO"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709378539,"id":"0918750a5cef7b1bfd86ea79b71df862d5e0c9b9ca82d606b23c16d461a1210e","last_scanned":1709378564,"multiav":{"hits":9,"total":14},"name":"0918750a5cef7b1bfd86ea79b71df862d5e0c9b9ca82d606b23c16d461a1210e","size":552448,"tags":{"avira":"Hupigon","packer":["aspack","mfc"],"pe":"sys","windefender":"Pasur"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709404768,"id":"0923f0f32bff81b44aab3892a32567ce4109e55db8d40e9bd52f2b8783d1be53","last_scanned":1709404793,"multiav":{"hits":10,"total":14},"name":"0923f0f32bff81b44aab3892a32567ce4109e55db8d40e9bd52f2b8783d1be53","size":276480,"tags":{"avira":"AdMoke","eset":"BHO","packer":["upx","delphi"],"pe":"sys","windefender":"BHO"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709514520,"id":"094431fd86cb15c0ec37167c8830e652f0d32432e398c74ad26055df6f955700","last_scanned":1709514544,"multiav":{"hits":12,"total":14},"name":"094431fd86cb15c0ec37167c8830e652f0d32432e398c74ad26055df6f955700","size":78084,"tags":{"avira":"Spy","eset":"Kykymber","packer":["upx","vc"],"pe":"sys","windefender":"OnLineGames"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709456647,"id":"09337b9d808f9e9040a681dcbba8fdbfb5f986af846d63d55b66024cd042eaed","last_scanned":1709456680,"multiav":{"hits":8,"total":14},"name":"09337b9d808f9e9040a681dcbba8fdbfb5f986af846d63d55b66024cd042eaed","size":682496,"tags":{"avira":"Zlob","packer":"vc","pe":"sys"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709446644,"id":"0931a56cd7700ee12bba1a297fca8ee8c75fc8e247dc2c00a3b68515588bb882","last_scanned":1709446669,"multiav":{"hits":0,"total":14},"name":"0931a56cd7700ee12bba1a297fca8ee8c75fc8e247dc2c00a3b68515588bb882","size":190632,"tags":{"packer":"vc","pe":"sys"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1708875066,"id":"0821026ad073bd48387247fa329b50fb7b08763e3fc283911160b81d3284f821","last_scanned":1708875090,"multiav":{"hits":11,"total":14},"name":"0821026ad073bd48387247fa329b50fb7b08763e3fc283911160b81d3284f821","size":43008,"tags":{"avira":"11857","eset":"Agent","packer":"vc","pe":"sys","windefender":"Vundo"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709406554,"id":"0924468a45618bf5ba27256e3b00fafa3ca3c0e160db04a67f1627028305fb4a","last_scanned":1709406578,"multiav":{"hits":0,"total":14},"name":"0924468a45618bf5ba27256e3b00fafa3ca3c0e160db04a67f1627028305fb4a","size":117248,"tags":{"packer":["aspack","asprotect","vc"],"pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709524895,"id":"09463f328f2795a571c8cd07538a417c1fba80ded32d1fa9d290ea1293384ba4","last_scanned":1709524918,"multiav":{"hits":12,"total":14},"name":"09463f328f2795a571c8cd07538a417c1fba80ded32d1fa9d290ea1293384ba4","size":91148,"tags":{"avira":"Kykymber","packer":["upx","vc"],"pe":"sys","windefender":"OnLineGames"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1708918231,"id":"0828776abb639ff6e6a3dc10b8b2748787a0b755b0c3ac4f91c1d529f5eae6ad","last_scanned":1708918256,"multiav":{"hits":10,"total":14},"name":"0828776abb639ff6e6a3dc10b8b2748787a0b755b0c3ac4f91c1d529f5eae6ad","size":233472,"tags":{"avira":"AGEN","eset":"Phobiq","packer":"vc","pe":"sys","windefender":"BHO"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1708975312,"id":"083941d2d4966c562fe3b5546ae43067d8784a4967153968da0469006bdbe967","last_scanned":1708975337,"multiav":{"hits":8,"total":14},"name":"083941d2d4966c562fe3b5546ae43067d8784a4967153968da0469006bdbe967","size":256760,"tags":{"avira":"BrowseFox","packer":"vc","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709336718,"id":"0910569216f252a9b5840bc7448aef713df930667874c701635665e60882ff3d","last_scanned":1709336743,"multiav":{"hits":11,"total":14},"name":"0910569216f252a9b5840bc7448aef713df930667874c701635665e60882ff3d","size":993032,"tags":{"avira":"ATRAPS","eset":"Iyeclore","packer":"delphi","pe":"sys"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1708945417,"id":"0833e09ee97a8e349babe5b2a3916c2ea8ec7809fe34304b0c2b487cafb6b160","last_scanned":1708945441,"multiav":{"hits":7,"total":14},"name":"0833e09ee97a8e349babe5b2a3916c2ea8ec7809fe34304b0c2b487cafb6b160","size":16384,"tags":{"avira":"Spy","packer":"mfc","pe":"sys","windefender":"OnLineGames"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709497614,"id":"09411ced675641ad92cbbc63d6a0412ecb2781613dd52e2499e73fa475277f07","last_scanned":1709497638,"multiav":{"hits":11,"total":14},"name":"09411ced675641ad92cbbc63d6a0412ecb2781613dd52e2499e73fa475277f07","size":184322,"tags":{"avira":"BV","eset":"Hupigon","packer":"delphi","pe":"sys","windefender":"Hupigon"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1708630428,"id":"06234a9eeedd625030c16b45fddcf23779005f400859d47216230b4e90a7896c","last_scanned":1708678631,"multiav":{"hits":7,"total":14},"name":"06234a9eeedd625030c16b45fddcf23779005f400859d47216230b4e90a7896c","size":106496,"tags":{"avira":"BHO","eset":"Sefnit","pe":"sys"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709403037,"id":"0923a9363ae103dbe53df1f6867bfa149189a8ac6a0fd874373383717a024502","last_scanned":1709403067,"multiav":{"hits":7,"total":14},"name":"0923a9363ae103dbe53df1f6867bfa149189a8ac6a0fd874373383717a024502","size":1092336,"tags":{"avira":"BrowseFox","packer":"vc","pe":"sys"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1708550963,"id":"06072565ca86ae2f75c7d63d5ff2e366e2683b95f534291e7ce9221d093cd966","last_scanned":1708566531,"multiav":{"hits":10,"total":14},"name":"06072565ca86ae2f75c7d63d5ff2e366e2683b95f534291e7ce9221d093cd966","size":345190,"tags":{"avira":"AGEN","eset":"StartPage","packer":["upx","delphi"],"pe":"sys","windefender":"Startpage"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709215344,"id":"08871a47ad578b44c1ef156453c647949c778d594f1f5eee1b25d28888a15f58","last_scanned":1709215372,"multiav":{"hits":11,"total":14},"name":"08871a47ad578b44c1ef156453c647949c778d594f1f5eee1b25d28888a15f58","size":100388,"tags":{"avira":"Kykymber","eset":"Kykymber","packer":["upx","vc"],"pe":"sys","windefender":"OnLineGames"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1612162934,"id":"03af515298235e4e676f66214107be9ce220598c4f79905b8ac8bc6c76b8fe62","last_scanned":1689702264,"multiav":{"hits":13,"total":14},"name":"03af515298235e4e676f66214107be9ce220598c4f79905b8ac8bc6c76b8fe62","size":15398,"tags":{"avira":"Spy","packer":"delphi","pe":"sys","windefender":"Storark"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1612176953,"id":"04d8bb0414edcea8b2e3f73c8f4844da07a0ad94d6003f35eb7ebd9779211e58","last_scanned":1693681637,"multiav":{"hits":10,"total":14},"name":"04d8bb0414edcea8b2e3f73c8f4844da07a0ad94d6003f35eb7ebd9779211e58","size":303310,"tags":{"avira":"Spy","eset":"Goriadu","packer":"mfc","pe":"sys","windefender":"Goriadu"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1708803409,"id":"080753fc6f96b7e849dd9efbca1a6f7fa5656e62f690a698b7d002a2e40d1a52","last_scanned":1708803433,"multiav":{"hits":11,"total":14},"name":"080753fc6f96b7e849dd9efbca1a6f7fa5656e62f690a698b7d002a2e40d1a52","size":88576,"tags":{"avira":"Xpaj","packer":"mingw","pe":"sys","windefender":"Xpaj"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1711202720,"id":"1789d5ab7c1d6acf1aa6ce74d19b38f887089c36578355d360ee0d3a3f8585c8","last_scanned":1711202744,"multiav":{"hits":11,"total":14},"name":"1789d5ab7c1d6acf1aa6ce74d19b38f887089c36578355d360ee0d3a3f8585c8","size":84480,"tags":{"avira":"ATRAPS","eset":"Kryptik","pe":"sys"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1710129268,"id":"16300ad350824765e51394701d78d2720656e9128990e83812828614616862e4","last_scanned":1710129292,"multiav":{"hits":14,"total":14},"name":"16300ad350824765e51394701d78d2720656e9128990e83812828614616862e4","size":26624,"tags":{"avira":"Games","packer":"vc","pe":"sys","windefender":"Lolyda"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1710766639,"id":"1711506b273b6aba73abe794330238121233211997c456d038ecb76f9eea4fb8","last_scanned":1710766663,"multiav":{"hits":1,"total":14},"name":"1711506b273b6aba73abe794330238121233211997c456d038ecb76f9eea4fb8","size":90113,"tags":{"packer":"vc","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1710127860,"id":"1629dde19a54c467a788120ebf71efc3b3c760f3b72752c3485dba0b615b502a","last_scanned":1710127884,"multiav":{"hits":14,"total":14},"name":"1629dde19a54c467a788120ebf71efc3b3c760f3b72752c3485dba0b615b502a","size":22592,"tags":{"avira":"Bagle","eset":"AF","pe":"sys","windefender":"Bagle"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1710406183,"id":"1675e2df0463aab792695f4adc3c288689c1caa0868df5f0136a1137fac223ed","last_scanned":1710406206,"multiav":{"hits":12,"total":14},"name":"1675e2df0463aab792695f4adc3c288689c1caa0868df5f0136a1137fac223ed","size":72286,"tags":{"avira":"AGEN","packer":["acprotect","vc"],"pe":"sys","windefender":"Frethog"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1710436515,"id":"168133ec81f3b5514024716fdaa161351c0f4af9705a54a8f09d745a33747cb7","last_scanned":1710436544,"multiav":{"hits":9,"total":14},"name":"168133ec81f3b5514024716fdaa161351c0f4af9705a54a8f09d745a33747cb7","size":306172,"tags":{"avira":"DomaIQ","eset":"DomaIQ","pe":"sys","windefender":"Tugspay"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1711206619,"id":"179058cb6e1683422a350db6126370a6b240e2cccc38da72688d070f75f36687","last_scanned":1711206643,"multiav":{"hits":9,"total":14},"name":"179058cb6e1683422a350db6126370a6b240e2cccc38da72688d070f75f36687","size":154112,"tags":{"avira":"215","eset":"Gamevance","packer":"vc","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1710215741,"id":"164476f607bc7da00a8a98992a2ce042f992ec1b74534acb1c9acfb61d31908c","last_scanned":1710215765,"multiav":{"hits":0,"total":14},"name":"164476f607bc7da00a8a98992a2ce042f992ec1b74534acb1c9acfb61d31908c","size":12288,"tags":{"packer":"vc","pe":"sys"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1710988519,"id":"1751871171c1d2248c71a3413605188b197dadcb31d0e04ad86dbbab2d826ff7","last_scanned":1710988547,"multiav":{"hits":0,"total":14},"name":"1751871171c1d2248c71a3413605188b197dadcb31d0e04ad86dbbab2d826ff7","size":69536,"tags":{"packer":"vmprotect","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709570936,"id":"1513b045eef1b4ee1a0cbb0da429f029e030db13bfe273afd045d241514a2f69","last_scanned":1709570959,"multiav":{"hits":10,"total":14},"name":"1513b045eef1b4ee1a0cbb0da429f029e030db13bfe273afd045d241514a2f69","size":28672,"tags":{"avira":"XPACK","pe":"sys","windefender":"Conhook"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1710361232,"id":"1668104a880ccd6ea7ccd034959784490a78336d71879a26a1788ec953a2b6d0","last_scanned":1710361257,"multiav":{"hits":13,"total":14},"name":"1668104a880ccd6ea7ccd034959784490a78336d71879a26a1788ec953a2b6d0","size":351232,"tags":{"avira":"Spy","packer":"vc","pe":"sys","windefender":"Enterak"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1710958871,"id":"17465a2b61d9e940bcc1f4998058f3db5d9620dd3b19eaed8531fb4ceccfe7fb","last_scanned":1710958894,"multiav":{"hits":5,"total":14},"name":"17465a2b61d9e940bcc1f4998058f3db5d9620dd3b19eaed8531fb4ceccfe7fb","size":18758,"tags":{"avira":"AGEN","eset":"GameHack","packer":"mingw","pe":"sys"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1710341751,"id":"166502732b12336aef1dc327ec759af6d06c2abeecef6ac072d6041769cf25af","last_scanned":1710341777,"multiav":{"hits":7,"total":14},"name":"166502732b12336aef1dc327ec759af6d06c2abeecef6ac072d6041769cf25af","size":860400,"tags":{"avira":"BrowseFox","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1710874723,"id":"1730554fcf72fe80c8c516b6e4f50a2f2dada46f0a5dd9bb5d69dbe6a1ce8c13","last_scanned":1710874751,"multiav":{"hits":14,"total":14},"name":"1730554fcf72fe80c8c516b6e4f50a2f2dada46f0a5dd9bb5d69dbe6a1ce8c13","size":35617,"tags":{"avira":"Spy","pe":"sys","windefender":"Lolyda"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1711593563,"id":"1845d6ec7cc0f24fc1ed051e52f48b6b9ef91d5f156f91cad4923a4b6e7ec14a","last_scanned":1711593585,"multiav":{"hits":11,"total":14},"name":"1845d6ec7cc0f24fc1ed051e52f48b6b9ef91d5f156f91cad4923a4b6e7ec14a","size":4096,"tags":{"avira":"EB","eset":"Bundpil","packer":"vc","pe":"sys","windefender":"Gamarue"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1711448612,"id":"182102195a3c6759c235f89ef21225ded63b02b7e2704e5b9650c895426f1bd4","last_scanned":1711448639,"multiav":{"hits":11,"total":14},"name":"182102195a3c6759c235f89ef21225ded63b02b7e2704e5b9650c895426f1bd4","size":31232,"tags":{"avira":"Browser","eset":"Bamital","packer":"masm","pe":"sys","windefender":"Bamital"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1711439601,"id":"181994fe01de2d2af7f3d540e99fb02ed8fbd5835482544070b1ff0a7ea6d4be","last_scanned":1711439629,"multiav":{"hits":12,"total":14},"name":"181994fe01de2d2af7f3d540e99fb02ed8fbd5835482544070b1ff0a7ea6d4be","size":114388,"tags":{"avira":"Kykymber","eset":"Kykymber","packer":["upx","vc"],"pe":"sys","windefender":"OnLineGames"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1710792522,"id":"17160c03488920b91001292ccdcadaab9091b91346dc34860272e0ef3080d5e3","last_scanned":1710792548,"multiav":{"hits":9,"total":14},"name":"17160c03488920b91001292ccdcadaab9091b91346dc34860272e0ef3080d5e3","size":258048,"tags":{"avira":"Chepdu","eset":"Chepdu","packer":"vc","pe":"sys"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1711478034,"id":"18262ecd90a29ac27cc2d6a32a5453c599361050aa7ae47a10ea5715e1b58fbb","last_scanned":1711478059,"multiav":{"hits":12,"total":14},"name":"18262ecd90a29ac27cc2d6a32a5453c599361050aa7ae47a10ea5715e1b58fbb","size":787456,"tags":{"avira":"kj","eset":"Farfli","pe":"sys","windefender":"Farfli"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1711602213,"id":"184767aa9574e5e24bf687f5085be957b875a27ae3fb0c76d1440eed7258b7e4","last_scanned":1711602242,"multiav":{"hits":3,"total":14},"name":"184767aa9574e5e24bf687f5085be957b875a27ae3fb0c76d1440eed7258b7e4","size":354816,"tags":{"packer":["aspack","asprotect","delphi"],"pe":"sys"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1710205524,"id":"164306e19367341bd42c5bd822f0878e5bd19a754e8fc51592ac0cbcd6501a86","last_scanned":1710205551,"multiav":{"hits":14,"total":14},"name":"164306e19367341bd42c5bd822f0878e5bd19a754e8fc51592ac0cbcd6501a86","size":60060,"tags":{"avira":"Spy","packer":["upx","vc"],"pe":"sys","windefender":"OnLineGames"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1710723307,"id":"17037f1435ea5218cb7de944f240b9f683aefc2b39c223b15468514d459525a2","last_scanned":1710723332,"multiav":{"hits":14,"total":14},"name":"17037f1435ea5218cb7de944f240b9f683aefc2b39c223b15468514d459525a2","size":269162,"tags":{"avira":"Ramnit","packer":"vc","pe":"sys","windefender":"Ramnit"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1711254678,"id":"17978f3a6d1f692c5da8ef6fd07a898cd6a978fefd8bfd33220cca174141d3bf","last_scanned":1711254703,"multiav":{"hits":14,"total":14},"name":"17978f3a6d1f692c5da8ef6fd07a898cd6a978fefd8bfd33220cca174141d3bf","size":131115,"tags":{"avira":"Spy","packer":"delphi","pe":"sys","windefender":"OnLineGames"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1711163717,"id":"178254ad4165628fcf8608aef377d2efebe22ba6a130482b0f76c8f83aad9f22","last_scanned":1711163741,"multiav":{"hits":13,"total":14},"name":"178254ad4165628fcf8608aef377d2efebe22ba6a130482b0f76c8f83aad9f22","size":68884,"tags":{"avira":"Kykymber","packer":"vc","pe":"sys","windefender":"OnLineGames"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1710484954,"id":"1689d5c616d349df6b5588867587320f22fa5defc7d3e1316126bd7674d3dc60","last_scanned":1710484977,"multiav":{"hits":14,"total":14},"name":"1689d5c616d349df6b5588867587320f22fa5defc7d3e1316126bd7674d3dc60","size":4508,"tags":{"avira":"UPKM","pe":"sys","windefender":"Farfli"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1710862664,"id":"172841618db16ce19a34dbb2d6f868af452e5a686c3fc171c491690e3f3356d1","last_scanned":1710862687,"multiav":{"hits":13,"total":14},"name":"172841618db16ce19a34dbb2d6f868af452e5a686c3fc171c491690e3f3356d1","size":8178,"tags":{"avira":"EB","eset":"Bundpil","packer":"vc","pe":"sys","windefender":"Gamarue"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1710774791,"id":"1712c8bccd2145b622161cabf42cebcea387da3dd8db24df49b66536f9d20d94","last_scanned":1710774814,"multiav":{"hits":14,"total":14},"name":"1712c8bccd2145b622161cabf42cebcea387da3dd8db24df49b66536f9d20d94","size":86464,"tags":{"avira":"Spy","eset":"Kykymber","packer":"vc","pe":"sys","windefender":"OnLineGames"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1709750637,"id":"154781e4b89c9c25bfc63f45128d50f0a3110cfd5194d17ccf2be8f18b4f92d8","last_scanned":1709750660,"multiav":{"hits":8,"total":14},"name":"154781e4b89c9c25bfc63f45128d50f0a3110cfd5194d17ccf2be8f18b4f92d8","size":53248,"tags":{"eset":"Kryptik","packer":"vc","pe":"sys","windefender":"Vundo"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1710062583,"id":"1616cace509fcf8536aa6d5e0e8b70f55979813a5d5dead30514e8ff2170c4dd","last_scanned":1710062612,"multiav":{"hits":9,"total":14},"name":"1616cace509fcf8536aa6d5e0e8b70f55979813a5d5dead30514e8ff2170c4dd","size":233472,"tags":{"avira":"ATRAPS","packer":["vmprotect","delphi"],"pe":"sys"}},{"class":"benign","file_extension":"sys","file_format":"pe","first_seen":1709681257,"id":"1533d8f43e3d78f564da183ebcc58cd069655a606f6613cb5303023efc085e19","last_scanned":1709681282,"multiav":{"hits":4,"total":14},"name":"1533d8f43e3d78f564da183ebcc58cd069655a606f6613cb5303023efc085e19","size":384000,"tags":{"eset":"FlyStudio","packer":"nspack","pe":"sys"}},{"class":"malicious","file_extension":"sys","file_format":"pe","first_seen":1710264023,"id":"1651cd77f7982211751146faaf26f2f51e4b330b836ea72a835b0884a363d646","last_scanned":1710264046,"multiav":{"hits":12,"total":14},"name":"1651cd77f7982211751146faaf26f2f51e4b330b836ea72a835b0884a363d646","size":15360,"tags":{"avira":"ZPACK","pe":"sys","windefender":"OnLineGames"}}]}`);
	$: items = pages ? pages.items as {class: string, file_extension: string, file_format: string, first_seen: number, id: string, last_scanned: number, multiav: {hits: number, total: number}, name: string, size: number, tags: Record<string, string>}[] : [];
	function submit() {
		console.log("submitted");
		console.log({search});
		inputEl.blur();
		inputEl.disabled = true;
		api.filesSearchPost(perPage, page, {
			data: { query: search }
		})
		.finally(() => {
			inputEl.disabled = false;
		})
		.then((res) => {
			console.log(res.data);
			pages = res.data;
			console.log(JSON.stringify(res.data));
		}).catch((err) => {
			console.log(err);
		})
	}
	function keydown(e: KeyboardEvent) {
		// console.log(`key: ${e.key}`);
		if (e.key.toLowerCase() === "z" && e.ctrlKey) {
			if (!e.shiftKey) { // undo
				e.preventDefault();
				// debugger;
				if (search !== searchEditHistory[searchEditHistoryIndex]) {
					searchEditHistoryPush(search);
				}
				searchEditHistoryIndex = Math.max(searchEditHistoryIndex - 1, 0);
				setSearch(searchEditHistory[searchEditHistoryIndex] || "", false);
			} else { // redo
				e.preventDefault();
				searchEditHistoryIndex = Math.min(searchEditHistoryIndex + 1, searchEditHistory.length - 1);
				setSearch(searchEditHistory[searchEditHistoryIndex] || "", false);
			}
		}
		if (e.key === "Backspace") {
			searchEditHistoryPush(search);
		}
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			submit();
		}
		if (e.key === "Tab") {
			e.preventDefault();
		}
		let limit = () => {
			e.preventDefault();
			selectedSuggestionIndex =
				(selectedSuggestionIndex + suggestionList.length) % (suggestionList.length || 1);
		};
		if (showSuggestions) {
			if (e.key === "ArrowDown") {
				selectedSuggestionIndex++;
				limit();
			} else if (e.key === "ArrowUp") {
				selectedSuggestionIndex--;
				limit();
			}
		}
		if (e.key === "Escape") {
			inputEl.blur();
		}
		if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.key === "Tab") {
			if (suggestionList[selectedSuggestionIndex]) {
				setSearch(suggestionList[selectedSuggestionIndex].value);
			} 
		}
	}
	type DeepRequired<T> = T extends object
		? {
				[K in keyof T]-?: T[K] extends Array<infer U> ? Array<DeepRequired<U>> : DeepRequired<T[K]>;
			}
		: T;

	let sug: DeepRequired<FileFileSearchAutocomplete> = { examples: [], search_modifiers: [] };
	$: autoCompleteData.keys = sug.search_modifiers.map((sm) => ({
		value: sm.query,
		description: sm.comment
	}));

	let suggestionList = [] as { value: string; displayValue?: string; description: string }[];
	let suggestionListElements = [] as HTMLElement[];
	let searchFocused = false;
	let res = [] as ResizeObserverEntry[];

	let focusoutTimeout = -1;
	let selectedSuggestionIndex = 0;
	let inputEl: HTMLInputElement;
	let sugEl: HTMLInputElement;
	const styleString = `
		:not(#advanced_search, #advanced_search *, *:has( #advanced_search), symbol, symbol *) {
			visibility: hidden !important;
		}
	`;

	$: {
		if (searchFocused) {
			if (search === "") {
				suggestionList = sug.examples.map((e) => ({
					description: e.comment,
					value: e.query
				}));
			} else {
				suggestionList = [];
			}
		} else {
		}
	}
	function contentChanged() {
		if (sugEl && inputEl) {
			sugEl.value = suggestion;
			inputEl.value = search;
			sugEl.style.cssText = "height: auto !important;";
			inputEl.style.cssText = "height: auto !important;";
			let maxHeight = Math.max(sugEl.scrollHeight, inputEl.scrollHeight) + 3;
			sugEl.style.cssText = `height: ${maxHeight}px !important;`;
			inputEl.style.cssText = `height: ${maxHeight}px !important;`;
		}
	}
	let showSuggestions = false;
	let parsingData: { parseRes: ParsingResult, failedRe: ConsumerThrow, restIsSpacesOrEmpty: boolean};
	$: suggestionList, (selectedSuggestionIndex = 0);
	$: res, suggestion, search, contentChanged();
	$: search, (showSuggestions = searchFocused && !!suggestionList.length && !awaitingSuggestions);
	$: {
		if (search.trim()) {
			let [parseRes, failedRe] = parseSearch(search)
			// console.log("parseRes", parseRes)
			// console.log("failedRe", failedRe)
			if (!failedRe) {
				failedRe = [search.length, ["logicalOperator"], [""]];
			}
			let [ endIndex, tokenNames,  ] = failedRe;
			suggestionList = []
			let space = search.trimEnd() === search ? " " : "";
			let keyOrGroupSpace = space.repeat(+(parseRes.length && parseRes.at(-1)!.type === "logicalOperator"));
			let endsWithSpaces = !space;
			// console.log({endsWithSpace})
			let searchRest = search.substring(endIndex);
			let restIsSpacesOrEmpty = !searchRest.trimEnd();
			
			parsingData = { parseRes, failedRe, restIsSpacesOrEmpty };

			function addSuggestions({
				sourceList,
				search,
				valueStartsWith,
				prefix = "",
				suffix = "",
			}: {
				sourceList: Array<{ value: string; displayValue?: string, description: string }>;
				search: string;
				valueStartsWith?: string;
				prefix?: string;
				suffix?: string;
			}): void {
				if (valueStartsWith) {
					suggestionList.push(...sourceList
						.filter(sug => sug.value.startsWith(valueStartsWith) && sug.value.length !== valueStartsWith.length)
						.map(sug => ({
							...sug,
							displayValue: sug.displayValue || sug.value,
							value: search + "\u200B" + prefix + sug.value.substring(valueStartsWith.length) + suffix,
						}))
					);
				} else {
					suggestionList.push(...sourceList.map(sug => ({
						...sug,
						displayValue: sug.displayValue || sug.value,
						value: search + "\u200B" + prefix + sug.value + suffix,
					})));
				}
			}
			tokenNames.forEach(token => {
				switch (token) {
					case "key": {
						if (restIsSpacesOrEmpty) {
							addSuggestions({
								sourceList: autoCompleteData.keys,
								search,
								prefix: keyOrGroupSpace,
							});
						} else {
							// error, expected key at endIndex
						}
						break;
					}
					case "comparisonOperator": {
						if (restIsSpacesOrEmpty) {
							if (!endsWithSpaces) {
								addSuggestions({
									sourceList: autoCompleteData.keys,
									valueStartsWith: parseRes.at(-1)!.value,
									search,
								});
							} else {
								// error, can't autocomplete
							}
							addSuggestions({
								sourceList: autoCompleteData.comparisonOperators,
								search,
							});
						} else if (!endsWithSpaces) {
							addSuggestions({
								sourceList: autoCompleteData.comparisonOperators,
								valueStartsWith: searchRest.trimStart(),
								search,
							});
						}
						break;
					}
					case "value": {
						if (!endsWithSpaces) {
							addSuggestions({
								sourceList: autoCompleteData.comparisonOperators,
								valueStartsWith: parseRes.at(-1)!.value,
								search,
							});
						}
						suggestion = search + "\u200B" +"<value>";
						break;
					}
					case "closingGroupingOperator": {
						if (restIsSpacesOrEmpty) {
							addSuggestions({
								sourceList: [autoCompleteData.groupingOperators[1]],
								search,
								prefix: keyOrGroupSpace,
							});
						}
						break;
					}
					case "logicalOperator": {
						if (restIsSpacesOrEmpty) {
							addSuggestions({
								sourceList: autoCompleteData.logicalOperators,
								search,
								prefix: space,
								suffix: " "
							});
						} else if (!endsWithSpaces) {
							addSuggestions({
								sourceList: autoCompleteData.logicalOperators,
								valueStartsWith: searchRest.trimStart(),
								search,
								suffix: " "
							});
						}
						break;
					}
					case "openingGroupingOperator": {
						if (restIsSpacesOrEmpty) {
							addSuggestions({
								sourceList: [autoCompleteData.groupingOperators[0]],
								search,
								prefix: keyOrGroupSpace,
							});
						}
						break;
					}
					case "endOfString": {
						break;
					}
				}
			});
			suggestionList = [...suggestionList];
		}
	};
	$: {
		if (searchFocused && suggestionList[selectedSuggestionIndex]) {
			suggestion = suggestionList[selectedSuggestionIndex].value;
		} else if (!searchFocused || (searchFocused && !(parsingData && parsingData.failedRe[1].includes("value") && parsingData.restIsSpacesOrEmpty))) {
			suggestion = "";
		}
	}
	let mounted = false;
	onMount(() => {
		mounted = true;
		const ro = new ResizeObserver((r) => {
			res = r;
		});
		ro.observe(sugEl);
		ro.observe(inputEl);
		return () => {
			ro.disconnect();
		};
	});
	function resetSearch() {
		search = "";
		searchEditHistory = [search];
		searchEditHistoryIndex = 0;
	}
	let awaitingSuggestions = false;
	let awaitingSearchResults = false;
	$: {
		if (advanced && mounted) {
			awaitingSuggestions = true;
			api.filesSearchAutocompleteGet().then((res) => {
				let { data } = res;
				data.examples = [...(data.examples ?? []).map((e) => ({ query: "", comment: "", ...e }))];
				data.search_modifiers = [
					...(data.search_modifiers ?? []).map((s) => ({ query: "", comment: "", ...s }))
				]
				// temporary fix for duped queries from backend
				.filter((el, index, arr) => arr.find(f => f.query === el.query) === el);
				sug = data as DeepRequired<FileFileSearchAutocomplete>;
			}).finally(() => awaitingSuggestions = false);
			resetSearch();
		}
	}
	let lastSuggestionIndexFocused = 0;
	$: {
		if (
				searchFocused &&
				suggestionListElements.length &&
				suggestionListElements[selectedSuggestionIndex] &&
				lastSuggestionIndexFocused != selectedSuggestionIndex
			) {
			suggestionListElements[selectedSuggestionIndex].focus();
			lastSuggestionIndexFocused = selectedSuggestionIndex;
			inputEl.focus();
		}
	}
</script>

{#if advanced}
	{@html `<${""}style>${styleString}</${""}style>`}
{/if}
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	id="advanced_search"
	class:advanced
	class="sticky bg-advanced-search-surface bottom-0 w-full h-0 invisible [&.advanced]:visible [&.advanced]:h-[100vh] z-[40] flex flex-col items-stretch gap-2 overflow-y-auto"
>
	<nav class="flex flex-col items-center py-4">
		<div class="container">
			<Button
				class="text-primary-text border-none leading-[25px] text-sm [&_.content]:gap-1"
				theme="none"
				icon="close"
				on:click={() => (advanced = false)}
				iconClass="text-primary-icn size-[21px]">Close</Button
			>
		</div>
	</nav>
	<div class="description flex flex-col items-center gap-1">
		<Icon name="string-search-color" class="text-brand-text size-[60px]"></Icon>
		<div class="flex flex-col items-center gap-2">
			<h1 class="text-primary-text text-[23px] leading-[33px] font-semibold">Advanced Search</h1>
			<h3 class="text-center text-sm leading-5 text-secondary-text max-w-3xl">
				Search a database containing millions of malware and goodware files. Goodware search
				presents you with a customized search results that allows you to trace the origin of the
				files.
			</h3>
		</div>
	</div>
	<div class="jist flex flex-col items-stretch">
		<TabsImproved
			tabs={["Search all", "Goodware"]}
			bind:value={currentTab}
			tabsClass="justify-center"
			tabClass="text-[15px] leading-[23px] p-2.5 px-5"
		>
			<div class="wrapper p-4">
				<div>
					{#if currentTab === "Search all"}
						<div
							class="relative"
							on:focusin={() => {
								clearTimeout(focusoutTimeout);
								focusoutTimeout = -1;
								searchFocused = true;
							}}
							on:focusout={() => {
								focusoutTimeout = window.setTimeout(() => {
									searchFocused = false;
								});
							}}
						>
							<Input
								multiline
								rows="1"
								bind:This={sugEl}
								tabindex="-1"
								value={awaitingSuggestions && search === "" ? "" : suggestion}
								icon={awaitingSuggestions ? "loading" : "search"}
								iconClass="{awaitingSuggestions ? "animate-spin origin-center" : ""} text-gray-500"
								parentClass="absolute top-0 left-0"
								class="[font-variant-ligatures:none] overflow-hidden resize-none min-h-[1lh] text-searchbar-text border-primary-border active:border-primary-border focus:border-primary-border"
							></Input>
							<Input
								multiline
								rows="1"
								bind:This={inputEl}
								on:keydown={keydown}
								bind:value={search}
								placeholder={suggestion
									? ""
									: (awaitingSuggestions ? "Loading..." : "Search filename, file path, hashes, application name, publisher name, certificates, and more ...")}
								icon={awaitingSuggestions ? "loading" : "search"}
								iconClass="{awaitingSuggestions ? "animate-spin origin-center" : ""} text-gray-500"
								class="[font-variant-ligatures:none] overflow-hidden resize-none min-h-[1lh] placeholder:text-searchbar-text border-primary-border active:border-primary-border focus:border-primary-border"
							></Input>
							{#if suggestionList.length}
								<div class="parent relative rounded">
									<div class="overflow-clip rounded absolute top-0 left-0 w-full">
										<ul
											class="relative max-h-[calc(72px*5+3px)] overflow-y-auto flex flex-col items-stretch bg-quaternary-surface border border-secondary-border rounded mt-2 overflow-clip [&.focused]:visible invisible"
											class:focused={showSuggestions}
										>
											{#each suggestionList as s, index}
												<!-- <li class=""  tabindex="1"> -->
													<button bind:this={suggestionListElements[index]}
														class:selected={index === selectedSuggestionIndex}
														class="
															flex flex-col items-start gap-1
															w-full p-[15px]
															hover:bg-quaternary-hov-surface
															focus:bg-quaternary-hov-surface
															focus-within:bg-quaternary-hov-surface
															[&.selected]:bg-quaternary-hov-surface
															"
														on:click={() => {
															setSearch(s.value);
															inputEl.focus();
														}}
													>
														<p
															class="text-xs font-medium leading-[18px] text-start overflow-ellipsis whitespace-nowrap overflow-hidden min-w-0 max-w-full"
															title={s.displayValue || s.value}
														>
															{s.displayValue || s.value}
														</p>
														<p class="text-xs font-medium leading-[18px] text-secondary-text">
															{s.description}
														</p>
													</button>
												<!-- </li> -->
											{/each}
										</ul>
									</div>
								</div>
							{/if}
							<div class="results flex flex-col gap-1">
								{#if pages}
									<table>
										<thead class="[&_th]:p-2">
											<th class="w-fit">
												<div class="flex">
													<CheckBox></CheckBox>
												</div>
											</th>
											{#each ["sha256", "classification", "multiav", "first seen", "last scanned", "size", "type"] as thText}
												<th class="uppercase" align="left">{thText}</th>
											{/each}
										</thead>
										<tbody>
											{#each items as el}
												<!-- <div>{JSON.stringify(el)}</div> -->
												<tr class="[&_td]:p-2">
													<td class="w-fit">
														<div class="flex">
															<CheckBox></CheckBox>
														</div>
													</td>
													<td>
														<div class="flex flex-col gap-1">
															<div>
																{el.id}
															</div>
															<div class="flex gap-1">
																{#each Object.entries(el.tags) as [av, tag]}
																	<li class="flex">
																		<a class="rounded-sm px-2.5 py-1.5 tags__tag tags__tag--{av}" href="/tags/{av}-{tag}">{tag}</a>
																	</li>
																{/each}
															</div>
														</div>
													</td>
													<td class="capitalize {{malicious: "text-alert-red", unknown: "text-alert-orange", benign: "text-alert-green"}[el.class]} flex gap-1.5 items-center">
														<Icon name={el.class === "benign" ? "safe" : "unsafe"} size="size-[14px]"></Icon>
														{el.class}
													</td>
													<td>{el.multiav.hits}/{el.multiav.total}</td>
													<td>{timestampToFormattedDate(el.first_seen).split(" ")[0]}<br>{timestampToFormattedDate(el.first_seen).split(" ")[1]}</td>
													<td>{timestampToFormattedDate(el.last_scanned).split(" ")[0]}<br>{timestampToFormattedDate(el.last_scanned).split(" ")[1]}</td>
													<td>{convertBytes(el.size)}</td>
													<td class="uppercase">{el.file_format}/{el.file_extension}</td>
												</tr>
											{/each}
										</tbody>
									</table>
								{/if}
							</div>
						</div>
					{:else}
						<center class="text-secondary-text">Under construction...</center>
					{/if}
					<input type="submit" hidden />
				</div>
			</div>
		</TabsImproved>
	</div>
</div>
