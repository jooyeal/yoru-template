import { Box, Spacer, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import Stars from "./Stars";

type Props = {
  title: string;
  description: string;
  image: string;
  score: number;
};

const ReviewItem: React.FC<Props> = ({ title, description, image, score }) => {
  const [readMore, setReadMore] = useState<boolean>(false);
  return (
    <Box className="border p-2 rounded mb-2">
      <Box>
        <Stars score={score} />
      </Box>
      <Spacer h={3} />
      <Box>
        <Text className="font-bold">{title}</Text>
      </Box>
      <Spacer h={3} />
      <Box>
        <Image src={image} width={200} height={300} />
      </Box>
      <Spacer h={3} />
      <Box>
        <Text
          className={`mobile:w-60 laptop:w-208 ${
            readMore ? "" : "line-clamp-4"
          }`}
        >
          {description}
        </Text>
        <Text
          className="text-right text-gray-500 text-lg cursor-pointer"
          onClick={() => setReadMore((prev) => !prev)}
        >
          {readMore ? "閉じる" : "もっと見る"}
        </Text>
      </Box>
    </Box>
  );
};

export default ReviewItem;
