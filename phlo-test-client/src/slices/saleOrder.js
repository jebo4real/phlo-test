import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SaleOrderDataService from "../services/SaleOrderService";

const initialState = [];

export const createSaleOrder = createAsyncThunk(
  "saleOrders/create",
  async ({ CustomerName, Product, SaleOrderPrice }) => {
    const res = await SaleOrderDataService.create({ CustomerName, Product, SaleOrderPrice });
    return res.data;
  }
);

export const retrieveSaleOrder = createAsyncThunk(
  "saleOrders/retrieve",
  async () => {
    const res = await SaleOrderDataService.getAll();
    return res.data;
  }
);

export const retrieveProduct = createAsyncThunk(
  "products/retrieve",
  async () => {
    const res = await SaleOrderDataService.getAllProducts();
    return res.data;
  }
);

export const updateSaleOrder = createAsyncThunk(
  "saleOrders/update",
  async ({ id, data }) => {
    const res = await SaleOrderDataService.update(id, data);
    return res.data;
  }
);

export const deleteSaleOrder = createAsyncThunk(
  "saleOrders/delete",
  async ({ id }) => {
    await SaleOrderDataService.remove(id);
    return { id };
  }
);

export const deleteAllSaleOrders = createAsyncThunk(
  "saleOrders/deleteAll",
  async () => {
    const res = await SaleOrderDataService.removeAll();
    return res.data;
  }
);

export const findSaleOrdersByTitle = createAsyncThunk(
  "saleOrders/findByTitle",
  async ({ title }) => {
    const res = await SaleOrderDataService.findByTitle(title);
    return res.data;
  }
);

const SaleOrderSlice = createSlice({
  name: "saleOrder",
  initialState,
  extraReducers: {
    [createSaleOrder.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveSaleOrder.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateSaleOrder.fulfilled]: (state, action) => {
      const index = state.findIndex(saleOrder => saleOrder.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteSaleOrder.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllSaleOrders.fulfilled]: (state, action) => {
      return [];
    },
    [findSaleOrdersByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});


const { reducer } = SaleOrderSlice;
export default reducer;