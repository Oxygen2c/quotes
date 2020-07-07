import { http } from '@/boot/axios'

export async function getQuotes({ commit }) {
  try {
    const { data } = await http.get('quotes')
    commit('setQuotes', data)
  } catch (e) {
    throw new Error('Ошибка getQuotes()')
  }
}

export async function addQuote({ commit }, post) {
  try {
    await http.post('quotes', post)
  } catch (e) {
    throw new Error('Ошибка getQuotes()')
  }
}

export async function deleteQuote({ commit }, id) {
  try {
    await http.delete(`quotes/${id}`)
  } catch (e) {
    throw new Error('Ошибка deleteQuote()')
  }
}
