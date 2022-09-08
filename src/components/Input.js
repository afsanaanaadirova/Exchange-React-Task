import React from "react";

const test = (props) => {
  const { onChangeAmount, amount } = props;
  return (
    <input
      type="number"
      className="input"
      value={amount}
      onChange={onChangeAmount}
    />
  );
};

export default test;
