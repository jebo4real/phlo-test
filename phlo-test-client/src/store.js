import { configureStore } from '@reduxjs/toolkit'
import saleOrderReducer from './slices/saleOrder';

const reducer = {
  saleOrders: saleOrderReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;