import { Toaster } from "react-hot-toast";
import { MoviePage } from "./pages/movie-page";


const App = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 opacity-80" />
                <div className="absolute inset-0 backdrop-blur-sm" />
            </div>
            <MoviePage/>
            <Toaster />
        </div>
    );
};

export default App;