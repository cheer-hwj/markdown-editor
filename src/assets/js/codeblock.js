import store from '@/store.js'
export function codeHandler(msg) {
    // 代码标记```
    msg = msg.replace(/^`{3,}[\s\S]*?[\r\n]([\s\S]*?)^`{3,}/gm, function (match, p1) {
        store.commit('codelines/addblock', p1)
        return "<pre class='code-block'></pre>"
    });
    // 空格或制表符
    msg = msg.replace(/(^ {4}|\t)(.*)/gm, function (match, p1, p2) {
        store.commit('codelines/addline', p2)
        return "<pre><code></code></pre>"
    });
    return msg
}

export function codeInsert(msg) {
    let n = 0
    let m = 0
    let src = msg
    const arr1 = store.state.codelines.lines
    if (arr1.length > 0) {
        src = src.replace(/<pre><code><\/code><\/pre>/gm, function () {
            let str = "<pre><code>" + arr1[n] + "</code></pre>"
            n++
            return str
        })
        store.commit('codelines/clearline')
        src = src.replace(
            /<\/code>\s*<\/pre>(\s*[\r\n])*<pre>\s*<code>/gm,
            "$1"
        );
    }
    const arr2 = store.state.codelines.blocks
    if (arr2.length > 0) {
        src = src.replace(/<pre class='code-block'><\/pre>/gm, function () {
            let str = "<pre><code>" + arr2[m] + "</code></pre>"
            m++
            return str
        })
        store.commit('codelines/clearblock')
    }

    return src
}