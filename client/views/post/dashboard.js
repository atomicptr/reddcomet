Template.dashboard.helpers({
    islocked: function() {
        if(Wallet.findOne()) {
            var wallet = Wallet.findOne();

            return wallet.locked;
        }

        return true;
    },

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

    isstaking: function() {
        if(Stake.findOne()) {
            var stake = Stake.findOne();

            if(stake.staking) {
                return "glyphicon glyphicon-ok receive";
            }
        }

        return "glyphicon glyphicon-remove send"
    },

    staketime: function() {
        if(Stake.findOne()) {
            var stake = Stake.findOne();

            var network_weight = stake.netstakeweight;
            var total_weight = stake.totalweight;

            var estimated_time = 60 * network_weight / total_weight;

            if(estimated_time < 60) {
                return Math.ceil(estimated_time) + " second(s)";
            } else if(estimated_time < 60 * 60) {
                return Math.ceil(estimated_time / 60) + " minute(s)";
            } else if(estimated_time < 24 * 60 * 60) {
                return Math.ceil(estimated_time / (60 * 60)) + " hour(s)";
            } else {
                return Math.ceil(estimated_time / (60 * 60 * 24)) + " day(s)";
            }
        }

        return "-";
    },

    usd_balance: function() {
        if(Cryptsy.findOne() && Wallet.findOne()) {
            var s = Cryptsy.findOne();
            var wallet = Wallet.findOne();

            var balance = (wallet.balance + wallet.unconfirmedbalance);

            return "$ " + Number(s.usd * balance, 2).toFixed(2);
        }

        return "-";
    },

    satoshi: function() {
        if(Cryptsy.findOne()) {
            var s = Cryptsy.findOne();

            return s.satoshi;
        }

        return "-";
    },

    transactions: function() {
        return Transaction.find({}, {sort: {time: -1}, limit: 10});
    }
});