import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleShowActionsAlert } from "@/redux/slicers/setting";
import { Danger, TickCircle, Warning2 } from "iconsax-react";
import { ReactNode } from "react";
import Modal from "../../templates/components/Modal";
// actions alert type that can get these three types
type actionsAlertType = "success" | "warning" | "error";
const AlertActions = () => {
  const dispatch = useAppDispatch();
  const { options, open } = useAppSelector(
    (state) => state.settingSlice.actionsAlert
  );
  // alert design types
  const alertTypes: Record<
    actionsAlertType,
    {
      header: () => ReactNode;
      content: () => ReactNode;
      actions: () => ReactNode;
    }
  > = {
    warning: {
      header: () => {
        return <Warning2 size={50} />;
      },
      content: () => {
        return <Warning2 size={50} />;
      },
      actions: () => {
        return <Warning2 size={50} />;
      },
    },
    success: {
      header: () => {
        return <TickCircle size={80} />;
      },
      content: () => {
        return <TickCircle size={80} />;
      },
      actions: () => {
        return <TickCircle size={80} />;
      },
    },
    error: {
      header: () => {
        return <Danger size={50} />;
      },
      content: () => {
        return <Danger size={50} />;
      },
      actions: () => {
        return <Danger size={50} />;
      },
    },
  };
  // render each part of alert modal type
  const renderType = alertTypes[options.type as actionsAlertType];
  return (
    <Modal
      open={open}
      transition="grow"
      closeAction={() => {
        dispatch(handleShowActionsAlert(false));
        if (options?.onCloseAction) options?.onCloseAction();
      }}
      maxWidth="sm"
      title={options.title}
      backdrop="transparent"
      renderHeader={renderType["header"]}
      renderActions={renderType["actions"]}
      renderContent={renderType["content"]}
    />
  );
};

export default AlertActions;
