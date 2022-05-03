import { defineStore } from 'pinia';
import { ErrorMessageFormatter } from '../Services/GlobalFunctions';
import { ToastMessage } from '../Services/GlobalTypes';

export const useToastStore = defineStore('toast', {
  state: () => {
    return {
      toastMessage: '' as any,
      isError: false as boolean,
      showToast: false as boolean,
    };
  },
  actions: {
    displayToastMessage(value: ToastMessage) {
      if (this.isError) {
        this.toastMessage = ErrorMessageFormatter(value.toastMessage);
      } else {
        this.toastMessage = value.toastMessage;
      }
      this.isError = value.isError;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3500);
    },
  },
});
