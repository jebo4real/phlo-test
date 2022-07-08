import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveSaleOrder } from "../slices/saleOrder";

const SaleOrderList = () => {
  const [currentSaleOrder, setcurrentSaleOrder] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const saleorders = useSelector((state) => state.saleOrders);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(retrieveSaleOrder());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  //get product with sales
  const getProductsWithSales = () => {
    // get unique products
    const arr = saleorders.map((p) => p.Product);
    const s = new Set(arr);
    const unique = [...s];

    const productWithSales = [];

    // iterate over distinct products
    // find maximum & minimum sale price
    // construct product sales array
    unique.map((oneProduct) => {
      const productOneArray = saleorders.filter(
        (obj) => obj.Product === oneProduct
      );
      const maxSaleOrderPrice = Math.max(
        ...productOneArray.map((o) => o.SaleOrderPrice)
      );
      const minSaleOrderPrice = Math.min(
        ...productOneArray.map((o) => o.SaleOrderPrice)
      );
      productWithSales.push({
        product: oneProduct,
        maxSaleOrderPrice,
        minSaleOrderPrice,
      });
    });

    return productWithSales;
  };

  const setActiveTutorial = (saleOrder, index) => {
    setcurrentSaleOrder(saleOrder);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-12">
        <h4>Sale Order List</h4>

        <ul className="list-group">
          {saleorders &&
            getProductsWithSales().map((saleOrderIterator, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(saleOrderIterator, index)}
                key={index}
              >
                <strong>Product</strong>: {" " + saleOrderIterator.product} <strong>Highest Sale Price</strong>: 
                {"  GHC " + saleOrderIterator.maxSaleOrderPrice} <strong>Lowest Sale Price</strong>: 
                {"  GHC " + saleOrderIterator.minSaleOrderPrice}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SaleOrderList;
