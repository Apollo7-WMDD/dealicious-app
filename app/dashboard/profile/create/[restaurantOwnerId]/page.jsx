"use client";
import { useState, useEffect, useTheme } from "react";
import InputText from "../../../../components/Input/InputText";
import Form from "../../../../components/Card/Form";
import SubHeader from "../../../../components/Header/SubHeader";
import Header from "@/app/components/Header/Header";
import InputDropdown from "../../../../components/Input/InputDropdown";
import InputButton from "../../../../components/Button/InputButton";
import PictureUploadCard from "../../../../components/Button/PictureUploadCard";
import InputCheckbox from "../../../../components/Input/InputCheckbox";
import TimeDropdown from "../../../../components/Profile/TimeDropdown";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    manager: "",
    email: "",
    phone: "",
    website: "",
    category: "",
    address: {
      street: "",
      postalCode: "",
      city: "",
      province: "",
      country: "",
    },
    businessHours: {
      monday: { open: "", close: "" },
      tuesday: { open: "", close: "" },
      wednesday: { open: "", close: "" },
      thursday: { open: "", close: "" },
      friday: { open: "", close: "" },
      saturday: { open: "", close: "" },
      sunday: { open: "", close: "" },
      holiday: { open: "", close: "" },
    },
    menu: "",
    logo: "",
    qrCode: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (e) => {
    setFormData({
      ...formData,
      address: { ...formData.address, [e.target.name]: e.target.value },
    });
  };

  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'holiday'];

  const DayClosedChange = (day) => () => {
    setFormData((prevState) => ({
      ...prevState,
      businessHours: {
        ...prevState.businessHours,
        [day]: {
          ...prevState.businessHours[day],
          closed: !prevState.businessHours[day].closed,
        },
      },
    }));
  };
  
  const uploadLogo = () => {
    console.log('Logo uploaded!');
  };

  const uploadMenu = (file) => {
    console.log('Menu uploaded!');
    console.log(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Server error: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        setRestaurants((prevRestaurants) => [...prevRestaurants, data]);
        setFormData({
          userId: "",
          name: "",
          manager: "",
          email: "",
          phone: "",
          website: "",
          address: {
            street: "",
            postalCode: "",
            city: "",
            province: "",
            country: "",
          },
          businessHours: {
            monday: { open: "", close: "" },
            tuesday: { open: "", close: "" },
            wednesday: { open: "", close: "" },
            thursday: { open: "", close: "" },
            friday: { open: "", close: "" },
            saturday: { open: "", close: "" },
            sunday: { open: "", close: "" },
            holiday: { open: "", close: "" }
          },
          menu: "",
          logo: "",
          qrCode: "",
        });
        router.push(`/dashboard/profile/${restaurantOwnerId}`);
      })
      .catch((error) => console.error("Error creating restaurant:", error));
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await fetch("/api/restaurant", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Something went wrong...");

      const data = await res.json();
      setRestaurants(data);
    };
    fetchRestaurants();
  }, []);

  const [businessInfoVisible, setBusinessInfoVisible] = useState(true);
  const [businessHoursVisible, setBusinessHoursVisible] = useState(true);
  const [imagesAndMenusVisible, setImagesAndMenusVisible] = useState(true);
  const [referralSystemVisible, setreferralSystemVisible] = useState(true);

  return (
      <div>
        <Header>Create Profile</Header>
            <Form>
            <Box sx={{
                display: 'flex', 
                justifyContent: 'space-between',
                alignContent: 'center',
                flexDirection: 'row',
                width: '100%',
              }}>
                <SubHeader sx={{fontSize:'20px'}}>Business Information</SubHeader>
                <KeyboardArrowDown onClick={() => setBusinessInfoVisible(!businessInfoVisible)} />
            </Box>
              {businessInfoVisible && (
              <>
              <Box sx={{ display: { xs: 'block', md: 'flex', justifyContent:'space-between' }}}>
                <Box sx={{ width: { xs: '100%', md: '63%' }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', justifyContent:'space-between'}}>
                  <Box sx={{ width: { xs: '100%', md: '48%' }}}>
                    <InputText
                      label="Business Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      name="name"
                      id="name"
                      placeholder="Business Name"
                    />
                  </Box>
                  <Box sx={{ width: { xs: '100%', md: '48%' }}}>
                    <InputText
                      label="Business Category"
                      value={formData.category}
                      onChange={handleInputChange}
                      name="category"
                      id="category"
                      placeholder="Ex:Japanese,Indian,Brunch"
                    />
                  </Box>
                  <Box sx={{ width: { xs: '100%', md: '48%' }}}>
                    <InputText
                      label="Manager"
                      name="manager"
                      id="manager"
                      value={formData.manager}
                      onChange={handleInputChange}
                      placeholder="Manager"
                    />
                  </Box>
                  <Box sx={{ width: { xs: '100%', md: '48%' }}}>
                    <InputText
                      label="Website"
                      name="website"
                      id="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="Website"
                    />
                  </Box>
                  <Box sx={{ width: { xs: '100%', md: '48%' }}}>
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
                  <Box sx={{ width: { xs: '100%', md: '48%' }}}>
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
                  <Box sx={{    
                      flex: { xs: '0 0 100%', md: '0 0 33%'},
                    }}>
                      <PictureUploadCard
                        sx={{ height: { md: '255px' }}}
                        phrase="Upload Logo File"
                        onFileSelected={uploadLogo}
                      />
                  </Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', justifyContent:'space-between'}}>
                  <Box sx={{ width: { xs: '100%', md: '30.5%' }}}>
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
                  <Box sx={{ width: { xs: '100%', md: '67%' }}}>
                    <InputText
                      label="Street Address"
                      name="street"
                      id="street"
                      value={formData.address.street}
                      onChange={handleAddressChange}
                      placeholder="Street Address"
                    />
                  </Box>
                  <Box sx={{ width: { xs: '100%', md: '30.5%' }}}>
                    <InputText
                      label="City"
                      name="city"
                      id="city"
                      value={formData.address.city}
                      onChange={handleAddressChange}
                      placeholder="City"
                    />
                  </Box>
                  <Box sx={{ width: { xs: '100%', md: '33.5%' }}}>
                    <InputText
                      label="Province/State"
                      name="province"
                      id="province"
                      value={formData.address.province}
                      onChange={handleAddressChange}
                      placeholder="Province/State"
                    />
                  </Box>
                  <Box sx={{ width: { xs: '100%', md: '30.5%'}}}>
                    <InputDropdown
                      label="Country"
                      value={formData.address.country}
                      onChange={handleAddressChange}
                      name="country"
                      id="country"
                      placeholder="Country"
                      options={[
                        { value: 'Canada', label: 'Canada' },
                        { value: 'USA', label: 'USA' },
                      ]}
                    />
                  </Box>
                </Box>
                </>
              )}

            </Form>
            <Form>
            <Box sx={{
                display: 'flex', 
                justifyContent: 'space-between',
                alignContent: 'center',
                flexDirection: 'row',
                width: '100%',
              }}>
              <SubHeader>Business Hours</SubHeader>
              <KeyboardArrowDown onClick={() => setBusinessHoursVisible(!businessHoursVisible)} />
            </Box>
              {businessHoursVisible && 
                weekdays.map((day) => (
                  <Box 
                    key={day} 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', md: 'row' }, 
                      gap: { xs: '0', md: '30px' },
                      marginBottom: '20px', 
                      alignItems: 'center' 
                    }}
                  >
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        width: { xs: 'auto', md: '200px' },
                        gap: '5px'
                      }}
                    >
                      <Typography sx={{
                        color: '#181818',
                        fontSize: '16px',
                        fontFamily: 'Mukta',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        alignSelf: 'center',
                        length: '50px',
                        marginRight: '10px',

                      }}>{day.charAt(0).toUpperCase() + day.slice(1)}</Typography>
                      <InputCheckbox 
                        label="Closed"
                        onChecked={DayClosedChange(day)}
                        labelPlacement="start"
                        checked={formData.businessHours[day].closed}
                      />
                    </Box>
                    <TimeDropdown
                      day={day}
                      isDisabled={formData.businessHours[day].closed}
                      setBusinessHours={(newHours) => {
                        setFormData((prevState) => ({
                          ...prevState,
                          businessHours: {
                            ...prevState.businessHours,
                            [day]: newHours,
                          },
                        }));
                      }}
                    />
                  </Box>
                ))
              }
            </Form>

          
            <Form>
              <Box sx={{
                display: 'flex', 
                justifyContent: 'space-between',
                alignContent: 'center',
                flexDirection: 'row',
                width: '100%',
              }}>
                <SubHeader>Images & Menus</SubHeader>
                <KeyboardArrowDown onClick={() => setImagesAndMenusVisible(!imagesAndMenusVisible)} />
              </Box>
              {imagesAndMenusVisible && (
                <PictureUploadCard
                  phrase="Upload Menus"
                  onFileSelected={uploadMenu}
                />
              )}
            </Form>

            <Form>
              <Box sx={{
                display: 'flex', 
                justifyContent: 'space-between',
                alignContent: 'center',
                flexDirection: 'row',
                width: '100%',
              }}>
                <SubHeader>Referral System</SubHeader>
                <KeyboardArrowDown onClick={() => setreferralSystemVisible(!referralSystemVisible)} />
              </Box>
              {referralSystemVisible && (
                <>
                 <Box sx={{
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row'},
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '24px',
                  }}>
                    <Box sx={{    
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      gap: '8px',
                      width: { xs: '326px', md: '400px'},
                      marginTop:'20px'}}>
                      <Typography sx={{
                        color: '#181818',
                        fontSize: '19px',
                        fontFamily: 'Mukta',
                        fontStyle: 'normal',
                        fontWeight: 600,
                      }}>How many points the Super Customers can earn for each hundred dollar they spend?</Typography>
                      <InputText
                        name="points"
                        id="points"
                        value={formData.points}
                        onChange={handleInputChange}
                        placeholder="Points"
                        style={{whiteSpace: 'nowrap'}}
                      />
                    </Box>
                    <Box sx={{    
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: '5px',
                      width: { xs: '326px', md: '400px'},}}>
                      <ErrorOutlineIcon />
                      <Typography>You set up this number only when you’re creating your profile. The Super Customers can redeem their points to get $1.00 discount per point.</Typography>
                    </Box>
                  </Box>
                </>
              )}
            </Form>

            <InputButton
              onFirstButtonClick={(e) => {
                e.preventDefault();
                console.log('Cancel');
              }}
              onSecondButtonClick={handleSubmit}
              firstButtonText="Cancel"
              secondButtonText="Save Profile"
              type="submit"
            />
      </div>
  );
};

export default Restaurant;

