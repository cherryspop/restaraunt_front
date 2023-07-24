import axios from "axios";

export default defineEventHandler(async (event) => {
  const res = await axios("http://localhost:3001/auth/edit", {
    method: "get",
    withCredentials: true,
  });
});
