import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Blog from '@/components/Blog';

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Portfolio />
      <Experience />
      <Skills />
      <Blog />
      <Contact />
    </main>
  );
} 