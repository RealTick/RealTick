import React from 'react';
import styles from './component_css/NewsModule.module.css';

const NewsItem = ({ article }) => {
<<<<<<< Updated upstream
  return (
    <a href={article.link} target="_blank" rel="noreferrer" className={styles.newsItem}>
      <img src={article.thumbnail?.resolutions?.[1]?.url} alt={article.title} className={styles.newsImage} />
      <span className={styles.newsLink}>{article.title}</span>
      <p className={styles.newsPublisher}>Publisher: {article.publisher}</p>
=======
  const getHoursSincePublished = (timestamp) => {
    const publishedDate = new Date(Number(timestamp) * 1000);
    const currentDate = new Date();

    // Get the difference in milliseconds
    const difference = currentDate - publishedDate;
    // Convert to hours (1 hour = 3600 * 1000 milliseconds)
    const hoursDifference = Math.floor(difference / (3600 * 1000));

    if (hoursDifference < 1) {
      return "Just now";
    } else if (hoursDifference === 1) {
      return "1 hour ago";
    } else {
      return `${hoursDifference} hours ago`;
    }
  };

  return (
    <a href={article.link} target="_blank" rel="noreferrer" className={styles.newsItem}>
      <img src={article.thumbnail?.resolutions?.[1]?.url} alt={article.title} className={styles.newsImage} />
      <div className={styles.newsItemInner}>
        <div className={styles.publisherInfo}>
          <p className={styles.newsPublisher}>{article.publisher}</p>
          <p className={styles.newsTime}>• {getHoursSincePublished(article.providerPublishTime)}</p>
        </div>
        <span className={styles.newsLink}>{article.title}</span>
      </div>
>>>>>>> Stashed changes
    </a>
  );
  
  
};

const NewsModule = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className={styles.newsContainer}>
      {data.map((article) => (
        <NewsItem key={article.uuid} article={article} />
      ))}
    </div>
  );
};

export default NewsModule;
