/**** 粗体 ****/
// 两个重复字符的函数先行执行
export function boldtype(msg) {
    return msg.replace(
        /\*\*([^* ].*?[^* ])\*\*|__([^_ ].*?[^_ ])__/g,
        "<strong>$1$2</strong>"
    );
}
/****  斜体  ****/
export function italictype(msg) {
    return msg.replace(/\*([^* ].*?[^* ])\*|_([^_ ].*?[^_ ])_/g, "<em>$1$2</em>");
}
/****  删除线  ****/
export function deltype(msg) {
    return msg.replace(/(~~)([^~ ].*?[^~ ])(~~)/g, "<del>$2</del>");
}
/****  下划线  ****/
export function instype(msg) {
    return msg.replace(/(\+\+)([^+ ].*?[^+ ])(\+\+)/g, "<ins>$2</ins>");
}

export function textformat(msg) {
    msg = boldtype(msg)
    msg = italictype(msg)
    msg = deltype(msg)
    msg = instype(msg)
    return msg
}