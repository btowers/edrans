<template>
  <q-layout>
    <q-page-container>
      <div class="myclass">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  name: "CleanLayout",
};
</script>
<style scoped>
.myclass {
  background-color: #fafafa;
}
</style>
