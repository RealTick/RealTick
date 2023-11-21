import React from "react";
import styles from "./component_css/NewsModule.module.css";
import { IconNews } from "@tabler/icons-react";
const NewsItem = ({ article }) => {
  const getHoursSincePublished = (timestamp) => {
    const publishedDate = new Date(Number(timestamp) * 1000);
    const currentDate = new Date();
    const difference = currentDate - publishedDate;
    const hoursDifference = Math.floor(difference / (3600 * 1000));

    if (hoursDifference < 1) {
      return "Just now";
    } else if (hoursDifference === 1) {
      return "1 hour ago";
    } else if (~~(hoursDifference / 24 / 30) == 1) {
      return `${~~(hoursDifference / 24 / 30)} month ago`;
    } else if (~~(hoursDifference / 24 / 30) > 1) {
      return `${~~(hoursDifference / 24 / 30)} months ago`;
    } else if (hoursDifference >= 24) {
      return `${~~(hoursDifference / 24)} days ago`;
    } else {
      return `${hoursDifference} hours ago`;
    }
  };

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noreferrer"
      className={styles.newsItem}
    >
      {article.thumbnail?.resolutions?.[1]?.url ? (
        <img
          src={article.thumbnail.resolutions[1].url}
          alt="Article thumbnail"
          className={styles.newsImage}
        />
      ) : (
        <IconNews />
      )}
      <div className={styles.newsContent}>
        <div className={styles.newsMeta}>
          <span className={styles.newsPublisher}>{article.publisher}</span>
          <span>•</span>
          <span className={styles.newsTime}>
            {getHoursSincePublished(article.providerPublishTime)}
          </span>
        </div>
        <span className={styles.newsTitle}>{article.title}</span>
      </div>
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
