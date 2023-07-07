"use client"
import { useTheme, Typography } from "@mui/material";

import Header from '../components/Header/Header'
import SubHeader from '../components/Header/SubHeader'

function page() {
  const theme = useTheme();
  return (
    <>
    <Header props="Insights" />
    <SubHeader props="Campaign Data Overview (All)"/>
    {/* <Typography variant="h1">This is H1 from Typography</Typography>
    <Typography variant="h3">This is H3 from Typography</Typography> */}
    </>
  )
}

export default page
