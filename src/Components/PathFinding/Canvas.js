import React, { useEffect, useRef } from "react";
import "../../Styles/Canvas.css";

import GridLayout from "./Layouts/GridLayout/GridLayout";
import GraphLayout from "./Layouts/GraphLayout/GraphLayout";

import gridIcon from "../../gridIcon.png";
import graphIcon from "../../graphIcon.png";

function Canvas(props) {
  const { graph, selectedLayout, handlers } = props;

  // canvasRef: to get the diminsions of the canvas
  const canvasRef = useRef();

  // get the diminsions of the canvas when it's mounted
  useEffect(() => {
    handlers.handleSetCanvasDimensions.current(
      canvasRef.current.offsetWidth,
      canvasRef.current.offsetHeight
    );
  }, []);

  return (
    <div className={"canvas centered"} ref={canvasRef}>
      {!selectedLayout ? (
        <div className="canvas-info-container">
          <span className="empty-info decorated">Select Layout</span>
          <div className="canvas-info">
            <div
              className="col-left pointer"
              onClick={() => {
                handlers.handleSelectLayout.current("grid");
              }}
            >
              <img src={gridIcon}></img>
              <span className="empty-info col-blue">Grid</span>
            </div>
            <div
              className="col-left pointer"
              onClick={() => {
                handlers.handleSelectLayout.current("graph");
              }}
            >
              <img src={graphIcon}></img>
              <span className="empty-info col-blue">Graph</span>
            </div>
          </div>
        </div>
      ) : selectedLayout === "grid" ? (
        <GridLayout
          graph={graph}
          isSettingSource={props.isSettingSource}
          isSettingDestination={props.isSettingDestination}
          lines={20}
          columns={40}
          handlers={handlers}
        />
      ) : (
        <GraphLayout
          graph={graph}
          handlers={handlers}
          isAddingNodes={props.isAddingNodes}
        />
      )}
    </div>
  );
}

export default Canvas;
