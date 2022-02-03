<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <layout-header />
    <layout-drawer :links="links" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import LayoutHeader from "src/components/core/Header.vue";
import LayoutDrawer from "src/components/core/Drawer.vue";

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
