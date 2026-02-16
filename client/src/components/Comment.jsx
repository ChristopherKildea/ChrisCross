
import { Card, Typography, CardContent, CardActionArea, Stack, Button } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';




function Comment() {



    return ( 
        <Card sx={{borderRadius: 3}}>

            <CardContent variant="subtitle2"> 
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="subtitle2" color="gray">
                    Chris • 02/13/2026
                    </Typography>
                </Stack>
                <Typography variant="body2" align='left' mb={1} sx={{
       
                }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget purus mauris. Vestibulum molestie bibendum nisi consectetur auctor. Aliquam volutpat felis elementum dui euismod suscipit. Ut iaculis neque quis dui volutpat, ut ornare diam pulvinar. Pellentesque accumsan ipsum sed orci rhoncus, tempor aliquam elit maximus. Cras lorem ex, luctus vitae quam a, tempor congue urna. Praesent aliquet mi lectus, auctor varius eros malesuada sit amet.
                </Typography>
            </CardContent>
        </Card>
    );

}


export default Comment