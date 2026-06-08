import Banner from "@/components/Homepage/Banner";
import CallToAction from "@/components/Homepage/CallToAction";
import FeaturedJobs from "@/components/Homepage/FeaturedJobs";
import Features from "@/components/Homepage/Features";
import Pricing from "@/components/Homepage/Pricing";


export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedJobs />
      <Features />
      <Pricing />
      <CallToAction />
    </div>
  );
}
