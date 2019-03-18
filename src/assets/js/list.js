import store from '@/store.js'
export function listHandler(msg) {
  msg = msg.replace(/(^[*+][ \t]+[\s\S]+?)(^(\s*)[\r\n](?!^[+*][ \t]))/gm, function (match, p1, p2) {
    return '<ul class="pre-list"></ul>' + p2
  })
  return msg
}
export function listInsert(msg) {
  return msg
}
// export function listHandler(msg) {
//     return msg.replace(
//         /(^[*+][ \t]+[\s\S]+?)(^(\s*)[\r\n](?!^[+*][ \t]))/gm,
//         function(match, p1, p2) {
//           let arr = p1.split(/(^[*+]|[1-9]\.)[ \t]+/gm);
//           let nowstr = arr[1];
//           let nowNum = !isNaN(parseInt(nowstr));
//           let arr2 = arr.map(function(val, index) {
//             let arrstr = "";
//             if (index == 0) {
//               arrstr = nowNum ? "<ol>" : "<ul>";
//             } else if (index % 2 != 0) {
//               let isNum = !isNaN(parseInt(val));
//               if (isNum) {
//                 //有序列表
//                 if (nowNum != isNum) {
//                   arrstr = "</ul><ol>";
//                 }
//               } else if (nowNum != isNum) {
//                 nowstr = val;
//                 arrstr = "</ol><ul>";
//               } else if (val != nowstr) {
//                 nowstr = val;
//                 arrstr = "</ul><ul>";
//               }
//               nowNum = isNum;
//             } else if (index == arr.length - 1) {
//               let endstr = nowNum ? "</ol>" : "</ul>";
//               arrstr = "<li>" + val + "</li>" + endstr;
//             } else {
//               arrstr = "<li>" + val + "</li>";
//             }
//             return arrstr;
//           });
//           let result = arr2.join("") + p2;
//           return result;
//         }
//       );
// }