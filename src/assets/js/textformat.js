/**** 粗体 ****/
// 两个重复字符的函数先行执行
function boldtype(msg) {
    return msg.replace(
        /\*\*([^* ].*?[^* ])\*\*|__([^_ ].*?[^_ ])__/g,
        "<strong>$1$2</strong>"
    );
}
/****  斜体  ****/
function italictype(msg) {
    return msg.replace(/\*([^* ].*?[^* ])\*|_([^_ ].*?[^_ ])_/g, "<em>$1$2</em>");
}
/****  删除线  ****/
function deltype(msg) {
    return msg.replace(/(~~)([^~ ].*?[^~ ])(~~)/g, "<del>$2</del>");
}
/****  下划线  ****/
function instype(msg) {
    return msg.replace(/(\+\+)([^+ ].*?[^+ ])(\+\+)/g, "<ins>$2</ins>");
}
/****  换行(两个以上空格加上换行符)  ****/
function brtype(msg) {//虽然不属于格式，但是放这里通用
    return msg.replace(/ {2,}[\r\n]/gm, "<br>");
}

export function textformat(msg) {
    msg = boldtype(msg)
    msg = italictype(msg)
    msg = deltype(msg)
    msg = instype(msg)
    msg = brtype(msg)
    return msg
}