import React from "react";
import MkdSDK from "../utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";


const AdminDashboardPage = () => {
  console.log(window.localStorage)

  React.useEffect(() => {
    let sdk = new MkdSDK();
    sdk.callRestAPI({}, "PAGINATE")
    .then((data) => { console.log(data)})
   }, []);

   const navigate = useNavigate();
   const { dispatch } = React.useContext(AuthContext);

   const logout = function (){
    dispatch({
      type: "LOGOUT"
    })
    navigate("../admin/login")
   }

  return (
    <>
      <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick ={logout}> Logout </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
