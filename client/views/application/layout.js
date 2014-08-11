Template.layout.helpers({
    islocked: function() {
        return islocked();
    },

    syncing: function() {
        if(Wallet.findOne() && Blocks.findOne()) {
            var wallet = Wallet.findOne();

            Meteor.call("get_block_hash", wallet.blocks, function(err, hash) {
                Meteor.call("get_block", hash, function(err, block) {
                    Session.set("block_time", block.time);
                });
            });

            var block_time = Session.get('block_time');

            if(block_time) {
                var block_date = new Date(block_time * 1000);

                var curr_date = new Date();

                var diff = curr_date.getTime() - block_date.getTime();

                var seconds = Math.abs(diff / 1000);

                return Math.round(seconds / (60 * 60)) > 0;

            }
        }

        return false;
    },

    notencrypted: function() {
        if(Wallet.findOne()) {
            var wallet = Wallet.findOne();

            return !wallet.encrypted;
        }

        return false;
    }
});

Template.layout.events({
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
    },

    "click #encrypt-btn": function(e) {
        var passphrase = $("#encrypt-passphrase").val();
        var passphrase_retype = $("#encrypt-passphrase-retype").val();

        if(passphrase == passphrase_retype) {
            Meteor.call("encrypt", passphrase, function(err, done) {
                if(done.code) {
                    console.log(done);
                } else {
                    Meteor.call("refresh", function() {
                        $('#encrypt-modal').modal('hide');
                    });
                }
            });
        } else {
            $("#encrypt-passphrase-retype").parent().attr("class", "has-error has-feedback");
            $("#encrypt-passphrase-retype").parent().append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
        }
    }
});