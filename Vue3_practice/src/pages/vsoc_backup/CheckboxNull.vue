<template>
  <div>
    <input type="text" v-model="postData.safetyAccDesc" :disabled="checkboxNone.safetyAccNone">
    <input type="checkbox" id="safetyAccCheckbox" v-model="checkboxNone.safetyAccNone">
    <label for="safetyAccCheckbox">해당사항 없음</label>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const postData = ref({
    safetyAccDesc: "",
})

const checkboxNone = ref({
    safetyAccNone: false,
})

const checkboxNull = computed(() => {
    if(allData?.value.safetyAccDesc === null) return "해당사항 없음";
    return "";
})
</script>

<style scoped>

</style>