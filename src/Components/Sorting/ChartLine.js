import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  visible: {
    opacity: "25%",
  },
  swaping: {
    background: "linear-gradient(45deg, #4e5052 30%, #4e5052 90%)",
  },
  final: {
    background: "#17c967",
  },
  pivot: {
    background: "linear-gradient(45deg, #ec9f05 0%, #ff4e00 100%)",
  },
  coloringSingleHeight: {
    background: "linear-gradient(45deg, #4e5052 30%, #4e5052 90%)",
  },
  coloringWithPartition: {
    background: "yellow",
  },
  mergeLeft: {
    background: "linear-gradient(45deg, #ec9f05 30%, #ec9f05 90%)",
  },
  mergeRight: {
    background: "rgb(197, 41, 41)",
  },
});
function ChartLine(props) {
  let chartLine = JSON.parse(props.chartLine);
  const classes = useStyles();
  let showHeight = true;
  if (props.elementsNum > 50) showHeight = false;
  return (
    <div
      key={props.id}
      className={
        "chart-line " +
        (chartLine.isFinal
          ? classes.final
          : chartLine.isVisible
          ? classes.visible
          : chartLine.isSwaping
          ? classes.swaping
          : chartLine.isSingleChange
          ? classes.coloringSingleHeight
          : chartLine.readyToMergeFromLeft
          ? classes.mergeLeft
          : chartLine.readyToMergeFromRight
          ? classes.mergeRight
          : chartLine.isPivot
          ? classes.pivot
          : chartLine.isPassing
          ? classes.coloringWithPartition
          : "")
      }
      style={{ height: chartLine.height + "%", width: props.width + "%" }}
    >
      {showHeight ? chartLine.height : ""}
    </div>
  );
}
export default ChartLine;
