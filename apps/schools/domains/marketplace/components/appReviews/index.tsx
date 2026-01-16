import React from 'react'
import { Typography, Rate } from 'antd'
import { format } from 'date-fns'
import { Review } from '../../redux/interfaces'
import styles from '../appDetail/styles/styles.module.scss'

const { Title, Text, Paragraph } = Typography

interface AppReviewsProps {
    reviews: Review[]
}

export const AppReviews: React.FC<AppReviewsProps> = ({ reviews }) => {
    if (reviews.length === 0) {
        return null
    }

    return (
        <div className={styles.reviewsSection}>
            <Title level={3} className={styles.sectionTitle}>
                Отзывы ({reviews.length})
            </Title>
            {reviews.map((review: Review) => (
                <div key={review.id} className={styles.reviewItem}>
                    <div className={styles.reviewHeader}>
                        <Text className={styles.reviewUser}>Пользователь</Text>
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
    )
}

