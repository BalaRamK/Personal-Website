"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const achievements = [
    {
      title: 'Promoted within two years',
      company: 'Atos',
      description: 'For delivering high-impact programs',
    },
    {
      title: '75% Proof of Concept conversion rate',
      company: 'QNu Labs',
      description: 'Achieved exceptional results in pre-sales',
    },
    {
      title: 'Star of the Month',
      company: 'TCS',
      description: 'Recognized for inspiring excellence',
    },
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-blue-100 overflow-hidden">
              <div className="w-full h-full relative">
                <Image
                  src="/images/profile.jpg"
                  alt="Professional Photo of Bala Karumanchi"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
            <p className="text-lg text-gray-600">
              With over 7 years of experience spanning cybersecurity, change management, and program leadership, I have consistently delivered measurable results across global teams.
            </p>
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{achievement.title}</h3>
                    <p className="text-blue-600">{achievement.company}</p>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#experience" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              Learn More About My Journey
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 