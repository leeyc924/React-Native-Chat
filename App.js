//App.js
import React, {useEffect, useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Setting from './Setting.js';

const App = () => {
  const [ddayInfo, setDdayInfo] = useState({
    dday: new Date(),
    title: '테스트 디데이',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    const getStorageItem = async () => {
      try {
        const ddayString = await AsyncStorage.getItem('@dday');
        const chatLogString = await AsyncStorage.getItem('@chat');
        console.log(chatLogString);
        if (chatLogString == null) {
          setChatLog([]);
        } else {
          const chatLog = JSON.parse(chatLogString);
          setChatLog(chatLog);
        }

        if (ddayString === null) {
          setDdayInfo({
            dday: new Date(),
            title: '',
          });
        } else {
          const dday = JSON.parse(ddayString);
          setDdayInfo({
            dday: new Date(dday.date),
            title: dday.title,
          });
        }
      } catch (e) {
        console.log('ERR');
      }
    };

    getStorageItem();
  }, []);

  const toggleModal = () => {
    setIsOpen(isOpen => !isOpen);
  };

  const settingHandler = async (title, date) => {
    setDdayInfo(ddayInfo => ({
      ...ddayInfo,
      title: title,
      dday: date,
    }));

    try {
      const dday = {
        title: title,
        date: date,
      };
      const ddayString = JSON.stringify(dday);
      await AsyncStorage.setItem('@dday', ddayString);
    } catch (e) {
      console.log(e);
    }
    toggleModal();
  };

  const makeDateString = () => {
    return (
      ddayInfo.dday.getFullYear() +
      '년' +
      (ddayInfo.dday.getMonth() + 1) +
      '월 ' +
      ddayInfo.dday.getDate() +
      '일'
    );
  };

  const makeRemainString = () => {
    const distance = new Date().getTime() - ddayInfo.dday.getTime();
    const remain = Math.floor(distance / (1000 * 60 * 60 * 24));
    if (remain < 0) {
      return 'D' + remain;
    } else if (remain > 0) {
      return 'D+' + remain;
    } else if (remain === 0) {
      return 'D-day';
    }
  };

  const chatHandler = async () => {
    const newChatLog = [...chatLog, makeDateString() + ' : ' + chatInput];
    setChatLog(newChatLog);
    setChatInput('');

    const chatLogString = JSON.stringify(newChatLog);
    await AsyncStorage.setItem('@chat', chatLogString);
  };

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
          <ScrollView style={styles.chatScrollView}>
            {chatLog.map((chat, index) => {
              return (
                <Text key={index} style={styles.chat}>
                  {chat}
                </Text>
              );
            })}
          </ScrollView>
          <View style={styles.chatControl}>
            <TextInput
              style={styles.chatInput}
              value={chatInput}
              onChangeText={changedText =>
                setChatInput(chatInput => changedText)
              }
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => chatHandler()}>
              <Text>전송</Text>
            </TouchableOpacity>
          </View>
        </View>
        {isOpen && (
          <Setting
            ddayInfo={ddayInfo}
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

  chat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
    margin: 2,
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
