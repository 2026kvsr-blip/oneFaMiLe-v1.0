
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

const sensitivePassCode =
document.getElementById("sensitivePassCode");

const registerConfirmPassCode =
document.getElementById("registerConfirmPassCode");
sensitivePassCode.addEventListener("input", function(){

    this.value =
        this.value.replace(/\D/g,"");

});

registerConfirmPassCode.addEventListener("input", function(){

    this.value =
        this.value.replace(/\D/g,"");

});
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
const restorePage =
document.getElementById("restorePage");

const restoreFile =
document.getElementById("restoreFile");

const restoreBackupBtn =
document.getElementById("restoreBackupBtn");

const backRestoreBtn =
document.getElementById("backRestoreBtn");
// =====================================
// CLOSE SIDE MENU
// =====================================

function closeSideMenu(){

    sideMenu.classList.remove("open");

    menuOverlay.classList.remove("show");
}

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
let signupOtpActive = false;
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
const loginLockMsg =
document.getElementById("loginLockMsg");
const forgotLockMsg =
document.getElementById("forgotLockMsg");
const loginLockTimer =
document.getElementById("loginLockTimer");
const appLoader =
document.getElementById("appLoader");


const loaderText =
document.getElementById("loaderText");
const appMessage =
document.getElementById("appMessage");

const appMessageText =
document.getElementById("appMessageText");


const settingsPage =
document.getElementById("settingsPage");
const profilePage =
document.getElementById("profilePage");

const profileMenuBtn =
document.getElementById("profileMenuBtn");

const profileBackBtn =
document.getElementById("profileBackBtn");
const profileEditBackBtn =
document.getElementById("profileEditBackBtn");
const editProfileBtn =
document.getElementById("editProfileBtn");
const settingsMenuBtn =
document.getElementById("settingsMenuBtn");
const backSettingsBtn =
document.getElementById("backSettingsBtn");

const languageSettingsBtn =
document.getElementById("languageSettingsBtn");

const changePassSettingsBtn =
document.getElementById("changePassSettingsBtn");

const backupSettingsBtn =
document.getElementById("backupSettingsBtn");

const restoreSettingsBtn =
document.getElementById("restoreSettingsBtn");
const aboutSettingsBtn =
document.getElementById("aboutSettingsBtn");

const languagePage =
document.getElementById("languagePage");

const backLanguageBtn =
document.getElementById("backLanguageBtn");
const backupPage =
document.getElementById("backupPage");

const createBackupBtn =
document.getElementById("createBackupBtn");

const exportBackupBtn =
document.getElementById("exportBackupBtn");

const backBackupBtn =
document.getElementById("backBackupBtn");

const lastBackupText =
document.getElementById("lastBackupText");
// Reset Attempts after 1 minute inactivity

//let lastSensitiveAttemptTime = 0;
/* =====================================
   SENSITIVE PASS CODE SECURITY
===================================== */
/*const MAX_SENSITIVE_ATTEMPTS = 3;

let sensitiveAttempts = 0;

let sensitiveLocked = false;

let sensitiveLockSeconds = 60;

let sensitiveLockInterval = null;*/
/* ==========================
   LOGIN SECURITY
========================== */

const MAX_LOGIN_ATTEMPTS = 3;
// =====================================
// LOGIN ATTEMPT RESET
// =====================================

const ATTEMPT_RESET_TIME = 60; // 60 Seconds
let lastSensitiveAttemptTime = 0;
let lastLoginAttemptTime = 0;
// =====================================
// FORGOT PASSWORD SECURITY
// =====================================

const MAX_FORGOT_ATTEMPTS = 3;

let lastForgotAttemptTime = 0;
const LOGIN_LOCK_TIME = 60;   // Testing (1 minute)
let loginAttemptTimer = null;
let loginAttempts = 0;
let loginLockSeconds = LOGIN_LOCK_TIME;
let loginLockInterval = null;
let loginLocked = false;

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
   SHOW LOADER / HIDE LOADER
=========================== */


function showLoader(text){

    loaderText.textContent = text;

    appLoader.classList.remove("hidden");

}

function hideLoader(){

    appLoader.classList.add("hidden");

}
/* =====================================
   COMMON MESSAGE
===================================== */

let messageTimer = null;
/* =====================================
   COMMON LOCK ENGINE
===================================== */

const lockState = {

    login : {
        attempts : 0,
        locked : false,
        endTime : 0,
        interval : null
    },

    forgot : {
        attempts : 0,
        locked : false,
        endTime : 0,
        interval : null
    },

    sensitive : {
        attempts : 0,
        locked : false,
        endTime : 0,
        interval : null
    }

};
function getRemainingSeconds(endTime){

    return Math.max(
        0,
        Math.ceil((endTime - Date.now()) / 1000)
    );

}
function formatLockTime(seconds){

    const min = String(Math.floor(seconds / 60)).padStart(2,"0");

    const sec = String(seconds % 60).padStart(2,"0");

    return `${min}:${sec}`;

}


function startLock(type,duration=60,messageElement){

    const state = lockState[type];

    if(!state){

        return;

    }

    state.locked = true;

    state.endTime = Date.now() + (duration * 1000);

    if(state.interval){

        clearInterval(state.interval);

    }

    updateLockUI(type,messageElement);

    state.interval = setInterval(()=>{

        updateLockUI(type,messageElement);

        if(!isLocked(type)){

            clearInterval(state.interval);

            state.interval = null;

        }

    },1000);

}
function stopLock(type){
    const state = lockState[type];
    if(!state){
        return;
    }
    state.locked = false;
    state.attempts = 0;
    state.endTime = 0;
   if(type === "sensitive"){

    sensitiveLocked = false;

lockState.sensitive.attempts = 0;
    sensitiveLockSeconds = 60;

}
    if(state.interval){
        clearInterval(state.interval);
        state.interval = null;
    }

}
function isLocked(type){
    const state = lockState[type];
    if(!state){
        return false;
    }

    if(!state.locked){
        return false;
    }

    if(getRemainingSeconds(state.endTime) <= 0){

        stopLock(type);
       

        return false;

    }

    return true;

}
function updateLockUI(type,messageElement){
    const state = lockState[type];
    if(!state){
        return;
    }
    const remaining =
        getRemainingSeconds(state.endTime);
   if(remaining <= 0){
    stopLock(type);
    if(type === "sensitive"){
        const txt =
        document.getElementById("reportPassCode");
        const btn =
        document.getElementById("verifyPass");
        if(txt){
            txt.disabled = false;
            txt.value = "";
            txt.focus();
        }
        if(btn){
            btn.disabled = false;
       }
    }
if(type === "login"){

    document.getElementById("loginPassCode").disabled = false;

    document.getElementById("loginSubmitBtn").disabled = false;

    forgotPassCodeBtn.style.pointerEvents = "auto";

    forgotPassCodeBtn.style.opacity = "1";

    document.getElementById("loginPassCode").value = "";

    document.getElementById("loginPassCode").focus();

}
   if(type === "forgot"){

    const btn =
        document.getElementById("forgotOtpBtn");

    if(btn){

        btn.disabled = false;

    }

    forgotLockMsg.classList.add("hidden");

    forgotLockMsg.innerHTML = "";

} 
    messageElement.classList.add("hidden");
    messageElement.innerHTML = "";
    return;
}
    messageElement.classList.remove("hidden");
   if(type === "sensitive"){

    const txt =
    document.getElementById("reportPassCode");

    const btn =
    document.getElementById("verifyPass");

    if(txt){

        txt.disabled = true;

    }

    if(btn){

        btn.disabled = true;

    }

}

    messageElement.style.color = "#d32f2f";

    messageElement.innerHTML = `
Maximum attempts reached.

<br><br>

Please wait

<b>${formatLockTime(remaining)}</b>

before trying again.
`;

}
function showMessage(text,type="info",duration=5000){

    clearTimeout(messageTimer);

    appMessage.classList.remove(
        "msg-info",
        "msg-success",
        "msg-warning",
        "msg-error",
        "hidden"
    );

    appMessage.classList.add("msg-"+type);

let icon = "";

switch(type){

    case "success":
        icon = "✅ ";
        break;

    case "warning":
        icon = "⚠ ";
        break;

    case "error":
        icon = "❌ ";
        break;

    default:
        icon = "ℹ ";
}

appMessageText.textContent = icon + text;
    messageTimer = setTimeout(()=>{

        hideMessage();

    },duration);

}
function hideMessage(){

    appMessage.style.opacity = "0";

    setTimeout(()=>{

        appMessage.classList.add("hidden");

        appMessage.style.opacity = "1";

    },250);

}
/* =====================================
COMMON VALIDATION MESSAGE
===================================== */

/* =====================================
COMMON VALIDATION MESSAGE
===================================== */

function highlightField(control){

    console.log(control);

    if(!control) return;

    control.style.border="2px solid red";

    control.style.boxShadow="0 0 10px red";

}
function validationMessage(message, control){

    if(!control){
        showMessage(
            message,
            "warning",
            3000
        );
        return;
    }

    // Remove previous error first
    control.classList.remove("field-error");

    // Force browser to apply the change
    void control.offsetWidth;

    // Add red border immediately
    control.classList.add("field-error");

    // Show message
    showMessage(
        message,
        "warning",
        3000
    );

    // Scroll immediately to the wrong field
    requestAnimationFrame(()=>{

        control.scrollIntoView({
            behavior:"smooth",
            block:"center"
        });

        control.focus({
            preventScroll:true
        });

    });

    // Remove highlight after 3 seconds
    setTimeout(()=>{

        control.classList.remove("field-error");

    },3000);

}
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


function updateCurrentLanguage(){

    const currentLanguageText =
    document.getElementById("currentLanguageText");

    if(currentLanguageText){

        currentLanguageText.textContent =
        languageSelect.value;

    }

}

function updateLanguageList(){

    const buttons =
    document.querySelectorAll(".language-item");

    buttons.forEach(btn=>{

        const lang = btn.dataset.lang;

        if(lang === languageSelect.value){

            btn.innerHTML = `
                <span>${lang}</span>
                <span>✓</span>
            `;
        }else{
            btn.innerHTML = `
                <span>${lang}</span>
                <span></span>
            `;
        }
   });

}

/* =====================================
SHOW PAGE
===================================== */

function showScreen(page){

    hideAllPages();

    // Login page open అయినప్పుడు మాత్రమే clear చేయాలి
    if(page === loginPage && !isLocked("login")){

    loginLockMsg.classList.add("hidden");

    loginLockMsg.innerHTML = "";

    loginLockMsg.style.color = "";

}
    page.classList.remove("hidden");
   const appTitle =
document.getElementById("appTitle");

if(page === welcomePage){

    appTitle.textContent = "Welcome to oneFaMiLe";
    appTitle.style.fontSize = "20px";

}else{

    appTitle.textContent = "oneFaMiLe";
    appTitle.style.fontSize = "24px";

}
    window.scrollTo(0,0);

}

