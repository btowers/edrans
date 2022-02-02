<template>
  <q-page padding class="column items-center">
    <back-button />
    <div class="base-width">
      <page-title title="Crear Producto" />
      <q-card class="q-pa-md">
        <q-card-section horizontal>
          <q-card-section style="width: 100%">
            <div class="q-pa-md">
              <q-uploader
                @added="addFiles"
                @removed="removeFiles"
                @uploaded="uploadedFile"
                :factory="factoryFn"
                ref="uploader"
                label="Seleccionar imagenes"
                multiple
                hide-upload-btn
                max-file-size="5000000"
                :max-files="4"
                accept=".jpg, image/*"
                style="width: 100%; max-width: 453px; max-height: 500px"
              >
                <template v-slot:list="scope">
                  <q-list separator>
                    <q-item v-for="file in scope.files" :key="file.__key">
                      <q-item-section>
                        <q-item-label class="full-width ellipsis">
                          {{ file.name }}
                        </q-item-label>

                        <q-item-label caption>
                          Status: {{ file.__status }}
                        </q-item-label>

                        <q-item-label caption>
                          {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                        </q-item-label>
                      </q-item-section>

                      <q-item-section v-if="file.__img" thumbnail class="gt-xs">
                        <img :src="file.__img.src" />
                      </q-item-section>

                      <q-item-section top side>
                        <q-btn
                          class="gt-xs"
                          size="12px"
                          flat
                          dense
                          round
                          icon="delete"
                          @click="scope.removeFile(file)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </template>
              </q-uploader>
            </div>
          </q-card-section>
          <q-separator vertical />
          <q-card-section style="width: 100%">
            <div class="column justify-between" style="height: 600px">
              <div class="col">
                <q-form @reset="formReset" ref="formRef">
                  <q-input
                    :readonly="loading"
                    v-model="productDetails.nombre"
                    name="nombre"
                    ref="nombreRef"
                    label="Nombre"
                    lazy-rules
                    :rules="[
                      (val) => !!val || 'Campo requerido',
                      (val) =>
                        val.length > 3 ||
                        'El nombre debe tener al menos 4 caracteres',
                      (val) =>
                        val.length < 50 ||
                        'El nombre debe tener menos de 50 caracteres',
                    ]"
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
                    lazy-rules
                    :rules="[
                      (val) => !!val || 'Campo requerido',
                      (val) => val > 0 || 'El precio debe ser mayor a 0',
                      (val) =>
                        val < 1000000 || 'El precio debe ser menor a 1.000.000',
                    ]"
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
                    lazy-rules
                    :rules="[
                      (val) => !!val || 'Campo requerido',
                      (val) => val > 0 || 'El stock debe ser mayor a 0',
                      (val) => val < 1000 || 'El stock debe ser menor a 1.000',
                    ]"
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
                    :rules="[
                      (val) => !!val || 'Campo requerido',
                      (val) =>
                        val.length > 3 ||
                        'La descripción debe tener más de 3 caracteres',
                      (val) =>
                        val.length < 500 ||
                        'La descripción debe tener menos de 500 caracteres',
                    ]"
                  />
                </q-form>
              </div>
              <div class="col-auto">
                <div class="row justify-end q-gutter-sm">
                  <div>
                    <q-btn
                      :disable="loading"
                      flat
                      color="primary"
                      @click="this.$router.push('/')"
                    >
                      Cancelar
                    </q-btn>
                  </div>
                  <div>
                    <q-btn
                      :disable="loading"
                      :loading="loading"
                      color="primary"
                      label="Guardar"
                      @click="createProduct"
                    />
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import PageTitle from "../../components/PageTitle.vue";
import BackButton from "../../components/BackButton.vue";
export default {
  name: "NewProductPage",
  components: {
    PageTitle,
    BackButton,
  },
  data() {
    return {
      counter: 0,
      loading: false,
      slide: 1,
      qty: 1,
      productDetails: {
        id: "",
        nombre: "",
        descripcion: "",
        categoria: "",
        precio: "",
        stock: "",
        fotos: [],
      },
    };
  },

  methods: {
    createProduct() {
      if (this.isInvalidForm()) {
        return;
      }
      this.loading = true;
      const newProduct = {
        nombre: this.productDetails.nombre,
        descripcion: this.productDetails.descripcion,
        categoria: this.productDetails.categoria,
        precio: this.productDetails.precio,
        stock: this.productDetails.stock,
      };
      this.$axios({
        method: "POST",
        url: "/api/products",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.$q.cookies.get("token"),
        },
        data: newProduct,
      })
        .then((response) => {
          this.productDetails = response.data.data;
          if (this.counter > 0) this.$refs.uploader.upload();
          else this.doneMessage();
        })
        .catch(() => {
          this.loading = false;
          this.$q.notify({
            position: "bottom-right",
            color: "negative",
            message: `Error al crear el producto`,
          });
        });
    },

    addFiles(files) {
      this.counter = this.counter + files.length;
    },

    removeFiles(files) {
      this.counter = this.counter - files.length;
    },

    uploadedFile() {
      this.counter--;
      if (this.counter <= 0) this.doneMessage();
    },

    doneMessage() {
      this.loading = false;
      this.$refs.formRef.reset();
      this.$refs.uploader.removeUploadedFiles();
      this.counter = 0;
      this.$q.notify({
        position: "bottom-right",
        color: "positive",
        message: "Producto creado con éxito",
      });
    },

    formReset() {
      this.productDetails.id = "";
      this.productDetails.nombre = "";
      this.productDetails.descripcion = "";
      this.productDetails.categoria = "";
      this.productDetails.precio = "";
      this.productDetails.stock = "";
      this.productDetails.fotos = [];
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
            "Content-Type": "application/json",
            Accept: "application/json",
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
