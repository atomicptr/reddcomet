function islocked() {
    if(Wallet.findOne()) {
        var wallet = Wallet.findOne();

        return wallet.locked && wallet.encrypted;
    }

    return true;
}