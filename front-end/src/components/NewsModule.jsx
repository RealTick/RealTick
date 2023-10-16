import React from 'react';
import styles from './component_css/NewsModule.module.css';

const NewsItem = ({ article }) => {
  return (
    <a href={article.link} target="_blank" rel="noreferrer" className={styles.newsItem}>
      <img src={article.thumbnail?.resolutions?.[1]?.url} alt={article.title} className={styles.newsImage} />
      <span className={styles.newsLink}>{article.title}</span>
      <p className={styles.newsPublisher}>Publisher: {article.publisher}</p>
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