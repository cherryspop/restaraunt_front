export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  const res = await $fetch("http://localhost:3001/dish", {
    method: "post",
    body: {
      title: data.title,
      photo: data.photo,
      price: data.price,
      sale: data.sale,
      category_id: data.category_id
    }
  });
  return res;
});