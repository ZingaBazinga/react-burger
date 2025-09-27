import React from "react";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from './AppHeaderButton.module.css'
import { ESelectedTab } from "./AppHeader";

interface AppHeaderButtonProps {
  type: ESelectedTab,
  isActive: boolean,
  setIsActive: (newSelect: ESelectedTab) => void
}

class AppHeaderButton extends React.Component<AppHeaderButtonProps> {
  render() {
    const Icon = () => {
      switch(this.props.type){
        case ESelectedTab.constructor: {
          return <BurgerIcon type={this.props.isActive ? "primary" : "secondary"} />
        }
        case ESelectedTab.orderFeed: {
          return <ListIcon type={this.props.isActive ? "primary" : "secondary"} />
        }
        case ESelectedTab.personalAccount: {
          return <ProfileIcon type={this.props.isActive ? "primary" : "secondary"} />
        }
      }
    }
    const Text = () => {
      switch(this.props.type){
        case ESelectedTab.constructor: {
          return "Конструктор"
        }
        case ESelectedTab.orderFeed: {
          return "Лента заказов"
        }
        case ESelectedTab.personalAccount: {
          return "Личный кабинет"
        }
      }
    }
    return (
      <div className={`pl-5 pt-4 pr-5 pb-4 ${headerStyles.header_button}`} onClick={() => {this.props.setIsActive(this.props.type)}}>
        <Icon/>
        <span className={`text text_type_main-default ${!this.props.isActive && "text_color_inactive"}`}>{Text()}</span>
      </div>
    );
  }
}

export default AppHeaderButton;
