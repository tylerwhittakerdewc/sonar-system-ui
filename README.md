# Submarine Sonar Detection System

This project simulates a submarine sonar detection system with a visually rich interface, utilizing React, Tailwind CSS, and optional Canvas API or SVG for sonar rendering.

## Features

- **Sonar Display**: Visual representation of sonar data using either Canvas or SVG.
- **Interactive Controls**: Manage scan modes and filters through an intuitive control panel.
- **HUD**: Displays navigation, tactical information, system status, and communications.
- **Mock Data**: Simulates various contacts (submarines, ships, sea life, humans) for testing and demonstration purposes.
- **Animations**: Engaging animations for sonar sweeps and contact updates.

## Project Structure

```
submarine-sonar-ui
├── public
│   └── index.html          # Main HTML entry point
├── src
│   ├── main.tsx           # Entry point for the React application
│   ├── App.tsx            # Main application component
│   ├── index.css          # Global styles and Tailwind CSS imports
│   ├── components          # Contains all React components
│   ├── hooks               # Custom hooks for managing state and data
│   ├── services            # Functions for simulating sonar detection
│   ├── utils               # Utility functions for calculations
│   ├── data                # Mock data for simulation
│   ├── types               # TypeScript interfaces and types
│   └── tests               # Unit tests for components
├── package.json            # npm configuration file
├── tsconfig.json           # TypeScript configuration file
├── vite.config.ts          # Vite configuration file
├── tailwind.config.js      # Tailwind CSS configuration file
├── postcss.config.js       # PostCSS configuration file
├── .eslintrc.json          # ESLint configuration file
└── README.md               # Project documentation
```

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd submarine-sonar-ui
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

## Usage

- Use the navigation bar to switch between different panels of the sonar system.
- Interact with the controls to toggle scan modes and filters.
- Observe the sonar display for real-time updates on detected contacts.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.