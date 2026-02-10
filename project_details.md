# Investment App Project Details

## Overview
This project aims to develop a mobile application using React Native to help manage personal investments. The primary goal is to assist in rebalancing a portfolio to align with a defined long-term plan by adjusting future monthly investments. The core logic and functionality will be inspired by the "Portfolio Balancer" web app ([portfolio-balancr.lovable.app](https://portfolio-balancr.lovable.app/)), focusing on tracking holdings, calculating drift, and recommending optimal distribution for new investments.

## Target Allocation
The target asset allocation for the portfolio is:
- **Equity Funds:** 70%
- **Fixed Income Funds:** 20%
- **Gold:** 10%

## Rebalancing Strategy
The app will facilitate portfolio management by allowing the user to track current holdings and their drift from the target allocation. Future monthly investment amounts will be adjusted to bring the portfolio back in line with the target percentages. Data will be entered and updated manually by the user. The *logic* for calculating drift and recommending investment distribution will mirror that of the "Portfolio Balancer" web app. While the *design* is free to evolve, the functional core will remain consistent.

## Technology Stack
- **Mobile Development:** React Native

## Progress Summary
We have successfully:
- Initialized the React Native project (`AwesomeProject`) within the `investment-app` directory.
- Set up persistent state management using React Context API and integrated `AsyncStorage` for local data persistence.
- Created a suite of reusable UI components: `InputText`, `Selector`, `ListItem`, and `AllocationBar`.
- Developed core calculation utilities for portfolio value, allocation percentages, and rebalancing distribution.
- Created the foundational `DashboardScreen` component, displaying portfolio value and allocation summary placeholders.
- Established a GitHub Actions workflow (`android.yml`) for building an Android APK.
- Generated an SSH key pair for GitHub access (public key shared, but host key verification is pending).
- Configured Git so that only the `AwesomeProject` directory is a Git repository, removing the outer nested repository.

## Next Steps
1.  **Resolve SSH Host Key Verification:** Manually execute `ssh -T git@github.com` in your environment to accept the GitHub host key. This is a critical step to enable remote Git operations.
2.  **Push to GitHub:** Once SSH host key verification is successful, we can push the current state of the `AwesomeProject` repository to your `git@github.com:ahmedsaed/Investment-Portfolio-Balancr.git` remote.
3.  **Install `@react-native-picker/picker`:** Manually install this dependency in your React Native project (`npm install @react-native-picker/picker` or `yarn add @react-native-picker/picker`) for the `Selector` component to function correctly.
4.  **Develop Remaining App Pages:** Focus on building the 'Target Allocation', 'Current Holdings', and 'Rebalancing/Investment Planning' pages.
5.  **Integrate Components and Logic:** Connect the developed UI components with the state management and calculation utilities to bring the pages to life.
