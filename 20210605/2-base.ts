function identity<T>(arg: T): T {
    return arg
}

const a = identity('hello world')
console.log('a -->', a)

const b = identity(9527)
console.log('b -->', b)


