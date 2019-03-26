<template>
  <ul>
    <navBtn
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
  props: ["type", "title", "id"],
  render(createElement) {
    let li = createElement("li", {
      style: {
        backgroundPositionX: -this.id * 50 + "px"
      },
      domProps: {
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
    return {};
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
<style lang="less" scoped>
ul {
  margin: 0;
  padding: 0;
  display: flex;
  list-style-type: none;
  align-items: center;
  justify-content: space-around;
  background: #4074b4;
}
li {
  line-height: 50px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  color: #fff;
  background: url("../assets/img/header.png") no-repeat top;
}
li:hover {
  background-position-y: bottom;
}
@media screen and (max-width: 500px) {
  ul {
    flex-flow: row wrap;
    justify-content: space-between;
    li {
      background: url("../assets/img/header@2x.png") no-repeat top/750px;
    }
    li:nth-child(8) {
      display: none;
    }
  }
}
</style>
