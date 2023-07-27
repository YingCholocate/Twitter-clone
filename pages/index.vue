<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <Head>
        <Title>Home/Twitter</Title>
      </Head>
      <div class="border-b" :class="twitterBorderColor">
        <TweetForm :user="user" @on-success="handleFormSucess" />
      </div>

      <TweetListFeed :tweets="homeTweets" />
    </MainSection>
  </div>
</template>

<script setup>
const { twitterBorderColor } = useTailwindConfig();
const { getHomeTweets } = useTweets();
const homeTweets = ref([]);
const loading = ref(false);
const { useAuthUser } = useAuth();
const user = useAuthUser();
onBeforeMount(async () => {
  loading.value = true;
  try {
    const { tweets } = await getHomeTweets();
    console.log("tweets",tweets)
    homeTweets.value = tweets;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

function handleFormSucess(tweet) {
  navigateTo({
    path: `/status/${tweet.id}`,
  });
}
</script>
