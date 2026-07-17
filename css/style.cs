*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Arial,Helvetica,sans-serif;
}

body{
    
    background:#EAF8FF;

min-height:100vh;

padding-top:140px;

padding-bottom:80px;
overflow-x:hidden;

}

/* =======================
TOP BAR
======================= */

.topbar{

position:fixed;

top:0;

left:0;

right:0;

height:60px;

background:#4A9FE8;

display:flex;

align-items:center;

padding:0 15px;

z-index:999;

}


.menu-btn{

font-size:24px;

color:#000;

cursor:pointer;

z-index:2;


}


.app-title{

position:absolute;

left:50%;

transform:translateX(-50%);

font-size:24px;

font-weight:700;

color:#000;

white-space:nowrap;

}
.language{

margin-left:auto;

z-index:2;

}

.language select{

background:transparent;

border:none;

outline:none;

color:#000000;

font-weight:600;

padding:6px;

appearance:none;

-webkit-appearance:none;

-moz-appearance:none;

cursor:pointer;

}


/* =======================
WELCOME
======================= */

#welcomePage{

position:fixed;

top:60px;

bottom:80px;

left:0;

right:0;

padding:10px 8px 10px 8px;
overflow:hidden;

}

.welcome-box{

width:94%;

margin:5px auto 0 auto;

background:white;

border-radius:30px;

padding:20px 20px 30px 20px;

height:calc(100vh - 280px);

display:flex;

flex-direction:column;
overflow:hidden;
}
#welcomeAbout{

padding-bottom:20px;

}

.welcome-box h2{

color:#2A6EB0;

text-align:center;

margin-bottom:18px;

}

#welcomeSlogan{

line-height:1.6;

font-size:15px;

color:#4A9FE8;

font-weight:600;

text-align:center;

margin-bottom:20px;

}

#welcomeAbout p{

font-weight:400;

font-size:15px;

line-height:1.7;

color:#444;

text-align:justify;

}

#welcomeAbout h3{

color:#2A6EB0;

font-size:18px;

font-weight:600;

margin-top:18px;

margin-bottom:8px;

}


/* =======================
LOGIN SIGNUP
======================= */

.auth-buttons{

position:fixed;

bottom:15px;

left:0;

right:0;

display:flex;

justify-content:center;

gap:20px;

background:#EAF8FF;

padding:10px;

z-index:999;

}


.auth-buttons button{

width:130px;

height:46px;

border:none;

border-radius:12px;

background:#4A9FE8;

color:white;

font-size:16px;

cursor:pointer;

}



/* =======================
LOGIN PAGE
======================= */

#loginPage{

width:90%;

margin:auto;

padding-top:40px;

display:flex;

flex-direction:column;

gap:15px;

}


#loginPage h3{

text-align:center;

color:#2A6EB0;

}


#loginPage input{

height:46px;

border:none;

border-radius:12px;

padding-left:15px;

}


#loginPage button{

height:46px;

border:none;

border-radius:12px;

background:#4A9FE8;

color:white;

}



/* =======================
OTP PAGE
======================= */

#otpPage{

width:90%;

margin:auto;

padding-top:40px;

display:flex;

flex-direction:column;

gap:15px;

}


#otpPage h3{

text-align:center;

color:#2A6EB0;

}


#otpPage input{

height:46px;

border:none;

border-radius:12px;

padding-left:15px;

}


#otpPage button{

height:46px;

border:none;

border-radius:12px;

background:#4A9FE8;

color:white;

}



/* =======================
DASHBOARD
======================= */

#dashboard{

padding-top:5px;

}


.top-container{

position:fixed;

top:68px;

left:12px;

right:12px;

height:60px;

display:flex;

justify-content:space-evenly;

align-items:center;

background:#C0E2FF;

border-radius:28px;

padding:0 14px;

z-index:998;

box-shadow:0 2px 8px rgba(0,0,0,0.05);

}
.top-container button{

background:transparent;

border:none;

padding:6px;

font-size:13px;

font-weight:600;

color:#000000;

cursor:pointer;

transition:0.3s;
display:flex;

flex-direction:column;

justify-content:center;

align-items:center;

gap:4px;
}


#homeContent{

margin-top:2px;

height:calc(100vh - 235px);

}


/* =======================
BOTTOM BAR
======================= */

.bottom-container{

position:fixed;

bottom:0;

left:0;

right:0;

height:60px;

background:#4A9FE8;

display:flex;

justify-content:space-around;

align-items:center;

}


.bottom-container button{

border:none;

background:none;

color:#000000;

font-size:13px;

font-weight:600;

cursor:pointer;

transition:0.3s;

}


.active{

color:#FFD700 !important;

font-weight:700;

}

/* =======================
HIDDEN
======================= */

.hidden{

display:none !important;

}
#signupPage,
#signupOTPPage{

width:90%;

margin:auto;

padding-top:40px;

display:flex;

flex-direction:column;

gap:15px;

}


#signupPage h3,
#signupOTPPage h3{

text-align:center;

color:#2A6EB0;

}


#signupPage input,
#signupOTPPage input{

height:46px;

border:none;

border-radius:12px;

padding-left:15px;

}


#signupPage button,
#signupOTPPage button{

height:46px;

border:none;

border-radius:12px;

background:#4A9FE8;

color:white;

}
.grid-3x2{

display:grid;

grid-template-columns:repeat(3,1fr);

gap:15px;

margin:30px auto;

width:90%;

justify-items:center;

}




