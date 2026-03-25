<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>권한 관리</span>
    </section>

    <section class="search">
      <article>
        <strong>이름</strong>
        <div class="input">
          <input type="text" v-model="userInput.inputName" />
        </div>

        <strong>연락처</strong>
        <div class="input">
          <input type="text" v-model="userInput.inputId" />
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
              <th>이름</th>
              <th>연락처</th>
              <th>취약점 수집자</th>
              <th>모니터링 리포트</th>
              <th>KATRI 신고</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in display" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.id }}</td>

              <td class="radio">
                <input
                  type="radio"
                  name="vulnerabilityCollector"
                  :id="`vulnerabilityRadio-${item.id}`"
                  :value="item.id"
                  v-model="selectedVulnerabilityCollectorId"
                />
                <label :for="`vulnerabilityRadio-${item.id}`">
                  취약점 수집자
                </label>
              </td>

              <td class="checkbox">
                <input
                  type="checkbox"
                  :id="`monitoringCheckbox-${item.id}`"
                  v-model="item.roleChecked.monitoringReport"
                />
                <label :for="`monitoringCheckbox-${item.id}`">
                  모니터링 리포트
                </label>
              </td>

              <td class="checkbox">
                <input
                  type="checkbox"
                  :id="`katriCheckbox-${item.id}`"
                  v-model="item.roleChecked.katriIncident"
                />
                <label :for="`katriCheckbox-${item.id}`">
                  KATRI 신고
                </label>
              </td>
            </tr>

            <tr v-if="display.length === 0">
              <td colspan="5">조회된 데이터가 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </article>

      <article class="group button">
        <button @click="postfetch_roleList">저장</button>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

// 권한 값
const ROLE_VALUE = {
  vulnerability: 1,
  monitoringReport: 2,
  katriIncident: 4,
};

// 전체 데이터
const allData = ref([]);

// 검색 입력값
const userInput = ref({
  inputName: "",
  inputId: "",
});

// 검색 모드
const searchOn = ref(false);

// 취약점 수집자로 선택된 사용자 id
// radio 이므로 1명만 선택 가능
const selectedVulnerabilityCollectorId = ref("");

// 특정 권한 포함 여부 확인
const hasRole = (vsocRole, role) => {
  return (Number(vsocRole) & role) === role;
};

// 체크된 상태를 바탕으로 vsocRole 계산
const getVsocRoleValue = (item) => {
  let total = 0;

  // radio 로 선택된 1명에게만 1 부여
  if (selectedVulnerabilityCollectorId.value === item.id) {
    total += ROLE_VALUE.vulnerability;
  }

  if (item.roleChecked.monitoringReport) {
    total += ROLE_VALUE.monitoringReport;
  }

  if (item.roleChecked.katriIncident) {
    total += ROLE_VALUE.katriIncident;
  }

  return total;
};

// 검색 필터
const filteredData = computed(() => {
  return allData.value.filter((item) => {
    const matchName =
      !userInput.value.inputName ||
      item.name.includes(userInput.value.inputName);

    const matchId =
      !userInput.value.inputId ||
      item.id.includes(userInput.value.inputId);

    return matchName && matchId;
  });
});

// 실제 출력 목록
const display = computed(() => {
  return searchOn.value ? filteredData.value : allData.value;
});

// 검색 실행
const search_on = () => {
  searchOn.value = true;
};

// 조회 API
const getfetch_roleList = async () => {
  try {
    const res = await axios.get("http://localhost:9100/api/vsoc/roles", {
      params: {
        name: "",
        phone: "",
      },
    });

    const list = res?.data?.data?.roleList?.list ?? [];

    allData.value = list.map((item) => {
      const vsocRole = Number(item.vsocRole) || 0;

      return {
        ...item,
        roleChecked: {
          monitoringReport: hasRole(vsocRole, ROLE_VALUE.monitoringReport),
          katriIncident: hasRole(vsocRole, ROLE_VALUE.katriIncident),
        },
      };
    });

    // 취약점 수집자(1) 권한 가진 사람 1명 찾기
    const vulnerabilityUser = list.find((item) =>
      hasRole(item.vsocRole, ROLE_VALUE.vulnerability)
    );

    selectedVulnerabilityCollectorId.value = vulnerabilityUser
      ? vulnerabilityUser.id
      : "";

    if (res.data.resultCode == -1) {
      alert("데이터 불러오기 실패");
    }
  } catch (error) {
    console.error(error);
    alert("데이터 불러오기 실패");
  }
};

// 저장 API
const postfetch_roleList = async () => {
  try {
    const payload = {
      roleList: allData.value.map((item) => ({
        id: item.id,
        name: item.name,
        vsocRole: getVsocRoleValue(item),
      })),
    };

    await axios.post("api/vsoc/roles", payload);

    alert("권한 저장 완료");

    await getfetch_roleList();
  } catch (error) {
    console.error(error);
    alert("권한 저장 실패");
  }
};

onMounted(getfetch_roleList);
</script>