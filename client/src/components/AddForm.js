import React from "react";

import {
  Form,
  Text,
  TextArea,
  RadioGroup,
  Radio,
  Checkbox,
  Select,
  Option,
  Scope,
  useArrayField,
  useFormState,
  ArrayField
} from "informed";
import DynamicArraysGrape from "./DynamicArraysGrape";
import DynamicArraysDesc from "./DynamicArrraysDesc";
import { PromiseProvider } from "mongoose";

const AddForm = props => {
  const handleNextClick = props.handleNextClick;
  const handlePrevClick = props.handlePrevClick;
  const onCurItemClear = props.onCurItemClear;
  const handleSubmit = props.handleSubmit
  
  return (
    <Form
      id="myForm"
      initialValues={{ grape: [""], description: [""] }}
      onSubmit={handleSubmit}
    >
      <div>
       
        <label>
          Name:
          <Text value="" field="name" />
        </label>{" "}
        <label>
          Vinyard:
          <Text field="vinyard" />
        </label>{" "}
        <label>
          Grapes:
          <Text field="grapes" />
        </label>{" "}
        <label>
          Year:
          <Text field="year" type="number" />
        </label>
        <DynamicArraysGrape />
        <DynamicArraysDesc />
        <label>
          Place:
          <Text field="place" />
        </label>{" "}
        <label>
          Area:
          <Text field="area" />
        </label>{" "}
        <label>
          Country:
          <Text field="country" />
        </label>{" "}
        <label>
          Appellation:
          <Text field="appellation" />
        </label>{" "}
        <label>
          Price:
          <Text field="price" type="number" />
        </label>
        <br></br>
        <label>
          Mise:
          <Select field="mise" initialValue="ap">
            <Option value="ap">AP</Option>

            <Option value="burg"> BURG</Option>

            <Option value="bdx"> BDX</Option>

            <Option value="flute">Flute</Option>

            <Option value="dw">DW</Option>

            <Option value="krug">Krug Flute</Option>
          </Select>
        </label>
        <label>
          Color:
          <Select field="color" initialValue="red">
            <Option value="red">Red</Option>
            <Option value="white">White</Option>
            <Option value="dessert">Dessert</Option>
            <Option value="sparkling">Sparkling</Option>
          </Select>
        </label>
        <label>
          Status:
          <Select field="status" initialValue="added">
            <Option value="added">Added</Option>
            <Option value="none">None</Option>

            <Option value="removed">Removed</Option>
            <Option value="hidden">Hidden</Option>
          </Select>
        </label>
        <label>
          Coravin: <Checkbox field="coravin" />
        </label>
        <br></br>
        <br></br>
        <label>
          Fun Fact:
          <TextArea field="funfact" />
        </label>
        <button type="submit">submit</button>
      </div>
    </Form>
  );
};

export default AddForm;
