import { Request, Response } from 'express';
import ErrorHandler from '../../utils/errorHandler';
import ResponseHandler from '../../utils/responseHandler';

import { dataSource } from '../../database/ormconfig';
import { User } from '../../database/entities/user.entity';

class UserController {
    
    static async getUsers(req: Request, res: Response) {
        try {
            const users = await dataSource
                .getRepository(User)
                .createQueryBuilder('user')
                .select(['user.id', 'user.email'])
                .getMany();


            return ResponseHandler.response(res, [200, 'Users fetched successfully', true], users); 

            
        } catch (error) {
            return ErrorHandler.handleError(error, 500, res);

        }
    }
}

export default  UserController;
