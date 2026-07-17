/* =====================================

oneFaMiLe V1
Part 1A.3

===================================== */

/* WELCOME SCREEN */
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

const sendOTPBtn =
document.getElementById("sendOTPBtn");

const verifyOTPBtn =
document.getElementById("verifyOTPBtn");

const backLoginBtn =
document.getElementById("backLoginBtn");

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
"images/navigation/Activities1.png"
)

+`
<div class="grid-3x2">
<button class="grid-btn" id="addActivitiesBtn">

<img
src="images/activities/AddActivities.png"
class="btn-icon">

<span>

Add Activity

</span>

</button>


<button class="grid-btn" id="reportsActivitiesBtn">

<img
src="images/activities/ReportsActivities.png"
class="btn-icon">

<span>

Reports

</span>

</button>


<button class="grid-btn" id="sensitiveActivitiesBtn">

<img
src="images/activities/SensitiveActivities.png"
class="btn-icon">

<span>

Sensitive Reports

</span>

</button>


<button class="grid-btn" id="allReportsActivitiesBtn">

<img
src="images/activities/AllReportsActivities.png"
class="btn-icon">

<span>

All Reports

</span>

</button>


<button class="grid-btn" id="searchActivitiesBtn">

<img
src="images/activities/SearchActivities.png"
class="btn-icon">

<span>

Custom Search

</span>

</button>


<button class="grid-btn" id="aboutActivitiesBtn">

<img
src="images/activities/AboutActivities.png"
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

document.getElementById("activitiesBackBtn").onclick = showHome;

};
incomeBtn.onclick = ()=>{

    setActiveButton(incomeBtn);

    showPage(

pageTitle(
"Income",
"images/navigation/Income1.png"
)

+`
<div class="grid-3x2">

<button class="grid-btn" id="addIncomeBtn">

<img
src="images/income/AddIncome.png"
class="btn-icon">

<span>

Add Income

</span>

</button>

<button
id="incomeReports"
class="grid-btn">

<img
src="images/income/ReportsIncome.png"
class="btn-icon">

<span>

Reports

</span>

</button>

<button
id="incomeSensitive"
class="grid-btn">

<img
src="images/income/SensitiveIncome.png"
class="btn-icon">

<span>

Sensitive Reports

</span>

</button>

<button
id="incomeAll"
class="grid-btn">

<img
src="images/income/AllReportsIncome.png"
class="btn-icon">

<span>

All Reports

</span>

</button>

<button
id="incomeSearch"
class="grid-btn">

<img
src="images/income/SearchIncome.png"
class="btn-icon">

<span>

Custom Search

</span>

</button>

<button
id="incomeAbout"
class="grid-btn">

<img
src="images/income/AboutIncome.png"
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

    reportsLayout("Income Reports");

};

document.getElementById("incomeSensitive").onclick=()=>{

    openSensitive("Income","Sensitive Reports");

};

document.getElementById("incomeAll").onclick=()=>{

    openSensitive("Income","All Reports");

};

