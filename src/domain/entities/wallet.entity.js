export default class WalletEntity {
    constructor({ id, type, userId, isDefault }) {
        this.id = id;
        this.type = type;
        this.userId = userId;
    }
}