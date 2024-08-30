import { List, ListItem, Text } from "@chakra-ui/react";
import { $item, get } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { haveUnrestricted } from "../../../util/available";
import { plural } from "../../../util/text";

const DesignerSweatpants = () => {
  const designerSweatpants = $item`designer sweatpants`;
  const sweatOMeter = get("sweat");
  const boozeSweatsLeft = Math.max(3 - get("_sweatOutSomeBoozeUsed"), 0);

  if (!haveUnrestricted(designerSweatpants)) {
    return null;
  }

  return (
    <Tile linkedContent={designerSweatpants}>
      {sweatOMeter < 100 ? (
        <Line>
          <Text
            as="span"
            color="purple.500"
          >{`${sweatOMeter}% sweatpants Sweatiness`}</Text>
        </Line>
      ) : (
        <>
          <Line>
            <Text as="span" color="purple.500">
              Designer sweatpants: 100% sweaty!
            </Text>
          </Line>
        </>
      )}
      <List>
        <ListItem>
          <Text as="span" fontWeight="bold">
            Sweat Sip (5% sweat):
          </Text>{" "}
          Regain 50 MP
        </ListItem>
        <ListItem>
          <Text as="span" fontWeight="bold">
            Drench Yourself In Sweat (15% sweat):
          </Text>{" "}
          +100% Initiative
        </ListItem>
        {boozeSweatsLeft > 0 && (
          <ListItem>
            <Text as="span" fontWeight="bold">
              Sweat Out Some Booze (25% sweat):
            </Text>
            <Text
              as="span"
              color="orange.500"
            >{` -1 Drunkenness. ${plural(boozeSweatsLeft, "use")} left for today.`}</Text>
          </ListItem>
        )}
      </List>
    </Tile>
  );
};

export default DesignerSweatpants;
