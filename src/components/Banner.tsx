import { Center, Icon } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { OutputGetCampaigns } from "../schema/campaign.schema";

type Props = {
  campaigns: OutputGetCampaigns | undefined;
};

const Banner: React.FC<Props> = ({ campaigns }) => {
  const [currentBanner, setCurrentBanner] = useState<number>(0);
  useEffect(() => {
    const autoMoveBanner = setInterval(
      () =>
        setCurrentBanner((prev) => {
          if (prev + 1 === campaigns?.length) {
            return 0;
          } else {
            return prev + 1;
          }
        }),
      5000
    );
    return () => clearInterval(autoMoveBanner);
  }, [campaigns]);
  if (campaigns?.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-256 h-156 flex justify-center items-center text-2xl font-bold uppercase bg-gray-200 rounded-lg mobile:w-80">
          No campaign currently exists
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-50">
      <div className="w-screen overflow-hidden flex justify-center">
        <div
          style={{
            transform: `translate(-${currentBanner * 100}%)`,
          }}
          className="w-256 h-full flex transition duration-500 mobile:w-96"
        >
          {campaigns?.map((campaign, index) => (
            <Link key={campaign.id} href={`/campaign/${campaign.id}`}>
              <div className="cursor-pointer">
                <div
                  className={`w-256 h-156 relative mobile:w-96 mobile:h-48 ${
                    index !== currentBanner && "opacity-80 scale-95"
                  }`}
                >
                  <Image
                    className="rounded-lg"
                    src={campaign.thumbnail}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Center>
        {campaigns?.map((campaign, index) => (
          <Icon
            key={campaign.id}
            color={`${currentBanner === index ? "gray.500" : "gray.300 "}`}
            boxSize={6}
            className="cursor-pointer"
            onClick={() => setCurrentBanner(index)}
            as={BsDot}
          />
        ))}
      </Center>
    </div>
  );
};

export default Banner;
