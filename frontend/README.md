# T-Shirt Designer

## Overview
An interactive T-Shirt design application that allows users to customize shirts based on their measurements, add custom text and images, and receive size recommendations. The app features multiple color themes and a responsive design.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- 

## Installation

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)

### Setup
1. Clone the repository
   ```bash
   git clone https://github.com/username/t-shirt-designer.git
   cd t-shirt-designer/frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

## Usage
Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Features
- Customizable T-Shirt design based on user measurements
- Interactive visual preview with real-time updates
- Size recommendations based on user's height, weight, and build type
- Theme customization with three different color schemes (shortcut: Alt+Q)
- Upload custom images via drag-and-drop or file selection
- Add up to three lines of custom text
- Responsive design for desktop and mobile devices
- Dark mode support

## Technologies
- TypeScript
- React 19
- Vite
- Tailwind CSS
- React Hook Form
- Framer Motion for animations
- React Dropzone for file uploads
- Heroicons

## Project Structure
```
frontend/
├── public/
├── src/
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Entry point
├── index.html           # HTML template
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact
Project Maintainer - [mittalvaibhav73@gmail.com](mailto:mittalvaibhav73@gmail.com)
