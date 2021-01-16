import React from "react";
import { Text, ArrayField } from "informed";
const DynamicGrapes = ({ onBlur }) => {
  return (
    <ArrayField field="grape">
      {({ add, fields }) => (
        <>
          <button onClick={add} type="button">
            Add grape
          </button>
          {fields.map(({ field, key, remove }, i) => (
            <label htmlFor={i} key={key}>
              <br></br>
              {i + 1}:
              <Text field={field} id={`grape${i}`} onBlur={onBlur} />
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
export default DynamicGrapes;
