import React from "react";
import { Form, Text, ArrayField, BasicText } from "informed";
const DynamicArraysDesc = () => {
  const validateLength = touched => {
    return !touched ? "must" : undefined;
  };

  return (
    <div>
      <ArrayField field="description" validate={validateLength}>
        {({ add, fields }) => (
          <>
            {fields.map(({ field, key, remove }, i) => (
              <label htmlFor={i} key={key}>
                Description {i + 1}:
                <Text field={field} id={i} />
                <button onClick={add} type="button">
                  Add Description
                </button>{" "}
                <button type="button" onClick={remove} id={i}>
                  Remove This Description
                </button>
                <br></br>
              </label>
            ))}
          </>
        )}
      </ArrayField>
    </div>
  );
};
export default DynamicArraysDesc;
