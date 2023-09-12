import React from "react";

export function isReactElement(element: any) {
    return React.isValidElement(element);
}