import { Request, Response, NextFunction } from "express";
import { ResponseService } from "../views";
import { MovieRepository } from "../repository/movie.repository";
export class MovieController {
    static async GetAllMovies(req: Request, res: Response, next: NextFunction) {
        const { skip, take } = req.query;
        try {
            let movies = await MovieRepository.GetAllMovies(Number(skip), Number(take));
            ResponseService.CreateSuccessResponse(
                200,
                "Movies fetched successfully",
                movies,
                res
            );
        } catch (error) {
            next(
                ResponseService.CreateErrorResponse(
                    "Movies Fetching Error(Server Error)",
                    400
                )
            );
        }
    }
    static async GetTotalMovies(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let totalMovies = await MovieRepository.GetTotalMovies();
            ResponseService.CreateSuccessResponse(
                200,
                "Total Movies fetched successfully",
                { totalMovies },
                res
            );
        } catch (error) {
            next(
                ResponseService.CreateErrorResponse(
                    "Total Movies Fetching Error(Server Error)",
                    400
                )
            );
        }
    }
}
