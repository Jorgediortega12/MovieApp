// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {StackNavigation} from './presentation/navigation/StackNavigation';

export const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};
