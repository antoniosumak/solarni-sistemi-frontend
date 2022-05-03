<template>
  <div class="loader flex items-center justify-center w-full">
    <img src="../../assets/tail-spin.svg" width="100" alt="Loading..." />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
});
</script>
<style scoped>
.loader {
  height: calc(100vh - 20rem);
  margin-top: 4rem;
}
</style>
