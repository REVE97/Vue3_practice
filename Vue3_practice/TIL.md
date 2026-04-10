>이 게시글에서는 본격적인 개발 TIL 보다는 개발 도중 궁금했던 부분이나 도메인 지식, CS 지식에 관한 정보를 편하게 기록하는 게시글로 사용하고자 한다

# 📖 FE

## 📙 CS

### 프론트엔드에서 Axios Method 호출 시 payload, response 확인 
>개발 과정에서 프론트엔드에서 백엔드의 API 서버와 Axios + REST API 를 사용하여 데이터를 통신할 때 데이터 통신이 제대로 처리되고 있는지 console.log 를 통해 로그로 확인이 어려울 때는 웹페이지의 개발자 도구에서 NETWORK 탭을 이용해서 확인가능

### CORS 관련
>프론트엔드와 백엔드 API 서버와 **Axios Method 를 이용해서 서로 통신**할 때 **서로 포트 번호가 다르기 때문에 (Origin)** 프론트엔드에서는 Proxy를 통해 CORS 허용을 해주어야 한다.

- **CORS(Cross Origin Resource Sharing)** : 서버가 Cross Origin을 허용하는 정책 (**브라우저 보안 정책**)
- Same Origin Policy(SOP) : 같은 Origin에서만 리소스 접근을 허용하는 브라우저 보안 정책
- **Cross Origin** : 서로 다른 Origin 을 가진 리소스끼리 통신하는 경우 <-> **Same Origin** : 서로 같은 Origin 을 가진 리소스끼리 통신하는 경우
- Origin 구성요소 : **Protocol**(http,https), **Host**(localhost,domain), **Port**(4545,9100)
- Simple Request: Preflight 없이 바로 요청 / **Preflight Request(OPTIONS)** : OPTIONS 요청으로 먼저 서버 허용 여부 확인
- "GET" 은 대부분 Simple Request 방식 / "POST", "DELETE", "PUT", "PATCH" 는 Preflight Request 방식
- "POST" 메서드 호출 시 `Context-Type`이 `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain` 가 아니라 `application/json` 이면 Preflight Request 
- **브라우저가 Cross Origin 을 막는 이유** : 사용자가 은행 사이트에 로그인하고 이용하다가 다른 사이트로 이동할때 **사용자의 로그인 정보를 쿠키에 담아 이동**하게 되면 만약 이동한 사이트가 보안에 취약할 시 **사용자의 정보가 탈취될 위험**이 있음.

<GET 처리 예시>

```
axios.get("http://localhost:9100/api/test")

GET /api/test
Origin: http://localhost:4545

Access-Control-Allow-Origin // 서버에 이 응답만 있으면 CORS 통과
```

<DELETE 처리 예시>

```
axios.delete("http://localhost:9100/api/test")

OPTIONS /api/test
Origin: http://localhost:4545
Access-Control-Request-Method: DELETE

Access-Control-Allow-Origin
Access-Control-Allow-Methods
Access-Control-Allow-Headers // 서버에 이 응답이 있어야 통과

403
405
CORS error // 서버가 허용하지 않을 시 오류 발생
```

---

## 📗 VUE

### Optional Chaining
>Optional Chaining (`?.`) 은 왼쪽 값이 `null` or `undefined` 일때 더 이상 하위 속성에 접근하지 않고 `undefined` 로 멈추는 **읽기(조회) 연산자**

- API 응답이 서버로부터 오지 않았거나 (`data === null`), 중간 데이터 객체가 비어있을 때 **런타임 에러가 발생하는 것을 방지**한다. 
ex) `const name = allData.value?.user?.name` 
- `TypeError: Cannot read properties of undefined` 같은 오류 로그가 발생할 때 사용
- Optional Chaining 을 사용해서 런타임 에러를 방지하거나 가독성을 위해서 `null or undefined` 가 발생하면 안되는 **데이터 객체의 초기값을 미리 설정**

---

