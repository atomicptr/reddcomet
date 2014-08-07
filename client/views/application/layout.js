Template.layout.helpers({
    islocked: function() {
        if(Wallet.findOne()) {
            var wallet = Wallet.findOne();

            return wallet.locked;
        }

        return true;
    },

    synching: function() {
        if(Wallet.findOne() && Blocks.findOne()) {
            var wallet = Wallet.findOne();

            var blockcount = Blocks.findOne().blockcount;

            return wallet.blocks != blockcount;
        }

        return false;
    }
});