import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {MovieMapper} from '../../../infrastructure/interfaces/mappers/movie.mappers';
import {MovieUpcomingResponse} from '../../../infrastructure/interfaces/movie-db-responses';
import type {Movie} from '../../entities/movie.entity';

export const movieUpcomingUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const upComing = await fetcher.get<MovieUpcomingResponse>('/upcoming');

    return upComing.results.map(result =>
      MovieMapper.fromMovieDBResultToEntity(result),
    );
  } catch (error) {
    throw new Error('Error fetching movies - upComing');
  }
};
