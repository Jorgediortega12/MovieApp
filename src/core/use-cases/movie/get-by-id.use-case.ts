import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {MovieMapper} from '../../../infrastructure/interfaces/mappers/movie.mappers';
import {MovieDBMovie} from '../../../infrastructure/interfaces/movie-db-responses';
import {FullMovie} from '../../entities/movie.entity';

export const getByIdUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<FullMovie> => {
  try {
    const movie = await fetcher.get<MovieDBMovie>(`/${movieId}`);
    const fullMovie = MovieMapper.fromMovieDBMovie(movie);
    return fullMovie;
  } catch (error) {
    throw new Error(`Error Finding provided id - ${movieId}`);
  }
};
