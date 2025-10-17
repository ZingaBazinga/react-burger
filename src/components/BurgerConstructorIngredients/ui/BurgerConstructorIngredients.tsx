import { useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { useDispatch } from "react-redux";
import { IIngredient } from "../../../entities/ingredient";
import {
  deleteBurgerConstructor,
  moveBurgerConstructor,
} from "../../../services/burgerConstructorSlice";
import { decrementBurgerIngredients } from "../../../services/burgerIngredientsSlice";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructorIngredients.module.css";

type BurgerConstructorIngredientsProps = {
  ingredient: { ingredient: IIngredient; index: number };
  constructorItems: IIngredient[];
};

export function BurgerConstructorIngredients({
  ingredient,
  constructorItems,
}: BurgerConstructorIngredientsProps) {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "constructorItem",
    collect: (monitor) => ({ isHover: monitor.isOver() }),
    drop: (
      item: { ingredient: IIngredient; index: number },
      monitor: DropTargetMonitor<
        { ingredient: IIngredient; index: number },
        void
      >,
    ) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = ingredient.index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(
        moveBurgerConstructor({
          dragIndex: item.index,
          hoverIndex: ingredient.index,
        }),
      );
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: "constructorItem",
    item: { ingredient: ingredient.ingredient, index: ingredient.index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const combinedRef = (node: HTMLDivElement | null) => {
    ref.current = node;
    drag(drop(ref));
  };

  return (
    <div
      ref={combinedRef}
      key={`${ingredient.ingredient._id}-${ingredient.index}`}
      className={`${styles.burger_constructor_item}`}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={ingredient.ingredient.name}
        price={ingredient.ingredient.price}
        thumbnail={ingredient.ingredient.image_mobile}
        key={ingredient.ingredient._id}
        handleClose={() => {
          const oldItem = constructorItems.find(
            (item) => item._id === ingredient.ingredient._id,
          );
          dispatch(
            deleteBurgerConstructor({ ...ingredient, index: ingredient.index }),
          );
          dispatch(decrementBurgerIngredients(oldItem));
        }}
      />
    </div>
  );
}
