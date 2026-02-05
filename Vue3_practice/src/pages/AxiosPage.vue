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

    <h1 style="text-align: center;">Axios GET Params Test</h1>
    <ul>
        <li v-for="(item,idx) in users_para" :key="idx">
            ID : {{ item.userId }} /
            NAME : {{ item.id }} / 
            USERNAME : {{ item.title }} /
            PHONE : {{ item.body }} /
        </li>
    </ul>

    <hr />

    <h1 style="text-align: center;">Axios POST Test</h1>
    <input type="text" placeholder="userId" v-model="postUsers.userId">
    <input type="text" placeholder="title" v-model="postUsers.title">
    <input type="text" placeholder="body" v-model="postUsers.body">
    <button @click="postFetch">POST</button>
    <p>{{ postUsers_result }}</p>

    <h1 style="text-align: center;">Axios FormData POST Test</h1>
    <form @submit.prevent="submitForm">
        <input type="text" placeholder="이름" v-model="name" required /> / 
        <input type="file" @change="onFileChange" multiple required /> / 
        <button type="submit">업로드</button>
    </form>
  </main>

</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]); // Axios GET Test 상태
const errors = ref(null); // Axios GET Test API 상태 에러처리

const users_para = ref([]); // AXios GET Parmas Test 상태


// Axios POST Test 상태
const postUsers = reactive({
    userId: null,
    title: "",
    body: ""
});
const postUsers_result = ref(null);

// Axios formdata POST Test 상태
const name = ref("");
const file = ref(null);

// Axios GET method
const getFetch = async () => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    users.value = res.data;
  } catch (error) {
    errors.value = error.message;
  }
}

// params 값 넣어서 GET method
const getFetch_para = async () => {
    try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts',{ params: { userId : 6, id : 53 }})
        users_para.value = res.data;
    } catch (error) {
        errors.value = error.response.status
    }
}

// Axios POST method
const postFetch = async () => {
  try {
    const res = await axios.post('https://jsonplaceholder.typicode.com/posts',postUsers);
    postUsers_result.value = res.data;
  } catch (error) {
    errors.value = error.message;
  }
}

// Axios FormData POST method
const onFileChange = (e) => {
    file.value = e.target.files;
}

const submitForm = async () => {
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("file", file.value);

    try {
        const res = await axios.post('https://jsonplaceholder.typicode.com/posts',formData,{
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        })
        console.log(res.data);
    } catch (error) {
        errors.value = error.message
    }
}

onMounted(() => {
    getFetch();
    getFetch_para();
});

</script>

<style scoped>

</style>