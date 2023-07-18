<template>

    <div>

        <div class="flex items-center flex-shrink-0 p-4 pb-0">
            <div class="flex w-12 items-top">
                <img :src="props.user?.profileImage" alt="" class="inline-block w-10 h-10 rounded-full">
            </div>

            <div class="w-full p-2">
                <textarea class="w-full h-10 text-lg text-gray-900 placeholder: text-gray-400"></textarea>
            </div>


            <div class="w-full p-2">
            
            </div>
        </div>
    </div>
</template>
<script setup>
    const props=defineProps({
        user:{
            type:Object,
            required:true
        }
    })
</script>