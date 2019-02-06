import React from 'react';
import { StyleSheet, Text, View, TextInput, Picker, Button } from 'react-native';


export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text: '',
      type: "mode",
      result: null,
      errorMessage: null,
      numbers: []
    }
    this.handleChangeText = this.handleChangeText.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.handleAddPress = this.handleAddPress.bind(this)
  }

  handleChangeText(text){
    this.setState({ text: text })

  }

  handleAddPress(){
    const {numbers, text} = this.state;
    this.setState({numbers: [...numbers, text]}, () => {
      console.log(this.state.numbers);
    })
    
  }

  handlePress(){
    let array = this.state.numbers;
    array = array.map(num => parseInt(num));
    
    // try {
    //   array = JSON.parse(this.state.numbers);
    // } catch(e) {
    //   console.warn(e)
    // }

    const baseUrl = 'https://calculator-ewa.herokuapp.com'
    const data = {type: this.state.type, array: array}

    fetch(`${baseUrl}/evaluate`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => this.setState({ result: data[this.state.type], errorMessage: data.error_message }));
  }

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

        <Button
        onPress={this.handleAddPress}
        title='🔥' 
        />
        <Text>
          {this.state.numbers.join(' , ')}
        </Text>

        <Picker
          selectedValue={this.state.type}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}>
          <Picker.Item label="mode" value="mode" />
          <Picker.Item label="median" value="median" />
          <Picker.Item label="average" value="average" />
          <Picker.Item label="add" value="add" />
        </Picker>

        <Button
        onPress={this.handlePress}
        title='calculate'
        />

        <Text>result {this.state.result}</Text>
        <Text>{this.state.errorMessage}</Text>
      </View>
    );
  }
}

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
  }
});
