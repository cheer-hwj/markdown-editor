import store from '@/store.js'
import { textformat } from "@/assets/js/textformat.js"
/**** 标题 ****/
function header(msg) {
    msg = msg.replace(/^(#{1,6})([^#].*)/gm, function (match, p1, p2) {
        let n = p1.length;
        return "<h" + n + ">" + p2 + "</h" + n + ">";
    });
    // 特殊的一级和二级标题
    msg = msg.replace(/([^#\s]?.*)[\n\r]+(=+)/g, "<h1>$1</h1>");
    msg = msg.replace(/([^#\s]?.*)[\n\r]+(-+)/g, "<h2>$1</h2>");
    return msg
}
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
//不受文本格式影响的段落结构
/****  标记行内代码  ****/
function codetype(msg) {
    return msg.replace(/`([^`]+)`/g, function (match, p1) {
        store.commit('codetype/addword', p1)
        return '<code class="inline-code"></code>'
    });
}
function codeInsert(msg) {
    const arr = store.state.codetype.words
    if (arr.length > 0) {
        let n = 0
        msg = msg.replace(/<code class="inline-code"><\/code>/g, function () {
            let str = '<code class="inline-code">' + arr[n] + '</code>'
            n++
            store.commit('codetype/clearword')
            return str
        })
    }
    return msg
}
/****  图片与链接  ****/
function linktype(msg) {
    return msg.replace(/(!)?\[([^[\]]*)\]\((\S*?)(?:\s+"(.*?)"|\s+'(.*?)')*\)/g, function (match, p1, p2, p3, p4, p5) {
        const title = p4 || p5
        const link = encodeURI(p3)
        const payload = {
            isImg: Boolean(p1),
            text: p2,
            link: link,
            title: title
        }
        store.commit('linktype/addlink', payload)
        return '<a class="inline-link"></a>'
    });
}
function linkInsert(msg) {
    const arr = store.state.linktype.links
    if (arr.length > 0) {
        let n = 0
        msg = msg.replace(/<a class="inline-link"><\/a>/g, function () {
            let titlestr = ''
            let str = ''
            if (arr[n].title) {
                titlestr = 'title = "' + arr[n].title + '"'
            }
            if (arr[n].isImg) {
                str = '<img src="' + arr[n].link + '" alt="' + arr[n].text + '"' + titlestr + '>'
            }
            else {
                str = '<a class="inline-link" target="_blank"' + titlestr +
                    'href="' + arr[n].link + '">' + arr[n].text + '</a>'
            }
            n++
            store.commit('linktype/clearlink')
            return str
        })
    }
    return msg
}
function paradata(msg) {
    msg = codetype(msg)
    msg = linktype(msg)
    msg = spacetype(msg)
    msg = textformat(msg)
    msg = linkInsert(msg)
    msg = codeInsert(msg)
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