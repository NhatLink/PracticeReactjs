import axios from "./custome-axios";

const fetchAlluser = (page) => {
  return axios.get(`users?page=${page}`);
};

const postCreateUser = (name, job) => {
  return axios.post("api/users", { name, job });
};

const putEdiUser = (id, name, job) => {
  return axios.post(`api/users/${id}`, { name, job });
};

const deleteUser = (id) => {
  return axios.delete(`api/users/${id}`);
};
export { fetchAlluser, postCreateUser, putEdiUser, deleteUser };
