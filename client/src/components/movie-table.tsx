import { motion } from "framer-motion";
import { FC, ReactElement, useEffect, useState } from "react";
import { Pagination } from "./pagination";
import { usePaginationStore } from "../states/pagination.state";

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

export interface MovieTableProps {
    movies: Movie[];
    total: number;
    searchingMovies:boolean;
}
export const MovieTable: FC<MovieTableProps> = (props): ReactElement => {
    const { movies,total,searchingMovies } = props;
    const {currentPage,take,setCurrentPage}=usePaginationStore();
    const [movieList, setMovieList] = useState(movies);

    const handlePageChange = async (page: number) => {
        setCurrentPage(page);
    };

    useEffect(()=>{
        setMovieList(movies);
    },[movies])
    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">
                    Movie List
                </h2>
            </div>

            <div className="overflow-x-auto overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Director
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Duration
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Year
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Ratings
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-700">
                        {movieList.length === 0 ? (
                            <tr className="text-sm p-4 font-bold">
                                <td className="p-4" colSpan={3}>
                                    No Movies Found
                                </td>
                            </tr>
                        ) : (
                            movieList.map((movieData, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex justify-start items-center gap-2">
                                        {movieData.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                        {movieData.director.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {movieData.duration}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                        {movieData.year}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {movieData.rating}
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
                {(!searchingMovies) &&(
                    movieList.length > 0 && (
                        <Pagination
                            totalPages={Math.ceil(total/take)}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    )
                )}
            </div>
        </motion.div>
    );
};
