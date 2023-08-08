export type CountDownChildrenType = (
    // TODO(Dimitreee): remove any
    {
        countdown,
        runAction,
        loading,
    }: {
        countdown: number
        runAction: (...args: any[]) => Promise<any>
        loading: boolean
    },
) => JSX.Element

export interface ICountDownTimer {
    // TODO(Dimitreee): remove any
    action: (...args: any[]) => Promise<any>
    id: string
    timeout?: number
    children: CountDownChildrenType
    autostart?: boolean
}
