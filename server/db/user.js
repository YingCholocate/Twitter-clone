import { prisma } from '.';
import bcrypt from 'bcrypt';
export const createUser = (userData) => {
  const finalUserData = {
    ...userData,
    password: bcrypt.hasSync(userData.password, 10),
  };
  return prisma.user.create({
    data: userData,
  });
};
 export const getUserByUsername=(username)=>{
  return prisma.user.findUnique({
    where:{
      username
    }
  })
 }
 