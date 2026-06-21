import { redirect } from "next/navigation";
import Link from "next/link";
import { stripe } from "../../../lib/stripe";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });
  } catch (error) {
    console.error("Stripe session retrieval failed:", error);
    // Graceful fallback for production instead of a raw crash
    throw new Error(
      "Unable to retrieve checkout details. Please contact support.",
    );
  }

  const { status, customer_details } = session;
  const customerEmail = customer_details?.email;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center px-4 sm:px-6">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl text-center">
          {/* Animated/Animated-style Success Check Icon */}
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-zinc-100 mb-2 tracking-tight">
            Payment Successful!
          </h1>
          <p className="text-zinc-400 text-sm mb-6">
            Thank you for your purchase. Your account features are updating now.
          </p>

          <hr className="border-zinc-800 my-5" />

          {/* Details Section */}
          <div className="text-left space-y-4 mb-8">
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-sm">
              <span className="text-zinc-500 block text-xs font-semibold uppercase tracking-wider mb-1">
                Confirmation Email
              </span>
              <span className="text-zinc-200 font-medium break-all">
                {customerEmail || "Your registered email"}
              </span>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed text-center sm:text-left">
              A detailed receipt has been sent to your email. If you have any
              inquiries regarding your order, please reach out to{" "}
              <a
                href="mailto:orders@example.com"
                className="text-orange-400 hover:text-orange-300 font-medium transition-colors underline underline-offset-4"
              >
                orders@example.com
              </a>
              .
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="flex w-full justify-center items-center px-4 py-3 bg-white text-zinc-950 font-semibold text-sm rounded-xl hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="flex w-full justify-center items-center px-4 py-3 bg-zinc-800/50 text-zinc-300 font-medium text-sm rounded-xl hover:bg-zinc-800 transition-colors border border-zinc-700/50"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
