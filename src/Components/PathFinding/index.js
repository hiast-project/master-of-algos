import React, { useEffect, useState } from "react";
import "../../App.css";
import "../../Styles/responsive.css";
import "../../Styles/NavButton.css";
import { useDetectOutsideClick } from "../../useDetectOutsideClick";
import PlaceIcon from "@material-ui/icons/Place";
import Tooltip from "@material-ui/core/Tooltip";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { useRef } from "react";
import PFLeftControls from "./PFLeftControls";
import Canvas from "./Canvas";

import "../../Styles/InfoBox.css";
import Graph from "../../Models/Graph";
import Algorithms from "../../Algorithms";
import PathFindingStrategy from "../../Strategies/PathFindingStrategy";

const graphInstance = Graph();
const algorithms = Algorithms();
const pathFindingStrategy = PathFindingStrategy();
let delay = 0;

const INIT_VALS = {
  grid_lines: 20,
  grid_columns: 40,
  grid_start_node: 335,
  grid_destination_node: 384,
  node_radius: 17.5,
};

function PathFindingApp() {
  const dropdownRef = useRef(null);

  const [play, setPlay] = useState(false);
  const [info, setInfo] = useState("");

  const handleSetInfo = useRef();
  handleSetInfo.current = (info) => {
    setInfo(info);
  };

  // selectedLayout: chose what layout --graph or grid-- are being used
  // initial state -> (selectedLayout: "graph")
  // graph -> (selectedLayout: "graph")
  // grid -> (selectedLayout: "grid")
  const [selectedLayout, setSelectedLayout] = React.useState("");

  // graph: will contain the graph
  const [graph, setGraph] = useState([]);

  // graphTrace: will contain the path from source to destination, and set of graphs, each will present a state of he graph
  // where one node has changed
  const [graphTrace, setGraphTrace] = useState({});

  // graphTraceIndex keeps track of what statethe graph is when running the algorithm
  const [graphTraceIndex, setGraphTraceIndex] = useState(0);

  // isSettingSource: boolean to notify the app that the user is setting the source
  const [isSettingSource, setIsSettingSource] = useState(false);

  // isSettingDestination: boolean to notify the app that the user is setting the destination
  const [isSettingDestination, setIsSettingDestination] = useState(false);

  // isAddingNodes: boolean to notify the app that the user is adding a node
  const [isAddingNodes, setIsAddingNodes] = useState(false);

  // isAddingEdges: boolean to notify the app that the user is adding edges
  const [isAddingEdges, setIsAddingEdges] = useState(false);

  // isAddingBlocks: boolean to notify the app that the user is adding blocks
  const [isAddingBlocks, setIsAddingBlocks] = useState(false);

  // edgeFirstNode: when adding edges, we keep track of the first node till the second node is selected
  const [edgeFirstNode, setEdgeFirstNode] = useState(null);

  // sourceNode: source node of the graph
  const [sourceNode, setSourceNode] = useState(0);

  // destinationNode: destination node of the graph
  const [destinationNode, setDestinationNode] = useState(1);

  // canvasDiminsions: diminsions of the canvas, to give coordinates for the generated nodes when generating graphs
  const [canvasDiminsions, setCanvasDiminsions] = useState({
    width: 0,
    height: 0,
  });

  // algorithm: the choosen algorithm to be run
  const [algorithm, setAlgorithm] = useState(null);

  // init(): initialize the path finding app
  const init = useRef();
  init.current = () => {
    if (interval) clearInterval(interval.current);
    setGraphTrace({ stateTrace: [], path: [] });
    setGraphTraceIndex(0);
    setPlay(false);
    setGraph(graphInstance.clear(graph));
  };

  // handleSelectLayout: set the value of selectedLayout
  // parameters: layout -> either (layout: "graph") or (layout: "grid")
  const handleSelectLayout = useRef();
  handleSelectLayout.current = (layout) => {
    // initialize the app
    init.current();

    // set the choosen layout
    setSelectedLayout(layout);

    // graph comes empty
    if (layout === "graph") setGraph([]);
    else {
      // grid comes as a net
      setGraph(
        graphInstance.createGraph(
          INIT_VALS.grid_lines,
          INIT_VALS.grid_columns,
          INIT_VALS.grid_start_node,
          INIT_VALS.grid_destination_node
        )
      );
      setSourceNode(INIT_VALS.grid_start_node);
      setDestinationNode(INIT_VALS.grid_destination_node);
    }
  };

  // notify the app to listen for clicking on canvas to add nodes
  const handleActivateAddingNodes = useRef();
  handleActivateAddingNodes.current = (value) => {
    setIsAddingNodes(value);
  };

  // notify the app to add a node when clicking on the canvas
  const handleAddNodes = useRef();
  handleAddNodes.current = (x, y) => {
    if (selectedLayout === "graph" && isAddingNodes) {
      init.current();
      setGraph((prevGraph) => [
        ...prevGraph,
        graphInstance.addNode(
          prevGraph.length,
          x - INIT_VALS.node_radius,
          y - INIT_VALS.node_radius
        ),
      ]);
    }
  };

  // notify the app to listen for clicking on canvas to add edges
  const handleActivateAddingEdges = useRef();
  handleActivateAddingEdges.current = (value) => {
    setIsAddingEdges(value);
  };

  // notify the app to add a edges when clicking on the nodes
  const handleAddEdges = useRef();
  handleAddEdges.current = (index) => {
    if (selectedLayout === "graph" && isAddingEdges) {
      init.current();
      // set the first node to "index"
      if (edgeFirstNode === null) {
        setEdgeFirstNode(index);
      } else if (edgeFirstNode !== null && index !== edgeFirstNode) {
        let flag = true;
        // first node was already set
        if (graph[edgeFirstNode].adjecentNodes)
          for (let i = 0; i < graph[edgeFirstNode].adjecentNodes.length; i++) {
            if (graph[edgeFirstNode].adjecentNodes[i].adjecentNode === index) {
              flag = false;
              break;
            }
          }
        if (flag)
          setGraph(
            [...graph],
            (graph[edgeFirstNode].adjecentNodes[
              graph[edgeFirstNode].adjecentNodes.length
            ] = { adjecentNode: index, weight: 0 }),
            (graph[index].adjecentNodes[graph[index].adjecentNodes.length] = {
              adjecentNode: edgeFirstNode,
              weight: 0,
            })
          );
        setEdgeFirstNode(null);
      }
    }
  };

  // calls the find path strategy
  // parameters: the algorithm, the graph, source, destination
  const handleFindPath = useRef();
  handleFindPath.current = (algorithm) => {
    pathFindingStrategy(algorithm, graph, sourceNode, destinationNode);
  };

  const handleGenerateGraph = useRef();
  handleGenerateGraph.current = () => {
    init.current();
    setSourceNode(0);
    setDestinationNode(3);
    setGraph(graphInstance.generateGraph(4, canvasDiminsions, handlers));
  };

  // when drag, a node's coordinates will change
  // so handleDrag just refresh the graph for the new coordinates
  const handleDrag = useRef();
  handleDrag.current = () => {
    setGraph([...graph]);
  };

  // notify the app to listen for changing the source node
  const handleActivateSetingSourceNode = useRef();
  handleActivateSetingSourceNode.current = (value) => {
    setIsSettingSource(value);
  };

  // set the source node
  const handleSetSourceNode = useRef();
  handleSetSourceNode.current = (index) => {
    init.current();
    // make sure that all node are not source nodes
    for (let i = 0; i < graph.length; i++) {
      graph[i].isSourceNode = false;
    }

    // if the new source is a block then it must not be block
    graph[index].isBlock = false;
    graph[index].isSourceNode = true;
    setGraph([...graph]);
    setSourceNode(index);
  };

  // notify the app to listen for changing the destination node
  const handleActivateSetingDestinationNode = useRef();
  handleActivateSetingDestinationNode.current = (value) => {
    setIsSettingDestination(value);
  };

  // set the source node
  const handleSetDestinationNode = useRef();
  handleSetDestinationNode.current = (index) => {
    init.current();
    // make sure that all node are not source nodes
    for (let i = 0; i < graph.length; i++) {
      graph[i].isDestinationNode = false;
    }
    // if the new source is a block then it must not be block
    graph[index].isBlock = false;
    graph[index].isDestinationNode = true;
    setGraph([...graph]);
    setDestinationNode(index);
  };

  // get the diminsions of the canvas
  const handleSetCanvasDimensions = useRef();
  handleSetCanvasDimensions.current = (canvasWidth, canvasHeight) => {
    setCanvasDiminsions({ width: canvasWidth, height: canvasHeight });
  };

  // interval will contain the running algorithm
  const interval = useRef(null);

  // when running the algorithm, its output is saved in graph trace as a memory of set of graphs
  // showing these graphs back to back will be like running the algorithm in real time
  const simulateAlgorithmRun = useRef();
  simulateAlgorithmRun.current = (algorithmOutput) => {
    // count will keep track of what index we are of the graph states
    let count = 0;

    // when pressing the start/continue button
    // if the algorithm was already run, it restarts
    // else it containues
    if (
      graphTrace.stateTrace &&
      graphTraceIndex === graphTrace.stateTrace.length
    ) {
      setGraphTraceIndex(0);
    } else count = graphTraceIndex;

    // repeat instructions in the interval every "delay" ms.
    // first set the graph to the next state, where one node has changed
    // then increase the index of the state
    interval.current = setInterval(
      () => {
        setGraph(algorithmOutput.stateTrace[count]);
        setGraphTraceIndex((prevIndex) => prevIndex + 1);

        count++;
        if (count === algorithmOutput.stateTrace.length) {
          clearInterval(interval.current);
          setPlay(false);
        }
      },
      selectedLayout === "graph" ? 300 : delay
    );
  };

  // run the algorithm
  const handleRunAlgorithm = useRef();
  handleRunAlgorithm.current = async (
    algorithm,
    graph,
    sourceNode,
    destinationNode
  ) => {
    if (!algorithm) {
      alert("Please select an algorithm first!");
    } else if (!graph || graph.length === 0) {
      alert("Please generate a graph first!");
    } else if (!graphTrace.stateTrace || graphTrace.stateTrace.length === 0) {
      setPlay(true);
      const algorithmOutput = pathFindingStrategy(
        algorithm,
        graph,
        sourceNode,
        destinationNode,
        handlers
      );
      setGraphTrace(algorithmOutput);
      simulateAlgorithmRun.current(algorithmOutput);
    } else {
      setPlay(true);
      // just continue the previous running, or restart it
      simulateAlgorithmRun.current(graphTrace);
    }
  };
  console.log(graphTrace);
  // notify the app to add blocks
  const handleActivateAddingBlocks = useRef();
  handleActivateAddingBlocks.current = () => {
    setIsAddingBlocks(!isAddingBlocks);
  };

  // notify the app to add block when clicking on a cell
  const handleAddBlock = useRef();
  handleAddBlock.current = (index) => {
    if (
      !isSettingSource &&
      !isSettingDestination &&
      !isAddingEdges &&
      !graph[index].isSourceNode &&
      !graph[index].isDestinationNode
    ) {
      init.current();
      setGraph([...graph], (graph[index].isBlock = !graph[index].isBlock));
    }
  };

  // handle when clicking on a cell
  const handleNodeClick = useRef();
  handleNodeClick.current = (index) => {
    if (isSettingSource) handleSetSourceNode.current(index);
    else if (isSettingDestination) handleSetDestinationNode.current(index);
    else if (isAddingEdges) handleAddEdges.current(index);
    else handleAddBlock.current(index);
  };

  // reset the graph, keeps the source and the destination
  const handleResetGraph = useRef();
  handleResetGraph.current = () => {
    setGraph([...graph], graphInstance.clear(graph));
  };

  // set the choosen algorithm
  const handleSetAlgorithm = useRef();
  handleSetAlgorithm.current = (algorithm) => {
    if (play) handlePauseAlgorithm.current(algorithm);
    init.current();
    setAlgorithm(algorithm);
  };

  // one previous step in algorithm
  const handleAlgorithmPrevStep = useRef();
  handleAlgorithmPrevStep.current = () => {
    let ndx = graphTraceIndex - 1;
    if (ndx >= 0) {
      setGraphTraceIndex((prevIndex) => prevIndex - 1);
      if (graphTrace.stateTrace[ndx]) setGraph(graphTrace.stateTrace[ndx]);
    }
  };

  // pause the algorithm
  const handlePauseAlgorithm = useRef();
  handlePauseAlgorithm.current = () => {
    // setIsRunningAlgorithm(false);
    if (graphTraceIndex > 0) setGraphTraceIndex((prev) => prev - 1);
    clearInterval(interval.current);
  };

  // one next step in algorithm
  const handleAlgorithmNextStep = useRef();
  handleAlgorithmNextStep.current = () => {
    let ndx = graphTraceIndex + 1;
    if (graphTrace.stateTrace && graphTrace.stateTrace.length > ndx) {
      setGraphTraceIndex((prevIndex) => prevIndex + 1);
      if (graphTrace.stateTrace[ndx]) setGraph(graphTrace.stateTrace[ndx]);
    }
  };

  // when changing the algorithm, the previous one stops if it was running
  // the index for the graph trace becomes `0`, and the graph trace gets cleared
  useEffect(() => {
    setPlay(false);
    setGraphTraceIndex(0);
    setGraphTrace([]);
  }, [algorithm]);

  // handlers will be passed to the components to run the functions
  const [handlers, setHandlers] = useState({
    init,
    handleSelectLayout,
    handleActivateAddingNodes,
    handleAddNodes,
    handleActivateAddingEdges,
    handleAddEdges,
    handleActivateSetingSourceNode,
    handleSetSourceNode,
    handleActivateSetingDestinationNode,
    handleSetDestinationNode,
    handleFindPath,
    handleGenerateGraph,
    handleDrag,
    handleSetCanvasDimensions,
    handleRunAlgorithm,
    handleAddBlock,
    handleActivateAddingBlocks,
    handleNodeClick,
    handleResetGraph,
    handleAlgorithmPrevStep,
    handlePauseAlgorithm,
    handleAlgorithmNextStep,
    handleSetAlgorithm,
    handleSetInfo,
  });
  return (
    <div className="col-sm-12 main-body">
      <div className="col-sm-12 col-lg-9 left-side">
        <div className="left-control-bar">
          <PFLeftControls
            algorithms={algorithms}
            handlers={handlers}
            graph={graph}
            isAddingEdges={isAddingEdges}
            isAddingNodes={isAddingNodes}
            selectedLayout={selectedLayout}
            sourceNode={sourceNode}
            destinationNode={destinationNode}
          />
        </div>
        <div className="canvas-container">
          <Canvas
            graph={graph}
            selectedLayout={selectedLayout}
            handlers={handlers}
            isSettingSource={isSettingSource}
            isSettingDestination={isSettingDestination}
            isAddingNodes={isAddingNodes}
          />
        </div>
      </div>
      <div className="col-sm-12 col-lg-3 right-side">
        <div className="col-sm-12 right-control-bar">
          <Tooltip title="Previous" aria-label="previous">
            <NavigateBeforeIcon
              style={{ color: "white" }}
              className="cursor-pointer"
              onClick={() => {
                handleAlgorithmPrevStep.current();
              }}
            />
          </Tooltip>
          {!play ? (
            <Tooltip title="Start / Continue" aria-label="start_continue">
              <PlayArrowIcon
                style={{ color: "white" }}
                className="cursor-pointer"
                onClick={() => {
                  handleRunAlgorithm.current(
                    algorithm,
                    graph,
                    sourceNode,
                    destinationNode
                  );
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Pause" aria-label="pause">
              <PauseIcon
                style={{ color: "white" }}
                className="cursor-pointer"
                onClick={() => {
                  setPlay(false);
                  handlePauseAlgorithm.current();
                }}
              />
            </Tooltip>
          )}
          <Tooltip title="Next" aria-label="pause">
            <NavigateNextIcon
              style={{ color: "white" }}
              className="cursor-pointer"
              onClick={() => {
                handleAlgorithmNextStep.current();
              }}
            />
          </Tooltip>
        </div>
        <div className="col-sm-6 col-lg-12 console-container">
          <div
            className={
              "col-sm-12 console " + (selectedLayout ? "" : "centered")
            }
          >
            {selectedLayout ? (
              <div className="consol-content">
                <div className="consol-line">
                  <PlaceIcon style={{ color: "red" }} />
                  <span className="console-line-content">
                    Source (Start) node
                  </span>
                </div>
                <div className="consol-line">
                  <PlaceIcon style={{ color: "blue" }} />
                  <span className="console-line-content">
                    Destination (End) node
                  </span>
                </div>
                <div className="consol-line">
                  <div className="circle visited-cell"></div>
                  <span className="console-line-content">visited node</span>
                </div>
                <div className="consol-line">
                  <div className="circle path-cell"></div>
                  <span className="console-line-content">path node</span>
                </div>
                <div className="consol-line">
                  <div className="circle block-cell"></div>
                  <span className="console-line-content">block node</span>
                </div>
              </div>
            ) : (
              <div className="consol-content centered">
                <div className="consol-line">
                  <span className="empty-info">
                    Select an algorithm and a layout
                  </span>
                </div>
                <div className="consol-line">
                  <span className="empty-info">Then run the algorithm</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-sm-6 col-lg-12 info-box-container">
          <div className={"info-box " + (info ? "" : "centered")}>
            {info ? (
              <div className="consol-content">
                <div className="consol-line">
                  <span className="col-sm-3 consol-line-title">Name: </span>
                  <span className="col-sm-9 console-line-content">
                    {info.name}
                  </span>
                </div>
                <div className="consol-line">
                  <span className="col-sm-3 consol-line-title">
                    Description:{" "}
                  </span>
                  <span className="col-sm-9 console-line-content">
                    {info.description}
                  </span>
                </div>
                <div className="consol-line">
                  <span className="col-sm-3 consol-line-title">
                    Complexity:{" "}
                  </span>
                  <span className="col-sm-9 console-line-content">
                    {info.complexity}
                  </span>
                </div>
              </div>
            ) : (
              <span className="empty-info">Choose an algorithm first</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PathFindingApp;
