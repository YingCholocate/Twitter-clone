import { getUserByUsername } from "server/db/user";
import brcypt from "brcypt"
import { generateToken, sendRefreshgToken } from "server/utils/jwt";
import { createRefreshToken } from "server/db/refreshToken";
export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const { username, password } = body;

  if(!username||!password){
return sendError(event,createError({
  statusCode:400,
  statusMessage:"Ivalid params"
}))
  }


  //用户已注册

const user=await getUserByUsername(username);
  //对比password
  const doesThePasswordMatch=await brcypt.compare(password,user.password)
  if(!user ||!doesThePasswordMatch){
    return sendError(event,createError({
      statusCode:400,
      statusMessage:"Username or password is invalid"
    }))
  }
  // generate tokens
  // access token
  //refresh token
  const {accessToken,refreshToken}=generateToken(user)


  // save it inside db
 await createRefreshToken({
  token:refreshToken,
  userId:user.id
 })

  //add http only cookie 
sendRefreshgToken(event,refreshToken)
  return{
    user:user,
    doesThePasswordMatch,
    accessToken,
    refreshToken
  }
});
