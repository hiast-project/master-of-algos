import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { ArcherElement } from "react-archer";
import Draggable from "react-draggable";
import PlaceIcon from "@material-ui/icons/Place";

function NodeLayout(props) {
  const useStyles = makeStyles({
    gridCellContainer: {
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      position: "absolute",
      top: props.y,
      left: props.x,
    },
    gridCell: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#fff",
    },
    visited: {
      backgroundImage:
        "linear-gradient(45deg, rgb(132, 205, 236) 30% ,rgb(71, 163, 202) 90%)",
    },
    relaxed: {
      background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    },
    pathNode: {
      backgroundImage: "linear-gradient(45deg, #a0f7c7 30%, #36ce7a 90%)",
    },
    sourceNode: {
      background: "linear-gradient(45deg, #0264f7 30%, #0264f7 90%)",
    },
    destinationNode: {
      background: "linear-gradient(45deg, #0264f7 30%, #0264f7 90%)",
    },
    blockNode: {
      background: "linear-gradient(45deg, #989a9c 30%, #36383b 90%)",
    },
  });
  // console.log("Rendering Grid Cell " + props.x + " " + props.y);

  //   let col = props.isVisited ? "green" : "red";
  const { handlers, cell, relations } = props;
  let node = JSON.parse(cell);

  const classes = useStyles();

  return (
    <Draggable
      onDrag={(event, ui) => {
        handlers.handleDrag.current(props.index, event, ui);
        ui.deltaX = 0;
        ui.deltaY = 0;
      }}
      key={"draggable-" + props.index}
      bounds="parent"
    >
      <div
        className={classes.gridCellContainer}
        onContextMenu={(e) =>
          props.handleRightClick(e, node.id, e.clientX, e.clientY)
        }
        onClick={() => {
          handlers.handleAddEdges.current(node.id);
        }}
      >
        <ArcherElement
          id={"node-" + props.index}
          key={"node-" + props.index}
          relations={relations}
        >
          <div
            id={props.id}
            key={props.number}
            x={props.x}
            y={props.y}
            className={
              "graph-node-" +
              props.index +
              " " +
              "grid-cell" +
              " " +
              classes.gridCell +
              " " +
              (node.isInPath
                ? classes.pathNode
                : node.isVisited
                ? classes.visited
                : "")
            }
          >
            {node.isSourceNode && <PlaceIcon style={{ color: "red" }} />}
            {node.isDestinationNode && <PlaceIcon style={{ color: "blue" }} />}
            {!node.isSourceNode && !node.isDestinationNode && props.index}
          </div>
        </ArcherElement>
      </div>
    </Draggable>
  );
}

export default React.memo(NodeLayout);
