import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
export const CartContext = createContext<any>(null);
export const CartProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const session = useSession();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (session.data) {
      setCount((session.data?.cartCount as number) ?? 0);
    }
  }, [session]);
  const action = useMemo(
    () => ({
      setCount,
      increase: () => setCount((prev) => prev + 1),
      decrease: () => setCount((prev) => prev - 1),
    }),
    []
  );
  const value = useMemo(() => [count, action], [count, action]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
export const useCartCounter = () => {
  const value = useContext(CartContext);
  return value;
};
