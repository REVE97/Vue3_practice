<template>
  <header>
    <h1 style="text-align: center;">Select</h1>
  </header>

  <div class="select">
    <select name="status" v-model="status">
      <option value="승인 대기">승인 대기</option>
      <option value="승인 완료">승인 완료</option>
      <option value="승인 불가">승인 불가</option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const status = ref("");

</script>

<style scoped>

</style>