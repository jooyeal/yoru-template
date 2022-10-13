import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { OutputGetCampaigns } from "../../../schema/campaign.schema";
import DeleteModal from "./DeleteModal";
type Props = {
  campaigns: OutputGetCampaigns | undefined;
  refetch: () => void;
};

const CampaignDataTable: React.FC<Props> = ({ campaigns, refetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: editOpen,
    onOpen: editOnOpen,
    onClose: editOnClose,
  } = useDisclosure();

  const [selected, setSelected] = useState<number | undefined>();

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID.</Th>
              <Th>Campaign title</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {campaigns?.map((campaign, index) => (
              <Tr key={campaign.id}>
                <Td>{campaign.id}</Td>
                <Td>{campaign.title}</Td>
                <Td isNumeric>
                  <ButtonGroup>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      onClick={() => {
                        setSelected(campaign.id);
                        editOnOpen();
                      }}
                    >
                      EDIT
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelected(campaign.id);
                        onOpen();
                      }}
                    >
                      DELETE
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        selected={selected}
        refetch={refetch}
      />
    </div>
  );
};

export default CampaignDataTable;
