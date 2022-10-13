import { IconButton } from "@chakra-ui/react";
import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

type Props = {
  count: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

const Counter: React.FC<Props> = ({ count, onDecrease, onIncrease }) => {
  return (
    <div className="flex">
      <IconButton
        size="sm"
        icon={<AiOutlineMinus />}
        aria-label="decrease-count"
        onClick={onDecrease}
      />
      <p className="font-bold ml-4 mr-4 w-10 text-center">{count}</p>
      <IconButton
        size="sm"
        icon={<AiOutlinePlus />}
        aria-label="increase-count"
        onClick={onIncrease}
      />
    </div>
  );
};

export default Counter;
