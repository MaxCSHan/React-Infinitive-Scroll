//Import Library
import { useState } from "react";

//Import Interface
import IPhoto from "../../../interface/IPhoto";

//Import styles
import styles from "../../../asset/style/PhotoBlock.module.scss"; // Import css modules stylesheet as styles

interface PhotoBlockProps {
  data: IPhoto;
}

const PhotoBlock = ({ data }: PhotoBlockProps) => {
  const [isLoad, setIsLoad] = useState(false);

  return (
    <div className={styles.photoblock_container}>
      <a title="Link to photo" rel="noreferrer" target="_blank" href={data.url}>
        <div className={styles.photoblock_image_container}>
          <div className={styles.photoblock_image_mask}>
            <div className={styles.photoblock_image_mask_header}></div>
            <div className={styles.photoblock_image_mask_footer}>
              <div className={styles.photoblock_image_mask_author}>
                <div
                  className={styles.photoblock_image_mask_author_imgholder}
                ></div>
                {data.author}
              </div>
            </div>
          </div>
          <img
            onLoad={() => setIsLoad(true)}
            className={`${!isLoad && styles.photoblock_image_beforeload} ${styles.photoblock_image}`}
            alt=""
            src={data.download_url}
          />
        </div>
      </a>
      <div className={styles.photoblock_footer}>
        <div className={styles.photoblock_footer_author}>{data.author}</div>
      </div>
    </div>
  );
};

export default PhotoBlock;
