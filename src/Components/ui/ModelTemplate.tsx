import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ReactNode } from "react";
import { FaX } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

interface IProps {
  name: string;
  children: ReactNode;
  handleClick?: () => void;
}
const ModalTemplate = ({
  name,
  children,
  handleClick,
}: IProps) => {
  const isOpenTemp = useSelector((state: RootState) => state.app.isOpenTemp);
  
  return (
    <>
      <Transition appear show={isOpenTemp}>
        <Dialog
          as="div"
          className="relative  z-10 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 bg-black/50">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-white h-auto p-6 backdrop-blur-2xl">
                  <div className="flex items-center justify-between">
                    <DialogTitle
                      as="h1"
                      className="text-[20px] font-semibold text-blue-500 "
                    >
                      {name}
                    </DialogTitle>
                    <FaX
                      className="cursor-pointer"
                      onClick={handleClick}
                    />
                  </div>
                  {children}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default ModalTemplate;
