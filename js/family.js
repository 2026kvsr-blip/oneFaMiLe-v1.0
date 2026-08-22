/* =====================================
   oneFaMiLe
   FAMILY MODULE
   ===================================== */
/* =====================================
   GENERATE UNIQUE FAMILY ID
   FORMAT:
   F-NAME-RANDOM4
   ===================================== */

function generateFamilyId(familyName){

    const cleanName =
        familyName
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "");

    const namePart =
        cleanName
            .substring(0,4)
            .padEnd(4,"X");

   
    /* =================================
       GET EXISTING FAMILY IDs
       ================================= */

    const existingFamilies =
        JSON.parse(
            localStorage.getItem(
                "familyTrees"
            ) || "[]"
        );


    const existingIds =
        existingFamilies.map(
            family =>
                family.familyId
        );


    let familyId;
    let uniquePart;


    /* =================================
       GENERATE UNIQUE RANDOM 4
       ================================= */

    do{

        uniquePart =
            Math.random()
                .toString(36)
                .substring(2,6)
                .toUpperCase();

        familyId =
            `F-${namePart}-${uniquePart}`;

    }
    while(
        existingIds.includes(
            familyId
        )
    );


    return familyId;
}

/* =====================================
   CHECK FAMILY ID AVAILABILITY
   ===================================== */

function isFamilyIdAvailable(familyId){

    const existingFamilies =
        JSON.parse(
            localStorage.getItem("familyTrees") || "[]"
        );

    return !existingFamilies.some(
        family =>
            family.familyId === familyId
    );
}
/* =====================================
   FAMILY MAIN PAGE
   ===================================== */

