import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveSaleOrder
} from "../slices/saleOrder";

const SaleOrderList = () => {
  const [currentSaleOrder, setcurrentSaleOrder] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const saleorders = useSelector(state => state.saleOrders);
  const dispatch = useDispatch();


  const initFetch = useCallback(() => {
    dispatch(retrieveSaleOrder());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const setActiveTutorial = (saleOrder, index) => {
    setcurrentSaleOrder(saleOrder);
    setCurrentIndex(index);
  };

  console.log(currentSaleOrder)

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Sale Order List</h4>

        <ul className="list-group">
          {saleorders &&
            saleorders.map((saleOrderIterator, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(saleOrderIterator, index)}
                key={index}
              >
                {saleOrderIterator.Product}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentSaleOrder ? (
          <div>
            <h4>Sale Order</h4>
            <div>
              <label>
                <strong>Customer Name:</strong>
              </label>{" "}
              {currentSaleOrder.CustomerName}
            </div>
            <div>
              <label>
                <strong>Product:</strong>
              </label>{" "}
              {currentSaleOrder.Product}
            </div>
            <div>
              <label>
                <strong>Price:</strong>
              </label>{" "}
              {currentSaleOrder.SaleOrderPrice}
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Sale Order...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaleOrderList;
