Template.transaction.helpers({
    confirmedcss: function() {
        if(this.confirmations >= 3) {
            return "glyphicon-ok confirmed";
        } else {
            return "glyphicon-remove unconfirmed";
        }
    },

    confirmations: function() {
        return this.confirmations;
    },

    typetext: function() {
        return this.category == "send" ? "Sent" : "Receive";
    },

    address: function() {
        if(this.account) {
            return this.account;
        } else {
            var that = this;

            Meteor.call('validate_address', this.address, function(err, info) {
                Session.set('vaddress_' + that.address, info);
            });

            var vaddress = Session.get('vaddress_' + this.address);

            if(vaddress && vaddress.account) {
                return vaddress.account;
            }
        }

        return this.address;
    },

    type: function() {
        return this.category;
    },

    amount: function() {
        return this.amount.toLocaleString();
    },

    date: function() {
        return display_date(new Date(this.time * 1000));
    }
});