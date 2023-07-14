<template>
    <div>
        <label for="" v-if="props.label">{{ props.label }}</label>
        <input type="text" :value="props.value">
    </div>
</template>
<script setup>
const props=defineProps({
    value:{
        type:String,
        required:true
    },
    label:{
        type:String,
        default:null
    }
})
</script>