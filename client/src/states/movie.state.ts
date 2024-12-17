import { create } from "zustand";
import axios, { AxiosError } from "axios";

export interface IErrorResponse {
    status: number;
    errorName: string;
    errorMessage: string;
}

export interface Director {
    name: string;
}

export interface Movie {
    id: number;
    title: string;
    director_id: number;
    duration: number;
    year: number;
    rating: number;
    director: Director;
}

export interface MovieStoreState {
    movies: Movie[];
    isLoading: boolean;
    setisLoading: (isLoading: boolean) => void;
    error: boolean;
    fetchMovies: (skip:number,take:number) => Promise<void>;
    searchMovies: (searchTerm: string) => Promise<void>;
}

const useMovieStore = create<MovieStoreState>((set) => ({
    movies: [],
    isLoading: false,
    setisLoading: (isLoading) => set({ isLoading }),
    error: false,
    fetchMovies: async (skip: number = 0, take: number = 8) => {
        set({ isLoading: true, error: false });
        try {
            const response = await axios.get(
                "http://localhost:3000/api/movies/getAll",
                {
                    params: {
                        skip: skip,
                        take: take,
                    },
                }
            );
            if (response.status === 200) {
                set({ movies: response.data.data});
            }
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isLoading: false, error: true });
            throw Error(response?.data.errorMessage);
        }
    },

    searchMovies: async (searchTerm: string) => {
        set({ isLoading: true, error: false });
        try {
            const response = await axios.get(
                "http://localhost:3000/api/movies/search",
                {
                    params: {
                        searchTerm: searchTerm,
                    },
                }
            );
            if (response.status === 200) {
                set({ movies: response.data.data });
            }
            console.log(response.data.data);
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isLoading: false, error: true });
            throw Error(response?.data.errorMessage);
        }
    },
}));

export default useMovieStore;
