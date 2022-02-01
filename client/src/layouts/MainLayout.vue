<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <layout-header />
    <layout-drawer :links="links" />
    <q-page-container>
      <transition>
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import LayoutHeader from "src/components/LayoutHeader.vue";
import LayoutDrawer from "src/components/LayoutDrawer.vue";

export default {
  name: "MainLayout",
  components: { LayoutHeader, LayoutDrawer },
  data() {
    return {
      links: [
        { icon: "home", text: "Inicio", to: "/" },
        { icon: "shopping_cart", text: "Carrito", to: "/cart" },
        { icon: "person_outline", text: "Perfil", to: "/profile" },
      ],
    };
  },
};
</script>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
