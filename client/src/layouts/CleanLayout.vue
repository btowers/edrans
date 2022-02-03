<template>
  <q-layout>
    <q-page-container>
      <div class="greyBg">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "CleanLayout",
};
</script>
<style scoped>
.greyBg {
  background-color: #fafafa;
}
</style>
