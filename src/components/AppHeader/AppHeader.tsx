import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from './AppHeader.module.css'
import AppHeaderButton from "./AppHeaderButton";

export enum ESelectedTab {
  constructor,
  orderFeed,
  personalAccount
}

class AppHeader extends React.Component {
  state = {
    selected: ESelectedTab.constructor
  }

  selectTab = (newSelect: ESelectedTab) => {
    this.setState({selected: newSelect})
  }

  render() {
    return (
      <header className={`pt-4 pb-4 ${headerStyles.header}`}>
        <div className={headerStyles.header_content}>
          <div className={headerStyles.header_left}>
            <AppHeaderButton type={ESelectedTab.constructor} isActive={this.state.selected === ESelectedTab.constructor} setIsActive={this.selectTab}/>
            <AppHeaderButton type={ESelectedTab.orderFeed} isActive={this.state.selected === ESelectedTab.orderFeed} setIsActive={this.selectTab}/>
          </div>
          <Logo />
          <AppHeaderButton type={ESelectedTab.personalAccount} isActive={this.state.selected === ESelectedTab.personalAccount} setIsActive={this.selectTab}/>
        </div>
      </header>
    );
  }
}

export default AppHeader;
