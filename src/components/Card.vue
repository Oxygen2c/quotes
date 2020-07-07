<template>
  <div class="card">
    {{ data.text }}
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../public/styles/base/_variables';
.card {
  border: 2px solid rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
  margin: 10px 0;
  font-family: $f-main-r;
  cursor: pointer;
  font-size: 40px;
}
</style>
