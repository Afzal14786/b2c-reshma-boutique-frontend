export const formatPrice = (price: number) => `₹${price.toFixed(2)}`;
export const formatDate = (date: string) => new Date(date).toLocaleDateString();
