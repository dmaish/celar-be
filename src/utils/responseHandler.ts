import { Response } from 'express';

class ResponseHandler {
    static response(res: Response, message: [number, string, boolean], result: any) {
        return res.status(message[0]).json({
            success: message[2],
            message: message[1],
            result
        });
    }
}   

export default ResponseHandler;
