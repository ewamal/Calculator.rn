import React from 'react';
import { StyleSheet, Text, View, TextInput, Picker } from 'react-native';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: 'Add an array...'}
    this.handleChangeText = this.handleChangeText.bind(this)
  }

  handleChangeText(text){
    this.setState({ text: text })
  }

  onFocus() {
    this.setState({
      text: ''
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Calculator</Text>

        <TextInput
          onChangeText={this.handleChangeText}
          value={this.state.text}
          onFocus={() => this.onFocus()}
        />

        <Picker
          selectedValue={this.state.type}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}>
          <Picker.Item label="mode" value="mode" />
          <Picker.Item label="median" value="median" />
          <Picker.Item label="average" value="average" />
          <Picker.Item label="add" value="add" />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 50
  }
});
