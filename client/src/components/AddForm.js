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

  // const formState = useFormState();
  // function castro() {
  //   handleSubmit(formState);
  // }

  // const aButton = formState => {
  //   if (laura == false) {
  //     {
  //       console.log(formState.touched);
  //     }
  //   } else {
  //     {
  //       console.log("yo");
  //     }
  //   }
  // };

  // function myFunction(items) {
  //   if (items._id == true) {
  //     putu = handleUpdate;
  //   } else {
  //     putu = handleSubmit;
  //   }
  //   return putu;
  // }

  // const myFunction = item => {
  //   if (item._id === true) {
  //     laura = true;
  //   } else {
  //     laura = false;
  //   }
  // };
  // const doSubmit = (evt)=>{
  //   {handleSubmit}
  //   console.log("brah")
  // }
  const formState = useFormState();
  console.log(formState);

  // let butt;
  // if (laura === false) {
  //   butt = { handleSubmit };
  // } else {
  //   butt = { handleUpdate };
  const [addButton, updateButton] = React.useState(true);

  const handleUpdateAndSubmit = () => {
    updateButton(!addButton);
  };
  // }
  // function myFunction(addButton, touched) {
  //   if (touched._id == true) {
  //     return (addButton = false);
  //   } else {
  //     return (addButton = true);
  //   }
  // }
  let putu;
  var handleStuff = addButton ? (putu = handleSubmit) : (putu = handleUpdate);
  return (
    <Form
      id="myForm"
      initialValues={{ grape: [""], description: [""] }}
      onSubmit={putu}
    >
      {({ formApi, formState }) => (
        <div>
          <button type="button" onClick={handleUpdateAndSubmit}>
            change
          </button>
          {/* <ComponentUsingFormState /> */}
          <code>{JSON.stringify(formState.values)}</code>
          <label>Touched:</label>
          <code>{JSON.stringify(formState.touched)}</code>
          {/* <code>{myFunction(formState.touched)}</code> */}
          {/* <code>{JSON.stringify(formApi)}</code> */}
          <br></br>
          <label>
            id
            <Text value="" field="_id" disabled />
          </label>
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
          <button type="button" onClick={() => formApi.reset()}>
            Reset
          </button>
        </div>
      )}
    </Form>
  );
};

export default AddForm;
