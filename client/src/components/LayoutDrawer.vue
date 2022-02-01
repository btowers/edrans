<template>
  <q-drawer
    v-if="isLoggedIn"
    v-model="leftDrawer"
    show-if-above
    bordered
    class="bg-white"
    :width="280"
  >
    <q-scroll-area class="fit">
      <q-list padding class="text-grey-8">
        <q-item
          class="GNL__drawer-item"
          v-ripple
          v-for="link in links"
          :key="link.text"
          :to="link.to"
          clickable
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script>
import { mapState } from "vuex";
// This is a description of the component
export default {
  name: "LayoutDrawer",
  props: {
    links: {
      type: [{ text: String, to: String, icon: String }],
      default: () => [],
    },
  },
  computed: {
    ...mapState({
      leftDrawer: (state) => state.layout.leftDrawer,
    }),
    isLoggedIn() {
      return this.$q.cookies.get("token") !== null;
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
