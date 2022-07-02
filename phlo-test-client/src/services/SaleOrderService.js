import http from "../http-common";

const getAll = () => {
  return http.get("/saleorder");
};

const get = id => {
  return http.get(`/saleorder/${id}`);
};

const create = data => {
  return http.post("/saleorder", data);
};

const update = (id, data) => {
  return http.put(`/saleorder/${id}`, data);
};

const remove = id => {
  return http.delete(`/saleorder/${id}`);
};

const removeAll = () => {
  return http.delete(`/saleorder`);
};

const findByTitle = title => {
  return http.get(`/saleorder?title=${title}`);
};

const SaleOrderService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default SaleOrderService;