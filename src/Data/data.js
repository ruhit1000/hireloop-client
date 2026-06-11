import {
  Zap,
  Crown,
  BarChart2,
} from "lucide-react";


export const jobSeekerPlans = [
  {
    name: "Free",
    id: "seeker_free",
    price: "0",
    period: "/forever",
    icon: Crown,
    iconColor: "text-pink-400",
    description: "Essential tools for your job search:",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs per month",
      "Basic profile",
      "Email alerts",
    ],
    isHighlighted: false,
  },
  {
    name: "Pro",
    id: "seeker_pro",
    price: "19",
    period: "/month",
    icon: BarChart2,
    iconColor: "text-purple-400",
    description: "Supercharge your application process:",
    features: [
      "Apply to up to 30 jobs per month",
      "Unlimited saved jobs",
      "Application tracking",
      "Salary insights",
    ],
    isHighlighted: true,
  },
  {
    name: "Premium",
    id: "seeker_premium",
    price: "39",
    period: "/month",
    icon: Zap,
    iconColor: "text-blue-400",
    description: "Ultimate visibility and access:",
    features: [
      "Everything in Pro",
      "Unlimited applications",
      "Profile boost to recruiters",
      "Early access to new jobs",
      "Priority support",
    ],
    isHighlighted: false,
  },
];

export const recruiterPlans = [
  {
    name: "Free",
    id: "recruiter_free",
    price: "0",
    period: "/forever",
    icon: Crown,
    iconColor: "text-pink-400",
    description: "Great for a company's first year of hiring:",
    features: [
      "Up to 3 active job posts",
      "Basic applicant management",
      "Standard listing visibility",
    ],
    isHighlighted: false,
  },
  {
    name: "Growth",
    id: "recruiter_growth",
    price: "49",
    period: "/month",
    icon: BarChart2,
    iconColor: "text-purple-400",
    description: "Scale your hiring process:",
    features: [
      "Up to 10 active job posts",
      "Applicant tracking",
      "Basic analytics",
      "Email support",
    ],
    isHighlighted: true,
  },
  {
    name: "Enterprise",
    id: "recruiter_enterprise",
    price: "149",
    period: "/month",
    icon: Zap,
    iconColor: "text-blue-400",
    description: "Full suite for large teams:",
    features: [
      "Up to 50 active job posts",
      "Advanced analytics dashboard",
      "Featured job listings",
      "Team collaboration & custom branding",
      "Priority support",
    ],
    isHighlighted: false,
  },
];
