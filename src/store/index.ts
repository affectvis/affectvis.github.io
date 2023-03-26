import { createStore, Store } from 'vuex'
import { loadData, Format } from "@/assets/ts/preprocessing"
import { InjectionKey } from 'vue'

// define your typings for the store state
export interface State {
  pubs: Array<Format>
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
  state: {
    pubs: {} as Map<string, Format>
  },
  getters: {
  },
  mutations: {
    updatePubs(state, data) {
      state.pubs = data
    }
  },
  actions: {
    getData(state) {
      loadData("./data/info.json", "./data/summary.tsv").then((v) => {
        state.commit("updatePubs", v)
        console.log(v)
      })
    }
  },
  modules: {
  }
})
