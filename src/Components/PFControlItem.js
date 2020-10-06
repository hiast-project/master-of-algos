import React, { useRef } from "react";
import { useDetectOutsideClick } from "../useDetectOutsideClick";
import "../Styles/NavButton.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
function PFControlItem(props) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onMousein = () => setIsActive(!isActive);
  const onMouseout = () => setIsActive(!isActive);

  const { handlers, label, content } = props;
  return (
    <div className="container">
      <div
        onClick={() => {
          onMousein();
        }}
        // onMouseLeave={() => {
        //   onMouseout();
        // }}
        className="menu-container"
      >
        <button className="menu-trigger">
          <span>{label}</span>
          {!isActive ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </button>

        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            {content.map((item) => (
              <li
                onClick={() => {
                  item.action();
                }}
              >
                <span className="col-black">{item.text}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default PFControlItem;
