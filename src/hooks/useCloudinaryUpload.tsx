import axios from "axios";
import React, { useState, useEffect } from "react";

type UploadFormDatas = {
  thumbnail?: File;
  images?: FileList;
};

type UploadResponseUrl = {
  thumbnail: string;
  images: string[];
};

const useCloudinaryUpload = ({ thumbnail, images }: UploadFormDatas) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const upload = async (): Promise<UploadResponseUrl> => {
    setIsLoading(true);
    const formDataThumbnail = new FormData();
    const formDataImages = new FormData();
    let thumbnailUrl = "/assets/default.png";
    let imagesArray: string[] = [];
    if (thumbnail) {
      formDataThumbnail.append("file", thumbnail);
      formDataThumbnail.append("upload_preset", "ec_template_upload");
      const res = await axios.post(
        process.env.CLOUDINARY_CLOUD ?? "",
        formDataThumbnail
      );
      res.data.url && (thumbnailUrl = res.data.url);
    }
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formDataImages.append("file", images[i]);
        formDataImages.append("upload_preset", "ec_template_upload");
        const res = await axios.post(
          process.env.CLOUDINARY_CLOUD ?? "",
          formDataImages
        );
        res.data.url && imagesArray.push(res.data.url);
      }
    }
    setIsLoading(false);
    return { thumbnail: thumbnailUrl, images: imagesArray };
  };

  return { isLoading, upload };
};

export default useCloudinaryUpload;
