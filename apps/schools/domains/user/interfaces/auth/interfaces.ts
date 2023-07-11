import React from 'react'

export interface IAuthLayoutProps {
    headerAction: React.ReactElement,
    children: JSX.Element,
}

export interface IGoogleReCaptchaContainer {
    element: string | HTMLElement;
    parameters: {
        badge?: 'inline' | 'bottomleft' | 'bottomright';
        theme?: 'dark' | 'light';
        tabindex?: number;
        callback?: () => void;
        expiredCallback?: () => void;
        errorCallback?: () => void;
    }
}

export interface IGoogleReCaptchaScriptProps {
    nonce?: string;
    defer?: boolean;
    async?: boolean;
    appendTo?: 'head' | 'body';
    id?: string;
    onLoadCallbackName?: string;
}
