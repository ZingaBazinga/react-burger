import { ESelectedTab } from "../../../types/SelectedTab";

export interface AppHeaderButtonProps {
    type: ESelectedTab;
    isActive: boolean;
    onClick: () => void;
}