### Navigator.clipboard
>브라우저 객체인 `navigator` 에 포함된 비동기 클립보드 API

- 주로 Vue 라이브러리에서 사용자가 UI 아이콘을 통해 간단히 텍스트를 복사하는 기능을 구현하기 위해 사용
- HTTPS 환경에서만 동작, 사용자 이벤트를 통해 호출 가능, Promise 기반(async/await 필요)

---

### Object method
>Object(객체)를 **순회 가능한 형태로 바꿔주는** 메서드

- 객**체 데이터를 배열로 처리**함으로써 `map/filter/reduce/every/some` 같은 **함수형 배열 메서드 처리가 가능**

- 자바스크립트에서 Object(객체)란, 키(Key) -> 값(value)을 한 묶음으로 저장하는 자료구조

```
const form = reactive({
  title: "제목",
  date: "2026-03-01",
  content: "오늘은 광복절"
});

console.log(form.title)
console.log(form["content"])
```

#### Object.keys()
>객체 데이터의 키(key) 만 배열로 뽑아서 일괄 검사할 때 사용

```
const form = { title: "A", date: "2026-03-02", content: "" };

Object.keys(form);
// ["title", "date", "content"]
```

#### Object.values()
>객체 데이터의 값(values) 만 **배열로** 뽑아서 일괄 검사할 때 사용, 
실무에서는 프론트엔드에서 API 서버로 **데이터를 보낼려고 할 때 유효성 검사**를 하여 실패 시 상태창을 호출하거나 데이터 전송 기능 버튼을 비활성화를 하고자 할 때 사용

```
const form = { title: "A", date: "2026-03-02", content: "" };

Object.values(form);
// ["A", "2026-03-02", ""]
```

```
const isValid = computed(() => {
  return Object.values(form).every(v => v !== "" && v !== null && v !== undefined);
});
```

#### Object.entries()
>객체 데이터의 키(key) 와 값(values) 를 같이 **배열로** 뽑아서 활용할 때 사용

```
const user = { name: "Kim", age: 25 };

Object.entries(user);
// [["name","Kim"], ["age",25]]
```

```
<template>
  <ul>
    <li v-for="[key, value] in Object.entries(user)" :key="key">
      {{ key }}: {{ value }}
    </li>
  </ul>
</template>
```

---

### router-link, a 태그, router.push 차이점
>Vue 프로젝트에서 화면 이동(라우팅)을 할 때 화면 이동이라는 목적은 같지만 동작 방식은 완전히 다르다

- `<router-link>` : "Vue Router" 가 관리하는 **내부 페이지 이동용** (새로고침 없이 이동)
- `<a>` : 브라우저 기본 링크로 **외부 링크 이동용**
- `router.push()` : 함수 코드 내에서 처리 완료 후 이동용(로그인 후 이동, 저장 후 이동 등)

#### router-link
- 페이지 새로고침 없음
- `to` 에 path/params/query 를 포함 가능 **(동적 라우팅에 사용)**
- 페이지의 상단 메뉴, **상세 조회 페이지**에 사용

#### a 태그
- 주로 외부 사이트로 이동할 때 사용
- 페이지가 새로고침이 되기 때문에 내부 페이지 이동으로 사용하면 SPA의 장점이 저하될 수 있음

#### router.push()
- 컴포넌트내 함수 로직에서 데이터 전송 성공, 로그인 성공 등 이벤트가 발생 후 페이지를 이동할 때 사용
- 페이지 새로고침 없음
- router.replace 로 대체 가능 : push 히스토리에 쌓임(뒤로가기 가능), replace 히스토리를 덮어씀(뒤로가기 불가능)

---

### computed vs watch
>Vue3 에서 `computed` 와 `watch` 는 **반응형 데이터를 감시하는 점**은 비슷하지만 목적은 다르다

- `computed` : **데이터 상태값을 다시 계산해서 만들어 사용**하는 용도 (파생값)
- `watch` : **데이터 상태값이 변화하였을 때 어떠한 동작을 실행**하는 용도 (작용)

