<template>
  <div>
    <section>
        <span>home</span>
        <sapn>취약점 정보</sapn>
        <span>Source 관리</span>
    </section>
    <section>
        <article>
            <strong>Source ID</strong>
            <div>
                <input type="text" v-model.number="userInputSourceId">
            </div>
            <strong>카테고리</strong>
            <div>
                <input type="text" v-model="userInputCategory">
            </div>
            <strong>모니터링 주기</strong>
            <div>
                <select v-model="userInputFrequency">
                    <option value="전체">전체</option>
                    <option value="daily">daily</option>
                    <option value="month">month</option>
                </select>
            </div>
            <strong>상태</strong>
            <div>
                <select v-model="userInputStatus">
                    <option value="전체">전체</option>
                    <option value="Valid">Valid</option>
                </select>
            </div>
            <div>
                <button @click="onSearch">검색</button>
            </div>
        </article>
        <article>
            <table>
                <thead>
                    <tr>
                        <th>Source ID</th>
                        <th>Source 카테고리</th>
                        <th>Source 이름</th>
                        <th>모니터링 주기</th>
                        <th>수집방법</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,idx) in display" :key="idx">
                        <td>
                            <a href="">{{ item.sourceId }}</a>
                        </td>
                        <td>{{ item.sourceCategory }}</td>
                        <td>{{ item.sourceName }}</td>
                        <td>{{ item.collectionFrequency }}</td>
                        <td>{{ item.collectionMethod }}</td>
                        <td>{{ item.status }}</td>
                    </tr>
                </tbody>
            </table>
        </article>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';

const userInputSourceId = ref("");
const userInputCategory = ref("");
const userInputFrequency = ref("");
const userInputStatus = ref("");

const allData = ref([]);

const searchStatus = ref(false);

const all_getFetch_source = async () => {
    const errors = ref("");
    try {
        const res = await axios.get('http://localhost:9100/api/vsoc/ext-vulns/source',{
            params : {
                sourceId: null,
                sourceCategory: "",
                collectionFrequency: "",
                status: "",
            }
        })
        allData.value = res.data.data.extVulnsSources.list;
    } catch (error) {
        errors.value = error.message;
    }
}

const filteredData = computed(() => {
    return allData.value.filter(item => {
        const matchSourceId = !userInputSourceId.value || item.sourceId === userInputSourceId.value;
        const matchCategory = !userInputCategory.value || item.sourceId === userInputCategory.value;
        const matchFrequency = userInputFrequency.value === "전체" || !userInputFrequency.value || item.sourceId === userInputFrequency.value;
        const matchStatus = userInputStatus === "전체" || !userInputStatus.value || item.sourceId === userInputStatus.value;

        return matchSourceId && matchCategory && matchFrequency && matchStatus
    })
})

const display = computed(() => {
    return searchStatus.value ? filteredData.value : allData.value;
})

const onSearch = () => {
    searchStatus.value = true;
}

onMounted(all_getFetch_source);
</script>

<style scoped>

</style>