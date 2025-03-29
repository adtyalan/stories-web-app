import axios from "axios";
import { CONFIG } from "../utils/config";
const token = localStorage.getItem("token");

const getAllStories = async () => {
  if (!token) {
    console.error("No token found");
    return null;
  }
  try {
    const response = await axios.get(`${CONFIG.endpoint}/stories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        location: 0,
      },
    });
    return response.data.listStory;
  } catch (error) {
    console.error(error);
    console.error(error.response.data.message);
    return null;
  }
};

const detailStory = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return null;
  }
  try {
    const response = await axios.get(`${CONFIG.endpoint}/stories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.story;
  } catch (error) {
    console.error(error);
    console.error(error.response.data.message);
    return null;
  }
};

const createGuestStory = async (formData) => {
  try {
    const response = await axios.post(
      `${CONFIG.endpoint}/stories/guest`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    console.error(error);
    console.error(error.response.data.message);
  }
};

const createStory = async (formData) => {
  try {
    const response = await axios.post(`${CONFIG.endpoint}/stories`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    console.error(error.response.data.message);
  }
};

const registerUser = (name, email, password) => {
  axios
    .post(
      `${CONFIG.endpoint}/register`,
      {
        name: name,
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
      console.error(error.response.data.message);
    });
};

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${CONFIG.endpoint}/login`, {
      email: email,
      password: password,
    });
    localStorage.setItem("token", response.data.loginResult.token);
  } catch (error) {
    console.error(error);
    console.error(error.response.data.message);
  }
};

export {
  getAllStories,
  registerUser,
  loginUser,
  detailStory,
  createGuestStory,
  createStory,
};
