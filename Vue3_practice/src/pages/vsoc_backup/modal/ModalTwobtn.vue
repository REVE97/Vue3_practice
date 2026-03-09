<template>
  <div class="modal small">
    <div class="modalContainer">
        <div class="modalHeader">
            <button class="close" @click="handleCloseBtn">close</button>
        </div>
        <div class="modalContent">
            <div class="content">
                <div :class="modalInfo.iconClass">
                    <p v-html="modalInfo.textArea"></p>
                </div>
            </div>
            <div class="button">
                <button class="cancel" @click.once="handleCancelBtn">취소</button>
                <button @click.once="handleConfirmBtn">확인</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/app';

const props = defineProps({
    modalInfo: Object,
});

const store = useAppStore();

const handleCloseBtn = () => {
    store.clearModalInfo();
};

const handleCancelBtn = () => {
    store.clearModalInfo();
    if(props.modalInfo.leftBtn) props.modalInfo.leftBtn();
};

const handleConfirmBtn = () => {
    store.clearModalInfo();
    if(props.modalInfo.rightBtn) props.modalInfo.rightBtn();
}

</script>

<style scoped>
.button button {
    min-width: 150px;
}
</style>