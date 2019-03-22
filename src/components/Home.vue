<template>
  <div>
    <ruleHeader v-on:addrule="addRule"></ruleHeader>
    <article>
      <section class="draft">
        <textarea v-model="message" spellcheck="false" ref="inputSelect"></textarea>
      </section>
      <section class="preview" v-html="output"></section>
    </article>
  </div>
</template>
<script>
import ruleHeader from '@/components/ruleHeader'
import datahandler from '@/assets/js/datahandler.js'
import { dataRule } from '@/assets/js/rulehandler.js'
export default {
  name: "Home",
  data() {
    return {
      message: localStorage.getItem("message") || ""
    };
  },
  components: {
    ruleHeader,
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
       this.message = dataRule(type, this.message, this.$refs.inputSelect)
    },
  }
};
</script>
<style scoped>
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


