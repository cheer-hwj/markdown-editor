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

// 列表块
const listlines = {
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

// 行内标记代码
const codetype = {
  namespaced: true,
  state: {
    words: [],
  },
  mutations: {
    addword(state, payload) {
      state.words.push(payload)
    },
    clearword(state) {
      state.lines = []
    }
  },
}
// 链接和图片
const linktype = {
  namespaced: true,
  state: {
    links: []
  },
  mutations: {
    addlink(state, payload) {
      state.links.push(payload)
    },
    clearlink(state) {
      state.links = []
    }
  }
}

export default new Vuex.Store({
  modules: {
    codelines,
    referlines,
    listlines,
    codetype,
    linktype
  },
})
