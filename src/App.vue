<template>
  <div id="app">
    <main>
      <transition appear name="fade">
        <router-view />
      </transition>
    </main>
  </div>
</template>
<script>
export default {
  components: {}
}
</script>
<style lang="scss" scoped>
main {
  height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
