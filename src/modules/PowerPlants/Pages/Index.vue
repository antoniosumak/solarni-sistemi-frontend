<template>
  <toast-component
    :show-toast="toastStore.showToast"
    :message="toastStore.toastMessage"
    :isError="toastStore.isError"
    @close-toast="toastStore.showToast = false"
  />
  <delete-modal
    delete-type="elektrana"
    v-if="isDeleteModalOpened"
    :delete-info="deleteText"
    @toggle-modal="toggleDeleteModal"
    @cancel-action="toggleDeleteModal"
    @delete-action="deletePowerPlant"
  />
  <main-section title="Elektrane">
    <loader v-if="isLoading" />
    <div v-else>
      <create-button-wrapper route-name="createPowerPlant" />
      <dynamic-table
        :table-headers="tableHeaders"
        :table-data="powerPlants"
        @edit-method="editPowerPlant"
        @delete-method="toggleDeleteModal"
        title="Elektrane"
      />
    </div>
  </main-section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import MainSection from '../../../core/components/MainSection.vue';
import DynamicTable from '../../../core/components/DynamicTable.vue';
import CreateButtonWrapper from '../../../core/components/CreateButtonWrapper.vue';
import PowerPlantService, { PowerPlant } from '../Services/PowerPlantService';
import ToastComponent from '../../../core/components/ToastComponent.vue';
import { useToastStore } from '../../../core/Store/toastStore';
import Loader from '../../../core/components/Loader.vue';
import DeleteModal from '../../../core/components/DeleteModal.vue';
export default defineComponent({
  components: {
    MainSection,
    DynamicTable,
    CreateButtonWrapper,
    ToastComponent,
    Loader,
    DeleteModal,
  },

  data() {
    return {
      powerPlantService: new PowerPlantService(),
      powerPlants: [] as PowerPlant[],
      selectedPowerPlant: {} as PowerPlant,
      toastStore: useToastStore(),
      isLoading: false,
      isDeleteModalOpened: false,
      deleteText: '',
      tableHeaders: {
        name: 'Naziv',
        power: 'Snaga',
        price: 'Cijena',
        powerPlantTypeName: 'Tip elektrane',
      },
    };
  },

  async created() {
    this.isLoading = true;
    try {
      await this.getAllPowerPlants();
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
    async getAllPowerPlants() {
      try {
        this.powerPlants = await this.powerPlantService.getAllPowerPlants();
      } catch (error) {
        this.toastStore.displayToastMessage({
          toastMessage: error,
          isError: true,
        });
      }
    },

    editPowerPlant(id: number) {
      this.$router.push({ name: 'editPowerPlant', params: { id: id } });
    },

    toggleDeleteModal(powerPlant?: PowerPlant) {
      this.isDeleteModalOpened = !this.isDeleteModalOpened;
      if (powerPlant) {
        this.selectedPowerPlant = powerPlant;
        this.deleteText = powerPlant.name;
      }
    },

    async deletePowerPlant() {
      if (this.selectedPowerPlant.id) {
        try {
          await this.powerPlantService.deletePowerPlant(
            this.selectedPowerPlant.id
          );
          this.toastStore.displayToastMessage({
            toastMessage: 'Elektrana uspješno obrisana!',
            isError: false,
          });
          await this.getAllPowerPlants();
          this.toggleDeleteModal();
        } catch (error) {
          this.toastStore.displayToastMessage({
            toastMessage: error,
            isError: true,
          });
        }
      }
    },
  },
});
</script>
<style scoped></style>
