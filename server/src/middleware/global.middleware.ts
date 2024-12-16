import { validationResult } from "express-validator";
import { ResponseService } from "../views";
import { Request,Response,NextFunction } from "express";
export class GlobalMiddleware{
    static CheckValidationResult(req: any, res: any, next: any){
        const error=validationResult(req);
        if(!error.isEmpty()){
            next(ResponseService.CreateErrorResponse(error.array()[0].msg,400));
        }
        next();
    }
}