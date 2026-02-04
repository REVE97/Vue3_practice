<template>
  <header>
    <h1 style="text-align: center;">Input Type</h1>
    <hr />
  </header>

  <!-- Date 값은 string 값으로 YYYY-MM-DD 형식으로 받아온다 -->
  <!-- min, max 값을 통해 사용자가 조회 가능한 최소, 최대 날짜를 설정 -->
  <div class="date">
    <h1 style="text-align: center;">Date</h1>
    <input type="date" min="2025-01-01" max="2026-01-01" v-model="selectedDate"/>
  </div>

  <hr />

  <!-- name 으로 그룹을 구성하여 한 그룹으로 설정함 -->
  <div class="radio">
    <h1 style="text-align: center;">Radio</h1>
    <label>
      <input type="radio" name="con" value="안전 사고" v-model="accident.type">안전사고
    </label>
    <input type="text" v-if="accident.type === '안전 사고'" placeholder="ex)차종" v-model="accident.remark">

    <label>
      <input type="radio" name="con" value="사고 조사" v-model="accident.type">사고조사
    </label>

    <label>
      <input type="radio" name="con" value="정비 요청" v-model="accident.type">정비요청
    </label>
  </div>

  <hr />

  <div class="Time">
    <h1 style="text-align: center;">Time</h1>
    <label>
        시간선택&nbsp;<input type="time" v-model="time">
    </label>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';

const selectedDate = ref(""); // 날짜 선택 상태

const time = ref("");

const accident = reactive({ 
  type:"",
  remark:""
});

</script>

<style scoped>

</style>