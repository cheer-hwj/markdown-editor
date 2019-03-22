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
      state.words = []
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

// 段落块
const paralines = {
  namespaced: true,
  state: {
    paras: []
  },
  mutations: {
    addpara(state, payload) {
      state.paras.push(payload)
    },
    clearpara(state) {
      state.paras = []
    }
  }
}
const rules = {
  // 标记的类型 0:around, 1: front, 2: insert data, 3: insert mark
  bold: {
    mark: '**',
    bg: 'b',
    title: '加粗',
    type: 0
  },
  em: {
    mark: '*',
    bg: 'I',
    title: '斜体',
    type: 0
  },
  del: {
    mark: '~~',
    bg: 'del',
    title: '删除线',
    type: 0
  },
  underline: {
    mark: '++',
    bg: 'underline',
    title: '下划线',
    type: 0
  },
  inlinecode: {
    mark: '`',
    bg: 'mark',
    title: '标记',
    type: 0
  },
  h1: {
    mark: '#',
    bg: 'h1',
    title: '一级标题',
    type: 1
  },
  h2: {
    mark: '##',
    bg: 'h2',
    title: '二级标题',
    type: 1
  },
  h3: {
    mark: '###',
    bg: 'h3',
    title: '三级标题',
    type: 1
  },
  quote: {
    mark: '>',
    bg: 'Q',
    title: '引用',
    type: 1
  },
  ul: {
    mark: '+ ',
    bg: 'ul',
    title: '无序标题',
    type: 1
  },
  ol: {
    mark: '1. ',
    bg: 'ol',
    title: '有序标题',
    type: 1
  },
  code: {
    mark: '```',
    bg: 'code',
    title: '代码块',
    type: 2
  },
  hr: {
    mark: '\n***\n',
    bg: 'hr',
    title: '分割线',
    type: 3
  },
  link: {
    mark: '[text](href "title")',
    bg: 'link',
    title: '链接',
    type: 3
  },
  img: {
    mark: '![description](src "imgtitle")',
    bg: 'img',
    title: '图片',
    type: 3
  }
}

export default new Vuex.Store({
  state: {
    rules,
  },
  modules: {
    codelines,
    referlines,
    listlines,
    paralines,
    codetype,
    linktype
  },
})
