// middleware/socketMiddleware.ts
import { Middleware } from "@reduxjs/toolkit";
import { Action } from "redux";
import { wsClose, wsError, wsMessage, wsOpen } from "./action-types";

// Вспомогательный тип для действий с payload
interface PayloadAction<P> extends Action {
    payload: P;
}

// Проверка, является ли значение действием с type
function isAction(action: unknown): action is Action {
    return typeof action === "object" && action !== null && "type" in action;
}

// Проверка, является ли действие PayloadAction
function isPayloadAction<P>(action: unknown, type: string): action is PayloadAction<P> {
    return isAction(action) && action.type === type && "payload" in action;
}

export const socketMiddleware = (wsActions: { connect: string; disconnect: string }): Middleware => {
    return (store) => {
        let socket: WebSocket | null = null;

        return (next) => (action: unknown) => {
            const { dispatch } = store;

            // Обрабатываем только объекты с type
            if (!isAction(action)) {
                return next(action);
            }

            const { type } = action;

            // Подключение
            if (type === wsActions.connect) {
                if (isPayloadAction<string>(action, wsActions.connect)) {
                    const url = action.payload;

                    if (socket) {
                        socket.close();
                    }

                    socket = new WebSocket(url);

                    socket.onopen = () => {
                        dispatch(wsOpen());
                    };

                    socket.onmessage = (event) => {
                        const data = JSON.parse(event.data);
                        dispatch(wsMessage(data));
                    };

                    socket.onclose = () => {
                        dispatch(wsClose());
                    };

                    socket.onerror = () => {
                        dispatch(wsError("Ошибка подключения"));
                    };
                }
            }

            // Отключение
            if (type === wsActions.disconnect) {
                if (socket) {
                    socket.close();
                    socket = null;
                }
            }

            return next(action);
        };
    };
};
