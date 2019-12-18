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
  useFormState
} from "informed";

const AddForm = props => {
  const handleNextClick = props.handleNextClick;
  const handlePrevClick = props.handlePrevClick;
  const ComponentUsingFormState = () => {
    const formState = useFormState();
    return (
      <div>
        {/* <button onClick={e => props.setFormState(formState.values)}>Add</button> */}
        <button onClick={e => props.handleSubmit(formState.values)}>
          add/update
        </button>
      </div>
    );
  };

  return (
    <Form id="form-api-form">
      {({ formApi }) => (
        <div>
          <label>
            Name:
            <Text value="" field="name" />
          </label>

          <label>
            Vinyard:
            <Text field="vinyard" />
          </label>
          <label>
            Grapes:
            <Text field="grapes" />
          </label>

          <label>
            Grape 1:
            <Text field="grape[0]" />
          </label>
          <label>
            Grape 2:
            <Text field="grape[1]" />
          </label>
          <label>
            Grape 3:
            <Text field="grape[2]" />
          </label>
          <p></p>
          <label>
            Grape 4:
            <Text field="grape[3]" />
          </label>
          <label>
            Year:
            <Text field="year" type="number" />
          </label>
          <label>
            Place:
            <Text field="place" />
          </label>
          <label>
            Area:
            <Text field="area" />
          </label>
          <label>
            Country:
            <Text field="country" />
          </label>
          <label>
            Appellation:
            <Text field="appellation" />
          </label>
          <label>
            Description 1:
            <Text field="description[0]" />
          </label>
          <label>
            Description 2:
            <Text field="description[1]" />
          </label>
          <label>
            Description 3:
            <Text field="description[2]" />
          </label>
          <label>
            Description 4:
            <Text field="description[3]" />
          </label>
          <label>
            Description 5:
            <Text field="description[4]" />
          </label>
          <label>
            Description 6:
            <Text field="description[5]" />
          </label>
          <label>
            Description 7:
            <Text field="description[6]" />
          </label>
          <label>
            Description 8:
            <Text field="description[7]" />
          </label>
          <label>
            Description 9:
            <Text field="description[8]" />
          </label>
          <label>
            Description 10:
            <Text field="description[9]" />
          </label>
          <label>
            Description 11:
            <Text field="description[10]" />
          </label>
          <label>
            Description 12:
            <Text field="description[11]" />
          </label>
          <label>
            Description 13:
            <Text field="description[12]" />
          </label>
          <label>
            Description 14:
            <Text field="description[13]" />
          </label>
          <label>
            Price:
            <Text field="price" type="number" />
          </label>
          <label>
            Mise:
            <Select field="mise">
              <Option value="" disabled>
                Select One...
              </Option>

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
            <Select field="color">
              <Option value="" disabled>
                Select One...
              </Option>
              <Option value="red">Red</Option>
              <Option value="white">White</Option>
              <Option value="dessert">Dessert</Option>
              <Option value="sparkling">Sparkling</Option>
            </Select>
          </label>
          <label>
            Status:
            <Select field="status">
              <Option value="" disabled>
                Select One...
              </Option>
              <Option value="none">None</Option>
              <Option value="added">Added</Option>
              <Option value="removed">Removed</Option>
              <Option value="hidden">Hidden</Option>
            </Select>
          </label>
          <label>
            Coravin: <Checkbox field="coravin" />
          </label>
          <label>
            Fun Fact:
            <TextArea field="funfact" />
          </label>

          <ComponentUsingFormState />
          <button onClick={handleNextClick}>Next</button>
          <button onClick={handlePrevClick}>Prev</button>
        </div>
      )}
    </Form>
  );
};

export default AddForm;
