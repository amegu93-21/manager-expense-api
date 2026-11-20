import WalletEntity from "../../domain/entities/wallet.entity.js";

export default class WalletService {
    constructor(walletRepository) {
        this.walletRepository = walletRepository;
    }

    async createWallet(data) {
        if (!data.type) {
            throw new Error("Wallet type is required");
        }
        if (!["CASH", "BANK", "CREDIT_CARD"].includes(data.type)) {
            throw new Error("Invalid wallet type. Must be CASH, BANK, or CREDIT_CARD");
        }
        const walletEntity = new WalletEntity(data);
        return await this.walletRepository.save(walletEntity);
    }

    async getWallets(userId) {
        return await this.walletRepository.findByUserId(userId);
    }

    async deleteWallet(id, userId) {
        const wallet = await this.walletRepository.findById(id);
        if (!wallet) throw new Error("Wallet not found");
        if (wallet.userId !== userId) {
            throw new Error("Unauthorized to delete this wallet");
        }
        await this.walletRepository.delete(id);
        return { message: "Wallet deleted successfully" };
    }
}