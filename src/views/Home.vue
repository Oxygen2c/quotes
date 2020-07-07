<template>
  <div class="page page--home">
    <section>
      <div class="container">
        <p>Quotes added</p>
        <div class="progress-bar">
          <div class="progress-bar__line" :style="lineWidth">{{ Quotes.length }}/{{ quotesLimit }}</div>
        </div>

        <div class="alert alert-danger mt-2" role="alert" v-if="qoutesFilled">
          Для добавления новых цитат удалите одну из добавленных
        </div>

        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createQuote)" class="form">
            <p>Quotes</p>
            <ValidationProvider rules="required" v-slot="{ classes, errors }" name="quote">
              <div class="help-block" :class="classes">
                <textarea name="" class="text-area" v-model="text"></textarea>
                <span v-if="errors[0]" class="help-block__msg">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <button type="submit" class="btn btn-primary mt-2 ml-auto mr-auto" :disabled="qoutesFilled">Primary</button>
          </form>
        </ValidationObserver>

        <div class="row" v-if="Quotes.length">
          <div class="col-md-3" v-for="(card, i) in Quotes" :key="i">
            <Card :data="card" @click.native="deleteQuoteHandler(card.id)" />
          </div>
        </div>

        <div v-else class="alert alert-primary" role="alert">Цитат нет</div>

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
      text: null,
      quotesLimit: 10
    }
  },

  computed: {
    ...mapGetters({
      Quotes: 'app/Quotes'
    }),

    lineWidth() {
      return {
        width: `${(this.Quotes.length * 100) / this.quotesLimit}%`
      }
    },

    qoutesFilled() {
      return this.Quotes.length === this.quotesLimit
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
      this.text = ''
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
<style lang="scss" scoped>
.progress-bar {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  &__line {
    font-family: Arial, Helvetica, sans-serif;
    background-color: #007bff;
  }
}

.form {
  max-width: 500px;
  margin: 40px auto;
}

.text-area {
  display: block;
  width: 100%;
  min-height: 120px;
  padding: 20px;
}

.btn {
  display: block;
}

.help-block {
  &__msg {
    color: red;
    display: block;
    margin: 5px auto 10px;
    text-align: center;
  }
}
</style>
