<template>
  <div></div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const readDone = computed(() => {
  return allData.value.isRead ? "확인" : "x";
})

</script>

<style scoped>

</style>