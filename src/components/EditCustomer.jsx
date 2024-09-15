import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { axiosRequest } from '../utils/axios';

const EditCustomer = ({ openDialog, closeDialog, customer }) => {
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState(customer.first_name);
    const [lastName, setLastName] = useState(customer.last_name);
    const [city, setCity] = useState(customer.city);
    const [company, setCompany] = useState(customer.company);
    const [file, setFile] = useState(null);

    useEffect(() => {
        setOpen(openDialog)
    }, [openDialog])

    const handleClose = () => {
        setOpen(false);
        closeDialog()
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Capture the selected file
    };

    const updateCustomer = async (data) => {
        try {
            const formData = new FormData();
            formData.append('first_name', data.first_name);
            formData.append('last_name', data.last_name);
            formData.append('city', data.city);
            formData.append('company', data.company);
            formData.append('file', file);
            const res = await axiosRequest.put(`/api/customer/editCustomer/${customer._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            handleClose();
        } catch (error) {
            console.error("Error fetching customer details:", error);
        }
    }

    return (
        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        await updateCustomer(formJson)
                    },
                }}
            >
                <DialogTitle>Update Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="first_name"
                        name="first_name"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="last_name"
                        name="last_name"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="city"
                        name="city"
                        label="City"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="company"
                        name="company"
                        label="Company"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="file"
                        name="file"
                        label="Upload File"
                        type="file"
                        fullWidth
                        variant="standard"
                        onChange={handleFileChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditCustomer