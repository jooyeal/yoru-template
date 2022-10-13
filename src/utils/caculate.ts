import { OrderStatus } from "@prisma/client";

// calculate discounted price
export const getDiscountPrice = (
  price: number,
  discountRate: number
): number => {
  const discountPrice = Math.floor((price * discountRate) / 100);
  return price - discountPrice;
};

//return color from order status
export const getOrderProgressColor = (progress: string): string => {
  switch (progress) {
    case "PAYMENT_PROCEED":
      return "yellow";
    case "PAYMENT_SUCCESS":
      return "orange";
    case "DELIVERY_READY":
      return "orange";
    case "DELIVERY_PROCEED":
      return "orange";
    case "DELIVERY_SUCCESS":
      return "blue";
    case "ORDER_CANCEL":
      return "red";
    case "PROGRESS_FINISHIED":
      return "green";
    default:
      return "";
  }
};

//convert date to string as formatted
export const convertDateToString = (date: Date) => {
  const format = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  return format;
};
