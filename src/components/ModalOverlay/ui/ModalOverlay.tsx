import styles from "./ModalOverlay.module.css";

interface Props {
    onClose: () => void;
}

export function ModalOverlay({ onClose }: Props) {
    return (
        <div
            className={styles.modal_overlay}
            onClick={(e) => {
                onClose();
                e.stopPropagation();
            }}
        />
    );
}
