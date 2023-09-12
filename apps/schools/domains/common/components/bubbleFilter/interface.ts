export interface BubbleFilterListItem {
    key: string
    text: string
    count?: number | boolean
    color: string
    isSelected?: boolean
    onClick?: () => void;
    onExit?: () => void;
}

export interface BubbleFilterProps {
    items: BubbleFilterListItem[]
    text?: string
}