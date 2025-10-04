import { useEffect } from "react";
import styles from "./ModalOverlay.module.css";

interface Props {
    onClose: () => void;
}

export function ModalOverlay({ onClose }: Props) {
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [onClose]);
    return <div className={styles.modal_overlay} onClick={onClose} />;
}
