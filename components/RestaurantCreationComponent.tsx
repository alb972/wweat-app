import React from 'react';
import { StyleSheet, Text, View, Modal, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//Components
import { StyledButtonComponent } from '../components/StyledButtonComponent';

interface RestaurantCreationComponentProps {
    modalVisible: boolean;
    createTodoHandler: any;
    toggleHandler: any;
}

interface RestaurantCreationComponentState {
    todoTitle: string;
}

export default class RestaurantCreationComponent extends React.Component<RestaurantCreationComponentProps, RestaurantCreationComponentState> {
    carousel: any;

    constructor(props: RestaurantCreationComponentProps) {
        super(props);

        this.state = {
            todoTitle: "",
        };

        //Bindings
        //--
        this.handleCreateTodo = this.handleCreateTodo.bind(this);
        this.handleToggleView = this.handleToggleView.bind(this);
        //End Bindings
    }

    handleTodoTitleChange(value: string) {
        this.setState({ todoTitle: value });
    }

    handleCreateTodo() {
        let { todoTitle } = this.state;
        if(todoTitle !== "") {
            this.props.createTodoHandler(todoTitle);
            this.setState({ todoTitle: "" });
        }
    }

    handleToggleView() {
        this.props.toggleHandler();
    }

    render() {
        let { modalVisible } = this.props;
        let { todoTitle } = this.state;

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}>
                <View style={styles.container}>
                    <View style={styles.modalView}>
                        <Text style={styles.label}>Entrez le nom :</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                editable
                                placeholder=""
                                placeholderTextColor="black"
                                onChangeText={(text: any) => this.handleTodoTitleChange(text)}
                                value={todoTitle}
                                returnKeyType={"next"} />
                        </View>
                        <View style={styles.actionButton}>
                            <StyledButtonComponent
                                label="Ajouter"
                                textColor="white"
                                backgroundColor="#007acc"
                                shadowColor="#007acc"
                                clickHandler={this.handleCreateTodo} />
                        </View>
                        <View style={styles.actionButton}>
                            <StyledButtonComponent
                                label="Annuler"
                                textColor="gray"
                                backgroundColor="#e3e3e3"
                                shadowColor="gray"
                                clickHandler={this.handleToggleView} />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(52, 52, 52, 0.6)",
    },
    modalView: {
        flex: 1,
        marginTop: hp("35%"),
        paddingVertical: hp("5%"),
        paddingHorizontal: hp("2%"),
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputContainer: {
        height: hp("8%"),
        marginTop: hp("1.4%"),
        overflow: 'hidden',
        paddingVertical: wp("2%"),
    },
    input: {
        height: hp("6%"),
        paddingHorizontal: wp("2%"),
        backgroundColor: '#e3e3e3',
        color: 'black',
        fontWeight: '400',
        borderRadius: 5,
        borderColor: '#cccccc',
        borderWidth: 1,
    },
    label: {
        fontSize: hp("2%"),
        color: 'black',
        fontWeight: '400',
        letterSpacing: 0.5,
    },
    actionButton: {
        height: hp("6%"),
        marginTop: hp("1%"),
    },
});
