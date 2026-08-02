/* =====================================
oneFaMiLe V1
Part 1A.3
===================================== */
/* WELCOME SCREEN */
const API_URL ="https://script.google.com/macros/s/AKfycbzYblwgxrGFDF2MKhiWLvrlSLdJTIgQoplD0Z2-A_tLmwrdUPWsTqzOF9-txnug4DFLpg/exec";
let otpMode = "signup";
const loginSubmitBtn =
document.getElementById("loginSubmitBtn");
const forgotOTP = document.getElementById("forgotOTP");
const registerOTP = document.getElementById("registerOTP");
const resetPassCodePage = document.getElementById("resetPassCodePage");
const newPassCode = document.getElementById("newPassCode");

const confirmNewPassCode = document.getElementById("confirmNewPassCode");
const saveNewPassCodeBtn = document.getElementById("saveNewPassCodeBtn");

const backResetPassCodeBtn = document.getElementById("backResetPassCodeBtn");

const signupPassCodeBox =
document.getElementById("signupPassCodeBox");

const signupConfirmPassCodeBox =
document.getElementById("signupConfirmPassCodeBox");
const toggleNewPassCode =
document.getElementById("toggleNewPassCode");

const toggleConfirmNewPassCode =
document.getElementById("toggleConfirmNewPassCode");


const menuBtn =
document.getElementById("menuBtn");

const sideMenu =
document.getElementById("sideMenu");

const menuOverlay =
document.getElementById("menuOverlay");

const closeMenuBtn =
document.getElementById("closeMenuBtn");

const logoutMenuBtn =
document.getElementById("logoutMenuBtn");

const passcodeMenuBtn =
document.getElementById("passcodeMenuBtn");

const welcomeHeading=
document.getElementById("welcomeHeading");

const welcomeSlogan=
document.getElementById("welcomeSlogan");

const welcomeAbout=
document.getElementById("welcomeAbout");

const welcomePage =
document.getElementById("welcomePage");

/* LOGIN SCREEN */

const loginPage =
document.getElementById("loginPage");


/* OTP SCREEN */

const otpPage =
document.getElementById("otpPage");


/* DASHBOARD */

const dashboard =
document.getElementById("dashboard");
const signupPage =
document.getElementById("signupPage");

const signupOTPPage =
document.getElementById("signupOTPPage");

const signupOTPBtn =
document.getElementById("signupOTPBtn");

const registerBtn =
document.getElementById("registerBtn");

const backSignupBtn =
document.getElementById("backSignupBtn");

const backSignupOTPBtn =
document.getElementById("backSignupOTPBtn");

/* BUTTONS */

const loginBtn =
document.getElementById("loginBtn");

const signupBtn =
document.getElementById("signupBtn");

const verifyOTPBtn =
document.getElementById("verifyOTPBtn");

const backLoginBtn =
document.getElementById("backLoginBtn");
const forgotPassCodeBtn =
document.getElementById("forgotPassCodeBtn");

const forgotPassCodePage =
document.getElementById("forgotPassCodePage");
const sendForgotOTPBtn =
document.getElementById("sendForgotOTPBtn");

const forgotMobileNo =
document.getElementById("forgotMobileNo");

const backForgotBtn =
document.getElementById("backForgotBtn");

const backOTPBtn =
document.getElementById("backOTPBtn");
const homeContent =
document.getElementById(
"homeContent"
);

const homeTemplate = homeContent.innerHTML;
const expensesBtn =
document.getElementById(
"expensesBtn"
);


const activitiesBtn =
document.getElementById(
"activitiesBtn"
);


const loansBtn =
document.getElementById(
"loansBtn"
);


const incomeBtn =
document.getElementById(
"incomeBtn"
);


const healthBtn =
document.getElementById(
"healthBtn"
);


const homeBtn =
document.getElementById(
"homeBtn"
);
const familyBtn =
document.getElementById("familyBtn");

const memoriesBtn =
document.getElementById("memoriesBtn");

const chartsBtn =
document.getElementById("chartsBtn");

const reportsBtn =
document.getElementById("reportsBtn");
const languageSelect =
document.getElementById("languageSelect");

const toggleSensitivePassCode =
document.getElementById("toggleSensitivePassCode");
let otpInterval = null;
let otpSeconds = 30; // 0.5 Minutes
let otpResendCount = 0;
const MAX_OTP_RESEND = 3;
const OTP_COOLDOWN = 60;
let cooldownInterval = null;
let cooldownSeconds = OTP_COOLDOWN;
let otpCooldownRunning = false;
const resendSignupOTPBtn =
document.getElementById("resendSignupOTPBtn");

const signupOtpTimer =
document.getElementById("signupOtpTimer");

const otpLimitMsg =
document.getElementById("otpLimitMsg");

const otpSendingMsg =
document.getElementById("otpSendingMsg");
const cooldownTimer =
document.getElementById("cooldownTimer");
/* =====================================
CHANGE PASSWORD
===================================== */

const changePasswordPage =
document.getElementById("changePasswordPage");

const oldPassCode =
document.getElementById("oldPassCode");

const changeNewPassCode =
document.getElementById("changeNewPassCode");

const changeConfirmPassCode =
document.getElementById("changeConfirmPassCode");

const changePasswordBtn =
document.getElementById("changePasswordBtn");

const backChangePasswordBtn =
document.getElementById("backChangePasswordBtn");

const toggleOldPassCode =
document.getElementById("toggleOldPassCode");

const toggleChangeNewPassCode =
document.getElementById("toggleChangeNewPassCode");

const toggleChangeConfirmPassCode =
document.getElementById("toggleChangeConfirmPassCode");

/* ===========================
   VALIDATION FUNCTIONS
=========================== */

