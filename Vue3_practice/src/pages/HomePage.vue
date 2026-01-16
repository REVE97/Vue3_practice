<template>
  <div class="m-3 font-bold">
    <h2>{{ number }}</h2>
    <h2>{{ number_2 }}</h2>
    <h2>{{ obj_value }}</h2>
    <button @click="cal">Button</button>
    
  </div>
</template>

<script setup>
import { ref, reactive, computed, defineProps } from 'vue';

const number = ref(10);
const number_2 = computed(()=>number.value*2);
const obj = reactive({x:1, y:2, z:3});
const obj_value = ref(obj.x);

function cal() {
  number.value += 2;
}

const props = defineProps({
  msg: {
    type: String
  }
});

console.log(typeof(number.value));
console.log(typeof(obj.x));

</script>

<style scoped>

</style>