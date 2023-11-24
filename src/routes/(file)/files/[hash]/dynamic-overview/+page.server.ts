import { SaferwallClient } from '$lib/clients/saferwall';
import type { PageLoad } from '../$types';
import type { Saferwall } from '$lib/types';

export const load: PageLoad = (async ({
    parent
}) => {
    const parentData = await parent();
    const guid = (parentData as any).file.default_behavior_id

    const processArray = await new SaferwallClient(parentData.session).getFileProcessTree(guid)
    const processTree = buildProcessTrees(processArray)

    return {
        processTree
    };
});

type ProcessTree = Saferwall.Behaviors.NestedProcessTree
function buildProcessTrees(processArray: Saferwall.Behaviors.ProcessItem[]): ProcessTree[] {
    let trees = new Array<ProcessTree>();

    function buildTree(parentProcess: (typeof processArray)[number]) {
        let tree: ProcessTree = {
            ...parentProcess,
            children: new Array<ProcessTree>()
        };

        let childProcesses = processArray.filter(
            (process) => process.parent_pid === parentProcess.pid
        );

        for (let childProcess of childProcesses) {
            let childTree = buildTree(childProcess);
            tree.children.push(childTree);
        }

        return tree;
    }

    for (let process of processArray) {
        if (process.parent_pid === '0x0') {
            let tree = buildTree(process);
            trees.push(tree);
        }
    }

    return trees;
}

