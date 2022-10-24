import React from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Text,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { OutputGetOrdersTodaySchema } from "../../../schema/order.schema";
type Props = {
  statData: OutputGetOrdersTodaySchema | undefined;
};

const RevenueStat: React.FC<Props> = ({ statData }) => {
  return (
    <div className="p-4 border rounded-lg">
      <Text className="font-bold text-2xl">Growth Rate</Text>
      <Spacer h={6} />
      <StatGroup>
        <Stat className="p-4 border-r">
          <StatLabel>Daily</StatLabel>
          <StatNumber>{statData?.dailyTotal}</StatNumber>
          <StatHelpText>
            {statData && statData.dailyGrowthRate < 0 ? (
              <StatArrow type="decrease" />
            ) : (
              <StatArrow type="increase" />
            )}
            {statData?.dailyGrowthRate}%
          </StatHelpText>
        </Stat>
        <Stat className="p-4">
          <StatLabel>Monthly</StatLabel>
          <StatNumber>{statData?.monthlyTotal}</StatNumber>
          <StatHelpText>
            {statData && statData.monthlyGrowthRate < 0 ? (
              <StatArrow type="decrease" />
            ) : (
              <StatArrow type="increase" />
            )}
            {statData?.monthlyGrowthRate}%
          </StatHelpText>
        </Stat>
      </StatGroup>
    </div>
  );
};

export default RevenueStat;
