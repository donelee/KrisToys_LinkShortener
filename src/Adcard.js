import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

function Adcard(props) {
    const { adcard } = props;

    return (      
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'lightgrey' }}>
                <CardMedia
                    component="img"
                    sx={{ height: '200px' }}
                    image={adcard.image}
                    alt={adcard.imageLabel}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" textAlign="center" color="#1565c0">
                        <a href={ adcard.adURL } target="_blank" rel="noopener noreferrer">{adcard.title}</a>
                    </Typography>
                    <Typography>
                        {adcard.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button type="submit" fullWidth  href={ adcard.adURL } target="_blank" rel="noopener noreferrer" >前往查看详情</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

    Adcard.propTypes = {
        adcard: PropTypes.shape({      
        image: PropTypes.string.isRequired,
        imageLabel: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        adURL: PropTypes.string.isRequired,
        }).isRequired,
    };

export default Adcard;