import axios from "axios";
import { API_URL } from "../../../utils/backend";

export const getAllProducts = () => {
  const promise = new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          resolve(data);
        }
        reject(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
};

export const getMyAllOrders = (userId, token) => {
  const promise = new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/myorders/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          resolve(data);
        }
        reject(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
};
