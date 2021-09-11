import * as moment from 'moment';

// js Date对象的问题
//美国本地格式
const datestr1 = '1/1/2016';
// //ISO 8601
const datestr2 = '2016-01-01';
//

console.log('Date.parse(dateObj1) -->', '' + Date.parse('1/1/2016'));
console.log('Date.parse(dateObj2) -->', Date.parse('2016-01-01'));
console.log('Date.parse(dateObj1) === Date.parse(dateObj2)-->', Date.parse(datestr1) === Date.parse(datestr2)); // false 这就是原生js date的问题 ，明明同样的时间却因为字符串的格式问题被解释成了不同的时间，

// https://runebook.dev/zh-CN/docs/moment/guides/index
// 在Moment中,日期总是被解释为当地时间,除非您另外指定。这一点不会随着ES2015的采用而改变
const moment1Obj = moment('1/2/2016');
const moment2Obj = moment('2016-01-02');


// moment("12-25-1995", "MM-DD-YYYY")
console.log('moment1Obj.valueOf()=== moment2Obj.valueOf()-->', moment1Obj.valueOf() === moment2Obj.valueOf()); // true

// 解释不了的字符串，就得增加说明了
const moment3Obj = moment('2-1-2016');
const moment4Obj = moment('2-1-2016', "D-M-YYYY");
console.log('moment2Obj.valueOf()=== moment3Obj.valueOf()-->', moment2Obj.valueOf() === moment3Obj.valueOf()); // false
console.log('moment2Obj.valueOf()=== moment4Obj.valueOf()-->', moment2Obj.valueOf() === moment4Obj.valueOf());

// 别乱用utc
const timeStr = '2016-01-02 10:43:00';
const moment5Obj = moment(timeStr);
const moment6Obj = moment.utc(timeStr);
console.log('moment5Obj.valueOf()=== moment6Obj.valueOf()-->', moment5Obj.valueOf() === moment6Obj.valueOf());

// const moment3Obj = moment('1-2-2016');
console.log(' moment1Obj.format()-->', moment1Obj.format()) // same output:  moment1Obj.format()--> 2016-01-01T00:00:00+09:00
console.log(' moment2Obj.format()-->', moment2Obj.format())//  same output: moment2Obj.format()--> 2016-01-01T00:00:00+09:00
