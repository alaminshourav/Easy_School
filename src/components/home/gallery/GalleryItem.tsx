const renderImages = (photos: string) => {
  return `url(${photos})`;
};

const GalleryItem = ({ item, index }: any) => {
  const festivalURL = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_FESTIVAL;
  const bgStyle = {
    backgroundImage: renderImages(item?.photo && festivalURL + item?.photo),
  };

  return (
    <div
      className={`galleryItemBody ${
        index === 0
          ? "bigItem1"
          : index === 1
          ? "bigItem2"
          : index === 8
          ? "bigItem1"
          : index === 9
          ? "bigItem2"
          : `smallItem${index}`
      }`}
    >
      <div style={bgStyle} className="galleryImg"></div>
      <div className="galleryImageOverlay">
        <h4>{item?.title}</h4>
        <p>{item?.year}</p>
      </div>
    </div>
  );
};

export default GalleryItem;
