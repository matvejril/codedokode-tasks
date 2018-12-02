var toInputFormat = require('../helpers/dateFormat');

function OrderForm (selector) {
    var that = this;
    this.$orderForm = $(selector);

    if (this.$orderForm[0]) {
        this.init(that);
    }
}

OrderForm.prototype.init = function(that) {
    this.elements = {
        $inputName: this.$orderForm.find('textarea[name="name"]'),
        $inputInn: this.$orderForm.find('input[name="inn"]'),
        $inputMail: this.$orderForm.find('input[name="mail"]'),
        $inputPhone: this.$orderForm.find('input[name="phone"]'),
        $inputDate: this.$orderForm.find('input[name="date"]'),

        $submitBtn: this.$orderForm.find('.order-form__submit'),
        $clearBtn: this.$orderForm.find('.order-form__clear')
    };


    // Задать начальное состояние формы
    this.clearForm();


    // Валидация формы
    var validParams = {
        errorElement: "p",
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 200
            },
            inn: {
                required: false,
                minlenghtinn: true
            },
            mail: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                minlenghtphone: true
            },
            date: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Это поле обязательно для заполнения",
                minlength: "Слишком короткое имя",
                maxlength: "Слишком длинное имя"
            },
            inn: {
            },
            mail: {
                required: "Это поле обязательно для заполнения",
                email: "Пожалуйста введите email корректно"
            },
            phone: {
                required: "Это поле обязательно для заполнения"
            },
            date: {
                required: "Это поле обязательно для заполнения"
            }
        }
    };
    $.validator.addMethod("minlenghtphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 10;
    }, "Введите полный номер телефона");
    $.validator.addMethod("minlenghtinn", function (value, element) {
        var innLength = value.replace(/\D+/g, '').length;
        return (innLength >= 10 || innLength < 1) && innLength !== 11;
    }, "Введите полный ИНН");

    this.$orderForm.validate(validParams);


    // Маски формы
    this.elements.$inputInn.inputmask("999999999999");
    this.elements.$inputMail.inputmask("email");
    this.elements.$inputPhone.inputmask("+7 (999) 999 99 99");


    // События формы
    this.elements.$submitBtn.on("click", function(e) {
        e.preventDefault();
        that.submitForm();
    });
    this.elements.$clearBtn.on("click", function(e) {
        e.preventDefault();
        that.clearForm();
    })
};

OrderForm.prototype.submitForm = function() {
    var resltValid = this.$orderForm.valid();

    if (resltValid) {
        var formData = {
            name: this.elements.$inputName.val(),
            INN: this.elements.$inputInn.val(),
            email: this.elements.$inputMail.val(),
            telephone: this.elements.$inputPhone.val(),
            date_order: this.elements.$inputDate.val()
        };
        var formDataJSON = JSON.stringify(formData);

        console.log(formDataJSON);
        alert(formDataJSON);
    }
};

OrderForm.prototype.clearForm = function() {
    var nextDay = new Date().getTime() + 24 * 60 * 60 * 1000;

    this.elements.$inputName.val('');
    this.elements.$inputInn.val('');
    this.elements.$inputMail.val('');
    this.elements.$inputPhone.val('');
    this.elements.$inputDate.val(toInputFormat(nextDay));
};

module.exports = OrderForm;
