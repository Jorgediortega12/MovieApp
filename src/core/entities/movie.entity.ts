//propiedades que extraemos para definir como queremos que luzcan nuestras peliculas.
export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  rating: number;
  poster: string;
  backdrop: string;
}

export interface FullMovie extends Movie {
  genres: string[];
  durantion: number;
  budget: number;
  originalTitle: string;
  productionCompanies: string[];
}
