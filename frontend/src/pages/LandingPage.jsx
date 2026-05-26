import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/index.js';
import { useScroll, useTransform } from 'framer-motion';
import { FaQrcode, FaBolt, FaCreditCard, FaChartLine, FaUsers, FaStar } from 'react-icons/fa';

export default function LandingPage() {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.observe');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  return (
    <div className="flex flex-1 relative flex-col">
          {/* ================== Hero Section ================== */}
        <motion.div
            style={{ opacity: heroOpacity }}
            className="sticky top-0 h-screen z--40 "
            >
            <Hero />
        </motion.div>
    
    {/* ================== other sections ================= */}

    </div>
  );
}