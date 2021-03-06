import React from "react";
import { Form, Text, ArrayField, BasicText } from "informed";
const DynamicArraysGrape = (props) => {
  const validateLength = (touched) => {
    return !touched ? "must" : undefined;
  };
  return (
    <div>
      <ArrayField field="grape" validate={validateLength} notify={["you must"]}>
        {({ add, fields }) => (
          <>
            <br></br>
            {fields.map(({ field, key, remove }, i) => (
              <label htmlFor={i} key={key}>
                Grape {i + 1}:
                <Text field={field} id={`grape${i}`} className="text" />
                <button type="button" onClick={remove} tabIndex="-1">
                  Remove This Grape
                </button>
                <br></br>
              </label>
            ))}
            <button onClick={add} type="button" tabIndex="-1">
              Add Another Grape
            </button>
          </>
        )}
      </ArrayField>
    </div>
  );
};
export default DynamicArraysGrape;
