import React, {useState, useEffect}from "react";
import MkdSDK from "../utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import SnackBar from "../components/SnackBar";
import { showToast } from "../globalContext"



const AdminDashboardPage = () => {
  const [videos, setVideo] = useState([])
  const [page, setPage] = useState(0)


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
    <>
      <div className="" >
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick ={logout}> Logout </button>
        </div>
        <div>
          <table className="table-auto border-collapse p-16 rounded-2xl">
            <thead>
              <tr>
                <th className=" px-6 py-3">#</th>
                <th className=" px-6 py-3">Title</th>
                <th className=" px-6 py-3"></th>
                <th className=" px-6 py-3">Author</th>
                <th className=" px-6 py-3">Most Liked</th>
              </tr>
            </thead>
            <tbody>
            {videos ? videos.map((video) => { return (
              <tr key={video.id}>
                <td className="border  px-6 py-3">{video.id}</td>
                <td className="border  px-6 py-3"><img src={video.photo} alt="photos"/></td>
                <td className="border  px-6 py-3">{video.title}</td>
                <td className="border  px-6 py-3">{video.username}</td>
                <td className="border  px-6 py-3">{video.like}</td>
              </tr>
            )})
            : null}
            </tbody>
          </table>
        </div>
        < div className="flex flex-row justify-between mt-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => {prevVideo(page)}}>Previous</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => {nextVideo(page)}}>Next</button> 
        </div>
        <SnackBar />
      </div>
    </>
  );
};

export default AdminDashboardPage;
