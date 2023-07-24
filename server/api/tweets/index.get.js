import { getTweets } from '~/server/db/tweets';
import { tweetTransformer } from '~/server/transformer/tweet';

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event);
  console.log("query",query)

  let primsaQuery = {
    include: {
      author: true,
      mediaFiles: false,
      replies: {
        include: {
          author: true,
        },
      },
      replyTo: {
        include: {
          author: true,
        },
      },
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  };

  if (!!query) {
    primsaQuery = {
      ...primsaQuery,
      where: {
        text: {
          contains: query,
        },
      },
    };
  }

  const tweets = await getTweets(primsaQuery);

  return {
    tweets: tweets.map(tweetTransformer),
  };
});
