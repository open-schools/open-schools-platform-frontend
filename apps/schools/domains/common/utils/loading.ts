import { message } from 'antd'

export const withLoadingMessage = async (LoadingMsg: string, mutation: any, ...args: any[]) => {
    const hide = message.loading(LoadingMsg, 0)
    try {
        return await mutation(...args)
    } finally {
        hide()
    }
}