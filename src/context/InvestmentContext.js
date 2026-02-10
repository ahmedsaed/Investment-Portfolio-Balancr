import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of your state
const initialState = {
  targetAllocation: {
    stocks: 0.6,
    bonds: 0.3,
    cash: 0.1,
  },
  currentHoldings: {
    stocks: 10000,
    bonds: 5000,
    cash: 2000,
  },
};

const InvestmentContext = createContext(initialState);

export const InvestmentProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(true);

  // Load state from AsyncStorage on mount
  useEffect(() => {
    const loadState = async () => {
      try {
        const storedState = await AsyncStorage.getItem('investmentState');
        if (storedState) {
          setState(JSON.parse(storedState));
        }
      } catch (error) {
        console.error('Failed to load investment state from AsyncStorage', error);
      } finally {
        setLoading(false);
      }
    };

    loadState();
  }, []);

  // Save state to AsyncStorage whenever it changes
  useEffect(() => {
    if (!loading) { // Only save after initial load is complete
      const saveState = async () => {
        try {
          await AsyncStorage.setItem('investmentState', JSON.stringify(state));
        } catch (error) {
          console.error('Failed to save investment state to AsyncStorage', error);
        }
      };
      saveState();
    }
  }, [state, loading]);

  const updateTargetAllocation = (newAllocation) => {
    setState((prevState) => ({
      ...prevState,
      targetAllocation: { ...prevState.targetAllocation, ...newAllocation },
    }));
  };

  const updateCurrentHoldings = (newHoldings) => {
    setState((prevState) => ({
      ...prevState,
      currentHoldings: { ...prevState.currentHoldings, ...newHoldings },
    }));
  };

  const contextValue = {
    ...state,
    updateTargetAllocation,
    updateCurrentHoldings,
    loading,
  };

  return (
    <InvestmentContext.Provider value={contextValue}>
      {children}
    </InvestmentContext.Provider>
  );
};

export const useInvestment = () => {
  const context = useContext(InvestmentContext);
  if (context === undefined) {
    throw new Error('useInvestment must be used within an InvestmentProvider');
  }
  return context;
};
