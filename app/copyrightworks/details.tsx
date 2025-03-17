import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';

export default function CopyRightWorkDetailsScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Название авторской работы
                    </Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.backButton}>
                            Назад
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.author}>Автор: Синишин Д.</Text>
            </View>
            <View style={styles.excerptContainer}>
                <Text style={styles.excerptText}>Вырезка с авторской работы</Text>
            </View>
            <View style={styles.documentContainer}>
                <View style={styles.square} />
                <Text style={styles.documentTitle}>Название pdf документа</Text>
                <TouchableOpacity style={styles.iconButton}>
                    <MaterialIcons name="download" size={24} color="green" />
                </TouchableOpacity>
            </View>
            <View style={styles.endOfScreenContainer}>
                <View style={styles.infoContainer}>
                    <Text>
                        Почта:
                    </Text>
                    <Text>
                        Номер телефона:
                    </Text>
                </View>
                {/* <TextInput style={styles.input} placeholder="Почта:" />
                <TextInput style={styles.input} placeholder="Номер телефона:" keyboardType="phone-pad" /> */}

                <TouchableOpacity style={styles.accessButton}>
                    <Text style={styles.accessButtonText}>Доступ открыт</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    // padding: 20,
  },
  headerContainer: {
    padding: 16,
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    backgroundColor: '#eaeaea',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    fontSize: 16,
    color: '#000',
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  excerptContainer: {
    backgroundColor: '#FFF',
    width: '80%',
    marginTop: 30,
    marginHorizontal: 'auto',
    marginBottom: 30,
    borderRadius: 12,
    height: '25%',
  },
  excerptText: {
    color: '#999',
  },
  documentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  square: {
    width: 40,
    height: 40,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  documentTitle: {
    flex: 1,
    fontSize: 14,
  },
  infoContainer: {
    marginVertical: '5%',
    width: '90%',
    alignItems: 'flex-start'
  },
  iconButton: {
    padding: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  accessButton: {
    width: '90%',
    padding: 8,
    backgroundColor: '#36573b',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accessButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  endOfScreenContainer: {
    flex: 3,
    width: '100%',
    paddingHorizontal: '10%',
    paddingBottom: '10%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
});