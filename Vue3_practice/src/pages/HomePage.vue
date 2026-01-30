<template>
  <div>
    <h1>HomePage</h1>
    <h2>{{ number }}</h2>
    <h2>{{ number_2 }}</h2>
    <h2>{{ obj_value }}</h2>
    <button @click="cal">Cal Button</button>
  </div>

  <hr />

  <table>
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

</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { mock_table } from '../assets/mock' // KATRI 신고 mock 데이터

/* 상태 관리 */
const number = ref(10);
const number_2 = computed(()=>number.value*2);
const obj = reactive({x:1, y:2, z:3});
const obj_value = ref(obj.x);

/* 메서드 */

// ref 상태 변화 메서드
function cal() {
  number.value += 2;
}

// filter 메서드 사용
const filter_mock = computed(() =>
 mock_table.filter(item => item.status == "승인 대기"));
</script>

<style scoped>
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