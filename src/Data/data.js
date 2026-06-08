import {
  FileText,
  Users,
  Zap,
  CheckCircle,
  Globe,
  Building2,
  Hexagon,
  Crown,
  BarChart2,
} from "lucide-react";

export const dashboardDummyStats = [
  {
    icon: FileText,
    name: "Total Job Posts",
    data: "48",
  },
  {
    icon: Users,
    name: "Total Applicants",
    data: "1,284",
  },
  {
    icon: Zap,
    name: "Active Jobs",
    data: "18",
  },
  {
    icon: CheckCircle,
    name: "Jobs Closed",
    data: "32",
  },
];

export const applicationsData = [
  {
    id: 1,
    name: "Julianne Moore",
    role: "Senior Product Designer",
    date: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
  },
  {
    id: 2,
    name: "Robert Downey",
    role: "Backend Engineer",
    date: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
  },
  {
    id: 3,
    name: "Emma Stone",
    role: "Marketing Lead",
    date: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
  },
  {
    id: 4,
    name: "Chris Pratt",
    role: "Product Manager",
    date: "Oct 21, 2023",
    experience: "5 years",
    status: "Rejected",
  },
];

export const companiesData = [
  {
    id: 1,
    name: "Google Inc.",
    industry: "Technology",
    location: "Mountain View",
    activeJobs: 24,
    icon: Globe,
  },
  {
    id: 2,
    name: "Meta Platforms",
    industry: "Social Media",
    location: "Menlo Park",
    activeJobs: 18,
    icon: Building2,
  },
  {
    id: 3,
    name: "Stripe",
    industry: "Fintech",
    location: "San Francisco",
    activeJobs: 12,
    icon: Hexagon,
  },
  {
    id: 4,
    name: "Tesla",
    industry: "Automotive",
    location: "Austin",
    activeJobs: 31,
    icon: Zap,
  },
];

export const jobSeekerPlans = [
  {
    name: "Free",
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