/* =====================================
OTP TIMER
===================================== */
function startOtpTimer(timerId){

    clearInterval(otpInterval);

    // Enable buttons
    document.getElementById("verifyOTPBtn")?.removeAttribute("disabled");

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

    signupOtpActive = false;

    document.getElementById("verifyOTPBtn")
        ?.setAttribute("disabled","true");

    // Register button must remain enabled
    // so that clicking it can show OTP expired message

    signupOtpTimer.classList.add("hidden");

    resendSignupOTPBtn.classList.remove("hidden");

}

    },1000);

}
function startCooldown(){

    otpCooldownRunning = true;

    cooldownSeconds = OTP_COOLDOWN;
   sessionStorage.setItem(
    "otpCooldownEnd",
    Date.now() + OTP_COOLDOWN * 1000
);

    signupOtpTimer.classList.add("hidden");

resendSignupOTPBtn.classList.add("hidden");

otpSendingMsg.classList.add("hidden");

otpLimitMsg.classList.remove("hidden");
   backSignupOTPBtn.disabled = true;

backSignupOTPBtn.style.opacity = "0.5";

backSignupOTPBtn.style.cursor = "not-allowed";
    updateCooldown();

    clearInterval(cooldownInterval);

    cooldownInterval = setInterval(()=>{

        cooldownSeconds--;

        updateCooldown();

        if(cooldownSeconds <= 0){

    clearInterval(cooldownInterval);

    otpCooldownRunning = false;

    otpResendCount = 0;

    sessionStorage.removeItem("otpCooldownEnd");

otpLimitMsg.classList.add("hidden");

signupOtpTimer.classList.add("hidden");

otpSendingMsg.classList.add("hidden");

resendSignupOTPBtn.classList.remove("hidden");
           backSignupOTPBtn.disabled = false;

backSignupOTPBtn.style.opacity = "1";

backSignupOTPBtn.style.cursor = "pointer";

}
    },1000);

}

function updateCooldown(){

    const min = String(Math.floor(cooldownSeconds/60)).padStart(2,"0");

    const sec = String(cooldownSeconds%60).padStart(2,"0");

    cooldownTimer.textContent = `${min}:${sec}`;

}
function startLoginLock(){

    const loginLockMsg =
        document.getElementById("loginLockMsg");

    document.getElementById("loginPassCode").disabled = true;

    document.getElementById("loginSubmitBtn").disabled = true;

    forgotPassCodeBtn.style.pointerEvents = "none";

    forgotPassCodeBtn.style.opacity = "0.5";

    startLock(
        "login",
        LOGIN_LOCK_TIME,
        loginLockMsg
    );

}
function startForgotLock(){
console.log(document.getElementById("forgotOtpBtn"));
   const forgotLockMsg =
        document.getElementById("forgotLockMsg");
   const btn =
    document.getElementById("forgotOtpBtn");

if(btn){

    btn.disabled = true;

}

    startLock(
        "forgot",
        60,
        forgotLockMsg
    );

}

function updateLoginLock(){

    const timer =
    document.getElementById("loginLockTimer");

    if(!timer) return;

    const min =
    String(Math.floor(loginLockSeconds/60)).padStart(2,"0");

    const sec =
    String(loginLockSeconds%60).padStart(2,"0");

    timer.textContent = `${min}:${sec}`;

}
function restoreCooldown(){

    const endTime = Number(
        sessionStorage.getItem("otpCooldownEnd")
    );
    if(!endTime){
        return;
    }
    const remaining =
        Math.ceil((endTime - Date.now()) / 1000);
    if(remaining <= 0){
        sessionStorage.removeItem("otpCooldownEnd");
        return;
    }
   
    otpCooldownRunning = true;
    cooldownSeconds = remaining;
    resendSignupOTPBtn.classList.add("hidden");
    otpLimitMsg.classList.remove("hidden");
   backSignupOTPBtn.disabled = true;

backSignupOTPBtn.style.opacity = "0.5";

backSignupOTPBtn.style.cursor = "not-allowed";
    signupOtpTimer.classList.add("hidden");

    otpSendingMsg.classList.add("hidden");
    updateCooldown();
    clearInterval(cooldownInterval);
    cooldownInterval = setInterval(()=>{
    cooldownSeconds--;

        updateCooldown();

        if(cooldownSeconds <= 0){

            clearInterval(cooldownInterval);

            otpCooldownRunning = false;

            otpResendCount = 0;

            sessionStorage.removeItem("otpCooldownEnd");

           otpLimitMsg.classList.add("hidden");

signupOtpTimer.classList.add("hidden");

otpSendingMsg.classList.add("hidden");

resendSignupOTPBtn.classList.remove("hidden");

        }

    },1000);

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

    if(registerOTP){

        registerOTP.value = "";

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

    updateCurrentLanguage();

    updateLanguageList();

    if(!dashboard.classList.contains("hidden")){

        homeBtn.click();

    }

};

document.querySelectorAll(".language-item").forEach(btn=>{

    btn.onclick = ()=>{

        languageSelect.value = btn.dataset.lang;

        updateWelcomePage();

        updateCurrentLanguage();

        updateLanguageList();

    };

});
function updateWelcomePage(){

    const txt = languageData[languageSelect.value];

   // Login Welcome Page

const welcomeHeading =
    document.getElementById("welcomeHeading");

if(welcomeHeading){

    welcomeHeading.innerHTML = txt.welcome;

}

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

updateWelcomePage();

updateMenuIcon();

updateSideMenuUser();
    

};

/* ======================

Forget PassCode Btn

====================== */

forgotPassCodeBtn.onclick = ()=>{

    if(isLocked("login")){

        const remaining =
            getRemainingSeconds(lockState.login.endTime);

        loginLockMsg.style.color = "#d32f2f";

        loginLockMsg.classList.remove("hidden");

        loginLockMsg.innerHTML = `
Maximum login attempts reached.

<br><br>

Please wait for

<b>${formatLockTime(remaining)}</b>

before trying again.
`;

        return;
    }
    // Existing code...

    clearForgotPassCode();

    showScreen(forgotPassCodePage);

    document.getElementById("otpPageHeading").textContent = "Verify OTP";

    setFocus(forgotMobileNo);

};

async function sendForgotOTP(){

    const mobile = forgotMobileNo.value.trim();
   if(isLocked("forgot")){

    updateLockUI(
        "forgot",
        document.getElementById("forgotLockMsg")
    );

    return;

}

    if(mobile === ""){
       showMessage(
    "Enter Mobile Number.",
    "warning",
    3000
);
        forgotMobileNo.focus();
        return;
    }
if(mobile.length !== 10){

    forgotLockMsg.style.color = "#ff9800";

    forgotLockMsg.classList.remove("hidden");

    forgotLockMsg.style.color = "#ff9800";

forgotLockMsg.classList.remove("hidden");

forgotLockMsg.innerHTML = `
<div id="wrongForgotText">
Mobile Number must contain 10 digits.
</div>
`;
   setTimeout(()=>{

    forgotLockMsg.classList.add("hidden");

    forgotLockMsg.innerHTML="";

},5000);
    forgotMobileNo.focus();

    return;

}
   showLoader("Verifying Mobile Number...");
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

lockState.forgot.attempts++;
    lastForgotAttemptTime = Date.now();

if(lockState.forgot.attempts >= 3){
   hideLoader();
        startForgotLock();

        return;

    }

    forgotLockMsg.style.color = "#ff9800";

    forgotLockMsg.classList.remove("hidden");

    forgotLockMsg.innerHTML = `
<div id="wrongForgotText">
    Invalid Mobile Number.
</div>

<div id="forgotAttemptText">
Attempts Remaining : ${3 - lockState.forgot.attempts}
</div>
`;

    setTimeout(()=>{

        const msg =
        document.getElementById("wrongForgotText");

        if(msg){

            msg.remove();

        }

    },3000);

    hideLoader();

    return;

}
        hideLoader();
lockState.forgot.attempts = 0;
       otpMode = "forgot";

        clearOTP();

        showScreen(signupOTPPage);
        restoreCooldown();

        startOtpTimer("signupOtpTimer");
        otpSendingMsg.classList.add("hidden");
        document.getElementById("registerBtn").textContent = "Reset Pass Code";

        signupPassCodeBox.classList.add("hidden");
        signupConfirmPassCodeBox.classList.add("hidden");

    }catch(err){
        hideLoader();

        showMessage(     "Unable to connect to server.",     "error",     3000 );
        console.log(err);

    }

}

