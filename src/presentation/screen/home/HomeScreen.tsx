import {View} from 'react-native';
import {useMovies} from '../../hook/useMovies';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PosterCarousel} from '../../components/movies/PosterCarousel';
import {HorizontalCarousel} from '../../components/movies/HorizontalCarousel';
import {FullScreenLoader} from '../../components/loader/FullScreenLoader';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {
    isLoading,
    nowPlaying,
    popularMovie,
    topRatedMovie,
    upComing,
    popularNextPage,
  } = useMovies();

  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    <ScrollView>
      <View style={{marginTop: top + 20, paddingBottom: 30}}>
        {/*Principal */}
        <PosterCarousel movies={nowPlaying} />

        {/*Popular Movies */}
        <HorizontalCarousel
          movie={popularMovie}
          title="Popular"
          loadNextPage={popularNextPage}
        />

        {/*Top rated */}
        <HorizontalCarousel movie={topRatedMovie} title="Top Rated" />

        {/*Upcoming */}
        <HorizontalCarousel movie={upComing} title="Upcoming" />
      </View>
    </ScrollView>
  );
};