document.getElementById("incomeBack").onclick=showHome;

};healthBtn.onclick = ()=>{

    setActiveButton(healthBtn);

    showPage(

pageTitle(
"Health",
"images/navigation/Health1.png"
)

+`
<div class="grid-3x2">

<button class="grid-btn" id="addHealthBtn">

<img
src="images/health/AddHealth.png"
class="btn-icon">

<span>

Add Health

</span>

</button>


<button
id="healthReports"
class="grid-btn">

<img
src="images/health/ReportsHealth.png"
class="btn-icon">

<span>

Reports

</span>

</button>


<button
id="healthSensitive"
class="grid-btn">

<img
src="images/health/SensitiveHealth.png"
class="btn-icon">

<span>

Sensitive Reports

</span>

</button>


<button
id="healthAll"
class="grid-btn">

<img
src="images/health/AllReportsHealth.png"
class="btn-icon">

<span>

All Reports

</span>

</button>


<button
id="healthSearch"
class="grid-btn">

<img
src="images/health/SearchHealth.png"
class="btn-icon">

<span>

Custom Search

</span>

</button>


<button
id="healthAbout"
class="grid-btn">

<img
src="images/health/AboutHealth.png"
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

    reportsLayout("Health Reports");

};

document.getElementById("healthSensitive").onclick = ()=>{

    openSensitive("Health","Sensitive Reports");

};

document.getElementById("healthAll").onclick = ()=>{

    openSensitive("Health","All Reports");

};

document.getElementById("healthBack").onclick = showHome;

};

loansBtn.onclick = ()=>{
setActiveButton(loansBtn);
    
showPage(

pageTitle(
"Loans",
"images/navigation/Loans1.png"
)

+`
<div class="grid-2">

<button id="loanBtn" class="grid-btn">

<img
src="images/navigation/Loans1.png"
class="btn-icon">

<span>

Loans

</span>

</button>

<button id="paymentsBtn" class="grid-btn">

<img
src="images/navigation/Payments.png"
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

homeBtn.click();

};

};


function showLendBorrow(type){

showPage(`

${pageTitle(
type,
type === "Loan"
? "images/navigation/Loans.png"
: "images/navigation/Payments.png"
)}
<div class="grid-2">

<button id="lendBtn" class="grid-btn">

<img
src="images/loans/Lend.png"
class="btn-icon">

<span>

Lend

</span>

</button>

<button id="borrowBtn" class="grid-btn">

<img
src="images/loans/Borrowed.png"
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
? "images/navigation/Loans.png"
: "images/navigation/Payments.png"
)}

<div class="grid-3x2">

<button class="grid-btn">

<img
src="images/loans/AddLend.png"
class="btn-icon">

<span>

Add Lend

</span>

</button>

<button id="lendReports" class="grid-btn">

<img
src="images/loans/Reports.png"
class="btn-icon">

<span>

Reports

</span>

</button>

<button id="lendSensitive" class="grid-btn">

<img
src="images/loans/SensitiveReports.png"
class="btn-icon">

<span>

Sensitive Reports

</span>

</button>

<button id="lendAll" class="grid-btn">

<img
src="images/loans/AllReports.png"
class="btn-icon">

<span>

All Reports

</span>

</button>

<button class="grid-btn">

<img
src="images/loans/CustomSearch.png"
class="btn-icon">

<span>

Custom Search

</span>

</button>

<button class="grid-btn">

<img
src="images/loans/About.png"
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

document.getElementById(
"lendReports"
).onclick=()=>{

reportsLayout(
type + " - Lend Reports"
);

};

document.getElementById("lendSensitive").onclick=()=>{

openSensitive(
type + " - Lend",
"Sensitive Reports"
);

};

document.getElementById("lendAll").onclick=()=>{

openSensitive(
type + " - Lend",
"All Reports"
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
? "images/navigation/Loans.png"
: "images/navigation/Payments.png"
)}

<div class="grid-3x2">

<button class="grid-btn">

<img
src="images/loans/AddBorrowed.png"
class="btn-icon">

<span>

Add Borrowed

</span>

</button>

<button
id="borrowReports"
class="grid-btn">

<img
src="images/loans/Reports.png"
class="btn-icon">

<span>

Reports

</span>

</button>

<button
id="borrowSensitive"
class="grid-btn">

<img
src="images/loans/SensitiveReports.png"
class="btn-icon">

<span>

Sensitive Reports

</span>

</button>

<button
id="borrowAll"
class="grid-btn">

<img
src="images/loans/AllReports.png"
class="btn-icon">

<span>

All Reports

</span>

</button>

<button class="grid-btn">

<img
src="images/loans/CustomSearch.png"
class="btn-icon">

<span>

Custom Search

</span>

</button>

<button class="grid-btn">

<img
src="images/loans/About.png"
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

document.getElementById(
"borrowReports"
).onclick=()=>{

reportsLayout(
type + " - Borrowed Reports"
);

};

document.getElementById("borrowSensitive").onclick=()=>{

openSensitive(
type + " - Borrowed",
"Sensitive Reports"
);

};

document.getElementById("borrowAll").onclick=()=>{

openSensitive(
type + " - Borrowed",
"All Reports"
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

welcomePage.classList.add("hidden");

loginPage.classList.remove("hidden");

};



/* ======================

SIGNUP

====================== */

signupBtn.onclick = ()=>{

welcomePage.classList.add("hidden");

signupPage.classList.remove("hidden");

};


/* ======================

BACK LOGIN

====================== */

backLoginBtn.onclick = ()=>{

loginPage.classList.add("hidden");

welcomePage.classList.remove("hidden");

};



/* ======================

SEND OTP

====================== */

sendOTPBtn.onclick = ()=>{

loginPage.classList.add("hidden");

otpPage.classList.remove("hidden");

};

backSignupBtn.onclick = ()=>{

signupPage.classList.add("hidden");

welcomePage.classList.remove("hidden");

};
signupOTPBtn.onclick = ()=>{

signupPage.classList.add("hidden");

signupOTPPage.classList.remove("hidden");

};
/* ======================

BACK OTP

====================== */

backOTPBtn.onclick = ()=>{

otpPage.classList.add("hidden");

loginPage.classList.remove("hidden");

};
backSignupOTPBtn.onclick = ()=>{

signupOTPPage.classList.add("hidden");

signupPage.classList.remove("hidden");

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


registerBtn.onclick = ()=>{

alert("Registration Successful");

signupOTPPage.classList.add("hidden");

signupPage.classList.add("hidden");

welcomePage.classList.remove("hidden");

};
expensesBtn.onclick=()=>{
setActiveButton(expensesBtn);
   
showPage(

pageTitle(
"Expenses",
"images/navigation/Expenses1.png"
)

+`
<div class="grid-3x2">

<button class="grid-btn">

<img
src="images/expenses/AddExpenses.png"
class="btn-icon">

<span>

Add Expense

</span>

</button>


<button
id="expenseReports"
class="grid-btn">

<img
src="images/expenses/ReportsExpenses.png"
class="btn-icon">

<span>

Reports

</span>

</button>


<button
id="expenseSensitive"
class="grid-btn">

<img
src="images/expenses/SensitiveExpenses.png"
class="btn-icon">

<span>

Sensitive Reports

</span>

</button>


<button
id="expenseAll"
class="grid-btn">

<img
src="images/expenses/AllReportsExpenses.png"
class="btn-icon">

<span>

All Reports

</span>

</button>

<button class="grid-btn">

<img
src="images/expenses/SearchExpenses.png"
class="btn-icon">

<span>

Custom Search

</span>
</button>
<button class="grid-btn">

<img
src="images/expenses/AboutExpenses.png"
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

"Expenses Reports"

);

};


