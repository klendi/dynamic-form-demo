import axios from "axios";

export const getFields = async () => {
  try {
    const fields = await axios.get("http://localhost:5000/inputs");
    console.log("Got fields", fields);
    return Promise.resolve(fields.data.inputs);
  } catch (e) {
    console.error("There was a error getting fields");
    return Promise.reject();
  }
};
