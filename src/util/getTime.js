/**
 * 
 * @param {*} formatStr 日期格式，如 YYYY-MM-DD-HH-mm-ss
 * @returns 返回给予的格式所对应的时间
 */
Date.prototype.Format = function (formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

    str = str.replace(/MM/, this.getMonth() > 8 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, this.getMonth() + 1);

    str = str.replace(/w|W/g, Week[this.getDay()]);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());

    return str;
}

/**
 * 
 * @param {String} link 年月日之间的链接符,默认为 "-"
 * @returns 返回当前年月日
 */
export function getTimeYMD(link = "-") {
    let now = new Date();
    let year = now.getFullYear(); //年
    let month = now.getMonth() + 1; //月
    let day = now.getDate(); //日

    //短横线连接，不足两位则补0
    let clock = year + link;

    if (month < 10) {
        clock += "0";
    }

    clock += month + link;

    if (day < 10) {
        clock += "0";
    }

    clock += day;

    return (clock);
}

/**
 * 
 * @returns 返回当前时分秒
 */
export function getTimeHMS() {
    let clock = "";
    let now = new Date();
    let hh = now.getHours(); //时
    let mm = now.getMinutes(); //分
    let ss = now.getSeconds(); //秒

    if (hh < 10) {
        clock += "0";
    }
    clock += hh + ":";
    if (mm < 10) {
        clock += '0';
    }
    clock += mm + ":";
    if (ss < 10) {
        clock += '0';
    }
    clock += ss;
    return (clock);
}

/**
 * 
 * @returns 返回当前时间戳，可以通过定时器来触发ref的刷新
 */
export function getTimeValue() {
    return Date.now();
}