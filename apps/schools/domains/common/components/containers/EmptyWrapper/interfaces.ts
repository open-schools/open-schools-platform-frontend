import { CSSProperties, PropsWithChildren } from 'react'

export interface EmptyWrapperProps extends Omit<PropsWithChildren, 'type'> {
    style?: CSSProperties
    className?: string
    data?: any
    handleRunTask?: () => void
    isLoading: boolean
    pageTitle?: string
    titleText?: string
    descriptionText?: string
    buttonText?: string
    searchTrigger: string | boolean
}
