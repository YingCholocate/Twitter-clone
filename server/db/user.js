import { prisma } from '.';
import bcrypt from 'bcrypt';

export const createUser = (userData) => {
  const finalUserData = {
    ...userData,
    password: bcrypt.hashSync(userData.password, 10),
  };
  console.log('final', finalUserData);

  return prisma.user.create({
    data: finalUserData,
  });
};

export const getUserByUsername = (username) => {
  console.log('username', username);
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
};

export const getUserById = (userId) => {
  console.log('userid', userId);
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};
