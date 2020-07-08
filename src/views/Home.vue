<template>
  <div class="page page--home">
    <section>
      <div class="container">
        <p>Quotes added</p>
        <div class="progress-bar">
          <div class="progress-bar__line" :style="progressBarWidth">{{ Quotes.length }}/{{ quotesLimit }}</div>
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
            <button type="submit" class="btn btn-primary mt-2 ml-auto mr-auto" :disabled="qoutesFilled">Add Quote</button>
          </form>
        </ValidationObserver>

        <transition-group name="slide" class="row" v-if="Quotes.length">
          <div class="col-md-3" v-for="(card, i) in Quotes" :key="i">
            <Card :data="card" @click.native="deleteQuoteHandler(card.id)" />
          </div>
        </transition-group>

        <div v-else class="alert alert-primary" role="alert">Цитат нет</div>
        
        <div class="alert alert-danger mt-2" role="alert" v-if="ErrorState">
          Не запущен json-server, запустите команды npm i -g json-server и npm run serve
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
      Quotes: 'app/Quotes',
      ErrorState: 'app/ErrorState'
    }),

    progressBarWidth() {
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
  }
}
</script>
<style lang="scss" scoped>
.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 0.5s;
}

.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 0.5s;
  opacity: 0;
  position: absolute;
}

.slide-move {
  transition: transform 1s;
}

@keyframes slide-in {
  from {
    transform: translateX(20px);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(20px);
  }
}

section {
  padding: 30px 0;
}

.progress-bar {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  &__line {
    font-family: Arial, Helvetica, sans-serif;
    background-color: #007bff;
    transition: 0.8s width ease;
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
  outline: none;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 0.25rem;
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
