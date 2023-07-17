import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function LoaderSkeleton() {
  return (
    <Stack spacing={1}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={355}
        height={700}
        sx={{ borderRadius: "10px" }}
      />
    </Stack>
  );
}
