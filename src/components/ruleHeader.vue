<template>
  <div>
    <nav>
      <ul>
        <navBtn
          :bg="val.bg"
          :type="key"
          :title="val.title"
          v-on="$listeners"
          v-for="(val, key) in rules"
          :key="key"
        ></navBtn>
      </ul>
    </nav>
  </div>
</template>
<script>
import store from '@/store.js'
const navBtn = {
  props: ["bg", "type", "title"],
  render(createElement) {
    let li = createElement("li", {
      domProps: {
        innerText: this.bg,
        title: this.title
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
      const allrules = store.state.rules
      return allrules
    }
  },
  methods: {}
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
</style>
