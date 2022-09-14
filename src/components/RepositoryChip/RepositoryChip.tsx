import React, { useMemo } from "react";
import { stringToRGB } from "@lib/string";
import {
  Chip,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Bookmark } from "@recoil/bookmark";

interface RepositoryChipProps extends Bookmark {
  sx?: SxProps<Theme>;
  onDelete?: ({ owner, repo }: Bookmark) => void;
}

const RepositoryChip = ({ owner, repo, sx, onDelete }: RepositoryChipProps) => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));
  const bgcolor = useMemo(
    () => "#" + stringToRGB(`${owner}/${repo}`),
    [owner, repo],
  );

  const label = isMobile ? `${repo}` : `${owner}/${repo}`;

  return (
    <Chip
      variant="filled"
      label={<Typography noWrap>{label}</Typography>}
      onDelete={onDelete && onDelete}
      sx={{ ...sx, bgcolor }}
    />
  );
};

export default RepositoryChip;
