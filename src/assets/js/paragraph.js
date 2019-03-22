import store from '@/store.js'
import {header, textformat } from "@/assets/js/textformat.js"
/**** 分割线 ****/
function separator(msg) {
    return msg.replace(/^([\s*_]+)$/gm, function (match, p1) {
        if (p1.match(/_/gm) && !p1.match(/\*/gm) && p1.match(/_/gm).length > 2) {
            return '<hr>'
        }
        else if (p1.match(/\*/gm) && !p1.match(/_/gm) && p1.match(/\*/gm).length > 2) {
            return '<hr>'
        }
        else return match
    });
}
/**** 段落 ****/
function parahandler(msg) {
    msg = msg.replace(/^(?!\s*<(?:h[1-6]|ul|pre|blockquote|ol))([\s\S]+?)([\r\n]^<(?:h[1-6]|ul|pre|blockquote|ol))/gmi, function (match, p1, p2) {
        store.commit('paralines/addpara', p1)
        return '<p class="paralines"></p>' + p2
    })
    // 在末尾的处理
    msg = msg.replace(/^(?!\s*<(?:h[1-6]|ul|pre|blockquote|ol|p))([\s\S]+)/gmi, function (m, p1) {
        store.commit('paralines/addpara', p1)
        return '<p class="paralines"></p>'
    })
    return msg
}
// 识别段落中的空行
function spacetype(msg, func) {
    return msg.replace(/(\S[\s\r\n]*)(^\s*[\r\n]+)(\S)/gm, function (match, p1, p2, p3) {
        if (func) {
            func(p2)
        }
        return p1 + '</p><p>' + p3
    });
}
function paradata(msg) {
    msg = textformat(msg)
    msg = spacetype(msg)
    return msg
}
export function textstructure(msg) {
    msg = header(msg)
    msg = separator(msg)
    msg = parahandler(msg)
    return msg
}

export function paraInsert(msg) {
    const arr = store.state.paralines.paras
    if (arr.length > 0) {
        let n = 0
        msg = msg.replace(/<p class="paralines"><\/p>/gi, function () {
            let str = '<p>' + paradata(arr[n]) + '</p>'
            n++
            store.commit('paralines/clearpara')
            return str
        })
    }
    return msg
}