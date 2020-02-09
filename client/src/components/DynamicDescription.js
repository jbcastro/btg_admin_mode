import React from "react";
import { Form, Text, ArrayField } from "informed";
const DynamicDescription = () => {
  return (
    <ArrayField field="description">
      {({ add, fields }) => (
        <>
          {fields.map(({ field, key, remove }, i) => (
            <label htmlFor={i} key={key}>
              <br></br>
              description {i + 1}:
              <Text field={field} id={`description${i}`} />
              <button type="button" onClick={remove}>
                Remove description
              </button>
              <button onClick={add} type="button">
                Add description
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
