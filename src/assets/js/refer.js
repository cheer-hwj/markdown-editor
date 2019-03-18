import store from '@/store.js'
export function referHandler(msg) {
    msg = msg.replace(/(^>[\S\s]*?)(^\s*[\r\n]^[^>])/gm, function (
        m,
        p1,
        p2
    ) {
        store.commit('referlines/addline', p1)
        p1 = "<blockquote><p></p></blockquote>";
        p2 = p2 || "";
        return p1 + p2;
    });
    console.log(msg)
    // 在末尾的引用
    
    return msg
}
export function referInsert(msg) {
    const arr = store.state.referlines.lines
    if (arr.length > 0) {
        let n = 0
        msg = msg.replace(/<blockquote><p><\/p><\/blockquote>/gm, function () {
            let str = "<blockquote><p>" + searchQuote(arr[n]) + "</p></blockquote>"
            n++
            return str
        })
        store.commit('referlines/clearline')
    }
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