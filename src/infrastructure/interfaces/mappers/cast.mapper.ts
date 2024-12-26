import {MovieDBCast} from '../../../core/entities/cast.entity';

export class castMapper {
  static fromMovieDBCastToEntity(actor: MovieDBCast): MovieDBCast {
    return {
      id: actor.id,
      name: actor.name,
      character: actor.character ?? 'Character not found',
      profile_path: actor.profile_path
        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
        : 'https://i.stack.imgur.com/L69HF.png',
    };
  }
}
