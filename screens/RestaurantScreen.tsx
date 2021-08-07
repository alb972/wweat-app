import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

//Models
import RestaurantStore from '../components/models/RestaurantStore';
import {Restaurant} from '../components/models/Restaurant';

//Component
import RestaurantCreationComponent from '../components/RestaurantCreationComponent';

//Actions
import {updateRestos} from '../actions/actions';
import {LeftArrowIconComponent} from '../components/icons/ActionIconComponents';

interface RestaurantScreenProps {
  availableRestos: Restaurant[];
  navigation?: any;
  route?: any;
  updaterestos?: any;
}

interface RestaurantScreenState {
  modalVisible: boolean;
}

class RestaurantScreen extends React.Component<
  RestaurantScreenProps,
  RestaurantScreenState
> {
  private store: RestaurantStore;

  constructor(props: RestaurantScreenProps) {
    super(props);

    this.store = new RestaurantStore();

    props.availableRestos.map((item: Restaurant) => {
      this.store.addResto(item.title);
    });

    this.state = {
      modalVisible: false,
    };

    //Bindings
    this.RestoList = this.RestoList.bind(this);
    //-----
    this.handleGoToDashboard = this.handleGoToDashboard.bind(this);
    this.handleAddResto = this.handleAddResto.bind(this);
    this.handleRemoveResto = this.handleRemoveResto.bind(this);
    this.handleToggleCreateTodoView =
      this.handleToggleCreateTodoView.bind(this);
    //End Bindings
  }

  handleGoToDashboard() {
    this.props.navigation.navigate('Dashboard');
  }

  handleAddResto(todoTitle: string) {
    this.store.addResto(todoTitle);
    AsyncStorage.setItem('restos', JSON.stringify(this.store.restos));
    this.props.updaterestos(this.store.restos);
    this.handleToggleCreateTodoView();
  }

  handleRemoveResto(resto: Restaurant) {
    this.store.removeResto(resto);
    AsyncStorage.setItem('restos', JSON.stringify(this.store.restos));
    this.props.updaterestos(this.store.restos);
  }

  handleToggleCreateTodoView() {
    let {modalVisible} = this.state;
    this.setState({modalVisible: !modalVisible});
  }

  RestoList() {
    let {availableRestos} = this.props;

    console.log(availableRestos);

    return (
      <>
        <FlatList
          data={availableRestos}
          initialNumToRender={10}
          onEndReachedThreshold={1}
          keyExtractor={(item: Restaurant) => {
            return '' + item.id;
          }}
          renderItem={({item}: {item: Restaurant}) => {
            return (
              <View style={styles.itemWrapper}>
                <View style={styles.itemContainer}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>{item.title}</Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      this.handleRemoveResto(item);
                    }}
                    style={styles.deleteButtonContainer}>
                    <Text style={styles.p3} numberOfLines={1}>
                      Supprimer
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleToggleCreateTodoView}>
          <Text style={styles.buttonText}>Ajouter un restaurant</Text>
        </TouchableOpacity>
      </>
    );
  }

  render() {
    let {modalVisible} = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safearea}>
          <RestaurantCreationComponent
            modalVisible={modalVisible}
            createTodoHandler={this.handleAddResto}
            toggleHandler={this.handleToggleCreateTodoView}
          />
          <View style={styles.navContainer}>
            <TouchableOpacity
              style={styles.backButtonContainer}
              onPress={this.handleGoToDashboard}>
              <LeftArrowIconComponent
                color={'#1B263F'}
                height={20}
                width={20}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <this.RestoList />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  safearea: {
    flex: 1,
  },
  navContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 18,
    paddingHorizontal: wp('2%'),
    paddingVertical: wp('5%'),
  },
  backButtonContainer: {
    width: wp('30%'),
    height: hp('5%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('2%'),
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('2%'),
  },
  itemWrapper: {
    height: hp('8%'),
    width: '100%',
    marginBottom: hp('2%'),
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    borderColor: '#f0f0f0',
    borderWidth: 1,
  },
  labelContainer: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: wp('4%'),
  },
  deleteButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp('4%'),
    backgroundColor: 'red',
  },
  welcome: {
    fontSize: hp('2%'),
    marginBottom: hp('1%'),
  },
  labelText: {
    fontSize: hp('2%'),
    color: '#333333',
  },
  backButtonText: {
    fontSize: hp('3%'),
    fontWeight: '700',
    color: 'black',
  },
  buttonText: {
    fontSize: hp('2%'),
    color: '#007acc',
  },
  p3: {
    fontSize: hp('2%'),
    color: 'white',
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

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantScreen);
