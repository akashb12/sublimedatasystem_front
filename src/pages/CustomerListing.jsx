import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import { axiosRequest } from '../utils/axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditCustomer from '../components/EditCustomer';


export default function CustomerListing() {
    const [customerList, setCustomerList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [rowCount, setRowCount] = useState(0);
    const [updateCustomerDialogue, setUpdateCuatomerDialogue] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [search, setSearch] = useState("");
    const navigate = useNavigate();


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'first_name',
            headerName: 'First name',
            width: 130,
            renderCell: (params) => (
                <Link
                    component="button"
                    to={`/detail/${params.row._id}`}
                    variant="body2"
                    underline="hover"
                >
                    {params.value}
                </Link>
            ),
        },
        { field: 'last_name', headerName: 'Last name', width: 130 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 160,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(params.row)}
                        sx={{ mr: 1 }}
                    >
                        Edit
                    </Button>
                </>
            ),
        },
    ];

    useEffect(() => {
        getCustomerListing(paginationModel.page + 1, paginationModel.pageSize);
    }, [paginationModel])

    useEffect(() => {
        setLoading(true);
        const getData = setTimeout(() => {
            getCustomerListing(paginationModel.page + 1, paginationModel.pageSize);
          }, 1000);
          return () => clearTimeout(getData)
    }, [search])

    const getCustomerListing = async (pageNo, pageSize) => {
        try {
            setLoading(true);
            const res = await axiosRequest.get(`/api/customer/list?search=${search}&pageNo=${pageNo}&limit=${pageSize}`);
            const dataWithId = res.data.data.map((row, index) => ({
                ...row,
                id: index + 1
            }));
            setCustomerList(dataWithId);
            setRowCount(res.data.totalCount || 0);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching customer listing:", error);
        }
    }
    const handlePaginationChange = (model) => {
        setPaginationModel(model);
    };
    const handleEdit = (row) => {
        setUpdateCuatomerDialogue(true);
        setSelectedCustomer(row);
    };
    const closeUpdateCustomerDialog = () => {
        setUpdateCuatomerDialogue(false);
        getCustomerListing(paginationModel.page + 1, paginationModel.pageSize)
    };

    const handleNameClick = (id) => {
        navigate(`/city`);
    };
    return (
        <>
            <div className='customer-listing'>
                <h2>Customer Listing</h2>
                <div >
                    <Button size="small" onClick={handleNameClick}>Go To City Listings<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path></svg></Button>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="company"
                        name="company"
                        label="Search by name or city"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Paper sx={{ height: '500px', width: '510px' }}>
                    <DataGrid
                        rows={customerList}
                        columns={columns}
                        pagination
                        paginationMode="server"
                        rowCount={rowCount}
                        pageSizeOptions={[10]}
                        paginationModel={paginationModel}
                        onPaginationModelChange={handlePaginationChange}
                        loading={loading}
                        sx={{ border: 0 }}
                        disableColumnFilter
                        disableColumnSorting
                    />
                </Paper>
            </div>
            {updateCustomerDialogue && <EditCustomer openDialog={updateCustomerDialogue} closeDialog={closeUpdateCustomerDialog} customer={selectedCustomer} />}
        </>
    );
}