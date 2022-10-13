export type LocalStorageType = "carts" | "newCarts";
export type OutputType = {
  status: "success" | "error";
  message: string;
};
export const setLocalStorage = <T>(
  id: LocalStorageType,
  value: T
): OutputType => {
  if (id === "carts") {
    const currentCarts = localStorage.getItem("carts");
    if (currentCarts) {
      const parsedCurrentCarts: T[] = JSON.parse(currentCarts);
      const newCarts = [...parsedCurrentCarts, value];
      localStorage.setItem("carts", JSON.stringify(newCarts));
      return {
        status: "success",
        message: "Product added in cart",
      };
    } else {
      const newCarts = [value];
      localStorage.setItem("carts", JSON.stringify(newCarts));
      return {
        status: "success",
        message: "Product added in cart",
      };
    }
  } else if (id === "newCarts") {
    localStorage.setItem("carts", JSON.stringify(value));
  }
  return {
    status: "error",
    message: "System error is occured",
  };
};
