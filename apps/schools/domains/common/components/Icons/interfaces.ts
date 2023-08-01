import { CSSProperties, MouseEventHandler, SVGProps } from 'react'

export type IconSize = 'large' | 'medium' | 'small' | 'auto'

export type IconTypes = {
    size?: IconSize,
    color?: CSSProperties['color'],
    svgProps?: Pick<SVGProps<SVGSVGElement>, 'onClick'>,
    className?: string,
    id?: string,
    onClick?: MouseEventHandler<HTMLSpanElement>,
}

export type IconWrapperProps = Omit<IconTypes, 'svgProps'> & {
    icon: React.ReactNode
}
