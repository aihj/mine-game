import Backdrop from "./ingredients/Backdrop";
import Custom from "./ingredients/Custom";
import Success from "./ingredients/Success";
import { ModalType } from "@/types/modal";

interface modalProps {
  type: ModalType;
}

const Content = ({ type }: modalProps) => {
  if (type === "Success") {
    return (
      <>
        <Backdrop />
        <Success />
      </>
    );
  }



  if (type === "Custom") {
    return (
      <>
        <Backdrop />
        <Custom />
      </>
    );
  }

  return <></>;
};

export default Content;
