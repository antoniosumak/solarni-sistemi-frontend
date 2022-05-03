<template>
  <form @submit.prevent="handleSubmit">
    <input
      name="productImage"
      id="productImage"
      type="file"
      @change="handleFileSubmit"
    />
    <button>Submit</button>
  </form>
  <img :src="`data:image/webp;base64,${nekaj}`" />
  <a :href="`data:application/pdf;base64, ${document}`" :download="name"
    >Document</a
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  components: {},
  data() {
    return {
      nekaj: '',
      document: '',
      name: '',
      formData: {
        code: '2234234',
        name: 'asdasd',
        price: '20.5',
        quantity: '5',
        description: 'asdasda',
        document: '',
      },
    };
  },

  async created() {
    const response = await axios.get('http://localhost:3005/api/products/1');
    this.nekaj = response.data.photo;

    const pdf = await axios.get('http://localhost:3005/api/documents/1');
    this.document = pdf.data[0].document;
    this.name = pdf.data[0].name;
  },
  methods: {
    async handleSubmit() {
      const fd = new FormData();
      // fd.append('code', this.formData.code);
      // fd.append('price', this.formData.price);
      // fd.append('quantity', this.formData.quantity);
      // fd.append('description', this.formData.description);
      // fd.append('productImage', this.formData.productImage);
      // await axios.post('http://localhost:3005/api/products', fd);

      fd.append('name', this.formData.code);
      fd.append('document', this.formData.document);
      fd.append('projectId', '1');

      await axios.post('http://localhost:3005/api/documents', fd);
    },

    handleFileSubmit(e: any) {
      console.log(e.target.files[0]);
      this.formData.document = e.target.files[0];
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
