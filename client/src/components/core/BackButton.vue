<template>
  <div class="row justify-start back-button">
    <div class="col-auto">
      <q-btn
        @click="goBack"
        icon="arrow_back"
        flat
        label="Atras"
        color="primary"
        class="q-pa-md"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "BackButton",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
