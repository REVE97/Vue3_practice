import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    onHeader: true,
    modalInfo: { on: false },
    loadingInfo: { on: false },
    popupInfo: {},
    memberInfo: {},
    progress: "",
    campaignInfo: {},
    savedMemo: "",
    updateEffect: "",
    userInfo: {},
    otaInfo: { empty: true },
  }),

  actions: {
    setSavedMemo(memo) {
      this.savedMemo = memo;
    },
    setUpdateEffect(text) {
      this.updateEffect = text;
    },
    setOnHeader(data) {
      this.onHeader = data;
    },
    setLoadingInfo(info) {
      this.loadingInfo = { ...info };
    },
    setModalInfo(info) {
      this.modalInfo = { ...info };
    },
    setMemberInfo(info) {
      this.memberInfo = { ...info };
    },
    setPopupInfo(info) {
      this.popupInfo = { ...this.popupInfo, ...info };
    },
    setProgress(step) {
      this.progress = step;
    },
    setCampaignInfo(info) {
      this.campaignInfo = { ...info };
    },
    setUserInfo(info) {
      this.userInfo = { ...info };
    },
    setOtaInfo(info) {
      this.otaInfo = { empty: false, ...info };
    },
    clearMemberInfo() {
      this.memberInfo = {};
    },
    clearModalInfo() {
      this.modalInfo = { on: false };
    },
    clearLoadingInfo() {
      this.loadingInfo = { on: false };
    },
    clearOtaInfo() {
      this.otaInfo = { empty: true };
    },
    displayModal({
      type = "onebtn",
      iconClass,
      textArea,
      btnClass = "",
      btnText = "확인",
    }) {
      this.clearLoadingInfo();
      this.setModalInfo({
        on: true,
        type,
        iconClass,
        textArea,
        btnClass,
        btnText,
      });
    },
    displayError({ error }) {
      this.displayModal({
        iconClass: "icon fail",
        textArea: `${error}`,
      });
    },
    displaySuccess({ message }) {
      this.displayModal({
        iconClass: "icon complete",
        textArea: `${message}`,
      });
    },
    loadingSpinner() {
      this.setModalInfo({
        on: true,
        type: "onebtn",
        iconClass: "icon loading",
        textArea: `조회차량의 위치 정보를 기반으로<br />가까운 정비소를 조회하고 있습니다.`,
        btnClass: "cancel",
        btnText: "취소",
      });
      setTimeout(() => {
        this.clearModalInfo();
      }, 5000);
    },
  },
});