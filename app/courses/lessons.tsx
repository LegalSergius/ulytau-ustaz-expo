import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

export default function LessonsScreen() {
    const { courseTitle } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null); 
    const router = useRouter();
    const navigateToStats = () => {
        if (selectedLesson) {
            router.push({
                pathname: '/courses/lessonStatistics',
                params: {
                    lessonTitle: selectedLesson?.title
                }
            })
        }
    };

    const openModal = (lesson: any) => {
        setSelectedLesson(lesson);
        setModalVisible(true);
      };
    
    const closeModal = () => {
        setModalVisible(false);
    };

    const lessons = [
        { id: 1, title: 'Первое занятие', date: '12.07.2024', description: 'Описание занятия' },
        { id: 2, title: 'Второе занятие', date: '15.07.2024', description: 'Описание занятия' },
        { id: 3, title: 'Третье занятие', date: '18.07.2024', description: 'Описание занятия' },
        { id: 4, title: 'Четвёртое занятие', date: '21.07.2024', description: 'Описание занятия' }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>
                    {courseTitle}
                </Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.lessonsListContainer}>
                {lessons.map((lesson) => (
                    <TouchableOpacity key={lesson.id} onPress={() => openModal(lesson)}>
                        <View style={styles.lessonContainer}>
                            <View style={styles.lessonTitleContainer}>
                                <Text>{lesson.title}</Text>
                                <Text style={styles.lessonDate}>{lesson.date}</Text>
                            </View>
                            <Text style={styles.lessonDescription}>{lesson.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.addLessonButtonContainer}>
                <TouchableOpacity style={styles.addLessonButton}>
                    <Text style={styles.addLessonTitle}>
                        Добавить занятие
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.headerText}>{selectedLesson?.title}</Text>
                    </View>
                    <View style={styles.modalButtonsContainer}>
                        <TouchableOpacity style={styles.modalRedirectButton} onPress={() => {}}>
                            <Text style={styles.modalButtonTitle}>
                                Настроить курс
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalRedirectButton} onPress={navigateToStats}>
                            <Text style={styles.modalButtonTitle}>
                                Статистика курса
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                            <Text style={styles.modalCloseButtonTitle}>
                                Отмена
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
              </View>
            </Modal> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, 
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#eaeaea',
        borderBottomColor: '#000',
        borderBottomWidth: 2
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    lessonsListContainer: {
        height: '70%',
    },
    lessonContainer: {
        height: 120,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 16,
        marginHorizontal: 15,
        backgroundColor: '#fff',
        marginTop: 15,
    },
    lessonDate: {
        fontSize: 10,
    },
    lessonTitleContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingHorizontal: 15,
        borderBottomColor: '#000',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    lessonDescription: {
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    addLessonButtonContainer: {
        flex: 1
    },
    addLessonButton: {
        width: '80%',
        marginHorizontal: 'auto',
        paddingVertical: 8,
        backgroundColor: '#36573b',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addLessonTitle: {
        color: '#fff',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        paddingTop: '20%',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalButtonTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500'
    },
    modalCloseButtonTitle: {
        color: '#000'
    },
    modalHeader: {
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        padding: 15,
        borderBottomColor: '#000'
    },
    modalCloseButton: {
        width: '50%',
        borderRadius: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    modalButtonsContainer: {
        width: '100%',
        padding: 20,
        alignItems: 'center',
    },
    modalRedirectButton: {
        width: '100%',
        backgroundColor: '#36573b',
        marginBottom: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12, 
        color: '#fff',
        alignItems: 'center',
    },
    modalContent: {
        alignItems: 'center',
        width: '75%',
        height: '40%',
        backgroundColor: '#eaeaea',
        borderRadius: 24,
    }    
});

