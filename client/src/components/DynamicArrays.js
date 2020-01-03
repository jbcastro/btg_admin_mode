import React from "react";
import { Form, Text, ArrayField } from "informed";
const DynamicArrays = () => {
  return (
    <div>
      <ArrayField field="grape">
        {({ add, fields }) => (
          <>
            <button onClick={add} type="button">
              Add grape
            </button>
            {fields.map(({ field, key, remove }, i) => (
              <label htmlFor={i} key={key}>
                grape {i}:
                <Text field={field} id={i} />
                <button type="button" onClick={remove}>
                  Remove
                </button>
              </label>
            ))}
          </>
        )}
      </ArrayField>
      <ArrayField field="description">
        {({ add, fields }) => (
          <>
            <button onClick={add} type="button">
              Add description
            </button>
            {fields.map(({ field, key, remove }, i) => (
              <label htmlFor={i} key={key}>
                description {i}:
                <Text field={field} id={i} />
                <button type="button" onClick={remove}>
                  Remove
                </button>
              </label>
            ))}
          </>
        )}
      </ArrayField>
    </div>
  );
};
export default DynamicArrays;
