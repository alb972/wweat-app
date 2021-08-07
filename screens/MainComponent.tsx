import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

//Models
import {Restaurant} from '../components/models/Restaurant';

//Actions
import {updateRestos} from '../actions/actions';
import {MenuBurgerIcon} from '../components/icons/ActionIconComponents';

interface MainComponentProps {
  availableRestos: Restaurant[];
  navigation?: any;
  updaterestos?: any;
}

interface MainComponentState {
  currentText: any;
}

class MainComponent extends React.Component<
  MainComponentProps,
  MainComponentState
> {
  constructor(props: MainComponentProps) {
    super(props);
    this.state = {
      currentText: '...',
    };
    //Components Binding
    this.TopBar = this.TopBar.bind(this);
    this.clickOnActionButton = this.clickOnActionButton.bind(this);
    this.handleGoToParameters = this.handleGoToParameters.bind(this);
  }

  async componentDidMount() {
    let restosString: string | null = await AsyncStorage.getItem('restos');
    if (restosString) {
      this.props.updaterestos(JSON.parse(restosString));
    }
  }

  clickOnActionButton() {
    this.getRestaurant();
    let delay1 = 50;
    let delay2 = 600;

    let interval1 = setInterval(() => {
      this.getRestaurant();
    }, delay1);

    setTimeout(() => {
      clearInterval(interval1);
    }, 2000);

    let interval2 = setInterval(() => {
      this.getRestaurant();
    }, delay2);

    setTimeout(() => {
      clearInterval(interval2);
    }, 5000);
  }

  getRestaurant() {
    let {availableRestos} = this.props;
    let randomIndex = this.getRandomInt(availableRestos.length);
    this.setState({currentText: availableRestos[randomIndex].title});
  }

  getRandomInt(max: any) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  handleGoToParameters() {
    this.setState({currentText: '...'});
    this.props.navigation.navigate('ParametersView');
  }

  TopBar() {
    return (
      <View style={styles.topContainer}>
        <View style={styles.topLineRow}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.rightContainer}
            onPress={this.handleGoToParameters}>
            <View style={styles.menuBurgerContainer}>
              <MenuBurgerIcon color={'#1B263F'} height={20} width={20} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    let {currentText} = this.state;
    let {availableRestos} = this.props;

    return (
      <>
        <StatusBar backgroundColor="black" barStyle="dark-content" />
        <SafeAreaView style={styles.safearea}>
          <this.TopBar />
          <View style={styles.body1}>
            <Text style={styles.sectionTitle}>On mange quoi ce midi ?</Text>
          </View>
          <View style={styles.body2}>
            <Text
              style={styles.sectionTitle}>{`---> ${currentText} <---`}</Text>
          </View>
          <View style={styles.body3}>
            {availableRestos.length > 0 ? (
              <Button
                title="Manger !"
                onPress={() => {
                  this.clickOnActionButton();
                }}
              />
            ) : (
              <Text>Ajouter un restaurant d'abord.</Text>
            )}
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  body1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    //backgroundColor: 'yellow'
  },
  body2: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'red'
  },
  body3: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'green'
  },
  safearea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  shoppingButtonContainer: {
    position: 'absolute',
    bottom: hp('2%'),
    height: hp('8%'),
    width: wp('90%'),
    marginHorizontal: wp('5%'),
  },
  topContainer: {
    height: hp('9%'),
  },
  topLineRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  rightContainer: {
    width: wp('20%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
  },
  menuBurgerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 8,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  sectionTitleContainer: {
    paddingHorizontal: wp('1%'),
  },
  carrousel: {},
  menuBurgerImg: {
    height: '30%',
    width: '30%',
    resizeMode: 'cover',
  },
  p1: {
    fontSize: hp('1.9%'),
    color: 'gray',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  h2: {
    fontSize: hp('3%'),
    color: 'black',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

const mapStateToProps = (state: any) => {
  return {
    availableRestos: state.app.availableRestos,
  };
};

const mapDispatchToProps = (dispatch: (arg: any) => void) => {
  return {
    updaterestos: (restos: Restaurant[]) => dispatch(updateRestos(restos)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
