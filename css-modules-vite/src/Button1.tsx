import styles from "./Button1.module.css";

// eslint-disable-next-line react-refresh/only-export-components
export default function () {
  return (
    <div className={styles["btn-wrapper"]}>
      <button className={styles.btn}>button1</button>
    </div>
  );
}
