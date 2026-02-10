
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListItem = ({ assetName, assetClass, units, price }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.assetName}>{assetName}</Text>
        <Text style={styles.assetClass}>{assetClass}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.detailText}>Units: {units}</Text>
        <Text style={styles.detailText}>Price: ${price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  assetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  assetClass: {
    fontSize: 16,
    color: '#666',
  },
  detailText: {
    fontSize: 14,
    color: '#777',
  },
});

export default ListItem;
