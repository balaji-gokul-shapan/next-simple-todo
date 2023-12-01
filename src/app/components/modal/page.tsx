import { Box, Modal } from '@mui/material';

interface ModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => boolean | void;
  children: React.ReactNode;
}
export const Modals: React.FC<ModalProps> = ({
  openModal,
  setOpenModal,
  children,
}) => {
  return (
    <>
      <Modal open={openModal}>
        <div className="modalPopup">
        {<span className="cursor-pointer absolute top-2 right-2 gap-10 font-extrabold text-xl text-indigo-700 hover:text-red-500" onClick={() => setOpenModal(false)}>&#10006;</span>}

          {/* <button className="absolute top-2 right-2 cursor-pointer bg-inherit font-bold" onClick={() => setOpenModal(false)}>✕</button> */}
          {children}
        </div>
      </Modal>
    </>
  );
};
