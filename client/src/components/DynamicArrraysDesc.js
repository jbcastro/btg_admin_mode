import React from "react";
import { Form, Text, ArrayField, BasicText } from "informed";
const DynamicArraysDesc = () => {
  const validateLength = (touched) => {
    return !touched ? "must" : undefined;
  };

  return (
    <div>
      <ArrayField field="description" validate={validateLength}>
        {({ add, fields }) => (
          <>
            <br></br>
            {fields.map(({ field, key, remove }, i) => (
              <label htmlFor={i} key={key}>
                Description {i + 1}:
                <Text field={field} id={`description${i}`} className="text" />
                <button type="button" onClick={remove} tabIndex="-1">
                  Remove This Description
                </button>
                <br></br>
              </label>
            ))}
            <button onClick={add} type="button" tabIndex="-1">
              Add Another Description
            </button>
          </>
        )}
      </ArrayField>
    </div>
  );
};
export default DynamicArraysDesc;
