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
    }
});