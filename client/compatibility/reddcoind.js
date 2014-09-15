function is_reddcoind_available() {
    if(ServerStatus.findOne()) {
        var serverstatus = ServerStatus.findOne();

        return serverstatus.rddconnection;
    }

    return false;
}