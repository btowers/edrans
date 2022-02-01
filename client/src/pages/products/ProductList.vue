<template>
  <q-page padding class="column items-center">
    <div class="productList">
      <q-table
        grid
        :rows="items"
        :columns="columns"
        row-key="name"
        hide-header
        :pagination="pagination"
        :loading="loading"
        no-data-label="No se encontraron productos..."
      >
        <template v-slot:top-left v-if="user.isAdmin">
          <q-btn dense flat color="primary" @click="newProduct">
            Crear producto
          </q-btn>
        </template>
        <template v-slot:item="props">
          <product-card :item="props" @reloadProducts="getProducts" />
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import ProductCard from "src/components/ProductCard.vue";

import { mapState } from "vuex";

export default {
  name: "ProductListPage",
  components: {
    ProductCard,
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 50,
      },
      priceFilter: "Todos",
      priceOptions: ["Todos", "0 - 500", "500 - 2000"],
      stockFilter: "Todos",
      stockOptions: ["Todos", "0 - 500", "500 - 2000"],
      loading: false,
      columns: [
        {
          name: "nombre",
          label: "Nombre",
          field: "nombre",
          align: "left",
          required: true,
          sortable: true,
        },
        {
          name: "descripcion",
          align: "center",
          label: "Descripción",
          field: "descripcion",
          sortable: true,
        },
        {
          name: "precio",
          label: "Precio",
          field: "precio",
          format: (val) => `$ ${val}`,
          sortable: true,
        },
        {
          name: "stock",
          label: "Stock",
          field: "stock",
          format: (val) => `${val} un.`,
          sortable: true,
        },
      ],
      items: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.getProducts();
  },

  methods: {
    getProducts() {
      this.loading = true;
      this.$axios({
        method: "GET",
        url: "/api/products/",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.$q.cookies.get("token"),
        },
      }).then((response) => {
        this.items = response.data.data;
        this.loading = false;
      });
    },
    newProduct() {
      this.$router.push("/product/new");
    },
  },
};
</script>
<style scoped>
.productList {
  width: 100%;
  max-width: 1268px;
}
</style>