function isValidName(value){

return /^[A-Za-z .'-]+$/.test(value);
}

function isValidMobile(value){

    return /^[6-9][0-9]{9}$/.test(value);

}

function isValidEmail(value){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

}

function isAdult(dateValue){

    const dob = new Date(dateValue);
    const today = new Date();

    if(dob > today){
        return false;
    }

    let age = today.getFullYear() - dob.getFullYear();

    const month = today.getMonth() - dob.getMonth();

    if(month < 0 || (month === 0 && today.getDate() < dob.getDate())){
        age--;
    }

    return age >= 18;

}

function isValidPassCode(value){

    return /^[0-9]{6}$/.test(value);

}
/* =====================================
COMMON PAGE ARRAY
===================================== */
// Signup OTP - Numbers Only
registerOTP.addEventListener("input", function () {

    this.value = this.value.replace(/\D/g, "");

});

// Forgot OTP - Numbers Only
forgotOTP.addEventListener("input", function () {

    this.value = this.value.replace(/\D/g, "");

});
const allPages = [
    welcomePage,
    loginPage,
    signupPage,
    signupOTPPage,
    forgotPassCodePage,
    resetPassCodePage,
    changePasswordPage,
    dashboard
];


toggleOldPassCode.onclick = function () {
    if (oldPassCode.type === "password") {
        oldPassCode.type = "text";
        toggleOldPassCode.innerHTML =
            '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        oldPassCode.type = "password";
        toggleOldPassCode.innerHTML =
            '<i class="fa-solid fa-eye"></i>';
    }
};

toggleChangeNewPassCode.onclick = function () {
    if (changeNewPassCode.type === "password") {
        changeNewPassCode.type = "text";
        toggleChangeNewPassCode.innerHTML =
            '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        changeNewPassCode.type = "password";
        toggleChangeNewPassCode.innerHTML =
            '<i class="fa-solid fa-eye"></i>';
    }
};

toggleChangeConfirmPassCode.onclick = function () {
    if (changeConfirmPassCode.type === "password") {
        changeConfirmPassCode.type = "text";
        toggleChangeConfirmPassCode.innerHTML =
            '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        changeConfirmPassCode.type = "password";
        toggleChangeConfirmPassCode.innerHTML =
            '<i class="fa-solid fa-eye"></i>';
    }
};


/* =====================================
HIDE ALL PAGES
===================================== */

function hideAllPages(){

    allPages.forEach(page=>{

        if(page){

            page.classList.add("hidden");

        }

    });

}

/* =====================================
SHOW PAGE
===================================== */

function showScreen(page){

    hideAllPages();

    page.classList.remove("hidden");

}

/* =====================================
OTP TIMER
===================================== */
function startOtpTimer(timerId){

    clearInterval(otpInterval);

    // Enable buttons
    document.getElementById("verifyOTPBtn")?.removeAttribute("disabled");
    document.getElementById("registerBtn")?.removeAttribute("disabled");

    // Hide Resend button
    resendSignupOTPBtn.classList.add("hidden");
    signupOtpTimer.classList.remove("hidden");
resendSignupOTPBtn.classList.add("hidden");
otpLimitMsg.classList.add("hidden");
    otpSeconds = 30;   // Test

    updateOtpTimer(timerId);

    otpInterval = setInterval(() => {

        otpSeconds--;

        updateOtpTimer(timerId);

        if(otpSeconds <= 0){

            clearInterval(otpInterval);

            document.getElementById("verifyOTPBtn")?.setAttribute("disabled","true");
            document.getElementById("registerBtn")?.setAttribute("disabled","true");

            // Show Resend button
            signupOtpTimer.classList.add("hidden");

            resendSignupOTPBtn.classList.remove("hidden");
        }

    },1000);

}
function startCooldown(){

    otpCooldownRunning = true;

    cooldownSeconds = OTP_COOLDOWN;

    resendSignupOTPBtn.classList.add("hidden");

    otpLimitMsg.classList.remove("hidden");

    updateCooldown();

    clearInterval(cooldownInterval);

    cooldownInterval = setInterval(()=>{

        cooldownSeconds--;

        updateCooldown();

        if(cooldownSeconds<=0){

            clearInterval(cooldownInterval);

            otpCooldownRunning = false;

            otpResendCount = 0;

            otpLimitMsg.classList.add("hidden");

            resendSignupOTPBtn.classList.remove("hidden");

        }

    },1000);

}

function updateCooldown(){

    const min = String(Math.floor(cooldownSeconds/60)).padStart(2,"0");

    const sec = String(cooldownSeconds%60).padStart(2,"0");

    cooldownTimer.textContent = `${min}:${sec}`;

}
function updateOtpTimer(timerId){

    const timer = document.getElementById(timerId);

    if(!timer) return;

    const min = String(Math.floor(otpSeconds / 60)).padStart(2,"0");
    const sec = String(otpSeconds % 60).padStart(2,"0");

    timer.textContent = `${min}:${sec}`;

    // Blue → Orange → Red

    if(otpSeconds > 20){

        timer.style.color = "#2A6EB0";

    }
    else if(otpSeconds > 10){

        timer.style.color = "#ff9800";

    }
    else{

        timer.style.color = "#d32f2f";

    }

    // Last 5 Seconds Blink

    if(otpSeconds <= 5){

        timer.classList.add("otp-blink");

    }else{

        timer.classList.remove("otp-blink");

    }

}

/* =====================================
CLEAR OTP
===================================== */

function clearOTP(){

const otpInput =
document.querySelector("#signupOTPPage input[type='text']");

if(otpInput){

otpInput.value="";

}

}

/* =====================================
CLEAR RESET PASS CODE
===================================== */

function clearResetPassCode(){

newPassCode.value="";
confirmNewPassCode.value="";

}
/* =====================================
CLEAR FORGOT PASS CODE
===================================== */

function clearForgotPassCode(){

forgotMobileNo.value="";

}

/* =====================================
CLEAR LOGIN
===================================== */

function clearLogin(){

loginId.value="";
loginPassCode.value="";

}

/* =====================================
FOCUS
===================================== */

function setFocus(control){

if(control){

control.focus();

}

}

languageSelect.onchange = function(){

    updateWelcomePage();

    if(!dashboard.classList.contains("hidden")){

        homeBtn.click();

    }

};
function updateWelcomePage(){

    const txt = languageData[languageSelect.value];

    // Login Welcome Page
    welcomeHeading.innerHTML = txt.welcome;
    welcomeSlogan.innerHTML = txt.slogan.join("<br>");
    welcomeAbout.innerHTML = txt.about;

    // Home Welcome Page
  const homeHeading = document.getElementById("homeWelcomeHeading");
const homeSlogan = document.getElementById("homeWelcomeSlogan");
const homeAbout = document.getElementById("homeWelcomeAbout");

if(homeHeading){

    homeHeading.innerHTML = txt.welcome;

    homeSlogan.innerHTML = txt.slogan.join("<br>");

    homeAbout.innerHTML = txt.about;

}

}
function showPage(html){

   hideNavigation();

    homeContent.scrollTop = 0;
    window.scrollTo(0,0);

    homeContent.innerHTML = html;

}
function pageTitle(title,image){

return `

<h2 class="page-title">

<img
src="${image}"
class="title-icon">

<span>

${title}

</span>

</h2>

`;

}



function setActiveButton(btn){

document.querySelectorAll(
".top-container button, .bottom-container button"
).forEach(button=>{

button.classList.remove("active");

const img = button.querySelector("img");

if(img){

img.src = img.dataset.normal;

}

});

btn.classList.add("active");

const activeImg = btn.querySelector("img");

if(activeImg){

activeImg.src = activeImg.dataset.active;

}

}

activitiesBtn.onclick = ()=>{

    setActiveButton(activitiesBtn);

    showPage(

pageTitle(
"Activities",
"images/colorbtns/Activities1.png"
)

+`
<div class="grid-3x2">
<button class="grid-btn" id="addActivitiesBtn">

<img
src="images/colorbtns/Add1.png"
class="btn-icon">

<span>

Add Activity

</span>

</button>


<button class="grid-btn" id="reportsActivitiesBtn">

<img
src="images/colorbtns/Reports1.png"
class="btn-icon">

<span>

Reports

</span>

</button>


<button class="grid-btn" id="sensitiveActivitiesBtn">

<img
src="images/colorbtns/SensitiveReports1.png"
class="btn-icon">

<span>

Sensitive Reports

</span>

</button>


<button class="grid-btn" id="allReportsActivitiesBtn">

<img
src="images/colorbtns/AllReports1.png"
class="btn-icon">

<span>

All Reports

</span>

</button>


<button class="grid-btn" id="searchActivitiesBtn">

<img
src="images/colorbtns/CustomSearch1.png"
class="btn-icon">

<span>

Custom Search

</span>

</button>


<button class="grid-btn" id="aboutActivitiesBtn">

<img
src="images/colorbtns/About1.png"
class="btn-icon">

<span>

About

</span>

</button>


</div>

<div align="center">

<button
id="activitiesBackBtn"
class="back-btn">

← Back

</button>

</div>

`);

document.getElementById("reportsActivitiesBtn").onclick = ()=>{

    reportsLayout(

        "Activities Reports",

        ()=>activitiesBtn.click()

    );

};

    
document.getElementById("sensitiveActivitiesBtn").onclick = ()=>{

    openSensitive(

        "Activities",

        "Sensitive Reports",

        ()=>activitiesBtn.click()

    );

};
document.getElementById("allReportsActivitiesBtn").onclick = ()=>{

    openSensitive(

        "Activities",

        "All Reports",

        ()=>activitiesBtn.click()

    );

};    
document.getElementById("activitiesBackBtn").onclick = showHome;

};
incomeBtn.onclick = ()=>{

    setActiveButton(incomeBtn);

    showPage(

pageTitle(
"Income",
"images/colorbtns/Income1.png"
)

+`
<div class="grid-3x2">

<button class="grid-btn" id="addIncomeBtn">

<img
src="images/colorbtns/Add1.png"
class="btn-icon">

<span>

Add Income

</span>

</button>

<button
id="incomeReports"
class="grid-btn">

<img
src="images/colorbtns/Reports1.png"
class="btn-icon">

<span>

Reports

</span>

</button>

<button
id="incomeSensitive"
class="grid-btn">

<img
src="images/colorbtns/SensitiveReports1.png"
class="btn-icon">

<span>

Sensitive Reports

</span>

</button>

<button
id="incomeAll"
class="grid-btn">

<img
src="images/colorbtns/AllReports1.png"
class="btn-icon">

<span>

All Reports

</span>

</button>

<button
id="incomeSearch"
class="grid-btn">

<img
src="images/colorbtns/CustomSearch1.png"
class="btn-icon">

<span>

Custom Search

</span>

</button>

<button
id="incomeAbout"
class="grid-btn">

<img
src="images/colorbtns/About1.png"
class="btn-icon">

<span>

About

</span>

</button>

</div>

<div align="center">

<button
id="incomeBack"
class="back-btn">

← Back

</button>

</div>

`);

document.getElementById("incomeReports").onclick=()=>{

    reportsLayout(

    "Income Reports",

    ()=>incomeBtn.click()

);

};

document.getElementById("incomeSensitive").onclick = ()=>{

    openSensitive(

        "Income",

        "Sensitive Reports",

        ()=>incomeBtn.click()

    );

};

document.getElementById("incomeAll").onclick = ()=>{

    openSensitive(

        "Income",

        "All Reports",

        ()=>incomeBtn.click()

    );

};

document.getElementById("incomeBack").onclick=showHome;

};


healthBtn.onclick = ()=>{
    

    setActiveButton(healthBtn);

    showPage(

pageTitle(
"Health",
"images/colorbtns/Health1.png"
)

+`
<div class="grid-3x2">

<button class="grid-btn" id="addHealthBtn">

<img
src="images/colorbtns/Add1.png"
class="btn-icon">

<span>

Add Health

</span>

</button>


<button
id="healthReports"
class="grid-btn">

<img
src="images/colorbtns/Reports1.png"
class="btn-icon">

<span>

Reports

</span>

</button>


<button
id="healthSensitive"
class="grid-btn">

<img
src="images/colorbtns/SensitiveReports1.png"
class="btn-icon">

<span>

Sensitive Reports

</span>

</button>


<button
id="healthAll"
class="grid-btn">

<img
src="images/colorbtns/AllReports1.png"
class="btn-icon">

<span>

All Reports

</span>

</button>


<button
id="healthSearch"
class="grid-btn">

<img
src="images/colorbtns/CustomSearch1.png"
class="btn-icon">

<span>

Custom Search

</span>

</button>


<button
id="healthAbout"
class="grid-btn">

<img
src="images/colorbtns/About1.png"
class="btn-icon">

<span>

About

</span>

</button>

</div>

<div align="center">

<button
id="healthBack"
class="back-btn">

← Back

</button>

</div>

`);

document.getElementById("healthReports").onclick = ()=>{

    reportsLayout(

    "Health Reports",

    ()=>healthBtn.click()

);

};

document.getElementById("healthSensitive").onclick = ()=>{

    openSensitive(

        "Health",

        "Sensitive Reports",

        ()=>healthBtn.click()

    );

};

document.getElementById("healthAll").onclick = ()=>{

    openSensitive(

        "Health",

        "All Reports",

        ()=>healthBtn.click()

    );

};
document.getElementById("healthBack").onclick = showHome;

};

loansBtn.onclick = ()=>{
setActiveButton(loansBtn);
    
showPage(

pageTitle(
"Loans",
"images/colorbtns/Loans1.png"
)

+`
<div class="grid-2">

<button id="loanBtn" class="grid-btn">

<img
src="images/colorbtns/Loans1.png"
class="btn-icon">

<span>

Loans

</span>

</button>

<button id="paymentsBtn" class="grid-btn">

<img
src="images/colorbtns/Payments1.png"
class="btn-icon">

<span>

Payments

</span>

</button>

</div>

<div align="center">

<button
id="loanBack"
class="back-btn">

← Back

</button>

</div>

`);

document.getElementById(
"loanBtn"
).onclick=()=>{

showLendBorrow("Loan");

};

document.getElementById(
"paymentsBtn"
).onclick=()=>{

showLendBorrow("Payments");

};

document.getElementById(
"loanBack"
).onclick = ()=>{

showHome();
};

};


function showLendBorrow(type){

showPage(`

${pageTitle(
type,
type === "Loan"
? "images/colorbtns/Loans1.png"
: "images/colorbtns/Payments1.png"
)}
<div class="grid-2">

<button id="lendBtn" class="grid-btn">

<img
src="images/colorbtns/Lend1.png"
class="btn-icon">

<span>

Lend

</span>

</button>

<button id="borrowBtn" class="grid-btn">

<img
src="images/colorbtns/Borrowed1.png"
class="btn-icon">

<span>

Borrowed

</span>

</button>
</div>

<div align="center">

<button id="lendBorrowBack"
class="back-btn">

← Back

</button>

</div>

`);

document.getElementById(
"lendBorrowBack"
).onclick = ()=>{

loansBtn.click();

};

document.getElementById(
"lendBtn"
).onclick=()=>{

showPage(`

${pageTitle(
type + " - Lend",
type === "Loan"
? "images/colorbtns/Loans1.png"
: "images/colorbtns/Payments1.png"
)}

<div class="grid-3x2">

<button class="grid-btn">

<img
src="images/colorbtns/Add1.png"
class="btn-icon">

<span>

Add Lend

</span>

</button>

<button id="lendReports" class="grid-btn">

<img
src="images/colorbtns/Reports1.png"
class="btn-icon">

<span>

Reports

</span>

</button>

<button id="lendSensitive" class="grid-btn">

<img
src="images/colorbtns/SensitiveReports1.png"
class="btn-icon">

<span>

Sensitive Reports

</span>

</button>

<button id="lendAll" class="grid-btn">

<img
src="images/colorbtns/AllReports1.png"
class="btn-icon">

<span>

All Reports

</span>

</button>

<button class="grid-btn">

<img
src="images/colorbtns/CustomSearch1.png"
class="btn-icon">

<span>

Custom Search

</span>

</button>

<button class="grid-btn">

<img
src="images/colorbtns/About1.png"
class="btn-icon">

<span>

About

</span>

</button>

</div>

<div align="center">

<button
id="lendBack"
class="back-btn">

← Back

</button>

</div>

`);

document.getElementById("lendReports").onclick = ()=>{

    reportsLayout(
        type + " - Lend Reports",
        ()=>showLendBorrow(type)
    );

};

document.getElementById("lendSensitive").onclick = ()=>{

    openSensitive(
        type + " - Lend",
        "Sensitive Reports",
        ()=>showLendBorrow(type)
    );

};

document.getElementById("lendAll").onclick = ()=>{

    openSensitive(
        type + " - Lend",
        "All Reports",
        ()=>showLendBorrow(type)
    );

};
    
document.getElementById(
"lendBack"
).onclick=()=>{

showLendBorrow(type);

};

};

document.getElementById(
"borrowBtn"
).onclick=()=>{

showPage(`

${pageTitle(
type + " - Borrowed",
type === "Loan"
? "images/colorbtns/Loans1.png"
: "images/colorbtns/Payments.png"
)}

<div class="grid-3x2">

<button class="grid-btn">

<img
src="images/colorbtns/Add1.png"
class="btn-icon">

<span>

Add Borrowed

</span>

</button>

<button
id="borrowReports"
class="grid-btn">

<img
src="images/colorbtns/Reports1.png"
class="btn-icon">

<span>

Reports

</span>

</button>

<button
id="borrowSensitive"
class="grid-btn">

<img
src="images/colorbtns/SensitiveReports1.png"
class="btn-icon">

<span>

Sensitive Reports

</span>

</button>

<button
id="borrowAll"
class="grid-btn">

<img
src="images/colorbtns/AllReports1.png"
class="btn-icon">

<span>

All Reports

</span>

</button>

<button class="grid-btn">

<img
src="images/colorbtns/CustomSearch1.png"
class="btn-icon">

<span>

Custom Search

</span>

</button>

<button class="grid-btn">

<img
src="images/colorbtns/About1.png"
class="btn-icon">

<span>

About

</span>

</button>

</div>
<div align="center">

<button
id="borrowBack"
class="back-btn">

← Back

</button>

</div>

`);

document.getElementById("borrowReports").onclick = ()=>{

    reportsLayout(
        type + " - Borrowed Reports",
        ()=>showLendBorrow(type)
    );

};

document.getElementById("borrowSensitive").onclick = ()=>{

    openSensitive(
        type + " - Borrowed",
        "Sensitive Reports",
        ()=>showLendBorrow(type)
    );

};

document.getElementById("borrowAll").onclick = ()=>{

    openSensitive(
        type + " - Borrowed",
        "All Reports",
        ()=>showLendBorrow(type)
    );

};
  
document.getElementById(
"borrowBack"
).onclick=()=>{

showLendBorrow(type);

};

};
}
  /* ======================

LOGIN

====================== */

loginBtn.onclick = ()=>{

    clearLogin();

    showScreen(loginPage);

    setFocus(loginId);

};

/* ======================

SIGNUP

====================== */

signupBtn.onclick = ()=>{

    showScreen(signupPage);

};

/* ======================

BACK LOGIN

====================== */

backLoginBtn.onclick = ()=>{

    clearLogin();

    showScreen(welcomePage);

};

/* ======================

Forget PassCode Btn

====================== */

forgotPassCodeBtn.onclick = ()=>{

    clearForgotPassCode();

    showScreen(forgotPassCodePage);

    document.getElementById("otpPageHeading").textContent = "Verify OTP";

    setFocus(forgotMobileNo);

};

async function sendForgotOTP(){

    const mobile = forgotMobileNo.value.trim();

    if(mobile === ""){
        alert("Enter Mobile Number");
        forgotMobileNo.focus();
        return;
    }

    const formData = new FormData();
    formData.append("action","sendForgotOTP");
    formData.append("mobile",mobile);

    try{

        const response = await fetch(API_URL,{
            method:"POST",
            body:formData
        });

        const result = await response.json();

        if(result.status !== "success"){
            alert(result.message);
            return;
        }

        otpMode = "forgot";

        clearOTP();

        showScreen(signupOTPPage);

        startOtpTimer("signupOtpTimer");
        otpSendingMsg.classList.add("hidden");
        document.getElementById("registerBtn").textContent = "Reset Pass Code";

        signupPassCodeBox.classList.add("hidden");
        signupConfirmPassCodeBox.classList.add("hidden");

    }catch(err){

        alert("Unable to connect to server.");
        console.log(err);

    }

}

sendForgotOTPBtn.onclick = async ()=>{

    otpResendCount = 0;

    await sendForgotOTP();

};


backForgotBtn.onclick = ()=>{

    clearForgotPassCode();

    showScreen(loginPage);

    setFocus(loginId);

};
/* ======================

SEND OTP

====================== */


backSignupBtn.onclick = ()=>{

    document.getElementById("loginUserName").value="";
    document.getElementById("surName").value="";
    document.getElementById("middleName").value="";
    document.getElementById("lastName").value="";
    document.getElementById("emailId").value="";
    document.getElementById("mobileNo").value="";
    document.getElementById("gender").value="";
    document.getElementById("dateOfBirth").value="";
    document.getElementById("place").value="";
    document.getElementById("state").value="";
    document.getElementById("country").value="";
    document.getElementById("sensitivePassCode").value="";
    document.getElementById("registerConfirmPassCode").value="";
    registerOTP.value="";

    showScreen(welcomePage);

};

async function sendSignupOTP(){

    if(!validateSignupBasic()) return;
    if(!(await checkSignup())) return;

    const formData = new FormData();

    formData.append("action","sendSignupOTP");
    formData.append("mobile", mobileNo.value.trim());

    try{

        const response = await fetch(API_URL,{
            method:"POST",
            body:formData
        });

        const result = await response.json();

        if(result.status !== "success"){

            alert(result.message);
            return;

        }

        otpMode = "signup";
        registerBtn.textContent = "Register";

        clearOTP();

        showScreen(signupOTPPage);

        startOtpTimer("signupOtpTimer");
        otpSendingMsg.classList.add("hidden");
        signupPassCodeBox.classList.remove("hidden");
        signupConfirmPassCodeBox.classList.remove("hidden");

    }catch(err){

        alert("Unable to connect to server.");
        console.log(err);

    }

}


signupOTPBtn.onclick = async ()=>{

    otpResendCount = 0;

    await sendSignupOTP();

};


resendSignupOTPBtn.onclick = async ()=>{

    if(otpResendCount >= MAX_OTP_RESEND){

        resendSignupOTPBtn.classList.add("hidden");

       startCooldown();

return;
    }

    otpResendCount++;
    resendSignupOTPBtn.classList.add("hidden");

   otpSendingMsg.classList.remove("hidden");

setTimeout(()=>{
    resendSignupOTPBtn.classList.remove("rotate");
},1000);
    if(otpMode === "signup"){

        await sendSignupOTP();

    }else if(otpMode === "forgot"){

        await sendForgotOTP();

    }

};

/* ======================

BACK OTP

====================== */

backOTPBtn.onclick = ()=>{

    clearInterval(otpInterval);
    otpSeconds = 30;

    otpPage.classList.add("hidden");

    loginPage.classList.remove("hidden");

};



backSignupOTPBtn.onclick = ()=>{

    clearInterval(otpInterval);
    otpSeconds = 30;

    clearOTP();

    if(otpMode === "signup"){

        showScreen(signupPage);

    }else if(otpMode === "forgot"){

        clearForgotPassCode();

        showScreen(forgotPassCodePage);

        setFocus(forgotMobileNo);

    }

};

/* ======================

VERIFY OTP

====================== */

verifyOTPBtn.onclick = ()=>{

otpPage.classList.add("hidden");

loginPage.classList.add("hidden");

welcomePage.classList.add("hidden");

dashboard.classList.remove("hidden");
 homeBtn.click();

};

/* ======================

END

====================== */


/* ======================

REGISTER / RESET PASS CODE

====================== */

registerBtn.onclick = async ()=>{

if(otpMode=="signup"){

    if(!validateSignup()) return;

    await verifySignupOTP();

}
else if(otpMode==="forgot"){

    await verifyForgotOTP();

}
};

function validateSignupBasic(){

    if(loginUserName.value.trim()==""){
        alert("Enter Login User Name");
        loginUserName.focus();
        return false;
    }
if(loginUserName.value.trim().length < 6){

    alert("Login User Name should contain at least 6 characters.");

    loginUserName.focus();

    return false;

}
    if(surName.value.trim()==""){
        alert("Enter Surname");
        surName.focus();
        return false;
    }
if(surName.value.trim().length < 2){

    alert("Enter valid Surname.");

    surName.focus();

    return false;

}
    if(!isValidName(surName.value.trim())){

    alert("Surname should contain letters only.");

    surName.focus();

    return false;

}
    if(lastName.value.trim()==""){
    alert("Enter Last Name");
    lastName.focus();
    return false;
}

if(lastName.value.trim().length < 2){

    alert("Enter valid Last Name.");

    lastName.focus();

    return false;

}
    if(!isValidName(lastName.value.trim())){

    alert("Last Name should contain letters only.");

    lastName.focus();

    return false;

}
    if(mobileNo.value.trim()==""){
        alert("Enter Mobile Number");
        mobileNo.focus();
        return false;
    }
if(!isValidMobile(mobileNo.value.trim())){

    alert("Enter valid Mobile Number.");

    mobileNo.focus();

    return false;

}
   if(emailId.value.trim()!=""){

    if(!isValidEmail(emailId.value.trim())){

        alert("Enter valid Email ID.");

        emailId.focus();

        return false;

    }

}
 
    if(gender.value==""){
        alert("Select Gender");
        gender.focus();
        return false;
    }

const dob = new Date(dateOfBirth.value);

if(dateOfBirth.value === ""){

    alert("Select Date of Birth");
    dateOfBirth.focus();
    return false;

}

const today = new Date();

if(dob > today){

    alert("Future Date of Birth is not allowed.");
    dateOfBirth.focus();
    return false;

}

let age = today.getFullYear() - dob.getFullYear();

const month = today.getMonth() - dob.getMonth();

if(month < 0 || (month === 0 && today.getDate() < dob.getDate())){

    age--;

}

if(age < 18){

    alert("Minimum age should be 18 years.");
    dateOfBirth.focus();
    return false;

}
   
if(place.value.trim()==""){
    alert("Enter Place");
    place.focus();
    return false;
}

if(place.value.trim().length < 2){

    alert("Enter valid Place.");

    place.focus();

    return false;

}
if(!isValidName(place.value.trim())){

    alert("Place should contain letters only.");

    place.focus();

    return false;

}
if(state.value.trim()==""){
    alert("Enter State");
    state.focus();
    return false;
}

if(state.value.trim().length < 2){

    alert("Enter valid State.");

    state.focus();

    return false;

}
if(!isValidName(state.value.trim())){

    alert("State should contain letters only.");

    state.focus();

    return false;

}
if(country.value.trim()==""){
    alert("Enter Country");
    country.focus();
    return false;
}

if(country.value.trim().length < 2){

    alert("Enter valid Country.");

    country.focus();

    return false;

}
if(!isValidName(country.value.trim())){

    alert("Country should contain letters only.");

    country.focus();

    return false;

}
    
    return true;

}


function validateSignup(){

    if(!validateSignupBasic()){
        return false;
    }

    if(sensitivePassCode.value.trim()==""){
        alert("Enter Pass Code");
        sensitivePassCode.focus();
        return false;
    }

    if(registerConfirmPassCode.value.trim()==""){
        alert("Confirm Pass Code");
        registerConfirmPassCode.focus();
        return false;
    }

    if(sensitivePassCode.value !== registerConfirmPassCode.value){
        alert("Pass Codes do not match");
        registerConfirmPassCode.focus();
        return false;
    }

    return true;

}

/* ======================

CHECK SIGHUP

====================== */

async function checkSignup() {

  const response = await fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({
      action: "checkSignup",
      loginUserName: loginUserName.value.trim(),
      mobile: mobileNo.value.trim()
    })
  });

  const result = await response.json();

  if (result.status !== "success") {
    alert(result.message);
    return false;
  }

  return true;

}


