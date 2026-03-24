<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>알림 이력 조회</span>
    </section>

    <section class="search">
      <article>
        <strong>알림 발송일</strong>
        <div class="input calendar">
          <Datepicker
            v-model="userInput.inputAlarmsDate"
            format="yyyy-MM-dd"
            model-type="format"
            :enable-time-picker="false"
            :clearable="false"
            :hideInputIcon="true"
            locale="ko"
          />
          <label></label>
        </div>

        <strong>차대 번호</strong>
        <div class="input">
          <input
            type="text"
            placeholder="차대 번호를 입력해주세요"
            v-model="userInput.inputVin"
          />
        </div>

        <div class="button">
          <button @click="search_on">검색</button>
        </div>
      </article>
    </section>

    <section class="content">
      <article class="table">
        <table>
          <thead>
            <tr>
              <th>알림 발송 일시</th>
              <th>데이터 출처</th>
              <th>미승인 정보</th>
              <th>차대번호</th>
              <th>차종</th>
              <th>ECU</th>
              <th>ECU SW 버전</th>
              <th>RXSWIN 식별 번호</th>
              <th class="checkbox">
                <input
                  type="checkbox"
                  id="allCheckbox"
                  :checked="isAllChecked"
                  @change="toggleAllCheckbox"
                />
                <label for="allCheckbox"></label>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in display" :key="item.vin">
              <td>{{ getDate(item.alarmSentDate) }}</td>
              <td>{{ item.dataSource }}</td>
              <td>{{ item.unapprovedInfo }}</td>
              <td>{{ item.vin }}</td>
              <td>{{ item.vehModel }}</td>
              <td>{{ item.ecuName }}</td>
              <td>{{ item.ecuSwVersion }}</td>
              <td>{{ item.rxswinId }}</td>

              <td v-if="Number(item.isRead) === 1">확인</td>

              <td v-else class="checkbox">
                <input
                  type="checkbox"
                  :id="`listCheckbox-${item.vin}`"
                  :value="item.alarmId"
                  v-model="selectedAlarmIds"
                />
                <label :for="`listCheckbox-${item.vin}`"></label>
              </td>
            </tr>

            <tr v-if="display.length === 0">
              <td colspan="9">조회된 데이터가 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </article>

      <article class="group button">
        <button @click="postSelectedAlarms">알림 확인</button>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getDate } from "@/common/common";
import axios from "axios";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// 알림 이력 조회 전체 데이터 상태값
const allData = ref([]);

// 사용자 검색 입력 데이터 상태값
const userInput = ref({
  inputAlarmsDate: "",
  inputVin: "",
});

// 선택된 체크박스들의 목록
const selectedAlarmIds = ref([]);

// 검색 모드 데이터 상태값
const searchOn = ref(false);

// 검색모드 시 필터링 데이터 상태값
const filteredData = computed(() => {
  return allData.value.filter((item) => {
    const matchAlaramsDate =
      !userInput.value.inputAlarmsDate ||
      getDate(item.alarmSentDate) === userInput.value.inputAlarmsDate;

    const matchVin =
      !userInput.value.inputVin ||
      item.vin.includes(userInput.value.inputVin);

    return matchAlaramsDate && matchVin;
  });
});

// 검색모드 on/off 구분하는 데이터 상태값
const display = computed(() => {
  return searchOn.value ? filteredData.value : allData.value;
});

// 체크 가능한 목록만 따로 추출
// isRead === 0 인 항목만 체크박스를 보여주므로 이 목록만 전체선택 대상
const checkableItems = computed(() => {
  return display.value.filter((item) => Number(item.isRead) !== 1);
});

// 전체 선택 여부
const isAllChecked = computed(() => {
  return (
    checkableItems.value.length > 0 &&
    checkableItems.value.every((item) =>
      selectedAlarmIds.value.includes(item.vin)
    )
  );
});

// 검색모드 메서드
const search_on = () => {
  searchOn.value = true;
  selectedAlarmIds.value = [];
};

// 헤더 체크박스 클릭 시 전체 선택/해제
const toggleAllCheckbox = (event) => {
  const checked = event.target.checked;

  if (checked) {
    selectedAlarmIds.value = checkableItems.value.map((item) => item.vin);
  } else {
    selectedAlarmIds.value = [];
  }
};

// 선택된 alarmId에 해당하는 실제 객체 목록
const selectedAlarmList = computed(() => {
  return allData.value.filter((item) =>
    selectedAlarmIds.value.includes(item.vin)
  );
});

// 알림 이력 조회 API 호출
const getfetch_notification = async () => {
  try {
    const res = await axios.get("http://localhost:9100/api/vsoc/alarms", {
      params: {
        alarmSentStartDate: "",
        alarmSentEndDate: "",
        vin: "",
      },
    });

    allData.value = res.data.data.alarms.list ?? [];

    if (res.data.resultCode == -1) {
      alert("데이터 불러오기 실패");
    }
  } catch (error) {
    console.error(error);
    alert("데이터 불러오기 실패");
  }
};

// 선택한 리스트 서버로 전송
const postSelectedAlarms = async () => {
  if (selectedAlarmIds.value.length === 0) {
    alert("선택된 항목이 없습니다.");
    return;
  }

  try {
    // 1) id 목록만 보내는 경우
    const payload = {
      alarmIds: selectedAlarmIds.value,
    };

    await axios.post("http://localhost:9100/api/vsoc/alarms/read", payload);

    alert("선택한 알림을 서버로 전송했습니다.");

    // 전송 후 선택 초기화
    selectedAlarmIds.value = [];

    // 필요하면 재조회
    await getfetch_notification();
  } catch (error) {
    console.error(error);
    alert("알림 확인 요청 실패");
  }
};

onMounted(getfetch_notification);
</script>