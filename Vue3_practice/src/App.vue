<script setup>
import { RouterView, useRouter } from 'vue-router'

const router = useRouter();
</script>

<template>
  <header>
      <nav>
        <div>
          <button class="p-3 m-3 border-3" @click="router.push('/')">Home</button>
          <button class="p-3 m-3 border-3" @click="router.push('/design')">Design</button>
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
