<script setup>
import { RouterView, useRouter } from 'vue-router'

const router = useRouter();
</script>

<template>
  <header>
      <nav>
        <div>
          <button @click="router.push('/')">Home</button>
          <button @click="router.push('/design')">Design</button>
          <hr />
        </div>
      </nav>
  </header>

  <RouterView />
</template>

<style scoped>
/* 밑줄 제거 */
a {
  text-decoration: none;
}
</style>
