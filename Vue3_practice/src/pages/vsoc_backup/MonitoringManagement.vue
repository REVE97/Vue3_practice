<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>모니터링 리포트</span>
    </section>
    <section class="search">
      <article>
        <strong>Event ID</strong>
        <div class="input">
          <input type="text" v-model.number="userInputData.userInputEventId"/>
        </div>
        <strong>Source ID</strong>
        <div class="input">
          <input type="text" v-model.number="userInputData.userInputSourceId"/>
        </div>
        <strong>Trigger ID</strong>
        <div class="input">
          <input type="text" v-model.number="userInputData.userInputTriggerId"/>
        </div>
        <strong>보고자</strong>
        <div class="input">
          <input type="text" v-model="userInputData.userInputReporter"/>
        </div>
        <div class="button">
          <button @click="search_on">검색</button>
        </div>
      </article>
    </section>
    <section class="content">
      <article class="group button">
        <button @click='router.push({name:"monitoring_event_register"})'>리포트 신규 작성</button>
      </article>
      <article class="table">
        <table>
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Source ID</th>
              <th>Trigger ID</th>
              <th>
                보고자
                <div class="tooltip">
                  <i></i>
                  <p>이벤트 최초 보고자의 이름</p>
                </div>
              </th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in display">
              <td>{{ item.eventReportId }}</td>
              <td>{{ item.sourceId }}</td>
              <td>{{ item.triggerId }}</td>
              <td>{{ item.reporter }}</td>
              <td class="button" :style="{display:'flex', gap:'8px', justifyContent:'center'}">
                <!-- 이벤트 리포트 -->
                <button
                  class="gray line"
                  v-if="item.eventReportId === null"
                  @click='router.push({name:"monitoring_event_register"})'>Event Report</button>
                <router-link v-else :to="`/monitoringEventReport/detail/${item.eventReportId}`">
                  <button class="line" >Event Report</button>
                </router-link>
                <!-- 약점 리포트 -->
                <router-link v-if="item.weaknessReportId === null" :to="`/monitoringWeaknessReport/register/${item.eventReportId}`">
                  <button class="gray line">Weakness Report</button>
                </router-link>
                <router-link v-else :to="`/monitoringWeaknessReport/detail/${item.weaknessReportId}`">
                  <button class="line" >Weakness Report</button>
                </router-link>
                <!-- 취약점 리포트 -->
                <router-link v-if="item.vulnerabilityReportId === null" :to="`/monitoringVulnerabilityReport/register/${item.weaknessReportId}`">
                  <button class="gray line" :disabled="item.weaknessReportId === null">Vulnerability Report</button>
                </router-link>
                <router-link v-else :to="`/monitoringVulnerabilityReport/detail/${item.vulnerabilityReportId}`">
                  <button class="line" >Vulnerability Report</button>
                </router-link>
                <!-- 사이버 리포트 -->
                <router-link v-if="item.cyberReportId === null" :to="`/monitoringCyberReport/register/${item.vulnerabilityReportId}`">
                  <button class="gray line" :disabled="item.weaknessReportId === null || item.vulnerabilityReportId === null">Cybersecurity Incident Response Report</button>
                </router-link>
                <router-link v-else :to="`/monitoringCyberReport/detail/${item.cyberReportId}`">
                  <button class="line" >Cybersecurity Incident Response Report</button>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// 대시보드 전체 데이터
const allData = ref(null);

// 사용자 검색 시 입력 데이터
const userInputData = ref({
  userInputEventId: "",
  userInputSourceId: "",
  userInputTriggerId: "",
  userInputReporter: "",
})

// 사용자 검색 시 상태값
const searchOn = ref(false);

// 모니터링 대시보드 데이터 조회 API 호출
const getfetch_monitoring = async() => {
  try {
    const res = await axios.get('http://localhost:9100/api/vsoc/monitoring-report');
    allData.value = res.data.data.monitoringReports.list;
  } catch (error) {
    console.error(error);
    alert('데이터 불러오기 실패');
  }
}

// 사용자 검색 필터링
const filteredData = computed(() => {
  return allData.value.filter(item => {
    const matchEventId = !userInputData.value.userInputEventId || userInputData.value.userInputEventId === item.eventReportId;
    const matchSourceId = !userInputData.value.userInputSourceId || userInputData.value.userInputSourceId === item.sourceId;
    const matchTriggerId = !userInputData.value.userInputTriggerId || userInputData.value.userInputTriggerId === item.triggerId;
    const matchReporter = !userInputData.value.userInputReporter || userInputData.value.userInputReporter === item.reporter;

    return matchEventId && matchSourceId && matchTriggerId && matchReporter;
  })
})

// 검색 기능 활성화
const search_on = () => (searchOn.value = true);

// 전체 데이터, 검색 데이터 구분 
const display = computed(() => {
  return searchOn.value ? filteredData.value : allData.value;
})

onMounted(getfetch_monitoring);
</script>

<style scoped>
</style>