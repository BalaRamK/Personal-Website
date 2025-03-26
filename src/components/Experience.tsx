"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const experiences = [
  {
    company: 'Atos',
    role: 'Manager – Program Management',
    period: '2021 - Present',
    logoUrl: '/images/companies/atos.png',
    achievements: [
      'Delivered programs across multiple geographies',
      'Improved client satisfaction by 30%',
      'Led cross-functional teams in digital transformation',
    ],
  },
  {
    company: 'PwC',
    role: 'Manager – Change Management',
    period: '2019 - 2021',
    logoUrl: '/images/companies/pwc.jpg',
    achievements: [
      'Led firm-wide initiatives',
      'Enhanced efficiency using digital tools',
      'Managed stakeholder relationships',
    ],
  },
  {
    company: 'QNu Labs',
    role: 'Consultant',
    period: '2018 - 2019',
    logoUrl: '/images/companies/qnu.jpeg',
    achievements: [
      'Spearheaded pre-sales initiatives',
      'Drove $5M pipeline growth',
      'Developed market entry strategies',
    ],
  },
  {
    company: 'TCS',
    role: 'Embedded Systems Analyst',
    period: '2016 - 2018',
    logoUrl: '/images/companies/tcs.webp',
    achievements: [
      'Reduced analysis time by 50%',
      'Trained new team members',
      'Implemented process improvements',
    ],
  },
];

const CompanyLogo = ({ company, logoUrl }: { company: string; logoUrl: string }) => {
  return (
    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white shadow-sm">
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={`${company} logo`}
          fill
          className="object-contain p-1"
        />
      ) : (
        <div className="w-full h-full bg-blue-50 flex items-center justify-center">
          <span className="text-blue-600 text-xs font-medium">
            {company.substring(0, 2).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A timeline of my professional journey and key achievements.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-wrap justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <CompanyLogo company={exp.company} logoUrl={exp.logoUrl} />
                        <div>
                          <h3 className="text-xl font-bold text-blue-600">{exp.company}</h3>
                          <p className="text-lg font-semibold text-gray-900">{exp.role}</p>
                        </div>
                      </div>
                      <span className="text-gray-600">{exp.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-blue-600 mr-2 mt-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-600">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 