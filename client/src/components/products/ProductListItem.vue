<template>
  <div class="col" style="width: 100%; max-width: 400px; min-width: 300px">
    <q-card class="product-card q-ma-sm">
      <div class="cursor-pointer" @click="openProduct">
        <div class="flex flex-center">
          <q-img
            :src="
              'https://coderhouse-ecommerce.s3.amazonaws.com/' +
              item.row.fotos[0]
            "
            style="width: 100%; max-width: 350px; height: 300px"
            fit="contain"
          >
            <template v-slot:error>
              <div
                class="absolute-full flex flex-center bg-blue-grey-14 text-white"
              >
                Producto sin imagen
              </div>
            </template>
          </q-img>
        </div>
        <q-card-section>
          <q-item-section>
            <q-item-label class="text-h6">{{ item.row.nombre }}</q-item-label>
            <q-item-label caption>{{ item.row.stock + " un." }}</q-item-label>
          </q-item-section>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">{{ formattedPrice }}</div>
          <div class="text-caption ellipsis text-grey">
            {{ item.row.descripcion }}
          </div>
        </q-card-section>
      </div>
      <q-separator />

      <q-card-actions v-if="user.isAdmin">
        <div class="row justify-end" style="width: 100%">
          <div class="col-auto">
            <q-btn
              flat
              round
              icon="mode_edit"
              color="primary"
              @click="editProduct"
            />
          </div>
          <div class="col-auto">
            <q-btn flat round icon="delete" color="red" @click="deleteDialog" />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProductListItem",
  props: ["item"],
  data() {
    return {
      stars: 4,
    };
  },
  computed: {
    ...mapState(["user"]),

    formattedPrice() {
      return this.item.row.precio.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      });
    },
  },

  methods: {
    openProduct() {
      this.$router.push({
        name: "ProductDetail",
        params: {
          id: this.item.row.id,
        },
      });
    },

    editProduct() {
      this.$router.push(`/product/edit/${this.item.row.id}`);
    },

    deleteDialog() {
      this.$q
        .dialog({
          title: "Eliminar producto",
          message: "¿Está seguro de eliminar este producto?",
          ok: "Eliminar",
          cancel: "Cancelar",
          persistent: true,
          persistentHint: "Presione ESC para cancelar",
        })
        .onOk(this.deleteProduct);
    },

    deleteProduct() {
      this.$axios({
        method: "DELETE",
        url: "/api/products/" + this.item.row.id,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.$q.cookies.get("token"),
        },
      })
        .then(() => {
          this.$q.notify({
            position: "bottom-right",
            color: "positive",
            message: "Producto eliminado",
          });
          this.$emit("reloadProducts");
        })
        .catch((error) => {
          this.$q.notify({
            position: "bottom-right",
            color: "negative",
            message: "Error al eliminar el producto",
          });
        });
    },
  },
};
</script>
