Template.transactions.helpers({
    transactions: function() {
        return Transaction;
    },

    settings: function() {
        return {
            rowsPerPage: 20,
            showFilter: false,
            showNavigation: 'auto',
            fields: [
                {
                    key: "confirmations",
                    label: "",

                    fn: function(value, object) {
                        var confirms = object.confirmations;
                        var confirmed_css = confirms >= 3 ? "glyphicon-ok confirmed" : "glyphicon-remove unconfirmed";
                        return new Spacebars.SafeString('<span title="' + confirms + ' confirmations" class="glyphicon ' + confirmed_css + '"></span>');
                    }
                },
                {
                    key: "category",
                    label: "Type",

                    fn: function(value, object) {
                        return object.category == "send" ? "Sent" : "Receive"
                    }
                },
                {
                    key: "address",
                    label: "Address",

                    fn: function(value, object) {
                        if(object.account) {
                            return object.account;
                        } else {
                            Meteor.call('validate_address', object.address, function(err, info) {
                                Session.set('vaddress_' + object.address, info);
                            });

                            var vaddress = Session.get('vaddress_' + object.address);

                            if(vaddress && vaddress.account) {
                                return vaddress.account;
                            }
                        }

                        return object.address;
                    }
                },
                {
                    key: "amount",
                    label: "Amount",

                    fn: function(value, object) {
                        var amount = object.amount.toLocaleString();

                        return new Spacebars.SafeString('<span class="' + object.category + '">' + amount + ' RDD</span>');
                    }
                },
                {
                    key: "date",
                    label: "Date",
                    sort: "descending",

                    fn: function(value, object) {
                        return display_date(new Date(object.time * 1000));
                    }
                }
            ]
        };
    }
})