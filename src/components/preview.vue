<template>
  <div class="preview">
    <div class="preview-title">
      <label>PREVIEW</label>
      <button @click="$emit('closepreview')">close</button>
    </div>
    <div v-html="msg" class="preview-content"></div>
  </div>
</template>
<script>
export default {
  props: ["msg"]
};
</script>
<style lang="less" scoped>
.preview {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  .preview-title {
    margin: 0;
    padding: 4px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    label {
      font-size: 12px;
      user-select: none;
      color: #c1d6f1;
    }
    button {
      width: 50px;
      height: 32px;
      background: #ffe788;
      border: none;
      color: #666;
      border-radius: 5px;
    }
  }
  .preview-content {
      padding: 0 16px;
  }
}
</style>


