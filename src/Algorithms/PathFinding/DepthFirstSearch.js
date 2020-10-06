import React from "react";
import Graph from "../../Models/Graph";

const graphInstance = Graph();

function DepthFirstSearch() {
  const stateTrace = React.createRef();
  stateTrace.current = [];

  function dfsRec(graph, src, dest, events) {
    let destFound = false;
    graph[src].isVisited = true;
    stateTrace.current.push(graphInstance.copyGraph(graph));
    let adjs = graph[src].adjecentNodes;
    for (let i = 0; i < adjs.length; i++) {
      let node = adjs[i].adjecentNode;
      if (graph[node].isBlock === true) continue;
      if (graph[node].isVisited === false) {
        graph[node].parent = graph[src];
        if (node === dest) {
          graph[node].isVisited = true;
          return (destFound = true);
        }
        destFound = dfsRec(graph, node, dest, events);
      }
      if (destFound === true) break;
    }

    return destFound;
  }

  function findPath(grf, src, dest, events) {
    let path = [];
    let graph = graphInstance.copyGraph(grf);

    dfsRec(graph, src, dest, events);
    let tmp = graph[dest];
    while (tmp !== null) {
      path.push(tmp);
      tmp = tmp.parent;
    }
    if (path.length > 1) {
      for (let i = path.length - 1; i >= 0; i--) {
        path[i].isInPath = true;
        stateTrace.current.push(graphInstance.copyGraph(graph));
      }
    }
    return { stateTrace: stateTrace.current, path };
  }

  return {
    findPath,
  };
}

export default DepthFirstSearch;
