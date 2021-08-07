import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from './reducers/index';
import NavigatorScreen from './screens/NavigatorScreen';
import {NavigationContainer} from '@react-navigation/native';

interface AppProps {}

interface AppState {}

export default class App extends React.Component<AppProps, AppState> {
  store: any;

  constructor(props: AppProps) {
    super(props);

    this.state = {};

    this.store = createStore(allReducers);

    //Bindings
    //...
  }

  render() {
    return (
      <Provider store={this.store}>
        <NavigationContainer>
          <NavigatorScreen></NavigatorScreen>
        </NavigationContainer>
      </Provider>
    );
  }
}
