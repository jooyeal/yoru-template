import { Box, Spacer, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { OutputGetProductReviewsSchema } from "../../schema/review.schema";
import { FaStar, FaRegStar } from "react-icons/fa";
import { getAverageScore, getScorePercentage } from "../../utils/caculate";
import Stars from "./Stars";

type Props = {
  reviewData?: OutputGetProductReviewsSchema;
};

type ReviewScoreType = {
  scores: number[];
  target: number;
};

const ReviewScore: React.FC<ReviewScoreType> = ({ scores, target }) => {
  return (
    <Box className="flex">
      <Box className="w-40 h-6 mr-3">
        <Box
          className="bg-yellow-400 h-full"
          width={`${getScorePercentage(scores, target)}%`}
        ></Box>
      </Box>
      <Box>{getScorePercentage(scores, target)}%</Box>
    </Box>
  );
};

const ReviewSelector: React.FC<Props> = ({ reviewData }) => {
  const [scores, setScores] = useState<number[]>([]);

  useEffect(() => {
    if (reviewData) {
      const scores = reviewData.map((review) => review.score);
      setScores(scores);
    }
  }, [reviewData]);
  return (
    <Box>
      <Text className="font-bold text-xl">総合評価</Text>
      <Text className="text-lg text-gray-400">(評価数: {scores.length})</Text>
      <Spacer h={4} />
      <Box className="flex flex-col gap-2">
        <Box className="flex gap-2">
          <Text className="w-8">星5: </Text>
          <ReviewScore scores={scores} target={5} />
        </Box>
        <Box className="flex gap-2">
          <Text className="w-8">星4: </Text>
          <ReviewScore scores={scores} target={4} />
        </Box>
        <Box className="flex gap-2">
          <Text className="w-8">星3: </Text>
          <ReviewScore scores={scores} target={3} />
        </Box>
        <Box className="flex gap-2">
          <Text className="w-8">星2: </Text>
          <ReviewScore scores={scores} target={2} />
        </Box>
        <Box className="flex gap-2">
          <Text className="w-8">星1: </Text>
          <ReviewScore scores={scores} target={1} />
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewSelector;
