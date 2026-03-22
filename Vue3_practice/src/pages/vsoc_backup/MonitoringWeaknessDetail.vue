<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>모니터링 리포트</span>
      <span>리포트 상세 조회</span>
    </section>
    <section class="step button">
      <router-link v-if="isValid?.eventReportId" :to="`/monitoringEventReport/detail/${isValid.eventReportId}`">
        <button>Event Report</button>
      </router-link>
      <button class="active">Weakness Report</button>
      <router-link v-if="isValid?.vulnerabilityReportId" :to="`/monitoringVulnerabilityReport/detail/${isValid.vulnerabilityReportId}`">
        <button>Vulnerability Report</button>
      </router-link>
      <router-link v-if="isValid?.cyberReportId" :to="`/monitoringCyberReport/detail/${isValid.cyberReportId}`">
        <button>Cybersecurity Incident Response Report</button>
      </router-link>
    </section>
    <section class="page">
      <article class="table">
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>Weakness ID</th>
              <td>{{ allData?.id }}</td>
              <th>Event ID</th>
              <td>{{ allData?.eventReportId }}</td>
            </tr>
            <tr>
              <th>제품명</th>
              <td>{{ allData?.evenReport?.productName }}</td>
              <th>프로젝트명</th>
              <td>{{ allData?.evenReport?.projectName }}</td>
            </tr>
            <tr>
              <th>연관된 Asset</th>
              <td>{{ allData?.evenReport?.associatedAsset }}</td>
              <th>CS Info 이름</th>
              <td>{{ allData?.evenReport?.csInfoName }}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{{ allData?.evenReport?.description }}</td>
              <th>사이버 보안 자산</th>
              <td>{{ allData?.cyberAsset }}</td>
            </tr>
            <tr>
              <th>위협 시나리오 분석 결과</th>
              <td>{{ allData?.threatScenarioResult }}</td>
              <th>공격 경로</th>
              <td>{{ allData?.attackPath }}</td>
            </tr>
            <tr>
              <th>Weakness 식별</th>
              <td>{{ allData?.weaknessIdentified }}</td>
              <th>Weakness 식별 사유</th>
              <td>{{ allData?.weaknessReason }}</td>
            </tr>
            <tr>
              <th>담당자</th>
              <td>{{ allData?.manager }}</td>
              <th></th>
              <td></td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="group button">
        <button class="red line" @click="openDeleteConfirm">삭제</button>
        <router-link :to="`/monitoringWeaknessReport/update/${route.params.weaknessReportId}`">
          <button class="line">수정</button>
        </router-link>
        <button class="cancel" @click='router.push({name:"monitoring_management"})'>목록</button>
        <router-link v-if="isValid?.vulnerabilityReportId === null" :to="`/monitoringVulnerabilityReport/register/${isValid.weaknessReportId}`">
          <button>취약점 리포트 작성</button>
        </router-link>
      </article>

      <!-- modal -->
      <VsocModal />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
import axios from 'axios';
import VsocModal from '../../modal/VsocModal.vue';

const route = useRoute();
const router = useRouter();
const store = useAppStore();

// 모니터링 리포트 약점 리포트 상세조회 전체 데이터
const allData = ref(null);

// 버튼으로 이동하기 위한 리포트 데이터
const isValid = ref({
  eventReportId: "",
  weaknessReportId: "",
  vulnerabilityReportId: "",
  cyberReportId: "",
});

// 모니터링 리포트 약점 리포트 상세조회 API 호출
const getfetch_weakness_detail = async() => {
  try {
    const weaknessReportId = route.params.weaknessReportId;
    const res = await axios.get(`http://localhost:9100/api/vsoc/monitoring-report/weakness/${weaknessReportId}`);
    allData.value = res.data.data.report;
  } catch (error) {
    console.error(error);
    alert('데이터 불러오기 실패');
  }
}

// 해당 리포트 리스트 바로가는 버튼, 다음 리포트 작성 버튼 API 호출
const getfetch_button_link = async() => {
  try {
    const weaknessReportId = Number(route.params.weaknessReportId);
    const res = await axios.get('http://localhost:9100/api/vsoc/monitoring-report');
    isValid.value = res.data.data.monitoringReports.list.find((item)=>item.weaknessReportId === weaknessReportId);
  } catch (error) {
    console.error(error);
    alert('데이터 불러오기 실패');
  }
}

// 모니터링 리포트 약점 리포트 상세조회 삭제 API 호출
const deletefetch_weakness_detail = async() => {
  try {
    const weaknessReportId = route.params.weaknessReportId;
    await axios.delete(`/api/vsoc/monitoring-report/weakness/${weaknessReportId}`);
  } catch (error) {
    console.error(error);
    alert('데이터 삭제 실패');
  }
}

// modal
const goList = () => router.replace({name:"monitoring_management"});

const openDeleteConfirm = () => {
  store.setModalInfo({
    on: true,
    type: "twobtn",
    iconClass: "warning",
    textArea: "리포트를 삭제하시겠습니까?",

    rightBtn: () => { 
      deletefetch_weakness_detail();
      goList(); 
    },
  })
};

onMounted(() => {
  getfetch_weakness_detail();
  getfetch_button_link();
});
</script>