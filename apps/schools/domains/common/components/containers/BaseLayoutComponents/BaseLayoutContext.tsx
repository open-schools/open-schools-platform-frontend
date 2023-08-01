import React, {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from 'react'

// import { ITopNotification, useTopNotificationsHook } from './TopNotifications'

interface ILayoutContext {
    isMobile?: boolean
    shouldTableScroll?: boolean
    isCollapsed?: boolean
    toggleCollapsed: () => void
    // addNotification?: (notification: ITopNotification) => void,
}

const isMobileUserAgent = (): boolean => {
    return (
        typeof window !== 'undefined' &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            window.navigator.userAgent
        )
    )
}

const LayoutContext = createContext<ILayoutContext>({
    toggleCollapsed(): void {},
})

export const useLayoutContext = (): ILayoutContext =>
    useContext<ILayoutContext>(LayoutContext)

export const LayoutContextProvider: React.FC = (props: PropsWithChildren) => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const toggleCollapsed = () => {
        localStorage &&
            localStorage.setItem('isCollapsed', String(!isCollapsed))
        setIsCollapsed(!isCollapsed)
    }

    useEffect(() => {
        const isCollapsed = localStorage.getItem('isCollapsed') === 'true'

        setIsCollapsed(isCollapsed)
    }, [])

    return (
        <LayoutContext.Provider
            value={{
                isMobile: isMobileUserAgent(),
                isCollapsed,
                toggleCollapsed,
            }}
        >
            {/*<TopNotificationComponent/>*/}
            {props.children}
        </LayoutContext.Provider>
    )
}
