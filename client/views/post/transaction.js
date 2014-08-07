Template.transaction.helpers({
    confirmedcss: function() {
        if(this.confirmations > 3) {
            return "glyphicon-ok confirmed";
        } else {
            return "glyphicon-remove unconfirmed";
        }
    },

    typetext: function() {
        return this.category == "send" ? "Sent" : "Receive";
    },

    address: function() {
        if(this.account) {
            return this.account;
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
        return new Date(this.time * 1000);
    }
});