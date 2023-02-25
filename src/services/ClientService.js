import http from "../http-common";

const getAll = () => {
  return http.get("/");
};

const get = (id) => {
  return http.get(`get/${id}`);
};

const create = (data) => {
  return http.post("/create", data);
};

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/delete/${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTitle = (title) => {
  return http.get(`/tutorials?title=${title}`);
};

const ClientService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default ClientService;