/* ======================

REGISTER USER

====================== */

async function registerUser(){

    const data = {

        action: "register",

        loginUserName: document.getElementById("loginUserName").value.trim(),

        surName: document.getElementById("surName").value.trim(),

        middleName: document.getElementById("middleName").value.trim(),

        lastName: document.getElementById("lastName").value.trim(),

        email: document.getElementById("emailId").value.trim(),

        mobile: document.getElementById("mobileNo").value.trim(),

        gender: document.getElementById("gender").value,

        dateOfBirth: document.getElementById("dateOfBirth").value,

        place: document.getElementById("place").value.trim(),

        state: document.getElementById("state").value.trim(),

        country: document.getElementById("country").value.trim(),

        passCode: document.getElementById("sensitivePassCode").value.trim()

    };


    const formData = new FormData();

    formData.append("action","register");

    formData.append("loginUserName",data.loginUserName);

    formData.append("surName",data.surName);

    formData.append("middleName",data.middleName);

    formData.append("lastName",data.lastName);

    formData.append("gender",data.gender);

    formData.append("dateOfBirth",data.dateOfBirth);

    formData.append("place",data.place);

    formData.append("state",data.state);

    formData.append("country",data.country);

    formData.append("email",data.email);

    formData.append("mobile",data.mobile);

    formData.append("passCode",data.passCode);


    try{

        const response = await fetch(API_URL,{

            method:"POST",

            body:formData

        });

        const result = await response.json();


        if(result.status=="success"){

    alert(result.message);

    // Clear Signup Form
    document.getElementById("loginUserName").value = "";
    document.getElementById("surName").value = "";
    document.getElementById("middleName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("emailId").value = "";
    document.getElementById("mobileNo").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("dateOfBirth").value = "";
    document.getElementById("place").value = "";
    document.getElementById("state").value = "";
    document.getElementById("country").value = "";
    document.getElementById("sensitivePassCode").value = "";
    document.getElementById("registerConfirmPassCode").value = "";

    clearOTP();

    showScreen(welcomePage);

}else{

    alert(result.message);

}
    }
    catch(err){

        alert("Unable to connect to server.");

        console.log(err);

    }

}



/* ======================

Verify PASS CODE

====================== */
async function verifyForgotOTP(){

   const mobile = forgotMobileNo.value.trim();
const otp = registerOTP.value.trim();
    if(mobile===""){
        alert("Enter Mobile Number");
        forgotMobileNo.focus();
        return;
    }
    if(otp===""){
        alert("Enter OTP");
        return;
    }
if (otp.length !== 6) {
    alert("Enter 6-digit OTP");
    registerOTP.focus();
    return;
}

    const formData = new FormData();

    formData.append("action","verifyForgotOTP");
    formData.append("mobile",mobile);
    formData.append("otp",otp);

    try{

        const response = await fetch(API_URL,{
            method:"POST",
            body:formData
        });

        const result = await response.json();

        if(result.status==="success"){

          signupOTPPage.classList.add("hidden");
resetPassCodePage.classList.remove("hidden");
            
        }else{

            alert(result.message);

        }

    }catch(err){

        console.log(err);

        alert("Server Error");

    }

}
/* ======================
VERIFY SIGNUP OTP
====================== */

async function verifySignupOTP(){

    const formData = new FormData();

    formData.append("action","verifySignupOTP");
    formData.append("mobile", mobileNo.value.trim());
    formData.append("otp", registerOTP.value.trim());

    const otp = registerOTP.value.trim();

if (otp === "") {
    alert("Enter OTP");
    registerOTP.focus();
    return;
}

if (otp.length !== 6) {
    alert("Enter 6-digit OTP");
    registerOTP.focus();
    return;
}

    try{

        const response = await fetch(API_URL,{
            method:"POST",
            body:formData
        });

        const result = await response.json();

        if(result.status=="success"){

            await registerUser();

        }else{

            alert(result.message);

        }

    }catch(error){

        alert("Unable to verify OTP.");

    }

}

/* ======================

RESET PASS CODE

====================== */

async function resetPassCode(){
const otp = registerOTP.value.trim();
    const newPassCode = sensitivePassCode.value.trim();
    const confirmPassCode = registerConfirmPassCode.value.trim();
    if(otp===""){
        alert("Enter OTP");        return;    }
    if(newPassCode===""){        alert("Enter New Pass Code");        return;
    }
    if(confirmPassCode===""){        alert("Confirm Pass Code");        return;
    }
    if(newPassCode!==confirmPassCode){        alert("Pass Codes do not match");        return;
    }
    const mobile = forgotMobileNo.value.trim();
    /* -------- OTP Verify -------- */
    const verifyData = new FormData();
    verifyData.append("action","verifyForgotOTP");
    verifyData.append("mobile",mobile);
    verifyData.append("otp",otp);
    const verifyResponse = await fetch(API_URL,{        method:"POST",        body:verifyData    });
    const verifyResult = await verifyResponse.json();
    if(verifyResult.status!=="success"){        alert(verifyResult.message);        return;
    }

    /* -------- Reset Pass Code -------- */

    const resetData = new FormData();

    resetData.append("action","resetPassCode");
    resetData.append("mobile",mobile);
    resetData.append("newPassCode",newPassCode);

    const resetResponse = await fetch(API_URL,{
        method:"POST",
        body:resetData
    });

    const resetResult = await resetResponse.json();

    alert(resetResult.message);

    if(resetResult.status==="success"){

        signupOTPPage.classList.add("hidden");

        loginPage.classList.remove("hidden");

        forgotMobileNo.value="";
        sensitivePassCode.value="";
        registerConfirmPassCode.value="";

    }

}


loginSubmitBtn.onclick = async ()=>{

    const loginId =
    document.getElementById("loginId").value.trim();

    const passCode =
    document.getElementById("loginPassCode").value.trim();

    if(loginId==""){
        alert("Enter Login ID");
        return;
    }

    if(passCode==""){
        alert("Enter Pass Code");
        return;
    }
const formData = new FormData();

    formData.append("action","login");
    formData.append("loginId",loginId);
    formData.append("passCode",passCode);

    try{

        const response = await fetch(API_URL,{
            method:"POST",
            body:formData
        });

        const result = await response.json();

        if(result.status=="success"){

            sessionStorage.setItem(
                "user",
                JSON.stringify(result)
            );
            
            updateSideMenuUser();
            updateMenuIcon();
            
            sessionStorage.setItem(
        "passCode",
        passCode
            );
            loginPage.classList.add("hidden");
            welcomePage.classList.add("hidden");
            dashboard.classList.remove("hidden");

            homeBtn.click();

        }else{

            alert(result.message);

        }

    }catch(err){

        alert("Unable to connect to server.");
        console.log(err);

    }

};
expensesBtn.onclick=()=>{
setActiveButton(expensesBtn);
   
showPage(

pageTitle(
"Expenses",
"images/colorbtns/Expenses1.png"
)

+`
<div class="grid-3x2">

<button class="grid-btn">

<img
src="images/colorbtns/Add1.png"
class="btn-icon">

<span>

Add Expense

</span>

</button>


<button
id="expenseReports"
class="grid-btn">

<img
src="images/colorbtns/Reports1.png"
class="btn-icon">

<span>

Reports

</span>

</button>


<button
id="expenseSensitive"
class="grid-btn">

<img
src="images/colorbtns/SensitiveReports1.png"
class="btn-icon">

<span>

Sensitive Reports

</span>

</button>


<button
id="expenseAll"
class="grid-btn">

<img
src="images/colorbtns/AllReports1.png"
class="btn-icon">

<span>

All Reports

</span>

</button>

<button class="grid-btn">

<img
src="images/colorbtns/CustomSearch1.png"
class="btn-icon">

<span>

Custom Search

</span>
</button>
<button class="grid-btn">

<img
src="images/colorbtns/About1.png"
class="btn-icon">

<span>

About

</span>

</button>

</div>


<div align="center">

<button
id="expenseBack"

class="back-btn">

← Back

</button>

</div>

`);
document.getElementById(

"expenseReports"

).onclick=()=>{

reportsLayout(

    "Expenses Reports",

    ()=>expensesBtn.click()

);

};


document.getElementById("expenseSensitive").onclick = ()=>{

    openSensitive(

        "Expenses",

        "Sensitive Reports",

        ()=>expensesBtn.click()

    );

};

document.getElementById("expenseAll").onclick = ()=>{

    openSensitive(

        "Expenses",

        "All Reports",

        ()=>expensesBtn.click()

    );

};

  
document.getElementById(

"expenseBack"

)

.onclick=()=>{

showHome();



};


};
homeBtn.onclick = ()=>{
    showNavigation();

    setActiveButton(homeBtn);

    homeContent.innerHTML = homeTemplate;

    
    updateWelcomePage();

};
function showHome(){

    showNavigation();

    homeBtn.click();

}

familyBtn.onclick = ()=>{

    setActiveButton(familyBtn);

    showPage(

pageTitle(
"Family",
"images/colorbtns/Family1.png"
)

+`
<div class="grid-3x2">

<button
id="addMemberBtn"
class="grid-btn">

<img
src="images/colorbtns/AddMember1.png"
class="btn-icon">

<span>

Add Member

</span>

</button>


<button
id="addFamilyBtn"
class="grid-btn">

<img
src="images/colorbtns/AddFamily1.png"
class="btn-icon">

<span>

Add Tree

</span>

</button>


<button
id="searchMemberBtn"
class="grid-btn">

<img
src="images/colorbtns/CustomSearch1.png"
class="btn-icon">

<span>

Search Member

</span>

</button>


<button
id="relationsBtn"
class="grid-btn">

<img
src="images/colorbtns/Relations1.png"
class="btn-icon">

<span>

Relations

</span>

</button>


<button
id="treeViewBtn"
class="grid-btn">

<img
src="images/colorbtns/TreeView1.png"
class="btn-icon">

<span>

Tree View

</span>

</button>


<button
id="familyAboutBtn"
class="grid-btn">

<img
src="images/colorbtns/About1.png"
class="btn-icon">

<span>

About

</span>

</button>

</div>

<div align="center">

<button
id="familyBack"
class="back-btn">

← Back

</button>

</div>

`);

document.getElementById("familyBack").onclick = 
    
    showHome;

};

memoriesBtn.onclick = ()=>{

    setActiveButton(memoriesBtn);

    showPage(

pageTitle(
"Memories",
"images/colorbtns/Memories1.png"
)

+`
<div class="grid-3x2">

<button class="grid-btn" id="addMemoryBtn">

<img
src="images/colorbtns/Add1.png"
class="btn-icon">

<span>

Add Memory

</span>

</button>


<button
id="memoryReports"
class="grid-btn">

<img
src="images/colorbtns/Reports1.png"
class="btn-icon">

<span>

Reports

</span>

</button>


<button
id="memorySensitive"
class="grid-btn">

<img
src="images/colorbtns/SensitiveReports1.png"
class="btn-icon">

<span>

Sensitive Reports

</span>

</button>


<button
id="memoryAll"
class="grid-btn">

<img
src="images/colorbtns/AllReports1.png"
class="btn-icon">

<span>

All Reports

</span>

</button>


<button
id="memorySearch"
class="grid-btn">

<img
src="images/colorbtns/CustomSearch1.png"
class="btn-icon">

<span>

Custom Search

</span>

</button>


<button
id="memoryAbout"
class="grid-btn">

<img
src="images/colorbtns/About1.png"
class="btn-icon">

<span>

About

</span>

</button>

</div>

<div align="center">

<button
id="memoryBack"
class="back-btn">

← Back

</button>

</div>

`);

document.getElementById("memoryReports").onclick = ()=>{

    reportsLayout(

    "Memory Reports",

    ()=>memoriesBtn.click()

);

};

document.getElementById("memorySensitive").onclick = ()=>{

    openSensitive(

        "Memory",

        "Sensitive Reports",

        ()=>memoriesBtn.click()

    );

};

document.getElementById("memoryAll").onclick = ()=>{

    openSensitive(

        "Memory",

        "All Reports",

        ()=>memoriesBtn.click()

    );

};

document.getElementById("memoryBack").onclick = showHome;

};


chartsBtn.onclick = ()=>{

    setActiveButton(chartsBtn);

    showPage(

pageTitle(
"Charts",
"images/colorbtns/Charts1.png"
)

+`
<div class="grid-3x2">

<button
id="expensesChartBtn"
class="grid-btn">

<img
src="images/colorbtns/Expenses1.png"
class="btn-icon">

<span>

Expenses

</span>

</button>

<button
id="activitiesChartBtn"
class="grid-btn">

<img
src="images/colorbtns/Activities1.png"
class="btn-icon">

<span>

Activities

</span>

</button>

<button
id="incomeChartBtn"
class="grid-btn">

<img
src="images/colorbtns/Income1.png"
class="btn-icon">

<span>

Income

</span>

</button>


<button
id="loansChartBtn"
class="grid-btn">

<img
src="images/colorbtns/Loans1.png"
class="btn-icon">

<span>

Loans

</span>

</button>


<button
id="healthChartBtn"
class="grid-btn">

<img
src="images/colorbtns/Health1.png"
class="btn-icon">

<span>

Health

</span>

</button>




<button
id="chartsAboutBtn"
class="grid-btn">

<img
src="images/colorbtns/About1.png"
class="btn-icon">

<span>

About

</span>

</button>

</div>

<div align="center">

<button
id="chartsBack"
class="back-btn">

← Back

</button>

</div>

`);
document.getElementById("loansChartBtn").onclick = ()=>{

    loanChartsMenu();

};
document.getElementById("chartsBack").onclick = showHome;

};
reportsBtn.onclick=()=>{
setActiveButton(reportsBtn);

showPage(

pageTitle(
"Reports",
"images/colorbtns/Reports1.png"
)

+`
<div class="grid-3x2">

<button id="expenseMainReports" class="grid-btn">

<img
src="images/colorbtns/Expenses1.png"
class="btn-icon">

<span>

Expenses Reports

</span>

</button>

<button id="activityMainReports" class="grid-btn">

<img
src="images/colorbtns/Activities1.png"
class="btn-icon">

<span>

Activities Reports

</span>

</button>

<button id="loanMainReports" class="grid-btn">

<img
src="images/colorbtns/Loans1.png"
class="btn-icon">

<span>

Loan Reports

</span>

</button>

<button id="incomeMainReports" class="grid-btn">

<img
src="images/colorbtns/Income1.png"
class="btn-icon">

<span>

Income Reports

</span>

</button>

<button id="healthMainReports" class="grid-btn">

<img
src="images/colorbtns/Health1.png"
class="btn-icon">

<span>

Health Reports

</span>

</button>

<button id="memoryMainReports" class="grid-btn">

<img
src="images/colorbtns/Memories1.png"
class="btn-icon">

<span>

Memories Reports

</span>

</button>

<button class="grid-btn">

<img
src="images/colorbtns/About1.png"
class="btn-icon">

<span>

About

</span>

</button>

</div>
<div align="center">

<button
id="reportsBack"
class="back-btn">

← Back

</button>

</div>

`);
document.getElementById("expenseMainReports").onclick=()=>{

reportCategory("Expenses", true);
};

document.getElementById("activityMainReports").onclick=()=>{

reportCategory("Activities", true);
};

document.getElementById("loanMainReports").onclick=()=>{

loanReportsMenu();

};

document.getElementById("incomeMainReports").onclick=()=>{

reportCategory("Income", true);
};

document.getElementById("healthMainReports").onclick=()=>{

reportCategory("Health", true);
};

document.getElementById("memoryMainReports").onclick=()=>{

reportCategory("Memories", true);
};
document.getElementById(
"reportsBack"
).onclick=()=>{
    
showHome();

};

};

function reportsLayout(title, backFunction){

homeContent.scrollTop = 0;
    window.scrollTo(0,0);
showPage(`
<h2 class="page-title">
${title}
</h2>
<div class="report-grid">
<button class="report-btn">
Today
</button>
<button class="report-btn">
This Week
</button>
<button class="report-btn">
This Month
</button>
<button class="report-btn">
This Year

</button>

<button class="report-btn">

Daily

</button>

<button class="report-btn">

Weekly

</button>

<button class="report-btn">

Monthly

</button>

<button class="report-btn">

Yearly

</button>

<button class="report-btn">
Abstract

</button>

</div>

<div align="center">

<button
id="reportBack"
class="back-btn">

← Back

</button>

</div>

`);

document.getElementById("reportBack").onclick = backFunction;}

function openSensitive(moduleName, reportType, backFunction){
showPage(`

<h2 class="page-title">

${moduleName}

</h2>

<h3 style="text-align:center;color:#2A6EB0;">

${reportType}

</h3>

<div class="password-box" style="width:90%;margin:20px auto;">

<input
id="reportPassCode"
type="password"
placeholder="Enter Pass Code">

<span
id="toggleReportPassCode"
class="eye-icon">

<i class="fa-solid fa-eye"></i>

</span>

</div>
<div align="center">

<button
id="verifyPass"
class="grid-btn">

Verify

</button>

<br><br>

<br><br>

<button
id="passBack"
class="back-btn">

← Back

</button>

</div>

`);

const toggle = document.getElementById("toggleReportPassCode");

if(toggle){

    toggle.onclick = function(){

        const txt = document.getElementById("reportPassCode");
        const icon = this.querySelector("i");

        if(txt.type === "password"){

            txt.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

        }else{

            txt.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

        }

    };

}


    
document.getElementById("verifyPass").onclick = () => {

    const enteredPass =
        document.getElementById("reportPassCode").value.trim();

    const savedPass =
        sessionStorage.getItem("passCode");

    if (enteredPass === "") {
        alert("Enter Pass Code");
        return;
    }

    if (enteredPass !== savedPass) {
        alert("Wrong Pass Code");
        return;
    }

    reportsLayout(
        moduleName + " " + reportType,
        backFunction
    );

};

    
    document.getElementById("passBack").onclick = backFunction;
}


function reportCategory(module, fromBottomReports = false){

showPage(`

<h2 class="page-title">

${module} Reports

</h2>

<div class="grid-3x2">

<button
id="catReports"
class="grid-btn">

<img
src="images/colorbtns/Reports1.png"
class="btn-icon">

<span>

Reports

</span>

</button>

<button
id="catSensitive"
class="grid-btn">

<img
src="images/colorbtns/SensitiveReports1.png"
class="btn-icon">

<span>

Sensitive Reports

</span>

</button>

<button
id="catAll"
class="grid-btn">

<img
src="images/colorbtns/AllReports1.png"
class="btn-icon">

<span>

All Reports

</span>

</button>

</div>
<div align="center">

<button
id="catBack"
class="back-btn">

← Back

</button>

</div>

`);

document.getElementById("catReports").onclick = ()=>{

    reportsLayout(
        module + " Reports",
        ()=>reportCategory(module, fromBottomReports)
    );

};

document.getElementById("catSensitive").onclick = ()=>{

    openSensitive(
        module,
        "Sensitive Reports",
        ()=>reportCategory(module, fromBottomReports)
    );

};
document.getElementById("catAll").onclick = ()=>{

    openSensitive(
        module,
        "All Reports",
        ()=>reportCategory(module, fromBottomReports)
    );

};

document.getElementById("catBack").onclick = ()=>{

    if(fromBottomReports){

        reportsBtn.click();

    }else{

        switch(module){

            case "Expenses":
                expensesBtn.click();
                break;

            case "Activities":
                activitiesBtn.click();
                break;

            case "Income":
                incomeBtn.click();
                break;

            case "Health":
                healthBtn.click();
                break;

            case "Memories":
                memoriesBtn.click();
                break;

        }

    }

};
}


function loanReportsMenu(){

showPage(`

<h2 class="page-title">

Loan Reports

</h2>


<div class="grid-2">

<button id="loanLendRpt" class="grid-btn">

<img
src="images/reports/LoansLendReports.png"
class="btn-icon">

<span>

Loans-Lend

</span>

</button>

<button id="loanBorrowRpt" class="grid-btn">

<img
src="images/reports/LoansBorrowedReports.png"
class="btn-icon">

<span>

Loans-Borrowed

</span>

</button>

<button id="paymentLendRpt" class="grid-btn">

<img
src="images/reports/PaymentsLendReports.png"
class="btn-icon">

<span>

Payments-Lend

</span>

</button>

<button id="paymentBorrowRpt" class="grid-btn">

<img
src="images/reports/PaymentsBorrowedReports.png"
class="btn-icon">

<span>

Payments-Borrowed

</span>

</button>

</div>
<div align="center">

<button
id="loanRptBack"
class="back-btn">

← Back

</button>

</div>

`);

document.getElementById("loanLendRpt").onclick=()=>{

reportCategory("Loan - Lend", true);


};

document.getElementById("loanBorrowRpt").onclick=()=>{

reportCategory("Loan - Borrowed", true);

};

document.getElementById("paymentLendRpt").onclick=()=>{

reportCategory("Payments - Lend", true);


};

document.getElementById("paymentBorrowRpt").onclick=()=>{

reportCategory("Payments - Borrowed", true);

};

document.getElementById("loanRptBack").onclick=()=>{

reportsBtn.click();

};
}
   function loanChartsMenu(){

showPage(`

<h2 class="page-title">

Loan Charts

</h2>

<div class="grid-2">

<button
id="loanLendChart"
class="grid-btn">

<img
src="images/charts/LoanLendChart.png"
class="btn-icon">

<span>

Loans - Lend

</span>

</button>

<button
id="loanBorrowChart"
class="grid-btn">

<img
src="images/charts/LoanBorrowChart.png"
class="btn-icon">

<span>

Loans - Borrowed

</span>

</button>

<button
id="paymentLendChart"
class="grid-btn">

<img
src="images/charts/PaymentLendChart.png"
class="btn-icon">

<span>

Payments - Lend

</span>

</button>

<button
id="paymentBorrowChart"
class="grid-btn">

<img
src="images/charts/PaymentBorrowChart.png"
class="btn-icon">

<span>

Payments - Borrowed

</span>

</button>

</div>

<div align="center">

<button
id="loanChartBack"
class="back-btn">

← Back

</button>

</div>

`);

document.getElementById("loanLendChart").onclick=()=>{

    // Loan Lend Chart

};

document.getElementById("loanBorrowChart").onclick=()=>{

    // Loan Borrowed Chart

};

document.getElementById("paymentLendChart").onclick=()=>{

    // Payment Lend Chart

};

document.getElementById("paymentBorrowChart").onclick=()=>{

    // Payment Borrowed Chart

};

document.getElementById("loanChartBack").onclick=()=>{

    chartsBtn.click();

};

}
menuBtn.onclick = ()=>{

    sideMenu.classList.add("open");

    menuOverlay.classList.add("show");

};
closeMenuBtn.onclick = ()=>{

    sideMenu.classList.remove("open");

    menuOverlay.classList.remove("show");

};

menuOverlay.onclick = ()=>{

    sideMenu.classList.remove("open");

    menuOverlay.classList.remove("show");

};


logoutMenuBtn.onclick = ()=>{

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("passCode"); 

    updateSideMenuUser();
    updateMenuIcon();
    sideMenu.classList.remove("open");
    menuOverlay.classList.remove("show");

    dashboard.classList.add("hidden");
    loginPage.classList.add("hidden");
    signupPage.classList.add("hidden");
    signupOTPPage.classList.add("hidden");
    welcomePage.classList.remove("hidden");
    const msg = document.getElementById("logoutMessage");
    msg.style.display = "block";
    setTimeout(()=>{
        msg.style.display = "none";
    },1500);
};

/* ======================
CHANGE PASS CODE MENU
====================== */

passcodeMenuBtn.onclick = () => {

    sideMenu.classList.remove("open");
    menuOverlay.classList.remove("show");

    showScreen(changePasswordPage);

    oldPassCode.value = "";
    changeNewPassCode.value = "";
    changeConfirmPassCode.value = "";

    setFocus(oldPassCode);
};

/* ======================
BACK CHANGE PASS CODE
====================== */

backChangePasswordBtn.onclick = () => {

    showScreen(dashboard);

    homeBtn.click();

};

/* ======================
CHANGE PASS CODE
====================== */

changePasswordBtn.onclick = async () => {

    const oldPass = oldPassCode.value.trim();
    const newPass = changeNewPassCode.value.trim();
    const confirmPass = changeConfirmPassCode.value.trim();

    if (oldPass === "") {
        alert("Enter Old Pass Code");
        oldPassCode.focus();
        return;
    }

    if (newPass === "") {
        alert("Enter New Pass Code");
        changeNewPassCode.focus();
        return;
    }

    if (confirmPass === "") {
        alert("Confirm New Pass Code");
        changeConfirmPassCode.focus();
        return;
    }

    if (newPass !== confirmPass) {
        alert("New Pass Codes do not match");
        changeConfirmPassCode.focus();
        return;
    }

    const user =
        JSON.parse(sessionStorage.getItem("user"));

    const formData = new FormData();

    formData.append("action", "changePassword");
formData.append("loginId", user.loginUserName);
    formData.append("oldPassCode", oldPass);
    formData.append("newPassCode", newPass);

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        alert(result.message);

        if (result.status === "success") {

            sessionStorage.setItem(
                "passCode",
                newPass
            );

            oldPassCode.value = "";
            changeNewPassCode.value = "";
            changeConfirmPassCode.value = "";

            showScreen(dashboard);

            homeBtn.click();
        }

    } catch (err) {

        console.log(err);
        alert("Unable to connect to server.");

    }

};

