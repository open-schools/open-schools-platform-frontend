import React, {createContext, useContext, useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import {useGetAllOrganizationsQuery} from "../../organization/redux/organizationApi";
import {OrganizationInfo} from "../../organization/interfaces/OrganizationProvider";
export const UUID_REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export const OrganizationContext = createContext<{
    organization: OrganizationInfo,
    organizationId: string,
    setOrganizationId: React.Dispatch<React.SetStateAction<string>>,
}>({
    organization: {},
    organizationId: "",
    setOrganizationId: () => null
})

export const useOrganization = () => useContext(OrganizationContext)

interface OrganizationProviderProps {
    children: React.ReactNode;
}

export const ORGANIZATION_ID_STORAGE_NAME = 'organizationId';

export const OrganizationProvider: React.FC<OrganizationProviderProps> = ({ children }) => {
    const router = useRouter()

    const [organizationId, setOrganizationId] = useState("");
    const [organization, setOrganization] = useState({});
    const { data } = useGetAllOrganizationsQuery({})

    useEffect(() => {
        const organizationId = typeof window !== 'undefined'
            ? localStorage.getItem(ORGANIZATION_ID_STORAGE_NAME) : null

        if (organizationId) {
            setOrganizationId(organizationId)
        }
    }, [])

    useEffect(() => {
        const organization = data?.results.filter(x => x.id === organizationId)[0];
        if (UUID_REGEXP.test(organizationId) && organization) {
            setOrganization({
                id: organization.id,
                name: organization.name,
                inn: organization.inn,
            });
            localStorage.setItem(ORGANIZATION_ID_STORAGE_NAME, organizationId)
        }
        else{
            localStorage.removeItem(ORGANIZATION_ID_STORAGE_NAME)
        }
    }, [organizationId, data])

    useEffect(() => {
        if (data !== undefined && data.count === 0) {
            if (!router.asPath.endsWith('/user') && !router.asPath.includes('/auth/'))
                router.push('/user')
        }
        else{
            const firstOrganization = data?.results[0];
            if (organizationId === "" && firstOrganization && firstOrganization.id) {
                setOrganizationId(firstOrganization.id);
            }
        }
    }, [data])

    return (
        <OrganizationContext.Provider value={{organization, organizationId, setOrganizationId}}>
            {children}
        </OrganizationContext.Provider>
    )
}
