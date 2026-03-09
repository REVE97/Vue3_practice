import { defineStore } from 'pinia';

export const useAppStore = defineStore("app", {
    state: () => ({
        modalInfo: true,
    }),

    actions : {
        setModalInfo(info) {
            this.modalInfo = {...info};
        },
        clearModalInfo() {
            this.modalInfo = { on: false };
        },
        displayModal({
            type= "onebtn",
            iconClass,
            textArea,
            btnClass="",
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
        }
    }
})