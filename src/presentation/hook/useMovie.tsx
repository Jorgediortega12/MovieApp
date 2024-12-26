import {useEffect, useState} from 'react';
import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';
import {FullMovie} from '../../core/entities/movie.entity';
import {MovieDBCast} from '../../core/entities/cast.entity';

export const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<FullMovie>();
  const [cast, setCast] = useState<MovieDBCast[]>();

  useEffect(() => {
    loadMovie();
  }, [movieId]);

  const loadMovie = async () => {
    setIsLoading(true);

    const FullMoviePromise = UseCases.getByIdUseCase(movieDBFetcher, movieId);
    const CastMoviePromise = UseCases.getMovieCastUseCase(
      movieDBFetcher,
      movieId,
    );

    const [FullMovie, MovieDBCast] = await Promise.all([
      FullMoviePromise,
      CastMoviePromise,
    ]);

    setMovie(FullMovie);
    setCast(MovieDBCast);
    setIsLoading(false);
  };

  return {
    isLoading,
    movie,
    cast,
  };
};
