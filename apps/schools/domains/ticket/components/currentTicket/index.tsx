import React, { ChangeEvent, useEffect, useState } from 'react'
import { getUuidFromUrl } from '@domains/common/utils/getUuidFromUrl'
import router from 'next/router'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import {
    CLOSED_FILTER_COLOR,
    IN_PROGRESS_FILTER_COLOR,
    SENT_FILTER_COLOR,
} from '@domains/ticket/components/ticketList/styles/styles'
import { format } from 'date-fns'
import { Checkbox, Spin, Typography } from 'antd'
import styles from './styles/styles.module.scss'
import { Select } from '@domains/common/components/select'
import Image from 'next/image'
import employee from '@public/icons/icon_employee.svg'
import family from '@public/icons/icon_family.svg'
import lock from '@public/icons/Lock.svg'
import ticketSoon from '@public/image/ticketSoon.png'
import TextArea from 'antd/lib/input/TextArea'
import { Button } from '@domains/common/components/button'
import classnames from 'classnames'
import { useGetTicketQuery } from '@domains/organization/redux/organizationApi'
import { handleQueryStatusChange } from '@domains/query/handlers/queryUpdate'
import { QueriesTypes } from '@domains/common/redux/interfaces'
import { useChangeStatusMutation } from '@domains/query/redux/queryApi'
import {
    useCreateCommentMutation,
    useGetTicketCommentsQuery,
    useSeenTicketCommentMutation,
} from '@domains/ticket/redux/ticketApi'
import { useUserProfile } from '@domains/user/providers/authProvider'
import { handleCreateComment } from '@domains/ticket/handlers/createComment'
import { useGetAllEmployeesQuery } from '@domains/employee/redux/employeeApi'

interface CommentProps {
    sender?: string
    is_sender: boolean
    familyName?: string
    created_at?: string
    is_internal_recipient?: boolean
    comment: string
}

const CommentBlock: React.FC<CommentProps> = ({
    is_sender,
    familyName,
    created_at,
    is_internal_recipient,
    comment,
    sender,
}) => {
    return (
        <div className={classnames(styles.commentBlock, is_internal_recipient && styles.privateComment)}>
            <Image className={styles.image} src={is_sender ? family : employee} alt={'Sender icon'} />
            <div className={styles.commentContainer}>
                <div className={styles.titleComment}>
                    <b>{is_sender ? `Семья ${familyName || 'не определена'}` : sender || 'Отправитель не определен'}</b>
                    <span>{created_at ? format(new Date(created_at), 'dd.MM.yyyy HH:mm') : 'Время не определено'}</span>
                    {is_internal_recipient && <Image src={lock} alt={'Lock icon'} />}
                    <span>{is_internal_recipient ? 'Внутренний комментарий' : null}</span>
                </div>
                <div className={styles.comment}>{comment}</div>
            </div>
        </div>
    )
}

