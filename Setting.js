import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const Setting = ({ modalHandler, settingHandler }) => {
  const [ddayInfo, setDdayInfo] = useState({
    title: '',
    date: new Date(),
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.background}
        activeOpacity={1}
        onPress={modalHandler}
      />
      <View style={styles.modal}>
        <Text style={styles.titleText}>설정</Text>
        <TextInput
          style={styles.ddayInput}
          value={ddayInfo.title}
          onChangeText={changedText =>
            setDdayInfo(ddatInfo => ({
              ...ddayInfo,
              title: changedText,
            }))
          }
          placeholder={'디데이 제목을 입력해주세요.'}
        />
        <DatePicker date={ddayInfo.date} onDateChange={date => setDdayInfo(ddayInfo => ({ ...ddayInfo, date }))} mode="date" />
        <TouchableOpacity
          onPress={() => settingHandler(ddayInfo.title, ddayInfo.date)}>
          <Text style={styles.doneText}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  ddayInput: {
    backgroundColor: 'white',
    marginBottom: 20,
    width: '75%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#a5a5a5',
  },
  modal: {
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '50%',
    backgroundColor: 'white',
  },
  doneText: {
    color: 'rgb(1,123,255)',
    fontSize: 15,
    margin: 10,
  },
  titleText: {
    fontSize: 18,
    margin: 10,
  },
});

export default Setting;
