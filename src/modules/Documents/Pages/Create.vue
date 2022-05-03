<template>
  <toast-component
    v-if="toastStore.isError"
    :show-toast="toastStore.showToast"
    :message="toastStore.toastMessage"
    :isError="toastStore.isError"
    @close-toast="toastStore.showToast = false"
  />
  <main-section title="Kreiraj dokument">
    <form-wrapper title="Unesi dokument">
      <form @submit.prevent="handleSubmit">
        <form-divider>
          <input-field
            id="document"
            name="document"
            label="Dokument"
            type="file"
            @change-event="handleFileSubmit"
          />
        </form-divider>
        <button-wrapper />
      </form>
    </form-wrapper>
  </main-section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import MainSection from '../../../core/components/MainSection.vue';
import FormWrapper from '../../../core/components/FormElements/FormWrapper.vue';
import FormDivider from '../../../core/components/FormElements/FormDivider.vue';
import InputField from '../../../core/components/FormElements/InputField.vue';
import ButtonWrapper from '../../../core/components/FormElements/ButtonWrapper.vue';
import DocumentService, { Document } from '../Services/DocumentService';
import { useToastStore } from '../../../core/Store/toastStore';
import ToastComponent from '../../../core/components/ToastComponent.vue';
export default defineComponent({
  components: {
    MainSection,
    FormWrapper,
    FormDivider,
    InputField,
    ButtonWrapper,
    ToastComponent,
  },

  data() {
    return {
      documentService: new DocumentService(),
      toastStore: useToastStore(),
      formData: {
        project_id: Number(this.$route.params.id),
        document: {} as File,
      } as Document,
    };
  },

  methods: {
    async handleSubmit() {
      console.log(this.$route.params.id);
      try {
        const formData = new FormData();
        formData.append('project_id', String(this.formData.project_id));
        formData.append('document', this.formData.document);
        await this.documentService.createDocument(
          this.formData.project_id,
          formData
        );
        this.toastStore.displayToastMessage({
          toastMessage: 'Uspješno ste kreirali dokument!',
          isError: false,
        });
        this.$router.push({
          name: 'projectDetails',
          params: { id: this.formData.project_id },
        });
      } catch (error) {
        this.toastStore.displayToastMessage({
          toastMessage: error,
          isError: true,
        });
      }
    },
    handleFileSubmit(e: any) {
      this.formData.document = e.target.files[0];
    },
  },
});
</script>
<style scoped></style>
