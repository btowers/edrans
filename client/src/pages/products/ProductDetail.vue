<template>
  <q-page padding class="flex justify-center">
    <product />
  </q-page>
</template>

<script>
import Product from "src/components/Product.vue";
export default {
  name: "ProductDetailPage",
  components: { Product },
};
</script>
