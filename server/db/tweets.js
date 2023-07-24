import { prisma } from '.';
export const createTweet=(tweetData)=>{
  console.log("ttttttweetData",tweetData )
    return prisma.tweet.create({
        data: tweetData,
      });
};

export const getTweets=(params={})=>{
  return prisma.tweet.findMany()
}
    
export const getTweetById=(tewwtId,params={})=>{
  return prisma.tweet.findUnique({
    ...params,
    where:{
      ...params.where,
      id:tweetId
    },
    
  })
}