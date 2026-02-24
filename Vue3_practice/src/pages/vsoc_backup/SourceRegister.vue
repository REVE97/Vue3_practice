<template>
  <div></div>
</template>

<script setup>
import { ref, computed } from 'vue';

const isValid = computed(() => {
    return Object.values(post_source_data.value).every(
        (value) => value !== null && value !== undefined && value !== ""
    )
})

</script>

<style scoped>

</style>