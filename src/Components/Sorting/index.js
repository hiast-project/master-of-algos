import "../../App.css";
import "../../Styles/responsive.css";
import "../../Styles/NavButton.css";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import PFControlItem from "../PFControlItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import RefreshIcon from "@material-ui/icons/Refresh";
import Slider from "@material-ui/core/Slider";
import { useRef } from "react";
import React, { useState, useCallback } from "react";
import "../../Styles/Canvas.css";
import ArrayOfElements from "../../Models/ArrayOfElements";
import Canvas from "./Canvas";
import Algorithms from "../../Algorithms";
import SortingStrategy from "../../Strategies/SortingStrategy";

const PrettoSlider = withStyles({
  root: {
    color: "#2a3038",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
    color: "#2a3038",
  },
  track: {
    height: 8,
    borderRadius: 4,
    color: "#2d86cf",
  },
  rail: {
    height: 8,
    borderRadius: 4,
    color: "#2d86cf",
  },
})(Slider);

const arrayOfElementsInstance = ArrayOfElements();
const algorithms = Algorithms();
const sortingStrategy = SortingStrategy();

let delay = 300;
let stateIndex = 0;
let stateTrace = [];
let selectedAlgortrithm;
let currentAlgorithm;
let algoIsRunning = false;
let newGenerated = false;
let changedAlgo = false;

