import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

//Screens
import MainComponent from './MainComponent';
import RestaurantScreen from './RestaurantScreen';

//Actions
//..

const Stack = createStackNavigator();

interface NavigatorScreenProps {
}

interface NavigatorScreenState {
}

class NavigatorScreen extends React.Component<NavigatorScreenProps, NavigatorScreenState> {

    constructor(props: NavigatorScreenProps) {
        super(props);

        this.state = {};

        //Bindings
        //..
    }

    render() {
        return (
            <Stack.Navigator>
                <>
                    <Stack.Screen name="Dashboard" component={MainComponent} options={({ navigation }) => ({
                        header: () => <></>,
                    })} />
                    <Stack.Screen name="ParametersView" component={RestaurantScreen} options={({ navigation }) => ({
                        header: () => <></>,
                    })} />
                </>
            </Stack.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        height: hp("5%"),
        width: wp("5%"),
        resizeMode: "contain",
    },
    exitImg: {
        height: hp("6%"),
        width: wp("6%"),
        resizeMode: "contain",
        marginLeft: wp("2%"),
    },
});


const mapStateToProps = (state: any) => {
    return {
        availableRestos: state.app.availableRestos,
    }
}

export default connect(mapStateToProps)(NavigatorScreen);