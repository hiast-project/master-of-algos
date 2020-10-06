import BreadthFirstSearch from "./PathFinding/BreadthFirstSearch";
import DepthFirstSearch from "./PathFinding/DepthFirstSearch";
import Dijkstra from "./PathFinding/Dijkstra";
import GreedyBestFIrstSearch from "./PathFinding/GreedyBestFIrstSearch";
import BubbleSort from "./Sorting/BubbleSort";
import QuickSort from "./Sorting/QuickSort";
import MergeSort from "./Sorting/MergeSort";
import ASTAR from "./PathFinding/ASTAR";

function Algorithms() {
  return {
    breadthFirstSearch: BreadthFirstSearch(),
    depthFirstSearch: DepthFirstSearch(),
    dijkstra: Dijkstra(),
    greedyBestFIrstSearch: GreedyBestFIrstSearch(),
    aStar: ASTAR(),
    bubbleSort: BubbleSort(),
    quickSort: QuickSort(),
    mergeSort: MergeSort(),
  };
}

export default Algorithms;
