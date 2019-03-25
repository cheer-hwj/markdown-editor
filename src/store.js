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
    id: 0,
    mark: '**',
    bg: 'B',
    title: '加粗',
    type: 0
  },
  em: {
    id: 1,
    mark: '*',
    bg: 'I',
    title: '斜体',
    type: 0
  },
  del: {
    id: 2,
    mark: '~~',
    bg: 'del',
    title: '删除线',
    type: 0
  },
  underline: {
    id: 3,
    mark: '++',
    bg: 'underline',
    title: '下划线',
    type: 0
  },
  inlinecode: {
    id: 4,
    mark: '`',
    bg: 'mark',
    title: '标记',
    type: 0
  },
  h1: {
    id: 5,
    mark: '#',
    bg: 'h1',
    title: '一级标题',
    type: 1
  },
  h2: {
    id: 6,
    mark: '##',
    bg: 'h2',
    title: '二级标题',
    type: 1
  },
  h3: {
    id: 7,
    mark: '###',
    bg: 'h3',
    title: '三级标题',
    type: 1
  },
  quote: {
    id: 8,
    mark: '>',
    bg: 'Q',
    title: '引用',
    type: 1
  },
  ul: {
    id: 9,
    mark: '+ ',
    bg: 'ul',
    title: '无序标题',
    type: 1
  },
  ol: {
    id: 10,
    mark: '1. ',
    bg: 'ol',
    title: '有序标题',
    type: 1
  },
  code: {
    id: 11,
    mark: '```',
    bg: 'code',
    title: '代码块',
    type: 2
  },
  hr: {
    id: 12,
    mark: '\n\n***\n',
    bg: 'hr',
    title: '分割线',
    type: 3
  },
  link: {
    id: 13,
    mark: '[text](href "title")',
    bg: 'link',
    title: '链接',
    type: 3
  },
  img: {
    id: 14,
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
