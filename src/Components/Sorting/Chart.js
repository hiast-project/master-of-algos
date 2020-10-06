import React from "react";

import ChartLine from "./ChartLine";

function Chart(props) {
  return (
    <div className="Chart" key={props.num}>
      {/* going in a loop to make elementsNum of bars in the canvas */}
      {[...Array(props.array.length)].map((_, i) => (
        <ChartLine
          chartLine={JSON.stringify(props.array[i])}
          index={i}
          key={i * 10}
          width={props.width}
          elementsNum={props.num}
        />
      ))}
    </div>
  );
}
export default Chart;
