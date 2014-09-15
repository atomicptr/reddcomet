server_status = function(status) {
    if(ServerStatus.findOne()) {
        ServerStatus.update({}, status);
    } else {
        ServerStatus.insert(status);
    }
}