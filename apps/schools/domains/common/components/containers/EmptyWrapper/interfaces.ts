import { CSSProperties, PropsWithChildren } from 'react'

/**
 * Interface for props in EmptyWrapper component
 * @param style Inline styles
 * @param className ClassName for div container
 * @param data Table data
 * @param pageTitle Page title text
 * @param titleText Title text
 * @param descriptionText Description text
 * @param buttonText Button text
 */
export interface EmptyWrapperProps extends Omit<PropsWithChildren, 'type'> {
  style?: CSSProperties
  className?: string
  data?: any
  pageTitle?: string
  titleText?: string
  descriptionText?: string
  buttonText?: string
}
