import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSaleOrder } from "../slices/saleOrder";

const AddSaleOrder = () => {
  const initialSaleOrderState = {
    id: null,
    CustomerName: "",
    Product: "",
    SaleOrderPrice: 0
  };
  const [saleOrder, setSaleOrder] = useState(initialSaleOrderState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSaleOrder({ ...saleOrder, [name]: value });
  };

  const saveSaleOrder = () => {
    const { CustomerName, Product, SaleOrderPrice } = saleOrder;
    console.log(saleOrder)

    dispatch(createSaleOrder({ CustomerName, Product, SaleOrderPrice }))
      .unwrap()
      .then(data => {
        setSaleOrder({
          id: data.id,
          CustomerName: data.CustomerName,
          Product: data.Product,
          SaleOrderPrice: data.SaleOrderPrice
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newSaleOrder = () => {
    setSaleOrder(initialSaleOrderState);
    setSubmitted(false);
  };


  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Order saved successfully!</h4>
          <button className="btn btn-success" onClick={newSaleOrder}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              className="form-control"
              id="CustomerName"
              required
              defaultValue={saleOrder.CustomerName || ''}
              onChange={handleInputChange}
              name="CustomerName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="product">Product</label>
            <input
              type="text"
              className="form-control"
              id="Product"
              required
              defaultValue={saleOrder.Product || ''}
              onChange={handleInputChange}
              name="Product"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="SaleOrderPrice"
              required
              defaultValue={saleOrder.SaleOrderPrice || ''}
              onChange={handleInputChange}
              name="SaleOrderPrice"
            />
          </div>

          <button onClick={saveSaleOrder} className="btn btn-success">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default AddSaleOrder;
