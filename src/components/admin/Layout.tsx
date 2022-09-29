import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import Header from "./Header";
import Sidemenu from "./Sidemenu";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <Sidemenu />
      <div className="pt-16 pl-60 min-h-screen">{children}</div>
    </div>
  );
};

export default Layout;
