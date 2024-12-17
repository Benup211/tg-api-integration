import primsa from "../models/movie.model";
export class MovieRepository {
    static async GetAllMovies(skip: number=0, take: number=5) {
        return await primsa.movie.findMany({
            skip: skip,
            take: take,
            include: {
                director: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }

    static async GetTotalMovies() {
        return await primsa.movie.count();
    }

    static async searchMovies(searchTerm: string='') {
        return await primsa.movie.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: searchTerm,
                            mode: "insensitive",
                        },
                    },
                    {
                        director: {
                            name: {
                                contains: searchTerm,
                                mode: "insensitive",
                            },
                        },
                    },
                ],
            },
            include: {
                director: true,
            },
        });
    }
}
