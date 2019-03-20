import store from '@/store.js'
/**** 标题 ****/
export function header(msg) {
    msg = msg.replace(/^(#{1,6})([^#].*)/gm, function (match, p1, p2) {
        let n = p1.length;
        return "<h" + n + ">" + p2 + "</h" + n + ">";
    });
    // 特殊的一级和二级标题
    msg = msg.replace(/([^#\s]?.*)[\n\r]+(=+)/g, "<h1>$1</h1>");
    msg = msg.replace(/([^#\s]?.*)[\n\r]+(-+)/g, "<h2>$1</h2>");
    return msg
}
/**** 段落 ****/
export function parahandler(msg) {
    let m = 0
    let n = 0
    let i = 0
    let matches = 0
    msg = msg.replace(/^(?!\s*<(?:h[1-6]|ul|pre|blockquote|ol))([\s\S]+?)([\r\n]^<(?:h[1-6]|ul|pre|blockquote|ol))/gmi, function (match, p1, p2, offset) {
        m += 7
        matches = offset + p1.length
        p1 = spacetype(p1, t => { i += 7 - t.length })
        p1 = brtype(p1, t => { n += 4 - t.length })
        return '<p>' + p1 + '</p>' + p2
    })
    // 在末尾的处理
    let laststr = matches + m + n //取得最后一次匹配的位置
    let src = msg.slice(laststr, -1)
    src = src.replace(/^(?!\s*<(?:h[1-6]|ul|pre|blockquote|ol))([\s\S]+)/gmi, function (m, p1) {
        p1 = spacetype(p1)
        p1 = brtype(p1)
        return '<p>' + p1 + '</p>'
    })
    msg = msg.slice(0, laststr) + src
    return msg
}
// 识别段落中的换行(两个以上的空格加一个回车)
export function brtype(msg, func) {
    return msg.replace(/ {2,}[\r\n]/gm, function (match) {
        if (func) {
            func(match)
        }
        return "<br>"
    });
}
// 识别空行
export function spacetype(msg, func) {
    return msg.replace(/(\S[\r\n]*)(^\s*[\r\n]+)(\S)/gm, function (match, p1, p2, p3) {
        if (func) {
            func(p2)
        }
        return p1 + "</p><p>" + p3
    });
}
// outMsg = outMsg.replace(/^(\s*)[\r\n]/gm, "</p><p>");

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
export function paragraph(msg) {
    msg = codetype(msg)
    msg = linktype(msg)
    msg = header(msg)
    msg = separator(msg)
    msg = parahandler(msg)
    return msg
}

export function paragraphInsert(msg) {
    msg = linkInsert(msg)
    msg = codeInsert(msg)
    return msg
}