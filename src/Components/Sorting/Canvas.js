import React from "react";
import "../../Styles/Canvas.css";
import Chart from "./Chart";
function Canvas(props) {
  return (
    <div className="Canv">
      {props.show ? (
        <Chart
          num={props.array.length} // number of bars
          array={props.array} // the array we need to illustrate
          width={props.gridwid} // the bar width
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Canvas;
