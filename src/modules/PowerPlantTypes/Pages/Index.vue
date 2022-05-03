<template>
  <toast-component
    :show-toast="toastStore.showToast"
    :message="toastStore.toastMessage"
    :isError="toastStore.isError"
    @close-toast="toastStore.showToast = false"
  />
  <delete-modal
    delete-type="tipa elektrane"
    v-if="isDeleteModalOpened"
    :delete-info="deleteText"
    @toggle-modal="toggleDeleteModal"
    @cancel-action="toggleDeleteModal"
    @delete-action="deletePowerPlantType"
  />
  <main-section title="Tipovi elektrane">
    <loader v-if="isLoading" />
    <div v-else>
      <create-button-wrapper route-name="createPowerPlantType" />
      <dynamic-table
        :table-headers="tableHeaders"
        title="Tipovi elektrane"
        :table-data="powerPlantTypes"
        @edit-method="editPowerPlantType"
        @delete-method="toggleDeleteModal"
      />
    </div>
  </main-section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import MainSection from '../../../core/components/MainSection.vue';
import DynamicTable from '../../../core/components/DynamicTable.vue';
import CreateButtonWrapper from '../../../core/components/CreateButtonWrapper.vue';
import Loader from '../../../core/components/Loader.vue';
import { useToastStore } from '../../../core/Store/toastStore';
import ToastComponent from '../../../core/components/ToastComponent.vue';
import Modal from '../../../core/components/Modal.vue';
import DeleteModal from '../../../core/components/DeleteModal.vue';
import PowerPlantTypeService, {
  PowerPlantType,
} from '../Services/PowerPlantTypeService';
export default defineComponent({
  components: {
    MainSection,
    DynamicTable,
    CreateButtonWrapper,
    Loader,
    ToastComponent,
    Modal,
    DeleteModal,
  },
  data() {
    return {
      powerPlantTypeService: new PowerPlantTypeService(),
      powerPlantTypes: [] as PowerPlantType[],
      toastStore: useToastStore(),
      isLoading: false,
      isDeleteModalOpened: false,
      deleteText: '',
      selectedPowerPlantType: {} as PowerPlantType,
      tableHeaders: {
        name: 'Ime',
      },
    };
  },

  async created() {
    this.isLoading = true;
    try {
      await this.getAllPowerPlantTypes();
    } catch (error) {
      this.toastStore.displayToastMessage({
        toastMessage: error,
        isError: true,
      });
    } finally {
      this.isLoading = false;
    }
  },

  methods: {
    async getAllPowerPlantTypes() {
      try {
        this.powerPlantTypes =
          await this.powerPlantTypeService.getAllPowerPlantTypes();
      } catch (error) {
        this.toastStore.displayToastMessage({
          toastMessage: error,
          isError: true,
        });
      }
    },

    editPowerPlantType(id: number) {
      this.$router.push({ name: 'editPowerPlantType', params: { id: id } });
    },

    async deletePowerPlantType() {
      if (this.selectedPowerPlantType.id) {
        try {
          await this.powerPlantTypeService.deletePowerPlantType(
            this.selectedPowerPlantType.id
          );
          this.toastStore.displayToastMessage({
            toastMessage: 'Tip elektrane uspješno obrisan!',
            isError: false,
          });
          await this.getAllPowerPlantTypes();
          this.toggleDeleteModal();
        } catch (error) {
          this.toastStore.displayToastMessage({
            toastMessage: error,
            isError: true,
          });
        }
      }
    },

    toggleDeleteModal(powerPLantType?: PowerPlantType) {
      this.isDeleteModalOpened = !this.isDeleteModalOpened;
      if (powerPLantType) {
        this.selectedPowerPlantType = powerPLantType;
        this.deleteText = powerPLantType.name;
      }
    },
  },
});
</script>
<style scoped></style>
