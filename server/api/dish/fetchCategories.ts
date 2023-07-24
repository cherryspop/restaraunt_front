export default defineEventHandler(async (event) => {
  const data = await $fetch("http://localhost:3001/category");
  return data;
});