import React, { useState } from "react";
import { Form, Text, TextArea, Checkbox, Select, Option } from "informed";
import DynamicArraysGrape from "./DynamicArraysGrape";
import DynamicArraysDesc from "./DynamicArrraysDesc";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

const AddForm = (props) => {
  const handleSubmit = props.handleSubmit;
  const onCurItemClear = props.onCurItemClear;
  const onChange = props.onChange;

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();
  return (
    <Form
      id="myForm"
      initialValues={{ grape: [""], description: [""] }}
      onSubmit={handleSubmit}
    >
      {({ formApi }) => (
        <div className="AddForm">
          <Button
            variant="contained"
            color="secondary"
            type="button"
            size="small"
            onClick={(event) => {
              formApi.reset();
              onCurItemClear();
            }}
          >
            ADD NEW
          </Button>
          <br></br>
          <br></br>
          <p className="hidden">
            <label class="nobreak">
              id
              <Text value="" field="_id" disabled />
            </label>
          </p>
          <label class="nobreak">
            Name:
            <Text value="" field="name" onBlur={onChange} />
          </label>{" "}
          <label class="nobreak">
            Vinyard:
            <Text field="vinyard" onBlur={onChange} />
          </label>{" "}
          <label class="nobreak">
            Grapes:
            <Text field="grapes" onBlur={onChange} />
          </label>{" "}
          <label class="nobreak">
            Year:
            <Text field="year" onBlur={onChange} />
          </label>{" "}
          <label class="nobreak">
            Place:
            <Text field="place" onBlur={onChange} />
          </label>{" "}
          <label class="nobreak">
            Area:
            <Text field="area" onBlur={onChange} />
          </label>{" "}
          <label class="nobreak">
            Country:
            <Text field="country" onBlur={onChange} />
          </label>{" "}
          <label class="nobreak">
            Appellation:
            <Text field="appellation" onBlur={onChange} />
          </label>{" "}
          <label class="nobreak">
            Price:
            <Text field="price" type="number" onBlur={onChange} />
          </label>
          <label class="nobreak">
            Picture:
            <Text field="picture" onBlur={onChange} />
          </label>
          <p></p>
          <label class="nobreak">
            Mise:
            <Select field="mise" initialValue="AP" onBlur={onChange}>
              <Option value="AP">AP</Option>

              <Option value="BURG"> BURG</Option>

              <Option value="BDX"> BDX</Option>

              <Option value="Flute">Flute</Option>

              <Option value="DW">DW</Option>

              <Option value="KRUG">Krug Flute</Option>
            </Select>
          </label>
          <label class="nobreak">
            Color:
            <Select field="color" initialValue="red">
              <Option value="red">Red</Option>
              <Option value="white">White</Option>
              <Option value="dessert">Dessert</Option>
              <Option value="sparkling">Sparkling</Option>
            </Select>
          </label>
          <label class="nobreak">
            Status:
            <Select field="status" initialValue="added">
              <Option value="added">Added</Option>
              <Option value="none">None</Option>

              <Option value="removed">Removed</Option>
              <Option value="hidden">Hidden</Option>
            </Select>
          </label>
          <label class="nobreak">
            Coravin: <Checkbox field="coravin" />
          </label>
          <br></br>
          <h3>Individual Grapes</h3>
          <DynamicArraysGrape onBlur={onChange} />
          <h3>Description</h3>
          <DynamicArraysDesc onBlur={onChange} />
          <br></br>
          <label class="nobreak">
            Fun Fact:
            <br></br>
            <TextArea rows="8" cols="100" field="funfact" onBlur={onChange} />
          </label>
          <br></br>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            SAVE
          </Button>
          {"  "}
        </div>
      )}
    </Form>
  );
};

export default AddForm;
