<template>
  <div>
    <h2>{{ number }}</h2>
    <h2>{{ number }}</h2>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';

const number = ref(10);

console.log(typeof(number.value));


</script>

<style scoped>

</style>