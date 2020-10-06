import React, { useState } from "react";
import NodeLayout from "./NodeLayout";
import { ArcherContainer } from "react-archer";
import { makeStyles } from "@material-ui/core/styles";

function GraphView(props) {
  const [cell, setCell] = useState({ id: null, x: 0, y: 0 });
  const [open, setOpen] = useState(false);

  const handleRightClick = (e, id, x, y) => {
    e.preventDefault();
    setCell({ id, x, y });
    setOpen(true);
  };

  const useStyles = makeStyles({
    contextMenu: {
      width: "150px",
      height: "50px",
      position: "absolute",
      top: cell.y - 130,
      left: cell.x,
      background: "#fff",
    },
    contextItem: {
      height: "25px",
      width: "100%",
      border: "1px solid #000",
      display: "flex",
      alignItems: "center",
      padding: "5px",
      cursor: "pointer",
    },
  });

  const classes = useStyles();

  const { graph, handlers } = props;

  /*
   * relations(ndx): creates relations between a node and its adjecent nodes to be used for making edges with them
   * every relation consists of:
   * --- targetId: id of the adjecent nod
   * --- targetAnchor: the archer (edge) anchor on the target node
   * --- sourceAnchor: the archer (edge) anchor on the current node
   * --- style: styling the archer (edge)
   * --- label: a label for the edge, used to show weights
   */
  const relations = (i) => {
    let relations = [];
    for (let j = 0; j < graph[i].adjecentNodes.length; j++) {
      if (i < graph[i].adjecentNodes[j].adjecentNode) {
        relations.push({
          targetId: "node-" + graph[i].adjecentNodes[j].adjecentNode,
          targetAnchor: "middle",
          sourceAnchor: "middle",
          style: {
            strokeColor:
              i < graph[i].adjecentNodes[j].adjecentNode ? "blue" : "red",
            strokeWidth: 1,
          },
          label: (
            <div style={{ marginTop: "-20px" }}>
              {graph[i].adjecentNodes[j].weight}
            </div>
          ),
        });
      }
    }
    return relations;
  };

  return (
    <div
      id={props.id}
      className="grid centered"
      onClick={(e) => {
        if (props.isAddingNodes) {
          handlers.handleAddNodes.current(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
          );
        }
      }}
    >
      {graph && graph.length > 0 ? (
        <ArcherContainer strokeColor="red" className="grid">
          {graph &&
            graph.map((_, i) => (
              <NodeLayout
                id={"node-" + i.toString()}
                key={i}
                index={i}
                x={graph[i].x}
                y={graph[i].y}
                cell={JSON.stringify(props.graph[i])}
                handlers={handlers}
                relations={relations(i)}
                handleRightClick={handleRightClick}
              />
            ))}
        </ArcherContainer>
      ) : (
        <span className="decorated">Generate a grah or start creating one</span>
      )}
      {open && (
        <div
          className="full"
          onClick={() => setOpen(false)}
          onContextMenu={() => setOpen(false)}
        >
          <div className={classes.contextMenu}>
            <div
              className={classes.contextItem}
              onClick={() => {
                handlers.handleSetSourceNode.current(cell.id);
              }}
            >
              Set Source
            </div>
            <div
              className={classes.contextItem}
              onClick={() => {
                handlers.handleSetDestinationNode.current(cell.id);
              }}
            >
              Set Destination
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GraphView;
