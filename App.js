import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import useInfiniteScroll from './components/useInfiniteScroll';

const styles = StyleSheet.create({
  container: { flex: 1, marginTop : 20 },
  item: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  footer: { padding: 20, alignItems: 'center' },
  error: { color: 'red', textAlign: 'center', padding: 20 }
});

export default function App() {
  const { items, error, hasMore, loadMore } = useInfiniteScroll();

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      {hasMore && <ActivityIndicator size="small" />}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
      {error && <Text style={styles.error}>Error: {error}</Text>}
    </View>
  );
}