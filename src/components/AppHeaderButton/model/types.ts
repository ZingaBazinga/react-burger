import { ESelectedTab } from "../../../types/SelectedTab";

export interface AppHeaderButtonProps {
    type: ESelectedTab;
    isActive: boolean;
    setIsActive: (newSelect: ESelectedTab) => void;
    navigate: string;
}
