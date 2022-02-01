<template>
  <q-header elevated class="bg-white text-grey-8" height-hint="64">
    <q-toolbar class="GNL__toolbar">
      <q-btn
        v-if="isLoggedIn"
        flat
        dense
        round
        @click="toggleLeftDrawer"
        aria-label="Menu"
        icon="menu"
        class="q-mr-sm"
      />

      <q-toolbar-title
        v-if="$q.screen.gt.xs"
        shrink
        class="row items-center no-wrap"
      >
        <span class="q-ml-sm">Edrans Challenge</span>
      </q-toolbar-title>

      <q-space />

      <div class="q-gutter-sm row items-center no-wrap">
        <q-btn round flat>
          <q-menu transition-show="jump-down" transition-hide="jump-up">
            <q-list style="min-width: 100px">
              <q-item clickable v-if="isLoggedIn">
                <q-item-section @click="this.$router.push('/profile')">
                  Mi Cuenta
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-if="isLoggedIn">
                <q-item-section @click="logout">Salir</q-item-section>
              </q-item>
              <q-item clickable v-else>
                <q-item-section @click="this.$router.push('/login')">
                  Ingresar
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          <q-avatar size="26px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>
<script>
// This is the header of the Main Layout
import { mapMutations } from "vuex";
export default {
  name: "LayoutHeader",
  computed: {
    isLoggedIn() {
      return this.$q.cookies.get("token") !== null;
    },
  },
  methods: {
    ...mapMutations({
      setAdmin: "user/setAdmin",
      toggleLeftDrawer: "layout/toggleLeftDrawer",
    }),
    logout() {
      this.$q.cookies.remove("token");
      this.setAdmin({ admin: null });
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="sass">
.GNL
  &__toolbar
    height: 64px
  &__toolbar-input
    width: 55%
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      .q-icon
        color: #5f6368
    .q-item__label
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>
