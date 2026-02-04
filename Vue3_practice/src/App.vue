<template>
      <nav>
          <button @click="router.push('/')">Home</button>
          <button @click="router.push('/table')">Table</button>
          <button @click="router.push('/select')">Select</button>
          <button @click="router.push('/input')">Input</button>
          <button @click="router.push('/axios')">Axios</button>
          <hr />
      </nav>
  <RouterView />
</template>

<script setup>
import { RouterView, useRouter } from 'vue-router'
  
const router = useRouter();
</script>

<style scoped>
button {
  margin: 3px;
}
</style>
