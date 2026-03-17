# Jerm Travel

A modern travel website built with Next.js 15, offering tour packages, transfer services, and travel management for Armenia. The website provides a comprehensive platform for booking individual tours, transfers, and exploring the beautiful country of Armenia.

## About This Project

Jerm Travel is a travel agency website that specializes in:

- **Individual Tours**: Customized tour packages for Armenia
- **Transfer Services**: Transportation services across Armenia
- **Multilingual Support**: Available in English, Armenian (Հայերեն), and Russian
- **Travel Management**: Complete travel planning and booking system
- **Vehicle Fleet**: Information about available vehicles for tours and transfers

The website features a modern, responsive design with sections for featured tours, transfer services, company information, and customer reviews.

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: v22.9.0 or higher
- **npm**: v11.3.0 or higher
- **pnpm**: v10.7.1 (recommended package manager)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/edgaravag/Jerm-Travel.git
cd jerm-travel
```

### 2. Install Dependencies

The project uses pnpm as the package manager. Install dependencies using:

```bash
pnpm install
```

If you don't have pnpm installed, you can install it globally:

```bash
npm install -g pnpm
```

Alternatively, you can use npm:

```bash
npm install
```

### 3. Run the Development Server

Start the development server with Turbopack for faster builds:

```bash
pnpm dev
# or
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### 4. Build for Production

To create a production build:

```bash
pnpm build
# or
npm run build
```

### 5. Start Production Server

To start the production server:

```bash
pnpm start
# or
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main application pages
│   └── api/               # API routes
├── components/            # React components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── sections/         # Page sections
│   └── ui/               # Reusable UI components
├── data/                 # Static data and mock data
├── hooks/                # Custom React hooks
├── i18n/                 # Internationalization configuration
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

## Key Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Next-intl** for internationalization
- **NextAuth.js** for authentication
- **React Hook Form** with Zod validation
- **Radix UI** components
- **Responsive design** for all devices

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code quality checks

## Environment Setup

Make sure to configure any required environment variables in a `.env.local` file if needed for authentication or API integrations.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run the linter: `pnpm lint`
5. Submit a pull request

## License

This project is private and proprietary to Jerm Travel.