sendForgotOTPBtn.onclick = async ()=>{
   // =====================================
// FORGOT PASSWORD LOCK CHECK
// =====================================

if(isLocked("forgot")){

    updateLockUI(
        "forgot",
        document.getElementById("forgotLockMsg")
    );

    return;

}
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

    // ================================
    // VALIDATE SIGNUP
    // ================================

    if(!validateSignupBasic()){

        hideLoader();

        return;
    }

    // ================================
    // CHECK USER
    // ================================

    if(!(await checkSignup())){

        hideLoader();

        return;
    }

    // ================================
    // SEND OTP
    // ================================

    const formData = new FormData();

    formData.append(
        "action",
        "sendSignupOTP"
    );

    formData.append(
        "mobile",
        mobileNo.value.trim()
    );

    try{

        const response = await fetch(API_URL,{

            method:"POST",

            body:formData

        });

        const result = await response.json();

        console.log("Signup OTP Result:", result);

        // ================================
        // OTP FAILED
        // ================================

        if(result.status !== "success"){

            hideLoader();

            showMessage(
                result.message || "Unable to send OTP.",
                "warning",
                3000
            );

            return;
        }

        // ================================
        // OTP SUCCESS
        // ================================

        otpMode = "signup";

        signupOtpActive = true;

        registerBtn.textContent = "Register";

        clearOTP();

        signupPassCodeBox.classList.remove("hidden");

        signupConfirmPassCodeBox.classList.remove("hidden");

        // STOP SENDING OTP LOADER
        hideLoader();

        // OPEN VERIFY OTP PAGE
        showScreen(signupOTPPage);

        // START OTP TIMER
        startOtpTimer("signupOtpTimer");

        console.log("Verify OTP page opened");

    }
    catch(err){

        console.log(
            "Signup OTP Error:",
            err
        );

        hideLoader();

        showMessage(
            "Unable to connect to server.",
            "error",
            3000
        );

    }

}
signupOTPBtn.onclick = async ()=>{

    if(signupOtpActive){

        showMessage(
            "OTP already sent. Please wait until it expires.",
            "info",
            3000
        );

        showScreen(signupOTPPage);

        return;
    }

    otpResendCount = 0;

    showLoader("Sending OTP...");

    await sendSignupOTP();

};
resendSignupOTPBtn.onclick = async ()=>{

    if(otpCooldownRunning){

        return;
    }

    if(otpResendCount >= MAX_OTP_RESEND){

        startCooldown();

        return;
    }

    // ================================
    // CLEAR OLD OTP + PASS CODES
    // ================================

    clearOTP();

    document.getElementById("sensitivePassCode").value = "";

    document.getElementById("registerConfirmPassCode").value = "";

    // ================================
    // RESEND OTP
    // ================================

    otpResendCount++;

    resendSignupOTPBtn.classList.add("hidden");

    otpSendingMsg.classList.remove("hidden");

    try{

        if(otpMode === "signup"){

            await sendSignupOTP();

        }else if(otpMode === "forgot"){

            await sendForgotOTP();

        }

    }finally{

        // ================================
        // HIDE SENDING OTP AFTER REQUEST
        // ================================

        otpSendingMsg.classList.add("hidden");

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

    if(otpCooldownRunning){

        const min =
            String(Math.floor(cooldownSeconds / 60)).padStart(2,"0");

        const sec =
            String(cooldownSeconds % 60).padStart(2,"0");

        showMessage(
            `Please wait for ${min}:${sec} before going back.`,
            "info",
            3000
        );

        return;
    }

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

    // ================================
    // OTP EXPIRY CHECK
    // ================================

    if(
        otpMode === "signup" &&
        !signupOtpActive
    ){

        showMessage(
            "OTP has expired. Please request a new OTP.",
            "warning",
            4000
        );

        return;
    }

    // ================================
    // SIGNUP
    // ================================

    if(otpMode === "signup"){

        await verifySignupOTP();

    }

    // ================================
    // FORGOT PASSWORD
    // ================================

    else if(otpMode === "forgot"){

        await verifyForgotOTP();

    }

};
function validateSignupBasic(){

    if(loginUserName.value.trim()==""){

    validationMessage(
        "Login User Name is required.",
        loginUserName
    );

    return false;

}
    if(loginUserName.value.trim().length < 6){

validationMessage(
    "Login User Name must contain at least 6 characters.",
    loginUserName
);

return false;
}
    if(surName.value.trim()==""){

    validationMessage(
        "Surname is required.",
        surName
    );

    return false;

}
    if(surName.value.trim().length < 2){

validationMessage(
    "Enter a valid surname.",
    surName
);

return false;
}
    if(!isValidName(surName.value.trim())){

validationMessage(
    "Surname must contain only letters.",
    surName
);

return false;
}
    if(lastName.value.trim()==""){
validationMessage(
    "Last Name is required.",
    lastName
);

return false;}

if(lastName.value.trim().length < 2){

validationMessage(
    "Enter a valid last name.",
    lastName
);

return false;
}
    if(!isValidName(lastName.value.trim())){

validationMessage(
    "Last Name must contain only letters.",
    lastName
);

return false;
}
    if(mobileNo.value.trim()==""){
validationMessage(
    "Mobile Number is required.",
    mobileNo
);

return false;    }
if(!isValidMobile(mobileNo.value.trim())){

    validationMessage(
        "Enter a valid Mobile Number.",
        mobileNo
    );

    return false;

}
    if(emailId.value.trim()==""){

    validationMessage(
        "Email ID is required.",
        emailId
    );

    return false;

}

    if(!isValidEmail(emailId.value.trim())){

    validationMessage(
        "Enter a valid Email ID.",
        emailId
    );

    return false;

}
    if(gender.value==""){
validationMessage(
    "Please select Gender.",
    gender
);

return false;    }

const dob = new Date(dateOfBirth.value);

if(dateOfBirth.value === ""){

validationMessage(
    "Please select Date of Birth.",
    dateOfBirth
);

return false;
}

const today = new Date();

if(dob > today){

validationMessage(
    "Future Date of Birth is not allowed.",
    dateOfBirth
);

return false;
}

let age = today.getFullYear() - dob.getFullYear();

const month = today.getMonth() - dob.getMonth();

if(month < 0 || (month === 0 && today.getDate() < dob.getDate())){

    age--;

}

if(age < 18){

validationMessage(
    "Minimum age must be 18 years.",
    dateOfBirth
);

return false;
}
   
if(place.value.trim()==""){
validationMessage(
    "Place is required.",
    place
);

return false;}

if(place.value.trim().length < 2){

validationMessage(
    "Enter a valid Place.",
    place
);

return false;
}
if(!isValidName(place.value.trim())){

validationMessage(
    "Place must contain only letters.",
    place
);

return false;
}
if(state.value.trim()==""){
validationMessage(
    "State is required.",
    state
);

return false;}

if(state.value.trim().length < 2){

validationMessage(
    "Enter a valid State.",
    state
);

return false;
}
if(!isValidName(state.value.trim())){

   validationMessage(
    "State must contain only letters.",
    state
);

return false;
}
if(country.value.trim()==""){
    validationMessage(
    "Country is required.",
    country
);

return false;}

if(country.value.trim().length < 2){

validationMessage(
    "Enter a valid Country.",
    country
);

return false;
}
if(!isValidName(country.value.trim())){

validationMessage(
    "Country must contain only letters.",
    country
);

return false;
}
    
    return true;

}


function validateSignup(){

    if(!validateSignupBasic()){
        return false;
    }

    if(sensitivePassCode.value.trim()==""){
       if(sensitivePassCode.value.trim().length !== 6){

showMessage("Pass Code must contain exactly 6 digits.","warning",3000);
    sensitivePassCode.focus();

    return false;

}
showMessage("Pass Code is required.","warning",3000);
       sensitivePassCode.focus();
        return false;
    }
   

    if(registerConfirmPassCode.value.trim()==""){
       if(registerConfirmPassCode.value.trim().length !== 6){

    showMessage("Confirm Pass Code must contain exactly 6 digits.","warning",3000);

    registerConfirmPassCode.focus();

    return false;

}
        showMessage("Confirm Pass Code is required.","warning",3000);
        registerConfirmPassCode.focus();
        return false;
    }

    if(sensitivePassCode.value !== registerConfirmPassCode.value){
        showMessage("Pass Codes do not match.","warning",3000);
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
    showMessage(     result.message,     result.status === "success" ? "success" : "warning",     3000 );
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
           clearTimeout(loginAttemptTimer);
           loginAttempts = 0;
           hideLoader();
    showMessage(     result.message,     result.status === "success" ? "success" : "warning",     3000 );

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

    showMessage(     result.message,     result.status === "success" ? "success" : "warning",     3000 );

}
    }
    catch(err){
        hideLoader();

        showMessage(     "Unable to connect to server.",     "error",     3000 );

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
        showMessage("Mobile Number is required.","warning",3000);
        forgotMobileNo.focus();
        return;
    }
    if(otp===""){
showMessage("OTP is required.","warning",3000);
       return;
    }
if (otp.length !== 6) {
    showMessage("OTP must contain exactly 6 digits.","warning",3000);
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
          hideLoader();
          signupOTPPage.classList.add("hidden");
resetPassCodePage.classList.remove("hidden");
            
        }else{

            showMessage(     result.message,     result.status === "success" ? "success" : "warning",     3000 );

        }

    }catch(err){
        hideLoader();

        console.log(err);

showMessage("Server Error.","error",3000);
    }

}
/* ======================
VERIFY SIGNUP OTP
====================== */

async function verifySignupOTP(){

    // ================================
    // 1. OTP
    // ================================

    const otp = registerOTP.value.trim();


    // OTP EMPTY
    if(otp === ""){

        showMessage(
            "Please enter OTP.",
            "warning",
            3000
        );

        registerOTP.focus();

        return;
    }


    // OTP LENGTH
    if(otp.length !== 6){

        showMessage(
            "OTP must contain exactly 6 digits.",
            "warning",
            3000
        );

        registerOTP.focus();

        return;
    }


    // ================================
    // 2. PASS CODE CONDITIONS
    // ================================

    const passCode =
        sensitivePassCode.value.trim();

    const confirmPassCode =
        registerConfirmPassCode.value.trim();


    // PASS CODE EMPTY
    if(passCode === ""){

        showMessage(
            "Pass Code is required.",
            "warning",
            3000
        );

        sensitivePassCode.focus();

        return;
    }


    // PASS CODE LENGTH
    if(passCode.length !== 6){

        showMessage(
            "Pass Code must contain exactly 6 digits.",
            "warning",
            3000
        );

        sensitivePassCode.focus();

        return;
    }


    // CONFIRM PASS CODE EMPTY
    if(confirmPassCode === ""){

        showMessage(
            "Confirm Pass Code is required.",
            "warning",
            3000
        );

        registerConfirmPassCode.focus();

        return;
    }


    // CONFIRM PASS CODE LENGTH
    if(confirmPassCode.length !== 6){

        showMessage(
            "Confirm Pass Code must contain exactly 6 digits.",
            "warning",
            3000
        );

        registerConfirmPassCode.focus();

        return;
    }


    // PASS CODES MATCH
    if(passCode !== confirmPassCode){

        showMessage(
            "Pass Codes do not match.",
            "warning",
            3000
        );

        registerConfirmPassCode.focus();

        return;
    }


    // ================================
    // 3. NOW VERIFY OTP WITH SERVER
    // ================================

    const formData = new FormData();

    formData.append(
        "action",
        "verifySignupOTP"
    );

    formData.append(
        "mobile",
        mobileNo.value.trim()
    );

    formData.append(
        "otp",
        otp
    );


    try{

        showLoader("Verifying OTP...");


        const response = await fetch(API_URL,{

            method:"POST",

            body:formData

        });


        const result =
            await response.json();


        // ================================
        // 4. WRONG OTP
        // ================================

        if(result.status !== "success"){

            hideLoader();

            showMessage(
                "Wrong OTP entered.",
                "warning",
                3000
            );

            registerOTP.focus();

            return;
        }


        // ================================
        // 5. OTP CORRECT
        // ================================

        hideLoader();

        await registerUser();

    }
    catch(error){

        hideLoader();

        console.log(error);

        showMessage(
            "Unable to verify OTP.",
            "error",
            3000
        );

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
        showMessage(     "OTP is required.",     "warning",     3000 );        return;    }
    if(newPassCode===""){        showMessage("New Pass Code is required.","warning",3000);        return;
    }
    if(confirmPassCode===""){        showMessage("Confirm Pass Code is required.","warning",3000);        return;
    }
    if(newPassCode!==confirmPassCode){        showMessage("Pass Codes do not match.","warning",3000);        return;
    }
    const mobile = forgotMobileNo.value.trim();
    /* -------- OTP Verify -------- */
    const verifyData = new FormData();
    verifyData.append("action","verifyForgotOTP");
    verifyData.append("mobile",mobile);
    verifyData.append("otp",otp);
    const verifyResponse = await fetch(API_URL,{        method:"POST",        body:verifyData    });
    const verifyResult = await verifyResponse.json();
    if(verifyResult.status!=="success"){  hideLoader();  
    showMessage(
        verifyResult.message,
    verifyResult.status === "success" ? "success" : "warning",  3000);        return;
    }
hideLoader();
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

showMessage(
    resetResult.message,
    resetResult.status === "success" ? "success" : "warning",
    3000
);
    if(resetResult.status==="success"){

        signupOTPPage.classList.add("hidden");

        loginPage.classList.remove("hidden");

        forgotMobileNo.value="";
        sensitivePassCode.value="";
        registerConfirmPassCode.value="";

    }

}


