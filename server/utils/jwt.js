import jwt from "jsonwebtoken"
const generateAcessToken=(user)=>{
    const config=useRuntimeConfig();
    return jwt.sign({userId:user.id},config.jwtAcessSecret,{
        expiresIn:'10m'
    })

}

const generateRefreshToken=(user)=>{
    const config=useRuntimeConfig();
    return jwt.sign({userId:user.id},config.jwtRefreshSecret,{
        expiresIn:'10m'
    })

}

export const generateToken=()=>{
    const accessToken=generateAcessToken();
    const refreshToken=generateRefreshToken()

    return{
        accessToken,
        refreshToken
    }
}

export const sendRefreshgToken=(event,token)=>{
    seetCookie(event.res,"refresh_token",token,{
        httpOnly:true,
        sameSite:true
    })
}