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
    console.log("----- Задача 6 ----- \n\n");
    console.log(test1_3(5, 6, 4)); // a=1,b=5,c=3
    console.log("\n");

    // ЗАДАЧА 7
    function bind(fn, context) {
        return function() {
            var newArg = [];
            for (var i = 0; i < arguments.length; i++) {
                newArg.push(arguments[i]);
            }
            return fn.apply(context, newArg);
        }
    }
    window.x = 1;
    var ctx = {
        x: 2
    };
    function testThis(a) {
        console.log("x=" + this.x + ", a=" + a);
    }

    // result
    console.log("----- Задача 7 ----- \n\n");
    testThis(100); // x=1, a=100
    var boundFunction = bind(testThis, ctx);
    boundFunction(100); // x=2, a=100
    console.log("\n");

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

    // result
    console.log("----- Задача 9 ----- \n\n");
    console.log(filter(input, isEven)); // [2, 4, 6]
    console.log("\n");

    // ЗАДАЧА 10
    function count (obj) {
        var len = 0;
        for (var key in obj) {
            len++;
        }
        return len;
    }
    var a = { a: 1, b: 2 };
    var b = function () { };
    var c = [1, 2, 3];
    var d = [];
    d[100] = 1;

    // result
    console.log("----- Задача 10 ----- \n\n");
    console.log(count(a)); // 2
    console.log(count(b)); // 0
    console.log(count(c)); // 3
    console.log(count(d)); // 1
    console.log("\n");

    // ЗАДАЧА 11
    var cities = [
        {country: "Республика Корея", city: "Сеул-Инчхон", population: 24210},
        {country: "Индия", city: "Мумбаи", population: 23265},
        {country: "Индонезия", city: "Джакарта", population: 32275},
        {country: "Япония", city: "Токио-Иокогама", population: 38050},
        {country: "Индия", city: "Дели", population: 27280},
        {country: "КНР", city: "Шанхай", population: 24115},
        {country: "Филиппины", city: "Манила", population: 24650}
    ];

    // arr - исходный массив
    // param - параметр сортировки
    // order - "asc"/"desc" (возрастание/ убывание)
    // len - колличесто выводимых элеменов
    function flexSort(arr, param, order, len) {
        arr.sort(sortByParam(param, order));
        return arr.slice(0, len);
    }
    function sortByParam(param, order) {
        return function (cityA, cityB) {
            var comparison = 0;
            if (cityA[param] < cityB[param]) {
                comparison = 1;
            } else if (cityA[param] > cityB[param]) {
                comparison = -1;
            }
            return (order == 'desc') ? (comparison * -1) : comparison
        }
    }

    // result
    console.log("----- Задача 11 ----- \n\n");
    console.log(flexSort(cities, "population", "asc", "5"));
    console.log("\n");

    // ЗАДАЧА 12
    // var orderHamburger = {
    //     SIZE_SMALL: "SIZE_SMALL",
    //     SIZE_LARGE: "SIZE_LARGE",
    //     STUFFING_CHEESE: "STUFFING_CHEESE",
    //     STUFFING_SALAD: "STUFFING_SALAD",
    //     STUFFING_POTATO: "STUFFING_POTATO",
    //     TOPPING_MAYO: "TOPPING_MAYO",
    //     TOPPING_SPICE: "TOPPING_SPICE"
    // };
    var orderHamburger = {
        SIZE_SMALL: {param: "SIZE_SMALL", price: 50, calorie: 20},
        SIZE_LARGE: {param: "SIZE_LARGE", price: 100, calorie: 40},
        STUFFING_CHEESE: {param: "STUFFING_CHEESE", price: 10, calorie: 20},
        STUFFING_SALAD: {param: "STUFFING_SALAD", price: 20, calorie: 5},
        STUFFING_POTATO: {param: "STUFFING_POTATO", price: 15, calorie: 5},
        TOPPING_MAYO: {param: "TOPPING_MAYO", price: 20, calorie: 5},
        TOPPING_SPICE: {param: "TOPPING_SPICE", price: 15, calorie: 0}
    };
    function Hamburger (size, stuffing) {
        if (!!size.param && !!stuffing.param) {
            this.init(size, stuffing);
        } else {
            console.log("Ошибка инициализации");
        }
    }
    Hamburger.prototype.init = function(size, stuffing) {
        this.params = {
            size: size,
            stuffing: stuffing,
            topping: []
        };
    };
    // Добавить добавку
    Hamburger.prototype.addTopping = function(topping) {
        var thisTopping = this.params.topping;
        var isPresent = 0;
        for (var i = 0; i < thisTopping.length; i++) {
            if (thisTopping[i].param === topping.param) {
                isPresent++;
            }
        }
        if (!isPresent) {
            thisTopping.push(topping);
        } else {
            console.log("Такая добавка уже есть")
        }
    };
    // Убрать добавку
    Hamburger.prototype.removeTopping = function(topping) {
        var thisTopping = this.params.topping;

        for (var i = 0; i < thisTopping.length; i++) {
            if (thisTopping[i].param === topping.param) {
                delete thisTopping[i];
            }
        }
    };
    // Получить список добавок arr
    Hamburger.prototype.getToppings = function() {
        return this.params.topping;
    };
    // Узнать размер
    Hamburger.prototype.getSize = function() {
        return this.params.size.param;
    };
    // Узнать начинку
    Hamburger.prototype.getStuffing = function() {
        return this.params.stuffing.param;
    };
    // Узнать цену гамбургера
    Hamburger.prototype.calculatePrice = function() {
        var thisParams = this.params;
        var totalPrice;
        var mainPrice = thisParams.size.price;
        var stuffPrice = thisParams.stuffing.price;
        var toppingPrice = 0;
        for (var i = 0; i < thisParams.topping.length; i++) {
            toppingPrice += thisParams.topping[i].price;
        }
        totalPrice = mainPrice + stuffPrice + toppingPrice;

        return totalPrice
    };
    // Узнать калорийность
    Hamburger.prototype.calculateCalories = function() {
        var thisParams = this.params;
        var totalCalories;
        var mainPrice = thisParams.size.calorie;
        var stuffPrice = thisParams.stuffing.calorie;
        var toppingPrice = 0;
        for (var i = 0; i < thisParams.topping.length; i++) {
            toppingPrice += thisParams.topping[i].calorie;
        }
        totalCalories = mainPrice + stuffPrice + toppingPrice;

        return totalCalories
    };

    var hamburger1 = new Hamburger(orderHamburger.SIZE_SMALL, orderHamburger.STUFFING_CHEESE);

    // result
    // console.log("----- Задача 12 ----- \n\n");
    // console.log("Размер", hamburger1.getSize());
    // console.log("Начинка", hamburger1.getStuffing());
    // console.log("calculatePrice", hamburger1.calculatePrice());
    // console.log("calculateCalories", hamburger1.calculateCalories());
    //
    // console.log(hamburger1.getToppings());
    // hamburger1.addTopping(orderHamburger.TOPPING_MAYO);
    // console.log(hamburger1.getToppings());
    // hamburger1.addTopping(orderHamburger.TOPPING_SPICE);
    // console.log("getToppings", hamburger1.getToppings());
    // console.log("removeTopping", hamburger1.removeTopping(orderHamburger.TOPPING_MAYO));
    // console.log("getToppings", hamburger1.getToppings());
    console.log("\n");

    // ЗАДАЧА 13
    var connectedObj = [
        {
            type: "powerPlants",
            count: 1,
            produceD: 20,
            produceN: 20,
            consumptionD: 0,
            consumptionN: 0
        }, {
            type: "powerPlants",
            count: 2,
            produceD: 30,
            produceN: 30,
            consumptionD: 0,
            consumptionN: 0
        }, {
            type: "powerPlants",
            count: 2,
            produceD: 50,
            produceN: 50,
            consumptionD: 0,
            consumptionN: 0
        }, {
            type: "house",
            count: 1,
            produceD: 0,
            produceN: 0,
            consumptionD: 200*4/1000,
            consumptionN: 200/1000,
            apartments: 200
        }, {
            type: "house",
            count: 1,
            produceD: 0,
            produceN: 0,
            consumptionD: 120*4/1000,
            consumptionN: 120/1000,
            apartments: 120
        },
        {
            type: "solarPanels",
            count: 2,
            produceD: 3,
            produceN: 0,
            consumptionD: 0,
            consumptionN: 0
        },
        {
            type: "solarPanels",
            count: 1,
            produceD: 5,
            produceN: 0,
            consumptionD: 0,
            consumptionN: 0
        },
        {
            type: "solarPanels",
            count: 5,
            produceD: 4,
            produceN: 0,
            consumptionD: 0,
            consumptionN: 0
        }
    ];
    var powerLines = [
        {
            count: 1,
            price: 2,
            power: 100
        },
        {
            count: 2,
            price: 3,
            power: 200
        }
    ];
    function ElectricGrid(connectedObj, powerLines) {
        this.connectedObj = connectedObj;
        this.powerLines = powerLines;
    }
    ElectricGrid.prototype.getInnerBalance = function() {
        var innerBalance = 0;
        for (var i = 0; i < this.connectedObj.length; i++) {
            var objElem = this.connectedObj[i];
            innerBalance += +(objElem.count * (objElem.produceD + objElem.produceN  - (objElem.consumptionD + objElem.consumptionN)))
        }
        return innerBalance;
    };
    ElectricGrid.prototype.getCashFlow = function() {
        var innerBalance = 0;
        var cashFlow = 0;
        var lineCapacity = 0;

        // Получить внетренний балан энергии
        for (var i = 0; i < this.connectedObj.length; i++) {
            var objElem = this.connectedObj[i];
            innerBalance += +(objElem.count * (objElem.produceD + objElem.produceN  - (objElem.consumptionD + objElem.consumptionN)))
        }

        // Сортировать линии по цене
        var powerLinesArr = this.powerLines.slice();
        powerLinesArr.sort(function (lineA, lineB) {
            if (lineA.price < lineB.price) {
                return 1;
            } else if (lineA.price > lineB.price) {
                return -1;
            }
        });

        // Найти денежный поток + -
        for (var e = 0; e < powerLinesArr.length; e++) {
            var powerLine = powerLinesArr[e];
            lineCapacity += powerLine.count * powerLine.power;
            cashFlow += innerBalance * powerLine.price;
            if (lineCapacity >= Math.abs(innerBalance)) {
                break
            }
        }

        // if (innerBalance > 0) {
        //     // for (var e = 0; e < powerLinesArr.length; e++) {
        //     //
        //     // }
        // } else {
        //
        // }

        return cashFlow;

    };

    var cityN = new ElectricGrid(connectedObj ,powerLines);

    // result
    console.log("----- Задача 13 ----- \n\n");
    console.log("Энергетический баланс города: ", cityN.getInnerBalance(), "МВт");
    console.log("Денежный поток: ", cityN.getCashFlow(), "у.е");
    console.log("\n");

    // ЗАДАЧА 14
    function checkType(type){
        switch (true) {
            case (arguments.length <= 0): {
                return "Ничего";
            }
            case (type === null): {
                return "null";
            }
            case (Object.prototype.toString.call(type) === "[object Array]"):{
                return "array";
            }
            case ((typeof type) === "object" ? type.hasOwnProperty("length") : false): {
                return "array-like"
            }
            default: {
                return typeof type;
            }
        }
    }

    // result
    console.log("----- Задача 14 ----- \n\n");
    console.log("Ничего:", checkType());
    console.log("undefined:", checkType(undefined));
    console.log("boolean:", checkType(true));
    console.log("number:", checkType(33));
    console.log("string:", checkType("33"));
    console.log("function:", checkType(function(){}));
    console.log("null:", checkType(null));
    console.log("array:", checkType([]));
    console.log("object:", checkType({}));
    console.log("array-like:", checkType({length: 2, 0: "0", 1: "1"}));
    console.log("\n");

    // ЗАДАЧА 15 (Неглубокое копирование объектов/массивов)
    function shallowCopy(obj) {
        // Обработка строк, чисел, булей, null или undefined
        if ( obj == null || typeof obj != "object") {
            return obj;
        }
        var newObj = {};
        // Обработка объекта даты
        if (Object.prototype.toString.call(obj) === '[object Date]') {
            newObj = new Date();
            newObj.setTime(obj.getTime());
            return newObj;
        }
        // Обработка остальных объектов
        if (Object.prototype.toString.call(obj) === "[object Object]") {
            newObj = Object.assign({}, obj);
            return newObj
        }
        // Обработка массивов
        if (Object.prototype.toString.call(obj) === "[object Array]") {
            newObj = obj.slice();
            return newObj
        }
        return newObj
    }

    // mocks
    var shallowCopyObj = {
        name: "Matvey",
        age: "24",
        cities: {
            0: "Moscow",
            1: "St.Petersburg",
            2: "Novosibirsk"
        },
        date: new Date(2014, 1, 1, 12, 0, 0),
        und: undefined,
        ul: null,
        arr: ["1", "2", [1, "sad"]]
    };
    var shallowCopyDate = new Date();
    var shallowCopyArr = ["el0", "el1", "el2", new Date(), ["el30", "el31", new Date()], undefined, null];

    // result
    console.log("----- Задача 15 ----- \n\n");
    var shallowCopyObj1 = shallowCopy(shallowCopyObj);
    shallowCopyObj1.age = "25";
    shallowCopyObj1.arr[0] = "25";
    console.log("shallowCopyObj", shallowCopyObj);
    console.log("shallowCopyObj1", shallowCopyObj1);
    var shallowCopyDate1 = shallowCopy(shallowCopyDate);
    console.log("shallowCopyDate", shallowCopyDate);
    console.log("shallowCopyDate1", shallowCopyDate1);
    var shallowCopyArr1 = shallowCopy(shallowCopyArr);
    shallowCopyArr1[0] = 'newel0';
    shallowCopyArr1[4][0] = 'newel30';
    console.log("shallowCopyArr", shallowCopyArr);
    console.log("shallowCopyArr1", shallowCopyArr1);
    console.log("\n");

    // ЗАДАЧА 16 (Глубокое копирование объектов/массивов)
    function deepCopy(obj) {
        // Обработка строк, чисел, булей, null или undefined
        if ( obj == null || typeof obj != "object") {
            return obj;
        }
        var newObj;
        // Обработка объекта даты
        if (Object.prototype.toString.call(obj) === '[object Date]') {
            newObj = new Date();
            newObj.setTime(obj.getTime());
            return newObj;
        }
        // Обработка массивов
        if (Object.prototype.toString.call(obj) === "[object Array]") {
            newObj = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                newObj[i] = deepCopy(obj[i]);
            }
            return newObj;
        }
        // Обработка остальных объектов
        if (Object.prototype.toString.call(obj) === "[object Object]") {
            newObj = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    newObj[attr] = deepCopy(obj[attr]);
                }
            }
            return newObj;
        }

        console.error("Не удалось скопировать объект! Его тип не поддерживается.", obj);
    }

    Object.defineProperties(Object, {
        'extend': {
            'configurable': true,
            'enumerable': false,
            'value': function extend(what, wit) {
                var extObj, witKeys = Object.keys(wit);

                extObj = Object.keys(what).length ? Object.clone(what) : {};

                witKeys.forEach(function(key) {
                    Object.defineProperty(extObj, key, Object.getOwnPropertyDescriptor(wit, key));
                });

                return extObj;
            },
            'writable': true
        },
        'clone': {
            'configurable': true,
            'enumerable': false,
            'value': function clone(obj) {
                return Object.extend({}, obj);
            },
            'writable': true
        }
    });
    function clone(obj) {
        var target = {};
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                target[i] = obj[i];
            }
        }
        return target;
    }

    // mocks
    var deepCopyObj = {
        name: "Matvey",
        age: "24",
        cities: {
            0: "Moscow",
            1: "St.Petersburg",
            2: "Novosibirsk"
        },
        date: new Date(2014, 1, 1, 12, 0, 0),
        und: undefined,
        ul: null,
        arr: ["1", "2", [1, "sad"]]
    };
    var deepCopyDate = new Date();
    var deepCopyArr = ["el0", "el1", "el2", new Date(), ["el30", "el31", new Date()], undefined, null, {name: "Gena"}];

    // result
    console.log("----- Задача 16 ----- \n\n");
    var deepCopyObj1 = deepCopy(deepCopyObj);
    deepCopyObj1.age = "25";
    deepCopyObj1.cities[2] = "Omsk";
    console.log("deepCopyObj", deepCopyObj);
    console.log("deepCopyObj1", deepCopyObj1);
    var deepCopyDate1 = deepCopy(deepCopyDate);
    console.log("deepCopyDate", deepCopyDate);
    console.log("deepCopyDate1", deepCopyDate1);
    var deepCopyArr1 = deepCopy(deepCopyArr);
    deepCopyArr1[0] = 'newel0';
    deepCopyArr1[4][0] = 'newel30';
    deepCopyArr1[7].name = 'newName';
    console.log("deepCopyArr", deepCopyArr);
    console.log("deepCopyArr1", deepCopyArr1);
    console.log("\n");
});
