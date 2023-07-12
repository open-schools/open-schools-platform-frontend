import { PropsWithChildren } from 'react'

export interface FormContainerProps extends Omit<PropsWithChildren, 'type'> {
    width?: number
}
