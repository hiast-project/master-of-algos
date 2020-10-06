import Graph from "../../Models/Graph";
import PriorityQueue from "js-priority-queue";

const graphInstance = Graph();

// inf: a big number, no weight can be above it
const INF = 100005.0;

function ASTAR() {
  // createArray: creates an array of length len, and all its elements have the value "value"
  function createArray(len, value) {
    let tmpArray = [];
    for (let i = 0; i < len; i++) {
      tmpArray[i] = { g: value, h: value, f: value };
    }
    return tmpArray;
  }

  function calculateHeuristicsValue(node, dest) {
    // return Math.sqrt(
    //   (node.x - dest.x) * (node.x - dest.x) +
    //     (node.y - dest.y) * (node.y - dest.y)
    // );
    return Math.abs(node.x - dest.x) + Math.abs(node.y - dest.y);
  }

  function findPath(grf, src, dest) {
    let openList = new PriorityQueue({
      strategy: PriorityQueue.ArrayStrategy,
      comparator: function (a, b) {
        return a.f - b.f;
      },
    });
    // defin a boolean to check if destination found
    let destFound = false;

    // defin a path array to be returned
    let path = [];

    let arr = createArray(grf.length, INF);

    // defin a stateTrace, will contain set of graphs, each one has a node changed
    let stateTrace = [];

    // copy the graph to avoid changing the original one
    let graph = graphInstance.copyGraph(grf);

    // adding the original graph with the source node visited to the stateTrace
    stateTrace.push(graphInstance.copyGraph(graph));

    arr[src].g = 0.0;
    arr[src].f = 0.0;
    arr[src].h = 0.0;

    openList.queue({ f: 0.0, node: src });

    while (openList.length > 0 && destFound === false) {
      let pair = openList.dequeue();
      let current = pair.node;
      graph[current].isVisited = true;

      // add the current graph to the stateTrace
      stateTrace.push(graphInstance.copyGraph(graph));

      // get the adjecent nodes of the currnet node
      let adjs = graph[current].adjecentNodes;

      for (let i = 0; i < adjs.length; i++) {
        let node = adjs[i].adjecentNode;

        // if an adjecent node is a block, then it can not be visited
        if (graph[node].isBlock === true) continue;

        // if an adjecent node is already visited, then it can not be visited again
        if (graph[node].isVisited === false) {
          // if an adjecent node the destination, then destFound is true
          if (node === dest) {
            destFound = true;
            graph[node].isVisited = true;
            graph[node].parent = current;
            break;
          }

          let g = arr[current].g + 1.0;
          let h = calculateHeuristicsValue(graph[node], graph[dest]);
          let f = g + h;
          if (arr[node].f >= INF || arr[node].f > f) {
            openList.queue({ f: f, node: node });
            arr[node].f = f;
            arr[node].g = g;
            arr[node].h = h;
            graph[node].parent = current;
          }
        }
      }
    }
    let tmp = dest;
    while (tmp !== null) {
      path.push(tmp);
      tmp = graph[tmp].parent;
    }
    if (path.length > 1) {
      for (let i = path.length - 1; i >= 0; i--) {
        graph[path[i]].isInPath = true;
        stateTrace.push(graphInstance.copyGraph(graph));
      }
    }
    return { stateTrace, path };
  }
  return {
    findPath,
  };
}

export default ASTAR;
