import { Badge, Skeleton, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { getDiscountPrice } from "../../utils/caculate";

type Props = {
  id: number;
  url: string;
  title: string;
  price: number;
  discount: boolean;
  discountRate: number | null;
};

const ProductCard: React.FC<Props> = ({
  id,
  url,
  title,
  price,
  discount,
  discountRate,
}) => {
  const skeletonRef = useRef<HTMLDivElement>(null);
  return (
    <Link href={`product/${id}`}>
      <div className="h-72 shadow-md cursor-pointer hover:opacity-80 transition-all">
        <div className="relative">
          <Skeleton
            ref={skeletonRef}
            className="absolute top-0 z-20"
            height="200px"
            width="200px"
          />
          <Image
            src={url}
            width={200}
            height={200}
            onLoadingComplete={() => skeletonRef.current?.remove()}
          />
          {discount && (
            <Badge className="absolute right-2 bottom-4" colorScheme="red">
              sale
            </Badge>
          )}
        </div>
        <div className="p-2 w-48">
          <Text className="font-bold truncate">{title}</Text>
        </div>
        <div className="p-2">
          <span className={`font-bold ${discount && "line-through"}`}>
            ￥{price}
          </span>
          {discount && discountRate && (
            <span className="font-bold ml-4">
              ￥{getDiscountPrice(price, discountRate)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
