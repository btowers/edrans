<template>
  <div class="column items-center">
    <back-button />
    <div class="base-width">
      <page-title title="Carrito" />
      <div class="cartTable">
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="name"
          :loading="loading"
          no-data-label="No se encontraron productos en el carrito..."
        >
          <template v-slot:body="props">
            <q-tr>
              <q-td>
                <q-avatar>
                  <img
                    :src="
                      'https://coderhouse-ecommerce.s3.amazonaws.com/' +
                      props.row.product.fotos[0]
                    "
                  />
                </q-avatar>
              </q-td>
              <q-td>
                <div style="max-width: 150px" class="ellipsis">
                  {{ props.row.product.nombre }}
                </div>
              </q-td>
              <q-td>
                <div style="max-width: 250px" class="ellipsis">
                  {{ props.row.product.descripcion }}
                </div>
              </q-td>
              <q-td>{{ props.row.qty }}</q-td>
              <q-td>{{ formattedPrice(props.row.product.precio) }}</q-td>
              <q-td>
                <q-btn
                  @click="removeItemfromCart(props.row)"
                  flat
                  round
                  color="red"
                  icon="delete"
                />
              </q-td>
            </q-tr>
          </template>
          <template v-slot:bottom-row>
            <q-tr v-if="rows.length > 0">
              <q-td colspan="100%">
                <sapn> <b>Total:</b> $ {{ total }}</sapn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <div style="width: 100% flex justify-right">
          <q-btn
            class="q-mt-md"
            @click="buyCart"
            color="primary"
            label="Comprar"
            :disable="btnLoading"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageTitle from "./core/PageTitle.vue";
import BackButton from "./core/BackButton.vue";

export default {
  name: "Cart",
  components: {
    PageTitle,
    BackButton,
  },
  data() {
    return {
      btnLoading: false,
      loading: false,
      total: 0,
      rows: [],
      columns: [
        {
          name: "imagen",
          required: true,
          label: "",
          align: "left",
          sortable: false,
        },
        {
          name: "nombre",
          required: true,
          label: "Nombre",
          align: "left",
        },
        {
          name: "descripcion",
          label: "Descripción",
          align: "left",
        },
        {
          name: "qty",
          label: "Cantidad",
          field: "qty",
          align: "left",
        },
        {
          name: "precio",
          label: "Precio",
          align: "left",
        },
        {
          name: "remove",
          label: "",
        },
      ],
    };
  },
  created() {
    this.getCart();
  },

  methods: {
    async getCart() {
      this.loading = true;
      this.$axios({
        method: "GET",
        url: "/api/cart",
        headers: {
          Authorization: "Bearer " + this.$q.cookies.get("token"),
        },
      })
        .then((res) => {
          this.rows = res.data.data.products;
          this.total = res.data.data.products.reduce((acc, cur) => {
            return acc + cur.product.precio * cur.qty;
          }, 0);
          this.loading = false;
        })
        .catch((err) => {
          this.rows = [];
          this.loading = false;
        });
    },

    buyCart() {
      this.btnLoading = true;
      this.$axios({
        method: "GET",
        url: "/api/cart/submit",
        headers: {
          Authorization: "Bearer " + this.$q.cookies.get("token"),
        },
      })
        .then(() => {
          this.$q.notify({
            position: "bottom-right",
            color: "positive",
            message: "Compra realizada con éxito",
          });
          this.btnLoading = false;
          this.getCart();
        })
        .catch((err) => {
          this.$q.notify({
            position: "bottom-right",
            color: "negative",
            message: "Error al realizar la compra",
          });
          this.btnLoading = false;
        });
    },

    removeItemfromCart(item) {
      this.btnLoading = true;
      const cartItem = {
        product: item.product.id,
        qty: item.qty,
      };
      this.$axios({
        method: "POST",
        url: "/api/cart/delete",
        headers: {
          Authorization: "Bearer " + this.$q.cookies.get("token"),
        },
        data: cartItem,
      })
        .then(() => {
          this.$q.notify({
            position: "bottom-right",
            color: "positive",
            message: "Producto eliminado con éxito",
          });
          this.btnLoading = false;
          this.getCart();
        })
        .catch((err) => {
          this.$q.notify({
            position: "bottom-right",
            color: "negative",
            message: "Error al eliminar el producto",
          });
          this.btnLoading = false;
        });
    },

    formattedPrice(price) {
      return price.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      });
    },
  },
};
</script>
<style scoped>
.cartTable {
  width: 100%;
  max-width: 1268px;
}
</style>
