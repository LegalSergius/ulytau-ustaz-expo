import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function CoursesScreen() {
  const router = useRouter();

  const navigateToLessons = (courseTitle: any) => {
    router.push({ 
      pathname: '/courses/lessons', 
      params: {
        courseTitle
      }
    })
  };

  const courses = [
    { id: 1, title: 'Английский язык' },
    { id: 2, title: 'Английский язык' },
    { id: 3, title: 'Английский язык' },
    { id: 4, title: 'Английский язык'}
  ];

  const [selectedCategory, selectCategory] = useState<Number>(1);

  const onButtonPress = (buttonCategoryOrder: Number) => {
    selectCategory(buttonCategoryOrder);
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.fieldWrap}>
          <MaterialIcons style={styles.searchIcon} name="search" size={24} color="gray" />
          <TextInput style={styles.inputField} placeholder="Поиск" />
        </View>
        <MaterialIcons name="notifications" size={24} color="#ff6a39" style={styles.notificationsIcon} />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={selectedCategory === 0 ? styles.filterButtonActive : styles.filterButton} onPress={() => onButtonPress(0)}>
          <Text style={selectedCategory === 0 ? styles.filterTextActive : styles.filterText}>
            Все курсы
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={selectedCategory === 0 ? styles.filterButton : styles.filterButtonActive} onPress={() => onButtonPress(1)}>
          <Text style={selectedCategory === 0 ? styles.filterText : styles.filterTextActive}>
            Мои курсы
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.worksContainer} showsVerticalScrollIndicator={false}>
        {courses.map((course) => (
          <TouchableOpacity key={course.id} onPress={() => navigateToLessons(course.title)}>
            <View style={styles.workItem}>
              <Text style={styles.workItemTitle}>
                {course.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#eaeaea',
  },
  logoContainer: {
      alignItems: 'center',
      marginBottom: 20,
  },
  logo: {
      width: 100,
      height: 50,
      resizeMode: 'contain',
  },
  inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
  },
  fieldWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 16,
      paddingHorizontal: 10,
      marginRight: 10,
  },
  searchIcon: {
      marginRight: 8,
  },
  inputField: {
      flex: 1,
  },
  notificationsIcon: {
      padding: 10,
  },
  buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
  },
  filterButton: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      alignItems: 'center',
      margin: 5,
  },
  filterButtonActive: {
      flex: 1,
      padding: 10,
      backgroundColor: '#ff6a39',
      borderRadius: 8,
      alignItems: 'center',
      margin: 5,
  },
  filterText: {
      color: '#000',
  },
  filterTextActive: {
      color: '#fff',
  },
  worksContainer: {
      flex: 1
  },
  workItem: {
      height: 150,
      backgroundColor: '#fff',
      borderRadius: 16,
      marginBottom: 32,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      // Тень для Android
      elevation: 8,
  },
  workItemTitle: {
    fontSize: 22,
    fontWeight: "bold"
  }

});