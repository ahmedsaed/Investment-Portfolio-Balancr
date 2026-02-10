
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AllocationBar = ({ assetClass, targetAllocation, currentAllocation }) => {
  const currentWidth = `${currentAllocation}%`;
  const targetWidth = `${targetAllocation}%`;

  return (
    <View style={styles.container}>
      <Text style={styles.assetClass}>{assetClass}</Text>
      <View style={styles.barBackground}>
        <View style={[styles.currentBar, { width: currentWidth }]} />
        <View style={[styles.targetMarker, { left: targetWidth }]} />
      </View>
      <View style={styles.allocationTextContainer}>
        <Text style={styles.allocationText}>Current: {currentAllocation}%</Text>
        <Text style={styles.allocationText}>Target: {targetAllocation}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  assetClass: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  barBackground: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    marginBottom: 5,
  },
  currentBar: {
    height: '100%',
    backgroundColor: '#4CAF50', // Green for current allocation
    borderRadius: 5,
  },
  targetMarker: {
    position: 'absolute',
    width: 2,
    height: '100%',
    backgroundColor: '#FF9800', // Orange for target marker
  },
  allocationTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  allocationText: {
    fontSize: 14,
    color: '#555',
  },
});

export default AllocationBar;