#### computed
- **콜백 함수를 사용**하고 **return 값이 존재**해야 함
- **캐싱됨** : **의존하는 값이 바뀌지 않으면 재계산하지 않는다**

- ex) 검색 필터링

```
import { ref, computed } from "vue";

const keyword = ref("");
const items = ref(["apple", "banana", "orange"]);

const filteredItems = computed(() => {
  const k = keyword.value.trim().toLowerCase();
  if (!k) return items.value;
  return items.value.filter(v => v.toLowerCase().includes(k));
});
```

#### watch
- 데이터 상태의 대한 결과 값이 아니라 동작을 결과로 처리

- ex) keyword 가 바뀔때 서버 검색 API 호출

```
import { ref, watch } from "vue";

const keyword = ref("");

watch(keyword, async (newVal, oldVal) => {
  if (!newVal.trim()) return;
  // 예: 서버 검색 호출
  // await fetchSearch(newVal);
  console.log("검색어 변경:", oldVal, "->", newVal);
});
```

---

### Proxy
>Proxy 는 "객체를 감시하고 가로채는 대리인" 으로 해석됨

>직관적으로 Vue3 라이브러리에서는 **데이터가 바뀌면 화면이 자동으로 바뀌는 것을 가능하게 해주는 기술**(반응성 시스템)으로 이해하면 됨

- ref, reactive, computed, watch 모두 proxy 시스템의 일환으로 사용
- 구조 분해 할당 시에는 반응성이 깨진다 
ex) `const { count } = state;` -> 값만 복사됨 (`toRefs` 사용시 반응성 유지가능)

```
import { reactive } from "vue";

const state = reactive({
  count: 0
});
```
에서 `state` 데이터 객체는 내부적으로 `new Proxy(원본객체, handler)` 으로 작동

- ex) `state.count++; `

1. Proxy 가 `set` 을 감지
2. Vue 가 count의 데이터 변화 인지
3. count를 사용하고 있는 컴포넌트 리랜더링

---

### Axios Response
>Vue3 라이브러리 환경에서 Axios + REST API 사용 시 
`const res = await axios.get,post('url')` 코드에서 res 의 응답 객체 정리

기본 구조
```
{
  data: {},        // 서버가 보낸 실제 데이터
  status: 200,     // HTTP 상태 코드
  statusText: 'OK',
  headers: {},
  config: {},
  request: {}
}

```

- **data : 서버에서 실제로 보내준 데이터**
```
data : {
  "resultCode": 0,
  "message": "success",
  "data": {
    "id": 1
  }
}
```

- **status : HTTP 상태 코드**
1. **200번대 코드**
- `200` : `request` 요청 성공
- `201` : `post request` 요청 성공
- `204` : 요청 데이터를 반환 했지만 데이터가 없음
2. **400번대 코드** (클라이언트 오류)
- `400` : 요청은 보냈지만 요청 **형식 오류나 필수값이 누락**
ex) 필수 파라미터 값 누락, 데이터 형식 오류, 요청 구조가 다름
- `401` : **인증이 필요**함 (로그인 필요)
ex) 헤더에 로그인 토큰 필요
- `403` : 인증은 되었지만 **접근 권한이 없음**
ex) 관리자 여부 확인
- `404` : **요청한 대상이 존재하지 않는다** (Not Found)
ex) 요청 URL 오타, 잘못된 파라미터값 입력(존재하지 않는 아이디), 백엔드 API서버에 해당 메서드가 없음,
**프론트엔드 Proxy 처리 오류(CORS)**
3. 500 번대 : 서버 오류

- try/catch 문으로 axios를 호출할때 **catch 는 HTTP 응답 오류 시에만 호출됨**
1. 네트워크 오류, 400번대 오류, 500번대 오류, CORS 오류 -> catch문 호출
2. API 서버 오류, resultCode === -1 -> catch문 호출 x

---

