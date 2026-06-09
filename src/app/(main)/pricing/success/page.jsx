import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <main className="min-h-screen bg-[#0B0B0C] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#161616] border border-neutral-800 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Payment Successful!
          </h1>

          <p className="text-neutral-400 mb-8 leading-relaxed text-sm">
            We appreciate your business. A confirmation email has been sent to{" "}
            <span className="text-white font-medium">{customerEmail}</span>.
          </p>

          <Link
            href="/jobs"
            className="flex items-center justify-center gap-2 w-full bg-white text-black hover:bg-neutral-200 font-bold py-3.5 rounded-xl transition-all duration-300"
          >
            Explore Jobs
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="mt-6 text-xs text-neutral-500">
            If you have any questions, please email{" "}
            <a
              href="mailto:support@hireloop.com"
              className="text-sky-400 hover:underline"
            >
              support@hireloop.com
            </a>
            .
          </p>
        </div>
      </main>
    );
  }
}
