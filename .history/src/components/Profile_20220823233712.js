import IsLogin from "../utils/isLogin";
import { makeStyles } from "@mui/styles";
import { Avatar, Box, ButtonBase, InputAdornment, Typography } from "@mui/material";
import Input from "./Input";
import { useState } from "react";
import { uploadImages } from "../services";
import Edit from "@mui/icons-material/Edit";

const useStyles = makeStyles({
  card: {
    height: "60vh",
    width: "40vw",
    background: "#2B2B2B",
    borderRadius: "8px",
    padding: "32px",
  },
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Profile() {
  let objectURL;
  const [image, setImage] = useState();
  const { user, signed } = IsLogin();
  const classes = useStyles();

  const onChangeFile = (e) => {
    if (objectURL) {
      URL.revokeObjectURL(objectURL);
    }
    const file = e.target.files[0];
    objectURL = URL.createObjectURL(file);
    console.log(file);
    uploadImages({ images: file });
    return setImage(objectURL);
  };


  return (
    <>
      <Box className={classes.container}>
        <Box className={`${classes.card} shadow`}>
          <Box display="inline-flex" width='100%' justifyContent={'center'}>
            <Box onClick={() => document.getElementById("uploadImg").click()}>
              <Avatar id="halo" sx={{ width: '72px', height: '72px' }} src={image ? image : user.picture}></Avatar>
            </Box>
          </Box>

          <Box>
            <Box pb={1}>
              <Input
                id={"uploadImg"}
                type="file"
                inputType={"file"}
                hdlChange={onChangeFile}
                className={{ display: 'none' }}
              />
            </Box>
            <Box pb={2}>
              <Typography>Username</Typography>
              <Input type="email" defVal={user.user} isdisabled={true} icon={{
                endAdornment: (<Edit />)
              }} />
            </Box>
            <Typography>E-mail</Typography>
            <Input type="email" defVal={user.email} isdisabled />
            <Box pt={2}>
              <Input type="buttonCustom">Reset Password</Input>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
