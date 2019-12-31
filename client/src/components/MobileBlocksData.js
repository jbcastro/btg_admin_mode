import React from "react";
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
  handleDelete
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
        handleUpdate={handleUpdate}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
      />
    );
  });

  return <div className="MobileBlock">{cells}</div>;
};
export default MobileBlocksData;
