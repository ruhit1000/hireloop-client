import {
  FileText,
  Users,
  Zap,
  CheckCircle,
  Globe,
  Building2,
  Hexagon,
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
