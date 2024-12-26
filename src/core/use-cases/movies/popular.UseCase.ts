import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {MovieMapper} from '../../../infrastructure/interfaces/mappers/movie.mappers';
import {NowPlayingResponse} from '../../../infrastructure/interfaces/movie-db-responses';
import type {Movie} from '../../entities/movie.entity';

interface Options {
  page?: number;
  limit?: number;
}

export const popularMovieUseCase = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<Movie[]> => {
  try {
    const popular = await fetcher.get<NowPlayingResponse>('/popular', {
      params: {
        page: options?.page ?? 1,
      },
    });

    return popular.results.map(result =>
      MovieMapper.fromMovieDBResultToEntity(result),
    );
  } catch (error) {
    throw new Error('Error fetching movies - popular');
  }
};
