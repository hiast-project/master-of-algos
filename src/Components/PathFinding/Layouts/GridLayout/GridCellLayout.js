import React, { useEffect } from "react";

import "./Grid.css";

import { makeStyles } from "@material-ui/core/styles";
import PlaceIcon from "@material-ui/icons/Place";

const useStyles = makeStyles({
  gridCell: {
    width: "2.5%",
    height: "100%",
  },
});

function GridCell(props) {
  const classes = useStyles();

  let { id, cell, handlers } = props;

  let node = JSON.parse(cell);
  return (
    <div
      id={id}
      className={
        "grid-cell" +
        " " +
        classes.gridCell +
        " " +
        (node.isBlock
          ? "block-cell"
          : node.isInPath
          ? "path-cell"
          : node.isVisited
          ? "visited-cell"
          : "")
      }
      onMouseDown={() => {
        // if clicking on a cell was fired, one of the next senarios are happining:
        // --- trying to move the source node if the clicked cell is a source
        // --- trying to move the destination node if the clicked cell is a destination
        // --- trying to add/remove block node if the clicked cell is a empty/block
        if (node.isSourceNode) {
          handlers.handleActivateSetingSourceNode.current(true);
        } else if (node.isDestinationNode)
          handlers.handleActivateSetingDestinationNode.current(true);
        else handlers.handleAddBlock.current(node.id);
      }}
      onMouseOver={() => {
        // if the mouse was down then one of the previous sinarios was happening,
        // then they are happening here
        // otherwise, no thing happens
        props.handleMouseOverCell.current(node.id);
      }}
    >
      {node.isSourceNode && <PlaceIcon style={{ color: "red" }} />}
      {node.isDestinationNode && <PlaceIcon style={{ color: "blue" }} />}
      {/* {!node.isSourceNode && !node.isDestinationNode && (
        <span style={{ fontSize: "10px" }}>{node.id}</span>
      )} */}
    </div>
  );
}

export default React.memo(GridCell);
