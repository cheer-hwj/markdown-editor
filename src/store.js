import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 代码块
const codelines = {
  namespaced: true,
  state: {
    lines: [],
    blocks: []
  },
  mutations: {
    addline(state, payload) {
      state.lines.push(payload)
    },
    addblock(state, payload) {
      state.blocks.push(payload)
    },
    clearline(state) {
      state.lines = []
    },
    clearblock(state) {
      state.blocks = []
    }
  },
}

// 引用块
const referlines = {
  namespaced: true,
  state: {
    lines: [],
  },
  mutations: {
    addline(state, payload) {
      state.lines.push(payload)
    },
    clearline(state) {
      state.lines = []
    }
  },
}

export default new Vuex.Store({
  modules: {
    codelines,
    referlines,
  },
})
