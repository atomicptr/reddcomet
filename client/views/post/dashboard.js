Template.dashboard.helpers({
    balance: function() {
        if(Wallet.findOne()) {
            return Wallet.findOne().balance.toLocaleString();
        }

        return "...";
    },

    stake: function() {
        if(Wallet.findOne()) {
            return Wallet.findOne().stake.toLocaleString();
        }

        return "...";
    },

    unconfirmed_balance: function() {
        if(Wallet.findOne()) {
            return Wallet.findOne().unconfirmedbalance.toLocaleString();
        }

        return "...";
    },

    total_balance: function() {
        if(Wallet.findOne()) {
            var info = Wallet.findOne();

            return Number(info.balance + info.unconfirmedbalance).toLocaleString();
        }

        return "...";
    },

    transactions: function() {
        return Transaction.find({}, {sort: {time: -1}, limit: 10});
    }
});