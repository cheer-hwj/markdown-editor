<template>
  <div>
    <nav>
      <ruleHeader v-on:addrule="addRule"></ruleHeader>
      <div class="nav-info">
        <div class="info-name">
          <label>DOCUMENT NAME</label>
          <input v-model="draftname">
        </div>
        <button @click="previewResult = true" class="preview-btn">预览</button>
        <button @click="exportResult">导出</button>
      </div>
    </nav>
    <div class="content">
      <section class="draft">
        <p class="pre-title">MARKDOWN</p>
        <textarea v-model="message" spellcheck="false" ref="inputSelect"></textarea>
      </section>
      <section class="draft-preview">
        <p class="pre-title">PREVIEW</p>
        <article v-html="output" class="preview-content"></article>
      </section>
    </div>
    <previewPage :msg="output" v-if="previewResult" v-on:closepreview="previewResult=false"></previewPage>
  </div>
</template>
<script>
import ruleHeader from "@/components/ruleHeader";
import datahandler from "@/assets/js/datahandler.js";
import { dataRule } from "@/assets/js/rulehandler.js";
import previewPage from "./preview";
import "@/assets/css/format.less";
export default {
  name: "Home",
  data() {
    return {
      message: localStorage.getItem("message") || "",
      draftname: "draft",
      previewResult: false
    };
  },
  components: {
    ruleHeader,
    previewPage
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
      elem.download = (this.draftname || "draft") + ".md";
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
  .nav-info {
    height: 48px;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    border-top: #ffcc00 3px solid;
    align-items: center;
    .info-name {
      label {
        font-size: 8px;
        color: #82b0ec;
      }
      input {
        margin-left: 16px;
        font-size: 16px;
        background: none;
        border: none;
        color: #666;
      }
    }
    button {
      margin-left: 16px;
      width: 50px;
      height: 32px;
      background: #ffe788;
      border: none;
      color: #666;
      border-radius: 5px;
    }
  }
}
.preview-btn {
  display: none;
}
.pre-title {
  margin: 0;
  padding: 0 16px;
  line-height: 48px;
  font-size: 8px;
  user-select: none;
  color: #c1d6f1;
  background: #fff;
}
.draft .pre-title {
  background: #f9f9f5;
}

.content {
  display: flex;
  box-sizing: border-box;
  height: calc(100vh - 105px);
  section {
    box-sizing: inherit;
    width: 50%;
    height: 100%;
    textarea,
    article {
      padding: 0 16px;
      box-sizing: inherit;
      width: 100%;
      height: calc(100% - 48px);

      overflow-y: auto;
    }
    textarea {
      border: none;
      background-color: #f9f9f5;
      resize: none;
      font-size: 16px;
      user-select: auto;
      font-family: inherit;
      line-height: 1.5em;
    }
  }
}

@media screen and (max-width: 500px) {
  .preview-btn {
    display: block;
  }
  .info-name {
    label {
      display: none;
    }
    input {
      margin-left: 0;
    }
  }
  .content {
    height: calc(100vh - 155px);
    section {
      width: 100%;
      .pre-title {
        font-size: 12px;
      }
    }
    .draft-preview {
      display: none;
    }
  }
}
</style>


