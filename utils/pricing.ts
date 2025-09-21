export const formatCurrency = (value: number, currency: string) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);

export const calculateDiscountedPrice = (amount: number, discount?: number) => {
  if (!discount) return amount;
  const discountValue = amount * (discount / 100);
  return Math.max(amount - discountValue, 0);
};

export const getSavingsPercentage = (original?: number, current?: number) => {
  if (!original || !current || original <= current) return null;
  const savings = ((original - current) / original) * 100;
  return Math.round(savings);
};

export const resolveBillingPrice = (
  billing: "monthly" | "yearly",
  price: { monthly: number; yearly: number },
) => (billing === "monthly" ? price.monthly : price.yearly);
