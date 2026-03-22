<template>
  <div class="modal small">
    <div class="modalContainer">
      <div class="modalHeader"></div>
      <div class="modalContent">
        <div class="content">
          <div class="icon loading">
            <p>
              <br />
              {{
                percent === 100
                  ? "SW 업데이트 진행중입니다."
                  : loadingInfo.text
              }}<br />
              잠시만 기다려주세요.<br />
              남은 시간 : {{ count }}초<br />
            </p>
            <br />
            <div v-if="percentFlag" style="text-align: center">
              {{ percent }}%
            </div>
          </div>
        </div>
        <div class="button"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  loadingInfo: Object,
});

const emit = defineEmits(["timeout"]);

const count = ref(180);
const percent = ref(0);
const percentFlag = ref(false);
const timer = ref(null);
const endTime = ref(null);

onMounted(() => {
  if (props.loadingInfo.count) count.value = props.loadingInfo.count;
  if (props.loadingInfo.percent) percentFlag.value = true;

  endTime.value = Date.now() + count.value * 1000;

  timer.value = setInterval(() => {
    const now = Date.now();

    const remain = Math.max(0, Math.ceil((endTime.value - now) / 1000));
    count.value = remain;

    const percentVal = Number(sessionStorage.getItem("percent"));

    if (!isNaN(percentVal)) {
      percent.value = percentVal;
    }

    if (remain < 0) {
      clearInterval(timer.value);
      sessionStorage.setItem("loadingTimeout", "on");
      emit("timeout");
    }
  }, 500);
});

onBeforeUnmount(() => {
  if (timer.value) clearInterval(timer.value);
});
</script>

<style scoped>
.modal {
  z-index: 150;
}
</style>