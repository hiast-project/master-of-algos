import Node from "./Node";

let nodeInstance = Node();

const Graph = () => {
  // generateAdjecents: genrates adjecent nodes for some node
  // -- in case (selectedLayout: "grid"), the adjecent nodes must be the #four nodes to the
  // -- -- right, bottom, left, and up of the current node
  // -- in case (selectedLayout: "graph"), the adjecent nodes can be generated randomly
  // -- -- we set some rules to generate the adjecent nodes in this case:
  // -- -- -- * no self loops
  // -- -- -- * edges are bidirectional so the edge from node[i] to node[j] is the same from node[j] to node[i]
  function generateAdjecents(node, lines, cols) {
    // adjs: will contain array of adjecent nodes
    let adjs = [];

    /*
     * case (selectedLayout: "grid"):
     */

    // if "node" coordinates are x, y
    // -- where x is the number of the line where "node" exists
    // -- and y is the number of the column where "node" exists
    // -- (x and y start from zero)
    // then adjecent nodes to "node" are in the next coordinates:
    // -- {x + 0, y + 1}
    // -- {x + 1, y + 0}
    // -- {x + 0, y - 1}
    // -- {x - 1, y + 0}
    // we can form the previous coordinates using the next direction arrays
    let directionX = [0, 1, 0, -1];
    let directionY = [1, 0, -1, 0];

    for (var i = 0; i < 4; i++) {
      // add the coordinates of the new adjecent node to "adjs"
      // only if they are in the grid
      if (
        checkIfValid(
          node.x + directionX[i],
          node.y + directionY[i],
          lines,
          cols
        ) === true
      ) {
        // adjs.push({ x: node.x + directionX[i], y: node.y + directionY[i] });
        adjs.push({
          adjecentNode:
            (node.x + directionX[i]) * cols + (node.y + directionY[i]),
          weight: 1,
        });
      }
    }
    // return the adjecent array of "node"
    return adjs;
  }

  // checkIfValid: checks if coordinates {x, y} are in a grid has n lines and m columns
  // if {x, y} are in the grid, "checkIfValid" returns "true", otherwise, it returns "false"

  function checkIfValid(x, y, lines, cols) {
    // x and y start from (0), so if x or y < (0) then these coordinates are out of the grid
    // the same happens if x >= lines or y >= columns
    // otherwise, coordinates {x, y} are in the grid
    if (x >= lines || y >= cols || x < 0 || y < 0) return false;

    return true;
  }

  // create grid graph
  function createGraph(lines, columns, source, destination) {
    let tmpGraph = [];

    let ctr = 0;
    for (let i = 0; i < lines; i++) {
      for (let j = 0; j < columns; j++) {
        tmpGraph[ctr] = nodeInstance.createNode(ctr, i, j);
        tmpGraph[ctr].adjecentNodes = generateAdjecents(
          { x: i, y: j },
          lines,
          columns
        );
        ctr++;
      }
    }
    tmpGraph[source].isSourceNode = true;
    tmpGraph[destination].isDestinationNode = true;
    return tmpGraph;
  }

  // add nodes to the graph
  function addNode(id, x, y) {
    return nodeInstance.createNode(id, x, y);
  }

  // genterate random graph
  function generateGraph(numOfNodes, canvasDiminsions) {
    let tmpGraph = [];
    let canvasWidth = canvasDiminsions.width;
    let canvasHeight = canvasDiminsions.height;
    let x = (canvasWidth * 5) / 100;
    let y = (canvasHeight * 50) / 100;

    let xSpace = (canvasWidth * (90 / numOfNodes)) / 100;
    let ySpace = (canvasHeight * 25) / 100;
    for (let i = 0; i < numOfNodes; i++) {
      console.log(x, y);
      tmpGraph[i] = addNode(i, x, y);
      x = i % 2 ? x : (x += xSpace);

      y += 2 * ySpace;
      y = y >= canvasHeight ? (y = ySpace) : y;
    }
    let minNumOfEdges = 0;
    let maxNumOfEdges = 2;
    for (let i = 0; i < numOfNodes; i++) {
      const numOfEdges = Math.round(
        minNumOfEdges + Math.random() * (maxNumOfEdges - minNumOfEdges)
      );
      let ctr = 0;
      while (ctr < numOfEdges) {
        let minIndexOfNode = 0;
        let maxIndexOfNode = numOfNodes - 1;
        let adj = Math.round(
          minIndexOfNode + Math.random() * (maxIndexOfNode - minIndexOfNode)
        );
        if (adj === i) {
          continue;
        }
        ctr++;
        let br = false;
        for (let j = 0; j < tmpGraph[i].adjecentNodes.length; j++) {
          if (tmpGraph[i].adjecentNodes[j].adjecentNode === adj) {
            br = true;
            break;
          }
        }
        if (br === true) {
          continue;
        }
        let minWeight = 1;
        let maxWeight = 100;
        let weight = Math.round(
          minWeight + Math.random() * (maxWeight - minWeight)
        );
        tmpGraph[i].adjecentNodes[tmpGraph[i].adjecentNodes.length] = {
          adjecentNode: adj,
          weight: weight,
        };
        tmpGraph[adj].adjecentNodes[tmpGraph[adj].adjecentNodes.length] = {
          adjecentNode: i,
          weight: weight,
        };
      }
    }

    tmpGraph[0].isSourceNode = true;
    tmpGraph[tmpGraph.length - 1].isDestinationNode = true;
    return tmpGraph;
  }

  // clear a graph
  function clear(graph) {
    for (let i = 0; i < graph.length; i++) {
      graph[i].isVisited = false;
      graph[i].isReadyToRelax = false;
      graph[i].isInPath = false;
      // graph[i].isBlock = false;
      graph[i].parent = null;
    }
    return graph;
  }

  // copy values of a graph to a new one
  function copyGraph(graph) {
    let tmpGraph = [];
    for (let i = 0; i < graph.length; i++) {
      let node = nodeInstance.copyNode(graph[i]);
      tmpGraph[i] = node;
    }
    return tmpGraph;
  }
  return { createGraph, addNode, generateGraph, clear, copyGraph };
};

export default Graph;
