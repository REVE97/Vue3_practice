<template>
  <teleport to="body">
    <div v-if="open" class="modal-overlay">
        <div class="modal-box" role="dialog" aria-modal="true">
            <p class="modal-text">
                <slot />
            </p>

            <div class="modal-actions">
                <button
                    v-for="(btn,i) in buttons"
                    :key="i"
                    class="modal-btn"
                    @click="btn.onClick">
                    {{ btn.label }}
                </button>
            </div>
        </div>
    </div>
  </teleport>

  <OtaModal v-show="isModalVisible"></OtaModal>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

defineProps({
    open: { type: Boolean , default: false },
    buttons: {
        type: Array,
        default: () => [],
    }
});

const store = useAppStore();
const modalInfo = computed(() => store.modalInfo);
const loadingInfo = computed(() => store.loadingInfo);

const isModalVisible = computed(
    () => modalInfo.value.on || loadingInfo.value.on
);

</script>

<style scoped>

</style>