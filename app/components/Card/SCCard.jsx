import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const SCCard = ({ props }) => {

//export default function SCCard({props}) {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <img 
        src="https://media.istockphoto.com/id/1415525222/photo/fire-and-chinese-chefs.jpg?s=1024x1024&w=is&k=20&c=zdg6cOC9XSu1Xw9Adys82VBZxHWkHupFiAqxBbxyqxU="
        alt="new"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props._id}
          </Typography>
        </CardContent>
        <img 
        src={props.logo}
        alt="new" width="50px" height="50px"
        />
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default SCCard;