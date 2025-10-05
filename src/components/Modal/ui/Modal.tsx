import ReactDOM from "react-dom";
import { ReactNode } from "react";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../../ModalOverlay";

interface ModalProps {
    children: ReactNode;
    header?: string;
    onClose: () => void;
}

export function Modal({ children, header, onClose }: ModalProps) {
    const modalRoot = document.getElementById("react-modals");
    if (!modalRoot) {
        return null;
    }
    return ReactDOM.createPortal(
        <>
            <div className={styles.modal}>
                <div
                    className={styles.header}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <span className={`text text_type_main-large`}>{header}</span>
                    <CloseIcon
                        type="primary"
                        onClick={() => {
                            onClose();
                        }}
                        className={styles.icon}
                    />
                </div>
                {children}
            </div>
            <ModalOverlay onClose={() => onClose()} />
        </>,
        modalRoot,
    );
}
