import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import  InfiniteScroll from '../components/useInfiniteScroll';
import styles from './dashboard.styles';


  const dashboard = ()=>{
    return (<InfiniteScroll>
      {({ items, error, hasMore, loadMore }) => (
        <View style={styles.container}>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.title}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => (
              <View style={styles.footer}>
                {hasMore && <ActivityIndicator size="small" />}
              </View>
            )}
          />
          {error && <Text style={styles.error}>Error: {error}</Text>}
        </View>
      )}
    </InfiniteScroll>)}

    export default dashboard;