<template>
  <div class="page page--home">
    <button type="button" class="btn btn-primary">Primary</button>
    <div class="progress-bar">
      <div class="progress-bar__line">4/10</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Home',

  components: {},

  data() {
    return {}
  },

  computed: {
    ...mapGetters({})
  },

  methods: {
    ...mapActions({}),

    ...mapMutations({})
  },

  mounted() {}
}
</script>
