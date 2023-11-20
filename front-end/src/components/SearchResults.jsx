import styles from "./component_css/Search.module.css";

function SearchResults({
  results,
  selectedResult,
  onResultHover,
  onResultClick,
}) {
  return (
    <div className={styles.resultsContainer}>
      {results.map((result, index) => (
        <div
          key={result["1. symbol"]}
          onMouseMove={() => onResultHover(index)}
          onClick={() => onResultClick(result["1. symbol"])}
          className={`${styles.resultItem} ${
            index === selectedResult ? styles.selectedItem : ""
          }`}
        >
          {result["1. symbol"]} - {result["2. name"]}
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
