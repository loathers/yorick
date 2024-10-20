import { Heading, Table, Tbody } from "@chakra-ui/react";

import OverrideRow from "./OverrideRow";

interface OverrideTableProps {
  filterRegex: RegExp | null;
  heading: string;
  data: string[];
  getOverride: (row: string) => string;
  getCurrent: (row: string) => string;
}

const OverrideTable: React.FC<OverrideTableProps> = ({
  heading,
  filterRegex,
  data,
  getOverride,
  getCurrent,
}) => (
  <>
    <Heading as="h2" size="md" textAlign="center">
      {heading}
    </Heading>
    <Table size="sm">
      <Tbody>
        {data
          .filter((item) => !filterRegex || filterRegex.test(getOverride(item)))
          .map((item) => (
            <OverrideRow
              key={getOverride(item)}
              override={getOverride(item)}
              label={item}
              current={getCurrent(item)}
            />
          ))}
      </Tbody>
    </Table>
  </>
);

export default OverrideTable;
