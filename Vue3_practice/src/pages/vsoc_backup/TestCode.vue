<template>
  <!-- url 방식 동적 라우팅 -->
  <!-- 서버 배포시 직접 url 경로를 입력하거나, 새로고침을 했을때 오류가 발생할 수 있음 -->
  <router-link :to="`/vulnerInfo/detail/${item.id}`">
    {{ item.id }}
  </router-link>
  <!-- name + params 방식 동적 라우팅 (실무용) -->
  <router-link :to="{ name: 'vulner_detail' , params : { id: item.id } }">
    {{ item.id }}
  </router-link>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

// 함수 메서드 동적 라우팅
const goList = () => {
  router.push({
    name: "source_detail",
    params: { sourceId: route.params.sourceId },
  })
}

</script>

<style scoped>

</style>