import store from '@/store.js'
/**** 粗体 ****/
function boldtype(msg) {// 两个重复字符的函数先行执行
    return msg.replace(
        /\*\*(?![ *])([\s\S]*?[^* ])\*\*|__(?![ _])([\s\S]*?[^_ ])__/g,
        "<strong>$1$2</strong>"
    );
}
/****  斜体  ****/
function italictype(msg) {
    return msg.replace(/\*(?![ *])([\s\S]*?[^* ])\*|_(?![ _])([\s\S]*?[^_ ])_/g, "<em>$1$2</em>");
}
/****  删除线  ****/
function deltype(msg) {
    return msg.replace(/(~~)(?![ ~])([\s\S]*?[^~ ])(~~)/g, "<del>$2</del>");
}
/****  下划线  ****/
function instype(msg) {
    return msg.replace(/(\+\+)(?![ +])([\s\S]*?[^+ ])(\+\+)/g, "<ins>$2</ins>");
}
function format(msg) {
    msg = codetype(msg)
    msg = linktype(msg)
    msg = texttype(msg)
    msg = linkInsert(msg)
    msg = codeInsert(msg)
    return msg
}
function texttype(msg) {
    msg = boldtype(msg)
    msg = italictype(msg)
    msg = deltype(msg)
    msg = instype(msg)
    return msg
}

// 段落格式
/****  换行(两个以上空格加上换行符)  ****/
function brtype(msg) {
    return msg.replace(/ {2,}[\r\n]/gm, "<br>");
}
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
            let text = texttype(arr[n].text)
            if (arr[n].title) {
                titlestr = 'title = "' + arr[n].title + '"'
            }
            if (arr[n].isImg) {
                str = '<img src="' + arr[n].link + '" alt="' + text + '"' + titlestr + '>'
            }
            else {
                str = '<a class="inline-link" target="_blank"' + titlestr +
                    'href="' + arr[n].link + '">' + text + '</a>'
            }
            n++
            store.commit('linktype/clearlink')
            return str
        })
    }
    return msg
}
/**** 标题 ****/
export function header(msg) {
    msg = msg.replace(/^( *)(#{1,6})([^#].*)/gm, function (match, p1, p2, p3) {
        let n = p2.length;
        return "<h" + n + ">" + format(p3) + "</h" + n + ">";
    });
    msg = msg.replace(/([^#\s]?.*)[\n\r]+ *(=+)/g, "<h1>$1</h1>");
    msg = msg.replace(/([^#\s]?.*)[\n\r]+ *(-+)/g, "<h2>$1</h2>");
    return msg
}

export function textformat(msg) {
    msg = header(msg)
    msg = codetype(msg)
    msg = linktype(msg)
    msg = texttype(msg)
    msg = brtype(msg)
    msg = linkInsert(msg)
    msg = codeInsert(msg)
    return msg
}