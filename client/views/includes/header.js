Template.header.helpers({
    islocked: function() {
        return islocked();
    },

    active_if_template: function(template) {
        var current_route = Router.current();

        return current_route && template === current_route.lookupTemplate() ? 'active' : '';
    }
});

Template.header.events({
    "click #lockwallet-btn": function() {
        Meteor.call("lockwallet", function(err, done) {
            console.log(done);
            Meteor.call("refresh", function() {});
        })
    }
});