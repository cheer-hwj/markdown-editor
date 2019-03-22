import store from '@/store.js'
function texthandler(type, msg, startn, endn) {
  let newstr = msg.substring(startn, endn)
  const rules = store.state.rules
  if (rules && rules[type]) {
    const mark = rules[type].mark
    if (startn == endn) {
      newstr = "text";
    }
    switch (rules[type].type) {
      case 0: newstr = mark + newstr + mark;// 包围式数据的处理
        break;
      case 1: newstr = '\n' + mark + newstr;// 前置式数据的处理
        break;
      case 2: newstr = '\n' + mark + 'text' + mark;// 插入式数据的处理
        break;
      case 3: newstr = mark;// 插入式标记的处理
        break;
      default:
      newstr = mark
    }
  }
  msg = msg.substring(0, startn) + newstr + msg.substring(endn);
  return msg
}

export function dataRule(type, msg, inputSelect) {
  const startn = inputSelect.selectionStart;
  const endn = inputSelect.selectionEnd;
  const result = texthandler(type, msg, startn, endn)
  inputSelect.dispatchEvent(new Event('input'))
  inputSelect.focus();
  inputSelect.select();
  return result
}