function App() {
  const [num, setNum] = useState(1);
  const [arrayOfElements, setArrayOfElements] = useState();
  let chartWidth = 100;
  const [gridwid, setGridwid] = useState();
  const [show, setShow] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [log, setLog] = useState("");
  const [info, setInfo] = useState("");
  const inputRef = React.createRef();
  const setPassingSpeed = useCallback((tmp) => {
    delay = tmp;
  });

  // getting the number of elements array and generate the array randomly
  const generate = (tmp) => {
    newGenerated = true;
    init();
    setLog("");
    setNum(tmp);
    setArrayOfElements(arrayOfElementsInstance.createArrayOfElements(tmp));
    //We'll leave 5% for spacing between the bars
    setGridwid((95 * chartWidth) / 100 / tmp);
    setShow(true);
  };
  const generateOrdered = (tmp) => {
    newGenerated = true;
    init();
    setLog("");
    setNum(tmp);
    setArrayOfElements(
      arrayOfElementsInstance.createOrderedArrayOfElements(tmp)
    );
    //We'll leave 5% for spacing between the bars
    setGridwid((95 * chartWidth) / 100 / tmp);
    setShow(true);
  };
  const generateReversedOrdered = (tmp) => {
    newGenerated = true;
    init();
    setLog("");
    setNum(tmp);
    setArrayOfElements(
      arrayOfElementsInstance.createReversedArrayOfElements(tmp)
    );
    //We'll leave 5% for spacing between the bars
    setGridwid((95 * chartWidth) / 100 / tmp);
    setShow(true);
  };

  // const generate = () => {
  //   init();
  //   setShow(true);
  // };
  const init = () => {
    stateTrace = [];
    setPlay(false);
    setisActive(false);
    algoIsRunning = false;
  };
  const clear = () => {
    setArrayOfElements();
    stateTrace = [];
    stateIndex = 0;
    setLog();
    setShow();
    stateTrace = [];
    setPlay(false);
    setisActive(false);
    algoIsRunning = false;
  };

  const inCaseAlgoChanged = () => {
    changedAlgo = true;
    setLog("");
    if (arrayOfElements)
      setArrayOfElements(
        arrayOfElementsInstance.clearArrayColor(arrayOfElements)
      );
  };

  // setting delay between each transation
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // writting on the console log
  const handleLog = useRef();
  handleLog.current = async (text) => {
    await Promise.all([setLog("\n" + text)]);
  };

  // get the trace array for thee visualisation
  const handleGetTrace = async (algorithm, array) => {
    newGenerated = false;
    changedAlgo = false;
    stateIndex = 0;
    const algorithmOutput = sortingStrategy(algorithm, array);
    currentAlgorithm = algorithm;
    stateTrace = algorithmOutput.stateTrace;
  };

  // make on step forward in the algorithm trace
  const handleNextStepAlgorithm = async () => {
    if (stateTrace[stateIndex].type !== "log") {
      setArrayOfElements(stateTrace[stateIndex].array);
    } else {
      handleLog.current(stateTrace[stateIndex].log);
    }
    if (stateIndex < stateTrace.length) stateIndex++;
  };

  // make on step backward in the algorithm trace
  const handlePrevStepAlgorithm = async () => {
    if (stateIndex > 0) {
      stateIndex--;
      if (stateTrace[stateIndex].type !== "log") {
        setArrayOfElements(stateTrace[stateIndex].array);
      } else {
        handleLog.current(stateTrace[stateIndex].log);
      }
    }
  };

  // for starting or continuing the algorithm visualisation
  const handlePlaybutton = useRef();
  handlePlaybutton.current = async () => {
    while (stateIndex < stateTrace.length && algoIsRunning) {
      await Promise.all([timeout(delay), handleNextStepAlgorithm()]);
    }
    stateIndex--;
    algoIsRunning = false;
    setPlay(false);
  };

  const validatePlay = () => {
    if (selectedAlgortrithm !== undefined) {
      algoIsRunning = true;
      handlePlaybutton.current();
      setPlay(true);
    } else {
      alert("Please Select an Algorithm");
    }
  };

  const validateNext = () => {
    if (selectedAlgortrithm !== undefined && stateIndex < stateTrace.length) {
      handleNextStepAlgorithm();
    }
  };
  const validatePrev = () => {
    if (selectedAlgortrithm !== undefined && stateIndex > -1) {
      handlePrevStepAlgorithm();
    }
  };

  const [checked, setChecked] = React.useState(true);

  const dropdownRef = useRef(null);
  const [isActive, setisActive] = useDetectOutsideClick(dropdownRef, false);

  const chooseAlgo = () => setisActive(!isActive);

  const [play, setPlay] = useState();

  const [barsNumber, setBarsNumber] = useState("");

  return (
    <div className="col-sm-12 main-body">
      {/*
        <div className="col-sm-12 col-lg-2 control-bar"></div> */}
      <div className="col-sm-12 col-lg-9 left-side">
        <div
          className="left-control-bar"
          array={arrayOfElements}
          // generate={generate}
          generate={generate}
          checked={checked}
        >
          <div onClick={chooseAlgo} className="menu-container controls-item">
            <button className="menu-left algo-select">
              <span>Algorithm</span>
              <ExpandMoreIcon />
            </button>
            <nav
              ref={dropdownRef}
              className={`menu ${isActive ? "active" : "inactive"}`}
            >
              <ul>
                <li
                  onClick={() => {
                    algoIsRunning = false;
                    setPlay(false);
                    selectedAlgortrithm = algorithms.bubbleSort;
                    inCaseAlgoChanged();
                    // arrayOfElements !== undefined
                    //   ? handleGetTrace(selectedAlgortrithm, arrayOfElements)
                    //   : alert(
                    //       "There is no array selected please generate first"
                    //     );
                    setInfo({
                      name: "Bubbel Sort  ",
                      description:
                        "Bubble Sort is a simple algorithm which is used to sort a given set of n elements provided in form of an array with n number of elements. Bubble Sort compares all the element one by one and sort them based on their values.",
                      complexity: "O(N^(2))",
                    });
                  }}
                >
                  <span className="col-black">Bubble Sort</span>
                </li>
                <li
                  onClick={() => {
                    algoIsRunning = false;
                    setPlay(false);
                    selectedAlgortrithm = algorithms.quickSort;
                    inCaseAlgoChanged();
                    setInfo({
                      name: "Quick Sort  ",
                      description:
                        "Quick Sort is based on the concept of Divide and Conquer. In quick sort all the heavy lifting(major work) is done while dividing the array into subarrays. In case of quick sort, the combine step does absolutely nothing.",
                      complexity: "O(N*Log(N)",
                    });
                  }}
                >
                  <span className="col-black">Quick Sort</span>
                </li>
                <li
                  onClick={() => {
                    algoIsRunning = false;
                    setPlay(false);
                    selectedAlgortrithm = algorithms.mergeSort;
                    inCaseAlgoChanged();
                    // arrayOfElements
                    //   ? handleGetTrace(selectedAlgortrithm, arrayOfElements)
                    //   : alert(
                    //       "There is no array selected please generate first"
                    //     );
                    setInfo({
                      name: "Merge Sort  ",
                      description:
                        "Merge Sort follows the rule of Divide and Conquer to sort a given set of numbers/elements, recursively, hence consuming less time.",
                      complexity: "O(N*Log(N)",
                    });
                  }}
                >
                  <span className="col-black">Merge Sort</span>
                </li>
              </ul>
            </nav>
          </div>
          <div className="text-field-container">
            <input
              className="text-field"
              type="text"
              placeholder="Bars Number"
              ref={inputRef}
              value={barsNumber}
              onChange={(e) => {
                setBarsNumber(e.target.value);
              }}
            />
          </div>

          <li className="controls-item">
            <PFControlItem
              handlers={null}
              label="Generate"
              content={[
                {
                  text: "Random array",
                  action: () => {
                    generate(barsNumber);
                    // generate(barsNumber);
                    algoIsRunning = false;
                    setPlay(false);
                    setSpeed(speed);
                  },
                },
                {
                  text: "Ordered array",
                  action: () => {
                    generateOrdered(barsNumber);
                    // generate(barsNumber);
                    algoIsRunning = false;
                    setPlay(false);
                    setSpeed(speed);
                  },
                },
                {
                  text: "Reversed array",
                  action: () => {
                    generateReversedOrdered(barsNumber);
                    // generate(barsNumber);
                    algoIsRunning = false;
                    setPlay(false);
                    setSpeed(speed);
                  },
                },
              ]}
            />
          </li>
          <div className="nav-link">
            <Tooltip title="Algorithm Speed" aria-label="previous">
              <PrettoSlider
                className="speed-slider"
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={50}
                onChange={(event, v) => {
                  setSpeed(v * 15);
                  setPassingSpeed(1000 - speed);
                }}
                onClick={(event, v) => {
                  setSpeed(v * 15);
                  setPassingSpeed(1000 - speed);
                }}
              />
            </Tooltip>
          </div>
          <div className="nav-link white-refresh">
            <RefreshIcon onClick={() => clear()} />
          </div>
        </div>
        <div className="canvas-container">
          <Canvas array={arrayOfElements} gridwid={gridwid} show={show} />
        </div>
      </div>
      <div className="col-sm-12 col-lg-3 right-side">
        <div className="col-sm-12 right-control-bar">
          <Tooltip title="Previous" aria-label="previous">
            <NavigateBeforeIcon
              style={{ color: "white" }}
              className="cursor-pointer"
              onClick={() => validatePrev()}
            />
          </Tooltip>
          {!play ? (
            <Tooltip title="Start / Continue" aria-label="start_continue">
              <PlayArrowIcon
                style={{ color: "white" }}
                className="cursor-pointer"
                onClick={() => {
                  if (arrayOfElements)
                    if ((newGenerated || changedAlgo) && selectedAlgortrithm) {
                      handleGetTrace(selectedAlgortrithm, arrayOfElements);
                      validatePlay();
                    } else validatePlay();
                  else alert("Generate an array please");
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Pause" aria-label="pause">
              <PauseIcon
                style={{ color: "white" }}
                className="cursor-pointer"
                onClick={() => {
                  algoIsRunning = false;
                  setPlay(false);
                }}
              />
            </Tooltip>
          )}
          <Tooltip title="Next" aria-label="pause">
            <NavigateNextIcon
              style={{ color: "white" }}
              className="cursor-pointer"
              onClick={() => validateNext()}
            />
          </Tooltip>
        </div>
        <div className="col-sm-6 col-lg-12 console-container-sorting">
          <div className={"col-sm-12 console centered"}>
            {selectedAlgortrithm !== undefined ? (
              <div className="consol-content">
                <div className="consol-line">
                  <div className="circle visited-bar"></div>
                  <span className="console-line-content">Initial state</span>
                </div>
                <div className="consol-line">
                  <div className="circle ordered-element"></div>
                  <span className="console-line-content">Ordered element</span>
                </div>

                {selectedAlgortrithm == algorithms.bubbleSort ||
                selectedAlgortrithm == algorithms.quickSort ? (
                  <div className="consol-line">
                    <div className="circle swaping-bar"></div>
                    <span className="console-line-content">Swaping bars</span>
                  </div>
                ) : (
                  ""
                )}

                {selectedAlgortrithm == algorithms.mergeSort ? (
                  <div className="consol-line">
                    <div className="circle swaping-bar"></div>
                    <span className="console-line-content">
                      Changing height
                    </span>
                  </div>
                ) : (
                  ""
                )}

                {selectedAlgortrithm == algorithms.quickSort ? (
                  <div className="consol-line">
                    <div className="circle pivot"></div>
                    <span className="console-line-content">Pivot</span>
                  </div>
                ) : (
                  ""
                )}
                {selectedAlgortrithm == algorithms.quickSort ? (
                  <div className="consol-line">
                    <div className="circle quick-indecies"></div>
                    <span className="console-line-content">
                      Left an rigth indecies
                    </span>
                  </div>
                ) : (
                  ""
                )}
                {selectedAlgortrithm == algorithms.mergeSort ? (
                  <div className="consol-line">
                    <div className="circle left-merge"></div>
                    <span className="console-line-content">
                      Ready to merge from left
                    </span>
                  </div>
                ) : (
                  ""
                )}
                {selectedAlgortrithm == algorithms.mergeSort ? (
                  <div className="consol-line">
                    <div className="circle rigth-merge"></div>
                    <span className="console-line-content">
                      Ready to merge from right
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            {/* <div className="consol-content centered">
                <div className="consol-line">
                  <span className="empty-info">
                    Select an algorithm and a layout
                  </span>
                </div>
                <div className="consol-line">
                  <span className="empty-info">Then run the algorithm</span>
                </div>
              </div> */}
          </div>
        </div>
        <div className="col-sm-12 consol-log-container">
          <div className="consol-log">
            <span>{log}</span>
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

export default App;
