import React from "react";
import { Skeleton } from "@mui/material";

const ListSkeleton = ({
  count = 8,
  height = 60,
}: {
  count?: number;
  height?: number;
}) => (
  <>
    {Array(count)
      .fill(1)
      .map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          animation={"wave"}
          width={"100%"}
          height={height}
          sx={{ margin: `4px 0` }}
        />
      ))}
  </>
);

export default React.memo(ListSkeleton);
