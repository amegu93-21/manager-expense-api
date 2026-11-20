import WalletController from '../controllers/wallet.controller.js';
import WalletService from '../../application/use-cases/wallet.service.js';
import WalletMySQLRepository from '../../infrastructure/database/mysql/wallet.mysql.repository.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { Router } from 'express';

const walletRepository = new WalletMySQLRepository();
const walletService = new WalletService(walletRepository);
const walletController = new WalletController(walletService);

const router = Router();

/**
 * @swagger
 * /wallets:
 *   get:
 *     summary: Obtener todas las billeteras del usuario
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de billeteras del usuario
 */
router.get('/', authMiddleware, walletController.getWallets);


/**
 * @swagger
 * /wallets:
 *   post:
 *     summary: Crear una nueva billetera
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type]
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [CASH, BANK, CREDIT_CARD]
 *                 example: "CASH"
 *     responses:
 *       201:
 *         description: Billetera creada exitosamente
 */
router.post('/', authMiddleware, walletController.createWallet);


/**
 * @swagger
 * /wallets/{id}:
 *   delete:
 *     summary: Eliminar una billetera
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Billetera eliminada
 */
router.delete('/:id', authMiddleware, walletController.deleteWallet);

export default router;