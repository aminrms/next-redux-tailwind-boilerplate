"use client";
import useActionAlert from "@/hooks/useActionAlert";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setSeeWelcomeAlert } from "@/redux/slicers/setting";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

const HomeParent = () => {
  const router = useRouter();
  const { fire } = useActionAlert();
  const dispatch = useAppDispatch();
  const {
    setting: { isSeeWelcomeAlert },
  } = useAppSelector((state) => state.settingSlice);
  const [{ login_time }] = useCookies(["login_time"]);
  // handle show welcome dialog at first log in
  useEffect(() => {
    if (login_time) {
      if (isSeeWelcomeAlert) {
        fire({
          title: "خوش آمدید!",
          onCloseAction: () => {
            dispatch(setSeeWelcomeAlert(false));
          },
          type: "success",
        });
      }
    }
  }, [isSeeWelcomeAlert, login_time]);
  return <></>;
};

export default HomeParent;
