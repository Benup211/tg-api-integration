import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { MovieTable } from "../components/movie-table";
import { Search } from "lucide-react";
import useMovieStore from "../states/movie.state";
import toast from "react-hot-toast";
import { usePaginationStore } from "../states/pagination.state";
import { useDebounce } from "use-debounce";
export const MoviePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { isLoading, fetchMovies, setisLoading, movies, searchMovies } =
        useMovieStore();
    const [searchingMovies,setSearchingMovies]=useState(false);
    const {
        loadingTotalMovies,
        fetchTotalMovies,
        setLoadingTotalMovies,
        totalMovies,
        take,
        currentPage,
    } = usePaginationStore();
    const [value] = useDebounce(searchTerm, 1000);
    useEffect(() => {
        if (value) {
            searchMovies(value).finally(() => {
                setisLoading(false);
            });
        }
    }, [value]);
    useEffect(() => {
        const fetchingMovies = async () => {
            try {
                await fetchMovies((currentPage - 1) * take, take).finally(() =>
                    setisLoading(false)
                );
            } catch (error) {
                toast.error((error as any).message);
            }
        };
        if(!searchingMovies){
            fetchingMovies();
        }
    }, [currentPage,searchingMovies]);
    useEffect(() => {
        const fetchingTotalMovies = async () => {
            try {
                await fetchTotalMovies().finally(() =>
                    setLoadingTotalMovies(false)
                );
            } catch (error) {
                toast.error((error as any).message);
            }
        };
        fetchingTotalMovies();
    }, []);
    if (isLoading || loadingTotalMovies) {
        return (
            <div className="flex-1 flex items-center justify-center bg-black">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Movies" />
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <div className="flex justify-end my-2 overflow-x-auto w-[100%] md:w-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Movies/Director..."
                            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-2 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[250px]"
                            onChange={(e) => {
                                setSearchingMovies(true);
                                setSearchTerm(e.target.value);
                            }}
                            value={searchTerm}
                            onBlur={() => {
                                setSearchingMovies(false);
                            }}
                        />
                        <Search
                            className="absolute right-3 top-2.5 text-gray-400"
                            size={18}
                        />
                    </div>
                </div>
                <MovieTable movies={movies} total={totalMovies} searchingMovies={searchingMovies} />
            </main>
        </div>
    );
};
