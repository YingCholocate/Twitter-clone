import { getUserByUsername } from '~/server/db/user.js';
import bcrypt from 'bcrypt';
import { generateTokens, sendRefreshToken } from '~/server/utils/jwt.js';
import { userTransformer } from '~/server/transformer/user.js';
import { createRefreshToken } from '~/server/db/refreshToken.js';
import { sendError } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);


  const { username, password } = body;


  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Ivalid params',
      }),
    );
  }

  const user = await getUserByUsername(username);

  console.log("user",user)
  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Username or password is invalid1',
      }),
    );
  }

  const doesThePasswordMatch = await bcrypt.compare(password, user.password);

  console.log("does",doesThePasswordMatch)
  if (!doesThePasswordMatch) {

    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Username or password is invalid2',
      }),
    );
  }

  const { accessToken, refreshToken } = generateTokens(user);
  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });

  sendRefreshToken(event, refreshToken);

  return {
    access_token: accessToken,
    user: userTransformer(user),
  };
});