loginSubmitBtn.onclick = async ()=>{

   if(isLocked("login")){

    const remaining =
    getRemainingSeconds(lockState.login.endTime);
      
loginLockMsg.classList.remove("hidden");

loginLockMsg.innerHTML = `
Maximum login attempts reached.

<br><br>

Please wait

<b>${formatLockTime(remaining)}</b>

before trying again.
`;    return;

}
   // =====================================
// RESET LOGIN ATTEMPTS AFTER 1 MINUTE
// =====================================

const now = Date.now();

if(
    loginAttempts > 0 &&
    !loginLocked &&
    (now - lastLoginAttemptTime) >= ATTEMPT_RESET_TIME * 1000
){

    loginAttempts = 0;

    loginLockMsg.classList.add("hidden");
    loginLockMsg.innerHTML = "";
    loginLockMsg.style.color = "";

}
    const loginId =
    document.getElementById("loginId").value.trim();

    const passCode =
    document.getElementById("loginPassCode").value.trim();

    if(loginId==""){
showMessage(
    "Enter Login ID.",
    "warning",
    3000
);

document.getElementById("loginId").focus();        return;
    }

    if(passCode==""){
showMessage(
    "Enter Pass Code.",
    "warning",
    3000
);

document.getElementById("loginPassCode").focus();        return;
    }
   if(passCode.length !== 6){

    loginLockMsg.style.color = "#ff9800";

    loginLockMsg.classList.remove("hidden");

    loginLockMsg.innerHTML =
    "Pass Code must contain exactly 6 digits.";

    return;

}
const formData = new FormData();

    formData.append("action","login");
    formData.append("loginId",loginId);
    formData.append("passCode",passCode);

    try{
        showLoader("Signing In...");
        const response = await fetch(API_URL,{
            method:"POST",
            body:formData
        });

        const result = await response.json();
        if(result.status=="success"){
           loginAttempts = 0;

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

    loginAttempts++;
    lastLoginAttemptTime = Date.now();
    if(loginAttempts >= MAX_LOGIN_ATTEMPTS){

        startLoginLock();

        return;

    }
    clearTimeout(loginAttemptTimer);

loginAttemptTimer = setTimeout(()=>{

    if(
        !isLocked("login") &&
        loginAttempts > 0
    ){

        loginAttempts = 0;

        loginLockMsg.classList.add("hidden");

        loginLockMsg.innerHTML = "";

        loginLockMsg.style.color = "";

    }

}, ATTEMPT_RESET_TIME * 1000);        
setTimeout(()=>{

    if(
        !isLocked("login") &&
        loginAttempts > 0
    ){

        loginAttempts = 0;

        loginLockMsg.classList.add("hidden");

        loginLockMsg.innerHTML = "";

        loginLockMsg.style.color = "";

    }

}, ATTEMPT_RESET_TIME * 1000);
    // Orange Color
    loginLockMsg.style.color = "#ff9800";

    loginLockMsg.classList.remove("hidden");

   loginLockMsg.innerHTML = `
<div id="wrongPassText">
    Invalid User ID or Pass Code.
</div>

<div id="attemptText">
    Attempts Remaining : ${MAX_LOGIN_ATTEMPTS-loginAttempts}
</div>
`;
 setTimeout(()=>{

    const wrongPassText =
    document.getElementById("wrongPassText");

    if(wrongPassText){

        wrongPassText.remove();

    }

},3000);          
}
    }catch(err){
showMessage(
    "Unable to connect to server.",
    "error",
    3000
);
       console.log(err);

    }
finally{

    hideLoader();

   
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
<div
id="sensitiveLockMsg"
class="hidden"
style="
text-align:center;
font-size:13px;
margin:10px;
font-weight:500;">
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

    const sensitiveLockMsg =
document.getElementById("sensitiveLockMsg");
const now = Date.now();

if(
    lockState.sensitive.attempts > 0 &&
    !isLocked("sensitive") &&
    (now - lastSensitiveAttemptTime) >= ATTEMPT_RESET_TIME * 1000
){

    lockState.sensitive.attempts = 0;

}
if(isLocked("sensitive")){

    updateLockUI(
        "sensitive",
        sensitiveLockMsg
    );

    return;

}else{

    sensitiveLocked = false;

}   
    const enteredPass =
        document.getElementById("reportPassCode").value.trim();

    const savedPass =
        sessionStorage.getItem("passCode");

    if (enteredPass === "") {

    showMessage(
        "Enter Pass Code.",
        "warning",
        3000
    );

    document.getElementById("reportPassCode").focus();

    return;
}

   if (enteredPass !== savedPass) {

lockState.sensitive.attempts++;
 lastSensitiveAttemptTime = Date.now();      
    //lastSensitiveAttemptTime = Date.now();

   if(lockState.sensitive.attempts >= 3){
    startLock(
        "sensitive",
        60,
        sensitiveLockMsg
    );

   
    return;

}
   showMessage(
    "Wrong Pass Code. Attempts Remaining : " +
    (3 - lockState.sensitive.attempts),
    "warning",
    3000
);
    document.getElementById("reportPassCode").focus();

    return;
}
lockState.sensitive.attempts = 0;
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

console.log(settingsMenuBtn);
console.log(settingsPage);
console.log(backSettingsBtn);
console.log(languageSettingsBtn);
console.log(changePassSettingsBtn);
console.log(backupSettingsBtn);
console.log(restoreSettingsBtn);
settingsMenuBtn.onclick = ()=>{

    closeSideMenu();

    hideAllPages();

    settingsPage.classList.remove("hidden");

    window.scrollTo(0,0);

};
profileMenuBtn.onclick = ()=>{

    closeSideMenu();

    // My Profile page
    showProfilePage();

};
backSettingsBtn.onclick = ()=>{

   settingsPage.classList.add("hidden");

   showScreen(dashboard);

    homeBtn.click();


};
languageSettingsBtn.onclick = ()=>{

    settingsPage.classList.add("hidden");

    languagePage.classList.remove("hidden");
    updateLanguageList();

};
backLanguageBtn.onclick = ()=>{

    languagePage.classList.add("hidden");

    settingsPage.classList.remove("hidden");

};
backBackupBtn.onclick = ()=>{

    backupPage.classList.add("hidden");

    settingsPage.classList.remove("hidden");

};
createBackupBtn.onclick = ()=>{

    const now = new Date();

    const backupDate =
        now.toLocaleString();

    localStorage.setItem(
        "lastBackup",
        backupDate
    );

    lastBackupText.textContent =
        backupDate;

    showMessage(
        "Backup Created Successfully.",
        "success",
        3000
    );
};
exportBackupBtn.onclick = ()=>{

    const user =
        JSON.parse(sessionStorage.getItem("user"));

    if(!user){

        showMessage(
            "No user data available.",
            "warning",
            3000
        );

        return;

    }

    const backupData = {

    app : "oneFaMiLe",

    version : "1.0",

    backupDate : new Date().toLocaleString(),

    user : {

        userId : user.userId,

        loginUserName : user.loginUserName,

        surName : user.surName,

        middleName : user.middleName,

        lastName : user.lastName,

        mobile : user.mobile,

        email : user.email,

        gender : user.gender,

        dateOfBirth : user.dateOfBirth,

        place : user.place,

        state : user.state,

        country : user.country

    },

    settings : {

        language : languageSelect.value

    },

    expenses : [],

    activities : [],

    income : [],

    loans : [],

    health : [],

    family : [],

    memories : []

};
    const json =
        JSON.stringify(backupData,null,4);

    const blob =
        new Blob([json],{
            type:"application/json"
        });

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    const now = new Date();

const fileDate =
    now.getFullYear() +

    String(now.getMonth()+1).padStart(2,"0") +

    String(now.getDate()).padStart(2,"0");

const fileTime =
    String(now.getHours()).padStart(2,"0") +

    String(now.getMinutes()).padStart(2,"0");

a.download =
    `oneFaMiLe_${user.loginUserName}_${fileDate}_${fileTime}.json`;

    a.click();

    URL.revokeObjectURL(url);

    showMessage(
        "Backup Exported Successfully.",
        "success",
        3000
    );

};
changePassSettingsBtn.onclick = ()=>{

    settingsPage.classList.add("hidden");

    changePasswordPage.classList.remove("hidden");

};

backupSettingsBtn.onclick = ()=>{

    settingsPage.classList.add("hidden");

    backupPage.classList.remove("hidden");

    const lastBackup =
        localStorage.getItem("lastBackup");

    lastBackupText.textContent =
        lastBackup ? lastBackup : "Never";

};
restoreSettingsBtn.onclick = ()=>{

    settingsPage.classList.add("hidden");

    restorePage.classList.remove("hidden");

};
backRestoreBtn.onclick = ()=>{

    restorePage.classList.add("hidden");

    settingsPage.classList.remove("hidden");

};
aboutSettingsBtn.onclick = ()=>{

    showMessage(

        "About Module",

        "success",

        2000

    );

};
profileMenuBtn.onclick = ()=>{

    closeSideMenu();

    hideAllPages();

    profilePage.classList.remove("hidden");

    updateProfilePage();

    window.scrollTo(0,0);

};
profileBackBtn.onclick = ()=>{

    profilePage.classList.add("hidden");

    showScreen(dashboard);

    homeBtn.click();

};
editProfileBtn.onclick = ()=>{

    showEditProfile();

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
showMessage("Old Pass Code is required.","warning",3000);
       oldPassCode.focus();
        return;
    }

    if (newPass === "") {
        showMessage("New Pass Code is required.","warning",3000);
        changeNewPassCode.focus();
        return;
    }

    if (confirmPass === "") {
        showMessage("Confirm New Pass Code is required.","warning",3000);
        changeConfirmPassCode.focus();
        return;
    }

    if (newPass !== confirmPass) {
showMessage("New Pass Codes do not match.","warning",3000);
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

        showMessage(     result.message,     result.status === "success" ? "success" : "warning",     3000 );

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
        showMessage(     "Unable to connect to server.",     "error",     3000 );

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
showMessage("Please fill all the required fields.","warning",3000);
       return;
    }
    
    if (oldPass !== sessionStorage.getItem("passCode")) {
showMessage("Old Pass Code is incorrect.","warning",3000);
       return;
    }

    if (newPass !== confirmPass) {
showMessage("New Pass Code and Confirm Pass Code do not match.","warning",3000);
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

            showMessage(     result.message,     result.status === "success" ? "success" : "warning",     3000 );

            homeBtn.click();

        } else {

            showMessage(     result.message,     result.status === "success" ? "success" : "warning",     3000 );

        }

    } catch (err) {

        showMessage(     "Unable to connect to server.",     "error",     3000 );

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

function formatDateForProfile(dateValue){

    if(!dateValue) return "-";

    const parts = String(dateValue).split("-");

    if(parts.length === 3){

        return `${parts[2]}-${parts[1]}-${parts[0]}`;

    }

    return dateValue;
}
function updateProfilePage(){

    const user =
        JSON.parse(sessionStorage.getItem("user"));

    if(!user){
        return;
    }

    document.getElementById("profileLoginUserName").textContent =
        user.loginUserName || "-";

    document.getElementById("profileName").textContent =
        `${user.surName || ""} ${user.middleName || ""} ${user.lastName || ""}`
        .replace(/\s+/g," ")
        .trim() || "-";

    document.getElementById("profileMobile").textContent =
        user.mobile || "-";

    document.getElementById("profileEmail").textContent =
        user.email || "-";

    document.getElementById("profileGender").textContent =
        user.gender || "-";

   document.getElementById("profileDOB").textContent =
    formatDateForProfile(user.dateOfBirth);

    document.getElementById("profilePlace").textContent =
        user.place || "-";

    document.getElementById("profileState").textContent =
        user.state || "-";

    document.getElementById("profileCountry").textContent =
        user.country || "-";

}
function showEditProfile(){

    const user =
        JSON.parse(sessionStorage.getItem("user"));

    if(!user){
        return;
    }

    hideAllPages();

    profilePage.classList.remove("hidden");

    const name =
        `${user.surName || ""} ${user.middleName || ""} ${user.lastName || ""}`
        .replace(/\s+/g," ")
        .trim();


    profilePage.innerHTML = `

        <h3>
            ✏️ Edit Profile
        </h3>

<div class="profile-box edit-profile-box">
            <div class="profile-row">
    <span>Login User Name</span>

    <input
        id="editProfileLoginUserName"
        type="text"
        value="${user.loginUserName || ""}"
    >

</div>


            <div class="profile-row">
    <span>Sur Name</span>

    <input
        id="editProfileSurName"
        type="text"
        value="${user.surName || ""}"
    >

</div>

<div class="profile-row">
    <span>Middle Name</span>

    <input
        id="editProfileMiddleName"
        type="text"
        value="${user.middleName || ""}"
    >

</div>

<div class="profile-row">
    <span>Last Name</span>

    <input
        id="editProfileLastName"
        type="text"
        value="${user.lastName || ""}"
    >

</div>

<div class="profile-row phone-test-row">

    <span>Mobile Number</span>

    <div class="phone-test-value">

        <strong>${user.mobile || "-"}</strong>

        <button
            id="changeMobileBtn"
            class="grid-btn">

            ✏️ Change

        </button>

    </div>

</div>
            
            <div class="profile-row">
                <span>Email</span>

                <input
                    id="editProfileEmail"
                    type="email"
                    value="${user.email || ""}"
                >

            </div>

            <div class="profile-row">
    <span>Gender</span>

    <select id="editProfileGender">

        <option value="">Select Gender</option>

        <option value="Male"
            ${user.gender === "Male" ? "selected" : ""}>
            Male
        </option>

        <option value="Female"
            ${user.gender === "Female" ? "selected" : ""}>
            Female
        </option>

        <option value="Other"
            ${user.gender === "Other" ? "selected" : ""}>
            Other
        </option>

    </select>

</div>

           <div class="profile-row">
    <span>Date of Birth</span>

    <input
        id="editProfileDateOfBirth"
        type="date"
        value="${user.dateOfBirth || ""}"
    >

</div>

            <div class="profile-row">
                <span>Place</span>

                <input
                    id="editProfilePlace"
                    type="text"
                    value="${user.place || ""}"
                >

            </div>

            <div class="profile-row">
                <span>State</span>

                <input
                    id="editProfileState"
                    type="text"
                    value="${user.state || ""}"
                >

            </div>

            <div class="profile-row">
                <span>Country</span>

                <input
                    id="editProfileCountry"
                    type="text"
                    value="${user.country || ""}"
                >

            </div>

        </div>


           <div align="center">

        <button
            id="saveProfileBtn"
            class="grid-btn">

            💾 Save

        </button>

        <div class="profile-action-buttons">

            <button
                id="cancelEditProfileBtn"
                class="grid-btn">

                ↩ Cancel

            </button>

            <button
                id="profileEditBackBtn"
                class="back-btn">

                ← Back

            </button>

        </div>

    </div>

`;
// =====================================
// CHANGE MOBILE NUMBER
// =====================================

document.getElementById("changeMobileBtn").onclick = ()=>{

 
    // =====================================
    // CHECK PENDING MOBILE OTP
    // =====================================

    const pendingMobile =
        sessionStorage.getItem(
            "mobileChangePendingMobile"
        );

    const otpExpiresAt =
        Number(
            sessionStorage.getItem(
                "mobileChangeOTPExpiresAt"
            )
        );


    // =====================================
    // OTP STILL ACTIVE
    // =====================================

    // =====================================
// ACTIVE OTP STILL EXISTS
// =====================================

const now =
    Date.now();


if(
    pendingMobile &&
    otpExpiresAt &&
    otpExpiresAt > now
){

    const remainingSeconds =
        Math.ceil(
            (otpExpiresAt - now) / 1000
        );


    // =====================================
    // RETURN DIRECTLY TO VERIFY OTP PAGE
    // =====================================

    showMobileOTPPage(
        pendingMobile,
        remainingSeconds
    );

    return;

}


    // =====================================
    // NO ACTIVE OTP
    // =====================================

    sessionStorage.removeItem(
        "mobileChangePendingMobile"
    );

    sessionStorage.removeItem(
        "mobileChangeOTPExpiresAt"
    );


// =====================================
// CHECK MOBILE CHANGE 1 MINUTE LOCK
// =====================================

const mobileLockUntil =
    Number(
        sessionStorage.getItem(
            "mobileChangeLockUntil"
        )
    ) || 0;


if(
    mobileLockUntil &&
    mobileLockUntil > Date.now()
){

    showMessage(
        "Please wait until the 1 minute lock expires.",
        "warning",
        3000
    );

    return;
}


// =====================================
// NORMAL CHANGE MOBILE NUMBER PAGE
// =====================================

profilePage.innerHTML = `

    <h3>
        📱 Change Mobile Number
    </h3>

    <div class="profile-box">
<!-- =================================
     CURRENT MOBILE
     ================================= -->

<div class="mobile-change-row">

    <span class="mobile-change-label">
        Current Mobile Number
    </span>

    <span class="mobile-change-colon">
        :
    </span>

    <strong class="mobile-change-value">
        ${user.mobile || "-"}
    </strong>

</div>


<!-- =================================
     NEW MOBILE
     ================================= -->

<div class="mobile-change-row">

    <span class="mobile-change-label">
        New Mobile Number
    </span>

    <span class="mobile-change-colon">
        :
    </span>

    <div class="new-mobile-area">

    <input
        id="newMobileNumber"
        type="tel"
        inputmode="numeric"
        maxlength="10"
    >

    <div
        id="mobileAvailabilityMsg"
        class="mobile-availability-msg"
    ></div>

    <div
        id="mobileOtpSendingMsg"
        class="hidden"
    >
        <span class="spinner"></span>
        Sending OTP...
    </div>

</div>

</div>

</div>
        </div>


        <div align="center">

            <button
                id="sendMobileOTPBtn"
                class="grid-btn">

                Send OTP

            </button>


            <br><br>

            <button
                id="mobileChangeBackBtn"
                class="back-btn">

                ← Back

            </button>

        </div>

    `;


    // =====================================
    // BACK
    // =====================================

    document.getElementById("mobileChangeBackBtn").onclick = ()=>{

        showEditProfile();

    };

// =====================================
// LIVE MOBILE AVAILABILITY CHECK
// =====================================

document
    .getElementById("newMobileNumber")
    .addEventListener("input", async function(){

    const mobile =
        this.value.trim();

    const msg =
        document.getElementById(
            "mobileAvailabilityMsg"
        );
const sendBtn =
    document.getElementById(
        "sendMobileOTPBtn"
    );
        if(sendBtn){

    sendBtn.disabled = true;

}

    // Clear message initially
    msg.textContent = "";
    msg.style.color = "";


    // Only digits
    if(!/^\d*$/.test(mobile)){

        this.value =
            mobile.replace(/\D/g,"");

        return;
    }


    // Wait until 10 digits
   if(mobile.length !== 10){

    if(sendBtn){

        sendBtn.disabled = true;

    }

    return;
}

        
    // Indian mobile validation
        
    if(!/^[6-9]\d{9}$/.test(mobile)){

    msg.textContent =
        "❌ Invalid Mobile Number";

    msg.style.color =
        "red";


    if(sendBtn){

        sendBtn.disabled = true;

    }


    return;
}

    // Same as current number
   if(
    mobile ===
    String(user.mobile || "").trim()
){

    msg.textContent =
        "❌ Current Mobile Number";

    msg.style.color =
        "red";


    if(sendBtn){

        sendBtn.disabled = true;

    }


    return;
}
// =====================================
// VERIFY MOBILE NUMBER
// =====================================

msg.innerHTML =
    '<span class="spinner"></span> Verifying Mobile Number...';

msg.style.color = "";

if(sendBtn){
    sendBtn.disabled = true;
}

    try{

        const formData =
            new FormData();

        formData.append(
            "action",
            "checkMobile"
        );

        formData.append(
            "mobile",
            mobile
        );


        const response =
            await fetch(API_URL,{

                method:"POST",

                body:formData

            });


        const result =
            await response.json();


        if(result.status === "exists"){

    msg.textContent =
        "🔴 Mobile Number Not Available";

    msg.style.color =
        "red";


    if(sendBtn){

        sendBtn.disabled = true;

    }


    return;
}


        if(result.status === "success"){

    msg.textContent =
        "🟢 Mobile Number Available";

    msg.style.color =
        "green";


    if(sendBtn){

        sendBtn.disabled = false;

    }


    return;
}

if(sendBtn){

    sendBtn.disabled = true;

}
        msg.textContent =
            result.message ||
            "Unable to check Mobile Number.";

        msg.style.color =
            "red";

    }
   catch(err){

    console.log(err);


    if(sendBtn){

        sendBtn.disabled = true;

    }


    msg.textContent =
        "Unable to check Mobile Number.";

    msg.style.color =
        "red";

}

});


    
    // =====================================
    // SEND OTP
    // =====================================

   document.getElementById("sendMobileOTPBtn").onclick = async ()=>{

    const newMobile =
        document
            .getElementById("newMobileNumber")
            .value
            .trim();


    // ================================
    // EMPTY
    // ================================

    if(newMobile === ""){

        showMessage(
            "Please enter new mobile number.",
            "warning",
            3000
        );

        document
            .getElementById("newMobileNumber")
            .focus();

        return;
    }


    // ================================
    // ONLY DIGITS
    // ================================

    if(!/^\d+$/.test(newMobile)){

        showMessage(
            "Mobile Number must contain only digits.",
            "warning",
            3000
        );

        document
            .getElementById("newMobileNumber")
            .focus();

        return;
    }


    // ================================
    // EXACTLY 10 DIGITS
    // ================================

    if(newMobile.length !== 10){

        showMessage(
            "Mobile Number must contain exactly 10 digits.",
            "warning",
            3000
        );

        document
            .getElementById("newMobileNumber")
            .focus();

        return;
    }


    // ================================
    // INDIAN MOBILE NUMBER
    // ================================

    if(!/^[6-9]\d{9}$/.test(newMobile)){

        showMessage(
            "Enter a valid mobile number.",
            "warning",
            3000
        );

        document
            .getElementById("newMobileNumber")
            .focus();

        return;
    }


    // ================================
    // SAME AS CURRENT NUMBER
    // ================================

    if(
        newMobile ===
        String(user.mobile || "").trim()
    ){

        showMessage(
            "New Mobile Number must be different from current number.",
            "warning",
            3000
        );

        document
            .getElementById("newMobileNumber")
            .focus();

        return;
    }


    // ================================
    // CHECK MOBILE IN GOOGLE SHEET
    // ================================

        // ================================
// =====================================
// SEND MOBILE CHANGE OTP
// =====================================

const otpFormData = new FormData();

otpFormData.append(
    "action",
    "sendMobileChangeOTP"
);

otpFormData.append(
    "mobile",
    newMobile
);


   try{

   const availabilityMsg =
    document.getElementById(
        "mobileAvailabilityMsg"
    );

const sendBtn =
    document.getElementById(
        "sendMobileOTPBtn"
    );

const sendingMsg =
    availabilityMsg;



    // =====================================
    // HIDE MOBILE AVAILABLE MESSAGE
    // =====================================

    if(availabilityMsg){

        availabilityMsg.textContent = "";

        availabilityMsg.innerHTML = "";

    }


    // =====================================
    // DISABLE SEND OTP BUTTON
    // =====================================

    if(sendBtn){

        sendBtn.disabled = true;

    }


    // =====================================
    // SHOW SENDING OTP ANIMATION
    // =====================================

   // =====================================
// SHOW SENDING OTP ANIMATION
// =====================================

if(sendingMsg){

    sendingMsg.innerHTML =
        '<span class="spinner"></span> Sending OTP...';

}


    // =====================================
    // SEND OTP TO BACKEND
    // =====================================

    const otpResponse =
        await fetch(API_URL,{
            method:"POST",
            body:otpFormData
        });
    

const otpResult =
    await otpResponse.json();
  
if(sendingMsg){

    sendingMsg.classList.add("hidden");

}

if(otpResult.status !== "success"){

        showMessage(
            otpResult.message ||
            "Unable to send OTP.",
            "warning",
            3000
        );

        return;
    }

// =====================================
// SAVE PENDING MOBILE OTP
// =====================================

sessionStorage.setItem(
    "mobileChangePendingMobile",
    newMobile
);

sessionStorage.setItem(
    "mobileChangeOTPExpiresAt",
    String(
        Date.now() + (30 * 1000)
    )
);
showMobileOTPPage(
    newMobile,
    30
);

return;
       
 
// =====================================
// CHECK EXISTING MOBILE CHANGE LOCK
// =====================================

const savedLockUntil =
    Number(
        sessionStorage.getItem(
            "mobileChangeLockUntil"
        )
    );


if(
    savedLockUntil &&
    savedLockUntil > Date.now()
){

    const remainingSeconds =
        Math.ceil(
            (savedLockUntil - Date.now()) / 1000
        );


    startMobileChangeLockTimer(
        remainingSeconds
    );

}
else{

    sessionStorage.removeItem(
        "mobileChangeLockUntil"
    );


    startMobileOTPCountdown(30);

}
    // =====================================
// RESEND OTP
// =====================================

    // =====================================
    // OTP SCREEN BACK
    // =====================================

    document
        .getElementById("mobileOTPBackBtn")
        .onclick = ()=>{

        showEditProfile();

    };


    // =====================================
    // VERIFY OTP
    // =====================================

    document
        .getElementById("verifyMobileOTPBtn")
        .onclick = async ()=>{

        const enteredOTP =
            document
                .getElementById("mobileChangeOTP")
                .value
                .trim();
 // =====================================
 // OTP EMPTY
 // =====================================

        if(enteredOTP === ""){

            showMessage(
                "Please enter OTP.",
                "warning",
                3000
            );

            return;
        }
// =====================================
// OTP FORMAT
// =====================================


        if(!/^\d{6}$/.test(enteredOTP)){

            showMessage(
                "OTP must contain exactly 6 digits.",
                "warning",
                3000
            );

            return;
        }
// =====================================
// VERIFY DATA
// =====================================


        const verifyData =
            new FormData();

        verifyData.append(
            "action",
            "verifyMobileChangeOTP"
        );

       verifyData.append(
    "mobile",
    newMobile
);

verifyData.append(
    "oldMobile",
    user.mobile || ""
);

verifyData.append(
    "otp",
    enteredOTP
);


        try{

            showLoader("Verifying OTP...");


            const verifyResponse =
                await fetch(API_URL,{

                    method:"POST",

                    body:verifyData

                });


            const verifyResult =
                await verifyResponse.json();


            hideLoader();
// =====================================
// 3 ATTEMPTS / 1 MINUTE LOCK
// =====================================
 if(verifyResult.status === "locked"){

    showMessage(
        verifyResult.message ||
        "Maximum 3 OTP attempts reached. Please wait 1 minute.",
        "warning",
        3000
    );

    startMobileChangeLockTimer(60);

    return;
}
// =====================================
// INVALID OTP
// =====================================

if(verifyResult.status !== "success"){

    showMessage(
        verifyResult.message ||
        "Invalid OTP.",
        "warning",
        3000
    );

    return;
}
 // =====================================
 // OTP SUCCESS
 // =====================================
            
            showMessage(
                "OTP verified successfully.",
                "success",
                2000
            );

// =====================================
// UPDATE SESSION MOBILE
// =====================================
            
            user.mobile = newMobile;

sessionStorage.setItem(
    "user",
    JSON.stringify(user)
);
// =====================================
// RETURN TO EDIT PROFILE
// =====================================


setTimeout(()=>{

    showEditProfile();

},500);
                    }
        catch(err){

            hideLoader();

            console.log(err);

            showMessage(
                "Unable to connect to server.",
                "error",
                3000
            );

        }

    };
}

catch(err){

    hideLoader();

    console.log(err);

    showMessage(
        "Unable to send OTP.",
        "error",
        3000
    );

} 
   };
    };
    // =====================================
    // SAVE PROFILE
    // =====================================

    document.getElementById("saveProfileBtn").onclick = async ()=>{

    const user =
        JSON.parse(sessionStorage.getItem("user"));

    if(!user){

        showMessage(
            "User session not found.",
            "warning",
            3000
        );

        return;
    }
const loginUserName =
    document
        .getElementById("editProfileLoginUserName")
        .value
        .trim();
const gender =
    document
        .getElementById("editProfileGender")
        .value
        .trim();
        const dateOfBirth =
    document
        .getElementById("editProfileDateOfBirth")
        .value
        .trim();
const surName =
    document
        .getElementById("editProfileSurName")
        .value
        .trim();

const middleName =
    document
        .getElementById("editProfileMiddleName")
        .value
        .trim();

const lastName =
    document
        .getElementById("editProfileLastName")
        .value
        .trim();

    const email =
        document
            .getElementById("editProfileEmail")
            .value
            .trim();

    const place =
        document
            .getElementById("editProfilePlace")
            .value
            .trim();

    const state =
        document
            .getElementById("editProfileState")
            .value
            .trim();

    const country =
        document
            .getElementById("editProfileCountry")
            .value
            .trim();

        // ================================
// GENDER VALIDATION
// ================================

if(gender === ""){

    showMessage(
        "Please select Gender.",
        "warning",
        3000
    );

    document
        .getElementById("editProfileGender")
        .focus();

    return;
}
        // ================================
// DATE OF BIRTH VALIDATION
// ================================

// ================================
// DATE OF BIRTH VALIDATION
// ================================

if(dateOfBirth === ""){

    showMessage(
        "Date of Birth is required.",
        "warning",
        3000
    );

    document
        .getElementById("editProfileDateOfBirth")
        .focus();

    return;
}


const dobDate =
    new Date(dateOfBirth + "T00:00:00");

const today =
    new Date();

today.setHours(0,0,0,0);


// ================================
// INVALID DATE
// ================================

if(isNaN(dobDate.getTime())){

    showMessage(
        "Enter a valid Date of Birth.",
        "warning",
        3000
    );

    document
        .getElementById("editProfileDateOfBirth")
        .focus();

    return;
}


// ================================
// FUTURE DATE
// ================================

if(dobDate > today){

    showMessage(
        "Date of Birth cannot be a future date.",
        "warning",
        3000
    );

    document
        .getElementById("editProfileDateOfBirth")
        .focus();

    return;
}


// ================================
// CALCULATE AGE
// ================================

let age =
    today.getFullYear() -
    dobDate.getFullYear();

const monthDifference =
    today.getMonth() -
    dobDate.getMonth();

if(
    monthDifference < 0 ||
    (
        monthDifference === 0 &&
        today.getDate() < dobDate.getDate()
    )
){

    age--;

}


// ================================
// MINIMUM AGE
// ================================

if(age < 18){

    showMessage(
        "Age must be at least 18 years.",
        "warning",
        3000
    );

    document
        .getElementById("editProfileDateOfBirth")
        .focus();

    return;
}


// ================================
// MAXIMUM AGE
// ================================

if(age > 120){

    showMessage(
        "Please enter a valid Date of Birth.",
        "warning",
        3000
    );

    document
        .getElementById("editProfileDateOfBirth")
        .focus();

    return;
}
// ================================
// LOGIN USER NAME VALIDATION
// ================================

if(loginUserName === ""){

    showMessage(
        "Login User Name is required.",
        "warning",
        3000
    );

    document
        .getElementById("editProfileLoginUserName")
        .focus();

    return;
}


if(loginUserName.length < 6){

    showMessage(
        "Login User Name must contain at least 6 characters.",
        "warning",
        3000
    );

    document
        .getElementById("editProfileLoginUserName")
        .focus();

    return;
}


// ================================
// SUR NAME VALIDATION
// ================================

if(surName === ""){

    showMessage(
        "Surname is required.",
        "warning",
        3000
    );

    document
        .getElementById("editProfileSurName")
        .focus();

    return;
}


if(surName.length < 2){

    showMessage(
        "Enter a valid surname.",
        "warning",
        3000
    );

    document
        .getElementById("editProfileSurName")
        .focus();

    return;
}


if(!isValidName(surName)){

    showMessage(
        "Surname must contain only letters.",
        "warning",
        3000
    );

    document
        .getElementById("editProfileSurName")
        .focus();

    return;
}


// ================================
// MIDDLE NAME VALIDATION
// ================================

if(middleName !== "" && !isValidName(middleName)){

    showMessage(
        "Middle Name must contain only letters.",
        "warning",
        3000
    );

    document
        .getElementById("editProfileMiddleName")
        .focus();

    return;
}


// ================================
// LAST NAME VALIDATION
// ================================

if(lastName === ""){

    showMessage(
        "Last Name is required.",
        "warning",
        3000
    );

    document
        .getElementById("editProfileLastName")
        .focus();

    return;
}


if(lastName.length < 2){

    showMessage(
        "Enter a valid last name.",
        "warning",
        3000
    );

    document
        .getElementById("editProfileLastName")
        .focus();

    return;
}


if(!isValidName(lastName)){

    showMessage(
        "Last Name must contain only letters.",
        "warning",
        3000
    );

    document
        .getElementById("editProfileLastName")
        .focus();

    return;
}
    // ================================
    // VALIDATION
    // ================================

    if(email === ""){

        showMessage(
            "Email ID is required.",
            "warning",
            3000
        );

        document
            .getElementById("editProfileEmail")
            .focus();

        return;
    }


    if(!isValidEmail(email)){

        showMessage(
            "Enter a valid Email ID.",
            "warning",
            3000
        );

        document
            .getElementById("editProfileEmail")
            .focus();

        return;
    }


    if(place === ""){

        showMessage(
            "Place is required.",
            "warning",
            3000
        );

        document
            .getElementById("editProfilePlace")
            .focus();

        return;
    }


    if(place.length < 2){

        showMessage(
            "Enter a valid Place.",
            "warning",
            3000
        );

        document
            .getElementById("editProfilePlace")
            .focus();

        return;
    }


    if(!isValidName(place)){

        showMessage(
            "Place must contain only letters.",
            "warning",
            3000
        );

        document
            .getElementById("editProfilePlace")
            .focus();

        return;
    }


    if(state === ""){

        showMessage(
            "State is required.",
            "warning",
            3000
        );

        document
            .getElementById("editProfileState")
            .focus();

        return;
    }


    if(!isValidName(state)){

        showMessage(
            "State must contain only letters.",
            "warning",
            3000
        );

        document
            .getElementById("editProfileState")
            .focus();

        return;
    }


    if(country === ""){

        showMessage(
            "Country is required.",
            "warning",
            3000
        );

        document
            .getElementById("editProfileCountry")
            .focus();

        return;
    }


    if(!isValidName(country)){

        showMessage(
            "Country must contain only letters.",
            "warning",
            3000
        );

        document
            .getElementById("editProfileCountry")
            .focus();

        return;
    }


    // ================================
    // SEND UPDATE TO GOOGLE SHEET
    // ================================

    const formData = new FormData();

    formData.append(
        "action",
        "updateProfile"
    );
formData.append(
    "loginUserName",
    loginUserName
);
formData.append(
    "gender",
    gender
);
formData.append(
    "dateOfBirth",
    dateOfBirth
);        
formData.append(
    "surName",
    surName
);

formData.append(
    "middleName",
    middleName
);

formData.append(
    "lastName",
    lastName
);
    formData.append(
        "mobile",
        user.mobile || ""
    );

    formData.append(
        "email",
        email
    );

    formData.append(
        "place",
        place
    );

    formData.append(
        "state",
        state
    );

    formData.append(
        "country",
        country
    );


    try{

        showLoader("Updating Profile...");


        const response =
            await fetch(API_URL,{

                method:"POST",

                body:formData

            });


        const result =
            await response.json();


        hideLoader();


        if(result.status !== "success"){

            showMessage(
                result.message ||
                "Unable to update profile.",
                "warning",
                3000
            );

            return;
        }


        // ================================
        // UPDATE SESSION DATA
        // ================================

        user.loginUserName = loginUserName;

user.surName = surName;

user.middleName = middleName;

user.lastName = lastName;
user.gender = gender;
user.dateOfBirth = dateOfBirth;
user.email = email;

user.place = place;

user.state = state;

user.country = country;


        sessionStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        // ================================
        // SUCCESS
        // ================================

        showMessage(
            "Profile Updated Successfully.",
            "success",
            2000
        );


        setTimeout(()=>{

            updateProfilePage();

        },500);


    }
    catch(err){

        hideLoader();

        console.log(err);

        showMessage(
            "Unable to connect to server.",
            "error",
            3000
        );

    }

};
    // =====================================
    // CANCEL
    // =====================================

    document.getElementById("cancelEditProfileBtn").onclick = ()=>{

    profilePage.innerHTML = `
        <h3>👤 My Profile</h3>

        <div class="profile-box">

            <div class="profile-row">
                <span>Login User Name</span>
                <strong id="profileLoginUserName">-</strong>
            </div>

            <div class="profile-row">
                <span>Name</span>
                <strong id="profileName">-</strong>
            </div>

            <div class="profile-row">
                <span>Mobile Number</span>
                <strong id="profileMobile">-</strong>
            </div>

            <div class="profile-row">
                <span>Email</span>
                <strong id="profileEmail">-</strong>
            </div>

            <div class="profile-row">
                <span>Gender</span>
                <strong id="profileGender">-</strong>
            </div>

            <div class="profile-row">
                <span>Date of Birth</span>
                <strong id="profileDOB">-</strong>
            </div>

            <div class="profile-row">
                <span>Place</span>
                <strong id="profilePlace">-</strong>
            </div>

            <div class="profile-row">
                <span>State</span>
                <strong id="profileState">-</strong>
            </div>

            <div class="profile-row">
                <span>Country</span>
                <strong id="profileCountry">-</strong>
            </div>

        </div>

        <div align="center">

            <button
                id="editProfileBtn"
                class="grid-btn">

                ✏️ Edit Profile

            </button>

            <br><br>

            <button
                id="profileBackBtn"
                class="back-btn">

                ← Back

            </button>

        </div>
    `;

    updateProfilePage();

    document.getElementById("editProfileBtn").onclick = ()=>{

        showEditProfile();

    };

    document.getElementById("profileBackBtn").onclick = ()=>{

        profilePage.classList.add("hidden");

        showScreen(dashboard);

        homeBtn.click();

    };

    window.scrollTo(0,0);

};
// =====================================
// BACK
// =====================================

   document.getElementById("profileEditBackBtn").onclick = ()=>{

    document.getElementById("cancelEditProfileBtn").click();

};

}

// =====================================
// SHOW MOBILE OTP PAGE
// =====================================

function showMobileOTPPage(
    newMobile,
    remainingSeconds
){

    const user =
        JSON.parse(
            sessionStorage.getItem("user")
        );

    if(!user){
        showMessage(
            "User session not found.",
            "warning",
            3000
        );
        return;
    }

    profilePage.innerHTML = `
        <div
            id="mobileOTPStatus"
            style="
                text-align:center;
                font-weight:bold;
                margin-bottom:8px;
            "
        >
            ⏱️ OTP expires in 00:30
        </div>


        <h3>
            🔐 Verify Mobile Number
        </h3>


        <div class="profile-box">

            <div class="profile-row">

                <span>New Mobile Number</span>

                <strong>
                    ${newMobile}
                </strong>

            </div>


            <div class="profile-row verify-otp-row">

                <span>Enter OTP</span>

                <input
                    id="mobileChangeOTP"
                    type="tel"
                    inputmode="numeric"
                    maxlength="6"
                    placeholder="Enter 6-digit OTP"
                >

            </div>

        </div>


        <div align="center">

            <button
                id="verifyMobileOTPBtn"
                class="grid-btn">

                Verify OTP

            </button>


            <button
                id="resendMobileOTPBtn"
                class="grid-btn hidden">

                🔄 Resend OTP

            </button>


            <br><br>


            <button
                id="mobileOTPBackBtn"
                class="back-btn">

                ← Back

            </button>

        </div>

    `;


    // =====================================
    // START REMAINING COUNTDOWN
    // =====================================

    startMobileOTPCountdown(
        remainingSeconds
    );


    // =====================================
    // BACK
    // =====================================

    document
        .getElementById("mobileOTPBackBtn")
        .onclick = ()=>{

        showEditProfile();

    };
    // =====================================
// VERIFY MOBILE OTP
// =====================================

document
    .getElementById("verifyMobileOTPBtn")
    .onclick = async ()=>{

    const otpInput =
        document.getElementById(
            "mobileChangeOTP"
        );

    const enteredOTP =
        otpInput.value.trim();


    // EMPTY OTP
    if(enteredOTP === ""){

        showMessage(
            "Please enter OTP.",
            "warning",
            3000
        );

        otpInput.focus();

        return;
    }


    // OTP FORMAT
    if(!/^\d{6}$/.test(enteredOTP)){

        showMessage(
            "OTP must contain exactly 6 digits.",
            "warning",
            3000
        );

        otpInput.focus();

        return;
    }


    const verifyBtn =
        document.getElementById(
            "verifyMobileOTPBtn"
        );


    // DISABLE VERIFY
    verifyBtn.disabled = true;


    const verifyData =
        new FormData();


    verifyData.append(
        "action",
        "verifyMobileChangeOTP"
    );

    verifyData.append(
        "mobile",
        newMobile
    );

    verifyData.append(
        "oldMobile",
        user.mobile || ""
    );

    verifyData.append(
        "otp",
        enteredOTP
    );


    try{

        showLoader(
            "Verifying OTP..."
        );


        const response =
            await fetch(
                API_URL,
                {
                    method:"POST",
                    body:verifyData
                }
            );


        const result =
            await response.json();


        hideLoader();


        // LOCKED
        if(result.status === "locked"){

            showMessage(
                result.message ||
                "Maximum 3 OTP attempts reached. Please wait 1 minute.",
                "warning",
                3000
            );

            startMobileChangeLockTimer(60);

            return;
        }


        // INVALID OTP
        if(result.status !== "success"){

            verifyBtn.disabled = false;

            showMessage(
                result.message ||
                "Invalid OTP.",
                "warning",
                3000
            );

            otpInput.focus();

            return;
        }


        // SUCCESS
        showMessage(
            "OTP verified successfully.",
            "success",
            2000
        );


        // UPDATE USER MOBILE
        user.mobile = newMobile;


        sessionStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        // CLEAR PENDING OTP
        sessionStorage.removeItem(
            "mobileChangePendingMobile"
        );

        sessionStorage.removeItem(
            "mobileChangeOTPExpiresAt"
        );


        // STOP TIMER
        if(mobileOTPCountdownTimer){

            clearInterval(
                mobileOTPCountdownTimer
            );

            mobileOTPCountdownTimer = null;
        }


        // RETURN TO EDIT PROFILE
        setTimeout(()=>{

            showEditProfile();

        },500);

    }
    catch(err){

        hideLoader();

        console.log(
            "VERIFY MOBILE OTP ERROR:",
            err
        );

        verifyBtn.disabled = false;

        showMessage(
            "Unable to connect to server.",
            "error",
            3000
        );

    }

};
// =====================================
// RESEND MOBILE OTP
// =====================================

// =====================================
// RESEND MOBILE OTP
// MAXIMUM 2 RESENDS
// =====================================

document
    .getElementById("resendMobileOTPBtn")
    .onclick = async ()=>{

    const resendBtn =
        document.getElementById(
            "resendMobileOTPBtn"
        );

    const verifyBtn =
        document.getElementById(
            "verifyMobileOTPBtn"
        );

    const status =
        document.getElementById(
            "mobileOTPStatus"
        );

    const otpInput =
        document.getElementById(
            "mobileChangeOTP"
        );


    // =====================================
    // CHECK CURRENT RESEND COUNT
    // =====================================

    let resendCount =
        getMobileResendCount();


    // =====================================
    // MAXIMUM 2 RESENDS
    // =====================================

    if(
        resendCount >=
        MOBILE_OTP_RESEND_LIMIT
    ){

        sessionStorage.setItem(
            "mobileChangeResendLockUntil",
            String(
                Date.now() +
                MOBILE_OTP_WINDOW
            )
        );

        startMobileChangeLockTimer(
            60
        );

        return;

    }


    // =====================================
    // CLEAR OLD OTP
    // =====================================

    if(otpInput){

        otpInput.value = "";

    }


    // =====================================
    // DISABLE RESEND BUTTON
    // =====================================

    if(resendBtn){

        resendBtn.disabled = true;

        resendBtn.classList.add(
            "hidden"
        );

    }


    // =====================================
    // SHOW SENDING OTP
    // =====================================

    if(status){

        status.innerHTML =
            '<span class="spinner"></span> Sending OTP...';

    }


    // =====================================
    // SEND NEW OTP
    // =====================================

    const resendData =
        new FormData();

    resendData.append(
        "action",
        "sendMobileChangeOTP"
    );

    resendData.append(
        "mobile",
        newMobile
    );


    try{

        const response =
            await fetch(API_URL,{

                method:"POST",

                body:resendData

            });


        const result =
            await response.json();


        // =====================================
        // RESEND FAILED
        // =====================================

        if(
            result.status !==
            "success"
        ){

            if(status){

                status.textContent =
                    result.message ||
                    "Unable to resend OTP.";

            }

            if(resendBtn){

                resendBtn.disabled =
                    false;

                resendBtn.classList.remove(
                    "hidden"
                );

            }

            return;

        }


        // =====================================
        // INCREASE RESEND COUNT
        // =====================================

        resendCount++;


        sessionStorage.setItem(
            "mobileChangeResendCount",
            String(resendCount)
        );


        // =====================================
        // SAVE MOBILE
        // =====================================

        sessionStorage.setItem(
            "mobileChangePendingMobile",
            newMobile
        );


        // =====================================
        // SAVE NEW OTP EXPIRY
        // =====================================

        sessionStorage.setItem(
            "mobileChangeOTPExpiresAt",
            String(
                Date.now() +
                (30 * 1000)
            )
        );


        // =====================================
        // SECOND RESEND COMPLETED
        // START 1 MINUTE LOCK
        // =====================================

        if(
            resendCount >=
            MOBILE_OTP_RESEND_LIMIT
        ){

            sessionStorage.setItem(
                "mobileChangeResendLockUntil",
                String(
                    Date.now() +
                    MOBILE_OTP_WINDOW
                )
            );

        }


        // =====================================
        // ENABLE VERIFY
        // =====================================

        if(verifyBtn){

            verifyBtn.disabled =
                false;

        }


        // =====================================
        // START NEW OTP COUNTDOWN
        // =====================================

        startMobileOTPCountdown(
            30
        );


    }
    catch(err){

        console.log(err);


        if(status){

            status.textContent =
                "Unable to resend OTP.";

        }


        if(resendBtn){

            resendBtn.disabled =
                false;

            resendBtn.classList.remove(
                "hidden"
            );

        }

    }

};
    // =====================================
// VERIFY MOBILE OTP
// =====================================

}
let mobileOTPCountdownTimer = null;
// =====================================
// MOBILE CHANGE OTP SECURITY
// =====================================

const MOBILE_OTP_RESEND_LIMIT = 2;

const MOBILE_OTP_WINDOW =
    60 * 1000;
// =====================================
// MOBILE OTP COUNTDOWN
// =====================================
// =====================================
// CHECK / RESET RESEND WINDOW
// =====================================

function getMobileResendCount(){

    const now = Date.now();

    let count =
        Number(
            sessionStorage.getItem(
                "mobileChangeResendCount"
            )
        ) || 0;

    let windowStart =
        Number(
            sessionStorage.getItem(
                "mobileChangeResendWindowStart"
            )
        ) || 0;


    // =====================================
    // NO WINDOW
    // =====================================

    if(!windowStart){

        windowStart = now;

        sessionStorage.setItem(
            "mobileChangeResendWindowStart",
            String(windowStart)
        );

        sessionStorage.setItem(
            "mobileChangeResendCount",
            "0"
        );

        return 0;
    }


    // =====================================
    // 1 MINUTE COMPLETED
    // RESET COUNT
    // =====================================

    if(
        now - windowStart >=
        MOBILE_OTP_WINDOW
    ){

        count = 0;

        windowStart = now;


        sessionStorage.setItem(
            "mobileChangeResendWindowStart",
            String(windowStart)
        );

        sessionStorage.setItem(
            "mobileChangeResendCount",
            "0"
        );

    }


    return count;
}function startMobileOTPCountdown(seconds){

    if(mobileOTPCountdownTimer){

        clearInterval(
            mobileOTPCountdownTimer
        );

        mobileOTPCountdownTimer = null;
    }


    // =====================================
    // GET SAVED EXPIRY TIME
    // =====================================

    let expiryTime =
        Number(
            sessionStorage.getItem(
                "mobileChangeOTPExpiresAt"
            )
        );


    // =====================================
    // CREATE ONLY IF NOT EXISTS
    // =====================================

    if(!expiryTime){

        expiryTime =
            Date.now() +
            (seconds * 1000);

        sessionStorage.setItem(
            "mobileChangeOTPExpiresAt",
            String(expiryTime)
        );
    }


    // =====================================
    // COUNTDOWN FUNCTION
    // =====================================

    function updateTimer(){

        const remaining =
            Math.max(
                0,
                Math.ceil(
                    (expiryTime - Date.now()) / 1000
                )
            );


        const status =
            document.getElementById(
                "mobileOTPStatus"
            );


        const verifyBtn =
            document.getElementById(
                "verifyMobileOTPBtn"
            );


        const resendBtn =
            document.getElementById(
                "resendMobileOTPBtn"
            );


        // =====================================
        // SHOW TIMER ONLY WHEN OTP PAGE EXISTS
        // =====================================

        if(status){

            const minutes =
                Math.floor(
                    remaining / 60
                );

            const secs =
                remaining % 60;


            status.textContent =
                "⏱️ OTP expires in " +
                String(minutes).padStart(2,"0") +
                ":" +
                String(secs).padStart(2,"0");
        }


        // =====================================
        // OTP EXPIRED
        // =====================================

        if(remaining <= 0){

            clearInterval(
                mobileOTPCountdownTimer
            );

            mobileOTPCountdownTimer =
                null;


            sessionStorage.removeItem(
                "mobileChangeOTPExpiresAt"
            );


            if(status){

                status.textContent =
                    "⚠️ OTP expired";
            }


            if(verifyBtn){

                verifyBtn.disabled = true;
            }


            if(resendBtn){

                resendBtn.disabled = false;

                resendBtn.classList.remove(
                    "hidden"
                );
            }

            return;
        }


        // =====================================
        // OTP ACTIVE
        // =====================================

        if(verifyBtn){

            verifyBtn.disabled = false;
        }
    }


    // =====================================
    // RUN IMMEDIATELY
    // =====================================

    updateTimer();


    // =====================================
    // KEEP RUNNING EVEN WHEN PAGE IS HIDDEN
    // =====================================

    mobileOTPCountdownTimer =
        setInterval(
            updateTimer,
            1000
        );
}
// =====================================
// MOBILE CHANGE 1 MINUTE LOCK TIMER
// =====================================

function startMobileChangeLockTimer(seconds){
if(mobileOTPCountdownTimer){

    clearInterval(
        mobileOTPCountdownTimer
    );

    mobileOTPCountdownTimer = null;

}
    const status =
        document.getElementById(
            "mobileOTPStatus"
        );

    const verifyBtn =
        document.getElementById(
            "verifyMobileOTPBtn"
        );

    const resendBtn =
        document.getElementById(
            "resendMobileOTPBtn"
        );

    const mobileInput =
        document.getElementById(
            "newMobileNumber"
        );


    // =================================
    // CHECK OTP PAGE
    // =================================

    // =================================
    // START COUNTDOWN
    // =================================

    // =================================
// GET EXISTING LOCK TIME
// =================================

const savedLockUntil =
    Number(
        sessionStorage.getItem(
            "mobileChangeLockUntil"
        )
    );

let lockUntil;


// =================================
// EXISTING LOCK STILL ACTIVE
// =================================

if(
    savedLockUntil &&
    savedLockUntil > Date.now()
){

    lockUntil =
        savedLockUntil;

}


// =================================
// NEW LOCK
// =================================

else{

    lockUntil =
        Date.now() +
        (seconds * 1000);

    sessionStorage.setItem(
        "mobileChangeLockUntil",
        String(lockUntil)
    );

}


// =================================
// CALCULATE REMAINING TIME
// =================================

let remaining =
    Math.ceil(
        (lockUntil - Date.now()) / 1000
    );


    // =================================
    // DISABLE VERIFY OTP
    // =================================

    if(verifyBtn){

        verifyBtn.disabled =
            true;

    }


    // =================================
    // DISABLE RESEND OTP
    // =================================

    if(resendBtn){

        resendBtn.disabled =
            true;

        resendBtn.classList.remove(
            "hidden"
        );

        

    }


    // =================================
    // DISABLE NEW MOBILE NUMBER
    // =================================

    if(mobileInput){

        mobileInput.disabled =
            true;

    }


    // =================================
    // INITIAL MESSAGE
    // =================================

    status.textContent =
        "🔒 Maximum 3 OTP attempts reached";


    // =================================
    // START TIMER
    // =================================

   mobileOTPCountdownTimer =
    setInterval(()=>{


            // =============================
            // CALCULATE MINUTES
            // =============================

            const minutes =
                Math.floor(
                    remaining / 60
                );


            // =============================
            // CALCULATE SECONDS
            // =============================

            const secs =
                remaining % 60;


            // =============================
            // SHOW TIMER
            // =============================

            status.textContent =
                "🔒 Maximum 3 OTP attempts reached — " +
                "Please wait: " +
                String(minutes).padStart(2,"0") +
                ":" +
                String(secs).padStart(2,"0");


            // =============================
            // TIMER FINISHED
            // =============================

            if(remaining <= 0){

                // Stop timer
               clearInterval(
    mobileOTPCountdownTimer
);

mobileOTPCountdownTimer = null;
                sessionStorage.removeItem(
               "mobileChangeLockUntil"
                );

                // =========================
                // SHOW SUCCESS MESSAGE
                // =========================

                status.textContent =
                    "✓ You can enter a new Mobile Number now.";


                // =========================
                // ENABLE MOBILE INPUT
                // =========================

                if(mobileInput){

                    mobileInput.disabled =
                        false;

                    mobileInput.value =
                        "";

                }


                // =========================
                // ENABLE RESEND OTP
                // =========================

                if(resendBtn){

                    resendBtn.disabled =
                        false;

                    resendBtn.classList.remove(
                        "hidden"
                    );

                }


                // =========================
                // VERIFY OTP REMAINS DISABLED
                // =========================

                if(verifyBtn){

                    verifyBtn.disabled =
                        true;

                }


                return;

            }


            // =============================
            // DECREASE TIMER
            // =============================

            remaining--;


        },1000);

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
        showMessage("New Pass Code is required.","warning",3000);
        return;
    }

    if(pass2===""){
        showMessage("Confirm New Pass Code is required.","warning",3000);
        return;
    }

    if(pass1!==pass2){
        showMessage("Pass Codes do not match.","warning",3000);
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

    showMessage(     result.message,     result.status === "success" ? "success" : "warning",     3000 );

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
sessionStorage.removeItem("user");
sessionStorage.removeItem("passCode");
showScreen(welcomePage);
updateWelcomePage();
updateMenuIcon();
updateSideMenuUser();
closeSideMenu();   // <-- Add this
updateCurrentLanguage();
