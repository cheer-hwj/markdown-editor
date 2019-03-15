let codelines = []
let codeblock = []
export function codeHandler(msg) {
    // 代码标记```
    msg = msg.replace(/^`{3,}([\s\S]*?)^`{3,}/gm, function (match, p1) {
        codeblock.push(p1)
        console.log(p1, 'p1')
        return "<pre class='code-block'></pre>"
    });
    // 空格或制表符
    msg = msg.replace(/(^ {4}|\t)(.*)/gm, function (match, p1, p2) {
        codelines.push(p2)
        return "<pre><code></code></pre>"
    });
    return msg
}

export function codeInsert(msg) {
    let n = 0
    let m = 0
    if (codelines.length > 0) {
        let src = msg.replace(/<pre><code><\/code><\/pre>/gm, function (match) {
            let str = "<pre><code>" + codelines[n] + "</code></pre>"
            n++
            return str
        })
        codelines = []
        src = src.replace(
            /<\/code>\s*<\/pre>(\s*[\r\n])*<pre>\s*<code>/gm,
            "$1"
        );
        src = src.replace(/<pre class='code-block'><\/pre>/gm, function (match) {
            let str = "<pre><code>" + codeblock[m] + "</code></pre>"
            m++
            return str
        })
        codeblock = []
        return src
    }
    else return msg
}