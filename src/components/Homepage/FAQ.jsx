import React from "react";
import { Accordion } from "@heroui/react";
import { CreditCard, RefreshCcw, XCircle, ArrowRightLeft, ChevronDown } from "lucide-react";

const faqItems = [
  {
    title: "How do I cancel my plan?",
    content: "You can cancel anytime from your account settings. Your plan remains active until the end of your current billing cycle.",
    icon: <XCircle size={18} />,
  },
  {
    title: "Do you offer refunds?",
    content: "Yes, we offer a 14-day money-back guarantee on all new subscriptions. Just contact our support team.",
    icon: <RefreshCcw size={18} />,
  },
  {
    title: "What payment methods do you accept?",
    content: "We accept all major credit cards (Visa, Mastercard, American Express) and Stripe.",
    icon: <CreditCard size={18} />,
  },
  {
    title: "Can I switch my plan later?",
    content: "Absolutely. You can upgrade or downgrade at any time. Prorated charges will apply automatically.",
    icon: <ArrowRightLeft size={18} />,
  },
];

export default function FAQ() {
  return (
    <section className="bg-[#0B0B0C] py-20 px-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
        
        <Accordion className="w-full flex flex-col gap-3">
          {faqItems.map((item, index) => (
            <Accordion.Item 
              key={index} 
              className="bg-[#161616] border border-neutral-800 rounded-xl px-4"
            >
              <Accordion.Heading>
                <Accordion.Trigger className="w-full flex items-center justify-between text-white py-4 outline-none group">
                  <div className="flex items-center gap-3 font-medium text-sm sm:text-base">
                    <span className="text-indigo-400">{item.icon}</span>
                    {item.title}
                  </div>
                  <Accordion.Indicator>
                    <ChevronDown size={18} className="text-neutral-500 transition-transform duration-200 group-data-[open=true]:rotate-180" />
                  </Accordion.Indicator>
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body className="text-neutral-400 pb-5 pt-1 pl-9 text-sm leading-relaxed">
                  {item.content}
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
        
      </div>
    </section>
  );
}