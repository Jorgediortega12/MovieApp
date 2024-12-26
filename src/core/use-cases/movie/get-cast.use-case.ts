import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {castMapper} from '../../../infrastructure/interfaces/mappers/cast.mapper';
import {MovieDBCastResponse} from '../../../infrastructure/interfaces/movie-db-responses';
import {MovieDBCast} from '../../entities/cast.entity';

export const getMovieCastUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<MovieDBCast[]> => {
  try {
    const {cast} = await fetcher.get<MovieDBCastResponse>(
      `/${movieId}/credits`,
    );
    const actors = cast.map(castMapper.fromMovieDBCastToEntity);
    return actors;
  } catch (error) {
    throw new Error(`cannot get movie cast ${movieId}`);
  }
};
