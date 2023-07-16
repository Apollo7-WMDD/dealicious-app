import React from 'react';
import ImagePreview from '../Profile/ImagePreview';
import PictureUploadCard from '../Button/PictureUploadCard';

const ViewCampaignImage = ({ imagePreview, handleUploadMenu, handleRemoveImage }) => {
  return (
    <>
      {imagePreview.length > 0 ? (
        imagePreview.map((image, index) => (
          <ImagePreview
            key={index}
            src={localStorage.getItem("media")}
            alt="preview"
            width="280px"
            height="320px"
            onRemove={() => handleRemoveImage(index)}
          />
        ))
      ) : (
        <Box>
          <PictureUploadCard
            phrase="Add a campaign image"
            onFileSelected={handleUploadMenu}
            sx={{ height: { md: "320px" } }}
          />
        </Box>
      )}
    </>
  );
};

export default ViewCampaignImage;
