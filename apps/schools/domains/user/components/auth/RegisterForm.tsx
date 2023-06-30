import React, {useState} from 'react'
import { Form, Select } from 'antd'
import { Button } from '../../../common/components'
import { useFetchAllCirclesQuery } from '../../../../http/api/rtk query/circles'
import { errorHandler } from '../../bin/RegisterForm/errorHandler'

export const RegisterForm = () => {
    const [skip, setSkip] = useState(true)
    const [organization, setOrganization] = useState('')

    const { data, error, isLoading } = useFetchAllCirclesQuery({ organization: organization }, { skip: skip })

    errorHandler(error)

    return (
        <Form>
            <Button onClick={() => setOrganization('90')}/>
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
