import { Request, Response } from 'express';
import ErrorHandler from '../../utils/errorHandler';
import ResponseHandler from '../../utils/responseHandler';
import axios from 'axios';

import { Transaction } from '../../database/entities/transactions.entity';
import { dataSource } from '../../database/ormconfig';
import { User } from '../../database/entities/user.entity';


class AuthController {
    
    static async getTransactions(req: Request, res: Response) {
        try {
            const userId = req.user.id; 
            const transactions = await dataSource
                .getRepository(Transaction)
                .createQueryBuilder('transaction')
                .leftJoinAndSelect('transaction.sender', 'sender')
                .leftJoinAndSelect('transaction.recipient', 'recipient')
                .where('sender.id = :userId OR recipient.id = :userId', { userId })
                .orderBy('transaction.timestamp', 'DESC')
                .getMany();


            return ResponseHandler.response(res, [200, 'Transactions fetched successfully', true], transactions); 

            
        } catch (error) {
            return ErrorHandler.handleError(error, 500, res);

        }
    }

    static async sendTransaction(req: Request, res: Response) {
        try {

            // get receipient and amount from request body
            const { recipientId, amount, currency } = req.body;
            const sender = req.user;  

            // validate recipientId exists in the database
            const recipient = await dataSource
                .getRepository(User)
                .findOne({ where: { id: recipientId } });

            if (!recipient) {
                return ResponseHandler.response(res, [404, 'Recipient with ID not found', false], null);
            }

            const webhookURL = process.env.WEBHOOK_URL;
            if (!webhookURL) {
                return ResponseHandler.response(res, [500, 'Webhook URL is not configured', false], null);
            }
            
            const mockPayload = {
                event: 'test.event',
                data: {
                    message: 'Hello from /send!',
                    time: new Date().toISOString()
                }
            };
            await axios.post(webhookURL, mockPayload);

            // create a new transaction record and save it to the dab
            const transactionRepo = dataSource.getRepository(Transaction);
            const transactionObj = transactionRepo.create({
                amount,
                currency,
                sender,
                recipient
            });

           const transaction = await transactionRepo.save(transactionObj);

            return ResponseHandler.response(res, [201, 'Transaction made successfully', true], transaction); 

            
        } catch (error) {
            return ErrorHandler.handleError(error, 500, res);

        }
    }
}

export default  AuthController;
