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



## 📗 VUE

### Optional Chaining
>Optional Chaining (`?.`) 은 왼쪽 값이 `null` or `undefined` 일때 더 이상 하위 속성에 접근하지 않고 `undefined` 로 멈추는 **읽기(조회) 연산자**

- API 응답이 서버로부터 오지 않았거나 (`data === null`), 중간 데이터 객체가 비어있을 때 **런타임 에러가 발생하는 것을 방지**한다. 
ex) `const name = allData.value?.user?.name` 
- `TypeError: Cannot read properties of undefined` 같은 오류 로그가 발생할 때 사용
- Optional Chaining 을 사용해서 런타임 에러를 방지하거나 가독성을 위해서 `null or undefined` 가 발생하면 안되는 **데이터 객체의 초기값을 미리 설정**

### Navigator.clipboard
>브라우저 객체인 `navigator` 에 포함된 비동기 클립보드 API

- 주로 Vue 라이브러리에서 사용자가 UI 아이콘을 통해 간단히 텍스트를 복사하는 기능을 구현하기 위해 사용
- HTTPS 환경에서만 동작, 사용자 이벤트를 통해 호출 가능, Promise 기반(async/await 필요)

### Object method
>Object(객체)를 **순회 가능한 형태로 바꿔주는** 메서드

- 객체 데이터를 배열로 처리함으로써 `map/filter/reduce/every/some` 같은 함수형 메서드 처리가 가능

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

### Proxy
>Proxy 는 "객체를 감시하고 가로채는 대리인" 으로 해석됨

>직관적으로 Vue3 라이브러리에서는 **데이터가 바뀌면 화면이 자동으로 바뀌는 것을 가능하게 해주는 기술**(반응성 시스템)으로 이해하면 됨

- ref, reactive, computed, watch 모두 proxy 시스템의 일환으로 사용
- 구조 분해 할당 시에는 반응성이 깨진다 ex) `const { count } = state;` -> 값만 복사됨 (`toRefs` 사용시 반응성 유지가능)

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


### Axios Response
>Vue3 라이브러리 환경에서 Axios + REST API 사용 시 `const res = await axios.get,post('url')` 코드에서 res 의 응답 객체 정리

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
{
  "resultCode": 0,
  "message": "success",
  "data": {
    "id": 1
  }
}
```

- **status : HTTP 상태 코드** 
1. **200: 요청 성공**, **201: POST 성공**, 204: 반환했지만 데이터 없음
2. 400 : 잘못된 요청, 401 : 인증 필요, 403: 접근 권한 없음, **404: API 없음**
3. 500 번대 : 서버 오류

- try/catch 문으로 axios를 호출할때 **catch 는 HTTP 응답 오류 시에만 호출됨**
1. 네트워크 오류, 400번대 오류, 500번대 오류, CORS 오류 -> catch문 호출
2. API 서버 오류, resultCode === -1 -> catch문 호출 x

## 📘 JavaScript

### Array Method

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