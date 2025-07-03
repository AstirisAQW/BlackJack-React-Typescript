# React Blackjack Game

This is a classic game of Blackjack built with React and TypeScript, following a clean, domain-driven architecture.



## Description

This project is an implementation of the card game Blackjack. The goal is to have a hand value closer to 21 than the dealer without going over. The application is structured to separate business logic (domain) from the user interface (presentation) and data sources (data), making it scalable and maintainable.

## Features

- **Standard Blackjack Rules**: Player vs. Dealer.
- **Hit & Stand**: Player can draw additional cards (Hit) or end their turn (Stand).
- **Automatic Scoring**: Scores are calculated automatically, correctly handling Aces as 1 or 11.
- **Dealer AI**: The dealer follows a fixed strategy (hits on 16 or less, stands on 17 or more).
- **Bust Detection**: The game automatically detects if the player or dealer exceeds a score of 21.
- **Game State Management**: Clear states for starting a new game, the player's turn, and the game's end.
- **Card Deck Logic**: The deck is shuffled at the start and reshuffled automatically when it runs low on cards.


## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For static typing and improved code quality.
- **Create React App**: As the foundation for the project setup.

## How to Run Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16.x or later recommended)
- `npm` or `yarn` package manager

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/blackjack-react-typescript.git
    cd blackjack-react-typescript
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```
    or if you use yarn:
    ```sh
    yarn install
    ```

3.  **Start the development server:**
    ```sh
    npm start
    ```
    or
    ```sh
    yarn start
    ```

4.  Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.