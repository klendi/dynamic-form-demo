import axios from "axios";

export const postForm = async data => {
  try {
    const response = await axios.post("http://localhost:5000/submit/form", {
      data
    });
    if (response.status === 200) {
      return Promise.resolve();
    }
  } catch (e) {
    console.error("There was a error getting fields");
    return Promise.reject();
  }
};