### DOM(Document Object Model)
>브라우저가 `HTML` 문서를 객체 형태로 표현한 구조 = **HTML 형식을 JavaScript 으로 조작 가능한 객체 구조**로 변환

<예시 코드>
```
<body>
  <div id="app">
    <h1>Hello</h1>
    <button>Click</button>
  </div>
</body>
```
```
<DOM Tree>
Document
 └─ body
     └─ div#app
         ├─ h1
         └─ button
```

```
Vue state 변경
      ↓
Virtual DOM 변경
      ↓
Diff 알고리즘
      ↓
Real DOM 업데이트
```

---

### Hook
>Vue 에서 **특정 시점에 실행되는 함수**

- ex) `setup()` , `OnMounted`, `OnUnMounted`

---

### Vue 생명주기
>어떤 시점에 어떤 코드를 실행해야 하는지 결정하는데 사용

```
컴포넌트 생성
→ 화면에 붙기 전
→ 화면에 붙음
→ 데이터 변경으로 다시 그림
→ 화면에서 제거됨
```

```
생성 → setup

붙기 전 → onBeforeMount

붙은 후 → onMounted

수정 전 → onBeforeUpdate

수정 후 → onUpdated

제거 전 → onBeforeUnmount

제거 후 → onUnmounted
```

---

### 동적 라우팅 url / name + params 방식
>Vue3 프로젝트 SPA 환경에서 `<router-link>` , `router.push()` 를 `url` 방식을 통해 동적 라우팅 하거나 `name + params` 방식을 통해 동적 라우팅 할 수 있다.

#### index.js

```
{
  path: "/vulnerInfo/detail/:id",
  name: "vulner_detail",
  component: loadComponent("vsoc/vulnerability/detail/VulnerabilityDetail"),
  props: true,
 },
```

#### url 방식
```
<router-link :to="`/vulnerInfo/detail/${item.id}`">
    {{ item.id }}
</router-link>
```

- 개인 프로젝트에서 많이 사용되는 동적 라우팅 방식
- 직접 `url` 을 입력하여 페이지를 이동할 경우 `props` 전달 오류가 발생할 경우가 있음
- 새로고침을 했을 경우에도 문제가 발생할 수 있음

#### name + params 방식
```
<router-link :to="{ name: 'vulner_detail' , params : { id: item.id } }">
    {{ item.id }}
</router-link>
```

```
// 함수 방식
const goList = () => {
  router.push({
    name: "source_detail",
    params: { sourceId: route.params.sourceId },
  })
}
```
- 실무에서는 배포를 염두한 상용 서비스 프로젝트가 많기 때문에 미리 라우팅에 대한 설정을 하고 
`name + params` 을 통한 동적 라우팅 방식을 채택함 

---

### Component
> `Component` : 화면을 역할 단위로 화면 + 동작 + 상태를 **재사용 가능한 UI 랜더링 단위**
ex ) Vue3 component : `template` + `script setup` + `style scoped` 
=> 하나의 `.vue` 파일

- 코드를 재사용 가능하게 한다. ( `button`, `input`, `modal`, `card`, `table` )
- 하나의 프로젝트를 기능별 분리하여 유지보수에 용이해진다.
- 기능별 개발로 협업에 유리해진다.
- **`script setup` 에 해당하는 기능을 분리하는 것은 
component(x) / 
로직 모듈 = composable(o) - 상태+함수 로직 , utility(o) - 단순한 함수 로직, api module(o) - API 서버 통신 분리**
- `import ComponentName/ModuleName from '../..'` : 
JavaScript ES Module 문법으로 컴포넌트/모듈을 import 하는 것

<composable 적용 예시 코드>

```
<script setup>
import { useIncidentForm } from "@/composables/useIncidentForm";

const {
  postData,
  isValid,
  addAction,
  removeAction,
  submitForm
} = useIncidentForm();
</script>
```

---


## 📘 JavaScript

### <span style="color: red;">Array Method</span>

