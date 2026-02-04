<template>
  <header>
    <h1 style="text-align: center;">Table</h1>
  </header>

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
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { mock_table } from '../assets/mock' // KATRI 신고 mock 데이터

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