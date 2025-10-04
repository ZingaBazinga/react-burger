import { ESelectedTab } from "../../AppHeader";

export interface AppHeaderButtonProps {
    type: ESelectedTab;
    isActive: boolean;
    setIsActive: (newSelect: ESelectedTab) => void;
}