document.getElementById("expenseSensitive").onclick = ()=>{

    openSensitive("Expenses","Sensitive Reports");

};

document.getElementById("expenseAll").onclick = ()=>{

    openSensitive("Expenses","All Reports");

};

  
document.getElementById(

"expenseBack"

)

.onclick=()=>{


homeBtn.click();


};


};
homeBtn.onclick = ()=>{

    setActiveButton(homeBtn);

    homeContent.innerHTML = homeTemplate;

    console.log(document.getElementById("homeWelcomeHeading"));

    updateWelcomePage();

};
function showHome(){

    homeBtn.click();

}

familyBtn.onclick = ()=>{

    setActiveButton(familyBtn);

    showPage(

pageTitle(
"Family",
"images/navigation/Family1.png"
)

+`
<div class="grid-3x2">

<button
id="addMemberBtn"
class="grid-btn">

<img
src="images/family/AddMember.png"
class="btn-icon">

<span>

Add Member

</span>

</button>


<button
id="addFamilyBtn"
class="grid-btn">

<img
src="images/family/AddFamily.png"
class="btn-icon">

<span>

Add Family

</span>

</button>


<button
id="searchMemberBtn"
class="grid-btn">

<img
src="images/family/SearchMember.png"
class="btn-icon">

<span>

Search Member

</span>

</button>


<button
id="relationsBtn"
class="grid-btn">

<img
src="images/family/Relations.png"
class="btn-icon">

<span>

Relations

</span>

</button>


<button
id="treeViewBtn"
class="grid-btn">

<img
src="images/family/TreeView.png"
class="btn-icon">

<span>

Tree View

</span>

</button>


<button
id="familyAboutBtn"
class="grid-btn">

<img
src="images/family/AboutFamily.png"
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

document.getElementById("familyBack").onclick = showHome;

};

memoriesBtn.onclick = ()=>{

    setActiveButton(memoriesBtn);

    showPage(

pageTitle(
"Memories",
"images/navigation/Memories1.png"
)

+`
<div class="grid-3x2">

<button class="grid-btn" id="addMemoryBtn">

<img
src="images/memories/AddMemories.png"
class="btn-icon">

<span>

Add Memory

</span>

</button>


<button
id="memoryReports"
class="grid-btn">

<img
src="images/memories/ReportsMemories.png"
class="btn-icon">

<span>

Reports

</span>

</button>


<button
id="memorySensitive"
class="grid-btn">

<img
src="images/memories/SensitiveMemories.png"
class="btn-icon">

<span>

Sensitive Reports

</span>

</button>


<button
id="memoryAll"
class="grid-btn">

<img
src="images/memories/AllReportsMemories.png"
class="btn-icon">

<span>

All Reports

</span>

</button>


<button
id="memorySearch"
class="grid-btn">

<img
src="images/memories/SearchMemories.png"
class="btn-icon">

<span>

Custom Search

</span>

</button>


<button
id="memoryAbout"
class="grid-btn">

<img
src="images/memories/AboutMemories.png"
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

    reportsLayout("Memory Reports");

};

document.getElementById("memorySensitive").onclick = ()=>{

    openSensitive("Memory","Sensitive Reports");

};

document.getElementById("memoryAll").onclick = ()=>{

    openSensitive("Memory","All Reports");

};

document.getElementById("memoryBack").onclick = showHome;

};


