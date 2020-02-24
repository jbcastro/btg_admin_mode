import React, { useState } from "react";

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
  const handleSubmit = props.handleSubmit;
  const handleUpdate = props.handleUpdate;
  let laura = false;
  const onCurItemClear = props.onCurItemClear;
  const setCurItemStuff = props.setCurItemStuff;

  const formState = useFormState();
  // console.log(formState);

  return (
    <Form
      id="myForm"
      initialValues={{ grape: [""], description: [""] }}
      onSubmit={handleSubmit}
    >
      {({ formApi, formState }) => (
        <div>
          {/* <button type="button" onClick={handleUpdateAndSubmit}>
            change
          </button> */}
          {/* <ComponentUsingFormState /> */}
          {/* <code>{JSON.stringify(formState.values)}</code>
          <label>Touched:</label>
          <code>{JSON.stringify(formState.touched)}</code> */}
          {/* <code>{myFunction(formState.touched)}</code> */}
          {/* <code>{JSON.stringify(formApi)}</code> */}
          <br></br>
          <label>
            id
            <Text value="" field="_id" disabled />
          </label>
          <label>
            Name:
            <Text value="" field="name" onBlur={props.onChange} />
          </label>{" "}
          <label>
            Vinyard:
            <Text field="vinyard" onBlur={props.onChange} />
          </label>{" "}
          <label>
            Grapes:
            <Text field="grapes" onBlur={props.onChange} />
          </label>{" "}
          <label>
            Year:
            <Text field="year" type="number" onBlur={props.onChange} />
          </label>
          <DynamicArraysGrape onBlur={props.onChange} />
          <DynamicArraysDesc onBlur={props.onChange} />
          <label>
            Place:
            <Text field="place" onBlur={props.onChange} />
          </label>{" "}
          <label>
            Area:
            <Text field="area" onBlur={props.onChange} />
          </label>{" "}
          <label>
            Country:
            <Text field="country" onBlur={props.onChange} />
          </label>{" "}
          <label>
            Appellation:
            <Text field="appellation" onBlur={props.onChange} />
          </label>{" "}
          <label>
            Price:
            <Text field="price" type="number" onBlur={props.onChange} />
          </label>
          <br></br>
          <label>
            Mise:
            <Select field="mise" initialValue="ap" onBlur={props.onChange}>
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
            <TextArea field="funfact" onBlur={props.onChange} />
          </label>
          <button type="submit">submit</button>
          <button
            type="button"
            onClick={event => {
              formApi.reset();
              onCurItemClear();
            }}
          >
            Reset
          </button>
        </div>
      )}
    </Form>
  );
};

export default AddForm;
