<template>
  <div class="contentBox">
    <div class="title">
      <strong>교안 등록</strong>
    </div>
    <div class="content">
      <div class="table">
        <table>
          <colgroup>
            <!-- <col style="width: 8%" />
            <col style="width: 22%" />
            <col style="width: 8%" />
            <col style="width: 22%" />
            <col style="width: 8%" />
            <col style="width: 22%" />
            <col style="width: 8%" />
            <col style="width: 22%" /> -->
          </colgroup>
          <tbody>
            <tr>
              <th>활동명</th>
              <td>
                <div class="input">
                  <input type="text" v-model="inputValue.activityName" />
                </div>
              </td>
              <th>교안 형식</th>
              <td>
                <div class="select">
                  <select @change="async () => await initBookList()" v-model="selected.bookType" @click="memoBeforeSelected">
                    <option v-for="(item, idx) in selectOptions.bookTypeOptions" :key="idx" :value="item">
                      {{ formatBookTypeToString(item) }}
                    </option>
                  </select>
                </div>
              </td>
              <th>연령</th>
              <td>
                <div class="select">
                  <select v-model="selected.age">
                    <option v-for="(item, idx) in selectOptions.ageOptions" :key="idx" :value="item">
                      {{ `${item}세` }}
                    </option>
                  </select>
                </div>
              </td>
              <th>화상횟수</th>
              <td>
                <div class="select">
                  <select v-model="selected.videoCallCount" :disabled="this.uploadPageEntranceType === 'modify'">
                    <option v-for="(item, idx) in selectOptions.videoCallCountOptions" :key="idx" :value="item">
                      {{ `${item}회` }}
                    </option>
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <th>UID</th>
              <td>
                <div class="input">
                  <input type="text" disabled :value="bookInfo.textbookMeta.uploadTextbookMetaId || '자동생성'" />
                </div>
              </td>

              <th>연도</th>
              <td>
                <div class="select">
                  <select v-model="selected.useYear">
                    <option v-for="(year, idx) in selectOptions.useYearOptions" :key="idx" :value="year">
                      {{ year }}
                    </option>
                  </select>
                </div>
              </td>

              <th>월</th>
              <td>
                <div class="select">
                  <select v-model="selected.bookMonth">
                    <option v-for="(item, idx) in selectOptions.bookMonthOptions" :key="idx" :value="item">
                      {{ item }}
                    </option>
                  </select>
                </div>
              </td>
              <th>주차</th>
              <td>
                <div class="select">
                  <select v-model="selected.bookWeek">
                    <option v-for="(item, idx) in selectOptions.bookWeekOptions" :key="idx" :value="item">{{ item }}</option>
                  </select>
                </div>
              </td>
            </tr>

            <tr>
              <th>등록일</th>
              <td>
                <div class="input">
                  <input
                    type="text"
                    disabled
                    :value="
                      this.uploadPageEntranceType !== 'modify' ? '저장 후 등록됨' : `${bookInfo.textbookMeta.createDate}`
                    "
                  />
                </div>
              </td>

              <th>수정일</th>
              <td>
                <div class="input">
                  <input
                    type="text"
                    disabled
                    :value="
                      this.uploadPageEntranceType !== 'modify' ? '저장 후 등록됨' : `${bookInfo.textbookMeta.updateDate}`
                    "
                  />
                </div>
              </td>

              <th>사용 여부</th>
              <td colspan="3">
                <div class="select">
                  <select v-model="selected.bookIsUsed">
                    <option v-for="(item, idx) in selectOptions.bookIsUsedOptions" :key="idx" :value="item">
                      {{ item ? '사용' : '미사용' }}
                    </option>
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <th>페이지</th>
              <td colspan="7">
                <ul>
                  <li v-if="bookInfo.textbookList.length > 0">
                    <div class="checkbox">
                      <input type="checkbox" id="checkboxAll" :checked="allCheck" @change="handleAllBookCheck" />
                      <label for="checkboxAll">전체</label>
                    </div>
                  </li>
                  <li
                    v-for="(book, idx) in bookInfo.textbookList"
                    :key="`${book.file?.key || book.file?.name || 'book'}-${idx}`"
                    :class="{ checkedItem: book.checked }"
                    @dragover.prevent="handleDragOver(idx, $event)"
                    @drop.prevent="handleDrop(idx)"
                  >
                    <div class="dragdot" draggable="true" @dragstart="handleDragStart(idx, $event)" @dragend="handleDragEnd">
                      <svg width="24" height="24" viewBox="0 0 24 24" aria-label="drag handle" role="img">
                        <circle cx="6" cy="6" r="1" />
                        <circle cx="12" cy="6" r="1" />
                        <circle cx="18" cy="6" r="1" />
                        <circle cx="6" cy="12" r="1" />
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="18" cy="12" r="1" />
                        <circle cx="6" cy="18" r="1" />
                        <circle cx="12" cy="18" r="1" />
                        <circle cx="18" cy="18" r="1" />
                      </svg>
                    </div>
                    <div class="checkbox">
                      <input
                        type="checkbox"
                        :id="`checkbox${idx + 1}`"
                        :checked="book.checked"
                        @change="(e) => handleBookCheck(e, idx)"
                      />
                      <label :for="`checkbox${idx + 1}`">{{ `${idx + 1}P` }}</label>
                    </div>
                    <div class="input file">
                      <input
                        type="text"
                        readonly="readonly"
                        id="fileName"
                        placeholder="파일명"
                        disabled
                        :value="book.file.name"
                      />
                      <label>
                        변경
                        <input type="file" @change="(e) => changeBook(e, idx)" :ref="setBookRef" />
                      </label>
                      <button class="delete" @click="() => handleDeleteBtn('book', idx)">삭제</button>
                    </div>
                    <div class="input file">
                      <input
                        type="text"
                        readonly="readonly"
                        id="fileName"
                        placeholder="음성파일명"
                        disabled
                        :value="book.audio ? book.audio.name : '음성 파일 없음'"
                      />
                      <label>
                        음성
                        <input type="file" @change="async (e) => await uploadAudio(e, idx)" :ref="setAudioRef" />
                      </label>
                      <button class="delete" @click="() => handleDeleteBtn('audio', idx)">삭제</button>
                    </div>
                    <div class="button">
                      <button class="line" @click="() => changeOrderBookList(idx, -1)">▲</button>
                      <button class="line" @click="() => changeOrderBookList(idx, 1)">▽</button>
                    </div>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th>BGM</th>
              <td colspan="7">
                <ul>
                  <li v-for="(i, idx) in 3" :key="i">
                    <span>{{ `BGM ${i}` }}</span>
                    <div class="input file">
                      <input
                        type="text"
                        readonly="readonly"
                        id="fileName"
                        placeholder="파일명"
                        disabled
                        :value="bookInfo.bgm[`bgm${i}`] ? bookInfo.bgm[`bgm${i}`].name : ''"
                      />
                      <label>
                        파일찾기
                        <input type="file" @change="async (e) => await uploadBgm(e, idx)" :ref="setBgmRef" />
                      </label>
                      <button class="delete" @click="() => handleDeleteBtn('bgm', idx)">삭제</button>
                    </div>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th>캐릭터 BG</th>
              <td colspan="7">
                <ul>
                  <li>
                    <div class="input file">
                      <input
                        type="text"
                        readonly="readonly"
                        id="fileName"
                        placeholder="이미지를 등록해주세요."
                        disabled
                        :value="bookInfo.bg ? bookInfo.bg.name : ''"
                      />
                      <label>
                        파일찾기
                        <input type="file" @change="async (e) => await uploadBg(e)" ref="bgInputRef" />
                      </label>
                      <button class="delete" @click="() => handleDeleteBtn('bg')">삭제</button>
                    </div>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="button">
        <button class="submit" @click="uploadBook">교안 파일 찾기</button>
        <button class="book-cancel" @click="deleteSelectedBook">삭제</button>
        <button class="submit" @click="bookDownLoad">교안 다운로드</button>
        <button class="cancel" @click="gotoBookList">목록</button>
        <button class="submit" @click="handleSubmit">저장</button>
      </div>
    </div>
  </div>
  <Loading v-if="isLoading" />

  <div v-if="dragPreviewBook" ref="dragPreviewRef" class="dragPreview">
    <div class="dragPreview_item">
      <div class="dragPreview_dragdot">
        <svg width="24" height="24" viewBox="0 0 24 24" aria-label="drag handle" role="img">
          <circle cx="6" cy="6" r="1" />
          <circle cx="12" cy="6" r="1" />
          <circle cx="18" cy="6" r="1" />
          <circle cx="6" cy="12" r="1" />
          <circle cx="12" cy="12" r="1" />
          <circle cx="18" cy="12" r="1" />
          <circle cx="6" cy="18" r="1" />
          <circle cx="12" cy="18" r="1" />
          <circle cx="18" cy="18" r="1" />
        </svg>
      </div>
      <div class="checkbox dragPreview_checkboxWrap">
        <input type="checkbox" />
        <label>{{ dragPreviewPageLabel }}</label>
      </div>
      <div class="input file dragPreview_fileGroup">
        <input type="text" readonly="readonly" disabled :value="dragPreviewBook.file?.name || '파일명'" />
        <label>변경</label>
        <button class="delete" type="button">삭제</button>
      </div>
      <div class="input file dragPreview_fileGroup">
        <input
          type="text"
          readonly="readonly"
          disabled
          :value="dragPreviewBook.audio ? dragPreviewBook.audio.name : '음성 파일 없음'"
        />
        <label>음성</label>
        <button class="delete" type="button">삭제</button>
      </div>
      <div class="button dragPreview_button">
        <button class="line" type="button">▲</button>
        <button class="line" type="button">▽</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { bookTypeToString } from '@/commons/common';
