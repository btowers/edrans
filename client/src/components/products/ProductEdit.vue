<template>
  <div class="column items-center">
    <back-button />
    <div class="base-width">
      <page-title title="Editar Producto" />
      <q-card class="q-pa-md">
        <q-card-section :horizontal="$q.screen.gt.md">
          <q-card-section clas="col" style="width: 100%">
            <div class="column justify-between" style="height: 600px">
              <div class="col">
                <q-form ref="formRef">
                  <q-input
                    :readonly="loading"
                    v-model="productDetails.nombre"
                    name="nombre"
                    ref="nombreRef"
                    label="Nombre"
                    :rules="[(val) => !!val || 'Campo requerido']"
                  />
                  <q-input
                    :readonly="loading"
                    class="my-input"
                    v-model="productDetails.precio"
                    prefix="$"
                    type="precio"
                    name="precio"
                    ref="precioRef"
                    label="Precio"
                    :rules="[(val) => !!val || 'Campo requerido']"
                  />
                  <q-input
                    :readonly="loading"
                    class="my-input"
                    v-model="productDetails.stock"
                    suffix="un."
                    type="stock"
                    name="stock"
                    ref="stockRef"
                    label="Stock"
                    :rules="[(val) => !!val || 'Campo requerido']"
                  />
                  <q-input
                    :readonly="loading"
                    v-model="productDetails.categoria"
                    type="categoria"
                    name="categoria"
                    ref="categoriaRef"
                    label="Categoría"
                    :rules="[(val) => !!val || 'Campo requerido']"
                  />
                  <q-input
                    :readonly="loading"
                    v-model="productDetails.descripcion"
                    type="textarea"
                    name="descripcion"
                    ref="descripcionRef"
                    label="Descripción"
                    :rules="[(val) => !!val || 'Campo requerido']"
                  />
                </q-form>
              </div>
              <div class="col-auto">
                <div class="row justify-end q-gutter-sm">
                  <div>
                    <q-btn flat color="primary" @click="cancel">
                      Cancelar
                    </q-btn>
                  </div>
                  <div>
                    <q-btn
                      color="primary"
                      label="Guardar"
                      :loading="loading"
                      @click="updateProduct"
                    />
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>

          <q-separator vertical v-if="$q.screen.gt.md" />

          <q-card-section clas="col" style="width: 100%">
            <div class="column justify-between" style="height: 600px">
              <div class="row justify-start q-gutter-md">
                <div
                  v-for="image in productDetails.fotos"
                  :key="image"
                  style="width: 150px"
                >
                  <q-img
                    :src="
                      'https://coderhouse-ecommerce.s3.amazonaws.com/' + image
                    "
                    style="height: 140px; max-width: 150px"
                    fit="contain"
                    no-native-menu
                  >
                    <q-btn
                      class="absolute all-pointer-events"
                      :style="{ top: '8', right: '8' }"
                      icon="close"
                      color="red"
                      round
                      @click="removeImage(image)"
                    />
                  </q-img>
                </div>
              </div>
              <div class="col-auto" v-if="productDetails.fotos.length < 5">
                <div class="row justify-end">
                  <q-uploader
                    label="Agregar imagen"
                    no-thumbnails
                    :factory="factoryFn"
                    @uploaded="getProductDetails"
                    style="width: 100%"
                    accept=".jpg, image/*"
                    :max-files="1"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "../core/PageTitle.vue";
import BackButton from "../core/BackButton.vue";

export default {
  name: "EditProductPage",
  components: {
    PageTitle,
    BackButton,
  },
  data() {
    return {
      loading: false,
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

  methods: {
    getProductDetails() {
      this.loading = true;
      this.$axios({
        method: "GET",
        url: "/api/products/" + this.$route.params.id,
        headers: {
          Authorization: "Bearer " + this.$q.cookies.get("token"),
        },
      })
        .then((response) => {
          this.productDetails = response.data.data;
          this.loading = false;
        })
        .catch((error) => {
          this.$q.notify({
            position: "bottom-right",
            color: "negative",
            message: "Error al obtener los datos del producto",
          });
        });
    },

    updateProduct() {
      if (this.isInvalidForm()) {
        return;
      }
      this.loading = true;
      const updatedProduct = {
        nombre: this.productDetails.nombre,
        descripcion: this.productDetails.descripcion,
        categoria: this.productDetails.categoria,
        precio: this.productDetails.precio,
        stock: this.productDetails.stock,
      };
      this.$axios({
        method: "PUT",
        url: "/api/products/" + this.$route.params.id,
        headers: {
          Authorization: "Bearer " + this.$q.cookies.get("token"),
        },
        data: updatedProduct,
      })
        .then(() => {
          this.loading = false;
          this.$router.push("/");
          this.$q.notify({
            position: "bottom-right",
            color: "positive",
            message: "Producto actualizado",
          });
        })
        .catch((error) => {
          this.loading = false;
          this.$q.notify({
            position: "bottom-right",
            color: "negative",
            message: `Error al actualizar el producto`,
          });
        });
    },

    removeImage(image) {
      this.$axios({
        method: "PUT",
        url: "api/image",
        headers: {
          Authorization: "Bearer " + this.$q.cookies.get("token"),
        },
        data: {
          filename: image,
          productId: this.productDetails.id,
        },
      })
        .then(() => {
          this.getProductDetails();
          this.$q.notify({
            position: "bottom-right",
            color: "positive",
            message: "Se eliminó la imagen",
          });
        })
        .catch((error) => {
          this.$q.notify({
            position: "bottom-right",
            color: "negative",
            message: `Error al eliminar la imagen`,
          });
        });
    },

    cancel() {
      this.$router.push("/");
    },

    isInvalidForm() {
      this.$refs.formRef.validate();
      if (
        this.$refs.nombreRef.hasError ||
        this.$refs.precioRef.hasError ||
        this.$refs.stockRef.hasError ||
        this.$refs.categoriaRef.hasError ||
        this.$refs.descripcionRef.hasError
      )
        return true;
      else return false;
    },

    factoryFn(file) {
      const re = /(?:\.([^.]+))?$/;
      const type = re.exec(file[0].name)[1];
      return new Promise((resolve, reject) => {
        this.$axios({
          method: "POST",
          url: "api/image/presignedurl",
          headers: {
            Authorization: "Bearer " + this.$q.cookies.get("token"),
          },
          data: {
            productId: this.productDetails.id,
            type,
          },
        })
          .then((response) => {
            const url = response.data.data;
            resolve({
              url,
              method: "PUT",
              sendRaw: true,
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
</script>
<style lang="css" scoped>
.my-input {
  width: 50%;
}
</style>
