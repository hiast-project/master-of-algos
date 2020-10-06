import Graph from "../../Models/Graph";

const graphInstance = Graph();

function BreadthFirstSearch() {
  function findPath(grf, src, dest) {
    // defin a queue
    var myQueue = [src];

    // defin a boolean to check if destination found
    let destFound = false;

    // defin a path array to be returned
    let path = [];

    // defin a stateTrace, will contain set of graphs, each one has a node changed
    let stateTrace = [];

    // copy the graph to avoid changing the original one
    let graph = graphInstance.copyGraph(grf);

    // adding the original graph to the stateTrace
    stateTrace.push(graphInstance.copyGraph(graph));

    // marking the source node as visited
    graph[src].isVisited = true;

    // adding the original graph with the source node visited to the stateTrace
    stateTrace.push(graphInstance.copyGraph(graph));

    // while the destination is not found and there are still nodes to visit do the next
    while (myQueue.length !== 0 && destFound === false) {
      // pop the first element in the queue
      var current = myQueue.shift();

      // get the adjecent nodes of the currnet node
      let adjs = graph[current].adjecentNodes;

      // loop over the adjecent node
      for (let i = 0; i < adjs.length; i++) {
        let node = adjs[i].adjecentNode;

        // if an adjecent node is a block, then it can not be visited
        if (graph[node].isBlock === true) continue;

        // if an adjecent node is already visited, then it can not be visited again
        if (graph[node].isVisited === false) {
          // if an adjecent node the destination, then destFound is true
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
          myQueue.push(node);
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
  return {
    findPath,
  };
}

export default BreadthFirstSearch;
