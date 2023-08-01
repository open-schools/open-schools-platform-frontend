import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'
import { useGetAllOrganizationsQuery } from '../../organization/redux/organizationApi'
import { OrganizationInfo } from '../../organization/interfaces/OrganizationProvider'
export const UUID_REGEXP =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export const OrganizationContext = createContext<{
    organization: OrganizationInfo
    organizationId: string
    setOrganizationId: React.Dispatch<React.SetStateAction<string>>
}>({
    organization: {},
    organizationId: '',
    setOrganizationId: () => null,
})

export const useOrganization = () => useContext(OrganizationContext)

interface OrganizationProviderProps {
    children: React.ReactNode
}

export const OrganizationProvider: React.FC<OrganizationProviderProps> = ({
    children,
}) => {
    const router = useRouter()
    const cookies = new Cookies()

    const [organizationId, setOrganizationId] = useState('')
    const [organization, setOrganization] = useState({})
    const { data } = useGetAllOrganizationsQuery({})

    useEffect(() => {
        const organizationId =
            typeof window !== 'undefined' ? cookies.get('organizationId') : null

        if (organizationId) {
            setOrganizationId(organizationId)
        }
    }, [])

    useEffect(() => {
        const organization = data?.results.filter(
            (x) => x.id === organizationId
        )[0]
        console.log('organizationId UseEffect', organization)
        if (UUID_REGEXP.test(organizationId) && organization) {
            setOrganization({
                id: organization.id,
                name: organization.name,
                inn: organization.inn,
            })
            cookies.set('organizationId', organizationId)
        } else {
            cookies.remove('organizationId')
        }
    }, [organizationId, data])

    useEffect(() => {
        console.log('data useEffect')
        if (data !== undefined && data.count === 0) {
            if (
                !router.asPath.endsWith('/user') &&
                !router.asPath.includes('/auth/')
            )
                router.push('/user')
        } else {
            const firstOrganization = data?.results[0]
            if (
                organizationId === '' &&
                firstOrganization &&
                firstOrganization.id
            ) {
                setOrganizationId(firstOrganization.id)
            }
        }
    }, [data])

    return (
        <OrganizationContext.Provider
            value={{ organization, organizationId, setOrganizationId }}
        >
            {children}
        </OrganizationContext.Provider>
    )
}
