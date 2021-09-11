import axios from "axios";
export default async function RequestAxios(url) {
  try {
    const res = await axios.get(url);
    return res;
  } catch (err) {
    return err;
  }
}
