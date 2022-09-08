import React from "react";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const ItemRow = (props) => {
  const { currencyOptions } = props;
  return (
    <>
      {currencyOptions.map((x) => {
        if (x === "AZN") {
          return (
            <div className="item">
              <div className="item-left">
                <div className="item-icon">
                  <FaRegMoneyBillAlt />
                </div>
                <div className="item-price">{x}</div>
              </div>
              <div className="item-right">1.680981</div>
            </div>
          );
        } else {
          if (x === "TRY") {
            return (
              <div className="item">
                <div className="item-left">
                  <div className="item-icon">
                    <FaRegMoneyBillAlt />
                  </div>
                  <div className="item-price">{x}</div>
                </div>
                <div className="item-right">18.036323</div>
              </div>
            );
          }
        }
      })}
    </>
  );
};

export default ItemRow;
