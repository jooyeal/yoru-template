import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import AdminLayout from "../components/admin/Layout";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  if (router.pathname === "/signup" || router.pathname === "/signin")
    return (
      <div>
        {children}
        <Footer />
      </div>
    );
  if (router.pathname.includes("admin"))
    return <AdminLayout>{children}</AdminLayout>;
  if (router.pathname === "/cart")
    return (
      <div>
        <Header />
        <div className="min-h-screen p-16">{children}</div>
        <Footer />
      </div>
    );
  if (router.pathname === "/")
    return (
      <div>
        <Header />
        <div>{children}</div>
        <Footer />
      </div>
    );
  return (
    <div>
      <Header />
      <div className="min-h-screen pt-16 bg-gray-50">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
