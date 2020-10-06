import React, { useCallback, useRef, useState } from "react";

import "./Grid.css";
import GridCell from "./GridCellLayout";

function Grid(props) {
  const [mouseDown, setMouseDown] = useState(false);

  const handleMouseOverCell = useRef();
  handleMouseOverCell.current = (id) => {
    if (mouseDown) {
      // if clicking on a cell was fired, one of the next senarios are happining:
      // --- trying to move the source node if the clicked cell is a source
      // --- trying to move the destination node if the clicked cell is a destination
      // --- trying to add/remove block node if the clicked cell is a empty/block
      if (props.isSettingSource) {
        if (props.graph[id].isDestinationNode === false)
          props.handlers.handleSetSourceNode.current(id);
      } else if (props.isSettingDestination) {
        if (props.graph[id].isSourceNode === false)
          props.handlers.handleSetDestinationNode.current(id);
      } else props.handlers.handleAddBlock.current(id);
    }
  };
  return (
    <div
      id={props.id}
      className="grid"
      onMouseDown={() => {
        setMouseDown(true);
      }}
      onMouseUp={() => {
        setMouseDown(false);
        props.handlers.handleActivateSetingSourceNode.current(false);
        props.handlers.handleActivateSetingDestinationNode.current(false);
      }}
    >
      {[...Array(props.lines)].map((_, i) => (
        <div id={props.id} key={i} className="grid-row">
          {[...Array(props.columns)].map((_, j) => (
            <GridCell
              id={"grid-cell-" + i + "-" + j}
              key={i * props.columns + j}
              cell={JSON.stringify(props.graph[i * props.columns + j])}
              handlers={props.handlers}
              handleMouseOverCell={handleMouseOverCell}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