familyBtn.onclick = () => {

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

        `

    );

/* =====================================
   FAMILY → ADD MEMBER
   ===================================== */

document
    .getElementById("addMemberBtn")
    .onclick = () => {

    showPage(

    pageTitle(
        "Add Member",
        "images/colorbtns/AddMember1.png"
    )

    + `

    <div class="common-page">

        <div class="common-form">

            <!-- =================================
                 FAMILY ID
                 ================================= -->

            <div class="common-form-group">

                <label class="common-form-label">
                    Family ID
                </label>

                <span class="common-form-colon">
                    :
                </span>

                <strong
                    id="memberFamilyId"
                    class="common-form-value">
                    -
                </strong>

            </div>


            <!-- =================================
                 FAMILY NAME
                 ================================= -->

            <div class="common-form-group">

                <label class="common-form-label">
                    Family Name
                </label>

                <span class="common-form-colon">
                    :
                </span>

                <strong
                    id="memberFamilyName"
                    class="common-form-value">
                    -
                </strong>

            </div>


            <!-- =================================
                 MEMBER ID
                 ================================= -->

            <div class="common-form-group">

                <label class="common-form-label">
                    Member ID
                </label>

                <span class="common-form-colon">
                    :
                </span>

                <strong
                    id="memberId"
                    class="common-form-value">
                    auto generation
                </strong>

            </div>


            <!-- =================================
                 NAME
                 ================================= -->

            <div class="common-form-group member-name-row">

                <label
                    class="common-form-label"
                    for="memberName">
                    Name
                </label>

                <span class="common-form-colon">
                    :
                </span>

                <input
                    type="text"
                    id="memberName"
                    class="common-form-input"
                    placeholder="Enter Name"
                    required
                    autocomplete="off">

            </div>


            <!-- =================================
                 GENDER
                 ================================= -->

            <div class="common-form-group">

                <label
                    class="common-form-label"
                    for="memberGender">
                    Gender
                </label>

                <span class="common-form-colon">
                    :
                </span>

                <select
                    id="memberGender"
                    class="common-form-select"
                    required>

                    <option value="">
                        Select Gender
                    </option>

                    <option value="Male">
                        Male
                    </option>

                    <option value="Female">
                        Female
                    </option>

                </select>

            </div>


            <!-- =================================
                 DATE OF BIRTH
                 ================================= -->

            <div class="common-form-group">

                <label
                    class="common-form-label"
                    for="memberDob">
                    DoB
                </label>

                <span class="common-form-colon">
                    :
                </span>

                <input
                    type="date"
                    id="memberDob"
                    class="common-form-input"
                    required>

            </div>


            <!-- =================================
                 PHOTO
                 ================================= -->

            <div class="common-form-group">

                <label
                    class="common-form-label">
                    Photo
                </label>

                <span class="common-form-colon">
                    :
                </span>

                <input
                    type="file"
                    id="memberPhoto"
                    accept="image/*"
                    hidden>

                <button
                    type="button"
                    id="memberPhotoBtn"
                    class="common-photo-input">
                    Select Photo
                </button>

            </div>


            <!-- =================================
                 MARITAL STATUS
                 ================================= -->

            <div class="common-form-group">

                <label class="common-form-label">
                    Marital Status
                </label>

                <span class="common-form-colon">
                    :
                </span>

                <div class="common-radio-group">

                    <label>
                        <input
                            type="radio"
                            name="memberMaritalStatus"
                            value="Yes"
                            id="marriedYes">
                        Yes
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="memberMaritalStatus"
                            value="No"
                            id="marriedNo">
                        No
                    </label>

                </div>

            </div>


            <!-- =================================
                 MARRIAGE CONFIRMATION
                 ================================= -->

            <div
                id="marriageConfirmation"
                class="common-form-group"
                style="display:none;">

                <label class="common-form-label">
                    Confirmation
                </label>

                <span class="common-form-colon">
                    :
                </span>

                <div class="common-radio-group">

                    <span>
                        Are you really married?
                    </span>

                    <label>
                        <input
                            type="radio"
                            name="marriageConfirm"
                            value="Yes"
                            id="confirmMarriageYes">
                        Yes
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="marriageConfirm"
                            value="No"
                            id="confirmMarriageNo">
                        No
                    </label>

                </div>

            </div>


            <!-- =================================
                 PARTNER
                 ================================= -->

            <div
                id="memberPartnerGroup"
                class="common-form-group"
                style="display:none;">

                <label
                    class="common-form-label"
                    for="memberPartner">
                    Partner
                </label>

                <span class="common-form-colon">
                    :
                </span>

               <select
    id="memberPartner"
    class="common-form-select">

    <option value="__ADD_NEW__">
        Add New Person
    </option>

    <option value="">
        Select Partner
    </option>

</select>
            </div>


<!-- =================================
     FATHER
     ================================= -->

<div
    id="memberFatherGroup"
    class="common-form-group">

    <label
        class="common-form-label"
        for="memberFather">
        Father
    </label>

    <span class="common-form-colon">
        :
    </span>

    <select
        id="memberFather"
        class="common-form-select">

        <option value="__ADD_NEW__">
            Add New Person
        </option>

        <option value="">
            Select Father
        </option>

    </select>

</div>
<!-- =================================
     MOTHER
     ================================= -->

<div
    id="memberMotherGroup"
    class="common-form-group">

    <label
        class="common-form-label"
        for="memberMother">
        Mother
    </label>

    <span class="common-form-colon">
        :
    </span>

    <select
        id="memberMother"
        class="common-form-select">

        <option value="__ADD_NEW__">
            Add New Person
        </option>

        <option value="">
            Select Mother
        </option>

    </select>

</div>


<!-- =================================
     MEMBER ACTIONS
     ================================= -->

<div
    id="memberActions"
    class="common-form-actions member-actions">
</div>
</div>

    </div>

    `

);

/* =================================
   PHOTO BUTTON
   ================================= */

const memberPhoto =
    document.getElementById(
        "memberPhoto"
    );

const memberPhotoBtn =
    document.getElementById(
        "memberPhotoBtn"
    );


if(
    memberPhoto &&
    memberPhotoBtn
){

    memberPhotoBtn.onclick =
        function(){

            memberPhoto.click();

        };

}
   /* =================================
   MARITAL STATUS LOGIC
   ================================= */

const memberDob =
    document.getElementById(
        "memberDob"
    );

const marriedYes =
    document.getElementById(
        "marriedYes"
    );

const marriedNo =
    document.getElementById(
        "marriedNo"
    );

const marriageConfirmation =
    document.getElementById(
        "marriageConfirmation"
    );

const confirmMarriageYes =
    document.getElementById(
        "confirmMarriageYes"
    );

const confirmMarriageNo =
    document.getElementById(
        "confirmMarriageNo"
    );

const memberPartnerGroup =
    document.getElementById(
        "memberPartnerGroup"
    );


/* =================================
   CALCULATE AGE
   ================================= */

function calculateMemberAge(
    dateOfBirth
){

    if(!dateOfBirth){
        return null;
    }

    const dob =
        new Date(dateOfBirth);

    const today =
        new Date();

    let age =
        today.getFullYear()
        - dob.getFullYear();

    const monthDifference =
        today.getMonth()
        - dob.getMonth();

    if(
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < dob.getDate()
        )
    ){

        age--;

    }

    return age;

}


/* =================================
   HIDE PARTNER
   ================================= */

function hidePartner(){

    if(memberPartnerGroup){

        memberPartnerGroup.style.display =
            "none";

    }

}


/* =================================
   SHOW PARTNER
   ================================= */

function showPartner(){

    if(memberPartnerGroup){

        memberPartnerGroup.style.display =
            "flex";

    }

}


/* =================================
   RESET CONFIRMATION
   ================================= */

function hideMarriageConfirmation(){

    if(marriageConfirmation){

        marriageConfirmation.style.display =
            "none";

    }

    if(confirmMarriageYes){

        confirmMarriageYes.checked =
            false;

    }

    if(confirmMarriageNo){

        confirmMarriageNo.checked =
            false;

    }

}
/* =================================
   DOB CHANGE
   ================================= */

if(memberDob){

    memberDob.addEventListener(
        "change",
        function(){

            const age =
                calculateMemberAge(
                    this.value
                );


            /* DoB not selected */

            if(age === null){

                hideMarriageConfirmation();

                hidePartner();

                if(marriedYes){
                    marriedYes.checked = false;
                }

                if(marriedNo){
                    marriedNo.checked = false;
                }

                return;

            }


            /* Age 18 or above */

            if(age >= 18){

                hideMarriageConfirmation();

                /*
                   If Yes is already selected,
                   show Partner immediately
                */

                if(
                    marriedYes &&
                    marriedYes.checked
                ){

                    showPartner();

                }

            }


            /* Age below 18 */

            else {

                /*
                   If Yes is already selected,
                   ask confirmation again
                */

                if(
                    marriedYes &&
                    marriedYes.checked
                ){

                    hidePartner();

                    if(marriageConfirmation){

                        marriageConfirmation.style.display =
                            "flex";

                    }

                }

            }

        }
    );

}

/* =================================
   YES
   ================================= */

if(marriedYes){

    marriedYes.addEventListener(
        "change",
        function(){

            if(!this.checked){
                return;
            }


            hidePartner();


            const age =
                calculateMemberAge(
                    memberDob
                        ? memberDob.value
                        : ""
                );


            /* DoB not selected */

            if(age === null){

                alert(
                    "Please select DoB first."
                );

                this.checked =
                    false;

                return;

            }


            /* Under 18 */

            if(age < 18){

                if(marriageConfirmation){

                    marriageConfirmation.style.display =
                        "flex";

                }

                return;

            }


            /* 18 or above */

            hideMarriageConfirmation();

            showPartner();

        }
    );

}


/* =================================
   NO
   ================================= */

if(marriedNo){

    marriedNo.addEventListener(
        "change",
        function(){

            if(!this.checked){
                return;
            }

            hideMarriageConfirmation();

            hidePartner();

        }
    );

}


/* =================================
   CONFIRMATION YES
   ================================= */

/* =================================
   CONFIRMATION YES
   ================================= */

if(confirmMarriageYes){

    confirmMarriageYes.addEventListener(
        "change",
        function(){

            if(!this.checked){
                return;
            }


            /* =============================
               HIDE CONFIRMATION
               ============================= */

            hideMarriageConfirmation();


            /* =============================
               SHOW PARTNER
               ============================= */

            showPartner();

        }
    );

}


/* =================================
   CONFIRMATION NO
   ================================= */

/* =================================
   CONFIRMATION NO
   ================================= */

if(confirmMarriageNo){

    confirmMarriageNo.addEventListener(
        "change",
        function(){

            if(!this.checked){
                return;
            }


            /* =============================
               MARITAL STATUS → NO
               ============================= */

            if(marriedNo){

                marriedNo.checked =
                    true;

            }


            /* =============================
               HIDE CONFIRMATION
               ============================= */

            hideMarriageConfirmation();


            /* =============================
               HIDE PARTNER
               ============================= */

            hidePartner();

        }
    );

}  
/* =================================
   LOAD FAMILY MEMBERS
   INTO PARTNER / FATHER / MOTHER
   ================================= */

const currentFamily =
    JSON.parse(
        localStorage.getItem(
            "currentFamily"
        )
    );


if(currentFamily){

    const members =
        JSON.parse(
            localStorage.getItem(
                "familyMembers"
            )
        ) || [];


    const familyMembers =
        members.filter(
            function(member){

                return (
                    member.familyId ===
                    currentFamily.familyId
                );

            }
        );


    /* =================================
       PARTNER
       ================================= */

    const partnerField =
        document.getElementById(
            "memberPartner"
        );


    /* =================================
       FATHER
       ================================= */

    const fatherField =
        document.getElementById(
            "memberFather"
        );


    /* =================================
       MOTHER
       ================================= */

    const motherField =
        document.getElementById(
            "memberMother"
        );


    /* =================================
       ADD MEMBERS TO DROPDOWNS
       ================================= */

    familyMembers.forEach(
        function(member){

            /* -------------------------
               PARTNER
               ------------------------- */

            if(partnerField){

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    member.memberId;

                option.textContent =
                    member.name +
                    " (" +
                    member.memberId +
                    ")";

                partnerField.appendChild(
                    option
                );

            }


            /* -------------------------
               FATHER
               ------------------------- */

            if(fatherField){

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    member.memberId;

                option.textContent =
                    member.name +
                    " (" +
                    member.memberId +
                    ")";

                fatherField.appendChild(
                    option
                );

            }


            /* -------------------------
               MOTHER
               ------------------------- */

            if(motherField){

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    member.memberId;

                option.textContent =
                    member.name +
                    " (" +
                    member.memberId +
                    ")";

                motherField.appendChild(
                    option
                );

            }

        }
    );

}
/* =================================
   MEMBER ACTION BUTTONS
   ================================= */

const memberActions =
    document.getElementById(
        "memberActions"
    );


if(memberActions){

    /* =============================
       SAVE
       ============================= */

    const saveMemberBtn =
        createPrimaryButton(
            "Save Member",
            "saveMemberBtn"
        );

/* =================================
   SAVE MEMBER
   ================================= */

saveMemberBtn.onclick =
    function(){

        /* =============================
           GET CURRENT FAMILY
           ============================= */

        const currentFamily =
            JSON.parse(
                localStorage.getItem(
                    "currentFamily"
                )
            );


        if(!currentFamily){

            showMessage(
                "Family information not available.",
                "warning",
                3000
            );

            return;

        }


        /* =============================
           GET FORM VALUES
           ============================= */

        const memberName =
            document.getElementById(
                "memberName"
            ).value.trim();


        const memberGender =
            document.getElementById(
                "memberGender"
            ).value;


        const memberDob =
            document.getElementById(
                "memberDob"
            ).value;


        const memberMarital =
            document.querySelector(
                'input[name="memberMaritalStatus"]:checked'
            );


        /* =============================
           BASIC VALIDATION
           ============================= */

        if(!memberName){

            showMessage(
                "Please enter Member Name.",
                "warning",
                3000
            );

            return;

        }


        if(!memberGender){

            showMessage(
                "Please select Gender.",
                "warning",
                3000
            );

            return;

        }


        if(!memberDob){

            showMessage(
                "Please select DoB.",
                "warning",
                3000
            );

            return;

        }


        if(!memberMarital){

            showMessage(
                "Please select Marital Status.",
                "warning",
                3000
            );

            return;

        }


        /* =============================
           GET EXISTING MEMBERS
           ============================= */

        let members =
            JSON.parse(
                localStorage.getItem(
                    "familyMembers"
                )
            ) || [];


        /* =============================
           CURRENT FAMILY MEMBERS
           ============================= */

        const familyMembers =
            members.filter(
                function(member){

                    return (
                        member.familyId ===
                        currentFamily.familyId
                    );

                }
            );


        /* =============================
           GENERATE MEMBER NUMBER
           ============================= */

        let nextNumber =
            familyMembers.length + 1;


        let memberNumber =
            String(nextNumber)
                .padStart(
                    5,
                    "0"
                );


        /* =============================
           MEMBER ID
           ============================= */

        const familyCode =
            String(
                currentFamily.familyName || ""
            )
            .trim()
            .toUpperCase()
            .replace(
                /\s+/g,
                ""
            );


        const memberId =
            familyCode +
            "-M-" +
            memberNumber;


        /* =============================
           GET PARTNER
           ============================= */

        const partnerField =
            document.getElementById(
                "memberPartner"
            );


        const partnerId =
            partnerField ?
            partnerField.value :
            "";


        /* =============================
           GET FATHER
           ============================= */

        const fatherField =
            document.getElementById(
                "memberFather"
            );


        const fatherId =
            fatherField ?
            fatherField.value :
            "";


        /* =============================
           GET MOTHER
           ============================= */

        const motherField =
            document.getElementById(
                "memberMother"
            );


        const motherId =
            motherField ?
            motherField.value :
            "";


        /* =============================
           CREATE MEMBER OBJECT
           ============================= */

        const newMember = {

            memberId:
                memberId,

            familyId:
                currentFamily.familyId,

            familyName:
                currentFamily.familyName,

            name:
                memberName,

            gender:
                memberGender,

            dob:
                memberDob,

            maritalStatus:
                memberMarital.value,

            partnerId:
                partnerId,

            fatherId:
                fatherId,

            motherId:
                motherId,

            createdAt:
                new Date().toISOString()

        };


        /* =============================
           SAVE MEMBER
           ============================= */

        members.push(
            newMember
        );


        localStorage.setItem(
            "familyMembers",
            JSON.stringify(
                members
            )
        );


        /* =============================
           UPDATE MEMBER ID ON PAGE
           ============================= */

        const memberIdField =
            document.getElementById(
                "memberId"
            );


        if(memberIdField){

            memberIdField.textContent =
                memberId;

        }


        /* =============================
           SUCCESS MESSAGE
           ============================= */

        showMessage(
            "Member saved successfully: " +
            memberId,
            "success",
            3000
        );

    };
    /* =============================
       BACK
       ============================= */

    const memberBackBtn =
        createBackButton(
            "memberBackBtn"
        );


    /* =============================
       HOME
       ============================= */

    const memberHomeBtn =
        createPrimaryButton(
            "⌂ Home",
            "memberHomeBtn"
        );


    /* =============================
       ADD ALL 3 BUTTONS
       ============================= */

    memberActions.appendChild(
        saveMemberBtn
    );

    memberActions.appendChild(
        memberBackBtn
    );

    memberActions.appendChild(
        memberHomeBtn
    );


    /* =============================
       HOME ACTION
       ============================= */

    memberHomeBtn.onclick =
        function(){

            showHomePage();

        };

}
       /* =================================
   GET CURRENT FAMILY
   ================================= */

const currentFamily =
    JSON.parse(
        localStorage.getItem(
            "currentFamily"
        )
    );


/* =================================
   SHOW FAMILY INFORMATION
   ================================= */

if(currentFamily){

    const familyIdField =
        document.getElementById(
            "memberFamilyId"
        );

    const familyNameField =
        document.getElementById(
            "memberFamilyName"
        );


    if(familyIdField){

        familyIdField.textContent =
            currentFamily.familyId || "-";

    }


    if(familyNameField){

        familyNameField.textContent =
            currentFamily.familyName || "-";

    }

}
/* =================================
   GENERATE MEMBER ID PREFIX
   ================================= */

const memberIdField =
    document.getElementById(
        "memberId"
    );


if(
    memberIdField &&
    currentFamily &&
    currentFamily.familyName
){

    const familyCode =
        currentFamily.familyName
            .trim()
            .substring(0, 4)
            .toUpperCase();


    memberIdField.textContent =
        familyCode + "-M-00001";

}
       
};
    /* =====================================
       FAMILY → ADD TREE
       ===================================== */

    document
        .getElementById("addFamilyBtn")
        .onclick = () => {


        const user =
            JSON.parse(
                sessionStorage.getItem("user")
            );


        if(!user){

            showMessage(
                "User information not available.",
                "warning",
                3000
            );

            return;
        }


        /* =====================================
           CREATE FAMILY TREE PAGE
           ===================================== */

                showPage(

            pageTitle(
                "Create Family Tree",
                "images/colorbtns/AddFamily1.png"
            )

            +`

          <div class="family-box">

    <!-- FAMILY ID -->

    <div class="family-row">

        <span class="family-label">
            Family ID
        </span>

        <span class="family-colon">
            :
        </span>

        <strong id="newFamilyId">
            auto generation
        </strong>

    </div>


    <!-- FAMILY NAME -->

   <!-- FAMILY NAME -->

<div class="family-row">

    <span class="family-label">
        Family Name
    </span>

    <span class="family-colon">
        :
    </span>

    <div class="family-name-field">

        <input
            type="text"
            id="newFamilyName"
            placeholder="Enter Family Name"
            maxlength="20"
            autocomplete="off"
        >

        <div
            id="familyIdStatus"
            class="family-id-status">
        </div>

    </div>

</div>




<!-- CREATE BUTTON -->

<div class="family-create-action">

    <button
        id="createFamilyTreeBtn"
        class="family-create-btn"
        disabled>

        Create Family Tree

    </button>

</div>


<!-- BACK BUTTON -->

<div class="family-back-action">

    <button
        id="createFamilyBackBtn"
        class="back-btn">

        ← Back

    </button>

</div>
            `
        );
/* =====================================
   LOAD EXISTING FAMILY TREE
   ===================================== */

const loggedUser =
    JSON.parse(
        sessionStorage.getItem("user")
    ) || {};

if(loggedUser){

    const params =
        new URLSearchParams();

    params.append(
        "action",
        "getUserFamilyTree"
    );

    params.append(
        "loginUserName",
        loggedUser.loginUserName || ""
    );

    params.append(
        "email",
        loggedUser.email || ""
    );

    params.append(
        "mobile",
        loggedUser.mobile || ""
    );


    fetch(
        API_URL,
        {
            method:"POST",

            headers:{
                "Content-Type":
                    "application/x-www-form-urlencoded"
            },

            body:
                params.toString()
        }
    )
    .then(
        function(response){

            return response.json();

        }
    )
    .then(
        function(result){

            /* =========================
               FAMILY TREE FOUND
               ========================= */

            if(
                result.status !==
                "success"
            ){

                return;

            }


            /* =========================
               GET FAMILY ELEMENTS
               ========================= */

            const createBtn =
                document.getElementById(
                    "createFamilyTreeBtn"
                );

            const familyNameInput =
                document.getElementById(
                    "newFamilyName"
                );

            const familyIdField =
                document.getElementById(
                    "newFamilyId"
                );

            const statusField =
                document.getElementById(
                    "familyIdStatus"
                );


            /* =========================
               HIDE CREATE BUTTON
               ========================= */

            if(createBtn){

                createBtn.style.display =
                    "none";

            }


            /* =========================
               SHOW FAMILY ID
               ========================= */

            if(familyIdField){

                familyIdField.textContent =
                    result.familyId;

                familyIdField.classList.add(
                    "generated"
                );

            }


            /* =========================
               SHOW FAMILY NAME
               ========================= */

            if(familyNameInput){

                familyNameInput.value =
                    result.familyName;

                familyNameInput.disabled =
                    true;

            }


            /* =========================
               SHOW MESSAGE
               ========================= */

            if(statusField){

                statusField.textContent =
                    "User already have a Family Tree.";

                statusField.className =
                    "family-id-status available";

            }

        }
    )
    .catch(
        function(error){

            console.error(
                "Family Tree Load Error:",
                error
            );

        }
    );

}
           
        /* =====================================
           FAMILY NAME → GENERATE FAMILY ID
           ===================================== */

      /* =====================================
   FAMILY NAME → FAMILY ID
   ===================================== */

/* =====================================
   FAMILY NAME → FAMILY ID
   VERIFY AVAILABILITY
   ===================================== */

let familyAvailabilityTimer = null;
let familyInputVersion = 0;
           
document
    .getElementById("newFamilyName")
    .addEventListener(
        "input",
        function(){
        
            const familyName =
                this.value.trim();

            const familyIdField =
                document.getElementById(
                    "newFamilyId"
                );

            const statusField =
                document.getElementById(
                    "familyIdStatus"
                );

            const createBtn =
                document.getElementById(
                    "createFamilyTreeBtn"
                );

            /* =================================
               CANCEL PREVIOUS CHECK
               ================================= */

            if(familyAvailabilityTimer){

                clearTimeout(
                    familyAvailabilityTimer
                );

                familyAvailabilityTimer =
                    null;
            }


           /* =================================
   FAMILY NAME VALIDATION
   ================================= */

const invalidCharacters =
    /[^A-Za-z0-9_.@-]/;

if(invalidCharacters.test(familyName)){

    statusField.textContent =
        "Only letters, numbers, - _ . @ are allowed";

    statusField.className =
        "family-id-status not-available";

    createBtn.disabled = true;

    familyIdField.textContent =
        "auto generation";

    familyIdField.classList.remove(
        "generated"
    );

    return;
}
            /* =================================
               NEW INPUT VERSION
               ================================= */

            familyInputVersion++;

            const currentVersion =
                familyInputVersion;


            /* =================================
               CREATE BUTTON DISABLED
               ================================= */

            createBtn.disabled = true;


            /* =================================
               EMPTY
               ================================= */

            if(familyName.length === 0){

                familyIdField.textContent =
                    "auto generation";

                familyIdField.classList.remove(
                    "generated"
                );

                statusField.textContent =
                    "";

                statusField.className =
                    "family-id-status";

                return;
            }


            /* =================================
               LESS THAN 4 LETTERS
               ================================= */

            if(familyName.length < 4){

                familyIdField.textContent =
                    "auto generation";

                familyIdField.classList.remove(
                    "generated"
                );

                statusField.textContent =
    "Name must be min 4 letters";

statusField.className =
    "family-id-status min-length";

                return;
            }


            /* =================================
               GENERATE ID ONLY ONCE
               ================================= */

            if(
                !familyIdField.classList.contains(
                    "generated"
                )
            ){

                familyIdField.textContent =
                    generateFamilyId(
                        familyName.substring(0,4)
                    );

                familyIdField.classList.add(
                    "generated"
                );
            }


            /* =================================
               FIXED FAMILY ID
               ================================= */

            const generatedFamilyId =
                familyIdField.textContent.trim();


            /* =================================
               CHECKING MESSAGE
               ================================= */

            statusField.innerHTML =
                '<span class="checking-spinner"></span> Checking availability...';

            statusField.className =
                "family-id-status checking";


            /* =================================
               DELAYED AVAILABILITY CHECK
               ================================= */

            familyAvailabilityTimer =
                setTimeout(
                    function(){

                        /* =========================
                           IGNORE OLD REQUEST
                           ========================= */

                        if(
                            currentVersion !==
                            familyInputVersion
                        ){

                            return;
                        }


                        /* =========================
                           CHECK CURRENT TEXT AGAIN
                           ========================= */

                        const currentName =
                            document
                                .getElementById(
                                    "newFamilyName"
                                )
                                .value
                                .trim();


                        /* =========================
                           LESS THAN 4 NOW
                           ========================= */

                        if(
                            currentName.length < 4
                        ){

                            statusField.textContent =
                                currentName.length === 0
                                    ? ""
                                    : "Name must be min 4 letters";

                           statusField.className =
    currentName.length === 0
        ? "family-id-status"
        : "family-id-status min-length";

                            createBtn.disabled =
                                true;

                            return;
                        }


                       /* =========================
   BACKEND AVAILABILITY CHECK
   ========================= */

const currentUser =
    JSON.parse(
        sessionStorage.getItem("user")
    ) || {};


const params =
    new URLSearchParams();


params.append(
    "action",
    "checkFamilyAvailability"
);


params.append(
    "familyId",
    generatedFamilyId
);


params.append(
    "familyName",
    currentName
);


params.append(
    "loginUserName",
    currentUser.loginUserName || ""
);


params.append(
    "email",
    currentUser.email || ""
);


params.append(
    "mobile",
    currentUser.mobile || ""
);


/* =========================
   SEND TO BACKEND
   ========================= */

fetch(
    API_URL,
    {
        method:"POST",

        headers:{
            "Content-Type":
                "application/x-www-form-urlencoded"
        },

        body:
            params.toString()
    }
)
.then(
    function(response){

        return response.json();

    }
)
.then(
    function(result){

        /* =====================
           IGNORE OLD RESPONSE
           ===================== */

        if(
            currentVersion !==
            familyInputVersion
        ){

            return;
        }


        /* =====================
           AVAILABLE
           ===================== */

        if(
            result.status ===
            "available"
        ){

            statusField.textContent =
                "Family Name available";

            statusField.className =
                "family-id-status available";

            createBtn.disabled =
                false;

            return;
        }


        /* =====================
           NOT AVAILABLE
           ===================== */

        statusField.textContent =
            result.message ||
            "Family Name not available";

        statusField.className =
            "family-id-status not-available";

        createBtn.disabled =
            true;

    })
    .catch(function(error){
    console.error(
        "Family availability check error:",
        error
    );


    /* ================================
       CANCEL OLD CHECK
       ================================ */

    if(familyAvailabilityTimer){

        clearTimeout(
            familyAvailabilityTimer
        );

        familyAvailabilityTimer =
            null;
    }


    /* ================================
       INVALIDATE OLD REQUEST
       ================================ */

    familyInputVersion++;


    /* ================================
       CLEAR FAMILY NAME BOX
       ================================ */

    const familyNameInput =
        document.getElementById(
            "newFamilyName"
        );

    if(familyNameInput){

        familyNameInput.value = "";

    }


    /* ================================
       RESET FAMILY ID
       ================================ */

    familyIdField.textContent =
        "auto generation";

    familyIdField.classList.remove(
        "generated"
    );


    /* ================================
       CLEAR STATUS MESSAGE
       ================================ */

    statusField.textContent =
        "";

    statusField.className =
        "family-id-status";


    /* ================================
       DISABLE CREATE BUTTON
       ================================ */

    createBtn.disabled = true;


    /* ================================
       FOCUS BACK TO FAMILY NAME
       ================================ */

    if(familyNameInput){

        familyNameInput.focus();

    }

}
                       );
                    },
                    800
                );

        }
    );

           /* =================================
   BLOCK SPACE KEY
   FAMILY NAME
   ================================= */

document
    .getElementById("newFamilyName")
    .addEventListener(
        "keydown",
        function(event){

            if(event.key === " "){

                event.preventDefault();

            }

        }
    );
           /* =====================================
           CREATE FAMILY TREE
           ===================================== */

        /* =====================================
   CREATE FAMILY TREE
   ===================================== */

document
    .getElementById("createFamilyTreeBtn")
    .onclick = async () => {


    /* ================================
       GET FAMILY NAME
       ================================ */

    const familyName =
        document
            .getElementById(
                "newFamilyName"
            )
            .value
            .trim();


    /* ================================
       MINIMUM 4 LETTERS
       ================================ */

    if(familyName.length < 4){

        validationMessage(
            "Family Name must contain at least 4 letters.",
            document.getElementById(
                "newFamilyName"
            )
        );

        return;
    }


    /* ================================
       GET GENERATED FAMILY ID
       ================================ */

    const savedFamilyId =
        document
            .getElementById(
                "newFamilyId"
            )
            .textContent
            .trim();


    /* ================================
       FAMILY ID CHECK
       ================================ */

    if(
        !savedFamilyId ||
        savedFamilyId === "auto generation" ||
        savedFamilyId === "-"
    ){

        showMessage(
            "Family ID is not available.",
            "warning",
            3000
        );

        return;
    }


    /* ================================
       USER INFORMATION
       ================================ */

    const user =
        JSON.parse(
            sessionStorage.getItem("user")
        );


    if(!user){

        showMessage(
            "User information not available.",
            "warning",
            3000
        );

        return;
    }


        
    /* ================================
       DISABLE CREATE BUTTON
       ================================ */

    const createBtn =
        document.getElementById(
            "createFamilyTreeBtn"
        );


    createBtn.disabled = true;


    /* ================================
       CHECKING / SAVING MESSAGE
       ================================ */

    const statusField =
        document.getElementById(
            "familyIdStatus"
        );


   if(statusField){

    statusField.innerHTML =
        '<span class="checking-spinner saving-spinner"></span> Saving Family Tree...';

    statusField.className =
        "family-id-status saving";

}


    /* ================================
       GOOGLE SHEET DATA
       ================================ */

    const params =
        new URLSearchParams();


    params.append(
        "action",
        "saveFamilyTree"
    );


    params.append(
        "familyId",
        savedFamilyId
    );


    params.append(
        "familyName",
        familyName
    );


    params.append(
        "loginUserName",
        user.loginUserName || ""
    );


    params.append(
        "email",
        user.email || ""
    );


    params.append(
        "mobile",
        user.mobile || ""
    );


    /* ================================
       SAVE TO GOOGLE SHEET
       ================================ */

    try{

        const response =
            await fetch(
                API_URL,
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                            "application/x-www-form-urlencoded"
                    },

                    body:
                        params.toString()
                }
            );


        const result =
            await response.json();


        /* ================================
           BACKEND ERROR
           ================================ */

        if(
            result.status !==
            "success"
        ){

            createBtn.disabled = false;


            if(statusField){

                statusField.textContent =
                    result.message ||
                    "Family Tree could not be saved.";

                statusField.className =
                    "family-id-status not-available";

            }

            return;
        }

        /* ================================
   GET LOCAL FAMILY LIST
   ONLY AFTER BACKEND SUCCESS
   ================================ */

const existingFamilies =
    JSON.parse(
        localStorage.getItem(
            "familyTrees"
        ) || "[]"
    );
        /* ================================
           FAMILY OBJECT
           ================================ */

        const familyData = {

            familyId:
                savedFamilyId,

            familyName:
                familyName,

            loginId:
                user.loginUserName || "",

            userId:
                user.userId || "",

            userMail:
                user.email || "",

            mobile:
                user.mobile || "",

            createdAt:
                new Date().toISOString()

        };


        /* ================================
           SAVE CURRENT FAMILY
           ================================ */

        localStorage.setItem(
            "currentFamily",
            JSON.stringify(
                familyData
            )
        );


        /* ================================
           SAVE FAMILY LIST
           ================================ */

        existingFamilies.push(
            familyData
        );


        localStorage.setItem(
            "familyTrees",
            JSON.stringify(
                existingFamilies
            )
        );


        /* ================================
           SUCCESS
           ================================ */

        if(statusField){

            statusField.textContent =
                "Family Tree saved successfully.";

            statusField.className =
                "family-id-status available";

        }


        showMessage(
            "Family Tree Created Successfully.",
            "success",
            3000
        );


        /* ================================
           RETURN TO FAMILY PAGE
           ================================ */

        familyBtn.click();


    }catch(error){

        console.error(
            "Family Tree Save Error:",
            error
        );


        createBtn.disabled = false;


        if(statusField){

            statusField.textContent =
                "Unable to save Family Tree. Please try again.";

            statusField.className =
                "family-id-status not-available";

        }


        showMessage(
            "Unable to save Family Tree.",
            "error",
            3000
        );

    }

};

        /* =====================================
           CREATE FAMILY TREE → BACK
           ===================================== */

        document
            .getElementById(
                "createFamilyBackBtn"
            )
            .onclick = () => {

                familyBtn.click();

            };

    };


    /* =====================================
       FAMILY → BACK
       ===================================== */

    document
        .getElementById("familyBack")
        .onclick = showHome;

};
