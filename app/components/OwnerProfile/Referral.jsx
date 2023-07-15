import ChartCard from '../Card/ChartCard';
import SubHeader from '../Header/SubHeader';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

function BusinessHours() {
  return (
    <ChartCard content="Business Hours" gridColumn="1 / 3">
      <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
        <SubHeader>Referral System</SubHeader>
        <Typography>test</Typography>
      </Box>
    </ChartCard>
  );
}

export default BusinessHours;
