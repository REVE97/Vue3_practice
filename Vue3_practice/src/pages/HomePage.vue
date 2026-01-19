<template>
  <div class="m-3 font-bold">
    <h1 class="text-yellow-300">HomePage</h1>
    <h2>{{ number }}</h2>
    <h2>{{ number_2 }}</h2>
    <h2>{{ obj_value }}</h2>
    <button class="border-2 p-2 m-2" @click="cal">Cal Button</button>

  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const number = ref(10);
const number_2 = computed(()=>number.value*2);
const obj = reactive({x:1, y:2, z:3});
const obj_value = ref(obj.x);

function cal() {
  number.value += 2;
}

// console.log(typeof(number.value));
// console.log(typeof(obj.x));

</script>

<style scoped>

</style>