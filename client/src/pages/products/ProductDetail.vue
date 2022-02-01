<template>
  <q-page padding class="column items-center">
    <back-button />
    <product />
  </q-page>
</template>

<script>
import Product from "src/components/Product.vue";
import BackButton from "src/components/BackButton.vue";
export default {
  name: "ProductDetailPage",
  components: { Product, BackButton },
};
</script>
