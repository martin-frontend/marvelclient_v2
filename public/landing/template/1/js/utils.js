/**
 * 验证用户名是否合法
 * @param value
 */
function checkUserName(value) {
    const Regx = /^[A-Za-z0-9]*$/;
    return value.length >= 4 && value.length <= 20 && Regx.test(value);
}

/**
 * 验证密码是否合法
 * @param value
 */
function checkUserPassword(value) {
    // console.log(">>>>>>>>>>>>>: ", value);
    // const Regx = /^[A-Za-z0-9]*$/;
    return value.length >= 6 && value.length <= 20; // && Regx.test(value);
}

/**
 * 验证手机号是否合法
 * @param value
 */
function checkPhone(value) {
    const Regx = /^[1-9]+[0-9]*]*$/;
    return value.length >= 7 && value.length <= 11 && Regx.test(value);
}

/**
 * 验证邮箱是否合法
 * @param value
 */
function checkMail(value) {
    const Regx = /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/;
    return Regx.test(value);
}
