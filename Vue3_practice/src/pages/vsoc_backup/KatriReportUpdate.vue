<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>KATRI 신고</span>
      <span>사고 신고서 갱신</span>
    </section>
    <section class="page">
      <article class="table">
        <p class="guide">
          * 표시는 필수 입력 항목입니다.
        </p>
        <strong>사고 신고</strong>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>신고 번호</th>
              <td>{{ allData.id }}</td>
              <th>갱신 번호</th>
              <td>{{ allData?.hisList?.[0].renewalId }}</td>
              <th>신고 접수일</th>
              <td>{{ getDate(allData.incidentDate) }}</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>사고 신고자 기본 정보</strong>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>제조사</th>
              <td>{{ allData.manufacturer }}</td>
              <th>담당자</th>
              <td>{{ allData.name }}</td>
            </tr>
            <tr>
              <th>전자우편</th>
              <td>{{ allData.email }}</td>
              <th>연락처</th>
              <td>{{ allData.phone }}</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>갱신 이력</strong>
        <table>
          <tbody>
            <tr v-for="(item) in allData.hisList.slice(0,5)" v-if="allData?.hisList && allData.hisList.length > 0">
              <th>갱신 번호</th>
              <td>{{ item.renewalId }}</td>
              <th>갱신 등록일</th>
              <td>{{ getDate(item.createdAt) }}</td>
            </tr>
            <tr v-else>
              <th>갱신 이력이 없습니다.</th>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>사고 접수 내역</strong>
        <table>
          <colgroup>
            <col width="200px" />
            <col width="280px" />
            <col width="auto" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th rowspan="3">사고 일시</th>
              <th class="required">사이버보안 사고 발생 일시</th>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <input 
                      type="text" 
                      v-model="getDateTime.accidentDate" 
                      disabled />
                    <label></label>
                  </div>
                  <div class="input clock">
                    <input 
                      type="text" 
                      v-model="getDateTime.accidentTime" 
                      disabled />
                    <label></label>
                  </div>
                </div>
              </td>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.accidentDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.accidentTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      time-picker
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">사이버보안 사고 감지 일시</th>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <input 
                      type="text" 
                      v-model="getDateTime.detectDate" 
                      disabled />
                    <label></label>
                  </div>
                  <div class="input clock">
                    <input 
                      type="text" 
                      v-model="getDateTime.detectTime" 
                      disabled />
                    <label></label>
                  </div>
                </div>
              </td>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.detectDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.detectTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      time-picker
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">최초 사이버보안 사고 신고 일시</th>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <input 
                      type="text" 
                      v-model="getDateTime.incidentDate" 
                      disabled />
                    <label></label>
                  </div>
                  <div class="input clock">
                    <input 
                      type="text" 
                      v-model="getDateTime.incidentTime" 
                      disabled />
                    <label></label>
                  </div>
                </div>
              </td>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.incidentDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.incidentTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      time-picker
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th rowspan="7">사고유형 및 정도</th>
              <th>안전사고</th>
              <td>
                <div class="group">
                  <div class="input">
                    <input 
                      type="text" 
                      v-model="allData.safetyAccDesc" 
                      disabled />
                  </div>
                  <div class="checkbox">
                    <input 
                    type="checkbox" 
                    id="safetyAccCheckbox" 
                    v-model="getCheckboxNone.safetyAccNone" 
                    disabled />
                    <label for="safetyAccCheckbox">해당사항 없음</label>
                  </div>
                </div>
              </td>
              <td>
                <div class="group">
                  <div class="input">
                    <input 
                      type="text" 
                      placeholder="예) 사망자0명, 중상자2명, 경상자1명" 
                      v-model="postData.safetyAccDesc" 
                      :disabled="inputCheckboxNone.safetyAccNone"/>
                  </div>
                  <div class="checkbox">
                    <input 
                      type="checkbox" 
                      id="inputSafetyAccCheckbox" 
                      v-model="inputCheckboxNone.safetyAccNone" />
                    <label for="inputSafetyAccCheckbox">해당사항 없음</label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>개인정보사고</th>
              <td>
                <div class="group">
                  <div class="input">
                    <input 
                      type="text" 
                      v-model="allData.privacyAccDesc" 
                      disabled />
                  </div>
                  <div class="checkbox">
                    <input 
                      type="checkbox" 
                      id="privacyAccCheckbox" 
                      v-model="getCheckboxNone.privacyAccNone" 
                      disabled />
                    <label for="privacyAccCheckbox">해당사항 없음</label>
                  </div>
                </div>
              </td>
              <td>
                <div class="group">
                  <div class="input">
                    <input 
                      type="text" 
                      placeholder="예) 주민번호 유출 5만 건 / 즐겨찾기 및 위치정보 유출 13건"
                      v-model="postData.privacyAccDesc"
                      :disabled="inputCheckboxNone.privacyAccNone" 
                      />
                  </div>
                  <div class="checkbox">
                    <input 
                      type="checkbox" 
                      id="inputPrivacyAccCheckbox" 
                      v-model="inputCheckboxNone.privacyAccNone" />
                    <label for="inputPrivacyAccCheckbox">해당사항 없음</label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>금융피해사고</th>
              <td>
                <div class="group">
                  <div class="input">
                    <input 
                      type="text" 
                      v-model="allData.financeAccDesc" 
                      disabled />
                  </div>
                  <div class="checkbox">
                    <input 
                    type="checkbox" 
                    id="financeAccCheckbox" 
                    v-model="getCheckboxNone.financeAccNone" 
                    disabled />
                    <label for="financeAccCheckbox">해당사항 없음</label>
                  </div>
                </div>
              </td>
              <td>
                <div class="group">
                  <div class="input">
                    <input 
                      type="text" 
                      placeholder="예) 결제 정보 3,500던 고용, 피해 약 1.2억 원" 
                      v-model="postData.financeAccDesc"
                      :disabled="inputCheckboxNone.financeAccNone" />
                  </div>
                  <div class="checkbox">
                    <input 
                      type="checkbox" 
                      id="inputFinanceAccCheckbox" 
                      v-model="inputCheckboxNone.financeAccNone" />
                    <label for="inputFinanceAccCheckbox">해당사항 없음</label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>차량운영피해사고</th>
              <td>
                <div class="group">
                  <div class="input">
                    <input 
                      type="text" 
                      v-model="allData.vehOpAccDesc" 
                      disabled />
                  </div>
                  <div class="checkbox">
                    <input 
                      type="checkbox" 
                      id="vehOpAccCheckbox" 
                      v-model="getCheckboxNone.vehOpAccNone" 
                      disabled />
                    <label for="vehOpAccCheckbox">해당사항 없음</label>
                  </div>
                </div>
              </td>
              <td>
                <div class="group">
                  <div class="input">
                    <input 
                      type="text" 
                      placeholder="예) 차량 운영 불가 2만대, 차량 부분 기능 장애 1만대" 
                      v-model="postData.vehOpAccDesc"
                      :disabled="inputCheckboxNone.vehOpAccNone" />
                  </div>
                  <div class="checkbox">
                    <input 
                      type="checkbox" 
                      id="inputVehOpsAccCheckbox" 
                      v-model="inputCheckboxNone.vehOpAccNone" />
                    <label for="inputVehOpsAccCheckbox">해당사항 없음</label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>기타 (차량 관련 시스템 피해 사고)</th>
              <td>
                <div class="group">
                  <div class="input">
                    <input 
                      type="text" 
                      v-model="allData.etcAccDesc" 
                      disabled />
                  </div>
                  <div class="checkbox">
                    <input 
                      type="checkbox" 
                      id="etcAccCheckbox" 
                      v-model="getCheckboxNone.etcAccNone" 
                      disabled />
                    <label for="etcAccCheckbox">해당사항 없음</label>
                  </div>
                </div>
              </td>
              <td>
                <div class="group">
                  <div class="input">
                    <input 
                      type="text" 
                      placeholder="예) 차량 교통 혼잡고 안내 서비스 장애 10만대 7시간" 
                      v-model="postData.etcAccDesc" 
                      :disabled="inputCheckboxNone.etcAccNone" />
                  </div>
                  <div class="checkbox">
                    <input 
                      type="checkbox" 
                      id="inputEtcAccCheckbox" 
                      v-model="inputCheckboxNone.etcAccNone" />
                    <label for="inputEtcAccCheckbox">해당사항 없음</label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th class="required">정보통신망법 침해사고 해당여부</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="parsingIsnetworklawviol" 
                  disabled />
              </td>
              <td class="select">
                <select v-model.number="postData.isNetworkLawViol" required>
                  <option disabled value="">선택</option>
                  <option value="1">Y</option>
                  <option value="0">N</option>
                </select>
              </td>
            </tr>
            <tr>
              <th class="required">미디어 노출 여부 (링크 or 정보)</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.mediaExposureInfo" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) 없음" 
                  v-model="postData.mediaExposureInfo" />
              </td>
            </tr>
            <tr>
              <th rowspan="5">피해 시스템</th>
              <th class="required">차종</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.vehType" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) X차종 (차종)" 
                  v-model="postData.vehType" />
              </td>
            </tr>
            <tr>
              <th class="required">연식</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.vehYear" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) 2024년형 (연식 정보)" 
                  v-model="postData.vehYear" />
              </td>
            </tr>
            <tr>
              <th class="required">부품/시스템</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.partSysNm" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) AVN22, AVN23 (부품/시스템 명)" 
                  v-model="postData.partSysNm" />
              </td>
            </tr>
            <tr>
              <th class="required">부품 모델명/모델번호</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.partModelNm" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) AVN22 (부품 모델명 or 모델번호)" 
                  v-model="postData.partModelNm" />
              </td>
            </tr>
            <tr>
              <th class="required">(차량 외부)서비스 시스템</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.extSys" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) 교통 정보 시스템" 
                  v-model="postData.extSys" />
              </td>
            </tr>
            <tr>
              <th rowspan="3">피해 범위</th>
              <th class="required">(식별된) 피해 차량 대수</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.dmgVehCnt" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) 15대" 
                  v-model="postData.dmgVehCnt" />
              </td>
            </tr>
            <tr>
              <th class="required">(식별된) 피해 사람 수</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.dmgPrsnCnt" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) 0명" 
                  v-model="postData.dmgPrsnCnt" />
              </td>
            </tr>
            <tr>
              <th class="required">(식별된) 피해 발생 시간(종료,계속)</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.dmgDurHour" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) 7시간 (종료)" 
                  v-model="postData.dmgDurHour" />
              </td>
            </tr>
            <tr>
              <th rowspan="2">잠재적 피해 범위</th>
              <th class="required">잠재 피해 대상 차량 대수 (취약 차량)</th>
              <td class="input">
                <input 
                  type="text"
                  v-model="allData.potentialVehDesc" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) X차종 2022년형 12만대, Y차종 2023년형 21만대" 
                  v-model="postData.potentialVehDesc" />
              </td>
            </tr>
            <tr>
              <th class="required">잠재 피해 대상 사람 수</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.potentialPrsnCnt" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="예) 0명" 
                  v-model="postData.potentialPrsnCnt" />
              </td>
            </tr>
            <tr>
              <th rowspan="1" class="required">조치계획(안) 제출 일시</th>
              <td colspan="1">
                <div class="input">
                  <input 
                    type="text" 
                    v-model="allData.planSubmitDate" 
                    disabled />
                </div>
              </td>
              <td colspan="1">
                <div class="input">
                  <input 
                    type="text" 
                    v-model="allData.planSubmitDesc" 
                    disabled />
                </div>
              </td>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.planDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.planTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      time-picker
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input">
                    <input 
                      type="text" 
                      placeholder="예) 1차 사고 분석 결과 및 향후 조치 계획 보고" 
                      v-model="postData.planSubmitDesc" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th rowspan="1" class="required">조치 완료 목표 일시</th>
              <td colspan="1">
                <div class="input">
                  <input 
                    type="text" 
                    v-model="allData.targetCompleteDate" 
                    disabled />
                </div>
              </td>
              <td colspan="1">
                <div class="input">
                  <input 
                    type="text" 
                    v-model="allData.targetCompleteDesc" 
                    disabled />
                </div>
              </td>
              <td>
                <div class="group">
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.targetDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.targetTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      time-picker
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input">
                    <input 
                      type="text" 
                      placeholder="예) 1차 사고 분석 결과 및 향후 조치 계획 보고" 
                      v-model="postData.targetCompleteDesc" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th colspan="2" class="required">신고 내용</th>
              <td class="textarea">
                <textarea disabled>{{ allData.incidentReportContent }}</textarea>
              </td>
              <td class="textarea">
                <textarea 
                  placeholder="내용을 간단하게 입력하세요" 
                  v-model="postData.incidentReportContent"></textarea>
              </td>
            </tr>
            <tr>
              <th colspan="2">파일 첨부</th>
              <td class="group" v-for="item in incidnetReceiptFile?.slice(0,3)">
                파일 ID : {{ item.id }} / 파일 설명 : {{ item.fileCategoryDescription }}
              </td>
              <td class="file">
                <form @submit.prevent="postfetch_incident_receipt_file">
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="incidnetReceiptData.fileCategory" readonly>
                      <label>파일 선택
                        <input type="file" @change="onReceiptFileChange" />
                      </label>
                    </div>
                    <div class="button">
                      <button type="submit">업로드</button>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>갱신 내역</strong>
        <table>
          <colgroup>
            <col width="200px" />
            <col width="280px" />
            <col width="auto" />
            <col width="auto" />
          </colgroup>
          <tbody v-if="allData.renewal"> <!-- renewal 값이 있을 때 -->
            <tr>
              <th colspan="2" class="required">공격자 정보</th>
              <td class="textarea">
                <textarea disabled>{{ allData.renewal.attackerInfo }}</textarea>
              </td>
              <td class="textarea">
                <textarea 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.attackerInfo"></textarea>
              </td>
            </tr>
            <tr>
              <th rowspan="1">공격 대상 분석</th>
              <th class="required">보안 특성/공격 유형</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.renewal.attackTargetType" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.attackTargetType" />
              </td>
            </tr>
            <tr>
              <th rowspan="1">피해 분석</th>
              <th class="required">공격 경로</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.renewal.attackPath" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.attackPath" />
              </td>
            </tr>
            <tr>
              <th rowspan="7">공격 분석</th>
              <th class="required">기존 보안 방안 기술</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.renewal.existSecMeasure" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.existSecMeasure" />
              </td>
            </tr>
            <tr>
              <th class="required">금번 사고 취약점 원인 분석</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.renewal.causeAnalysis" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.causeAnalysis" />
              </td>
            </tr>
            <tr>
              <th class="required">금번 사고 공격 현실성/난이도 분석</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.renewal.attackDifficulty" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.attackDifficulty" />
              </td>
            </tr>
            <tr>
              <th class="required">대응/조치 후 예상 난이도 분석</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.renewal.postDifficulty" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.postDifficulty" />
              </td>
            </tr>
            <tr>
              <th class="required">관련 취약점 정보</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.renewal.vulnInfo" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.vulnInfo" />
              </td>
            </tr>
            <tr>
              <th class="required">관련 취약점 위험도</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.renewal.vulnRiskLvl" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.vulnRiskLvl" />
              </td>
            </tr>
            <tr>
              <th class="required">기존 평가 위험도</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.renewal.existRiskLvl" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.existRiskLvl" />
              </td>
            </tr>
            <tr>
              <th rowspan="2">위험도 분석</th>
              <th class="required">금번 사고 위험도</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.renewal.currRiskLvl" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.currRiskLvl" />
              </td>
            </tr>
            <tr>
              <th class="required">대응/조치 후 위험도</th>
              <td class="input">
                <input 
                  type="text" 
                  v-model="allData.renewal.postRiskLvl" 
                  disabled />
              </td>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.postRiskLvl" />
              </td>
            </tr>
            <tr>
              <th colspan="2">대응/조치 계획</th>
              <td colspan="2">
                <table>
                  <thead>
                    <tr>
                      <th>대응/조치 항목</th>
                      <th>대응/조치 계획 일정</th>
                      <th>대응/조치 내용</th>
                      <th>대응/조치 현황</th>
                      <th>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in allData.renewal.renewalAction"
                        v-if="allData.renewal.renewalAction && allData.renewal.renewalAction.length > 0">
                      <td>{{ item.actionItem }}</td>
                      <td>{{ getDate(item.actionPlanDate) }}</td>
                      <td>{{ item.actionContent }}</td>
                      <td>{{ item.actionStatus }}</td>
                      <td class="button">
                        <button class="red line">-</button>
                      </td>
                    </tr>
                    <tr v-else>
                      <td colspan="5">내역이 없습니다.</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <th colspan="2" class="required">대응/조치 추가</th>
              <td colspan="2">
                <div class="group">
                  <div class="input">
                    <input type="text" placeholder="대응/조치 항목을 입력하세요" v-model="postData.renewal.renewalAction[0].actionItem" />
                  </div>
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.actionPlanDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.actionPlanTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      time-picker
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input">
                    <input 
                      type="text" 
                      placeholder="대응/조치 내용을 입력하세요" 
                      v-model="postData.renewal.renewalAction[0].actionContent" />
                  </div>
                  <div class="select">
                    <select v-model="postData.renewal.renewalAction[0].actionStatus">
                      <option value="">선택</option>
                      <option value="완료">완료</option>
                      <option value="진행 중">진행 중</option>
                    </select>
                  </div>
                  <div class="button">
                    <button>+</button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th colspan="2">파일 첨부</th>
              <td class="group" v-for="item in incidnetRenewalFile?.slice(0,3)">
                파일 ID : {{ item.id }} / 파일 설명 : {{ item.fileCategoryDescription }}
              </td>
              <td class="file">
                <form @submit.prevent="postfetch_incident_renewal_file">
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="incidentRenewalData.fileCategory" readonly>
                      <label>파일 선택
                        <input type="file" @change="onRenewalFileChange" />
                      </label>
                    </div>
                    <div class="button">
                      <button type="submit">업로드</button>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
          </tbody>
          <tbody v-else> <!-- renewal 값이 없을때 -->
            <tr>
              <th colspan="2" class="required">공격자 정보</th>
              <td class="textarea" colspan="5">
                <textarea 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.attackerInfo"></textarea>
              </td>
            </tr>
            <tr>
              <th rowspan="1">공격 대상 분석</th>
              <th class="required">보안 특성/공격 유형</th>
              <td class="input" colspan="5">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.attackTargetType" />
              </td>
            </tr>
            <tr>
              <th rowspan="1">피해 분석</th>
              <th class="required">공격 경로</th>
              <td class="input" colspan="5">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.attackPath" />
              </td>
            </tr>
            <tr>
              <th rowspan="7">공격 분석</th>
              <th class="required">기존 보안 방안 기술</th>
              <td class="input" colspan="5">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.existSecMeasure" />
              </td>
            </tr>
            <tr>
              <th class="required">금번 사고 취약점 원인 분석</th>
              <td class="input" colspan="5">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.causeAnalysis" />
              </td>
            </tr>
            <tr>
              <th class="required">금번 사고 공격 현실성/난이도 분석</th>
              <td class="input" colspan="5">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.attackDifficulty" />
              </td>
            </tr>
            <tr>
              <th class="required">대응/조치 후 예상 난이도 분석</th>
              <td class="input" colspan="5">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.postDifficulty" />
              </td>
            </tr>
            <tr>
              <th class="required">관련 취약점 정보</th>
              <td class="input" colspan="5">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.vulnInfo" />
              </td>
            </tr>
            <tr>
              <th class="required">관련 취약점 위험도</th>
              <td class="input" colspan="5">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.vulnRiskLvl" />
              </td>
            </tr>
            <tr>
              <th class="required">기존 평가 위험도</th>
              <td class="input" colspan="5">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.existRiskLvl" />
              </td>
            </tr>
            <tr>
              <th rowspan="2">위험도 분석</th>
              <th class="required">금번 사고 위험도</th>
              <td class="input" colspan="5">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.currRiskLvl" />
              </td>
            </tr>
            <tr>
              <th class="required">대응/조치 후 위험도</th>
              <td class="input" colspan="5">
                <input 
                  type="text" 
                  placeholder="내용을 입력하세요" 
                  v-model="postData.renewal.postRiskLvl" />
              </td>
            </tr>
            <tr>
              <th colspan="2">대응/조치 계획</th>
              <td colspan="5">
                <table>
                  <thead>
                    <tr>
                      <th>대응/조치 항목</th>
                      <th>대응/조치 계획 일정</th>
                      <th>대응/조치 내용</th>
                      <th>대응/조치 현황</th>
                      <th>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      v-for="item in allData?.renewal?.renewalAction"
                      v-if="allData?.renewal?.renewalAction && allData?.renewal?.renewalAction.length > 0">
                      <td>{{ item.actionItem }}</td>
                      <td>{{ getDate(item.actionPlanDate) }}</td>
                      <td>{{ item.actionContent }}</td>
                      <td>{{ item.actionStatus }}</td>
                      <td class="button">
                        <button class="red line">-</button>
                      </td>
                    </tr>
                    <tr v-else>
                      <td colspan="4">내역이 없습니다.</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <th colspan="2" class="required">대응/조치 추가</th>
              <td colspan="5">
                <div class="group">
                  <div class="input">
                    <input 
                      type="text" 
                      placeholder="대응/조치 항목을 입력하세요" 
                      v-model="postData.renewal.renewalAction[0].actionItem" />
                  </div>
                  <div class="input calendar">
                    <Datepicker
                      v-model="inputDateTime.actionPlanDate"
                      format="yyyy-MM-dd"
                      model-type="format"
                      :enable-time-picker="false"
                      :clearable="false"
                      :hideInputIcon="true"
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input clock">
                    <Datepicker
                      v-model="inputDateTime.actionPlanTime"
                      format="HH:mm"
                      model-type="format"
                      :clearable="false"
                      :hideInputIcon="true"
                      time-picker
                      locale="ko"></Datepicker>
                    <label></label>
                  </div>
                  <div class="input">
                    <input 
                      type="text" 
                      placeholder="대응/조치 내용을 입력하세요" 
                      v-model="postData.renewal.renewalAction[0].actionContent" />
                  </div>
                  <div class="select">
                    <select v-model="postData.renewal.renewalAction[0].actionStatus">
                      <option value="">선택</option>
                      <option value="완료">완료</option>
                      <option value="진행 중">진행 중</option>
                    </select>
                  </div>
                  <div class="button">
                    <button>+</button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th colspan="2">파일 첨부</th>
              <td colspan="2">-</td>
              <td class="file" colspan="3">
                <form @submit.prevent="postfetch_incident_renewal_file">
                  <div class="group">
                    <div class="input">
                      <input type="text" placeholder="업로드할 파일을 선택하세요" :value="incidentRenewalData.fileCategory" readonly>
                      <label>파일 선택
                        <input type="file" @change="onRenewalFileChange" />
                      </label>
                    </div>
                    <div class="button">
                      <button type="submit">업로드</button>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="group button">
        <button class="line" @click="router.push({ name: 'katri_management' })">목록</button>
        <button @click="openUpdateConfirm" :disabled="!isAllInput">갱신 등록</button>
      </article>

      <!-- modal -->
      <VsocModal />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getDate } from '@/common/common';