import { selectedOptions } from '@/store/module/book';
import Loading from '@/components/common/Loading.vue';
import axios from 'axios';
import JSZip from 'jszip';
import { PRACTICE, RESEARCH, getSessionAdminType } from '@/commons/storage';

export default {
  components: { Loading },
  data() {
    return {
      selected: {
        age: '',
        bookType: '',
        bookIsUsed: '',
        bookMonth: '',
        bookWeek: '',
        videoCallCount: '',
        useYear: '',
      },
      selectOptions: {
        ageOptions: '',
        bookTypeOptions: '',
        bookIsUsedOptions: '',
        bookMonthOptions: '',
        bookWeekOptions: '',
        videoCallCountOptions: '',
        useYearOptions: '',
      },
      inputValue: {
        activityName: '',
      },
      beforeSelected: '',
      bookInputRefs: [],
      bookAudioInputRefs: [],
      bgmInputRefs: [],
      dragFromIdx: null,
      dragOverIdx: null,
      dragGhostEl: null,
      dragPreviewBook: null,
      dragPreviewPageLabel: '',
    };
  },
  async mounted() {
    // if (this.$store.state.book.isModify) {
    //   const { bookId } = this.$route.query;
    //   await this.$store.dispatch('book/downloadDetailBook', bookId);
    // } else {
    //   // this.$store.commit('book/setBookInfo', null);
    //   await this.$store.dispatch('book/setInitialBookInfo');
    // }
    // const uploadPageEntranceType = this.$store.state.book.uploadPageEntranceType;
    const { bookId } = this.$route.query;
    if (this.uploadPageEntranceType === 'initial') {
      await this.$store.dispatch('book/setInitialBookInfo');
    } else if (this.uploadPageEntranceType === 'modify') {
      await this.$store.dispatch('book/downloadDetailBook', bookId);
    } else if (this.uploadPageEntranceType === 'copy') {
      await this.$store.dispatch('book/copyDetailBook', bookId);
    }

    this.setInitialData();
  },
  methods: {
    async bookDownLoad() {
      const adminType = getSessionAdminType();
      if (adminType === PRACTICE || adminType === RESEARCH) {
        this.$store.commit('setOneBtnModal', {
          content: '권한이 없습니다. 관리자에게 문의하세요.',
          confirmBtnName: '확인',
          status: true,
        });
        return;
      }

      if (this.bookInfo.textbookList.length === 0) {
        this.$store.commit('setOneBtnModal', {
          content: '파일이 없습니다.',
          confirmBtnName: '확인',
          status: true,
        });
        return;
      }

      try {
        const bookFiles = [];

        this.bookInfo.textbookList.forEach((book) => {
          if (book.file) {
            bookFiles.push({
              name: book.file.name,
              key: book.file.key,
            });
          }
          if (book.audio) {
            bookFiles.push({
              name: book.audio.name,
              key: book.audio.key,
            });
          }
        });

        const res = await Promise.all(
          bookFiles.map(({ key }) => {
            const url = `${process.env.VUE_APP_AWS_S3}/${key}`;
            return axios.get(url, {
              responseType: 'blob',
            });
          })
        );

        const jszip = new JSZip();

        res.forEach(({ data }, idx) => {
          jszip.folder(this.bookInfo.textbookMeta.activityName).file(bookFiles[idx].name, data);
        });

        await jszip
          .generateAsync({
            type: 'blob',
          })
          .then((content) => {
            const a = document.createElement('a');
            const url = URL.createObjectURL(content);
            a.href = url;
            a.click();
            URL.revokeObjectURL(url);
          });
      } catch (err) {
        this.$store.commit('setOneBtnModal', {
          content: err,
          confirmBtnName: '확인',
          status: true,
        });
      }
    },
    setBookRef(el) {
      this.bookInputRefs.push(el);
    },
    setBgmRef(el) {
      this.bgmInputRefs.push(el);
    },
    setAudioRef(el) {
      this.bookAudioInputRefs.push(el);
    },
    deleteSelectedBook() {
      this.$store.commit('book/setTempList', { type: 'book', checked: true });
    },
    handleAllBookCheck(e) {
      const checked = e.target.checked;
      this.$store.commit('book/setAllBookChecked', checked);
    },
    handleBookCheck(e, idx) {
      const checked = e.target.checked;
      this.$store.commit('book/setBookChecked', { idx, checked });
    },
    setInitialData() {
      const options = {
        ageOptions: selectedOptions.ageOptions.slice(1),
        bookTypeOptions: selectedOptions.bookTypeOptions.slice(1),
        bookIsUsedOptions: selectedOptions.bookIsUsedOptions.slice(1),
        bookMonthOptions: selectedOptions.bookMonthOptions,
        bookWeekOptions: selectedOptions.bookWeekOptions,
        videoCallCountOptions: selectedOptions.videoCallCountOptions.slice(1),
        useYearOptions: [`${new Date().getFullYear()}`, `${new Date().getFullYear() + 1}`],
      };
      const selected = {
        age: this.bookInfo.textbookMeta.age,
        bookType: this.bookInfo.textbookMeta.type,
        bookIsUsed: this.bookInfo.textbookMeta.isUsed,
        bookMonth: this.bookInfo.textbookMeta.month,
        bookWeek: this.bookInfo.textbookMeta.week,
        videoCallCount: this.bookInfo.textbookMeta.videoCallCount,
        useYear: this.bookInfo.textbookMeta.useYear,
      };
      const activityName = this.bookInfo.textbookMeta.activityName;

      this.selected = selected;
      this.selectOptions = options;
      this.inputValue.activityName = activityName;
      this.beforeSelected = selected.bookType;
    },
    handleDeleteBtn(type, idx) {
      this.$store.commit('book/setTempList', { type, idx });
      if (type === 'bgm') {
        this.bgmInputRefs[idx].value = null;
      }
      if (type === 'audio') {
        this.bookAudioInputRefs[idx].value = null;
      }
      if (type === 'bg') {
        this.$refs.bgInputRef.value = null;
      }
      if (type === 'book') {
        this.bookInputRefs[idx].value = null;
      }
    },
    async handleSubmit() {
      let alertMsg = '';
      await this.$store.dispatch('book/downloadBookList', {});

      const checkDuplication = () => {
        const {
          age: bookAge,
          bookMonth,
          bookWeek,
          bookIsUsed,
          videoCallCount: bookVideoCallCount,
          useYear: bookUseYear,
        } = this.selected;

        if (!bookIsUsed) return true;
        const result = this.$store.state.book.bookList.list.some((bookInfo) => {
          const { age, month, week, isUsed, uploadTextbookMetaId, videoCallCount, useYear } = bookInfo;
          const isDuplicated =
            isUsed &&
            `${bookAge}` === age &&
            `${bookMonth}` === month &&
            `${bookWeek}` === week &&
            `${bookVideoCallCount}` === videoCallCount &&
            bookUseYear === useYear;

          if (
            isDuplicated &&
            this.uploadPageEntranceType === 'modify' &&
            this.bookInfo.textbookMeta.uploadTextbookMetaId === uploadTextbookMetaId
          ) {
            return false;
          }

          return isDuplicated;
        });

        return !result;
      };

      if (this.inputValue.activityName.replace(/\s/g, '') === '') {
        alertMsg = '활동명을 입력하세요';
      } else if (this.bookInfo.textbookList.length === 0) {
        alertMsg = '교안을 등록해주세요';
      } else if (!checkDuplication()) {
        alertMsg = `
          <p>중복으로 등록된 교안이 있습니다.</p>
          <p>연령, 월, 주차, 화상횟수, 사용여부를 확인해주세요</p>
        `;
      }

      if (alertMsg !== '') {
        this.$store.commit('setOneBtnModal', {
          content: alertMsg,
          confirmBtnName: '확인',
          status: true,
        });
        return;
      }

      const textbookMeta = {
        activityName: this.inputValue.activityName,
        type: this.selected.bookType,
        age: this.selected.age,
        isUsed: this.selected.bookIsUsed,
        month: this.selected.bookMonth,
        week: this.selected.bookWeek,
        videoCallCount: this.selected.videoCallCount,
        useYear: this.selected.useYear,
      };
      const modalInfo = {
        content: `<p>교안을 저장하시겠습니까?</p>`,
        confirmText: '저장',
        cancelText: '취소',
      };

      const isOk = await this.$store.dispatch('modal/setConfirmModal', modalInfo);

      if (!isOk) return;

      await this.$store.dispatch('book/uploadBookMeta', textbookMeta);

      if (this.uploadPageEntranceType === 'initial' || this.uploadPageEntranceType === 'copy') {
        this.$store.commit('book/setSearchValue', { currentPage: 1 });
      }

      // this.$store.commit('book/setInitSearchValue');
      this.$router.push({
        path: '/main/bookManagement/list',
      });
    },
    formatBookTypeToString(type) {
      return bookTypeToString(type);
    },
    async gotoBookList() {
      const isOk = await this.$store.dispatch('modal/setConfirmModal', {
        content: `
          <p>저장하지 않은 정보는 모두 지워집니다.</p>
          <p>목록으로 가시겠습니까?</p>
        `,
        confirmText: '확인',
        cancelText: '취소',
      });

      if (!isOk) return;

      this.$router.push({
        path: '/main/bookManagement/list',
      });
    },
    changeOrderBookList(from, order) {
      this.$store.commit('book/changeOrderBookList', { from, order });
    },
    async handleDragStart(idx, e) {
      this.dragFromIdx = idx;
      this.dragOverIdx = idx;
      this.dragPreviewBook = this.bookInfo.textbookList[idx];
      this.dragPreviewPageLabel = `${idx + 1}P`;

      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.setData('text/plain', String(idx));

        await this.$nextTick();

        const previewEl = this.$refs.dragPreviewRef;
        const listItem = e.currentTarget?.closest('li');

        if (previewEl && listItem) {
          previewEl.style.width = `${listItem.offsetWidth}px`;
          this.dragGhostEl = previewEl;
          e.dataTransfer.setDragImage(previewEl, 24, 24);
        }
      }
    },
    handleDragOver(idx, e) {
      if (this.dragFromIdx === null || this.dragFromIdx === idx) {
        this.dragOverIdx = idx;
        return;
      }

      const currentTarget = e.currentTarget;
      const rect = currentTarget.getBoundingClientRect();
      const offsetY = e.clientY - rect.top;
      const insertAfter = offsetY > rect.height / 2;
      const targetIdx = insertAfter ? idx + 1 : idx;
      const normalizedTargetIdx = Math.max(0, Math.min(targetIdx, this.bookInfo.textbookList.length - 1));

      if (normalizedTargetIdx === this.dragFromIdx) {
        this.dragOverIdx = idx;
        return;
      }

      this.moveBookByDrag(this.dragFromIdx, normalizedTargetIdx);
      this.dragFromIdx = normalizedTargetIdx;
      this.dragOverIdx = normalizedTargetIdx;
    },
    handleDrop(dropIdx) {
      this.dragOverIdx = dropIdx;
      this.handleDragEnd();
    },
    handleDragEnd() {
      this.dragFromIdx = null;
      this.dragOverIdx = null;
      this.dragPreviewBook = null;
      this.dragPreviewPageLabel = '';
      this.dragGhostEl = null;
    },
    moveBookByDrag(from, to) {
      if (from < to) {
        for (let i = from; i < to; i += 1) {
          this.changeOrderBookList(i, 1);
        }
      } else {
        for (let i = from; i > to; i -= 1) {
          this.changeOrderBookList(i, -1);
        }
      }
    },
    async uploadBook() {
      const inputEl = document.createElement('input');
      inputEl.type = 'file';
      inputEl.multiple = true;
      inputEl.onchange = async (e) => {
        const files = e.target.files;
        await this.$store.dispatch('book/uploadBook', { files, type: this.selected.bookType });
      };
      inputEl.click();
    },
    async changeBook(e, idx) {
      const files = e.target.files;
      await this.$store.dispatch('book/changeBook', { files, type: this.selected.bookType, idx });
      this.bookInputRefs[idx].value = null;
    },
    async uploadAudio(e, idx) {
      const files = e.target.files;
      await this.$store.dispatch('book/uploadAudio', { files, idx });
    },
    async uploadBgm(e, idx) {
      const files = e.target.files;
      await this.$store.dispatch('book/uploadBgm', { files, idx });
    },
    async uploadBg(e) {
      const files = e.target.files;
      await this.$store.dispatch('book/uploadBg', { files });
    },
    memoBeforeSelected() {
      this.beforeSelected = this.selected.bookType;
    },
    async initBookList() {
      const beforeBookType = this.beforeSelected;
      const modalInfo = {
        content: `<p>선택한 교안이 초기화 됩니다.</p><p>교안형식을 변경하시겠습니까?</p>`,
        confirmText: '변경',
        cancelText: '취소',
      };
      const isOk = await this.$store.dispatch('modal/setConfirmModal', modalInfo);
      if (!isOk) {
        this.selected.bookType = beforeBookType;
        return;
      }

      this.$store.state.book.bookInfo.textbookList.forEach((book) => {
        const { file, audio } = book;
        if (file) this.$store.state.book.tempList.push(file);
        if (audio) this.$store.state.book.tempList.push(audio);
      });

      this.$store.commit('book/setBookInfo', { textbookList: [] });
    },
  },
  computed: {
    uploadPageEntranceType() {
      return this.$store.state.book.uploadPageEntranceType;
    },
    isLoading() {
      return this.$store.state.book.isLoading;
    },
    bookInfo() {
      return this.$store.state.book.bookInfo;
    },
    allCheck() {
      return this.bookInfo.textbookList.every((el) => el.checked);
    },
  },
  beforeUpdate() {
    this.bgmInputRefs = [];
    this.bookAudioInputRefs = [];
    this.bookInputRefs = [];
  },
  unmounted() {
    // this.$store.commit('book/setIsModify', false);
    this.$store.commit('book/setUploadPageEntranceType', 'initial');
    this.$store.state.book.tempList = [];
    this.$store.commit('book/setBookInfo', null);
  },
};
</script>

