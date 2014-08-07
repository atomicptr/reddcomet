var rdd = new reddcoin({
    user: config.user,
    pass: config.pass
});

refresh_wallet_collection();
refresh_transactions();

Meteor.setInterval(function() {
    refresh_wallet_collection();
    refresh_transactions();
}, 5000);

function refresh_wallet_collection() {
    Wallet.remove({});

    Wallet.insert(rdd.info());
}

function refresh_transactions() {
    var transactions = rdd.transactions();

    transactions.forEach(function(transaction) {
        var trans = Transaction.findOne({txid: transaction.txid});

        if(!trans) {
            Transaction.insert(transaction);
        }
    });
}

Meteor.methods({
    validate_address: function(address) {
        return rdd.validate(address);
    }
})