import { Request, Response, NextFunction } from "express";
import { ResponseService } from "../views";
import { MovieRepository } from "../repository/movie.repository";
export class MovieController {
    static async GetAllMovies(req: Request, res: Response, next: NextFunction) {
        let { skip = 0, take = 5 } = req.query;
        try {
            let movies = await MovieRepository.GetAllMovies(
                Number(skip),
                Number(take)
            );
            ResponseService.CreateSuccessResponse(
                200,
                "Movies fetched successfully",
                movies,
                res
            );
        } catch (error) {
            next(error);
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
            next(error);
        }
    }

    static async searchMovies(req: Request, res: Response, next: NextFunction) {
        let { searchTerm='' } = req.query;
        try {
            let movies = await MovieRepository.searchMovies(
                searchTerm as string
            );
            ResponseService.CreateSuccessResponse(
                200,
                "Movies fetched successfully",
                movies ,
                res
            );
        } catch (error) {
            next(error);
        }
    }
}
