import Banner from "@/components/Homepage/Banner";
import CallToAction from "@/components/Homepage/CallToAction";
import Features from "@/components/Homepage/Features";
import Pricing from "@/components/Homepage/Pricing";


export default function Home() {
  return (
    <div>
      <Banner />
      <Features />
      <Pricing />
      <CallToAction />
    </div>
  );
}
