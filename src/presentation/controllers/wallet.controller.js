export default class WallletController {
    constructor(walletService) {
        this.walletService = walletService;
    }

    createWallet = async (req, res) => {
        const data = { ...req.body, userId: req.user.id };
        try {
            const wallet = await this.walletService.createWallet(data);
            res.status(201).json(wallet);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    getWallets = async (req, res) => {
        try {
            const categories = await this.walletService.getWallets(req.user.id);
            res.status(200).json(categories);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    };

    deleteWallet = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.walletService.deleteWallet(id, req.user.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}