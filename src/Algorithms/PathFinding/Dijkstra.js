import Graph from "../../Models/Graph";
import PriorityQueue from "js-priority-queue";

const graphInstance = Graph();

// inf: a big number, no weight can be above it
const INF = 1e5 + 5;

function Dijkstra() {
  // createArray: creates an array of length len, and all its elements have the value "value"
  function createArray(len, value) {
    let tmpArray = [];
    for (let i = 0; i < len; i++) {
      tmpArray[i] = value;
    }
    return tmpArray;
  }

  // main function
  function findPath(grf, src, dest, events) {
    // copy the graph to avoid changing the original one
    let graph = graphInstance.copyGraph(grf);

    // create array of distances
    let distance = createArray(graph.length, INF);

    // defin a stateTrace, will contain set of graphs, each one has a node changed
    let stateTrace = [];

    // defain a priority queue, depends on array
    let pQueue = new PriorityQueue({
      strategy: PriorityQueue.ArrayStrategy,
      comparator: function (a, b) {
        if (a.dist === b.dist) return -1;
        return a.dist - b.dist;
      },
    });

    // distance form the source to it self is `0`
    distance[src] = 0;

    // push the source and the distance to itself to the priority queue
    pQueue.queue({ dist: 0, index: src });

    // while the destination is not found and there are still nodes to visit do the next
    while (pQueue.length !== 0) {
      // pop the first item in the priority queue
      let node = pQueue.dequeue();
      let u = graph[node.index];
      let d = node.dist;

      // if dest found the break
      if (u.id === dest) break;

      // if the node is already visited then continue
      if (u.isVisited === true) {
        continue;
      }

      // mark the node index as visited
      graph[node.index].isVisited = true;

      // add the current graph to the stateTrace
      stateTrace.push(graphInstance.copyGraph(graph));
      for (let i = 0; i < u.adjecentNodes.length; i++) {
        let v = u.adjecentNodes[i].adjecentNode;
        let weight = u.adjecentNodes[i].weight;

        // if the node is a block then skip it
        if (graph[v].isBlock === true) continue;

        if (distance[v] > d + weight) {
          distance[v] = d + weight;
          pQueue.queue({ dist: distance[v], index: v });
          graph[v].parent = u;
        }
      }
    }

    // tracing the path from the source to the destination

    let path = [];
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
  return {
    findPath,
  };
}

export default Dijkstra;
