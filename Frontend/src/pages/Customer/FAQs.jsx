import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "🌱 How do I sign up as a farmer?",
    answer:
      "Visit the registration page and select 'Farmer'. Fill in the necessary farm details and start listing your products immediately.",
  },
  {
    question: "🚚 Who handles delivery logistics?",
    answer:
      "Our platform offers local delivery partners in major regions. You can also fulfill orders manually or choose hybrid delivery.",
  },
  {
    question: "📲 Is there an app for mobile?",
    answer:
      "Yes! Download the FarmConnect app from Google Play or the App Store and manage your farm on the go.",
  },
  {
    question: "💵 Do I pay commission on sales?",
    answer:
      "We charge a small 2% platform fee per successful order to maintain security, marketing, and buyer support.",
  },
];

const FAQs = () => {
  const [active, setActive] = useState(null);

  const toggle = (index) => {
    setActive(index === active ? null : index);
  };

  return (
    <div className="min-h-screen p-6 sm:p-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-green-900 text-center mb-12 drop-shadow-xl">
          🌿 Your Questions Answered 🌿
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-lg border border-green-300 shadow-[0_8px_30px_rgb(0,128,0,0.1)] rounded-3xl  transition-all duration-300 hover:shadow-green-300"
            >
              <button
                className="w-full px-6 py-5 flex justify-between items-center text-left"
                onClick={() => toggle(index)}
              >
                <span className="text-green-900 text-lg font-semibold">
                  {faq.question}
                </span>
                {active === index ? (
                  <ChevronUp className="text-green-800" />
                ) : (
                  <ChevronDown className="text-green-700" />
                )}
              </button>

              <AnimatePresence>
                {active === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-6 pb-5 text-green-700 text-base"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;