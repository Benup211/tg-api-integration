import primsa from '../models/movie.model';
export class MovieRepository{

    static async GetAllMovies(skip: number, take: number){
        return await primsa.movie.findMany({
            skip: skip,
            take: take,
            include: {
                director: {
                    select: {
                        name: true
                    }
                }
            }
        });
    }

    static async GetTotalMovies(){
        return await primsa.movie.count();
    }
}