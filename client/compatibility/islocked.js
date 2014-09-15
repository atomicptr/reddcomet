function islocked() {
    if(!is_reddcoind_available()) {
        return true;
    }

    if(Wallet.findOne()) {
        var wallet = Wallet.findOne();

        return wallet.locked && wallet.encrypted;
    }

    return true;
}