import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from './BurgerIngredientCard.module.css'
import { IIngredient } from "../../entities/ingredient";

class BurgerIngredientCard extends React.Component<IIngredient> {
  render() {
    return (
        <div key={this.props._id} className={styles.card}>
            <img className={styles.image} src={this.props.image} alt={this.props.name}/>
            <div className={styles.price}>
                <span className="text text_type_digits-default">{this.props.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className="text text_type_main-default">{this.props.name}</span>
            {this.props.__v !== 0 && <Counter count={this.props.__v} size="default" extraClass="m-1" />}
        </div>
    );
  }
}

export default BurgerIngredientCard;
