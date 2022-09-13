import React, {useState, useEffect}from "react";
import MkdSDK from "../utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import SnackBar from "../components/SnackBar";
import Table from "./List.jsx";
import DropBox from "./DropBox";
import { showToast } from "../globalContext";
import { useDrop } from 'react-dnd'
import { canMoveRow, moveRow } from './position'




const AdminDashboardPage = (props) => {
  const [videos, setVideo] = useState([])
  const [page, setPage] = useState(0) 


  const remove = (video)=>{
    videos.pop(video)
  }

  React.useEffect(() => {
    let sdk = new MkdSDK();
    sdk.callRestAPI({}, "PAGINATE")
    .then((data) => { setVideo(data.list); setPage(data.page)});
   }, []);

   const navigate = useNavigate();
   const { dispatch } = React.useContext(AuthContext);

   showToast(dispatch, "Logged in")

   const logout = function (){
    dispatch({
      type: "LOGOUT"
    })
    navigate("../admin/login")
   }

   const nextVideo = (page) =>{
      let sdk = new MkdSDK();
      console.log(page)
      sdk.callRestAPI({
        payload: {},
        page: page + 1,
        limit: 10
      }, "PAGINATE")
      .then((data) => { 
        setVideo(data.list)
        setPage(page + 1)})
     };

     const prevVideo = (page) =>{
      let sdk = new MkdSDK();
      sdk.callRestAPI({
        page: page -1,
        limit: 10
      }, "PAGINATE")
      .then((data) => { 
        setVideo(data.list)
        setPage(page - 1)})
     };

  return (
      <div className="" >
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px- 4 rounded focus:outline-none focus:shadow-outline"
          onClick ={logout}> Logout </button>
        </div>
        <Table videos = {videos} remove = {remove}/>
        < div className="flex flex-row justify-between mt-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => {prevVideo(page)}}>Previous</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => {nextVideo(page)}}>Next</button> 
        </div>
        <DropBox remove = {remove}/>
        <SnackBar />
      </div>
  );
};

export default AdminDashboardPage;
