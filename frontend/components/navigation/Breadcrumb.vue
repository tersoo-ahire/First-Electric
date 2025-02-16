<template>
  <section>
    <div class="d-flex align-baseline">
      <v-icon color="secondary" size="38">mdi-{{ icon }}</v-icon>

      <div class="breadcrumb__title secondary--text">{{ title }}</div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.breadcrumb__title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-left: 8px;
}
</style>

<script>
export default {
  props: ['icon', 'title']
}
</script>

