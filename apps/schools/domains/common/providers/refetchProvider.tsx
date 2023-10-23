import React, { createContext, useContext, useState } from 'react'
import { message } from 'antd'

export enum EventKey {
    RefetchProfileQuery = 'RefetchProfileQuery',
    RefetchAll = 'RefetchAll',
}

type EventHandler = (payload: any) => void

interface EventBus {
    on(key: EventKey, handler: EventHandler): () => void
    off(key: EventKey, handler: EventHandler): void
    emit(key: EventKey, ...payload: any[]): void
    once(key: EventKey, handler: EventHandler): void
}

export const EventBusContext = createContext<EventBus>({
    emit(key: EventKey, ...payload: any[]): void {},
    off(key: EventKey, handler: EventHandler): void {},
    on(key: EventKey, handler: EventHandler): () => void {
        return function () {}
    },
    once(key: EventKey, handler: EventHandler): void {},
})

interface RefetchProviderProps {
    children: React.ReactNode
}

export const useEventBus = () => useContext(EventBusContext)
export const RefetchProvider: React.FC<RefetchProviderProps> = ({ children }) => {
    const [bus, setBus] = useState<{ [key: string]: Array<EventHandler> }>({})

    const off: EventBus['off'] = (key, handler) => {
        const index = bus[key]?.indexOf(handler) ?? -1
        bus[key]?.splice(index >>> 0, 1)
    }
    const on: EventBus['on'] = (key, handler) => {
        if (bus[key] === undefined) {
            bus[key] = []
        }
        bus[key]?.push(handler)

        // unsubscribe function
        return () => {
            off(key, handler)
        }
    }

    const emit: EventBus['emit'] = (key, payload) => {
        bus[key]?.forEach((fn) => {
            try {
                fn(payload)
            } catch (e) {
                message.error('EventBus error performing function')
            }
        })
    }

    const once: EventBus['once'] = (key, handler) => {
        const handleOnce = (payload: Parameters<typeof handler>) => {
            handler(payload)
            off(key, handleOnce as typeof handler)
        }

        on(key, handleOnce as typeof handler)
    }

    return (
        <EventBusContext.Provider value={{ on: on, off: off, emit: emit, once: once }}>
            {children}
        </EventBusContext.Provider>
    )
}
