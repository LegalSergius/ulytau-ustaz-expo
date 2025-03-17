
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';


export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Привет!</Text>
          <Text style={styles.subtitle}>Введите ваши данные чтобы продолжить</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.fieldContainer}> 
            <Text>
              Почта
            </Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.fieldContainer}>
            <Text>
              Пароль
            </Text>
            <TextInput style={styles.input} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.replace("/home")}>
            <Text style={styles.buttonText}>Войти</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingVertical: '20%',
    paddingHorizontal: '5%'
  },
  fieldContainer: {
    // width: '95%'
    marginVertical: '5%'
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
  buttonContainer: {
    // flex: 1,
    width: '100%',
    // margin: '20%',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: '2.5%',
    paddingHorizontal: '5%',
    backgroundColor: '#FF6C00',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    // marginBottom: 10,
  },
  titleContainer: {
    paddingHorizontal: '2.5%',
    // flex: 1,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: '2.5%',
    marginTop: '5%',
    marginBottom: '15%'

    // alignItems: 'center'
    // flex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#6e6e6e',
    marginBottom: 40,
  },
});
