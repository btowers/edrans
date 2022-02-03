<template>
  <div class="q-mb-md">
    <div class="text-h5 text-weight-light">{{ title }}</div>
  </div>
</template>
<script>
export default {
  name: "Title",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
