<template>
  <header>
    <h1 style="text-align: center;">Axios</h1>
    <hr />
  </header>

  <main>
    <h1 style="text-align: center;">Axios GET Test</h1>
    <ul>
      <li v-for="item in users" :key="item.id">
        ID : {{ item.id }} /
        NAME : {{ item.name }} / 
        USERNAME : {{ item.username }} /
        PHONE : {{ item.phone }} /
      </li>
    </ul>

    <h1 style="text-align: center;">Axios POST Test</h1>
    <button @click="postFetch">POST</button>
    <p>{{ postUsers_result }}</p>
  </main>

</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]); // Axios GET Test 상태
const errors = ref(null); // Axios GET Test API 상태 에러처리

// Axios POST Test 상태
const postUsers = ref({
  userId: 11,
  title: "ABC",
  body: "123"
});
const postUsers_result = ref(null);

// Axios GET
const getFetch = async () => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    users.value = res.data;
  } catch (error) {
    errors.value = error.message;
  }
}

// Axios POST
const postFetch = async () => {
  try {
    const res = await axios.post('https://jsonplaceholder.typicode.com/posts',postUsers.value);
    postUsers_result.value = res.data;
  } catch (error) {
    errors.value = error.message;
  }
}

onMounted(getFetch);

</script>

<style scoped>

</style>