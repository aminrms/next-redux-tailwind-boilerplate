"use client";
import PageLoading from "@/app/loading";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {} from "@/styles/globalCssProps";
import themeGenerator from "@/styles/theme";
import { handleShowItemBasedOnRoute } from "@/utils/helper";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";
import { useCookies } from "react-cookie";
import Sidebar from "./Sidebar";
import AlertActions from "./components/AlertActions";
import HotToast from "./components/HotToast";
const ParentLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    setting: { themeMode },
  } = useAppSelector((state) => state.settingSlice);
  const dispatch = useAppDispatch();
  const [{ auth_token }] = useCookies(["auth_token"]);

  const showSideBar = handleShowItemBasedOnRoute(
    pathname,
    ["/registration"],
    false
  );

  return (
    <>
      <HotToast />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <AlertActions />
        <main>
          {showSideBar && <Sidebar />}
          <motion.section
            key={pathname}
            style={{
              width: showSideBar ? "80%" : "100%",
            }}
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <Suspense fallback={<PageLoading />}>{children}</Suspense>
          </motion.section>
        </main>
      </AnimatePresence>
    </>
  );
};

export default ParentLayout;