/* ======================
HIDE NAVIGATION - SHOW NAVIGATION
====================== */

function hideNavigation(){

    document.querySelector(".top-container").style.display = "none";
    document.querySelector(".bottom-container").style.display = "none";

}

function showNavigation(){

    document.querySelector(".top-container").style.display = "flex";
    document.querySelector(".bottom-container").style.display = "flex";

}


function openChangeSensitivePassCode(){

    showPage(

        pageTitle(
            "Change Pass Code",
            "images/colorbtns/SensitiveReports1.png"
        )

        +`

<input
id="oldPassCode"
type="password"
maxlength="6"
placeholder="Enter Old Pass Code"
style="
width:90%;
height:50px;
margin:15px auto;
display:block;
border-radius:10px;
padding-left:15px;
font-size:16px;
">

<input
id="newPassCode"
type="password"
maxlength="6"
placeholder="Enter New Pass Code"
style="
width:90%;
height:50px;
margin:15px auto;
display:block;
border-radius:10px;
padding-left:15px;
font-size:16px;
">

<input
id="confirmPassCode"
type="password"
maxlength="6"
placeholder="Confirm New Pass Code"
style="
width:90%;
height:50px;
margin:15px auto;
display:block;
border-radius:10px;
padding-left:15px;
font-size:16px;
">

<div align="center">

<button
id="savePassCodeBtn"
class="grid-btn">

Save

</button>

<br><br>

<button
id="changePassBackBtn"
class="back-btn">

← Back

</button>

</div>

`
    );

    
document.getElementById("savePassCodeBtn").onclick = async () => {

    // Read Values
    const oldPass =
        document.getElementById("oldPassCode").value.trim();

    const newPass =
        document.getElementById("newPassCode").value.trim();

    const confirmPass =
        document.getElementById("confirmPassCode").value.trim();
    
    // Validation
    if (oldPass === "" || newPass === "" || confirmPass === "") {
        alert("Please fill all the fields.");
        return;
    }
    
    if (oldPass !== sessionStorage.getItem("passCode")) {
        alert("Old Pass Code is incorrect.");
        return;
    }

    if (newPass !== confirmPass) {
        alert("New Pass Code and Confirm Pass Code do not match.");
        return;
    }

    // Logged-in User
    
    // FormData
    const formData = new FormData();

    formData.append(
        "action",
        "changeSensitivePassCode"
    );
const user = JSON.parse(sessionStorage.getItem("user"));

    formData.append(
        "loginId",
        user.loginUserName
    );

    formData.append(
        "newPassCode",
        newPass
    );

    try {

        
        const response = await fetch(API_URL, {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        if (result.status == "success") {

            sessionStorage.setItem(
                
                "passCode",
                newPass
            );

            alert(result.message);

            homeBtn.click();

        } else {

            alert(result.message);

        }

    } catch (err) {

        alert("Unable to connect to server.");

        console.log(err);

    }

};    
    document.getElementById("changePassBackBtn").onclick = ()=>{

    homeBtn.click();

    };

}
updateWelcomePage();
/* ======================

AUTO LOGIN

====================== */

const loggedUser =
sessionStorage.getItem("user");

if(loggedUser){

    welcomePage.classList.add("hidden");

    loginPage.classList.add("hidden");

    signupPage.classList.add("hidden");

    signupOTPPage.classList.add("hidden");

    dashboard.classList.remove("hidden");

    homeBtn.click();
    updateSideMenuUser();
updateMenuIcon();

}


function updateMenuIcon(){

    const menuBtn = document.getElementById("menuBtn");

    if(sessionStorage.getItem("user")){

        menuBtn.classList.remove("hidden");

    }else{

        menuBtn.classList.add("hidden");

    }

}
const gender = document.getElementById("gender");

if(gender){
    gender.addEventListener("change", function(){
        this.style.color = "#333";
    });
}

const dob = document.getElementById("dateOfBirth");

if(dob){
    dob.addEventListener("change", function(){
        this.style.color = "#333";
    });
}
function updateSideMenuUser(){

    const greeting = document.getElementById("menuGreeting");
    const userName = document.getElementById("menuUserName");

    if(!greeting || !userName) return;

    const user = JSON.parse(sessionStorage.getItem("user"));

    if(!user){
        greeting.textContent = "";
        userName.textContent = "";
        return;
    }

    greeting.textContent = "Hi";

    userName.textContent =
        `${user.surName} ${user.middleName} ${user.lastName}`
        .replace(/\s+/g," ")
        .trim();

}
const toggleLoginPass = document.getElementById("toggleLoginPass");

toggleLoginPass.onclick = function(){

    const txt = document.getElementById("loginPassCode");
    const icon = this.querySelector("i");

    if(txt.type === "password"){

        txt.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    }else{

        txt.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

};


toggleSensitivePassCode.onclick = function(){

    const txt = document.getElementById("sensitivePassCode");
    const icon = this.querySelector("i");

    if(txt.type === "password"){

        txt.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    }else{

        txt.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

};

toggleRegisterConfirmPassCode.onclick = function(){

    const txt = document.getElementById("registerConfirmPassCode");
    const icon = this.querySelector("i");

    if(txt.type === "password"){

        txt.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    }else{

        txt.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

};


toggleNewPassCode.onclick = function(){

    const txt = document.getElementById("newPassCode");
    const icon = this.querySelector("i");

    if(txt.type === "password"){

        txt.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    }else{

        txt.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

};

toggleConfirmNewPassCode.onclick = function(){

    const txt = document.getElementById("confirmNewPassCode");
    const icon = this.querySelector("i");

    if(txt.type === "password"){

        txt.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    }else{

        txt.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

};



document.querySelectorAll(".toggle-password").forEach(function(icon){

    icon.addEventListener("click", function(){

        const input = this.previousElementSibling;

        if(input.type==="password"){

            input.type="text";

            this.classList.remove("fa-eye");

            this.classList.add("fa-eye-slash");

        }else{

            input.type="password";

            this.classList.remove("fa-eye-slash");

            this.classList.add("fa-eye");

        }

    });

});
saveNewPassCodeBtn.onclick = async ()=>{

    const pass1 = newPassCode.value.trim();
    const pass2 = confirmNewPassCode.value.trim();

    if(pass1===""){
        alert("Enter New Pass Code");
        return;
    }

    if(pass2===""){
        alert("Confirm New Pass Code");
        return;
    }

    if(pass1!==pass2){
        alert("Pass Codes do not match");
        return;
    }

    console.log("Mobile =", forgotMobileNo.value);
    const formData = new FormData();

    formData.append("action","resetPassCode");
    formData.append("mobile",forgotMobileNo.value.trim());
    formData.append("newPassCode",pass1);

    const response = await fetch(API_URL,{
        method:"POST",
        body:formData
    });

    const result = await response.json();

    alert(result.message);

    if(result.status==="success"){

        resetPassCodePage.classList.add("hidden");

        loginPage.classList.remove("hidden");
        forgotMobileNo.value = "";
newPassCode.value = "";
confirmNewPassCode.value = "";

document.querySelector("#signupOTPPage input[type='text']").value = "";
            loginId.value = "";
    loginPassCode.value = "";


    }

};
backResetPassCodeBtn.onclick = ()=>{

    resetPassCodePage.classList.add("hidden");

    signupOTPPage.classList.remove("hidden");

    // Clear Reset Pass Code fields
    newPassCode.value = "";
    confirmNewPassCode.value = "";

    // Clear OTP field
    document.querySelector("#signupOTPPage input[type='text']").value = "";

};
/* ======================
APP START
====================== */

showScreen(welcomePage);

updateWelcomePage();

updateMenuIcon();
