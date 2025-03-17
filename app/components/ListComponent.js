import { View, Text, FlatList, StyleSheet } from 'react-native';

const ListComponent = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text>{item.name}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ListComponent;