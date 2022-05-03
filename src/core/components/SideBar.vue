<template>
  <div
    :class="`w-72 bg-dark fixed h-screen left-0 bottom-0 top-0 mt-0 z-30 p-4 transform shadow-2xl ${
      sidebarStore.isSidebarOpened ? 'translate-x-0' : '-translate-x-96'
    } ease-in-out duration-300`"
  >
    <div class="w-full h-8 flex items-center justify-end">
      <XIcon
        class="w-6 cursor-pointer text-white"
        @click="sidebarStore.toggleSidebar"
      />
    </div>
    <ul class="mt-10 space-y-2">
      <li v-for="route in routes">
        <router-link
          :to="route?.path"
          :key="route?.name"
          @click="sidebarStore.toggleSidebar"
        >
          <div
            v-if="route.meta?.showInNavigation"
            class="flex items-center space-x-4 hover:bg-darker p-2 rounded-md cursor-pointer"
          >
            <div class="w-6 h-6 flex items-center justify-center">
              <component :is="route.meta?.icon" class="h-full text-white" />
            </div>
            <p class="text-white">{{ route.meta?.label }}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
  <div
    @click="sidebarStore.toggleSidebar"
    :class="`z-20 fixed inset-0 w-full min-h-full transform bg-[rgba(0,0,0,0.4)] justify-center ${
      sidebarStore.isSidebarOpened
        ? 'visible opacity-100'
        : 'invisible opacity-0'
    } transition-opacity`"
  ></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useSidebarStore } from '../Store/sidebarStore';
import {
  XIcon,
  UserGroupIcon,
  LightningBoltIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
  ArchiveIcon,
} from '@heroicons/vue/solid';
import { RouteRecordRaw } from 'vue-router';
import { getAllRoutes } from '../Router';
export default defineComponent({
  components: {
    XIcon,
    UserGroupIcon,
    LightningBoltIcon,
    DocumentTextIcon,
    ShoppingCartIcon,
    ArchiveIcon,
  },
  data() {
    return {
      sidebarStore: useSidebarStore(),
      routes: [] as RouteRecordRaw[],
    };
  },

  created() {
    this.routes = getAllRoutes();
  },
});
</script>
<style scoped></style>
