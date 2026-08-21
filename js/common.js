/* =========================================
   oneFaMiLe
   COMMON JAVASCRIPT
   ========================================= */

function getCurrentUser(){

    try{

        const user =
            JSON.parse(
                sessionStorage.getItem("user")
            );

        return user || null;

    }catch(error){

        console.error(
            "Unable to read current user:",
            error
        );

        return null;
    }
}


function getUserIdentity(){

    const user =
        getCurrentUser();


    if(!user){

        return {

            loginUserName: "",
            email: "",
            mobile: ""

        };

    }


    return {

        loginUserName:
            user.loginUserName || "",

        email:
            user.email || "",

        mobile:
            user.mobile || ""

    };

}
