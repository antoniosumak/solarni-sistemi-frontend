import { defineStore } from 'pinia';

export const useSidebarStore = defineStore('sidebar', {
  state: () => {
    return {
      isSidebarOpened: false,
    };
  },

  actions: {
    toggleSidebar() {
      this.isSidebarOpened = !this.isSidebarOpened;
    },
  },
});
