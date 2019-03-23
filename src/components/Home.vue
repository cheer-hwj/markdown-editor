<template>
  <div>
    <nav>
      <ruleHeader v-on:addrule="addRule"></ruleHeader>
      <div class="nav-info">
        <div class="info-name">
          <label>DOCUMENT NAME</label>
          <input v-model="draftname">
        </div>
        <button @click="exportResult" class="export">导出</button>
      </div>
    </nav>
    <div class="content">
      <section class="draft">
        <p class="pre-title">MARKDOWN</p>
        <textarea v-model="message" spellcheck="false" ref="inputSelect"></textarea>
      </section>
      <section>
        <p class="pre-title">PREVIEW</p>
        <article class="preview" v-html="output"></article>
      </section>
    </div>
  </div>
</template>
<script>
import ruleHeader from "@/components/ruleHeader";
import datahandler from "@/assets/js/datahandler.js";
import { dataRule } from "@/assets/js/rulehandler.js";
import "@/assets/css/format.less";
export default {
  name: "Home",
  data() {
    return {
      message: localStorage.getItem("message") || "",
      draftname: "draft"
    };
  },
  components: {
    ruleHeader
  },
  computed: {
    // 处理输出
    output() {
      this.saveMsg();
      return datahandler(this.message);
    }
  },
  methods: {
    //保存输入
    saveMsg() {
      localStorage.setItem("message", this.message);
    },
    addRule(type) {
      this.message = dataRule(type, this.message, this.$refs.inputSelect);
    },
    // 导出草稿
    exportResult() {
      if (!this.message || !localStorage.getItem("message")) {
        alert("你的草稿中没有内容");
        return;
      }
      const content = this.message;
      const elem = document.createElement("a");
      elem.download = this.draftname || 'draft' + ".md";
      elem.style.display = "none";
      const blob = new Blob([content], { type: "text/plain" });
      elem.href = URL.createObjectURL(blob);
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
  }
};
</script>
<style lang="less" scoped>
nav {
  background: #fbf5dc;
}
.nav-info {
  padding: .5rem 1rem;
  display: flex;
  justify-content: space-between;
  border-top: #ffcc00 3px solid;
}
.info-name {
  line-height: 2rem;
  label {
    font-size: 6px;
    color: #82b0ec;
  }
  input {
    margin-left: 1rem;
    font-size: 16px;
    background: none;
    border: none;
    color: #666;
  }
}
.pre-title {
  margin: 0;
  padding: 0 1rem;
  line-height: 3rem;
  font-size: 6px;
  user-select: none;
  color: #c1d6f1;
  background: #fff;
}
.draft .pre-title {
  background: #f9f9f5;
}

.export {
  width: 50px;
  height: 2rem;
  background: #ffe788;
  border: none;
  color: #666;
  border-radius: 5px;
}
.content {
  display: flex;
  height: calc(100vh - 6rem - 10px);
}
section {
  box-sizing: border-box;
  width: 50%;
  height: calc(100% - 3rem);
}
textarea {
  padding: 0 1rem;
  box-sizing: border-box;
  border: none;
  background-color: #f9f9f5;
  resize: none;
  width: 100%;
  height: 100%;
  user-select: auto;
  font-family: inherit;
  line-height: 1.5em;
  font-size: 1rem;
}
.preview {
 height: 100%;
 overflow-y: auto;
}
</style>


