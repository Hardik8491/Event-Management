import { store } from "@/redux-toolkit/store";
import React, { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
interface ProviderProps {
    children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
    return <ReduxProvider store={store}>{children}</ReduxProvider>;
};
    