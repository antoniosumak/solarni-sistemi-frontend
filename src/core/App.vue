<template>
  <main class="w-full h-full">
    <header-bar />
    <div class="flex">
      <side-bar />
      <router-view />
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import HeaderBar from './components/HeaderBar.vue';
import { UserGroupIcon } from '@heroicons/vue/solid';
import SideBar from './components/SideBar.vue';
import { useSidebarStore } from './Store/sidebarStore';
export default defineComponent({
  components: { HeaderBar, UserGroupIcon, SideBar },
  data() {
    return {
      sidebarStore: useSidebarStore(),
    };
  },
});
</script>
<style scoped></style>
