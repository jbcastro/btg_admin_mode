import React from "react";
import { Form, Text, ArrayField, BasicText } from "informed";
const DynamicArraysGrape = () => {
  const validateLength = touched => {
    return !touched ? "must" : undefined;
  };

  return (
    <div>
      <ArrayField field="grape" validate={validateLength} notify={["you must"]}>
        {({ add, fields }) => (
          <>
            {fields.map(({ field, key, remove }, i) => (
              <label htmlFor={i} key={key}>
                Grape {i + 1}:
                <Text field={field} id={i} />
                <button onClick={add} type="button">
                  Add Grape
                </button>{" "}
                <button type="button" onClick={remove} id={i}>
                  Remove This Grape
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
export default DynamicArraysGrape;
