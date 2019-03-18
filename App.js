import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  Button
} from 'react-native';
import HistoryScreen from './History';
import AboutScreen from './About';


// Store - holds our state - theres only one state, needs a reducer
// Action  - state can be modified using actions
// dispatcher(sender) - action needs to be sent by someone - known as dispatching an action
// reducer - recieves the action and modifies the state to give us a new state (only mandatory argument is type, pure funcs)
// subscriber - listens for state changr to update the ui (using connect)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      type: 'mode',
      result: null,
      errorMessage: null,
      numbers: [],
      history: []

    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleAddPress = this.handleAddPress.bind(this);
    this.handleSaveResult = this.handleSaveResult.bind(this);

  }

  handleChangeText(text) {
    this.setState({ text: text });
  }

  handleAddPress() {
    const { numbers, text } = this.state;

    this.setState({ numbers: [...numbers, text], text: '' }, () => {
      console.log(this.state.numbers);
    });
  }

  handleSaveResult() {
    const { history, result } = this.state;
    this.setState({ history: [result, ...history] });
  }

  handlePress() {
    let array = this.state.numbers;
    array = array.map(num => parseInt(num));

    const baseUrl = 'https://calculator-ewa.herokuapp.com';
    const data = { type: this.state.type, array: array };

    fetch(`${baseUrl}/evaluate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data =>
        this.setState(
          {
            result: data[this.state.type],
            errorMessage: data.error_message,
            history: [data[this.state.type], ...this.state.history],
            numbers: []
          },
          () => console.log(`history: ${this.state.history}`)
        )
      );
  }

  // navbar style
  static navigationOptions = {
    title: 'Calc',
    headerStyle: {
      backgroundColor: '#aa7e8e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Calculator</Text>

        <TextInput
          placeholder={'add an number'}
          style={styles.input}
          onChangeText={this.handleChangeText}
          value={this.state.text}
        />

        <Button onPress={this.handleAddPress} title="🔥" />
        <Text style={styles.input}>{this.state.numbers.join('  ')}</Text>

        <Picker
          selectedValue={this.state.type}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ type: itemValue })
          }
        >
          <Picker.Item label="mode" value="mode" />
          <Picker.Item label="median" value="median" />
          <Picker.Item label="average" value="average" />
          <Picker.Item label="add" value="add" />
        </Picker>

        <Button color="white" onPress={this.handlePress} title="calculate" />

        <Text style={styles.result}>
          {this.state.result ? `result ${this.state.result}` : '     '}
        </Text>
        <Text>{this.state.errorMessage}</Text>

        <Button
          color="#aa7e8e"
          title="go to history"
          onPress={() =>
            this.props.navigation.navigate('History', {
              history: this.state.history
            })
          }
        />

        <Button
          color="#aa7e8e"
          title="go to about"
          onPress={() => this.props.navigation.navigate('About')}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: App,
    History: HistoryScreen,
    About: AboutScreen
  },
  {
    initialRouteName: 'Home'
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 50
  },
  input: {
    fontSize: 30,
    color: '#aa7e8e'
  },
  picker: {
    width: 100
  },
  result: {
    fontSize: 40
  }
});

export default createAppContainer(AppNavigator);
