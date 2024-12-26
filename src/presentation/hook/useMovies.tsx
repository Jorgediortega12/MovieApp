import {useEffect, useState} from 'react';
import {Movie} from '../../core/entities/movie.entity';

import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';

let popularNextPage = 1;

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [upComing, setUpComing] = useState<Movie[]>([]);
  const [popularMovie, setPopularMovie] = useState<Movie[]>([]);
  const [topRatedMovie, setTopRatedMovie] = useState<Movie[]>([]);

  //solamente se va a ejecutar cuando el componente se construya.
  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    const nowPlayingPromise = await UseCases.movieNowPlayingUseCase(
      movieDBFetcher,
    );
    const upComingPromise = await UseCases.movieUpcomingUseCase(movieDBFetcher);
    const popularPromise = await UseCases.popularMovieUseCase(movieDBFetcher);
    const topRatedPromise = await UseCases.topRatedMoviesUseCase(
      movieDBFetcher,
    );

    const [nowPlayingMovies, upComingMovies, popularMovies, topRatedMovies] =
      await Promise.all([
        nowPlayingPromise,
        upComingPromise,
        popularPromise,
        topRatedPromise,
      ]);

    setNowPlaying(nowPlayingMovies);
    setUpComing(upComingMovies);
    setPopularMovie(popularMovies);
    setTopRatedMovie(topRatedMovies);

    setIsLoading(false);
  };

  return {
    isLoading,
    nowPlaying,
    upComing,
    popularMovie,
    topRatedMovie,

    //Methods para realizar un scroll horizontal de manera infinita, cargando todas las peliculas ya sea upcoming, toprated, popular, ...etc.
    popularNextPage: async () => {
      popularNextPage++;
      const popularMovies = await UseCases.popularMovieUseCase(movieDBFetcher, {
        page: popularNextPage,
      });

      setPopularMovie(prev => [...prev, ...popularMovies]);
    },
  };
};
