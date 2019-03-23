<template>
  <ul>
    <navBtn
      :bg="val.bg"
      :type="key"
      :title="val.title"
      :id="val.id"
      v-on="$listeners"
      v-for="(val, key) in rules"
      :key="key"
    ></navBtn>
  </ul>
</template>
<script>
import store from "@/store.js";
const navBtn = {
  props: ["bg", "type", "title", "id"],
  render(createElement) {
    let li = createElement("li", {
      style: {
        backgroundPositionX: -this.id*50 + 'px'
      },
      domProps: {
        // innerText: this.bg,
        title: this.title,
      },
      on: {
        click: this.clickHandler
      }
    });
    return li;
  },
  methods: {
    clickHandler() {
      this.$emit("addrule", this.type);
    }
  }
};
export default {
  name: "ruleHeader",
  components: {
    navBtn
  },
  data() {
    return {
      // rules: ["bold", "em", "del", "underline",
      // "inlinecode", "h1", "h2", "h3", "quote","ul",
      // "ol","hr","code"],
    };
  },
  computed: {
    rules() {
      const allrules = store.state.rules;
      return allrules;
    }
  },
  methods: {}
};
</script>
<style scoped>
ul {
  margin: 0;
  display: flex;
  list-style-type: none;
  align-items: center;
  justify-content: space-around;
  background: #4074b4;
}
nav li {
  line-height: 50px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  color: #fff;
  background: url("../assets/img/header.png") no-repeat top;
}
nav li:hover {
  color: #ffe788;
  background-position-y: bottom;
}
</style>
