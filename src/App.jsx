import { useEffect, useState } from "react";
import { getPopularMovies, getNowPlayingMovies, getTopRatedMovies } from "./contexts/api";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

//components
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import FavoritesPage from "./components/FavoritesPage";

// Rotas
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

function HomePage({ popular, nowPlaying, topRated, renderSection }) {
  return (
    <div className="home-content">
      <SearchBar />
      {renderSection("Lançamentos", nowPlaying)}
      {renderSection("Populares", popular)}
      {renderSection("Em Alta", topRated)}
    </div>
  );
}


function AppContent() {
  const [popular, setPopular] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const location = useLocation();
  const isFavoritesPage = location.pathname === "/favoritos";
  useEffect(() => {
    async function loadAll() {
      setPopular(await getPopularMovies());
      setNowPlaying(await getNowPlayingMovies());
      setTopRated(await getTopRatedMovies());
    }
    loadAll();
  }, []);

  const renderSection = (title, movies) => (
    <section className="movie-section">
      <h2>{title}</h2>
      <i></i>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={3}
        navigation={true}
        pagination={{ clickable: false }}
        grabCursor={true}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );

  return (
    <div className="container">
      <Header />

      
      {!isFavoritesPage ? (
        <HomePage
          popular={popular}
          nowPlaying={nowPlaying}
          topRated={topRated}
          renderSection={renderSection}
        />
      ) : (
        <FavoritesPage />
      )}

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;
