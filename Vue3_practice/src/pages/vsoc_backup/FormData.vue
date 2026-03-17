<template>
<!-- 기존 파일 업로드 형식 -->
<tr>
  <th colspan="2">파일 첨부</th>
  <td class="file">
    <div class="input">
      <input type="text" readonly="readonly" id="fileName" placeholder="업로드할 파일을 선택해주세요" />
      <label>파일선택
        <input type="file" onchange="javascript:document.getElementById('fileName').value=this.value">
      </label>
    </div>
  </td>
</tr>

<!-- 작성한 파일 업로드 형식 -->
<tr>
  <th colspan="2">파일 첨부</th>
  <td class="file">
    <form @submit.prevent="postfetch_file"> 
      <input type="file" @change="onFileChange" />
      <button type="submit">업로드</button>
    </form>
  </td>
</tr>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

</script>

<style scoped>

</style>