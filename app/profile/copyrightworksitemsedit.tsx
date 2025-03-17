import { useRouter } from 'expo-router'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';

export default function CopyRightWorksItemsEditScreen() {
  const router = useRouter();
  const [copyRights, setCopyRights] = useState([]);
  
  useEffect(() => {
    const loadCopyRights = async () => {
      const storedCopyRights = await AsyncStorage.getItem('copyRights');
      if (storedCopyRights) {
        setCopyRights(JSON.parse(storedCopyRights));
      }
    };
    loadCopyRights();
  }, []);

  const addCopyRights = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
    });

    if (result.type !== 'cancel') {
      const newCopyRights = [...copyRights, result.assets[0].name];
      setCopyRights(newCopyRights);
      await AsyncStorage.setItem('copyRights', JSON.stringify(newCopyRights));
    }
  };

  const removeCopyRights = async (index) => {
    const newCopyRights = copyRights.filter((_, i) => i !== index);
    setCopyRights(newCopyRights);
    await AsyncStorage.setItem('copyRights', JSON.stringify(newCopyRights));
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Мои авторские работы</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>Назад</Text>
        </TouchableOpacity>
      </View>
      {copyRights.map((copyRight, index) => (
        <View key={index} style={styles.itemRow}>
          <MaterialIcons
            style={styles.itemIcon}
            name="info"
            size={36}
            color="black" />
          <Text style={styles.itemTitle}>
            {copyRight}
          </Text>
          <MaterialIcons 
            style={styles.itemIcon}
            name="delete"
            size={36}
            color="black"
            onPress={async () => await removeCopyRights(index)}/>
        </View>
      ))}
      <View style={styles.downloadButtonContainer}>
        <TouchableOpacity onPress={addCopyRights}>
          <Text style={styles.downloadButton}>
            Загрузить авторскую работу
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderBottomColor: '#000',
    borderBottomWidth: 2
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    fontSize: 16,
  },
  itemRow: {
    width: '100%',
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  itemIcon: {
    flex: 1
  },
  itemTitle: {
    flex: 4,
    textAlign: 'left',
  },
  downloadButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  downloadButton: {
    marginHorizontal: 'auto',
    marginBottom: '10%',
    paddingVertical: 8,
    paddingHorizontal: '10%',
    backgroundColor: '#ff6a39',
    borderRadius: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});