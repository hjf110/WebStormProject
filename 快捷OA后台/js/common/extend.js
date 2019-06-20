//原型连扩展 扩展原型连方法


//region String原型连扩展
var isNullOrEmpty = function () {
    var obj = this;
    if (typeof obj != "string") {
        return false;
    }
    if (obj == null || obj == undefined || obj == "null" || obj == "undefined" || obj.trim() == "") {
        return true;
    }
    return false;
}
var jsonToObject = function () {
    var obj = this;
    if (typeof obj != "string") {
        throw "jsonToObject 错误这不是个字符串";
    }
    return JSON.parse(obj);
}
var md5 = function () {
    var obj = this;
    return hex_md5(obj);

}
var encodeSha1 = function () {
    var obj = this;
    $.base64.encode(obj);
}

var decodeSha1 = function () {
    var obj = this;
    $.base64.decode(obj);
}

var decodeUrl = function () {
    var obj = this;
    return decodeURI(obj);
}

var encodeUrl = function () {
    var obj = this;
    return encodeURI(obj);
}

var decodeUrlComponent = function () {
    var obj = this;
    return decodeURLComponent(obj);
}

var encodeUrlComponent = function () {
    var obj = this;
    return encodeURLComponent(obj);
}

//endregion

String.prototype.isNullOrEmpty = isNullOrEmpty;
String.prototype.jsonToObject = jsonToObject;
String.prototype.md5 = md5;
String.prototype.encodeSha1 = encodeSha1;
String.prototype.decodeSha1 = decodeSha1;
String.prototype.encodeUrl = encodeUrl;
String.prototype.decodeUrl = decodeUrl;
String.prototype.encodeUrlComponent = encodeUrlComponent;
String.prototype.decodeUrlComponent = decodeUrlComponent;

//region Array原型连扩展
var arrat_add = function (element) {
    var obj = this;
    return obj.push(element);
}
var contains = function (element) {
    var obj = this;
    return obj.indexOf(element) > -1;
}

var findColumn = function (column) {
    var array = [];
    var obj = this;
    for (var i = 0; i < obj.length; i++) {
        array.push(obj[i][column]);
    }
    return array;
}


//endregion

Array.prototype.add = arrat_add;
Array.prototype.contains = contains;
Array.prototype.findColumn = findColumn;