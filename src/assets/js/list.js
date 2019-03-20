import store from '@/store.js'
import { textformat } from "@/assets/js/textformat.js";
export function listHandler(msg) {
  msg = msg.replace(/(^[*+][ \t]+[\s\S]+?)(^(\s*)[\r\n](?!^[+*1-9][ \t]))/gm, function (match, p1, p2) {
    store.commit('listlines/addline', p1)
    return '<ul class="pre-list"></ul>' + p2
  })
  msg = msg.replace(/(^[1-9]\.[ \t]+[\s\S]+?)(^(\s*)[\r\n](?!^[+*1-9][ \t]))/gm, function (match, p1, p2) {
    store.commit('listlines/addline', p1)
    return '<ul class="pre-list"></ul>' + p2
  })
  // 在末尾的引用
  msg = msg.replace(/^([*+]|[1-9]\.)[ \t]+[\s\S]+/gm, function (match) {
    if (match) {
        store.commit('listlines/addline', match)
        return '<ul class="pre-list"></ul>'
    }
})
  return msg
}
export function listInsert(msg) {
  const arr = store.state.listlines.lines
  if (arr.length > 0) {
    let n = 0
    msg = msg.replace(/<ul class="pre-list"><\/ul>/gm, function () {
      let str = listData(arr[n])
      n++
      return str
    })
    store.commit('listlines/clearline')
  }
  return msg
}

function listData(src) {
  let result = textformat(src)
  let arr = result.split(/(^[*+]|[1-9]\.)[ \t]+/gm);
  if (arr.length > 0) {
    let nowstr = arr[1];
    let nowNum = !isNaN(parseInt(nowstr));
    let arr2 = arr.map(function (val, index) {
      let arrstr = "";
      if (index == 0) {
        arrstr = nowNum ? "<ol>" : "<ul>";
      } else if (index % 2 != 0) {
        let isNum = !isNaN(parseInt(val));
        if (isNum) {
          //有序列表
          if (nowNum != isNum) {
            arrstr = "</ul><ol>";
          }
        } else if (nowNum != isNum) {
          nowstr = val;
          arrstr = "</ol><ul>";
        } else if (val != nowstr) {
          nowstr = val;
          arrstr = "</ul><ul>";
        }
        nowNum = isNum;
      } else if (index == arr.length - 1) {
        let endstr = nowNum ? "</ol>" : "</ul>";
        arrstr = "<li>" + val + "</li>" + endstr;
      } else {
        arrstr = "<li>" + val + "</li>";
      }
      return arrstr;
    });
    result = arr2.join("");
  }
  return result;
}