import { useAppStore } from '@/store/app';
import axios from 'axios';
import VsocModal from '../../modal/VsocModal.vue';
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const route = useRoute();
const router = useRouter();
const store = useAppStore();

// KATRI 사고 신고서 상세 조회 전체 데이터 상태값
const allData = ref({
  renewal: {
    attackerInfo: "",
    attackTargetType: "",
    attackPath: "",
    existSecMeasure: "",
    causeAnalysis: "",
    attackDifficulty: "",
    postDifficulty: "",
    vulnInfo: "",
    vulnRiskLvl: "",
    existRiskLvl: "",
    currRiskLvl: "",
    postRiskLvl: "",
  }
});

// KATRI 사고 신고서 상세 조회 날짜/시간 따로 받는 데이터 상태값
const getDateTime = ref({
  accidentDate: "",
  accidentTime: "",
  detectDate: "",
  detectTime: "",
  incidentDate: "",
  incidentTime: "",
  planDate: "",
  planTime: "",
  targetDate: "",
  targetTime: "",
})

// KATRI 사고 신고서 상세 조회 해당사항 없음 체크박스 상태값
const getCheckboxNone = ref({
  safetyAccNone: false,
  privacyAccNone: false,
  financeAccNone: false,
  vehOpAccNone: false,
  etcAccNone: false,
})

