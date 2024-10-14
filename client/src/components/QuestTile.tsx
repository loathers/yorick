import { myLevel } from "kolmafia";

import Tile, { TileProps } from "./Tile";

interface QuestTileProps extends TileProps {
  minLevel?: number;
}

const QuestTile: React.FC<QuestTileProps> = ({
  header,
  href,
  minLevel,
  children,
  ...props
}) => {
  return minLevel !== undefined && myLevel() < minLevel ? (
    <Tile header={`${header} (level ${minLevel})`} {...props} disabled={true} />
  ) : (
    <Tile header={header} href={href} {...props}>
      {children}
    </Tile>
  );
};

export default QuestTile;