#### map()
>원본 배열의 **각 요소를 하나씩 바꿔서 새로운 배열을 만드는** 메서드

- `map` 메서드를 호출한 후에도 원본 배열은 변하지 않는다.

<기본 형태>
```
array.map((item, index) => {
  return 바꿀값;
});

const numbers = [1, 2, 3];

const result = numbers.map((item) => {
  return item * 2;
});

console.log(result); // [2, 4, 6]
```

<객체 배열에서 원하는 속성만 출력>
```
const users = [
  { id: 1, name: "김철수" },
  { id: 2, name: "이영희" },
  { id: 3, name: "박민수" }
];

const names = users.map((item) => item.name);

console.log(names); // ["김철수", "이영희", "박민수"]
```
<데이터 가공>
```
const users = [
  { id: 1, name: "김철수", age: 20 },
  { id: 2, name: "이영희", age: 22 }
];

const result = users.map((item) => {
  return {
    userId: item.id,
    userName: item.name
  };
});

console.log(result);

[
  { userId: 1, userName: "김철수" },
  { userId: 2, userName: "이영희" }
]
```

<실무 예시 코드>
- 서버에서 받은 각 `item` 에 **기존 속성은 그대로 둔 상태**로 **속성 추가하여 새로운 배열**로 생성 

```
const list = [
  { id: 1, name: "A" },
  { id: 2, name: "B" }
];

const newList = list.map((item) => ({
  ...item,
  checked: false
}));


[
  { id: 1, name: "A", checked: false },
  { id: 2, name: "B", checked: false }
]
```

<실무 예시 코드 2>
- `axios.post` 를 통해 서버에 보낼 `payload` 만들기

```
const users = [
  { id: "a@test.com", name: "홍길동", role: 2 },
  { id: "b@test.com", name: "김철수", role: 4 }
];

const payload = {
  roleList: users.map((item) => ({
    id: item.id,
    name: item.name,
    vsocRole: item.role
  }))
};

console.log(payload);
```

#### every()
>배열의 모든 요소가 조건을 만족하면 `true` , 하나라도 만족하지 않으면 **즉시** `false` 반환

```
const arr = [2, 4, 6];
arr.every(n => n % 2 === 0); // true (전부 짝수)

const arr2 = [2, 3, 6];
arr2.every(n => n % 2 === 0); // false (3에서 바로 탈락)
```

- 주로 프론트엔드에서 입력값에 대한 유효성 검사를 할때 사용
- 사용 시 주의할 점 : 빈 배열은 항상 true

#### some()
>배열의 모든 요소 중 하나라도 만족하면 'true'

```
arr.some(v => v === "ERROR");
```

#### find()
>배열 중 조건을 만족하는 첫 요소 1개를 반환

```
const firstInvalid = arr.find(v => v === "");
```

#### filter()
>배열 중 조건을 만족하는 것만 추출해서 반환

```
const invalids = arr.filter(v => v == null || v === "");
```

#### splice()
>배열의 특정 위치에서 요소를 **삭제하거나 추가하거나 교체**하는 메서드

- 메서드 사용시 **원본 배열을 직접 바꾼다**

<기본 문법 사용>
```
array.splice(시작인덱스, 삭제할개수, 추가할값1, 추가할값2, ...)
```

<삭제 사용>
```
const arr = [10, 20, 30, 40];
arr.splice(1, 2);

console.log(arr); // [10, 40]
```

<추가 사용>
```
const arr = [10, 30, 40];
arr.splice(1, 0, 20);

console.log(arr); // [10, 20, 30, 40]
```

<교체 사용>
```
const arr = [10, 20, 30];
arr.splice(1, 1, 999);

console.log(arr); // [10, 999, 30]
```

#### reduce()
>배열의 요소들을 **하나씩 순회하면서 하나의 결과값 으로 누적**하는 메서드

<기본 문법 사용>
```
array.reduce((acc, cur) => {
  return 누적결과;
}, 초기값);
```

