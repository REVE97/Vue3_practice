<template>
  <div class="ref">
    <h1 style="text-align: center;">ref, reactive</h1>
    <h1>HomePage</h1>
    <h2>{{ number }}</h2>
    <h2>{{ number_2 }}</h2>
    <h2>{{ obj_value }}</h2>
    <button @click="cal">Cal Button</button>
  </div>

  <hr />

  <div class="table">
  <table style="margin-bottom: 20px;">
    <caption style="margin: 5px; font-weight: bold;">Table</caption>
    <colgroup>
      <!-- <col span="1" style="background-color: white;"> -->
      <!-- <col span="3" style="background-color: black;"> -->
    </colgroup>
    <thead>
      <tr style="background-color: aqua;">
        <th scope="col">차대번호</th>
        <th scope="col">차량번호</th>
        <th scope="col">차주</th>
        <th scope="col">전화번호</th>
        <th scope="col">등록일</th>
        <th scope="col">사고 유형</th>
        <th scope="col">상태</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in mock_table" :key="item.id">
        <td>{{ item.vin }}</td>
        <td>{{ item.vrn }}</td>
        <td>{{ item.person }}</td>
        <td>{{ item.tel }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.con }}</td>
        <td>{{ item.status }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="7" style="background-color: #ccc;">마지막 페이지</td>
      </tr> 
    </tfoot>
  </table>

  <table>
    <caption style="margin: 5px; font-weight: bold;">Filtering Table</caption>
    <colgroup>
      <!-- <col span="1" style="background-color: white;"> -->
      <!-- <col span="3" style="background-color: black;"> -->
    </colgroup>
    <thead>
      <tr style="background-color: aqua;">
        <th scope="col">차대번호</th>
        <th scope="col">차량번호</th>
        <th scope="col">차주</th>
        <th scope="col">전화번호</th>
        <th scope="col">등록일</th>
        <th scope="col">사고 유형</th>
        <th scope="col">상태</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in filter_mock" :key="item.id">
        <td>{{ item.vin }}</td>
        <td>{{ item.vrn }}</td>
        <td>{{ item.person }}</td>
        <td>{{ item.tel }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.con }}</td>
        <td>{{ item.status }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="7" style="background-color: #ccc;">마지막 페이지</td>
      </tr> 
    </tfoot>
  </table>
  </div>

  <hr />

  <div class="select">
    <h1 style="text-align: center;">SELECT, OPTION</h1>
    <select name="status">
      <option value="승인 대기">승인 대기</option>
      <option value="승인 완료">승인 완료</option>
      <option value="승인 불가">승인 불가</option>
    </select>
  </div>

  <hr />

  <!-- Date 값은 string 값으로 YYYY-MM-DD 형식으로 받아온다 -->
  <!-- min, max 값을 통해 사용자가 조회 가능한 최소, 최대 날짜를 설정 -->
  <div class="date">
    <h1 style="text-align: center;">Date</h1>
    <input type="date" min="2025-01-01" max="2026-01-01" v-model="selectedDate"/>
  </div>

  <hr />

  <!-- name 으로 그룹을 구성하여 한 그룹으로 설정함 -->
  <div class="radio">
    <h1 style="text-align: center;">Radio</h1>
    <label>
      <input type="radio" name="con" value="안전 사고" v-model="con">안전사고
    </label>
    <label>
      <input type="radio" name="con" value="사고 조사" v-model="con">사고조사
    </label>
    <label>
      <input type="radio" name="con" value="정비 요청" v-model="con">정비요청
    </label>
  </div>

  <hr />

  <!-- Test API -->
  <div class="axios_test">
    <h1 style="text-align: center;">Axios GET Test</h1>
    <ul>
      <li v-for="item in users" :key="item.id">
        ID : {{ item.id }} /
        NAME : {{ item.name }} / 
        USERNAME : {{ item.username }} /
        PHONE : {{ item.phone }} /
      </li>
    </ul>
  </div>

  <div class="axios_test">
    <h1 style="text-align: center;">Axios POST Test</h1>
    <button @click="postFetch">POST</button>
    <p>{{ postUsers_result }}</p>
  </div>

</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { mock_table } from '../assets/mock' // KATRI 신고 mock 데이터
import axios from 'axios';


/* 상태 관리 */
const number = ref(10);
const number_2 = computed(()=>number.value*2);
const obj = reactive({x:1, y:2, z:3});
const obj_value = ref(obj.x);

const selectedDate = ref(""); // 날짜 선택 상태

const con = ref(""); // 사고 유형 상태

const users = ref([]); // Axios GET Test 상태
const errors = ref(null); // Axios GET Test API 상태 에러처리

// Axios POST Test 상태
const postUsers = ref({
  userId: 11,
  title: "ABC",
  body: "123"
});
const postUsers_result = ref(null);

/* 메서드 */

// ref 상태 변화 메서드
function cal() {
  number.value += 2;
}

// table 태그에 filter 메서드
const filter_mock = computed(() =>
 mock_table.filter(item => item.status == "승인 대기"));

// Axios GET
const getFetch = async () => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    users.value = res.data;
  } catch (error) {
    errors.value = error.message;
  }
}

// Axios POST
const postFetch = async () => {
  try {
    const res = await axios.post('https://jsonplaceholder.typicode.com/posts',postUsers.value);
    postUsers_result.value = res.data;
  } catch (error) {
    errors.value = error.message;
  }
}

onMounted(getFetch);
</script>

<style scoped>
/* table css */
table { border-collapse : collapse; } /* 이중선 제거 */

th,td {
  width: 100px;
  height: 50px;
  text-align: center;
  
  border-width: 1px 0;
  border-style: solid;
  border-color: #ccc;
}
</style>