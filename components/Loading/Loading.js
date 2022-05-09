//component showing loading

import React from "react";

import styles from "./loading.module.scss";
import LoadingIcon from "../../constants/icons/LoadingIcon";

function Loading({size,color}) {
  return (
    <div className={styles.loading}>
        <LoadingIcon size={size} color={color} />
    </div>
  );
}

export default Loading;
