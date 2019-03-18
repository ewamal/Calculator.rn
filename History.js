import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'History',
    headerStyle: {
      backgroundColor: '#aa7e8e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    )
  };

  render() {
    const { navigation } = this.props;
    const history = navigation.getParam('history', 'no history yet');
    return (
      <View>
        <Text style={styles.history}>history</Text>
        {history.filter(Boolean).map(res => (
          <Text style={styles.text}>{res}</Text>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  history: {
    fontSize: 30,
    color: '#aa7e8e'
  }
});
