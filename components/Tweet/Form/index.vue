<template>
    <div>
        <TweetFormInput :user="props.user" @onSubmit="handleFormSubmit"/>
    </div>
</template>
<script setup>
const {postTweet}=useTweets()
const props=defineProps({
    user:{
        type:Object,
        required:true
    }
})

const handleFormSubmit=async (data)=>{
    try {
      const response=  await postTweet(data)
    } catch (error) {
        console.log(error)
    }
}
</script>