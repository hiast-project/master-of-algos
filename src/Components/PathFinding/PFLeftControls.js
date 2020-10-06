import React from "react";
import PFControlItem from "../PFControlItem";
import "../../Styles/PFLeftControls.css";

function PFLeftControls(props) {
  const { handlers, algorithms, isAddingNodes, isAddingEdges } = props;
  return isAddingNodes === true || isAddingEdges ? (
    <div
      className="done-button centered"
      onClick={() => {
        handlers.handleActivateAddingNodes.current(false);
        handlers.handleActivateAddingEdges.current(false);
      }}
    >
      Stop Adding {isAddingEdges ? "edges" : "nodes"}
    </div>
  ) : (
    <ul className="controls">
      <li className="controls-item">
        <div className="algo-select">
          <PFControlItem
            handlers={handlers}
            label="Algorithm"
            content={[
              {
                text: "BFS",
                action: () => {
                  handlers.handleSetAlgorithm.current(
                    algorithms.breadthFirstSearch
                  );
                  handlers.handleSetInfo.current({
                    name: "Breadth First Search (BFS)",
                    description:
                      "BFS is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root, and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.",
                    complexity: "O(V + E)",
                  });
                },
              },
              {
                text: "DFS",
                action: () => {
                  handlers.handleSetAlgorithm.current(
                    algorithms.depthFirstSearch
                  );
                  handlers.handleSetInfo.current({
                    name: "Depth First Search (DFS)",
                    description:
                      "DFS is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node and explores as far as possible along each branch before backtracking.",
                    complexity: "O(V + E)",
                  });
                },
              },
              {
                text: "Dijkstra",
                action: () => {
                  handlers.handleSetAlgorithm.current(algorithms.dijkstra);
                  handlers.handleSetInfo.current({
                    name: "Dijkstra",
                    description:
                      "Dijkstra is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks.",
                    complexity: "O(E + V * log(E))",
                  });
                },
              },
              {
                text: "Best First Search",
                action: () => {
                  handlers.handleSetAlgorithm.current(
                    algorithms.greedyBestFIrstSearch
                  );
                  handlers.handleSetInfo.current({
                    name: "Best First Search",
                    description:
                      "Best first search is a traversal technique that decides which node is to be visited next by checking which node is the most promising one and then check it. For this it uses an evaluation function to decide the traversal.",
                    complexity: "O(n * log(n))",
                  });
                },
              },
              {
                text: "A*",
                action: () => {
                  handlers.handleSetAlgorithm.current(algorithms.aStar);
                  handlers.handleSetInfo.current({
                    name: "A*",
                    description:
                      "A* is a graph traversal and path search algorithm, which is often used in many fields of computer science due to its completeness, optimality, and optimal efficiency. One major practical drawback is its O(b^d) space complexity, as it stores all generated nodes in memory.",
                    complexity: "O(E)",
                  });
                },
              },
            ]}
          />
        </div>
      </li>
      <li className="controls-item">
        <PFControlItem
          handlers={handlers}
          label={
            props.selectedLayout
              ? props.selectedLayout.charAt(0).toUpperCase() +
                props.selectedLayout.slice(1)
              : "Layout"
          }
          content={[
            {
              text: "Graph",
              action: () => handlers.handleSelectLayout.current("graph"),
            },
            {
              text: "Grid",
              action: () => handlers.handleSelectLayout.current("grid"),
            },
          ]}
        />
      </li>
      {props.selectedLayout === "graph" && (
        <li className="controls-item">
          <PFControlItem
            handlers={handlers}
            label="Generate"
            content={[
              {
                text: "Graph",
                action: () => handlers.handleGenerateGraph.current(),
              },
            ]}
          />
        </li>
      )}
      {props.selectedLayout === "graph" && (
        <li className="controls-item">
          <PFControlItem
            handlers={handlers}
            label="Add"
            content={[
              {
                text: "Nodes",
                action: () => handlers.handleActivateAddingNodes.current(true),
              },
              {
                text: "Edges",
                action: () => handlers.handleActivateAddingEdges.current(true),
              },
            ]}
          />
        </li>
      )}
      {props.selectedLayout && (
        <li
          className="controls-item col-white pointer"
          onClick={() => {
            handlers.init.current();
          }}
        >
          Clear
        </li>
      )}
    </ul>
  );
}

export default PFLeftControls;
