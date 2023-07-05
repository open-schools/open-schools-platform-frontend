import React, { useState } from 'react'
import { Form, Select } from 'antd'
import { Button } from '../../../common/components'
import { useCirclesQuery } from '../../redux/circlesApi'
import { errorHandler } from '../../../common/handlers/errorHandlers/errorHandler'

export const CirclesMain = () => {
    const [skip, setSkip] = useState(true)
    const [organization, setOrganization] = useState('')

    const { data, error } = useCirclesQuery({ organization: organization }, { skip: skip })
    errorHandler(error, data)

    return (
        <Form>
            <Button style={{ marginTop: '200px' }} onClick={() => setOrganization('90')}/>
            <Button onClick={() => setSkip(prevState => !prevState)}/>
            <Select
                style={{ width: '1000px' }}
                placeholder="Название кружка"
                size='large'
                options={data ? data?.results.map((circle) => ({ label: circle.name, value: circle.id })) : []}
            />
        </Form>
    )
}
