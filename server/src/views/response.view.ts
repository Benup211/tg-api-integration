import {Response} from 'express';
export class ResponseService {
    static CreateErrorResponse(errorMsg:string,status:number){
        let err:Error=new Error(errorMsg);
        (err as any).errorStatus=status;
        throw err;
    }
    static CreateSuccessResponse(status:number,message:string,data:any,res:Response){
        res.status(status).json({
            status:status,
            message:message,
            data:data
        });
    }
}