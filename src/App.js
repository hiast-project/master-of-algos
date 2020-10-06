import React, { useEffect, useRef, useState } from "react";
import PathFindingApp from "./Components/PathFinding";
import Sorting from "./Components/Sorting";
import logo from "./logo.png";
import logoWhite from "./logo white.png";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import PFControlItem from "./Components/PFControlItem";

function App() {
  /*
   * selectedAlgoType: either Path finding Algorithms or sorting algorithms
   */
  const [selectedAlgoType, setSelectedAlgoType] = React.useState("");

  /*
   * dropdownRef: referance to
   */
  const dropdownRef = useRef(null);

  /*
   * isActive: detects if "Algorithm type" button is expanded
   */
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  /*
   * handleSetActive: open/close Algorithm types
   */
  const handleSetActive = () => setIsActive(!isActive);

  return (
    <div className="app">
      <div className="col-sm-12 navbar">
        <div className="col-sm-2 logo">
          <img src={logo}></img>
        </div>
        <div className="col-sm-12 offset-lg-7 col-lg-3 nav-left">
          <div
            onClick={() => {
              handleSetActive();
            }}
            className="menu-container"
          >
            <div className="menu-left">
              <PFControlItem
                handlers={null}
                label={selectedAlgoType ? selectedAlgoType : "Algorithm Type"}
                content={[
                  {
                    text: "Path Finding",
                    action: () => setSelectedAlgoType("Path Finding"),
                  },
                  {
                    text: "Sorting",
                    action: () => setSelectedAlgoType("Sorting"),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedAlgoType === "Path Finding" ? <PathFindingApp /> : <Sorting />}
      {selectedAlgoType === "" ? (
        <div className="blured">
          <div className="home-logo">
            <img src={logoWhite}></img>
          </div>
          <div className="offset-sm-2 col-sm-8 home-card-container">
            <div
              className="home-card home-card-left col-sm-6"
              onClick={() => setSelectedAlgoType("Path Finding")}
            >
              <span className="algo-type">PATH FINDING</span>
            </div>
            <div
              className="home-card home-card-right col-sm-6"
              onClick={() => setSelectedAlgoType("Sorting")}
            >
              <span className="algo-type">SORTING</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
