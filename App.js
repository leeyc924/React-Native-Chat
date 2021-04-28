//App.js
import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Setting from './Setting.js';

const App = () => {
  const [ddayInfo, setDdayInfo] = useState({
    dday: new Date(),
    title: '테스트 디데이',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [chatLog, setChatLog] = useState([]);

  const toggleModal = () => {
    setIsOpen(isOpen => !isOpen);
  };

  const settingHandler = (title, date) => {
    console.log(title, date);
    setDdayInfo(ddayInfo => ({
      ...ddayInfo,
      title: title,
      dday: date,
    }));
    toggleModal();
  };

  const makeDateString = () => {
    return ddayInfo.dday.getFullYear() + '년' + (ddayInfo.dday.getMonth()+1) + '월 ' + ddayInfo.dday.getDate() + '일';
  }

  const makeRemainString = () => {
    const distance = new Date().getTime() - ddayInfo.dday.getTime();
    const remain = Math.floor(distance / (1000 * 60 * 60 * 24));
    if (remain < 0) {
      return 'D'+ remain;
    } else if (remain > 0) {
      return 'D+'+ remain;
    } else if (remain === 0) {
      return 'D-day';
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('./images/background.png')}>
        <View style={styles.settingView}>
          <TouchableOpacity onPress={toggleModal}>
            <Image source={require('./icon/setting.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.ddayView}>
          <Text style={styles.titleText}>{ddayInfo.title}까지</Text>
          <Text style={styles.ddayText}>{makeRemainString()}</Text>
          <Text style={styles.dateText}>{makeDateString()}</Text>
        </View>
        <View style={styles.chatView}>
          <ScrollView style={styles.chatScrollView}></ScrollView>
          <View style={styles.chatControl}>
            <TextInput style={styles.chatInput} />
            <TouchableOpacity style={styles.sendButton}>
              <Text>전송</Text>
            </TouchableOpacity>
          </View>
        </View>
        {isOpen && (
          <Setting
            modalHandler={toggleModal}
            settingHandler={(title, date) => settingHandler(title, date)}
          />
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: '1%',
  },
  ddayView: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatView: {
    flex: 6,
  },
  titleText: {
    alignSelf: 'flex-end',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginRight: '15%',
  },
  ddayText: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  dateText: {
    alignSelf: 'flex-start',
    fontSize: 21,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginLeft: '15%',
  },
  sendButton: {
    backgroundColor: 'rgb(97,99,250)',
    height: 40,
    width: 50,
    borderRadius: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  chatInput: {
    backgroundColor: 'white',
    width: '75%',
    height: 40,
    borderWidth: 1,
    borderColor: '#a5a5a5',
    borderRadius: 20,
  },
  chatControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  chatScrollView: {
    width: '90%',
    margin: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(201,201,201,0.7)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#a5a5a5',
  },
});

export default App;
