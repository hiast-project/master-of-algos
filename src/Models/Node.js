import { useState } from "react";

const Node = () => {
  function createNode(id, x, y) {
    return {
      id: id,
      x: x,
      y: y,
      isVisited: false,
      isReadyToRelax: false,
      isInPath: false,
      isBlock: false,
      parent: null,
      adjecentNodes: [],
      isSourceNode: false,
      isDestinationNode: false,
    };
  }
  function copyNode(node) {
    return {
      id: node.id,
      x: node.x,
      y: node.y,
      isVisited: node.isVisited,
      isReadyToRelax: node.isReadyToRelax,
      isInPath: node.isInPath,
      isBlock: node.isBlock,
      parent: node.parent,
      adjecentNodes: node.adjecentNodes,
      isSourceNode: node.isSourceNode,
      isDestinationNode: node.isDestinationNode,
    };
  }
  return { createNode, copyNode };
};

export default Node;
