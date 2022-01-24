import axios from "axios";
import { API_URL } from "../../../utils/backend";

export const authenticateUser = (idToken) => {
  return axios.post(
    `${API_URL}/authenticate`,
    {},
    {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${idToken}`,
      },
    }
  );
};