// KATRI 사고 신고서 갱신 전체 데이터 상태값
const postData = ref({  
  id: Number(route.params.id),
  status: "",
  manufacturer: "",
  name: "",
  email: "",
  phone: "",
  accidentDate: "",
  detectDate: "",
  incidentDate: "",
  safetyAccDesc: "",
  privacyAccDesc: "",
  financeAccDesc: "",
  vehOpAccDesc: "",
  etcAccDesc: "",
  isNetworkLawViol: 0,
  mediaExposureInfo: "",
  vehType: "",
  vehYear: "",
  partSysNm: "",
  partModelNm: "",
  extSys: "",
  dmgVehCnt: "",
  dmgPrsnCnt: "",
  dmgDurHour: "",
  potentialVehDesc: "",
  potentialPrsnCnt: "",
  planSubmitDesc: "",
  planSubmitDate: "",
  targetCompleteDesc: "",
  targetCompleteDate: "",
  incidentReportContent: "",
  renewal: {
    attackerInfo: "",
    attackTargetType: "",
    attackPath: "",
    existSecMeasure: "",
    causeAnalysis: "",
    attackDifficulty: "",
    postDifficulty: "",
    vulnInfo: "",
    vulnRiskLvl: "",
    existRiskLvl: "",
    currRiskLvl: "",
    postRiskLvl: "",
    renewalAction: [
      {
        actionItem: "",
        actionPlanDate: "",
        actionContent: "",
        actionStatus: "",
      },
    ],
  },
  fileAction: {
    fileType: "INCIDENT",
    fileIdList: [],
    deleteFileIdList: null,
  }
})

