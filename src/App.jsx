import React, { useRef } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardOverview } from './components/DashboardOverview';
import { TransactionsSection } from './components/TransactionsSection';
import { InsightsSection } from './components/InsightsSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Reveal everything initially hidden
    gsap.set('.gsap-reveal', { autoAlpha: 1, visibility: 'visible' });

    // Entrance Animation for app shell
    gsap.from('.bento-app-shell', {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    // Staggered reveal for panels
    const sections = gsap.utils.toArray('.gsap-section');
    sections.forEach((section, i) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: i * 0.1
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ width: '100%', padding: '2rem 1rem' }}>
      <div className="bento-app-shell gsap-reveal" style={{ overflow: 'hidden' }}>
        <Navbar />
        <main className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <DashboardOverview />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 gsap-section">
            <InsightsSection />
            <TransactionsSection />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
