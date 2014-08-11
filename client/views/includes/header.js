Template.header.helpers({
    islocked: function() {
        return islocked();
    },

    active_if_template: function(template) {
        var current_route = Router.current();

        return current_route && template === current_route.lookupTemplate() ? 'active' : '';
    }
});