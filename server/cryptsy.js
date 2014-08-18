var Future = Npm.require("fibers/future");

refresh_cryptsy();

Meteor.setInterval(function() {
    refresh_cryptsy();
}, 30000);

function refresh_cryptsy() {

    var satoshi = get_satoshi();
    var usd = get_usd();

    var obj = {satoshi: satoshi, usd: usd};

    if(Cryptsy.findOne()) {
        Cryptsy.update({}, obj)
    } else {
        Cryptsy.insert(obj);
    }
}

function get_satoshi() {
    var future = new Future();

    HTTP.get("http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=169", function(err, done) {
        if(err) {
            console.log(err);

            future.return({error: true, err: err});
        } else {
            future.return(done);
        }
    });

    var data = future.wait();

    if(data.error) {
        return null;
    }

    var json = JSON.parse(data.content);

    var current_price = Number(json.return.markets.RDD.lasttradeprice);

    return current_price * 100000000;
}

function get_usd() {
    var future = new Future();

    HTTP.get("http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=262", function(err, done) {
        if(err) {
            console.log(err);

            future.return({error: true, err: err});
        } else {
            future.return(done);
        }
    });

    var data = future.wait();

    if(data.error) {
        return null;
    }

    var json = JSON.parse(data.content);

    var current_price = Number(json.return.markets.RDD.lasttradeprice);

    return current_price;
}