.back-btn{

display:block;

width:140px;

margin:20px auto;

padding:12px 25px;

border:2px solid red;

background:transparent;

border-radius:12px;

color:red;

font-weight:600;

cursor:pointer;

}
.grid-2{

display:grid;

grid-template-columns:repeat(2,1fr);

gap:15px;

max-width:320px;

margin:25px auto;

}

.grid-btn{

width:100%;

max-width:160px;

background:transparent;


border:none;

border-radius:12px;

padding:18px;

font-size:14px;

font-weight:600;

color:#2A6EB0;

cursor:pointer;

min-height:70px;

}


.page-title{

text-align:center;

font-size:24px;

font-weight:700;

color:#2A6EB0;

margin-top:5px;

margin-bottom:15px;

}




.report-grid{

display:grid;

grid-template-columns:repeat(3,1fr);

column-gap:15px;

row-gap:25px;

width:90%;

margin:15px auto;

justify-items:center;

}

.page-title{

display:flex;

align-items:center;

justify-content:center;

gap:10px;

font-size:24px;

font-weight:bold;

color:#2A6EB0;

}

.title-icon{

width:32px;

height:32px;

object-fit:contain;

}

.report-btn{

width:100%;

background:transparent;

border:2px solid #4A9FE8;

border-radius:14px;

padding:15px;

color:#2A6EB0;

font-weight:600;

cursor:pointer;

}


/* ==========================
SVG ICONS
========================== */

.btn-icon{

width:38px;

height:38px;

display:block;

margin:0 auto 8px;

object-fit:contain;

}

.nav-icon{

width:22px;

height:22px;

display:block;

margin:0 auto 4px;

object-fit:contain;

}

.grid-btn{

display:flex;

flex-direction:column;

justify-content:center;

align-items:center;

gap:8px;

}

.top-container button,
.bottom-container button{

display:flex;

flex-direction:column;

justify-content:center;

align-items:center;

gap:3px;

}
.chart-btn{
padding:5px;

min-height:45px;

font-size:12px;

}
.chart-about-btn{

width:120px;

min-height:50px;

padding:10px;

justify-self:center;

font-size:12px;

font-weight:600;

}

/* Selected Top & Bottom Buttons */

.top-container button.active,
.bottom-container button.active{

background:none;

color:#FFD700 !important;

}
/* Welcome Box Scroll Bar */

.welcome-box::-webkit-scrollbar{

width:8px;

}

.welcome-box::-webkit-scrollbar-track{

background:#EAF8FF;

}

.welcome-box::-webkit-scrollbar-thumb{

background:#4A9FE8;

border-radius:10px;

}

.welcome-box::-webkit-scrollbar-thumb:hover{

background:#2A6EB0;

}
#homeWelcomeContent{

flex:1;

overflow-y:auto;

overflow-x:hidden;

padding-right:8px;

}
#welcomeContent{

flex:1;

overflow-y:auto;

overflow-x:hidden;

padding-right:8px;

}
#homeWelcomeContent::-webkit-scrollbar{

width:8px;

}

#homeWelcomeContent::-webkit-scrollbar-thumb{

background:#4A9FE8;

border-radius:10px;

}

#homeWelcomeContent::-webkit-scrollbar-track{

background:#EAF8FF;

}
#welcomeContent::-webkit-scrollbar{

width:8px;

}

#welcomeContent::-webkit-scrollbar-thumb{

background:#4A9FE8;

border-radius:10px;

}

#welcomeContent::-webkit-scrollbar-track{

background:#EAF8FF;

}
#homeWelcomeHeading{

text-align:center;

color:#2A6EB0;

margin-bottom:18px;

}

#homeWelcomeSlogan{

text-align:center;

font-size:15px;

font-weight:600;

line-height:1.6;

color:#4A9FE8;

margin-bottom:20px;

}

#homeWelcomeAbout h3{

color:#2A6EB0;

font-weight:600;

}

#homeWelcomeAbout p{

font-size:15px;

font-weight:400;

line-height:1.7;

color:#444;

text-align:justify;

}
/* ==========================
SIDE MENU
========================== */

.side-menu{

position:fixed;

top:0;

left:-300px;

width:280px;

height:100%;

background:white;

box-shadow:2px 0 15px rgba(0,0,0,0.25);

transition:0.3s;

z-index:2000;

display:flex;

flex-direction:column;

}

.side-menu.open{

left:0;

}

.menu-header{

height:60px;

background:#4A9FE8;

display:flex;

justify-content:space-between;

align-items:center;

padding:0 15px;

font-size:20px;

font-weight:bold;

color:#000;

}

#closeMenuBtn{

background:none;

border:none;

font-size:22px;

cursor:pointer;

color:#000;

}

.side-menu button{

height:50px;

border:none;

background:transparent;

text-align:left;

padding-left:20px;

font-size:16px;

cursor:pointer;

}

.side-menu button:hover{

background:#EAF8FF;

}

.menu-overlay{

position:fixed;

top:0;

left:0;

width:100%;

height:100%;

background:rgba(0,0,0,0.35);

display:none;

z-index:1999;

}

.menu-overlay.show{

display:block;

}


.logout-message{

position:fixed;

top:50%;

left:50%;

transform:translate(-50%,-50%);

background:#CBE7FF;

color:#1E5FAF;

padding:18px 25px;

border-radius:15px;

border:2px solid #4A9FE8;

font-size:17px;

font-weight:600;

text-align:center;

display:none;

z-index:5000;

box-shadow:0 4px 12px rgba(0,0,0,0.20);

min-width:300px;

}
