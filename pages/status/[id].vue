<template>
  <div>
    <ManinSection title="Tweet" :loading="loading">
      <Head>
        <Title></Title>
      </Head>
      <TweetDetails :user="user" :tweet="tweet" />
    </ManinSection>
  </div>
</template>
<script setup>
const loading = ref(false);
const tweet = ref(null);
const { getTweetById } = useTweets();
const { useAuthUser } = useAuth();
const user = useAuthUser();
watch(
  () => useRouter().fullPath,
  () => getTweet(),
);
function getTweetIdFromRoute() {
  return useRoute().params.id;
}

async function getTweet() {
  loading.value = true;
  try {
    const response = await getTweetById(getTweetIdFromRoute() );
    tweet.value=response.tweet
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
onBeforeMount(() => {
  getTweet()
});
</script>