chartsBtn.onclick = ()=>{

    setActiveButton(chartsBtn);

    showPage(

pageTitle(
"Charts",
"images/navigation/Charts1.png"
)

+`
<div class="grid-3x2">

<button
id="expensesChartBtn"
class="grid-btn">

<img
src="images/charts/ExpensesCharts.png"
class="btn-icon">

<span>

Expenses

</span>

</button>

<button
id="activitiesChartBtn"
class="grid-btn">

<img
src="images/charts/ActivityCharts.png"
class="btn-icon">

<span>

Activities

</span>

</button>

<button
id="incomeChartBtn"
class="grid-btn">

<img
src="images/charts/IncomeCharts.png"
class="btn-icon">

<span>

Income

</span>

</button>


<button
id="loansChartBtn"
class="grid-btn">

<img
src="images/charts/LoansCharts.png"
class="btn-icon">

<span>

Loans

</span>

</button>


<button
id="healthChartBtn"
class="grid-btn">

<img
src="images/charts/HealthCharts.png"
class="btn-icon">

<span>

Health

</span>

</button>




<button
id="chartsAboutBtn"
class="grid-btn">

<img
src="images/charts/AboutCharts.png"
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
"images/navigation/Reports1.png"
)

+`
<div class="grid-3x2">

<button id="expenseMainReports" class="grid-btn">

<img
src="images/reports/ExpensesReports.png"
class="btn-icon">

<span>

Expenses Reports

</span>

</button>

<button id="activityMainReports" class="grid-btn">

<img
src="images/reports/ActivitiesReports.png"
class="btn-icon">

<span>

Activities Reports

</span>

</button>

<button id="loanMainReports" class="grid-btn">

<img
src="images/reports/LoansReports.png"
class="btn-icon">

<span>

Loan Reports

</span>

</button>

<button id="incomeMainReports" class="grid-btn">

<img
src="images/reports/IncomeReports.png"
class="btn-icon">

<span>

Income Reports

</span>

</button>

<button id="healthMainReports" class="grid-btn">

<img
src="images/reports/HealthReports.png"
class="btn-icon">

<span>

Health Reports

</span>

</button>

<button id="memoryMainReports" class="grid-btn">

<img
src="images/reports/MemoriesReports.png"
class="btn-icon">

<span>

Memories Reports

</span>

</button>

<button class="grid-btn">

<img
src="images/reports/ReportsAbout.png"
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

reportCategory("Expenses");

};

document.getElementById("activityMainReports").onclick=()=>{

reportCategory("Activities");

};

document.getElementById("loanMainReports").onclick=()=>{

loanReportsMenu();

};

document.getElementById("incomeMainReports").onclick=()=>{

reportCategory("Income");

};

document.getElementById("healthMainReports").onclick=()=>{

reportCategory("Health");

};

document.getElementById("memoryMainReports").onclick=()=>{

reportCategory("Memories");

};
document.getElementById(
"reportsBack"
).onclick=()=>{

homeBtn.click();

};

};

