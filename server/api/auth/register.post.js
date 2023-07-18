import { sendError } from 'h3';
import { createUser } from '~/server/db/user.js';
import { userTransformer } from '~/server/transformer/user.js';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, email, password, repeatPassword, name } = body;

  if (!username || !email || !password || !repeatPassword || !name) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'Invalid params' }),
    );
  }

  if (password !== repeatPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'password do not match' }),
    );
  }

  const userData = {
    username,
    email,
    password,
    name,
    profileImage: 'https://picsum.photos/200/200',
  };

  const user = await createUser(userData);
  return {
    body: userTransformer(user),
  };
});
