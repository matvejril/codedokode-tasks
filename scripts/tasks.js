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
    function fmap(a, b) {
        return function() {
            var args = [];
            for (var j = 0; j < arguments.length; j++) {
                args.push(arguments[j]);
            }
            return a(b.apply(null, args));
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

    // ЗАДАЧА 6

    // ЗАДАЧА 7
});