function reportsLayout(title){

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

document.getElementById(
"reportBack"
).onclick=()=>{

homeBtn.click();

};

}

function openSensitive(moduleName, reportType){

showPage(`

<h2 class="page-title">

${moduleName}

</h2>

<h3 style="text-align:center;color:#2A6EB0;">

${reportType}

</h3>

<input
id="passCode"
type="password"
placeholder="Enter Sensitive Pass Code"
style="
width:90%;
height:50px;
margin:20px auto;
display:block;
border-radius:10px;
padding-left:15px;
font-size:16px;
">

<div align="center">

<button
id="verifyPass"
class="grid-btn">

Verify

</button>

<br><br>

<button
id="passBack"
class="back-btn">

← Back

</button>

</div>

`);

document.getElementById("verifyPass").onclick=()=>{

const pass=document.getElementById("passCode").value;

if(pass==="123456"){

reportsLayout(moduleName+" - "+reportType);

}else{

alert("Wrong Sensitive Pass Code");

}

};

document.getElementById("passBack").onclick=()=>{

homeBtn.click();

};

}

function reportCategory(module){

showPage(`

<h2 class="page-title">

${module} Reports

</h2>

<div class="grid-3x2">

<button
id="catReports"
class="grid-btn">

<img
src="images/reports/Reports.png"
class="btn-icon">

<span>

Reports

</span>

</button>

<button
id="catSensitive"
class="grid-btn">

<img
src="images/reports/SensitiveReports.png"
class="btn-icon">

<span>

Sensitive Reports

</span>

</button>

<button
id="catAll"
class="grid-btn">

<img
src="images/reports/AllReports.png"
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

document.getElementById("catReports").onclick=()=>{

reportsLayout(module+" Reports");

};

document.getElementById("catSensitive").onclick=()=>{

openSensitive(module,"Sensitive Reports");

};

document.getElementById("catAll").onclick=()=>{

openSensitive(module,"All Reports");

};

document.getElementById("catBack").onclick=()=>{

reportsBtn.click();

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

reportCategory("Loan - Lend");

};

document.getElementById("loanBorrowRpt").onclick=()=>{

reportCategory("Loan - Borrowed");

};

document.getElementById("paymentLendRpt").onclick=()=>{

reportCategory("Payments - Lend");

};

document.getElementById("paymentBorrowRpt").onclick=()=>{

reportCategory("Payments - Borrowed");

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

let logoutTimer;

logoutMenuBtn.onclick = ()=>{

    sideMenu.classList.remove("open");

    menuOverlay.classList.remove("show");

    const msg = document.getElementById("logoutMessage");

    msg.style.display = "block";

    clearTimeout(logoutTimer);

    logoutTimer = setTimeout(()=>{

        msg.style.display = "none";

    },2000);

};
 updateWelcomePage();
