import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright() {
  return (
    <div align="center">
      <Typography component="span" variant="body2" color="text.secondary" align="center">
        {'Copyright © '}        
        {' '}2022-{new Date().getFullYear()}{'.'}
        <Link color="inherit" href = 'https://kris.run/' target="_blank" rel="noopener noreferrer" >
          kris.run
        </Link>
        &nbsp;All Rights Reserved.
        <hr />
        Enging by&nbsp;
        <Link color="inherit" href = 'https://github.com/LJea/LioatLinkShortener-Server' target="_blank" rel="noopener noreferrer">
          LLS
        </Link>&nbsp;
        |&nbsp;Theme By&nbsp;
        <Link color="inherit" href = 'https://github.com/donelee/KrisToys_LinkShortener' target="_blank" rel="noopener noreferrer">
          KrisToys
        </Link>
      </Typography>
    </div>
  );
}