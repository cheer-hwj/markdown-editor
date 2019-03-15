let referlines = []
export function referHandler(msg) {
    msg = msg.replace(/(^>[\S\s]*?)(^\s*[\r\n])*(^[^>\s])/gm, function (
        m,
        p1,
        p2,
        p3
    ) {
        referlines.push(searchQuote(p1))
        p1 = "<blockquote><p></p></blockquote>";
        p2 = p2 || "";
        return p1 + p2 + p3;
    });
    return msg
}
export function referInsert(msg) {
    if (referlines.length == 0) return msg;
    let n = 0
    msg = msg.replace(/<blockquote><p><\/p><\/blockquote>/gm, function () {
        let str = "<blockquote><p>" + referlines[n] + "</p></blockquote>"
        n++
        return str
    })
    return msg
}

function searchQuote(src) {
    if (!src.match(/^>+/gm)) return src;

    let arr = src.match(/^>+/gm).map(val => val.length);
    let maxNum = arr[0];
    const startStr = "<blockquote><p>";
    const endStr = "</p></blockquote>";

    let result = src;
    for (let i = 0; i < arr.length; i++) {
        result = result.replace(/(^\s*[\r\n])?(^>+)/m, function (match, p1) {
            let val = arr[i];
            if (i == 0) {
                return startStr.repeat(val - 1);
            }

            if (p1 && val < maxNum) {
                let m = maxNum - val;
                maxNum = val;
                return endStr.repeat(m);
            }

            let num = val - maxNum;
            if (num > 0) {
                maxNum = val;
                return startStr.repeat(num);
            } else return "";
        });
    }
    return result + endStr.repeat(maxNum - 1);
}