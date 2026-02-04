<template>
  <div class="ref">
    <h1 style="text-align: center;">ref, reactive</h1>
    <h1>HomePage</h1>
    <h2>{{ number }}</h2>
    <h2>{{ number_2 }}</h2>
    <h2>{{ obj_value }}</h2>
    <button @click="cal">Cal Button</button>
  </div>

  <hr />
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

const number = ref(10);
const number_2 = computed(()=>number.value*2);
const obj = reactive({x:1, y:2, z:3});
const obj_value = ref(obj.x);

function cal() {
  number.value += 2;
}
</script>

<style scoped>

</style>