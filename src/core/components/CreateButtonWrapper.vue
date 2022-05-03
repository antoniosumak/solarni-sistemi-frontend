<template>
  <div
    :class="`w-full flex items-center ${
      containsFilter ? 'justify-between' : 'justify-end'
    } my-4`"
  >
    <slot></slot>
    <button-component
      text="Dodaj"
      :is-create-button="true"
      @execute-method="changeRoute"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ButtonComponent from './ButtonComponent.vue';
export default defineComponent({
  components: { ButtonComponent },

  props: { routeName: String, containsFilter: Boolean, id: Number },

  methods: {
    changeRoute() {
      this.$router.push({
        name: this.routeName,
        ...(this.id && { id: this.id }),
      });
    },
  },
});
</script>
<style scoped></style>
