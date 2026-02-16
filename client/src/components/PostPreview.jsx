
import { Card, Typography, CardContent, CardActionArea, Stack, Button } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';




function PostPreview() {


    const handleCardClick = () => {
      console.log("Clicked post preview")
    };

    return ( 
        <Card sx={{borderRadius: 3}}>
            <CardActionArea component="div" onClick={handleCardClick}>
                <CardContent variant="subtitle2"> 
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle2" color="gray">
                        Chris • 02/13/2026
                        </Typography>
                    </Stack>
                    <Typography variant="h6" align='left' mb={1}>Title</Typography>
                    <Typography variant="body2" align='left' mb={1} sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                        overflow: "hidden",
                    }}>
                        Hii
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget purus mauris. Vestibulum molestie bibendum nisi consectetur auctor. Aliquam volutpat felis elementum dui euismod suscipit. Ut iaculis neque quis dui volutpat, ut ornare diam pulvinar. Pellentesque accumsan ipsum sed orci rhoncus, tempor aliquam elit maximus. Cras lorem ex, luctus vitae quam a, tempor congue urna. Praesent aliquet mi lectus, auctor varius eros malesuada sit amet. */}
                    </Typography>

                    <Stack direction={"row"} align='left' spacing={1}>
                        <Button startIcon={<FavoriteBorderOutlinedIcon /> } 
                            sx={{ borderRadius: "15px", textTransform: "none", color: "white" }}
                        >
                            123
                        </Button>

                        <Stack direction="row" alignItems="center" spacing={0.5} sx={{color: "white"}}>
                            <AddCommentOutlinedIcon fontSize="small"/>
                            <Typography variant="button">123</Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );

}


export default PostPreview