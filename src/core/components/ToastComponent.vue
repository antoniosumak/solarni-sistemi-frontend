<template>
  <Motion
    :initial="{ opacity: 0, x: 200 }"
    :animate="{ opacity: 1, x: -32 }"
    :transition="{
      duration: 0.3,
      easing: 'ease-in-out',
    }"
    v-if="Array.isArray(message) && showToast"
    :class="` absolute top-8 -right-4 space-y-4  ${showToast && 'z-[150]'}`"
  >
    <div v-for="(error, index) in message" :key="index" class="space-y-4">
      <div
        :class="`py-3 px-4 w-[450px] bg-white  rounded-md flex justify-between shadow-lg  ${
          isError ? 'error' : 'success'
        }`"
      >
        <div class="flex space-x-4 items-center">
          <div
            v-if="!isError"
            class="w-8 h-8 rounded-full flex items-center justify-center bg-successLight"
          >
            <font-awesome-icon
              class="text-success text-xl"
              :icon="['fas', 'check']"
            />
          </div>
          <div
            v-else
            class="w-8 h-8 rounded-full flex items-center justify-center bg-errorLight"
          >
            <font-awesome-icon
              class="text-error text-xl"
              :icon="['fas', 'times']"
            />
          </div>
          <div>
            <h2 class="font-bold">{{ isError ? 'Error' : 'Success' }}</h2>
            <p>{{ error }}</p>
          </div>
        </div>
        <div @click="closeToast">
          <font-awesome-icon
            class="text-dark text-sm cursor-pointer hover:text-error absolute top-4 right-4"
            :icon="['fas', 'times']"
          />
        </div>
      </div>
    </div>
  </Motion>

  <Motion
    v-else-if="!Array.isArray(message) && showToast"
    :initial="{ opacity: 0, x: 100, scale: 0.9 }"
    :animate="{ opacity: 1, x: -32, scale: 1 }"
    :transition="{
      duration: 0.3,
      easing: 'ease-in-out',
    }"
    :class="`py-3 px-4  w-[300px] md:w-[450px] h-fit bg-white  rounded-md flex justify-between shadow-lg  ${
      isError ? 'error' : 'success'
    } absolute top-8 right-4 space-y-4  ${showToast ? 'z-[150]' : 'z-[1]'} `"
  >
    <div class="flex space-x-4 items-center">
      <div
        v-if="!isError"
        class="w-8 h-8 rounded-full flex items-center justify-center bg-successLight"
      >
        <CheckIcon class="text-success w-6" />
      </div>
      <div
        v-else
        class="w-8 h-8 rounded-full flex items-center justify-center bg-errorLight"
      >
        <XIcon class="text-error w-6" />
      </div>
      <div>
        <h2 class="font-bold">{{ isError ? 'Error' : 'Success' }}</h2>
        <p>{{ message }}</p>
      </div>
    </div>
    <div @click="closeToast">
      <font-awesome-icon
        class="text-dark text-sm cursor-pointer hover:text-error absolute top-4 right-4"
        :icon="['fas', 'times']"
      />
    </div>
  </Motion>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Motion } from '@motionone/vue';
import { CheckIcon, XIcon } from '@heroicons/vue/solid';
export default defineComponent({
  name: 'ToastComponent',
  components: { Motion, CheckIcon, XIcon },
  props: ['message', 'isError', 'showToast'],
  emits: ['close-toast'],
  methods: {
    closeToast() {
      this.$emit('close-toast');
    },
  },
});
</script>
<style scoped>
.success {
  @apply border-l-4 border-success;
}

.error {
  @apply border-l-4 border-error;
}
</style>
