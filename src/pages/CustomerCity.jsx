import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useState } from 'react';
import { axiosRequest } from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function CustomerCity() {
    const navigate = useNavigate();
    const [customerCities, setCustomerCities] = useState([]);

    useEffect(() => {
        getCustomerCities();
    }, [])

    const getCustomerCities = async () => {
        try {
            const res = await axiosRequest.get(`/api/customer/listByCity`);
            setCustomerCities(res.data.data);
        } catch (error) {
            console.error("Error fetching customer cities:", error);
        }
    }
    const handleNameClick = (id) => {
        navigate(`/`);
    };
    return (
        <>
            <TableContainer className='customer-cities'>
                <h2>City Listing</h2>
                <div className='go-back'>
                    <Button size="small" onClick={handleNameClick}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 13V20L4 12L12 4V11H20V13H12Z"></path></svg>Go Back</Button>
                </div>
                <Table sx={{ height: '200px', width: '500px' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>City</TableCell>
                            <TableCell >Number Of Customers</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customerCities.map((row) => (
                            <TableRow
                                key={row._id}
                            >
                                <TableCell component="th" scope="row">
                                    {row.city}
                                </TableCell>
                                <TableCell >{row.noofcustomers}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