// 사용자가 갱신할 때 날짜/시간 따로 입력하는 데이터 상태값
const inputDateTime = ref({
  accidentDate: "",
  accidentTime: "",
  detectDate: "",
  detectTime: "",
  incidentDate: "",
  incidentTime: "",
  planDate: "",
  planTime: "",
  targetDate: "",
  targetTime: "",
  actionPlanDate: "",
  actionPlanTime: "",
})

// 사용자가 갱신할 때 입력하는 해당사항 없음 체크박스 상태값
const inputCheckboxNone = ref({
  safetyAccNone: false,
  privacyAccNone: false,
  financeAccNone: false,
  vehOpAccNone: false,
  etcAccNone: false,
})

// 해당사항 없음 체크박스 활성화 시 해당 데이터를 NULL로 처리
const checkboxMapping = {
  safetyAccDesc: "safetyAccNone",
  privacyAccDesc: "privacyAccNone",
  financeAccDesc: "financeAccNone",
  vehOpAccDesc: "vehOpAccNone",
  etcAccDesc: "etcAccNone",
}

// KATRI 사고 신고서 POST 필수 요소 (안전사고, 개인정보사고, 금융피해사고, 차량운영피해사고, 기타 항목 제외)
const requireData = [
  "manufacturer",
  "status",
  "name",
  "email",
  "phone",
  "accidentDate",
  "detectDate",
  "incidentDate",
  "isNetworkLawViol",
  "mediaExposureInfo",
  "vehType",
  "vehYear",
  "partSysNm",
  "partModelNm",
  "extSys",
  "dmgVehCnt",
  "dmgPrsnCnt",
  "dmgDurHour",
  "potentialVehDesc",
  "potentialPrsnCnt",
  "planSubmitDesc",
  "planSubmitDate",
  "targetCompleteDesc",
  "targetCompleteDate",
  "incidentReportContent",
];

