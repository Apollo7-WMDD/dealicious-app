import Link from "next/link";

const Page = ({ params }) => {
  const { restaurantOwnerId } = params;

  return (
    <>
      <div>
        {isSubmitted ? (
          <ViewNewCampaign
            formData={formData}
            handleFinalSubmit={handleFinalSubmit}
            handleEditProp={handleEdit}
            setFormData={setFormData}
          />
        ) : (
          <>
            <Header>Create a New Campaign</Header>
            <Form>
              <InputText
                label="Campaign Name"
                value={formData.name}
                onChange={handleInputChange}
                name="name"
                id="name"
                placeholder="Name"
              />
              <InputDropdown
                label="Specify the type of campaign"
                value={selectedType}
                onChange={TypeChange}
                name="dropdown"
                id="dropdown"
                placeholder="Type"
                options={campaignTypes}
              />
              <DateDropdown
                label="Start and end date"
                value={[formData.startDate, formData.endDate]}
                onChange={handleDateChange}
                name="dateRange"
                id="dateRange"
              />
              <Box>
                <Typography sx={{
                    fontSize:'16px', 
                    fontFamily: 'Mukta',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    }}>Who can participate this campaign? Super customers don’t gain points when themselves participate in the campaign.
                </Typography>
                <InputCheckbox label="New Customers" onChecked={toggleAllowNewCustomer} />
                <InputCheckbox label="Super Customers" onChecked={toggleAllowSuperCustomer} />
              </Box>
  
              <PictureUploadCard
                  phrase="Add a campaign image"
                  onFileSelected={uploadMenu}
              />
  
              <Box sx={{display:'flex', justifyContent:'flex-start', width:'100%'}}>
                <InputCheckbox label="This campaign expire after a specific number of customers use it" onChecked={toggleExpiredByNumber} />  
              </Box>    
              <InputText
                label="Number of available codes"
                type = 'numbers'
                value={formData.availableCodes}
                onChange={handleInputChange}
                name="availableCodes"
                id="availableCodes"
                placeholder="Available Codes"
              />
              <Box>
                <Typography sx={{
                    fontSize:'16px', 
                    fontFamily: 'Mukta',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    }}>How much spending by referred customers converts to 1 earning point for your super customer to receive $1.00 discount?
                </Typography>
                <InputText
                  label="$ = 1 point for super customer"
                  value={formData.superCustomerPoints}
                  onChange={handleInputChange}
                  name="superCustomerPoints"
                  id="superCustomerPoints"
                  placeholder="Customers’ spending($)"
                />
              </Box>
              <InputTextarea
                label="Specify the offers"
                value={formData.offer}
                onChange={handleInputChange}
                name="offer"
                id="offer"
                placeholder="describe the offers"
              />
              <InputTextarea
                label="Specify the conditions of campaign"
                value={formData.condition}
                onChange={handleInputChange}
                name="condition"
                id="condition"
                placeholder="Discount on all the menu items except alcoholic drinks "
              />
              <Box sx={{
                display: 'flex', 
                justifyContent: 'space-between',
                alignContent: 'center',
                flexDirection: 'row',
                width: '100%',
              }}>
                <Typography sx={{
                  fontSize:'16px', 
                  color:'#FF5938',
                  fontFamily: 'Mukta',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  }}>Get inspiration for campaign offer and condition</Typography>
                <KeyboardArrowDown sx={{color:'#FF5938'}} onClick={() => setInspirationVisible(!inspirationVisible)} />
              </Box>
                {inspirationVisible && (
                <BulletPoints
                  items={[
                    '"Buy One, Get One Free": Purchase any pizza from our menu and get a second pizza of equal or lesser value for free, valid for dine-in only.',
                    '"Weekend Brunch Bonanza": Indulge in our delectable brunch menu items every Saturday and Sunday, with 10% off for reservations made before 11 am.',
                    '"Happy Hour Delights": Join us for happy hour between 4 pm and 6 pm, and enjoy 50% off select appetizers and discounted drinks.',
                    '"Sweet Treats for Students": Present your valid student ID and get a 15% discount on all desserts and beverages, perfect for satisfying your sweet tooth during study breaks.',
                    '"Family Feast": Feed the whole family with our Family Feast package, including two pizzas, garlic bread, and a family-sized salad for only $35.'
                  ]} 
                />
              )}
          </Form>

          {/* <Form>
              <InputTextarea
                label="Write an attractive campaign advertisement or simply click here to have a compelling ad ready!"
                value={formData.description}
                onChange={handleInputChange}
                name="description"
                id="description"
                placeholder="campaign advertisement"
              />
          </Form> */}

          <InputButton
              onFirstButtonClick={(e) => {
                e.preventDefault();
                console.log('Cancel');
              }}
              onSecondButtonClick={handleSubmit}
              firstButtonText="Cancel"
              secondButtonText="Create"
              type="submit"
            />
        </>
      )}
    </div>
  </>
  );
};

export default Page;
