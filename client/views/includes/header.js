Template.header.helpers({
    islocked: function() {
        if(Wallet.findOne()) {
            var wallet = Wallet.findOne();

            return wallet.locked;
        }

        return true;
    }
});

Template.header.events({
    "click #unlock-btn": function(e) {
        var passphrase = $("#unlock-passphrase").val();
        var timeout = $("#unlock-timeout").val();
        var stakeonly = $("#unlock-stakeonly").is(':checked');

        if(!isNaN(timeout)) {
            Meteor.call("unlock", passphrase, Number(timeout), stakeonly, function(err, done) {
                if(done.code) {
                    $("#unlock-passphrase").parent().attr("class", "has-error has-feedback");
                    $("#unlock-passphrase").parent().append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
                } else {
                    Meteor.call("refresh", function() {
                        $('#unlock-modal').modal('hide');
                    });
                }
            });
        } else {
            $("#unlock-timeout").parent().attr("class", "has-error has-feedback");
            $("#unlock-timeout").parent().append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
        }
    }
})