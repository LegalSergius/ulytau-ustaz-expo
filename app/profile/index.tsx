import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
//   const [currentList, setCurrentList] = useState('copyrightworksitems');
  const router = useRouter();
  const [photo, setPhoto] = useState('');
  const [personalInitials, setPersonalInitials] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [phone, setPhone] = useState('');
  const [school, setSchool] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const savedPhoto = await AsyncStorage.getItem('photo')
      const savedPersonalIntials = await AsyncStorage.getItem('personalInitials');
      const savedEmail = await AsyncStorage.getItem('email');
      const savedStatus = await AsyncStorage.getItem('status');
      const savedPhone = await AsyncStorage.getItem('phone');
      const savedSchool = await AsyncStorage.getItem('school');
      const savedCity = await AsyncStorage.getItem('city');

      setPhoto(savedPhoto ?? '');
      setPersonalInitials(savedPersonalIntials ?? '');
      setEmail(savedEmail ?? '');
      setStatus(savedStatus ?? '');
      setPhone(savedPhone ?? '');
      setSchool(savedSchool ?? '');
      setCity(savedCity ?? '');
    };
    loadData();
  }, []);

  const saveData = async () => {
    await AsyncStorage.setItem('personalInitials', personalInitials);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('status', status);
    await AsyncStorage.setItem('phone', phone);
    await AsyncStorage.setItem('school', school);
    await AsyncStorage.setItem('city', city);
    await AsyncStorage.setItem('photo', photo);

    // if (profileImage) {
    //     await AsyncStorage.setItem('profileImage', profileImage);
    // }
  };

  const navigateToDocumentsItems = () => router.push('/profile/documentitemsedit');
  const navigateToList2 = () => router.push('/profile/copyrightworksitemsedit');

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
        alert('Необходимо разрешение на использование камеры.');
        return;
    }

    const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 1
    });
    if (!result.canceled) {
        setPhoto(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
        alert('Необходимо разрешение на доступ к галерее.');
        
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 1
    });
    if (!result.canceled) {
        setPhoto(result.assets[0].uri);
    }
  }
  
  const handleImagePress = () => {
    Alert.alert(
        '',
        'Выберите действие',
        [
            {
                text: 'Сделать снимок',
                onPress: () => openCamera()
            },
            {
                text: 'Выбрать из галереи',
                onPress: () => openGallery()
            },
        ],
        {
            cancelable: true
        }
    )
  };

  return (
    <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
          <TouchableOpacity style={styles.iconContainer} onPress={handleImagePress}>
              {photo ? (
                  <Image source={{ uri: photo }} style={styles.icon} />
              ) : (
                  <View style={styles.icon}>
                      <Text style={styles.iconText}>
                          ФОТО
                      </Text>
                  </View>
              )}
          </TouchableOpacity>
          <View style={styles.inputContainer}> 
              <Text>
                  ФИО
              </Text>
              <TextInput style={styles.input} value={personalInitials} onChangeText={setPersonalInitials} />
          </View>
          <View style={styles.inputContainer}> 
              <Text>
                  Почта
              </Text>
              <TextInput style={styles.input} value={email} onChangeText={setEmail}/>
          </View>
          <View style={styles.inputContainer}> 
              <Text>
                  Статус
              </Text>
              <TextInput style={styles.input} value={status} onChangeText={setStatus} />
          </View>
          <View style={styles.inputContainer}> 
              <Text>
                  Телефон
              </Text>
              <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
          </View>
          <View style={styles.inputContainer}> 
              <Text>
                  Школа
              </Text>
              <TextInput style={styles.input} value={school} onChangeText={setSchool}/>
          </View>
          <View style={styles.inputContainer}> 
              <Text>
                  Город
              </Text>
              <TextInput style={styles.input} value={city} onChangeText={setCity}/>
          </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={navigateToDocumentsItems}>
            <Text style={styles.buttonText}>Мои документы</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={navigateToList2}>
            <Text style={styles.buttonText}>Мои авторские работы</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={saveData}>
            <Text style={styles.buttonText}>Сохранить изменения</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
    scrollContainer: {
      paddingBottom: 20
    },
    buttonContainer: {
      width: '80%',
      paddingTop: 20,
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#EAEAEA',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      marginBottom: 20,
    },
    icon: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
    },
    iconText: {
      fontWeight: 'bold',
    },
    inputContainer: {
        width: '95%'
    },
    input: {
      width: '100%',
      padding: 10,
      marginVertical: 5,
      borderWidth: 2,
      borderColor: '#000',
      borderRadius: 12,
      backgroundColor: '#fff',
    },
    button: {
      width: '100%',
      padding: 10,
      backgroundColor: '#ff6a39',
      borderRadius: 12,
      marginVertical: 5,
      alignItems: 'center',
    },
    saveButton: {
      width: '100%',
      padding: 6,
      backgroundColor: '#ff6a39',
      borderRadius: 12,
      marginTop: 16,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });