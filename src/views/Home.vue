<template>
  <div class="page page--home">
    {{ Quotes }}
    <section>
      <div class="container">
        <p>Quotes added</p>
        <div class="progress-bar">
          <div class="progress-bar__line" :style="lineWidth">4/10</div>
        </div>

        <form @submit.prevent="createQuote">
          <p>Quotes</p>
          <textarea name="" class="text-area" v-model="text"></textarea>
          <button type="submit" class="btn btn-primary mt-2 ml-auto mr-auto">Primary</button>
        </form>

        <div class="row">
          <div class="col-md-3" v-for="(card, i) in Quotes" :key="i">
            <Card :data="card" @click.native="deleteQuoteHandler(card.id)" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Card from '@/components/Card.vue'
export default {
  name: 'Home',

  components: { Card },

  data() {
    return {
      text: null
    }
  },

  computed: {
    ...mapGetters({
      Quotes: 'app/Quotes'
    }),

    lineWidth() {
      return {
        width: '90%'
      }
    }
  },

  methods: {
    ...mapActions({
      addQuote: 'app/addQuote',
      deleteQuote: 'app/deleteQuote',
      getQuotes: 'app/getQuotes'
    }),

    ...mapMutations({}),

    resetForm() {
      this.text = null
    },

    async createQuote() {
      await this.addQuote({ text: this.text })
      await this.resetForm()
      await this.getQuotes()
    },

    async deleteQuoteHandler(id) {
      await this.deleteQuote(id)
      await this.getQuotes()
    }
  },

  mounted() {}
}
</script>
