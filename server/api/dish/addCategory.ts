export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  const res = await $fetch("http://localhost:3001/category", {
    method: "post",
    body: {
      title: data.title
    }
  });
  return res;
});