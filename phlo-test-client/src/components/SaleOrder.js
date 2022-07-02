import React, { useState, useEffect } from "react";
import SaleOrderDataService from "../services/SaleOrderService";

const SaleOrder = (props) => {
  const initialSaleOrderState = {
    id: null,
    customerName: "",
    product: "",
    SaleOrderPrice: 0
  };
  const [currentSaleOrder, setcurrentSaleOrder] = useState(initialSaleOrderState);

  const getSaleOrder = id => {
    SaleOrderDataService.get(id)
      .then(response => {
        setcurrentSaleOrder(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getSaleOrder(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setcurrentSaleOrder({ ...currentSaleOrder, [name]: value });
  };


  return (
    <div>
      {currentSaleOrder ? (
        <div className="edit-form">
          <h4>Sale Order</h4>
          <form>
            <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              className="form-control"
              id="customerName"
              required
              value={currentSaleOrder.customerName || ''}
              onChange={handleInputChange}
              name="customerName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="product">Product</label>
            <input
              type="text"
              className="form-control"
              id="product"
              required
              value={currentSaleOrder.product || ''}
              onChange={handleInputChange}
              name="product"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              value={currentSaleOrder.price || ''}
              onChange={handleInputChange}
              name="price"
            />
          </div>
          </form>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a SaleOrder...</p>
        </div>
      )}
    </div>
  );
};

export default SaleOrder;
