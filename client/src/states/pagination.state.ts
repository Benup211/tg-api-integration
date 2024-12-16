import { create } from "zustand";
import axios, { AxiosError } from "axios";

export interface IErrorResponse {
    status: number;
    errorName: string;
    errorMessage: string;
}

interface PaginationState {
    currentPage: number;
    totalMovies: number;
    take: number;
    loadingTotalMovies: boolean;
    setLoadingTotalMovies: (loading: boolean) => void;
    setCurrentPage: (page: number) => void;
    setTake: (take: number) => void;
    setTotalMovies: (totalMovies: number) => void;

    fetchTotalMovies: () => Promise<void>;
}

export const usePaginationStore = create<PaginationState>((set) => ({
    currentPage: 1,
    totalMovies: 0,
    take: 5,
    loadingTotalMovies: false,
    setLoadingTotalMovies: (loading: boolean) =>
        set({ loadingTotalMovies: loading }),
    setCurrentPage: (page: number) => set({ currentPage: page }),
    setTake: (take: number) => set({ take: take }),
    setTotalMovies: (totalMovies: number) => set({ totalMovies: totalMovies }),

    fetchTotalMovies: async () => {
        set({ loadingTotalMovies: true });
        try {
            const response = await axios.get(
                "http://localhost:3000/api/movies/getTotalMovies"
            );
            if (response.status === 200) {
                set({ totalMovies: response.data.data.totalMovies });
            }
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ loadingTotalMovies: false });
            throw Error(response?.data.errorMessage);
        }
    },
}));
