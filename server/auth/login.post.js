export default defineEventHandler(async (event) => {
  const body = await useBodyAttrs(event);
  const { username, password } = body;
});
