$(function () {
    $("#imie_error_message").hide();
    $("#nazwisko_error_message").hide();
    $("#data_error_message").hide();

    var error_imie = false;
    var error_nazwisko = false;
    var error_data = false;
    var error_select_contact = false;
    var error_telephone = false;

    const tab_false = [
        error_imie, error_nazwisko, error_data,
        error_select_contact, error_telephone
    ];

    $("#fname").on('click change focusout keyup', function () { check_name_length() });
    $("#sur_name").on('click change focusout keyup', function () { check_surname_length(); });

    $(".daty").on('click change focusout keyup', function () {
        check_not_null(this);
        check_date(this);
    });

    var colorStandardowy = $("#sec_name").css("color");
    var ramkaStandardowa = $("#sec_name").css("border");

    function to_red_border(idInputField) {
        $(idInputField).css("border", '1px solid red');
    }

    function check_not_null(d) {
        var dat1 = $(d).find('#date1').val();
        var dat2 = $(d).find('#date2').val();
        if (dat1 === "" || dat2 === "") {
            $(".control-label_daty").css("color", "#d9534f");
            $("#data1_error_message").html(" wybierz datę");
            $("#data1_error_message").show();
            if (dat1 == "") {
                to_red_border("#date1");
            }
            if (dat2 == "") {
                to_red_border("#date2");
            }
            error_data = true;
        }
        else {
            $("#data1_error_message").hide();
            $(".control-label_daty").css("color", colorStandardowy);
            $("#date1, #date2").css("border", ramkaStandardowa);
            error_data = false;
        }
    }

    function check_name_length() {
        var name_length = $("#fname").val().length;
        if (name_length < 3) {
            $("#imie_error_message").html(" powinno mieć co najmniej trzy litery");
            $("#imie_error_message").show();
            $(".control-label-fname").css("color", "#d9534f");
            $("#fname").css("border", '1px solid red');
            error_imie = true;
        } else {
            $("#imie_error_message").hide();
            $(".control-label-fname").css("color", colorStandardowy);
            $("#fname").css("border", ramkaStandardowa);
            error_imie = false;
        }
    }
    function check_surname_length() {
        var name_length = $("#sur_name").val().length;
        var colorStandardowy = $("#sec_name").css("color");
        if (name_length < 3) {
            $("#nazwisko_error_message").html(" powinno mieć co najmniej trzy litery");
            $("#nazwisko_error_message").show();
            $(".control-label-sur_name").css("color", "#d9534f");
            $("#sur_name").css("border", '1px solid red');
            error_nazwisko = true;
        } else {
            $("#nazwisko_error_message").hide();
            $(".control-label-sur_name").css("color", colorStandardowy);
            $("#sur_name").css("border", ramkaStandardowa);
            error_nazwisko = false;
        }
    }

    function check_date(d) {
        var data1 = $(d).find('#date1').val();
        var data2 = $(d).find('#date2').val();

        if (data1 > data2) {
            $("#data1_error_message").html("Data OD powinna być wcześniejsza od daty DO");
            $(".control-label_daty").css("color", "#d9534f");
            $('#data1_error_message').show();
            to_red_border('#date1');
            to_red_border('#date2');
            error_data = true;
        } else {
            $("data1_error_message").hide();
            $(".control-label_daty").css("color", colorStandardowy);
            $("#sur_name").css("border", ramkaStandardowa);
            error_data = false;
        }

    }

    $("#formularz").submit(function () {//szuka pierwszego pola z błędem i robi na nie focuks
        for (let i = 0; i < tab_false.length; i++) {
            if (tab_false[i] === false) {
                break;
            }
        }
    });
});