import formidable from 'formidable';
import { tweetTransformer } from '~/server/transformer/tweet.js';
import { createTweet } from '~/server/db/tweets.js';
import { createMediaFile } from '~/server/db/mediaFiles.js';
import { uploadToCloudinary } from '~/server/utils/cloudinary.js';

export default defineEventHandler(async (event) => {
  const form = formidable({});
  console.log(event.req)
  const response = await new Promise((resolve, reject) => {
    form.parse(event.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });

  const { fields, files } = response;
  console.log("fields",fields)

  const userId = event.context?.auth?.user?.id;


  const tweetData = {
    text: fields.text,
    userId: userId,
  };
  console.log("tweetData",tweetData)
  const replyTo = fields.replyTo;

  if (replyTo && replyTo !== 'null' && replyTo !== 'undefined') {
    tweetData.replyToId = replyTo;
  }

  const tweet = await createTweet(tweetData);


  const filePromises = Object.keys(files).map(async (key) => {
    const file = files[key];

    const cloudinaryResource = await uploadToCloudinary(file.filepath);

    return createMediaFile({
      url: cloudinaryResource.secure_url,
      providerPublicId: cloudinaryResource.public_id,
      userId: userId,
      tweetId: tweet.id,
    });
  });

  await Promise.all(filePromises);

  return {
    tweet: tweetTransformer(tweet),
  };
});
