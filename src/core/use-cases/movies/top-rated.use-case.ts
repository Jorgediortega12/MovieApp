import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {MovieMapper} from '../../../infrastructure/interfaces/mappers/movie.mappers';
import {NowPlayingResponse} from '../../../infrastructure/interfaces/movie-db-responses';
import type {Movie} from '../../entities/movie.entity';

export const topRatedMoviesUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const top_rated = await fetcher.get<NowPlayingResponse>('/top_rated');

    return top_rated.results.map(result =>
      MovieMapper.fromMovieDBResultToEntity(result),
    );
  } catch (error) {
    throw new Error('Error fetching movies - top_rated');
  }
};
