import React from "react";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from './AppHeaderButton.module.css'
import { AppHeaderButtonProps } from "../model/types";
import { ESelectedTab } from "../../AppHeader";



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
    const chooseText = () => {
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
      <nav className={`${headerStyles.header_button}`} onClick={() => {this.props.setIsActive(this.props.type)}}>
        <Icon/>
        <span className={`text text_type_main-default ${!this.props.isActive && "text_color_inactive"}`}>{chooseText()}</span>
      </nav>
    );
  }
}

export default AppHeaderButton;
