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
import {listHandler} from '@/assets/js/list.js'
import {codeHandler, codeInsert} from '@/assets/js/codeblock.js'
import {referHandler, referInsert} from '@/assets/js/refer.js'
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
      outMsg = codeHandler(outMsg)
      //引用
      outMsg = referHandler(outMsg)



      // /(^[^\*=\-#>\t\.\+\[\]\!\\][\S\s]+)/
      /**** 反斜杠 ****/

      /**** 标题 ****/
      outMsg = outMsg.replace(/^(#{1,6})([^#].*)/gm, function(match, p1, p2) {
        let n = p1.length;
        return "<h" + n + ">" + p2 + "</h" + n + ">";
      });
      // 特殊的一级和二级标题
      outMsg = outMsg.replace(/([^#\s]?.*)[\n\r]+(=+)/g, "<h1>$1</h1>");
      outMsg = outMsg.replace(/([^#\s]?.*)[\n\r]+(-+)/g, "<h2>$1</h2>");

      /****  段落  ****/
      // 识别一开始的段落
      outMsg = outMsg.replace(/(^ {0,3}<(?!h[1-6]))/g, "<p>$&");
      // 识别最后的段落
      outMsg = outMsg.replace(/([^>][\s]*$)/g, "$&</p>");
      // 识别标题之后的正文
      outMsg = outMsg.replace(/(<\/h[1-6]>)([\s][^<])/gm, "$1<p>$2");

      /****  引用  ****/
      // function searchQuote(src) {
      //   if (!src.match(/^>+/gm)) return src;

      //   let arr = src.match(/^>+/gm).map(val => val.length);
      //   let maxNum = arr[0];
      //   const startStr = "<blockquote><p>";
      //   const endStr = "</p></blockquote>";

      //   let result = src;
      //   for (let i = 0; i < arr.length; i++) {
      //     result = result.replace(/(^\s*[\r\n])?(^>+)/m, function(match, p1) {
      //       let val = arr[i];
      //       if (i == 0) {
      //         return startStr.repeat(val - 1);
      //       }

      //       if (p1 && val < maxNum) {
      //         let m = maxNum - val;
      //         maxNum = val;
      //         return endStr.repeat(m);
      //       }

      //       let num = val - maxNum;
      //       if (num > 0) {
      //         maxNum = val;
      //         return startStr.repeat(num);
      //       } else return "";
      //     });
      //   }
      //   return result + endStr.repeat(maxNum - 1);
      // }
      // outMsg = outMsg.replace(/(^>[\S\s]*?)(^\s*[\r\n])*(^[^>\s])/gm, function(
      //   m,
      //   p1,
      //   p2,
      //   p3
      // ) {
      //   p1 = "<blockquote><p>" + searchQuote(p1) + "</p></blockquote>";
      //   p2 = p2 || "";
      //   return p1 + p2 + p3;
      // });
      // 识别引用之后的正文
      outMsg = outMsg.replace(/(<\/blockquote>)([\s]*[^<])/gm, "$1<p>$2");

      // 识别段落中的换行(两个以上的空格加一个回车)
      outMsg = outMsg.replace(/ {2,}[\r\n]/gm, "<br>");
      /****  粗体  ****/
      // outMsg = outMsg.replace(
      //   /\*\*(.*?)\*\*|__(.*?)__/g,
      //   "<strong>$1$2</strong>"
      // );
      /****  斜体  ****/
      // outMsg = outMsg.replace(/\*(.*?)\*|_(.*?)_/g, "<em>$1$2</em>");
      /****  删除线  ****/
      outMsg = outMsg.replace(/(~~)(.*?)(~~)/g, "<del>$2</del>");
      /****  下划线  ****/
      outMsg = outMsg.replace(/(\+\+)(.*?)(\+\+)/g, "<ins>$2</ins>");
      /****  行内代码  ****/
      outMsg = outMsg.replace(/`([^`]+)`/g, "<code>$1</code>");
      
      /**** 列表 ****/
      outMsg = listHandler(outMsg)
      /**** 分割线 ****/
     let aa = outMsg.match(/^\s*_{3,}[_ ]*$/gm)
     console.log(aa)
      // 识别空行
      outMsg = outMsg.replace(/^(\s*)[\r\n]/gm, "</p><p>");

      /* ========== 处理并合并各个独立的部分 ==========  */
      //代码块
      outMsg = codeInsert(outMsg)
      //引用
      outMsg = referInsert(outMsg)
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
    // 行内代码
    // innerCodeText() {
    //   let vm = this;
    //   this.textHandler(function(startn, endn) {
    //     let newstr = "`" + vm.message.substring(startn, endn) + "`";
    //     if (startn == endn) {
    //       newstr = "`text`";
    //     }
    //     vm.message =
    //       vm.message.substring(0, startn) + newstr + vm.message.substring(endn);
    //   });
    // }
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


