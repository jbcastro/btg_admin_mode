import React, { useState } from "react";
import { Form, Text, ArrayField } from "informed";
import { PromiseProvider } from "mongoose";
const DynamicDescription = ({ onBlur }) => {
  return (
    <ArrayField field="description">
      {({ add, fields }) => (
        <>
          <button onClick={add} type="button">
            Add description
          </button>

          {fields.map(({ field, key, remove, value }, i) => (
            <label htmlFor={i} key={key}>
              <br></br>
              {i + 1}:
              <Text field={field} id={`description${i}`} onBlur={onBlur} />
              <button
                type="button"
                onClick={() => {
                  onBlur();
                  remove();
                }}
              >
                Remove
              </button>
              <br></br>
            </label>
          ))}
        </>
      )}
    </ArrayField>
  );
};
export default DynamicDescription;
