<template>
  <button class="line" @click="tempOpenModal" :disabled="!isValid">임시 저장</button>
  <button @click="saveOpenModal" :disabled="!isValid">신고서 저장</button>

  <CommonModal
    :open="saveOpen"
    :button="saveButtons"
    @close="saveCloseModal">
    신고서를 저장하시겠습니까?
  </CommonModal>

  <CommonModal
    :open="doneOpen"
    :button="doneButtons"
    @close="doneCloseModal">
    저장 되었습니다.
  </CommonModal>

  <CommonModal
    :open="tempOpen"
    :button="tempButtons"
    @close="tempCloseModal">
    임시 저장 하시겠습니까?
  </CommonModal>

  <CommonModal
    :open="tempDoneOpen"
    :button="tempDoneButtons"
    @close="tempDoneCloseModal">
    임시 저장 되었습니다.
  </CommonModal>
  
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import CommonModal from '@/features/CommonModal.vue';

const postfetch_katri_new = async() => {
    try {
        
    } catch (error) {
        
    }
    doneOpenModal();
}

const postfetch_katri_temp = async() => {
    try {
        
    } catch (error) {
        
    }
    tempDoneOpenModal();
}

const saveOpen = ref(false);
const doneOpen = ref(false);
const tempOpen = ref(false);
const tempDoneOpen = ref(false);

const saveOpenModal = () => (saveOpen.value=true);
const saveCloseModal = () => (saveOpen.value=false);
const doneOpenModal = () => (doneOpen.value=true);
const doneCloseModal = () => (doneOpen.value=false);
const tempOpenModal = () => (tempOpen.value=true);
const tempCloseModal = () => (tempOpen.value=false);
const tempDoneOpenModal = () => (tempDoneOpen.value=true);
const tempDoneCloseModal = () => (tempDoneOpen.value=false);

const goList = () => router.push({name: "katri_management"});

const saveButtons = computed(() => [
    {label: "아니오", onclick: saveCloseModal },
    {label: "예", onClick: async() => {
        saveCloseModal();
        await postfetch_katri_new();
    }}
]);

const doneButtons = computed(() => [
    {label: "확인", onClick: () => {
        doneCloseModal();
        goList();
    }}
]);

const tempButtons = computed(() => [
    {label: "아니오", onclick: tempCloseModal },
    {label: "예", onClick: async() => {
        tempCloseModal();
        await postfetch_katri_temp();
    }}
]);

const tempDoneButtons = computed(() => [
    {label: "확인", onClick: () => {
        tempDoneCloseModal();
        goList();
    }}
]);

</script>

<style scoped>

</style>