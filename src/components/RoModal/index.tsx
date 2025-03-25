import {
  Children,
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import "./index.scss";

interface ModalProps extends PropsWithChildren {
  title?: string;
  content?: ReactNode;
  open?: boolean;
  footer?: ReactNode;
  closable?: boolean;
  closeIcon?: ReactNode;
  mask?: boolean;
  maskClosable?: boolean;
  zIndex?: number;
  keyboard?: boolean;
  okButton?: ReactNode;
  cancelButton?: ReactNode;
  onCancel?: Function;
  onOk?: Function;
  wrapClassName?: string;
}

export default function RoModal(props: ModalProps) {
  const {
    open,
    content,
    mask = true,
    title = "title",
    children,
    cancelButton,
    okButton,
  } = props;

  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const el = useMemo(() => {
    const el = document.createElement("div");
    el.className = `ro-modal-wrapper`;
    document.body.appendChild(el);
    return el;
  }, []);

  const defaultCancelButton = <></>;
  const defaultOkButton = <></>;

  const handleClose = () => {
    setIsOpen(false);
  };

  const ModalRoot = (
    <>
      {isOpen && (
        <div className="ro-modal-root">
          {mask && <div className="ro-modal-mask"></div>}
          <div className="ro-modal-wrap">
            <div className="ro-modal-close" onClick={handleClose}>
              X
            </div>
            <div className="ro-modal-header">
              <div className="ro-modal-title">{title}</div>
            </div>
            <div className="ro-modal-body">{content || children}</div>
            <div className="ro-modal-footer">
              {cancelButton || defaultCancelButton}
              {okButton || defaultOkButton}
            </div>
          </div>
        </div>
      )}
    </>
  );
  return createPortal(ModalRoot, el);
}
