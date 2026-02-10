
/**
 * Calculates the total value of the portfolio based on current holdings.
 *
 * @param {Array<Object>} holdings - An array of asset holding objects.
 *   Each object should have:
 *   - `units`: The number of units held for the asset (number).
 *   - `price`: The current price per unit of the asset (number).
 * @returns {number} The total value of the portfolio. Returns 0 if holdings are empty or invalid.
 */
export const calculatePortfolioValue = (holdings) => {
  if (!Array.isArray(holdings) || holdings.length === 0) {
    return 0;
  }

  return holdings.reduce((total, holding) => {
    const units = typeof holding.units === 'number' && !isNaN(holding.units) ? holding.units : 0;
    const price = typeof holding.price === 'number' && !isNaN(holding.price) ? holding.price : 0;
    return total + (units * price);
  }, 0);
};

/**
 * Calculates the current percentage of each asset class in the portfolio.
 *
 * @param {Array<Object>} holdings - An array of asset holding objects.
 *   Each object should have:
 *   - `assetClass`: The category of the asset (string, e.g., 'Equity', 'Fixed Income', 'Gold').
 *   - `units`: The number of units held for the asset (number).
 *   - `price`: The current price per unit of the asset (number).
 * @returns {Object} An object where keys are asset classes and values are their
 *   percentage allocation in the portfolio. Returns an empty object if holdings are empty or total value is zero.
 */
export const calculateAllocationPercentages = (holdings) => {
  if (!Array.isArray(holdings) || holdings.length === 0) {
    return {};
  }

  const totalPortfolioValue = calculatePortfolioValue(holdings);
  if (totalPortfolioValue === 0) {
    return {};
  }

  const classValues = holdings.reduce((acc, holding) => {
    const assetClass = holding.assetClass;
    const units = typeof holding.units === 'number' && !isNaN(holding.units) ? holding.units : 0;
    const price = typeof holding.price === 'number' && !isNaN(holding.price) ? holding.price : 0;
    const value = units * price;
    acc[assetClass] = (acc[assetClass] || 0) + value;
    return acc;
  }, {});

  const allocationPercentages = {};
  for (const assetClass in classValues) {
    allocationPercentages[assetClass] = (classValues[assetClass] / totalPortfolioValue) * 100;
  }

  return allocationPercentages;
};

/**
 * Calculates how a new investment amount should be distributed across asset classes
 * to rebalance the portfolio towards a target allocation.
 *
 * @param {number} newInvestmentAmount - The amount of new money to invest.
 * @param {Array<Object>} currentHoldings - An array of asset holding objects similar to `calculateAllocationPercentages`.
 * @param {Object} targetAllocation - An object where keys are asset classes and values are their
 *   target percentage allocation (e.g., `{ Equity: 0.7, Fixed Income: 0.2, Gold: 0.1 }`).
 *   Percentages should be expressed as decimals (0-1).
 * @returns {Object} An object indicating the amount to invest in each asset class
 *   to reach the target allocation. Returns an empty object if inputs are invalid.
 */
export const calculateRebalancingDistribution = (newInvestmentAmount, currentHoldings, targetAllocation) => {
  if (typeof newInvestmentAmount !== 'number' || isNaN(newInvestmentAmount) || newInvestmentAmount < 0) {
    return {};
  }
  if (!Array.isArray(currentHoldings)) {
    return {};
  }
  if (typeof targetAllocation !== 'object' || targetAllocation === null || Object.keys(targetAllocation).length === 0) {
    return {};
  }

  const currentPortfolioValue = calculatePortfolioValue(currentHoldings);
  const totalValueAfterInvestment = currentPortfolioValue + newInvestmentAmount;

  const distribution = {};
  let totalDistributedAmount = 0;

  for (const assetClass in targetAllocation) {
    const targetPercentage = targetAllocation[assetClass];
    if (typeof targetPercentage !== 'number' || isNaN(targetPercentage) || targetPercentage < 0 || targetPercentage > 1) {
      console.warn(`Invalid target percentage for asset class '${assetClass}'. Skipping.`);
      continue;
    }

    // Calculate the target value for this asset class after the new investment
    const targetValueForClass = totalValueAfterInvestment * targetPercentage;

    // Get the current value of this asset class
    const currentClassValue = currentHoldings.reduce((acc, holding) => {
      if (holding.assetClass === assetClass) {
        const units = typeof holding.units === 'number' && !isNaN(holding.units) ? holding.units : 0;
        const price = typeof holding.price === 'number' && !isNaN(holding.price) ? holding.price : 0;
        return acc + (units * price);
      }
      return acc;
    }, 0);

    // Calculate how much needs to be invested or divested
    const neededInvestment = targetValueForClass - currentClassValue;

    // Only invest if needed and if there's investment amount remaining
    if (neededInvestment > 0) {
        distribution[assetClass] = neededInvestment;
        totalDistributedAmount += neededInvestment;
    } else {
        distribution[assetClass] = 0; // No investment needed or divestment required (which this function doesn't handle)
    }
  }

  // Adjust to ensure total distributed amount equals newInvestmentAmount,
  // handling potential floating point inaccuracies and ensuring the total doesn't exceed newInvestmentAmount
  const difference = newInvestmentAmount - totalDistributedAmount;
  if (Math.abs(difference) > 0.01 && newInvestmentAmount > 0) { // A small threshold for floating point
      // Distribute the remainder proportionally or to the largest deficit
      const deficitClasses = Object.keys(distribution).filter(
          (ac) => distribution[ac] > 0
      );

      if (deficitClasses.length > 0) {
          const adjustmentPerClass = difference / deficitClasses.length;
          deficitClasses.forEach((ac) => {
              distribution[ac] += adjustmentPerClass;
          });
      } else if (newInvestmentAmount > 0) {
          // If no deficit classes, but there's a new investment, put it all into the first asset class
          // (This is a fallback for unusual edge cases, could be refined based on specific business rules)
          const firstAssetClass = Object.keys(targetAllocation)[0];
          if (firstAssetClass) {
              distribution[firstAssetClass] = (distribution[firstAssetClass] || 0) + newInvestmentAmount;
          }
      }
  }

  // Ensure no negative distributions
  for (const assetClass in distribution) {
      if (distribution[assetClass] < 0) {
          distribution[assetClass] = 0;
      }
  }

  return distribution;
};
