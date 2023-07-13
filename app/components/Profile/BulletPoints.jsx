import { Box } from '@mui/material';

const BulletPoints = ({ items }) => (
  <Box component="ul" sx={{ pl: '1em', listStyleType: 'disc' }}>
    {items.map((item, index) => (
      <Box 
        component="li" 
        key={index} 
        sx={{ 
          fontFamily: 'Mukta', 
          fontSize: '20px', 
          fontStyle: 'normal', 
          fontWeight: 300, 
          lineHeight: '28px' 
        }}
      >
        {item}
      </Box>
    ))}
  </Box>
);

export default BulletPoints;

