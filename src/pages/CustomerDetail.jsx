import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { axiosRequest } from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function CustomerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customerDetails, setCustomerDetails] = useState({});

    useEffect(() => {
        const getCustomerDetails = async () => {
            try {
                const res = await axiosRequest.get(`/api/customer/list/${id}`);
                setCustomerDetails(res.data.data);
            } catch (error) {
                console.error("Error fetching customer details:", error);
            }
        }
        getCustomerDetails();
    }, [id])

    const handleNameClick = (id) => {
        navigate(`/`);
    };
    return (
        <div className='customer-detail'>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 20 }}>
                        Customer Details
                    </Typography>
                    <Typography variant="h5" component="div">
                        name:- {customerDetails.first_name}{bull}{customerDetails.last_name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>city:- {customerDetails.city}</Typography>
                    <Typography variant="body2">
                        company:- {customerDetails?.company?.toUpperCase()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleNameClick}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 13V20L4 12L12 4V11H20V13H12Z"></path></svg>Go Back</Button>
                </CardActions>
            </Card>
        </div>
    );
}
