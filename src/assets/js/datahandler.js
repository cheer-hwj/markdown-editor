import { listHandler, listInsert } from "@/assets/js/list.js";
import { codeHandler, codeInsert } from "@/assets/js/codeblock.js";
import { referHandler, referInsert } from "@/assets/js/refer.js";
import { textstructure, paraInsert } from "@/assets/js/paragraph.js";

//HTML标签转义(<&)
function html2Escape(sHtml) {
      return sHtml.replace(/[<&"]/g, function (m) {
            return { '<': '&lt;', '&': '&amp;' }[m];
      });
}
//反斜杠转义
function blashEscape(msg) {
      return msg.replace(/\\([*=\->.+[\]!\\()])/g, function (m, p1) {
            return '&#' + p1.charCodeAt() + ';';
      })
}

export default function (msg) {
      if (!msg) return ''
      msg = html2Escape(msg)
      msg = blashEscape(msg)
      /* ========== 分割为各个独立的部分 ==========  */
      //代码块
      msg = codeHandler(msg);
      //引用
      msg = referHandler(msg);
      //列表
      msg = listHandler(msg);
      //段落结构
      msg = textstructure(msg);

      /* ========== 处理并合并各个独立的部分 ==========  */
      //段落结构
      msg = paraInsert(msg);
      //代码块
      msg = codeInsert(msg);
      //引用
      msg = referInsert(msg);
      //列表
      msg = listInsert(msg);
      return msg
}