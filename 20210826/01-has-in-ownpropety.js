const proto = {foo: 'foo1'};
const obj = Object.create(proto);

console.log(Reflect.has(obj, 'foo'));// true
console.log('foo' in obj);// true


console.log(' obj.hasOwnProperty(\'hasOwnProperty\') ', obj.hasOwnProperty('hasOwnProperty'))// false
console.log(obj.hasOwnProperty('foo'));// false
