import { List, ListProps } from "@chakra-ui/react";

const BulletedList: React.FC<ListProps> = (props) => (
  <List variant="bulleted" {...props} />
);

export default BulletedList;
