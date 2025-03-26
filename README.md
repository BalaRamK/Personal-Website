# Personal Website

A modern, responsive personal website built with Next.js, React, and Tailwind CSS. This website showcases professional experience, portfolio, skills, and provides a contact form.

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive layout
- ⚡ Fast performance with Next.js
- 🎭 Smooth animations with Framer Motion
- 🌍 Interactive 3D globe visualization
- 📝 Contact form with validation
- 🔍 SEO optimized
- ♿ Accessibility focused

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js (for 3D globe)
- React Three Fiber
- React Three Drei

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/personal-website.git
cd personal-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Portfolio.tsx
│   ├── Experience.tsx
│   ├── Skills.tsx
│   ├── Contact.tsx
│   └── Navigation.tsx
└── styles/
    └── globals.css
```

## Customization

1. Update personal information in the respective component files
2. Modify the color scheme in `tailwind.config.js`
3. Add your own images and assets to the `public` directory
4. Customize animations in the components using Framer Motion

## Deployment

The easiest way to deploy this website is using [Vercel](https://vercel.com):

1. Push your code to a GitHub repository
2. Import your repository in Vercel
3. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 