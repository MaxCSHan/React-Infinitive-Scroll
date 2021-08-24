//Import Library
import { useCallback, useEffect, useRef, useState } from "react";

//Import Service
import { getPhotoListLimit4 } from "../../service/listService";

// Import css modules stylesheet as styles
import styles from "../../asset/style/Gallery.module.scss";

//Import Interface
import IPhoto from "../../interface/IPhoto";
//Import Component
import PhotoBlock from "./component/PhotoBlock";
import { concatMap, Subject } from "rxjs";

/**
 * Spinner Compnent
 */
const LoadingSpinner = (
  <div className="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

const Gallery = () => {
  const observer = useRef<IntersectionObserver>();
  const topobserver = useRef<IntersectionObserver>();

  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showToTop, setShowToTop] = useState(false);
  const [datas, setDatas] = useState<IPhoto[]>([]);

  //Lazy Loading
  const lastPhotoRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
          setIsLoading(true);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  //To top reminder
  const firstPhotoRef = useCallback((node) => {
    topobserver.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShowToTop(false);
      } else setShowToTop(true);
    });

    if (node) topobserver.current.observe(node);
  }, []);

  //Start a page data stream
  const pagination$ = useRef<Subject<number>>(new Subject<number>());

  //Subscribe to the page data stream
  useEffect(() => {
    const subscription = pagination$.current
      .pipe(concatMap((num) => getPhotoListLimit4(num)))
      .subscribe((result) => {
        const newData = result as IPhoto[];

        //Filter prevent duplicates
        setDatas((datas) => [
          ...datas,
          ...newData.filter(
            (ele) => !datas.map((data) => data.id).includes(ele.id)
          ),
        ]);
        setIsLoading(false);
      });

    return () => {
      subscription.unsubscribe();
    };
  },[pagination$]);

  useEffect(
    () => pagination$.current.next(pageNumber),
    [pagination$, pageNumber]
  );

  // useEffect(() => {
  //   const subscription = getPhotoListLimit4(pageNumber).subscribe((result) => {
  //     const newData = result as IPhoto[];

  //     //Filter prevent duplicates
  //     setDatas((datas) => [...datas, ...newData.filter(ele => !datas.map(data => data.id).includes(ele.id))]);
  //     setIsLoading(false);
  //   });

  //   return () => {
  //     subscription.unsubscribe();
  //   };

  // }, [pageNumber]);

  const scrollToTop = () => {
    document.getElementById("gallery")!.scroll({
      top: 0,
      behavior: "smooth",
    });

    setShowToTop(false);
  };

  return (
    <div className={styles.gallery_container} id="gallery">
      <div className={styles.gallery_photolist} >
        {datas.map((photo, index) => {
          if (index === 0)
            return (
              <div key={`photoblock_${photo.id}_${index}`} ref={firstPhotoRef}>
                <PhotoBlock data={photo}></PhotoBlock>
              </div>
            );
          if (index === datas.length - 1)
            return (
              <div key={`photoblock_${photo.id}_${index}`} ref={lastPhotoRef}>
                <PhotoBlock data={photo}></PhotoBlock>
              </div>
            );
          else
            return (
              <div key={`photoblock_${photo.id}_${index}`}>
                <PhotoBlock data={photo}></PhotoBlock>
              </div>
            );
        })}
      </div>

      {isLoading && <div>{LoadingSpinner}</div>}

      {showToTop && (
        <div className={styles.gallery_topbtn} onClick={() => scrollToTop()}>
          Back to Top
        </div>
      )}
    </div>
  );
};

export default Gallery;
