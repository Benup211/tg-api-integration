import { Router } from "express";
import { GlobalMiddleware } from "../middleware/global.middleware";
import { MovieController } from "../controllers/movie.controller";
class MovieRoute {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/getAll", MovieController.GetAllMovies);
        this.router.get("/getTotalMovies", MovieController.GetTotalMovies);
    }
    postRoutes() {
    }
}
export default new MovieRoute().router;