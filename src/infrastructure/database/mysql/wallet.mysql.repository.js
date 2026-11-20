import { DataTypes, Op } from "sequelize";
import sequelize from "./connection.js";

export const WalletModel = sequelize.define("Wallet", {
    type: {
        type: DataTypes.ENUM("CASH", "BANK", "CREDIT_CARD"),
    },
    userId: { type: DataTypes.STRING, allowNull: true }
}, { timestamps: true });

export default class WalletMySQLRepository {

    async save(walletEntity) {
        const wallet = await WalletModel.create({
            type: walletEntity.type,
            userId: walletEntity.userId
        });
        return wallet.toJSON();
    }

    async delete(id) {
        const wallet = await WalletModel.findByPk(id);
        if (!wallet) return null;
        await wallet.destroy();
        return true;
    }

    async findById(id) {
        return await WalletModel.findByPk(id);
    }

    async findByUserId(userId) {
        return await WalletModel.findAll({ where: { userId } });
    }
}