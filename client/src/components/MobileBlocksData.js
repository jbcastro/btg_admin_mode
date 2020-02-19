import React, { useState } from "react";
import MobileBlocks from "./MobileBlocks";

const MobileBlocksData = ({
  onSelect,
  glasses,
  hideRemoved,
  handleSelect,
  editCardChange,
  editCard,
  curItem,
  onChange,
  handleSubmit,
  handleUpdate,
  handleDelete,
  onCurItemClear,
  props,
  onBlur
}) => {
  const data = glasses;
  console.log(data);

  const cells = data.map(data => {
    return (
      <MobileBlocks
        data={data}
        key={data._id}
        onSelect={onSelect}
        hideRemoved={hideRemoved}
        handleSelect={handleSelect}
        editCardChange={editCardChange}
        editCard={editCard}
        onChange={onChange}
        curItem={curItem}
        handleUpdate={handleUpdate}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        onCurItemClear={onCurItemClear}
        onBlur
      />
    );
  });

  return <div className="MobileBlock">{cells}</div>;
};
export default MobileBlocksData;
