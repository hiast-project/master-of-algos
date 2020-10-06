import Graph from "../../Models/Graph";
import PriorityQueue from "js-priority-queue";

const graphInstance = Graph();

function GreedyBestFIrstSearch() {
  function findPath(grf, src, dest) {
    // defin a stateTrace, will contain set of graphs, each one has a node changed
    let stateTrace = [];

    // copy the graph to avoid changing the original one
    let graph = graphInstance.copyGraph(grf);

    // defain a priority queue, depends on array
    let pQueue = new PriorityQueue({
      strategy: PriorityQueue.ArrayStrategy,
      comparator: function (a, b) {
        if (a.dist === b.dist) return -1;
        return a.dist - b.dist;
      },
    });

    // push the source and the distance to itself to the priority queue
    pQueue.queue({ dist: 0, index: src });

    // defin a boolean to check if destination found
    let destFound = false;

    // defin a path array to be returned
    let path = [];

    // marking the source node as visited
    graph[src].isVisited = true;

    // adding the original graph with the source node visited to the stateTrace
    stateTrace.push(graphInstance.copyGraph(graph));

    // while the destination is not found and there are still nodes to visit do the next
    while (pQueue.length !== 0 && destFound === false) {
      // pop the first element in the queue
      var current = pQueue.dequeue().index;

      // get the adjecent nodes of the currnet node
      let adjs = graph[current].adjecentNodes;

      for (let i = 0; i < adjs.length; i++) {
        let node = adjs[i].adjecentNode;
        let d = adjs[i].weight;

        // if the node is a block then skip it
        if (graph[node].isBlock === true) continue;

        // if an adjecent node is already visited, then it can not be visited again
        if (graph[node].isVisited === false) {
          if (node === dest) {
            destFound = true;
          }

          // set the adjecent node as visited
          graph[node].isVisited = true;

          // set parent of the adjecent node as the current node
          graph[node].parent = graph[current];

          // add the current graph to the stateTrace
          stateTrace.push(graphInstance.copyGraph(graph));

          // add the adjecent node to the queue
          pQueue.queue({ dist: d, index: node });
        }
      }
    }

    // tracing the path from the source to the destination
    let tmp = graph[dest];
    while (tmp !== null) {
      path.push(tmp);
      tmp = tmp.parent;
    }
    if (path.length > 1) {
      for (let i = path.length - 1; i >= 0; i--) {
        path[i].isInPath = true;
        stateTrace.push(graphInstance.copyGraph(graph));
      }
    }
    return { stateTrace, path };
  }

  return { findPath };
}

export default GreedyBestFIrstSearch;