// 사용자가 필수 요소를 입력하지 않으면 갱신 등록 버튼 비활성화 
const isAllInput = computed(() => {
  postData.value.accidentDate = `${inputDateTime.value.accidentDate} ${inputDateTime.value.accidentTime}`;
  postData.value.detectDate = `${inputDateTime.value.detectDate} ${inputDateTime.value.detectTime}`;
  postData.value.incidentDate = `${inputDateTime.value.incidentDate} ${inputDateTime.value.incidentTime}`;
  postData.value.planSubmitDate = `${inputDateTime.value.planDate} ${inputDateTime.value.planTime}`;
  postData.value.targetCompleteDate = `${inputDateTime.value.targetDate} ${inputDateTime.value.targetTime}`;
  postData.value.renewal.renewalAction[0].actionPlanDate = `${inputDateTime.value.actionPlanDate} ${inputDateTime.value.actionPlanTime}`;

  return requireData.every((key) => {
    const value = postData.value[key];
    return value !== null && value !== undefined && value !== "";
  })
})

// 정보통신망법 침해사고 해당여부 1 -> Y / 0 -> N paring 처리
const parsingIsnetworklawviol = computed(() => {
      if(allData?.value.isNetworkLawViol === 1) return "Y";
      if(allData?.value.isNetworkLawViol === 0) return "N";
      return "";
});

