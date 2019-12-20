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
  handleUpdate
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
      />
    );
  });

  return <div className="MobileBlock">{cells}</div>;
};
export default MobileBlocksData;
