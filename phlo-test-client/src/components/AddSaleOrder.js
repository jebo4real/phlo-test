import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createSaleOrder } from "../slices/saleOrder";
import SaleOrderDataService from "../services/SaleOrderService";

const AddSaleOrder = () => {

  const initialSaleOrderState = {
    id: null,
    CustomerName: "",
    Product: "",
    SaleOrderPrice: 0,
  };
  const [saleOrder, setSaleOrder] = useState(initialSaleOrderState);
  const [submitted, setSubmitted] = useState(false);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  //for handling form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSaleOrder({ ...saleOrder, [name]: value });
  };

  //run on page load
  // fetch products, if products === 0 use samlpe products
  const initFetch = useCallback(async () => {
    const productsFromApi = await SaleOrderDataService.getAllProducts();
    const sampleProducts = [
      {
        ProductId: 1,
        ProductName: "Laptop",
      },
      {
        ProductId: 2,
        ProductName: "Keyboard",
      },
      {
        ProductId: 3,
        ProductName: "paper",
      },
    ];
    productsFromApi.data.length > 0
      ? setProducts(productsFromApi.data)
      : setProducts(sampleProducts);
    setSaleOrder({
      ...saleOrder,
      Product: productsFromApi.data[0].ProductName,
    });
  }, []);


  useEffect(() => {
    initFetch();
  }, [initFetch]);


  const saveSaleOrder = () => {
    const { CustomerName, Product, SaleOrderPrice } = saleOrder;

    dispatch(createSaleOrder({ CustomerName, Product, SaleOrderPrice }))
      .unwrap()
      .then((data) => {
        setSaleOrder({
          id: data.id,
          CustomerName: data.CustomerName,
          Product: data.Product,
          SaleOrderPrice: data.SaleOrderPrice,
        });
        setSubmitted(true);
      })
      .catch((e) => {
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
              defaultValue={saleOrder.CustomerName || ""}
              onChange={handleInputChange}
              name="CustomerName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Product">Product</label>
            <select
              className="form-control"
              name="Product"
              id="Product"
              onChange={handleInputChange}
            >
              (
              {products.map((prd) => {
                return (
                  <option value={prd.ProductName}>{prd.ProductName}</option>
                );
              })}
              )
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="SaleOrderPrice"
              required
              defaultValue={saleOrder.SaleOrderPrice || ""}
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