const CurrentTicket = () => {
    const [text, setText] = useState<string>('')
    const [currentStatus, setCurrentStatus] = useState<string>('')
    const [pageTime, setPageTime] = useState(0)
    const [isInternal, setIsInternal] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [currentDependencies, setCurrentDependencies] = useState<string[]>([])

    const { organizationId } = useOrganization()
    const { user } = useUserProfile()
    const uuid = getUuidFromUrl()

    const [mutation] = useChangeStatusMutation()
    const [mutationTicket] = useSeenTicketCommentMutation()
    const [mutationCreateComment] = useCreateCommentMutation()

    const { data: ticketData, isLoading: isTicketLoading } = useGetTicketQuery({
        organization_id: organizationId,
        ticket_id: uuid[0],
    })

    const { data: ticketComments, isLoading: isCommentsLoading } = useGetTicketCommentsQuery({
        ticket_id: uuid[0],
    })

    const { data, isLoading } = useGetAllEmployeesQuery({
        organization: organizationId,
        employee_profile: user.employee_profile?.id,
    })

    const SendComment = () => {
        setIsButtonDisabled(true)
        handleCreateComment(uuid[0], mutationCreateComment, text, data?.results[0].id, isInternal).then((success) => {
            if (success) {
                setIsInternal(false)
                setText('')
                handleChange
            }
            setIsButtonDisabled(false)
        })
    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target
        setText(value)
    }

    const calculateHeight = (text: string): string => {
        const lineCount = text.split('\n').length
        const charCount = text.length - text.split('\n').length
        const extraHeight = Math.floor(charCount / 67) * 22.5

        return `${lineCount * 22.5 + extraHeight}px`
    }

    const statusTranslations: { [key: string]: { translate: string; color: string } } = {
        SENT: {
            translate: 'Новое',
            color: SENT_FILTER_COLOR,
        },
        IN_PROGRESS: {
            translate: 'Открыто',
            color: IN_PROGRESS_FILTER_COLOR,
        },
        CLOSED: {
            translate: 'Закрыто',
            color: CLOSED_FILTER_COLOR,
        },
    }

    const translateStatus = (status: string) => {
        return statusTranslations[status]?.translate || status
    }

    const decorateStatus = (status: string) => {
        return statusTranslations[status]?.color || '#fff'
    }

    const graph: { [key: string]: string[] } = {
        Новое: ['Новое', 'Открыто', 'Закрыто'],
        Открыто: ['Открыто', 'Закрыто'],
        Закрыто: ['Закрыто'],
    }

    const handleStatusChange = (value: string) => {
        let translatedStatus = value
        for (const key in statusTranslations) {
            if (statusTranslations[key].translate === value) {
                translatedStatus = key
                break
            }
        }
        handleQueryStatusChange(mutation, uuid[0], translatedStatus as QueriesTypes).then((changeStatus) => {
            if (changeStatus) {
                setCurrentStatus(value)
                setCurrentDependencies(graph[value] || [])
            }
        })
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setPageTime((prevTime) => prevTime + 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (pageTime === 2 && ticketComments) {
            const unseenComments = ticketComments.results.filter((comment) => !comment.is_seen && comment.is_sender)
            unseenComments.forEach((comment) => {
                mutationTicket({
                    ticket_comment_id: comment.id,
                    is_seen: true,
                })
            })
        }
    }, [pageTime, ticketComments])

    if (uuid.length === 0) router.push(RoutePath[AppRoutes.NOT_FOUND])

    if (isTicketLoading || isCommentsLoading) return <Spin></Spin>

    return (
        <div className={styles.mainBlock}>
            <div className={styles.leftBlock}>
                <Typography.Title className={styles.ticketName} level={1}>
                    Обращение от семьи {ticketData?.ticket?.sender?.name || 'не определено'}
                </Typography.Title>
                <Typography.Title level={5} className={styles.createDate}>
                    Создано:{' '}
                    {ticketData?.ticket?.created_at
                        ? format(new Date(ticketData?.ticket?.created_at), 'dd.MM.yyyy HH:mm')
                        : 'Время не определено'}
                </Typography.Title>
                <div className={styles.commentsBlock}>
                    <div className={styles.newCommentBlock}>
                        <Image className={styles.image} src={employee} alt={'Employee icon'} />
                        <div className={styles.sendMessageBlock}>
                            <TextArea
                                className={styles.textArea}
                                style={{ height: calculateHeight(text) }}
                                value={text}
                                onChange={handleChange}
                                placeholder={'Добавить сообщение...'}
                            ></TextArea>
                            <div className={styles.utilityBlock}>
                                <Checkbox
                                    checked={isInternal}
                                    onChange={() => setIsInternal((prevState) => !prevState)}
                                >
                                    Внутренний комментарий
                                </Checkbox>
                                <Button onClick={SendComment} disabled={isButtonDisabled}>
                                    Отправить
                                </Button>
                            </div>
                        </div>
                    </div>
                    {ticketComments && (
                        <div className={styles.commentsContainer}>
                            {ticketComments.results.map((comment, index) => (
                                <CommentBlock
                                    key={index}
                                    sender={comment?.sender?.name}
                                    is_sender={comment.is_sender}
                                    familyName={ticketData?.ticket?.sender?.name}
                                    created_at={comment.created_at}
                                    is_internal_recipient={comment.is_internal_recipient}
                                    comment={comment.value}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.rightBlock}>
                <div className={styles.selectContainer}>
                    <Select
                        customType={'selectDefault'}
                        value={currentStatus ? currentStatus : translateStatus(ticketData?.ticket?.status || '')}
                        placeholder='Статус отсутсвует'
                        className={styles.select}
                        options={
                            currentDependencies.length !== 0
                                ? currentDependencies.map((status) => ({
                                      value: status,
                                      label: status,
                                  }))
                                : (graph[translateStatus(ticketData?.ticket?.status || '')]
                                      ? graph[translateStatus(ticketData?.ticket?.status || '')]
                                      : []
                                  ).map((status) => ({
                                      value: status,
                                      label: status,
                                  }))
                        }
                        onChange={(value) => handleStatusChange(value)}
                    />
                </div>
                <Image className={styles.image} src={ticketSoon} alt={'Ticket coming soon'} />
            </div>
        </div>
    )
}

export default CurrentTicket