// Date 데이터에서 시간 부분만 파싱
const parseTime = (dateTimeString) => {
  const time = dateTimeString.slice(11,16);

  return `${time}`;
}

watch(
  () => inputCheckboxNone.value,
  (flags) => {
    for(const [textKey, checkKey] of Object.entries(checkboxMapping)) {
      if(flags[checkKey]) {
        postData.value[textKey] = null;
      } else if (postData.value[textKey] === null) {
        postData.value[textKey] = "";
      }
    }
  },
  { deep: true }
)

// KATRI 신고 상세 조회 API 호출
const getfetch_katri_detail = async() => {
  try {
    const incidentId = Number(route.params.id);
    const res = await axios.get(`/api/vsoc/incident/${incidentId}/GENERAL`);
    allData.value = res.data.data.incident;

    postData.value.manufacturer = allData.value?.manufacturer
    postData.value.name = allData.value?.name
    postData.value.email = allData.value?.email
    postData.value.phone = allData.value?.phone
    postData.value.status = allData.value?.status
    
    // 체크박스
    if(allData.value.safetyAccDesc === null) {
      allData.value.safetyAccDesc = "해당사항 없음";
      getCheckboxNone.value.safetyAccNone = true;
      postData.value.safetyAccDesc = "해당사항 없음";
      inputCheckboxNone.value.safetyAccNone = true;
    } else {
      postData.value.safetyAccDesc = allData.value?.safetyAccDesc
    }

    if(allData.value.privacyAccDesc === null) {
      allData.value.privacyAccDesc = "해당사항 없음";
      getCheckboxNone.value.privacyAccNone = true;
      postData.value.privacyAccDesc = "해당사항 없음";
      inputCheckboxNone.value.privacyAccNone = true;
    } else {
      postData.value.privacyAccDesc = allData.value?.privacyAccDesc
    }

    if(allData.value.financeAccDesc === null) {
      allData.value.financeAccDesc = "해당사항 없음";
      getCheckboxNone.value.financeAccNone = true;
      postData.value.financeAccDesc = "해당사항 없음";
      inputCheckboxNone.value.financeAccNone = true;
    } else {
      postData.value.financeAccDesc = allData.value?.financeAccDesc
    }

    if(allData.value.vehOpAccDesc === null) {
      allData.value.vehOpAccDesc = "해당사항 없음";
      getCheckboxNone.value.vehOpAccNone = true;
      postData.value.vehOpAccDesc = "해당사항 없음";
      inputCheckboxNone.value.vehOpAccNone = true;
    } else {
      postData.value.vehOpAccDesc = allData.value?.vehOpAccDesc
    }

    if(allData.value.etcAccDesc === null) {
      allData.value.etcAccDesc = "해당사항 없음";
      getCheckboxNone.value.etcAccNone = true;
      postData.value.etcAccDesc = "해당사항 없음";
      inputCheckboxNone.value.etcAccNone = true;
    } else {
      postData.value.etcAccDesc = allData.value?.etcAccDesc
    }
    
    // 날짜/시간
    getDateTime.value.accidentDate = getDate(allData.value?.accidentDate)
    getDateTime.value.accidentTime = parseTime(allData.value?.accidentDate)
    getDateTime.value.detectDate = getDate(allData.value?.detectDate)
    getDateTime.value.detectTime = parseTime(allData.value?.detectDate)
    getDateTime.value.incidentDate = getDate(allData.value?.incidentDate)
    getDateTime.value.incidentTime = parseTime(allData.value?.incidentDate)
    allData.value.planSubmitDate = `${getDate(allData.value?.planSubmitDate)} ${parseTime(allData.value?.planSubmitDate)}`
    allData.value.targetCompleteDate = `${getDate(allData.value?.targetCompleteDate)} ${parseTime(allData.value?.targetCompleteDate)}`

    inputDateTime.value.accidentDate = getDate(allData.value?.accidentDate)
    inputDateTime.value.accidentTime = parseTime(allData.value?.accidentDate)
    inputDateTime.value.detectDate = getDate(allData.value?.detectDate)
    inputDateTime.value.detectTime = parseTime(allData.value?.detectDate)
    inputDateTime.value.incidentDate = getDate(allData.value?.incidentDate)
    inputDateTime.value.incidentTime = parseTime(allData.value?.incidentDate)
    inputDateTime.value.planDate = getDate(allData.value?.planSubmitDate)
    inputDateTime.value.planTime = parseTime(allData.value?.planSubmitDate)
    inputDateTime.value.targetDate = getDate(allData.value?.targetCompleteDate)
    inputDateTime.value.targetTime = parseTime(allData.value?.targetCompleteDate)
    
    // 사고 접수 내역
    postData.value.isNetworkLawViol = allData.value?.isNetworkLawViol
    postData.value.mediaExposureInfo = allData.value?.mediaExposureInfo
    postData.value.vehType = allData.value?.vehType
    postData.value.vehYear = allData.value?.vehYear
    postData.value.partSysNm = allData.value?.partSysNm
    postData.value.partModelNm = allData.value?.partModelNm
    postData.value.extSys = allData.value?.extSys
    postData.value.dmgVehCnt = allData.value?.dmgVehCnt
    postData.value.dmgPrsnCnt = allData.value?.dmgPrsnCnt
    postData.value.dmgDurHour = allData.value?.dmgDurHour
    postData.value.potentialVehDesc = allData.value?.potentialVehDesc
    postData.value.potentialPrsnCnt = allData.value?.potentialPrsnCnt
    postData.value.planSubmitDesc = allData.value?.planSubmitDesc
    postData.value.targetCompleteDesc = allData.value?.targetCompleteDesc
    postData.value.incidentReportContent = allData.value?.incidentReportContent

    // 갱신 내역 ( 기존 갱신 내역 있을 경우 )
    postData.value.renewal.attackerInfo = allData.value?.renewal?.attackerInfo ?? ""
    postData.value.renewal.attackTargetType = allData.value?.renewal?.attackTargetType ?? ""
    postData.value.renewal.attackPath = allData.value?.renewal?.attackPath ?? ""
    postData.value.renewal.existSecMeasure = allData.value?.renewal?.existSecMeasure ?? ""
    postData.value.renewal.causeAnalysis = allData.value?.renewal?.causeAnalysis ?? ""
    postData.value.renewal.attackDifficulty = allData.value?.renewal?.attackDifficulty ?? ""
    postData.value.renewal.postDifficulty = allData.value?.renewal?.postDifficulty ?? ""
    postData.value.renewal.vulnInfo = allData.value?.renewal?.vulnInfo ?? ""
    postData.value.renewal.vulnRiskLvl = allData.value?.renewal?.vulnRiskLvl ?? ""
    postData.value.renewal.existRiskLvl = allData.value?.renewal?.existRiskLvl ?? ""
    postData.value.renewal.currRiskLvl = allData.value?.renewal?.currRiskLvl ?? ""
    postData.value.renewal.postRiskLvl = allData.value?.renewal?.postRiskLvl ?? ""
    
  } catch (error) {
    console.error(error);
    alert('데이터 불러오기 실패');
  }
}

