import React from "react";
import ImagePreview from "../Profile/ImagePreview";
import PictureUploadCard from "../Button/PictureUploadCard";
import { Box } from "@mui/material";

const ViewCampaignImage = ({
  imagePreview,
  handleUploadMenu,
  handleRemoveImage,
}) => {
  return (
    <>
      {Array.isArray(imagePreview) ? (
        imagePreview.map((image, index) => (
          <ImagePreview
            key={index}
            src={image}
            alt="preview"
            width="280px"
            height="320px"
            onRemove={() => handleRemoveImage(index)}
          />
        ))
      ) : imagePreview ? (
        <ImagePreview
          src={imagePreview}
          alt="preview"
          width="280px"
          height="320px"
          onRemove={handleRemoveImage}
        />
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
