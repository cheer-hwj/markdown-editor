<template>
  <div>
    <nav>
      <ul>
        <li title="加粗" @click="boldText">
          <strong>B</strong>
        </li>
        <li title="斜体" @click="obliqueText">
          <i>I</i>
        </li>
        <li title="删除线" @click="delText">
          <del>S</del>
        </li>
        <li title="下划线" @click="underlineText">
          <ins>U</ins>
        </li>
        <li title="行内代码">innercode</li>
        <li>link</li>
        <li>img</li>
        <li>mark</li>
        <li>h1</li>
        <li>h2</li>
        <li>h3</li>
        <li>h4</li>
        <li>h5</li>
        <li>h6</li>
        <li>——</li>
      </ul>
    </nav>
    <article>
      <section class="draft">
        <textarea v-model="message" spellcheck="false" ref="inputSelect"></textarea>
      </section>
      <section class="preview" v-html="output"></section>
    </article>
  </div>
</template>
<script>
import { listHandler, listInsert } from "@/assets/js/list.js";
import { codeHandler, codeInsert } from "@/assets/js/codeblock.js";
import { referHandler, referInsert } from "@/assets/js/refer.js";
import { textformat } from "@/assets/js/textformat.js";
import { paragraph, paragraphInsert } from "@/assets/js/paragraph.js";
export default {
  name: "Home",
  data() {
    return {
      message: localStorage.getItem("message") || ""
    };
  },
  computed: {
    // 处理输出
    output() {
      this.saveMsg();
      let outMsg = this.message;
      /* ========== 分割为各个独立的部分 ==========  */
      //代码块
      outMsg = codeHandler(outMsg);
      //引用
      outMsg = referHandler(outMsg); 
      //列表
      outMsg = listHandler(outMsg);

      /* ========== 处理文本的格式 ==========  */
      //段落结构
      outMsg = paragraph(outMsg);
      console.log(outMsg)
      //文本格式
      outMsg = textformat(outMsg);
      //不受文本格式影响的段落结构
      outMsg = paragraphInsert(outMsg);

      // /(^[^\*=\-#>\t\.\+\[\]\!\\][\S\s]+)/
      /**** 反斜杠 ****/

      /* ========== 处理并合并各个独立的部分 ==========  */
      //代码块
      outMsg = codeInsert(outMsg);
      //引用
      outMsg = referInsert(outMsg);
      //列表
      outMsg = listInsert(outMsg);
      return outMsg;
    }
  },
  methods: {
    //保存输入
    saveMsg() {
      localStorage.setItem("message", this.message);
    },
    //处理输入
    textHandler(func) {
      let inputSelect = this.$refs.inputSelect;
      const startn = inputSelect.selectionStart;
      const endn = inputSelect.selectionEnd;
      func(startn, endn);
      inputSelect.focus();
      inputSelect.select();
    },
    // 粗体
    boldText() {
      let vm = this;
      this.textHandler(function(startn, endn) {
        let newstr = "**" + vm.message.substring(startn, endn) + "**";
        if (startn == endn) {
          newstr = "**text**";
        }
        vm.message =
          vm.message.substring(0, startn) + newstr + vm.message.substring(endn);
      });
    },
    // 斜体
    obliqueText() {
      let vm = this;
      this.textHandler(function(startn, endn) {
        let newstr = "*" + vm.message.substring(startn, endn) + "*";
        if (startn == endn) {
          newstr = "*text*";
        }
        vm.message =
          vm.message.substring(0, startn) + newstr + vm.message.substring(endn);
      });
    },
    // 删除线
    delText() {
      let vm = this;
      this.textHandler(function(startn, endn) {
        let newstr = "~~" + vm.message.substring(startn, endn) + "~~";
        if (startn == endn) {
          newstr = "~~text~~";
        }
        vm.message =
          vm.message.substring(0, startn) + newstr + vm.message.substring(endn);
      });
    },
    //下划线
    underlineText() {
      let vm = this;
      this.textHandler(function(startn, endn) {
        let newstr = "++" + vm.message.substring(startn, endn) + "++";
        if (startn == endn) {
          newstr = "++text++";
        }
        vm.message =
          vm.message.substring(0, startn) + newstr + vm.message.substring(endn);
      });
    }
  }
};
</script>
<style scoped>
nav {
  border-bottom: 1px solid #ccc;
  background: #fff;
}
ul {
  display: flex;
  list-style-type: none;
  align-items: center;
  justify-content: space-around;
}
nav li {
  line-height: 3rem;
  cursor: pointer;
}
nav li:hover {
  color: rgb(12, 98, 179);
}
article {
  display: flex;
}
section {
  width: 50%;
  min-height: calc(100vh - 3rem - 1px);
}
textarea {
  box-sizing: border-box;
  border: none;
  background-color: #f9f9f5;
  resize: none;
  width: 100%;
  height: 100%;
  user-select: auto;
  font-family: inherit;
}
</style>


