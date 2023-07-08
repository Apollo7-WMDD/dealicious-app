import { Box } from "@mui/material"
import { Children } from "react"


function MainGrid({children}) {
  return (
    <Box 
    sx={{display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.5rem",
    gridAutoFlow: "row dense",
  margin: "1.5rem 0"}}
    >
      {children}
    </Box>
  )
}

export default MainGrid
