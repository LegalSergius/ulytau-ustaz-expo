// app/home/index.tsx
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Image,
  Button, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../profile/index';
import CoursesScreen from '../courses/index';
import CopyRightWorksScreen from '../copyrightworks/index';
import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisisble] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisisble(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisisble(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    }
  });

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconSource;
    
                if (route.name === 'Личный кабинет') {
                  iconSource = require('../../assets/images/personal.png'); 
                } else if (route.name === 'Авторские работы') {
                  iconSource = require('../../assets/images/copyright.png'); 
                } else if (route.name === 'Курсы') {
                  iconSource = require('../../assets/images/courses.png'); 
                } else if (route.name === 'Создать запись') {
                  iconSource = require('../../assets/images/enrollment.png'); 
                }
    
                return (
                  <Image
                    source={iconSource}
                    style={{ width: size, height: size, tintColor: color }}
                  />
                );
              },
              tabBarStyle: {
                backgroundColor: '#FF6F4B',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                height: 70,
              },
              tabBarItemStyle: {
                borderRadius: 16
              },
              tabBarLabel: ({ focused }) => {
                let labelColor = focused ? '#FF6F4B': '#FFF'  ; // Цвет текста для фокуса
    
                return (
                  <Text style={{ color: labelColor }}>
                    {route.name}
                  </Text>
                );
              },
              tabBarActiveBackgroundColor: '#fff',
              tabBarActiveTintColor: '#FF6F4B',
              tabBarInactiveTintColor: '#fff',
              headerShown: false,
            })}>
            <Tab.Screen name="Личный кабинет" component={ProfileScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Авторские работы" component={CopyRightWorksScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Курсы" component={CoursesScreen} options={{ headerShown: false }} />
            <Tab.Screen
              name="Создать запись"
              component={() => null}
              listeners={{
                tabPress: event => {
                  event.preventDefault();
                  openModal();
                }
              }}
            />
          </Tab.Navigator>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.headerText}>
                    Название
                  </Text>
                  <TouchableOpacity onPress={closeModal}>
                    <MaterialIcons name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalMainContentContainer}>
                  <TextInput style={styles.inputField} placeholder="Описание" placeholderTextColor="#606060" />
                  <TextInput style={styles.inputField} placeholder="Даты проведения курса"  placeholderTextColor="#606060" />                  
                  <View style={styles.scheduleContainer}>
                    <Text style={styles.scheduleTitle}>
                      Расписание:
                    </Text>
                    <View style={styles.table}>
                      <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Пн</Text>
                        <Text style={styles.tableHeader}>Вт</Text>
                        <Text style={styles.tableHeader}>Ср</Text>
                        <Text style={styles.tableHeader}>Чт</Text>
                        <Text style={styles.tableHeader}>Пт</Text>
                        <Text style={styles.tableHeader}>Сб</Text>
                        <Text style={styles.tableHeader}>Вс</Text>
                      </View>
                      <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>10:00 - 12:00</Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                      </View>
                      <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>10:00 - 12:00</Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                      </View>
                      <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>10:00 - 12:00</Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                      </View>
                      <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>10:00 - 12:00</Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                        <Text style={styles.tableCell}></Text>
                      </View>
                    </View>
                    </View>

                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Загрузить учебный план</Text>
                  </TouchableOpacity>
                  <Text style={styles.participantsCount}>
                    Кол-во участников:
                  </Text>
                  <TouchableOpacity style={styles.createButton}>
                    <Text style={styles.createButtonText}>Создать запись</Text>
                  </TouchableOpacity>
                  
                </View>
              </View>
            </View>
          </Modal> 
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingTop: '15%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalHeader: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    padding: 16,
    borderBottomColor: '#000'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  modalMainContentContainer: {
    padding: 16,
  },
  scheduleContainer: {
    marginBottom: 20
  },
  scheduleTitle: {
    marginBottom: 5,
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 15,
    paddingHorizontal: 8,
  },
  modalButtonTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500'
  },
  modalCloseButtonTitle: {
    color: '#000'
  },
  modalContent: {
    width: '75%',
    // padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,

  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  scheduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  scheduleCell: {
    width: '14.28%', // Чтобы равномерно распределить ячейки по ширине
    textAlign: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  table: {
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    height: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#36573b',
    width: '90%',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 15,
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#36573b',
    padding: 10,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  participantsCount: {
    marginVertical: 12,
  }
});
