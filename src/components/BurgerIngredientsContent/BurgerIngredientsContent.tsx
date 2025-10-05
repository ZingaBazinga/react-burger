import { EIngredientType, IIngredient } from '../../entities/ingredient'
import { data } from '../../utils/data'
import BurgerIngredientCard from '../BurgerIngredientCard/BurgerIngredientCard'
import styles from './BurgerIngredientsContent.module.css'

export const BurgerIngredientsContent = ({type}: {type: EIngredientType}) => {

    function chooseType() {
        switch (type){
            case EIngredientType.bun: {
                return(["Булки", "bun"])
            }
            case EIngredientType.sauce: {
                return(["Соусы", "sauce"])
            }
            case EIngredientType.main: {
                return(["Начинки", "main"])
            }
        }
    }

    return (
        <div className={`${styles.ingredients_container}`}>
            <h2 className={`text text_type_main-medium`}>{chooseType()[0]}</h2>
            <div className={styles.cards}>
                {data.filter((ingredient: IIngredient) => ingredient.type === chooseType()[1])
                .map((ingredient: IIngredient) => (
                    <BurgerIngredientCard {...ingredient} key={ingredient._id}/>
                ))}
            </div>
        </div>
    );
}
