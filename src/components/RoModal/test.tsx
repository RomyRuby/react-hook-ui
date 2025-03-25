import { useState } from "react";
import RoModal from ".";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={showModal}>Open Modal</button>
      <RoModal
        title="title xxx"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <>
          <p>content xxxxxxx ...</p>
          <p>content xxxxxxx ...</p>
        </>
      </RoModal>
    </>
  );
}