<style scoped>
.book-cancel {
  margin-left: 8px;
}
.dragdot {
  display: flex;
  align-items: center;
  cursor: grab;
  user-select: none;
}
.dragdot:active {
  cursor: grabbing;
}
.dragdot svg {
  padding-right: 8px;
}
.checkedItem {
  background-color: #E3F2FF;
  border-radius: 4px;
}
.contentBox .content .table li {
  margin: 0px;
  padding: 6px 8px;
}
li:has(#checkboxAll) {
  margin-left: 32px;
}
.dragPreview {
  position: fixed;
  top: -9999px;
  left: -9999px;
  z-index: 9999;
  pointer-events: none;
}
.dragPreview * {
  box-sizing: border-box;
}
.dragPreview_item {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 6px 8px;
  border-radius: 4px;
}
.dragPreview_dragedot {
  width: 24px;
  height: 24px;
}
.dragPreview_fileGroup {
  flex: 1;
  margin-left: 16px;
}
.dragPreview_fileGroup input[type='text'] {
  flex: 1;
  min-width: auto;
  margin-right: 8px;
}
.dragPreview_fileGroup label {
  width: auto;
  height: auto;
  padding: 5px 8px;
  line-height: normal;
  font-size: 14px;
  color: var(--main-color);
  border: 1px solid var(--main-color);
  background-color: #fff;
  cursor: default;
}
.dragPreview_fileGroup .delete {
  width: auto;
  height: auto;
  padding: 5px 8px;
  line-height: normal;
  font-size: 14px;
  color: var(--close-color);
  border: 1px solid var(--close-color);
  background-color: #fff;
  cursor: default;
  border-radius: 4px;
  margin-left: 4px;
}
.dragPreview_button {
  margin-left: 16px;
}
.dragPreview_button button {
  color: var(--main-color);
  border: 1px solid var(--main-color);
  border-radius: 4px;
  background-color: #fff;
  padding: 4px 7px;
}
</style>