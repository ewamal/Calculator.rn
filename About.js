import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

export default class AboutScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };
  }

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <View>
        <Text style={styles.text}>about screen</Text>
        <SegmentedControlTab
          values={['First', 'Second']}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
        />
        {selectedIndex === 0 && <Text>tab one</Text>}
        {selectedIndex === 1 && <Text>tab two</Text>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});
