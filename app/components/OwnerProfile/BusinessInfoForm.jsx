import { useState, useEffect } from "react";
import InputText from "../Input/InputText";
import { Box } from "@mui/material";
import PictureUploadCard from "../Button/PictureUploadCard";
import Form from "../Card/Form";
import SubHeader from '../Header/SubHeader';
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import InputDropdown from "../Input/InputDropdown";
import ImagePreview from "../Profile/ImagePreview";

const BusinessInfoForm = ({ formData, handleInputChange, handleAddressChange, uploadLogo, isEdit }) => {
    const [businessInfoVisible, setBusinessInfoVisible] = useState(true);
    const [logoPreview, setLogoPreview] = useState(null);
    // const [logoPreview, setLogoPreview] = useState(formData.logo);
    // const [logoPreview, setLogoPreview] = useState(isEdit ? formData.logo : null);
    useEffect(() => {
        if (isEdit) {
            setLogoPreview(formData.logo);
        }
    }, [isEdit, formData.logo]);

    const handleUploadLogo = (file) => {
        const logoFile = file[0];
        uploadLogo(logoFile);
    
        let reader = new FileReader();
        reader.readAsDataURL(logoFile); 
        reader.onloadend = () => {
            setLogoPreview(reader.result);
        };
    };
    

    const removeLogo = () => {
        setLogoPreview(null);
    };

    return (
        <Form>
            <Box
                sx={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                flexDirection: "row",
                width: "100%",
                }}
            >
                <SubHeader sx={{ fontSize: "20px" }}>
                Business Information
                </SubHeader>
                <KeyboardArrowDown
                onClick={() => setBusinessInfoVisible(!businessInfoVisible)}
                />
            </Box>
            {businessInfoVisible && (
                <>
                <Box sx={{ display: { xs: "block", md: "flex", justifyContent:'space-between' }}}>
                        <Box
                        sx={{
                            width: { xs: "100%", md: "63%" },
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            flexWrap: "wrap",
                            justifyContent:'space-between',
                        }}
                        >
                        <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                            <InputText
                            label="Business Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            name="name"
                            id="name"
                            placeholder="Business Name"
                            />
                        </Box>
                        <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                            <InputText
                            label="Business Category"
                            value={formData.category}
                            onChange={handleInputChange}
                            name="category"
                            id="category"
                            placeholder="Ex:Japanese,Indian,Brunch"
                            />
                        </Box>
                        <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                            <InputText
                            label="Manager"
                            name="manager"
                            id="manager"
                            value={formData.manager}
                            onChange={handleInputChange}
                            placeholder="Manager"
                            />
                        </Box>
                        <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                            <InputText
                            label="Website"
                            name="website"
                            id="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            placeholder="Website"
                            />
                        </Box>
                        <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                            <InputText
                            label="Business Email Address"
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Business Email Address"
                            />
                        </Box>
                        <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                            <InputText
                            label="Postal Code"
                            name="postalCode"
                            id="postalCode"
                            value={formData.address.postalCode}
                            onChange={handleAddressChange}
                            placeholder="Postal Code"
                            />
                        </Box>
                        </Box>
                        <Box
                        sx={{
                            flex: { xs: "0 0 100%", md: "0 0 33%" },
                        }}
                        >
                        {logoPreview ? (
                            <ImagePreview
                                src={logoPreview}
                                alt="Logo Preview"
                                width="100%"
                                height="255px"
                                onRemove={removeLogo}
                            />
                        ) : (
                            <PictureUploadCard
                                sx={{ height: { md: "255px" } }}
                                phrase="Upload Logo File"
                                onFileSelected={handleUploadLogo}
                            />
                        )}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        flexWrap: "wrap",
                        justifyContent:'space-between',
                        }}
                    >
                        <Box sx={{ width: { xs: "100%", md: "30.5%" } }}>
                        <InputText
                            label="Business Phone Number"
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Business Phone Number"
                        />
                        </Box>
                        <Box sx={{ width: { xs: "100%", md: "67%" } }}>
                        <InputText
                            label="Street Address"
                            name="street"
                            id="street"
                            value={formData.address.street}
                            onChange={handleAddressChange}
                            placeholder="Street Address"
                        />
                        </Box>
                        <Box sx={{ width: { xs: "100%", md: "30.5%" } }}>
                        <InputText
                            label="City"
                            name="city"
                            id="city"
                            value={formData.address.city}
                            onChange={handleAddressChange}
                            placeholder="City"
                        />
                        </Box>
                        <Box sx={{ width: { xs: "100%", md: "33.5%" } }}>
                        <InputText
                            label="Province/State"
                            name="province"
                            id="province"
                            value={formData.address.province}
                            onChange={handleAddressChange}
                            placeholder="Province/State"
                        />
                        </Box>
                        <Box
                        sx={{ width: { xs: "100%", md: "30.5%"} }}
                        >
                        <InputDropdown
                            label="Country"
                            value={formData.address.country}
                            onChange={handleAddressChange}
                            name="country"
                            id="country"
                            placeholder="Country"
                            options={[
                            { value: "Canada", label: "Canada" },
                            { value: "USA", label: "USA" },
                            ]}
                        />
                        </Box>
                </Box>
            </>
            )}
        </Form>
    );
};

export default BusinessInfoForm;
