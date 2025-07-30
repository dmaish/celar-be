import { Request, Response } from 'express';
import { User } from '../../database/entities/user.entity';
import { dataSource } from '../../database/ormconfig';
import ErrorHandler from '../../utils/errorHandler';
import ResponseHandler from '../../utils/responseHandler';
import { generateToken, isPasswordValid } from '../../utils/auth';
import { CURRENCY } from '../../utils/constants';
import { Transaction } from '../../database/entities/transactions.entity';



class AuthController {
    
    static async signup(req: Request, res: Response) {
        try {
            const { email, password, role } = req.body;

            const userRepository = dataSource.getRepository(User);
            const existingUser = await userRepository.findOneBy({ email }); 

            if (existingUser) {
                return ResponseHandler.response(res, [400, 'User already exists', false], null);
            }
            const userdata = userRepository.create({
                email,
                password,
                role
            });

            const user = await userRepository.save(userdata);

            // Seed the user with mock transactions after the database has been seeded
            // Check if the DB actuall has the data seeded in, if not, then seed it 'irst

            const seededUser = await userRepository.findOneBy({ email: 'psp@example.com' }); 
            if (seededUser) {
                const transactionRepo = dataSource.getRepository(Transaction);
                const transactions = transactionRepo.create([
                    {
                    amount: 250.75,
                    currency: CURRENCY.KES,
                    sender: user,
                    recipient: seededUser,
                    },
                    {
                    amount: 130.50,
                    currency: CURRENCY.USD,
                    sender: user,
                    recipient: seededUser,
                    },
                    {
                    amount: 1000,
                    currency: CURRENCY.KES,
                    sender: user,
                    recipient: seededUser,
                    },
                ]);

                await transactionRepo.save(transactions);
            }


            return ResponseHandler.response(res, [201, 'User registered successfully', true], user); 

            
        } catch (error) {
            return ErrorHandler.handleError(error, 500, res);

        }
    }

    static async login(req: Request, res: Response) {

        try {
            const { email, password } = req.body;

            const user = await dataSource
                .getRepository(User)
                .createQueryBuilder('user')
                .addSelect(['user.password', 'user.salt']) 
                .where('user.email = :email', { email })
                .getOne();

            if (!user) {
                return ResponseHandler.response(res, [401, 'No user matches provided email', false], null);
            }

            const passwordIsValid = await isPasswordValid( password, user.salt, user.password);

            if (!passwordIsValid){
                return ResponseHandler.response(res, [401, 'Provided credentials aren not valid', false], null);
            }

            const token = await generateToken(user); 

            return ResponseHandler.response(res, [200, 'Login successful', true], {
                id: user.id, 
                email: user.email, 
                role: user.role, 
                token
            });

        } catch (error) {

            return ErrorHandler.handleError(error, 500, res);
        }
    }
}

export default  AuthController;
