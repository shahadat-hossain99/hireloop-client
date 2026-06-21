import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  seeker_pro: "price_1TkiMmJWAUlUAgFkOnWUzCYC",
  seeker_premium: "price_1TkibUJWAUlUAgFktUIJhR6a",
  recruiter_growth: "price_1TkihjJWAUlUAgFkGrgDNGSb",
  recruiter_enterprise: "price_1TkigvJWAUlUAgFkJkJA4Zpk",
};
