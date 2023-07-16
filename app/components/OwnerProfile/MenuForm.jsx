import React, { useState, useEffect } from 'react';
import { Box, Button } from "@mui/material";
import SubHeader from "../Header/SubHeader";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import PictureUploadCard from '../Button/PictureUploadCard';
import Form from '../Card/Form';

const MenuForm = ({ uploadMenu, initialImages }) => {
    const [imagesAndMenusVisible, setImagesAndMenusVisible] = useState(true);
    const [previews, setPreviews] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (Array.isArray(initialImages)) {
            setPreviews(initialImages);
        } else if (typeof initialImages === 'string') {
            setPreviews([initialImages]); // if initialImages is a string, put it in an array
        } else {
            setPreviews([]); // for any other cases, set previews to an empty array
        }
    }, [initialImages]);
    

    const handleUploadMenu = (files) => {
        const allFiles = Array.from(files);
        uploadMenu(allFiles);

        Promise.all(allFiles.map(file => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve, reject) => {
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
            });
        })).then(values => {
            setPreviews(values);
            setFiles(allFiles);
        });
    };

    const removePreview = (index) => {
        setFiles(files.filter((_, i) => i !== index));
        setPreviews(previews.filter((_, i) => i !== index));
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
                <SubHeader>Images & Menus</SubHeader>
                <KeyboardArrowDown
                    onClick={() => setImagesAndMenusVisible(!imagesAndMenusVisible)}
                />
            </Box>
            {imagesAndMenusVisible && (
                <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                    <PictureUploadCard
                        phrase="Upload Menus"
                        onFileSelected={handleUploadMenu}
                    />
                    {previews.map((preview, index) => (
                        <Box key={index} sx={{ position: 'relative', margin: '10px' }}>
                            <Button 
                                onClick={() => removePreview(index)} 
                                sx={{
                                    position: 'absolute', 
                                    top: -10, 
                                    right: -20, 
                                    zIndex: 1,
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: 'red',
                                    },
                                }}
                            >
                                X
                            </Button>
                            <img src={preview} alt="preview" style={{ width: '100px', height: '100px' }} />
                        </Box>
                    ))}
                </Box>
            )}
        </Form>
    );
};

export default MenuForm;
