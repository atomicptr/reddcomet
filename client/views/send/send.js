function validate_send_address() {
    var address = $("#send-address").val();

    Meteor.call('validate_address', address, function(err, val) {
        Session.set('send-address-valid', val);
    });

    var addressval = Session.get('send-address-valid');

    if(addressval) {
        if(addressval.isvalid) {
            $("#send-address").parent().addClass("has-success");
            $("#send-address").parent().removeClass("has-error");

            return true;
        } else {
            $("#send-address").parent().addClass("has-error");
            $("#send-address").parent().removeClass("has-success");

            return false;
        }
    }
}

function validate_send_amount() {
    var amount = $("#send-amount").val();

    if(!isNaN(amount)) {
        $("#send-amount").parent().addClass("has-success");
        $("#send-amount").parent().removeClass("has-error");

        return true;
    } else {
        $("#send-amount").parent().addClass("has-error");
        $("#send-amount").parent().removeClass("has-success");

        return false;
    }
}

Template.send.helpers({
    to_address: function() {
        return this.to ? this.to : "";
    }
});

Template.send.events({
    'keyup #send-address': validate_send_address,
    'onchange #send-address': validate_send_address,

    'keyup #send-amount': validate_send_amount,
    'onchange #send-address': validate_send_amount,

    'click #send-btn': function() {
        var address = $("#send-address").val();
        var amount = $("#send-amount").val();
        var comment = $("#send-comment").val();

        var address_valid = validate_send_address();
        var amount_valid = validate_send_amount();

        if(address_valid && amount_valid) {
            Meteor.call("send", address, Number(amount), comment, function(err, res) {
                console.log(res);

                Router.go("dashboard");
            });
        } else {
            // not valid
            console.log("not valid");
        }
    }
});