// KATRI 갱신 데이터 전송 API 호출
const postfetch_katri_update = async () => {
  try {
    const res = await axios.post('/api/vsoc/incident',postData.value);
    if(res.data.resultCode === -1){
      alert('데이터 전송 실패');
    } else {
      openUpdateDone();
    }
  } catch (error) {
    console.error(error);
    alert('데이터 전송 실패');
  }
}

// Modal 
const goList = () => {
  router.push({
    name: 'katri_general_detail',
    params: { id: route.params.id },
  })
}

const openUpdateConfirm = () => {
  store.setModalInfo({
    on: true,
    type: "twobtn",
    iconClass: "warning",
    textArea: "신고서를 갱신 하시겠습니까?",

    rightBtn: async() => {
      await postfetch_katri_update();
    },
  })
};

const openUpdateDone = () => {
  store.setModalInfo({
    on: true,
    type: "onebtn",
    iconClass: "success",
    textArea: "갱신 되었습니다.",
    btnText: "확인",

    rightBtn: () => { goList(); },
  })
};

// 파일업로드 테스트 (현재 DLP 파일 반출 보안 문제로 file은 제외하고 테스트)
const incidnetReceiptData = ref({
  fileType: "INCIDENT",
  fileCategory: "RECEIPT_DATA",
  // file: null,
})

