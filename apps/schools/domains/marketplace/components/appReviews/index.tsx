import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { Typography, Rate, Form, Input, Button, message, Modal, Spin } from 'antd'
import { format } from 'date-fns'
import { Review } from '../../redux/interfaces'
import { useCreateReviewMutation, useGetAppReviewsQuery } from '../../redux/marketplaceApi'
import { useUserProfile } from '@domains/user/providers/authProvider'
import styles from '../appDetail/styles/styles.module.scss'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

interface AppReviewsProps {
    reviews: Review[]
    appId: string
    totalCount?: number
}

export const AppReviews: React.FC<AppReviewsProps> = ({ reviews, appId, totalCount }) => {
    const { user } = useUserProfile()
    const [form] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [offset, setOffset] = useState(0)
    const [loadedReviews, setLoadedReviews] = useState<Review[]>(reviews.slice(0, 3))
    const modalContentRef = useRef<HTMLDivElement>(null)
    const [createReview, { isLoading: isCreating }] = useCreateReviewMutation()

    const limit = 10

    const { data: reviewsData, isLoading: isLoadingMore, isFetching } = useGetAppReviewsQuery(
        { app_id: appId, limit, offset },
        { skip: !isModalOpen || offset < 3 }
    )

    useEffect(() => {
        if (reviewsData?.results && isModalOpen) {
            setLoadedReviews((prev) => {
                const existingIds = new Set(prev.map((r) => r.id))
                const newReviews = reviewsData.results.filter((r) => !existingIds.has(r.id))
                return [...prev, ...newReviews]
            })
        }
    }, [reviewsData, isModalOpen])

    const hasMoreReviews = useMemo(() => {
        const total = totalCount || reviews.length
        return loadedReviews.length < total
    }, [loadedReviews.length, totalCount, reviews.length])

    const handleOpenModal = () => {
        const initialReviews = [...reviews.slice(0, 3)]
        setLoadedReviews(initialReviews)
        setIsModalOpen(true)
        const total = totalCount || reviews.length
        if (total > 3) {
            setOffset(3)
        } else {
            setOffset(0)
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setOffset(0)
        setLoadedReviews(reviews.slice(0, 3))
    }

    const handleScroll = useCallback(() => {
        if (!modalContentRef.current || isLoadingMore || !hasMoreReviews) return

        const { scrollTop, scrollHeight, clientHeight } = modalContentRef.current
        if (scrollHeight - scrollTop <= clientHeight * 1.5) {
            setOffset((prev) => prev + limit)
        }
    }, [isLoadingMore, hasMoreReviews, limit])

    useEffect(() => {
        const element = modalContentRef.current
        if (element && isModalOpen) {
            element.addEventListener('scroll', handleScroll)
            return () => element.removeEventListener('scroll', handleScroll)
        }
    }, [handleScroll, isModalOpen])

    const { data: checkUserReviewData } = useGetAppReviewsQuery(
        { app_id: appId, limit: 100, offset: 0 },
        { skip: !user?.phone }
    )

    const userReview = useMemo(() => {
        if (!user?.phone || !checkUserReviewData?.results) return null
        return checkUserReviewData.results.find((review) => String(review.user) === String(user.phone)) || null
    }, [checkUserReviewData, user?.phone])

    const userHasReview = useMemo(() => {
        return !!userReview
    }, [userReview])

    const displayedReviews = useMemo(() => {
        const baseReviews = reviews.slice(0, 3)
        if (userReview) {
            return baseReviews.filter((review) => review.id !== userReview.id).slice(0, 3)
        }
        return baseReviews
    }, [reviews, userReview])

    const hasMoreButton = totalCount ? totalCount > 3 : reviews.length > 3

    const handleSubmit = async (values: { rating: number; message?: string }) => {
        try {
            await createReview({
                app_id: appId,
                rating: values.rating,
                message: values.message || undefined,
            }).unwrap()
            message.success('Отзыв успешно добавлен!')
            form.resetFields()
        } catch (err: any) {
            message.error(err?.data?.error?.message || 'Ошибка при создании отзыва')
        }
    }

    return (
        <div className={styles.reviewsSection}>
            {!userHasReview && user?.phone && (
                <div className={styles.reviewForm}>
                    <Title level={4}>Оставить отзыв</Title>
                    <Form form={form} onFinish={handleSubmit} layout="vertical">
                        <Form.Item
                            name="rating"
                            label="Оценка"
                            rules={[{ required: true, message: 'Пожалуйста, выберите оценку' }]}
                        >
                            <Rate />
                        </Form.Item>
                        <Form.Item name="message" label="Комментарий">
                            <TextArea rows={4} placeholder="Оставьте комментарий (необязательно)" maxLength={512} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={isCreating}>
                                Отправить отзыв
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}

            {userReview && (
                <div className={styles.userReviewCard}>
                    <div key={userReview.id} className={styles.reviewItem}>
                        <div className={styles.reviewHeader}>
                            <div className={styles.reviewUserInfo}>
                                <Text className={styles.reviewUser}>Мой отзыв</Text>
                            </div>
                            <Text className={styles.reviewDate}>
                                {format(new Date(userReview.created_at), 'dd MMMM yyyy')}
                            </Text>
                        </div>
                        <div className={styles.reviewRating}>
                            <Rate disabled value={userReview.rating} />
                        </div>
                        {userReview.message && <Paragraph className={styles.reviewMessage}>{userReview.message}</Paragraph>}
                    </div>
                </div>
            )}

            <Title level={3} className={styles.sectionTitle}>
                Отзывы ({totalCount || reviews.length})
            </Title>

            {displayedReviews.length > 0 && (
                <div className={styles.reviewsList}>
                    {displayedReviews.map((review: Review) => (
                        <div key={review.id} className={styles.reviewItem}>
                            <div className={styles.reviewHeader}>
                                <div className={styles.reviewUserInfo}>
                                    <Text className={styles.reviewUser}>
                                        {String(review.user) === String(user?.phone) ? 'Мой отзыв' : 'Пользователь'}
                                    </Text>
                                </div>
                                <Text className={styles.reviewDate}>
                                    {format(new Date(review.created_at), 'dd MMMM yyyy')}
                                </Text>
                            </div>
                            <div className={styles.reviewRating}>
                                <Rate disabled value={review.rating} />
                            </div>
                            {review.message && <Paragraph className={styles.reviewMessage}>{review.message}</Paragraph>}
                        </div>
                    ))}
                </div>
            )}

            {hasMoreButton && (
                <div className={styles.showMoreButton}>
                    <Button type="link" onClick={handleOpenModal}>
                        Посмотреть все
                    </Button>
                </div>
            )}

            <Modal
                title={`Все отзывы (${totalCount || reviews.length})`}
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
                width={800}
                className={styles.reviewsModal}
            >
                <div ref={modalContentRef} className={styles.modalContent}>
                    {loadedReviews.map((review: Review) => (
                        <div key={review.id} className={styles.reviewItem}>
                            <div className={styles.reviewHeader}>
                                <div className={styles.reviewUserInfo}>
                                    <Text className={styles.reviewUser}>
                                        {String(review.user) === String(user?.phone) ? 'Мой отзыв' : 'Пользователь'}
                                    </Text>
                                </div>
                                <Text className={styles.reviewDate}>
                                    {format(new Date(review.created_at), 'dd MMMM yyyy')}
                                </Text>
                            </div>
                            <div className={styles.reviewRating}>
                                <Rate disabled value={review.rating} />
                            </div>
                            {review.message && <Paragraph className={styles.reviewMessage}>{review.message}</Paragraph>}
                        </div>
                    ))}
                    {isLoadingMore && (
                        <div className={styles.loadingMore}>
                            <Spin />
                        </div>
                    )}
                    {!hasMoreReviews && loadedReviews.length > 0 && (
                        <div className={styles.noMoreReviews}>
                            <Text type="secondary">Все отзывы загружены</Text>
                        </div>
                    )}
                </div>
            </Modal>

            {displayedReviews.length === 0 && !user?.id && (
                <div className={styles.noReviews}>
                    <Text>Пока нет отзывов. Станьте первым, кто оставит отзыв!</Text>
                </div>
            )}
        </div>
    )
}

