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
                <button
                    :class="modalInfo.btnClass !== '' ? modalInfo.btnClass : '' "
                    @click="handleConfirmBtn"
                >
                {{ modalInfo.btnText }}
            </button>
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

const handleConfirmBtn = () => {
    if(props.modalInfo.rightBtn) {
        props.modalInfo.rightBtn();
    }
    store.clearModalInfo();
}

</script>