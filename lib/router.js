Router.configure({
    layoutTemplate: 'layout',
    //loadingTemplate: 'loading',

    /*waitOn: function() {
        return Meteor.subscribe('posts');
    }*/
});

Router.map(function() {
    this.route('dashboard', {
        path: '/'
    });

    this.route('send', {
        path: '/send/:_to?',

        data: function() {
            return {to: this.params._to};
        }
    });
});