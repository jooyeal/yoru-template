import { Box, HStack, Icon } from "@chakra-ui/react";
import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

type Props = {
  score?: number;
  setScore?: React.Dispatch<React.SetStateAction<number>>;
};

const Stars: React.FC<Props> = ({ score, setScore }) => {
  return (
    <HStack>
      <Box>
        <Icon
          className={`${setScore ? "cursor-pointer" : ""}`}
          as={score && score >= 1 ? FaStar : FaRegStar}
          boxSize={8}
          color="yellow.300"
          onClick={setScore ? () => setScore(1) : () => {}}
        />
      </Box>
      <Box>
        <Icon
          className={`${setScore ? "cursor-pointer" : ""}`}
          as={score && score >= 2 ? FaStar : FaRegStar}
          boxSize={8}
          color="yellow.300"
          onClick={setScore ? () => setScore(2) : () => {}}
        />
      </Box>
      <Box>
        <Icon
          className={`${setScore ? "cursor-pointer" : ""}`}
          as={score && score >= 3 ? FaStar : FaRegStar}
          boxSize={8}
          color="yellow.300"
          onClick={setScore ? () => setScore(3) : () => {}}
        />
      </Box>
      <Box>
        <Icon
          className={`${setScore ? "cursor-pointer" : ""}`}
          as={score && score >= 4 ? FaStar : FaRegStar}
          boxSize={8}
          color="yellow.300"
          onClick={setScore ? () => setScore(4) : () => {}}
        />
      </Box>
      <Box>
        <Icon
          className={`${setScore ? "cursor-pointer" : ""}`}
          as={score && score >= 5 ? FaStar : FaRegStar}
          boxSize={8}
          color="yellow.300"
          onClick={setScore ? () => setScore(5) : () => {}}
        />
      </Box>
    </HStack>
  );
};

export default Stars;
