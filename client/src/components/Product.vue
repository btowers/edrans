<template>
  <div class="column productDetail">
    <div class="row">
      <div class="col-6 q-pa-sm">
        <q-carousel animated thumbnails v-model="slide" arrows infinite>
          <q-carousel-slide
            v-for="(slide, index) in productDetails.fotos"
            :key="slide"
            :name="index + 1"
            :img-src="'https://coderhouse-ecommerce.s3.amazonaws.com/' + slide"
          ></q-carousel-slide>
        </q-carousel>
      </div>
      <div class="col-6 q-pa-sm column justify-between">
        <div>
          <div class="text-h4">{{ productDetails.nombre }}</div>
          <div class="text-h6">{{ formattedPrice }}</div>
          <div>{{ productDetails.stock + " un. disponibles" }}</div>
          <q-rating v-model="rating" size="2em" icon="star" />
        </div>
        <div class="row" v-if="isLoggedIn">
          <div>
            <q-input
              v-model.number="qty"
              type="number"
              :rules="[
                (val) =>
                  val <= this.productDetails.stock || 'No hay stock suficiente',
                (val) => val > 0 || 'La cantidad debe ser mayor a 0',
              ]"
              outlined
              dense
              style="max-width: 120px"
              suffix="un."
              class="q-mr-sm"
            />
          </div>
          <div>
            <q-btn
              :disable="loading || qty <= 0 || qty > productDetails.stock"
              :loading="loading"
              icon="add_shopping_cart"
              color="primary"
              label="Agregar"
              @click="addToCart"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="column q-pa-sm">
      <div class="text-h6">Descripción</div>
      <div>{{ productDetails.descripcion }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Product",
  data() {
    return {
      loading: false,
      slide: 1,
      rating: 4,
      qty: 1,
      productDetails: {
        nombre: "",
        descripcion: "",
        categoria: "",
        precio: 0,
        stock: 0,
        fotos: [],
        id: "",
      },
    };
  },

  created() {
    this.getProductDetails();
  },

  computed: {
    isLoggedIn() {
      return this.$q.cookies.get("token") !== null;
    },

    formattedPrice() {
      return this.productDetails.precio.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      });
    },
  },

  methods: {
    getProductDetails() {
      this.$axios({
        method: "GET",
        url: "/api/products/" + this.$route.params.id,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.$q.cookies.get("token"),
        },
      })
        .then((response) => {
          this.productDetails = response.data.data;
        })
        .catch((error) => {
          this.$q.notify({
            position: "bottom-right",
            color: "negative",
            message: "Error al obtener los datos del producto",
          });
        });
    },

    addToCart() {
      this.loading = true;
      const cartItem = {
        product: this.productDetails.id,
        qty: this.qty,
      };
      this.$axios({
        method: "PUT",
        url: "/api/cart/add",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.$q.cookies.get("token"),
        },
        data: cartItem,
      })
        .then(() => {
          this.loading = false;
          this.getProductDetails();
          this.$q.notify({
            position: "bottom-right",
            color: "positive",
            message: "Producto agregado al carrito",
          });
        })
        .catch((error) => {
          this.loading = false;
          this.$q.notify({
            position: "bottom-right",
            color: "negative",
            message: "Error al agregar al carrito",
          });
        });
    },
  },
};
</script>
