import { CSSProperties, PropsWithChildren } from 'react'

export interface IBaseLayoutProps extends Omit<PropsWithChildren, 'type'> {
    style?: CSSProperties
    className?: string
    onLogoClick?: () => void
}
