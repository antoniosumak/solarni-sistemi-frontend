<template>
  <header class="w-full h-16 sticky top-0 bg-darker z-50">
    <nav class="py-4 px-8 sm:px-16 flex items-center h-full w-full">
      <menu-icon
        class="w-8 cursor-pointer text-white"
        @click="sidebarStore.toggleSidebar"
      />
    </nav>
  </header>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { MenuIcon } from '@heroicons/vue/solid';
import { useSidebarStore } from '../Store/sidebarStore';
export default defineComponent({
  components: { MenuIcon },

  data() {
    return {
      sidebarStore: useSidebarStore(),
    };
  },
});
</script>
<style scoped></style>
