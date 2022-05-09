//component showing image uploder

import React, { useState, useEffect } from "react";

import styles from "./imageUploader.module.scss";
import DragDropArea from "../DragDropArea/DragDropArea";
import toastMessage from "../../constants/toastify";

function ImageUploader({ error, onChange }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isValid, setIsValid] = useState(error);

  const handleClearUpload = () => {
    let img = document.getElementById("productImage");
    img.src = "";
    setSelectedFile(null);
    onChange(null);
  };

  useEffect(() => {
    const reader = new FileReader();
    let img = document.getElementById("productImage");
    reader.addEventListener(
      "load",
      function () {
        img.src = reader.result;
      },
      false
    );
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (selectedFile !== null) {
      const defaultSize = 409600;
      const fileSize = selectedFile.size;
      if (
        fileSize >= defaultSize ||
        !allowedTypes.includes(selectedFile.type)
      ) {
        toastMessage("error", "PNG veya JPEG Dosya boyutu: max. 400kb");
        setSelectedFile(null);
        setIsValid(false);
      } else {
        reader.readAsDataURL(selectedFile);
        setIsValid(true);
        onChange(selectedFile);
      }
    }
    return () => {
      reader.removeEventListener(
        "load",
        function () {
          img.src = reader.result;
        },
        false
      );
    };
  }, [selectedFile]);

  return (
    <div
      className={`${styles.upload} ${
        !selectedFile && error
          ? styles.notValid
          : selectedFile && !error
          ? styles.uploadActive
          : ""
      }`}
    >
      {selectedFile && (
        <div className={styles.imageContent}>
          <span
            className={styles.deleteButton}
            onClick={handleClearUpload}
            role="none"
          >
            X
          </span>
          <img
            id="productImage"
            src={""}
            alt="previewImage"
            className={styles.image}
          />
        </div>
      )}
      {!selectedFile && (
        <div className={styles.uploadContent}>
          <DragDropArea fileDrop={setSelectedFile} />
          <img src="imageUpload.png" alt="upload-ico" />

          <p className={styles.uploadText}>
            Sürükleyip bırakarak yükle <br /> veya
          </p>

          <button className={styles.uploadButton} type="button">
            Görsel Seçin
            <input
              type="file"
              name="image"
              id="image"
              multiple={false}
              onChange={(e) => setSelectedFile(e.target.files[0])}
              accept="image/png, image/jpeg, image/jpg"
            />
          </button>
          <p
            className={`${styles.uploadInfoText} ${
              isValid ? styles.warning : ""
            }`}
          >
            PNG veya JPEG Dosya boyutu: max. 400kb
          </p>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
