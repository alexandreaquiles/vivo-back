export function calculateAnnualPrice (plan) {
    const monthlyPrice = plan.price;
    const offer = plan.offer || 0;
    if (offer > 0) {
      const discountedPrice = monthlyPrice - offer;
      return (discountedPrice * 3) + (monthlyPrice * 9);
    }
    return monthlyPrice * 12;
}
