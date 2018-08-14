/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { driver } from '@rocket.chat/sdk/dist/bundle';
import {StyleSheet, Text, View} from 'react-native';

export default class App extends Component {

  constructor (props) {
    super(props);
    this.state = { messages: '' };
  }

  async componentDidMount() {
    await driver.connect({ host: 'localhost:3000' }).catch(err => console.log(err))
    await driver.login({ username: 'bot', password: 'pass' })
    await driver.subscribeToMessages()
    await driver.respondToMessages((err, msg, msgOpts) => {
      if (err) throw err
      this.setState({messages: `${this.state.messages}\n${msg.u.username}: ${msg.msg}`})
    }, {
      rooms: ['general'],
      allPublic: false,
      dm: true,
      edited: true,
      livechat: false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Listening to messages on general</Text>
        <Text style={styles.instructions}>{this.state.messages}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'left',
    color: '#333333',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
});
