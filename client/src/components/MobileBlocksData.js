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
  curEditItem,
  unEditedItem,
  onChange,
  handleSubmit,
  handleUpdate,
  handleDelete,
  onCurItemClear,
  props,
  onBlur,
  disableOtherEdits,
  setDisableOtherEdits
}) => {
  const data = glasses;

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
        curEditItem={curEditItem}
        unEditedItem={unEditedItem}
        handleUpdate={handleUpdate}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        onCurItemClear={onCurItemClear}
        onBlur={onBlur}
        disableOtherEdits={disableOtherEdits}
        setDisableOtherEdits={setDisableOtherEdits}
      />
    );
  });

  return <div className="MobileBlock">{cells}</div>;
};
export default MobileBlocksData;

// var objects = [
//   { name: "steve", status: added },
//   { name: "john", status: added },
//   { name: "drew", status: none },
//   { name: "aaron", status: none },
//   { name: "jeff", status: hidden },
//   { name: "gil", status: hidden },
//   { name: "marc", status: removed },
//   { name: "bill", status: removed }
// ];
