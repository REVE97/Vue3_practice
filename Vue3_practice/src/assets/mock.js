// KATRI 신고 mock 데이터

import { reactive } from "vue";
export const mock_table = reactive([
  {
    id: "1",
    vin: "EDG5235234",
    vrn: "01가1234",
    person: "A123456",
    tel: "01012345678",
    date: "2025-12-03",
    con: "안전사고",
    status: "승인 대기"
  },
  {
    id: "2",
    vin: "EDG5235235",
    vrn: "12나5678",
    person: "A123457",
    tel: "01023456789",
    date: "2025-12-04",
    con: "차량 점검",
    status: "승인 완료"
  },
  {
    id: "3",
    vin: "EDG5235236",
    vrn: "23다9012",
    person: "A123458",
    tel: "01034567890",
    date: "2025-12-05",
    con: "보험 접수",
    status: "반려"
  },
  {
    id: "4",
    vin: "EDG5235237",
    vrn: "34라3456",
    person: "A123459",
    tel: "01045678901",
    date: "2025-12-06",
    con: "사고 조사",
    status: "승인 대기"
  },
  {
    id: "5",
    vin: "EDG5235238",
    vrn: "45마7890",
    person: "A123460",
    tel: "01056789012",
    date: "2025-12-07",
    con: "정비 요청",
    status: "승인 완료"
  }
]);