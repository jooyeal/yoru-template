import { Skeleton } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

type Props = {
  thumbnail?: string;
  images?: string[];
};

type ChildImagesProps = {
  image?: string;
  selected: boolean;
};

const ChildImage: React.FC<ChildImagesProps> = ({ image, selected }) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className={`relative ${!selected && "opacity-50"}`}>
      <Skeleton
        ref={ref}
        className="absolute top-0 z-10"
        width="100px"
        height="100px"
      />
      <Image
        src={image ?? ""}
        width={100}
        height={100}
        onLoadingComplete={() => ref.current?.remove()}
      />
    </div>
  );
};

const ProductImages: React.FC<Props> = ({ thumbnail, images }) => {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  useEffect(() => {
    setSelectedImage(thumbnail);
  }, [thumbnail]);
  return (
    <div className="relative">
      {isImageLoading && (
        <Skeleton
          className="absolute top-0 z-10"
          width="500px"
          height="500px"
        />
      )}

      <Image
        src={selectedImage ?? ""}
        width={500}
        height={500}
        onLoadingComplete={() => setIsImageLoading(false)}
      />
      <div className="flex gap-2">
        {images?.map((image) => (
          <div
            className={`cursor-pointer`}
            onClick={() => {
              setIsImageLoading(true);
              setSelectedImage(image);
            }}
          >
            <ChildImage image={image} selected={selectedImage === image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
