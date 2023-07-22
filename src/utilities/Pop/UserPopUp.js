import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const UserPopup = ({ onClose }) => {
  
  return (
    
    <div id='popup' className='popup LoginSignupPopup_container'>
            <div className="LoginSignupPopup_cuntent_ui">
            <div className="bg-logo" style={{margin:'20px auto'}}></div>
                <h3>Subscribtion Required</h3>
                <p>Unlock a treasure trove of speaking opportunities.</p>
                <div className="login-google">
                <div className='LoginSignupPopup_button' style={{background:'#24754F'}}>
                    <Link to='/subscription'><p style={{ color: 'white'}}>Join Now</p></Link>
                </div>
                </div>
                {/* <p className="close-button" onClick={onClose}>Close</p> */}
            </div>
        </div>
    
  );
};

export default UserPopup;



{/* <div className="popup">
      <div className="popup-content">
        <button class="google-login-button" onClick={handleGoogleLogin}>
          <span class="google-logo"></span>
          Sign in with Google
        </button>
        <button className="facebook-button" onClick={handleFacebookLogin}>Login with Facebook</button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div> */}
// import React from 'react'
// import './LoginSignupPopup.css'
// // import { google_icon } from '../../assets/img/google_icon.svg'

// const LoginSignupPopup = () => {
//     return (
//         <div className='LoginSignupPopup_container'>
//             <div className="LoginSignupPopup_cuntent_ui">
//                 <h3>Sign Up!</h3>
//                 <p>Signup to SpeakerOre using your gmail account</p>
//                 <div className='LoginSignupPopup_button'>
//                     <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M27.8672 13.2736H26.8606V13.2217H15.6137V18.2217H22.6761C21.6458 21.1323 18.8772 23.2217 15.6137 23.2217C11.473 23.2217 8.1158 19.8636 8.1158 15.7217C8.1158 11.5798 11.473 8.22168 15.6137 8.22168C17.5251 8.22168 19.2639 8.94293 20.588 10.1211L24.1226 6.58543C21.8907 4.5048 18.9053 3.22168 15.6137 3.22168C8.71251 3.22168 3.11719 8.81855 3.11719 15.7217C3.11719 22.6248 8.71251 28.2217 15.6137 28.2217C22.5149 28.2217 28.1102 22.6248 28.1102 15.7217C28.1102 14.8836 28.024 14.0654 27.8672 13.2736Z" fill="#FFC107" />
//                         <path d="M4.55762 9.90355L8.66335 12.9154C9.77429 10.1642 12.4648 8.22168 15.6133 8.22168C17.5246 8.22168 19.2635 8.94293 20.5875 10.1211L24.1222 6.58543C21.8903 4.5048 18.9049 3.22168 15.6133 3.22168C10.8134 3.22168 6.65079 5.9323 4.55762 9.90355Z" fill="#FF3D00" />
//                         <path d="M15.6143 28.2217C18.8421 28.2217 21.7751 26.9861 23.9926 24.9767L20.1249 21.703C18.8281 22.6895 17.2435 23.223 15.6143 23.2217C12.3639 23.2217 9.60409 21.1486 8.56437 18.2555L4.48926 21.3961C6.55743 25.4442 10.7575 28.2217 15.6143 28.2217Z" fill="#4CAF50" />
//                         <path d="M27.8677 13.2736H26.8611V13.2217H15.6143V18.2217H22.6767C22.1838 19.6069 21.296 20.8174 20.123 21.7036L20.1249 21.7023L23.9926 24.9761C23.7189 25.2248 28.1108 21.9717 28.1108 15.7217C28.1108 14.8836 28.0246 14.0654 27.8677 13.2736Z" fill="#1976D2" />
//                     </svg>
//                     <p>Continue with google</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default LoginSignupPopup
