/* eslint-disable react/jsx-no-undef */
import { useState } from "react";
import ReactSwitch from "react-switch";
import "./table.css";

const ToggleSwitch = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <div className="example">
      <label>
        <Switch
          onChange={handleChange}
          checked={checked}
          className="react-switch"
        />
      </label>
    </div>
  );
};

export default ToggleSwitch;
