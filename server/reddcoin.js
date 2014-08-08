var rdd = new reddcoin({
    user: config.user,
    pass: config.pass
});

// refresh before first interval
refresh();

Meteor.setInterval(refresh, 5000);

function refresh() {
    refresh_wallet_collection();
    refresh_stake();
    refresh_blocks();
    refresh_transactions();
}

function refresh_wallet_collection() {
    if(Wallet.findOne()) {
        Wallet.update({}, rdd.info());
    } else {
        Wallet.insert(rdd.info());
    }
}

function refresh_stake() {
    if(Stake.findOne()) {
        Stake.update({}, rdd.stake());
    } else {
        Stake.insert(rdd.stake());
    }
}

function refresh_blocks() {
    var blockcount = rdd.blockcount();

    var obj = {blockcount: blockcount};

    if(Blocks.findOne()) {
        Blocks.update({}, obj);
    } else {
        Blocks.insert(obj);
    }
}

function refresh_transactions() {
    var transactions = rdd.transactions();

    transactions.forEach(function(transaction) {
        var trans = Transaction.findOne({txid: transaction.txid});

        if(!trans) {
            Transaction.insert(transaction);
        } else {
            Transaction.update({txid: transaction.txid}, transaction);
        }
    });
}

Meteor.methods({
    validate_address: function(address) {
        return rdd.validate(address);
    },

    get_block_hash: function(num) {
        return rdd.blockhash(num);
    },

    get_block: function(hash) {
        return rdd.block(hash);
    },

    unlock: function(passphrase, timeout, stakeonly) {
        return rdd.unlock(passphrase, timeout, stakeonly);
    },

    refresh: function() {
        refresh();
    },

    send: function(address, amount, comment) {
        return rdd.send(address, amount, comment);
    }
})