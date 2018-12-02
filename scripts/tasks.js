window.addEventListener('load', function() {

    // ЗАДАЧА 1
    function sequence(start, step) {
        start = start ? start : 0;
        step = step ? step : 1;
        var l = 0;
        return function() {
            l++;
            if (l<=1) {
                return start;
            } else {
                return start += step;
            }
        };
    }
    var generator1 = sequence(10, 3);
    var generator2 = sequence(7, 1);

    // result
    console.log("----- Задача 1 ----- \n\n");
    console.log("gen1", generator1());
    console.log("gen2", generator2());
    console.log("gen1", generator1());
    console.log("\n");

    // ЗАДАЧА 2
    function take(fn, count) {
        var arr=[];
        for (var i = 0; i < count; i++) {
            arr.push(fn());
        }
        return arr
    }
    var gen2  = sequence(0, 2);

    // result
    console.log("----- Задача 2 ----- \n\n");
    console.log(take(gen2 , 5));
    console.log("\n");

    // ЗАДАЧА 3
    function map (fn, array) {
        var newArr = [];
        for (var i = 0; i < array.length; i++) {
            newArr.push(fn(array[i]));
        }
        return newArr
    }
    function square(x) {
        return x * x;
    }

    // result
    console.log("----- Задача 3 ----- \n\n");
    console.log(map(square, [1, 2, 3, 4]));
    console.log(map(square, []));
    console.log("\n");

    // ЗАДАЧА 4
    function fmap(a, gen) {
        return function() {
            var args = [];
            for (var j = 0; j < arguments.length; j++) {
                args.push(arguments[j]);
            }
            return a(gen.apply(null, args));
        }
    }
    function square(x) {
        return x * x;
    }
    function add(a, b) {
        return a + b;
    }
    var squareAdd = fmap(square, add);

    // result
    console.log("----- Задача 4 ----- \n\n");
    console.log(squareAdd(2, 3)); // 25 = (2 + 3) ^ 2
    console.log(squareAdd(5, 7)); // 144 = (5 + 7) ^ 2
    console.log("\n");

    // ЗАДАЧА 5
    function partial(func) {
        var argsPart = [];
        for (var e = 1; e < arguments.length; e++) {
            argsPart.push(arguments[e]);
        }
        return function() {
            var argsFn = [];
            for (var e = 0; e < arguments.length; e++) {
                argsFn.push(arguments[e]);
            }
            return func.apply(null, (argsPart.concat(argsFn)))
        }
    }
    function add(a, b) {
        return a + b;
    }
    function mult(a, b, c, d) {
        return a * b * c * d;
    }
    var add5 = partial(add, 5); // Мы получили функцию с 1 аргументом, которая прибавляет к любому числу 5

    // result
    console.log("----- Задача 5 add5 ----- \n\n");
    console.log(add5(2)); // 7
    console.log(add5(10)); // 15
    console.log(add5(8)); // 13
    console.log("\n");

    var mult23 = partial(mult, 2, 3); // мы зафиксировали первые 2 аргумента mult() как 2 и 3

    // result
    console.log("----- Задача 5 mult ----- \n\n");
    console.log(mult23(4, 5)); // 2*3*4*5 = 120
    console.log(mult23(1, 1)); // 2*3*1*1 = 6
    console.log("\n");

    // ЗАДАЧА 6
    function partialAny(func) {
        var argsPart = [];
        for (var e = 1; e < arguments.length; e++) {
            argsPart.push(arguments[e]);
        }
        return function() {
            var argsFn = [];
            var newArr = [];

            for (var e = 0; e < arguments.length; e++) {
                argsFn.push(arguments[e]);
            }
            for (var i = 0; i < argsPart.length; i++) {
                if (argsPart[i] === undefined){
                    newArr.push(argsFn[0]);
                    argsFn.splice(0, 1);
                } else {
                    newArr.push(argsPart[i]);
                }
            }
            return func.apply(null, newArr.concat(argsFn))
        }
    }
    function test(a, b, c) {
        return 'a=' + a + ',b=' + b + ',c=' + c;
    }

    var test1_3 = partialAny(test, 1, undefined, 3);

    // result
    console.log("----- Задача 6  ----- \n\n");
    console.log(test1_3(5, 6, 4)); // a=1,b=5,c=3
    console.log("\n");


    // ЗАДАЧА 7


    // ЗАДАЧА 8
    function pluck(arr, prop) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            newArr.push(arr[i][prop]);
        }
        return newArr;
    }
    var characters = [
        { 'name': 'barney', 'age': 36 },
        { 'name': 'fred', 'age': 40 }
    ];

    // result
    console.log("----- Задача 8 ----- \n\n");
    console.log(pluck(characters, 'name')); // ['barney', 'fred']
    console.log("\n");

    // ЗАДАЧА 9
    function filter(arr, func) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (func(arr[i])) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }
    var input = [1, 2, 3, 4, 5, 6];
    function isEven(x) { return x % 2 == 0; } // проверяет на четность

    console.log("----- Задача 9 ----- \n\n");
    console.log(filter(input, isEven)); // [2, 4, 6]
    console.log("\n");
});
