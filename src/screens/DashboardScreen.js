import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useInvestment } from '../hooks/useInvestment'; // Assuming this path
import { calculatePortfolioValue } from '../utils/investmentUtils'; // Assuming this path
import AllocationBar from '../components/AllocationBar'; // Assuming this path
import { Card, Button } from '../components/ui'; // Assuming these exist

const DashboardScreen = ({ navigation }) => {
  const { portfolio } = useInvestment();

  // Handle case where portfolio might not be loaded yet
  if (!portfolio) {
    return (
      <View style={styles.container}>
        <Text>Loading portfolio data...</Text>
      </View>
    );
  }

  const totalPortfolioValue = calculatePortfolioValue(portfolio.currentHoldings);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      <Card style={styles.summaryCard}>
        <Text style={styles.cardTitle}>Total Portfolio Value</Text>
        <Text style={styles.portfolioValue}>${totalPortfolioValue.toFixed(2)}</Text>
      </Card>

      <Card style={styles.allocationCard}>
        <Text style={styles.cardTitle}>Allocation Summary</Text>
        {portfolio.targetAllocation && portfolio.currentHoldings ? (
          <AllocationBar
            targetAllocation={portfolio.targetAllocation}
            currentHoldings={portfolio.currentHoldings}
          />
        ) : (
          <Text>No allocation data available.</Text>
        )}
      </Card>

      <View style={styles.actionContainer}>
        <Button title="View Holdings" onPress={() => console.log('Navigate to Holdings')} />
        <Button title="Adjust Target" onPress={() => console.log('Navigate to Adjust Target')} />
        {/* Add more buttons or navigation placeholders as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8', // Light background
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  summaryCard: {
    marginBottom: 15,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  allocationCard: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  portfolioValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#28a745', // Green for positive value
    textAlign: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default DashboardScreen;
