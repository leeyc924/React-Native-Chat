//App.js
import React from 'react';
import { StyleSheet,TextInput,  Text, View, Image } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{width: 50, height: 50}}
        source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
      />
      <TextInput/>
      <Text>
        Now Loading...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gold',
},
});

export default App;