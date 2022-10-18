import { Box, Skeleton, Spacer } from "@chakra-ui/react";
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
    <Box
      className={`relative ${!selected && "opacity-50"}`}
      width="100px"
      height="100px"
    >
      <Skeleton
        ref={ref}
        className="absolute top-0 z-10"
        width="100%"
        height="100%"
      />
      <Image
        src={image ?? ""}
        layout="fill"
        onLoadingComplete={() => ref.current?.remove()}
      />
    </Box>
  );
};

const ProductImages: React.FC<Props> = ({ thumbnail, images }) => {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  useEffect(() => {
    setSelectedImage(thumbnail);
  }, [thumbnail]);
  return (
    <>
      <Box className="relative w-500px h-500px mobile:w-300px mobile:h-300px">
        {isImageLoading && (
          <Skeleton
            className="absolute top-0 z-10"
            width="100%"
            height="100%"
          />
        )}
        {selectedImage && (
          <Image
            src={selectedImage}
            layout="fill"
            onLoadingComplete={() => setIsImageLoading(false)}
            priority
          />
        )}
      </Box>
      <Spacer h={4} />
      <Box className="flex laptop:flex-wrap laptop:w-500px laptop:justify-center gap-2 mobile:w-300px mobile:overflow-auto">
        {images?.map((image, index) => (
          <Box
            key={index}
            className={`cursor-pointer`}
            onClick={() => {
              setSelectedImage(image);
            }}
          >
            <ChildImage image={image} selected={selectedImage === image} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ProductImages;
