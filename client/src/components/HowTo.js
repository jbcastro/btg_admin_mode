import React, { useState } from "react";
import { Form, Text, TextArea, Checkbox, Select, Option } from "informed";
import DynamicArraysGrape from "./DynamicArraysGrape";
import DynamicArraysDesc from "./DynamicArrraysDesc";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

const HowTo = () => {
  const [instructions, showIntructions] = React.useState(false);
  const clickInstruction = () => {
    showIntructions(!instructions);
  };
  return (
    <div className="Howto">
      {instructions ? (
        <span>
          <Button
            type="button"
            variant="contained"
            color="primary"
            type="button"
            size="small"
            onClick={clickInstruction}
          >
            close
          </Button>
          <p></p>
          When you add a wine you can then edit it with the top form until you
          click "ADD NEW". You can edit wines with the card below. If you change
          only one thing you have to click on something else (anywhere really)
          in order for the save button to appear. Also don't refresh the page
          else you'll have to login again. I advise allowing your browser to
          save your password.
        </span>
      ) : (
        <span>
          <Button
            type="button"
            variant="contained"
            color="primary"
            type="button"
            size="small"
            onClick={clickInstruction}
          >
            How to
          </Button>
        </span>
      )}
    </div>
  );
};
export default HowTo;