<합계 구하기>
```
const numbers = [1, 2, 3, 4];

const sum = numbers.reduce((acc, cur) => {
  return acc + cur;
}, 0);

console.log(sum); // 10
```

<최대값 구하기>
```
const numbers = [3, 7, 2, 9, 5];

const max = numbers.reduce((acc, cur) => {
  return acc > cur ? acc : cur;
}, numbers[0]);

console.log(max); // 9
```
<객체 배열의 총합 구하기>
```
const products = [
  { name: "A", price: 1000 },
  { name: "B", price: 2000 },
  { name: "C", price: 3000 }
];

const totalPrice = products.reduce((acc, cur) => {
  return acc + cur.price;
}, 0);

console.log(totalPrice); // 6000
```

<배열을 객체로 바꾸기>
```
const users = [
  { id: 1, name: "Kim" },
  { id: 2, name: "Lee" },
  { id: 3, name: "Park" }
];

const userMap = users.reduce((acc, cur) => {
  acc[cur.id] = cur.name;
  return acc;
}, {});

console.log(userMap);
// { 1: "Kim", 2: "Lee", 3: "Park" }
```

<실무 코드>
```
// 분석후 공격가능성/합계 데이터 상태값
const postSum = computed(() => {
  return [
    Number(postData.value.data.postAfElapsedTime),
    Number(postData.value.data.postAfTechnicalExpertise),
    Number(postData.value.data.postAfKnowledgeOfItem),
    Number(postData.value.data.postAfWindowOfOpportunity),
    Number(postData.value.data.postAfEquipment),
  ].reduce(( sum, value ) => sum + value, 0);
});

```

#### foreach()
>배열을 **하나씩 순회하면서 작업 수행**

```
const arr = [1, 2, 3];

arr.forEach(item => {
  console.log(item);
});
```

#### push(), pop(), shift()

- `push` : 배열 맨 뒤에 요소를 추가
- `pop` : 배열 맨 뒤에 요소를 하나 제거
- `shift` : 배열 첫 번째 요소를 하나 제거


---

### 스프레드 문법(...변수명)
>`...변수명` 은 스프레드 문법(spread syntax)로 **묶여 있는 값을 펼쳐서 꺼내는 문법**이다.

- 배열을 복사/합칠때 사용, 객체에 복사/속성을 추가 할때 사용, 함수 인자로 펼칠때 주로 사용

<배열을 합칠때>
- `concat()` 메서드 처럼 사용

```
const arr1 = [1, 2];
const arr2 = [3, 4];

const result = [...arr1, ...arr2];
console.log(result); // [1, 2, 3, 4]
```

<객체에 속성 추가할때>
```
const user = {
  name: "홍길동",
  age: 20
};

const newUser = {
  ...user,
  checked: false
};

console.log(newUser);
// { name: "홍길동", age: 20, checked: false }
```

<객체 값 덮어쓰기>
- 뒤에 쓴 값이 우선됨

```
const user = {
  name: "홍길동",
  age: 20
};

const newUser = {
  ...user,
  age: 30
};

console.log(newUser);
// { name: "홍길동", age: 30 }
```

<함수 인자에서 사용>

```
const nums = [3, 7, 2];
const max = Math.max(...nums);

console.log(max); // 7
```

<실무 예시 코드>
- `pinia` 의 `app.js` 파일에서 store 상태 갱신 할때 사용

```
setLoadingInfo(info) {
  this.loadingInfo = { ...info };
}
```

- 업데이트 페이지에서 기존 데이터 가져올때 사용
```
// Source 수정에 필요한 Source 상세조회 API 호출
const getfetch_source_detail = async() => {
  try {
    const sourceId = route.params.sourceId;
    const res = await axios.get(`/api/vsoc/ext-vulns/source/${sourceId}`);
    getData.value = res.data.data.extVulnsSource;

    postData.value = { id: Number(route.params.sourceId), ...getData.value }

  } catch (error) {
    console.error(error);
    alert("데이터 불러오기 실패");
  }
}
```

---