import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue, withSpring, runOnJS, useAnimatedStyle } from 'react-native-reanimated';

type GestureContext = Record<string, number> & {
    startY: number;
};

export default function LessonStatisticsScreen() {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const { lessonTitle } = useLocalSearchParams();
    const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
    const translateY = useSharedValue(0);

    const openModal = (person: string) => {
        translateY.value = 0;
        setSelectedPerson(person);
        setModalVisible(true);
    };

    // const closeModal = () => {
    //     setModalVisible(false);
    //     setSelectedPerson(null);
    // };
    const closeModal = () => {
        translateY.value = 0; // Сбрасываем значение translateY
        setModalVisible(false);
        setSelectedPerson(null);
    };

    const gestureHandler = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent, // Тип события жеста
        GestureContext // Тип контекста
    >({
        onStart: (_, ctx) => {
            ctx.startY = translateY.value;
        },
        onActive: (event, ctx) => {
            translateY.value = ctx.startY + event.translationY;
        },
        onEnd: (event) => {
            if (event.translationY > 100) {
                translateY.value = withSpring(300, {}, () => {
                    runOnJS(closeModal)();
                });
            } else {
                translateY.value = withSpring(0);
            }
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>{lessonTitle}</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={styles.statsCategoryTitle}>Общая статистика</Text>
            <View style={styles.personalStats}>
                <Text style={styles.statsCategoryTitle}>Личная статистика</Text>
                {['Наби Азамат', 'Сергей', 'Еркош'].map((person) => (
                    <TouchableOpacity key={person} onPress={() => openModal(person)}>
                        <View style={styles.personalItem}>
                            <Text style={styles.personalItemTitle}>{person}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            
            {modalVisible && (
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <PanGestureHandler onGestureEvent={gestureHandler}>
                            <Animated.View style={[styles.modalView, { transform: [{ translateY: translateY.value }] }]}>
                                <View style={styles.modalHeader}>
                                    <View style={styles.modalHandle}>
                                    </View>
                                    <View style={styles.modalHeaderRow}>
                                        <View style={styles.modalHeaderIcon}>
                                        </View>
                                        <View style={styles.headerPersonalInfo}>
                                            <Text style={styles.personalInitials}>
                                                {selectedPerson}
                                            </Text>
                                            <Text>
                                                Школа: №36
                                            </Text>
                                            <Text>
                                                Почта: mail@mail.ru
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                {/* <Text style={styles.modalTitle}>{selectedPerson}</Text> */}
                                <View style={styles.personalStatsProperties}>
                                    <Text>Посещаемость:</Text>
                                    <Text>Тест:</Text>
                                    <Text>Задание:</Text>
                                    <Text>Комментарий:</Text>
                                </View>
                                
                            </Animated.View>
                        </PanGestureHandler>
                    </GestureHandlerRootView>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaeaea',
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
    statsCategoryTitle: {
        margin: 20,
        fontSize: 16
    },
    personalStats: {
        marginTop: '10%'
    },
    personalItem: {
        borderTopWidth: 1,
        borderTopColor: '#000',
        backgroundColor: '#fff'
    },
    personalItemTitle: {
        marginVertical: 8,
        marginHorizontal: 20,
        fontSize: 18
    },
    personalInitials: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    personalStatsProperties: {
        padding: 30,
    },
    modalView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '50%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalHeader: {
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        
    },
    modalHandle: {
        width: '33%',
        margin: 'auto',
        borderWidth: 3,
        borderColor: '#d9d9d9'
    },
    modalHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalHeaderIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginVertical: 20,
        marginHorizontal: 30,
        backgroundColor: '#d9d9d9',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    headerPersonalInfo: {

    }
});
