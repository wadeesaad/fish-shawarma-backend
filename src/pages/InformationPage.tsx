import { Container, Typography } from "@mui/material";
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import LockRoundedIcon from '@mui/icons-material/LockRounded';



import BedtimeRoundedIcon from '@mui/icons-material/BedtimeRounded';
// import { useEffect, useState } from "react";
// import type { workTime } from "../types/workTime";

 
export const InformationPage = () => {

  // const [workTime ,SetworkTime]=useState<workTime[]>([]);
  // const[error , Seterror]=useState(false)
 
  // useEffect(()=>{
  //   const fetchData=async()=>{
  //     try {
  //       const response=await fetch('http://localhost:3001/api/time')
  //       const data=await response.json()
  //       SetworkTime(data.data)

  //     } catch (error) {
  //       Seterror(true)
  //     }

  //   }
  //   fetchData()
  // } ,[])
  //   if(error){
  //   return(<Box>Something went wrong</Box>)
  // }
  //  if (workTime.length === 0) {
  //   return <Box>Loading...</Box>;
  // }
  // console.log(workTime);
  
  
    
  return (
    
    <Container sx={{display:"flex" , flexDirection:"column" , gap:"20px" , marginTop:"10px" , height:"100vh"}}>
      
      <Typography sx={{display:"flex" , gap:"4px"}}>
        <KeyOutlinedIcon sx={{color:"#FED16A"}}/>
        <Typography>OPEN-TIME: 12 PM</Typography>
      </Typography>

      <Typography sx={{display:"flex" , gap:"4px"}}>
        <LockRoundedIcon sx={{color:"#FED16A"}}/>
        <Typography>CLOSING-TIME: 11:30 PM</Typography>
      </Typography>

      <Typography sx={{display:"flex" , gap:"4px"}}>
        <BedtimeRoundedIcon sx={{color:"#FED16A"}}/>
        <Typography>HOLIDAY:NONE</Typography>
      </Typography>
    </Container>
  );
};