const incidentRenewalData = ref({
  fileType: "INCIDENT",
  fileCategory: "RENEWAL_DATA",
  // file: null,
})

const onReceiptFileChange = (e) => {
  incidnetReceiptData.value.file = e.target.files[0];
}

const onRenewalFileChange = (e) => {
  incidentRenewalData.value.file = e.target.files[0];
}

const postfetch_incident_renewal_file = async() => {
  const formData = new FormData();
  formData.append("fileType",incidentRenewalData.value.fileType);
  formData.append("fileCategory",incidentRenewalData.value.fileCategory);
  // formData.append("file",incidentRenewalData.value.file);
  
  try {
    const res = await axios.post('/api/vsoc/file',formData,{
      headers: {
        "Content-Type" : "multipart/form-data"
      }
    });
    console.log(res);
    const fileId = res.data.data.fileId;
    console.log(fileId);
    postData.value.fileAction.fileIdList.push(fileId);
    console.log(postData.value.fileAction.fileIdList);
  } catch (error) {
    console.error(error);
    alert('파일 업로드 실패');
  }
}

const postfetch_incident_receipt_file = async() => {
  const formData = new FormData();
  formData.append("fileType",incidnetReceiptData.value.fileType);
  formData.append("fileCategory",incidnetReceiptData.value.fileCategory);
  // formData.append("file",incidnetReceiptData.value.file);
  
  try {
    const res = await axios.post('/api/vsoc/file',formData,{
      headers: {
        "Content-Type" : "multipart/form-data"
      }
    });
    console.log(res);
    const fileId = res.data.data.fileId;
    console.log(fileId);
    postData.value.fileAction.fileIdList.push(fileId);
    console.log(postData.value.fileAction.fileIdList);
  } catch (error) {
    console.error(error);
    alert('파일 업로드 실패');
  }
}

// 파일 (신고서 접수 자료/신고서 갱신 자료) Parsing (테스트중)
const incidnetReceiptFile = computed(() => {
  return allData.value?.fileList?.filter( item => item.fileCategoryDescription === "신고서 접수 자료")})

const incidnetRenewalFile = computed(() => {
  return allData.value?.fileList?.filter( item => item.fileCategoryDescription === "신고서 갱신 자료")})
//

onMounted(getfetch_katri_detail);
</script>

<style scoped>
</style>