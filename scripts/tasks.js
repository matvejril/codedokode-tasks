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

    console.log("----- Задача 1 ----- \n\n");
    console.log("gen1", generator1());
    console.log("gen2", generator2());
    console.log("gen1", generator1());

    // ЗАДАЧА 2
    function take(fn, count) {
        var arr=[];
        for (var i = 0; i < count; i++) {
            arr.push(fn());
        }
        return arr
    }
    var gen2  = sequence(0, 2);

    console.log("----- Задача 2 ----- \n\n");
    console.log(take(gen2 , 5));

    // ЗАДАЧА 3



    // ЗАДАЧА 4

    // ЗАДАЧА 5

    // ЗАДАЧА 6

    // ЗАДАЧА 7
});
