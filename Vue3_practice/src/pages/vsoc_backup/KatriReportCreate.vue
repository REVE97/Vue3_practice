<template>
  <button @click="postfetch_katri" :disabled="!isValid"></button>

  <CommonModal
    :open="saveOpen"
    :button="saveButtons"
    @close="saveOpen=false">
    신고서를 저장 하시겠습니까?
  </CommonModal>

  <CommonModal
    :open="doneOpen"
    :buttons="doneButtons"
    @close="doneOpen=false">
    저장 되었습니다.
  </CommonModal>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import CommonModal from '@/features/CommonModal.vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const saveOpen = ref(false);
const doneOpen = ref(false);

const goList = () => router.push({ name: 'katri_management' });

const saveOpenModal = () => {
    saveOpen.value = true;
}

const doneOpenModal = () => {
    doneOpen.value = true;
}

const saveButtons = computed(() => [
    { label: "아니오", onClick: () => (saveOpen.value=false) },
    { label: "예", onClick: doneOpenModal },
])

const doneButtons = computed(() => [
    { label: "확인", onClick: postfetch_katri}
])

</script>

<style scoped>

</style>