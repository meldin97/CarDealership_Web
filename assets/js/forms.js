var users = [];
var idCounter = 1;

$("#registerForm").validate({
    rules: {
        first_name: {
            required: true,
            minlength: 2
        },
        last_name: {
            required: true,
            minlength: 2
        },
        username: {
            required: true,
            minlength: 5
        },
        email: {
            required: true
        },
        password: {
            required: true,
            minlength: 5
        },
        repeat_password: {
            required: true,
            equalTo: "#password"
        }
    },
    messages: {
        first_name: {
            required: "Molimo unesite vase ime.",
            minlength: "Ime prekratko"
        },
        last_name: {
            required: "Molimo unesite vase prezime",
            minlength: "Prezime prekratko"
        },
        username: {
            required: "Molimo unesite vas username",
            minlength: "Username prekratak"
        },
        email: {
            required: "Molimo unesite vas email"
        },
        password: {
            required: "Molimo unesite vasu sifru",
            minlength: "Sifra prekratka"
        },
        repeat_password: {
            required: "Molimo ponovite sifru",
            equalTo: "Unesene sifre se ne podudaraju"
        }
    },
    submitHandler: function(form, event) {
        event.preventDefault();
        blockUi("#registerForm");
        let data = serializeForm(form);

        data["id"] = idCounter;
        idCounter += 1;

        users.push(data);
        
if ($.fn.dataTable.isDataTable("#usersTable")) {
    $("#usersTable").dataTable().destroy();
}

        initializeDatatable("#usersTable", users);

        $("#registerForm")[0].reset();
        console.log(users);
        unblockUi("#registerForm");
    }
});

blockUi = (element) => {
    $(element).block({
        message: '<img src="assets/img/ajax-loader.gif" />',
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#fff',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: 0.5,
            color: '#333'
        }
    });
}

unblockUi = (element) => {
    $(element).unblock();
}

serializeForm = (form) => {
    let jsonResult = {};
    $.each($(form).serializeArray(), function(){
        jsonResult[this.name] = this.value;
    });
    return jsonResult;
}

initializeDatatable = (tableId, data) => {
    new DataTable(tableId, {
        columns: [
            {data: "id"},
            {data: "first_name"},
            {data: "last_name"},
            {data: "username"},
            {data: "email"},
            {data: "password"},
            {data: "repeat_password"}
        ],
        data: data
    });
};
