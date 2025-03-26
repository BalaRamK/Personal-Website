"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const caseStudies = [
  {
    title: 'Streamlining Operations at Atos',
    challenge: 'Inefficient reporting systems for global teams.',
    solution: 'Created automated dashboards using Power BI and SharePoint.',
    result: 'Reduced reporting time by 40% and enhanced decision-making efficiency.',
  },
  {
    title: 'Driving Cybersecurity Innovation at QNu Labs',
    challenge: 'Introducing quantum-resistant security solutions to new markets.',
    solution: 'Developed industry use cases and led cross-functional teams.',
    result: 'Achieved $5M in pre-sales pipeline and expanded into MEA/USA markets.',
  },
  {
    title: 'Change Management Leadership at PwC',
    challenge: 'Leading firm-wide initiatives and digital transformation.',
    solution: 'Enhanced efficiency using digital tools and stakeholder management.',
    result: 'Successfully implemented new processes across multiple departments.',
  },
];

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="portfolio" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transforming Ideas into Impactful Outcomes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore my portfolio of successful projects and initiatives that have driven significant business value.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-blue-600">{study.title}</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">Challenge</h4>
                      <p className="text-gray-600">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Solution</h4>
                      <p className="text-gray-600">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Result</h4>
                      <p className="text-gray-600">{study.result}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio; 