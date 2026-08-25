

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
bindAddMemberButton();

   /* =====================================
   FAMILY → RELATIONS
   ===================================== */

const relationsBtn =
    document.getElementById(
        "relationsBtn"
    );


if(relationsBtn){

    relationsBtn.onclick =
        function(){

            console.log(
                "RELATIONS BUTTON CLICKED"
            );

            openRelationsPage();

        };

}
/* =====================================
   FAMILY → BACK
   ===================================== */

const familyBackBtn =
    document.getElementById(
        "familyBack"
    );


if(familyBackBtn){

    familyBackBtn.onclick =
        function(){

            console.log(
                "FAMILY → BACK"
            );

        showHome();

        };

}
   function openRelationsPage(){

    console.log(
        "OPENING RELATIONS PAGE"
    );

    showPage(

        pageTitle(
            "Relations",
            "images/colorbtns/Relations1.png"
        )

        + `
<!-- =================================
     SELECT MEMBER
     ================================= -->

<div class="common-form-group">

    <label class="common-form-label">
        Member
    </label>

    <span class="common-form-colon">
        :
    </span>


<div class="relations-member-row">

    <select
        id="relationsMemberSelect"
        class="common-form-select">

        <option value="">
            Select Member
        </option>

    </select>


    <input
        type="text"
        id="relationsMemberSearch"
        class="common-form-input"
        placeholder="Search Member..."
        autocomplete="off">

</div>

</div>
        <div class="relations-page">

            <div class="relations-member-header">

                <div id="relationMemberPhoto">
                </div>

                <div id="relationMemberName">
                    -
                </div>

            </div>

<div
    id="relationParentsSection"
    class="relations-section relations-parents">
                <h3>1. Parents</h3>

                <div class="relation-row">
    <span class="relation-label">
        Father
    </span>

    <span class="relation-colon">
        :
    </span>

    <span id="relationFather">
        --------
    </span>
</div>


<div class="relation-row">
    <span class="relation-label">
        Mother
    </span>

    <span class="relation-colon">
        :
    </span>

    <span id="relationMother">
        --------
    </span>
</div>
            </div>
<div
    id="relationPartnerSection"
    class="relations-section relations-partner">

    <h3>2. Partner</h3>

               <div class="relation-row">
    <span class="relation-label">
        Partner
    </span>

    <span class="relation-colon">
        :
    </span>

    <span id="relationPartner">
        --------
    </span>
</div>

            </div>

            <div class="relations-section">

                <h3>3. Children</h3>

                <div id="relationChildren">
                    --------
                </div>

            </div>

            <div class="relations-section">

                <h3>4. Siblings</h3>

                <strong>Brothers</strong>

                <div id="relationBrothers">
                    --------
                </div>

                <strong>Sisters</strong>

                <div id="relationSisters">
                    --------
                </div>

            </div>
            <div class="relations-section">

    <h3>5. In-Laws</h3>

    <div>
        Father-in-Law :
        <span id="relationFatherInLaw">
            --------
        </span>
    </div>

    <div>
        Mother-in-Law :
        <span id="relationMotherInLaw">
            --------
        </span>
    </div>

    <strong>Brothers-in-Law</strong>

    <div id="relationBrothersInLaw">
        --------
    </div>

    <strong>Sisters-in-Law</strong>

    <div id="relationSistersInLaw">
        --------
    </div>

</div>
<div class="relations-section">

    <h3>6. Grand Parents</h3>

    <strong>Paternal Grand Parents</strong>

    <div>
        Grand Father :
        <span id="relationPaternalGrandFather">
            --------
        </span>
    </div>

    <div>
        Grand Mother :
        <span id="relationPaternalGrandMother">
            --------
        </span>
    </div>


    <strong>Maternal Grand Parents</strong>

    <div>
        Grand Father :
        <span id="relationMaternalGrandFather">
            --------
        </span>
    </div>

    <div>
        Grand Mother :
        <span id="relationMaternalGrandMother">
            --------
        </span>
    </div>

</div>


            <div align="center">

                <button
                    id="relationsBackBtn"
                    class="back-btn">

                    ← Back

                </button>

            </div>

        </div>

        `
    );

 const relationsMemberSelect =
        document.getElementById(
            "relationsMemberSelect"
        );
const relationsMemberSearch =
    document.getElementById(
        "relationsMemberSearch"
    );

      
/* =====================================
   LOAD MEMBERS INTO RELATIONS DROPDOWN
   ===================================== */

if(relationsMemberSelect){

    let familyMembers =
        JSON.parse(
            localStorage.getItem(
                "familyMembers"
            ) || "[]"
        );


    console.log(
        "RELATIONS FAMILY MEMBERS:",
        familyMembers
    );


    familyMembers.forEach(
        function(member){

            if(
                !member ||
                !member.memberId
            ){
                return;
            }
            const option =
                document.createElement(
                    "option"
                );
            option.value =
                member.memberId;
            option.textContent =
               member.name || "Unnamed";
            relationsMemberSelect.appendChild(
                option
            );
        }
    );

   /* =====================================
   SEARCH MEMBERS
   ===================================== */

if(relationsMemberSearch){

    relationsMemberSearch.oninput =
        function(){

            const searchText =
                this.value
                    .trim()
                    .toLowerCase();


            relationsMemberSelect.innerHTML = "";


            const defaultOption =
                document.createElement(
                    "option"
                );

            defaultOption.value = "";

            defaultOption.textContent =
                searchText
                    ? "Matching Members"
                    : "Select Member";

            relationsMemberSelect.appendChild(
                defaultOption
            );


            familyMembers.forEach(
                function(member){

                    if(
                        !member ||
                        !member.memberId
                    ){
                        return;
                    }


                    const memberName =
                        String(
                            member.name || ""
                        );


                    /* =========================
                       EMPTY → ALL MEMBERS
                       TEXT → ANYWHERE IN NAME
                       ========================= */

                    if(
                        searchText === "" ||
                        memberName
                            .toLowerCase()
                            .includes(searchText)
                    ){

                        const option =
                            document.createElement(
                                "option"
                            );

                        option.value =
                            member.memberId;

                        option.textContent =
                            memberName ||
                            "Unnamed";

                        relationsMemberSelect
                            .appendChild(
                                option
                            );

                    }

                }
            );

        };

}
relationsMemberSelect.onchange =
    function(){
        const selectedMemberId =
            this.value;
        if(!selectedMemberId){
            return;
        }
const memberGroup =
    document.getElementById(
        "relationsMemberGroup"
    );

if(memberGroup){

    memberGroup.style.display =
        "none";

}
       /* =====================================
   HIDE MEMBER SELECTOR AFTER SELECTION
   ===================================== */

const memberSelector =
    document.querySelector(
        ".relations-member-row"
    );

if(memberSelector){

    memberSelector.style.display =
        "none";

}
        const selectedMember =
            familyMembers.find(
                function(member){

                    return String(
                        member.memberId
                    ) === String(
                        selectedMemberId
                    );
                }
            );


        if(!selectedMember){

            console.log(
                "SELECTED MEMBER NOT FOUND"
            );

            return;

        }


        console.log(
            "SELECTED RELATIONS MEMBER:",
            selectedMember
        );


        loadSelectedMemberRelations(
            selectedMember,
            familyMembers
        );

    };
}
    const relationsBackBtn =
        document.getElementById(
            "relationsBackBtn"
        );

    if(relationsBackBtn){

        relationsBackBtn.onclick =
            function(){

                familyBtn.click();

            };

    }

}
   function loadSelectedMemberRelations(
    member,
    familyMembers
){
const memberHeader =
    document.querySelector(
        ".relations-member-header"
    );

if(memberHeader){

    memberHeader.style.display =
        "flex";

}
    console.log(
        "LOADING RELATIONS FOR:",
        member.name
    );


    /* ================================
       MEMBER NAME
       ================================ */

    const nameField =
        document.getElementById(
            "relationMemberName"
        );


    if(nameField){

        nameField.textContent =
            member.name || "-";

    }


    /* ================================
       MEMBER PHOTO
       ================================ */

    const photoField =
        document.getElementById(
            "relationMemberPhoto"
        );


    if(photoField){

        photoField.innerHTML = "";


        if(member.photo){

            const img =
                document.createElement(
                    "img"
                );

            img.src =
                member.photo;

            img.alt =
                member.name || "Member";

            photoField.appendChild(
                img
            );

        }

    }


    /* ================================
       FIND FATHER
       ================================ */

    const father =
        familyMembers.find(
            function(item){

                return String(
                    item.memberId
                ) === String(
                    member.fatherId
                );

            }
        );


    /* ================================
       FIND MOTHER
       ================================ */

    const mother =
        familyMembers.find(
            function(item){

                return String(
                    item.memberId
                ) === String(
                    member.motherId
                );

            }
        );


    /* ================================
       SHOW FATHER
       ================================ */

    const fatherField =
        document.getElementById(
            "relationFather"
        );


    if(fatherField){

        fatherField.textContent =
            father
                ? father.name
                : "--------";

    }


    /* ================================
       SHOW MOTHER
       ================================ */

    const motherField =
        document.getElementById(
            "relationMother"
        );


    if(motherField){

        motherField.textContent =
            mother
                ? mother.name
                : "--------";

    

}

   /* ================================
   FIND PARTNER
   ================================ */

const partner =
    familyMembers.find(
        function(item){

            return String(
                item.memberId
            ) === String(
                member.partnerId
            );

        }
    );


/* ================================
   SHOW PARTNER
   ================================ */

const partnerField =
    document.getElementById(
        "relationPartner"
    );


if(partnerField){

    partnerField.textContent =
        partner
            ? partner.name
            : "--------";

}
      /* ================================
   IN-LAWS
   ================================ */

let fatherInLaw = null;
let motherInLaw = null;
let brothersInLaw = [];
let sistersInLaw = [];


if(partner){

    /* ================================
       PARTNER'S FATHER
       ================================ */

    if(partner.fatherId){

        fatherInLaw =
            familyMembers.find(
                function(item){

                    return String(
                        item.memberId
                    ) === String(
                        partner.fatherId
                    );

                }
            );

    }


    /* ================================
       PARTNER'S MOTHER
       ================================ */

    if(partner.motherId){

        motherInLaw =
            familyMembers.find(
                function(item){

                    return String(
                        item.memberId
                    ) === String(
                        partner.motherId
                    );

                }
            );

    }


    /* ================================
       PARTNER'S SIBLINGS
       ================================ */

    const partnerSiblings =
        familyMembers.filter(
            function(item){

                if(
                    String(item.memberId) ===
                    String(partner.memberId)
                ){
                    return false;
                }


                const sameFather =
                    partner.fatherId &&
                    item.fatherId &&
                    String(
                        item.fatherId
                    ) === String(
                        partner.fatherId
                    );


                const sameMother =
                    partner.motherId &&
                    item.motherId &&
                    String(
                        item.motherId
                    ) === String(
                        partner.motherId
                    );


                return (
                    sameFather ||
                    sameMother
                );

            }
        );


    brothersInLaw =
        partnerSiblings.filter(
            function(item){

                return String(
                    item.gender || ""
                )
                .toLowerCase()
                === "male";

            }
        );


    sistersInLaw =
        partnerSiblings.filter(
            function(item){

                return String(
                    item.gender || ""
                )
                .toLowerCase()
                === "female";

            }
        );

}

/* ================================
   DISPLAY FATHER-IN-LAW
   ================================ */

const fatherInLawField =
    document.getElementById(
        "relationFatherInLaw"
    );

if(fatherInLawField){

    fatherInLawField.textContent =
        fatherInLaw
            ? fatherInLaw.name
            : "--------";

}


/* ================================
   DISPLAY MOTHER-IN-LAW
   ================================ */

const motherInLawField =
    document.getElementById(
        "relationMotherInLaw"
    );

if(motherInLawField){

    motherInLawField.textContent =
        motherInLaw
            ? motherInLaw.name
            : "--------";

}


/* ================================
   DISPLAY BROTHERS-IN-LAW
   ================================ */

const brothersInLawField =
    document.getElementById(
        "relationBrothersInLaw"
    );

if(brothersInLawField){

    brothersInLawField.innerHTML = "";

    if(
        brothersInLaw.length === 0
    ){

        brothersInLawField.textContent =
            "--------";

    }
    else{

        brothersInLaw.forEach(
            function(brother, index){

                const div =
                    document.createElement(
                        "div"
                    );

                div.textContent =
                    (index + 1) +
                    ". " +
                    (
                        brother.name ||
                        "--------"
                    );

                brothersInLawField.appendChild(
                    div
                );

            }
        );

    }

}


/* ================================
   DISPLAY SISTERS-IN-LAW
   ================================ */

const sistersInLawField =
    document.getElementById(
        "relationSistersInLaw"
    );

if(sistersInLawField){

    sistersInLawField.innerHTML = "";

    if(
        sistersInLaw.length === 0
    ){

        sistersInLawField.textContent =
            "--------";

    }
    else{

        sistersInLaw.forEach(
            function(sister, index){

                const div =
                    document.createElement(
                        "div"
                    );

                div.textContent =
                    (index + 1) +
                    ". " +
                    (
                        sister.name ||
                        "--------"
                    );

                sistersInLawField.appendChild(
                    div
                );

            }
        );

    }

}
/* ================================
   GRAND PARENTS
   ================================ */

let paternalGrandFather = null;
let paternalGrandMother = null;

let maternalGrandFather = null;
let maternalGrandMother = null;


/* ================================
   FATHER'S PARENTS
   ================================ */

if(father){

    if(father.fatherId){

        paternalGrandFather =
            familyMembers.find(
                function(item){

                    return String(
                        item.memberId
                    ) === String(
                        father.fatherId
                    );

                }
            );

    }


    if(father.motherId){

        paternalGrandMother =
            familyMembers.find(
                function(item){

                    return String(
                        item.memberId
                    ) === String(
                        father.motherId
                    );

                }
            );

    }

}


/* ================================
   MOTHER'S PARENTS
   ================================ */

if(mother){

    if(mother.fatherId){

        maternalGrandFather =
            familyMembers.find(
                function(item){

                    return String(
                        item.memberId
                    ) === String(
                        mother.fatherId
                    );

                }
            );

    }


    if(mother.motherId){

        maternalGrandMother =
            familyMembers.find(
                function(item){

                    return String(
                        item.memberId
                    ) === String(
                        mother.motherId
                    );

                }
            );

    }

}
   /* ================================
   DISPLAY GRAND FATHER - FATHER SIDE
   ================================ */

const paternalGrandFatherField =
    document.getElementById(
        "relationPaternalGrandFather"
    );

if(paternalGrandFatherField){

    paternalGrandFatherField.textContent =
        paternalGrandFather
            ? paternalGrandFather.name
            : "--------";

}


/* ================================
   DISPLAY GRAND MOTHER - FATHER SIDE
   ================================ */

const paternalGrandMotherField =
    document.getElementById(
        "relationPaternalGrandMother"
    );

if(paternalGrandMotherField){

    paternalGrandMotherField.textContent =
        paternalGrandMother
            ? paternalGrandMother.name
            : "--------";

}


/* ================================
   DISPLAY GRAND FATHER - MOTHER SIDE
   ================================ */

const maternalGrandFatherField =
    document.getElementById(
        "relationMaternalGrandFather"
    );

if(maternalGrandFatherField){

    maternalGrandFatherField.textContent =
        maternalGrandFather
            ? maternalGrandFather.name
            : "--------";

}


/* ================================
   DISPLAY GRAND MOTHER - MOTHER SIDE
   ================================ */

const maternalGrandMotherField =
    document.getElementById(
        "relationMaternalGrandMother"
    );

if(maternalGrandMotherField){

    maternalGrandMotherField.textContent =
        maternalGrandMother
            ? maternalGrandMother.name
            : "--------";

}   
   /* ================================
   SIBLINGS
   ================================ */

const siblings =
    familyMembers.filter(
        function(item){
            /* Don't include selected member */
            if(
                String(item.memberId) ===
                String(member.memberId)
            ){
                return false;
            }
           /* Same Father */
            const sameFather =
                member.fatherId &&
                item.fatherId &&
                String(item.fatherId) ===
                String(member.fatherId);
            /* Same Mother */
            const sameMother =
                member.motherId &&
                item.motherId &&
                String(item.motherId) ===
                String(member.motherId);


            return (
                sameFather ||
                sameMother
            );

        }
    );


/* ================================
   BROTHERS
   ================================ */

const brothers =
    siblings.filter(
        function(item){

            return String(
                item.gender || ""
            ).toLowerCase() ===
            "male";

        }
    );


const brothersField =
    document.getElementById(
        "relationBrothers"
    );


if(brothersField){

    brothersField.innerHTML = "";


    if(brothers.length === 0){

        brothersField.textContent =
            "--------";

    }
    else{

        brothers.forEach(
            function(brother, index){

                const div =
                    document.createElement(
                        "div"
                    );

                div.textContent =
                    (index + 1) +
                    ". " +
                    (
                        brother.name ||
                        "--------"
                    );

                brothersField.appendChild(
                    div
                );

            }
        );

    }

}
/* ================================
   CHILDREN
   ================================ */

const children =
    familyMembers.filter(
        function(item){

            const isFather =
                String(
                    item.fatherId || ""
                ) === String(
                    member.memberId
                );

            const isMother =
                String(
                    item.motherId || ""
                ) === String(
                    member.memberId
                );

            return (
                isFather ||
                isMother
            );

        }
    );


const childrenField =
    document.getElementById(
        "relationChildren"
    );


if(childrenField){

    childrenField.innerHTML = "";


    if(children.length === 0){

        childrenField.textContent =
            "--------";

    }
    else{

        children.forEach(
            function(child,index){

                const div =
                    document.createElement(
                        "div"
                    );

                div.textContent =
                    (index + 1) +
                    ". " +
                    (
                        child.name ||
                        "--------"
                    );

                childrenField.appendChild(
                    div
                );

            }
        );

    }

}

/* ================================
   SISTERS
   ================================ */

const sisters =
    siblings.filter(
        function(item){

            return String(
                item.gender || ""
            ).toLowerCase() ===
            "female";

        }
    );


const sistersField =
    document.getElementById(
        "relationSisters"
    );
if(sistersField){
    sistersField.innerHTML = "";
    if(sisters.length === 0){
        sistersField.textContent =
            "--------";
    }
    else{
        sisters.forEach(
            function(sister, index){
                const div =
                    document.createElement(
                        "div"
                    );
                div.textContent =
                    (index + 1) +
                    ". " +
                    (
                        sister.name ||
                        "--------"
                    );

                sistersField.appendChild(
                    div
                );

            }
        );

    }

}
   }
/* =====================================
   FAMILY → ADD MEMBER
   ===================================== */

function bindAddMemberButton(){

    const addMemberBtn =
        document.getElementById("addMemberBtn");

    if(!addMemberBtn) return;

    addMemberBtn.onclick = () => {

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
   LOAD RELATIONS
   ================================= */

loadMemberRelations();
       /* =================================
   REFRESH RELATIONS WHEN GENDER CHANGES
   ================================= */

const memberGender =
    document.getElementById(
        "memberGender"
    );


if(memberGender){

    memberGender.addEventListener(
        "change",
        function(){

            loadMemberRelations();

        }
    );

}
       
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

if(marriageConfirmation){

    marriageConfirmation.style.display =
        "none";

}

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

if(marriageConfirmation){

    marriageConfirmation.style.display =
        "none";

}

            /* =============================
               HIDE PARTNER
               ============================= */

            hidePartner();

        }
    );

}  
       
/* =================================
   LOAD MEMBER RELATIONS
   ================================= */

async function loadMemberRelations(){
   
    const currentFamily =
        JSON.parse(
            localStorage.getItem(
                "currentFamily"
            )
        );


    if(!currentFamily){
        return;
    }


   /* =================================
   GET MEMBERS FROM GOOGLE SHEET
   ================================= */

let members = [];

try{

    const params =
        new URLSearchParams();

    params.append(
        "action",
        "getFamilyMembers"
    );

    params.append(
        "familyId",
        currentFamily.familyId || ""
    );

    const response =
        await fetch(
            API_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },

                body:
                    params.toString()
            }
        );


    const result =
        await response.json();


    console.log(
        "GET FAMILY MEMBERS RESULT:",
        result
    );


    if(
        result.status !== "success"
    ){

        console.error(
            "Members could not be loaded:",
            result.message
        );

        return;

    }


    members =
        Array.isArray(result.members)
            ? result.members
            : [];


    /* =============================
       UPDATE LOCAL STORAGE
       ============================= */

    localStorage.setItem(
        "familyMembers",
        JSON.stringify(
            members
        )
    );


}catch(error){

    console.error(
        "Load Members Error:",
        error
    );

    return;

}


/* =================================
   CURRENT FAMILY MEMBERS
   ================================= */

const familyMembers =
    members.filter(
        function(member){

            return (
                String(
                    member.familyId || ""
                ).trim() ===
                String(
                    currentFamily.familyId || ""
                ).trim()
            );

        }
    );
    /* =================================
       GET CURRENT GENDER
       ================================= */

    const genderField =
        document.getElementById(
            "memberGender"
        );


    const currentGender =
        genderField
            ? String(
                genderField.value || ""
              ).toLowerCase().trim()
            : "";


    console.log(
        "CURRENT GENDER:",
        currentGender
    );

/* =================================
   GET CURRENT MEMBER AGE
   ================================= */

function calculateAge(dob){

    if(!dob){
        return null;
    }

    const birthDate =
        new Date(dob);

    if(
        isNaN(
            birthDate.getTime()
        )
    ){
        return null;
    }

    const today =
        new Date();

    let age =
        today.getFullYear() -
        birthDate.getFullYear();

    const monthDifference =
        today.getMonth() -
        birthDate.getMonth();

    if(
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() <
            birthDate.getDate()
        )
    ){

        age--;

    }

    return age;
}


/* =================================
   CURRENT MEMBER DOB
   ================================= */

const currentDobField =
    document.getElementById(
        "memberDob"
    );


const currentDob =
    currentDobField ?
    currentDobField.value :
    "";


/* =================================
   CURRENT MEMBER AGE
   ================================= */

const currentAge =
    calculateAge(
        currentDob
    );


console.log(
    "CURRENT MEMBER AGE:",
    currentAge
);
    /* =================================
       GET CURRENT MEMBER ID
       ================================= */

    const memberIdField =
        document.getElementById(
            "memberId"
        );


    const currentMemberId =
        memberIdField
            ? String(
                memberIdField.dataset.memberId ||
                ""
              ).trim()
            : "";


    /* =================================
       GET DROPDOWNS
       ================================= */

    const partnerField =
        document.getElementById(
            "memberPartner"
        );


    const fatherField =
        document.getElementById(
            "memberFather"
        );


    const motherField =
        document.getElementById(
            "memberMother"
        );


   
    /* =================================
       CLEAR OLD OPTIONS
       ================================= */

    function resetSelect(
        select,
        defaultText
    ){

        if(!select){
            return;
        }


        select.innerHTML = "";


        const defaultOption =
            document.createElement(
                "option"
            );


        defaultOption.value = "";


        defaultOption.textContent =
            defaultText;


        select.appendChild(
            defaultOption
        );

    }


    resetSelect(
        partnerField,
        "Select Partner"
    );


    resetSelect(
        fatherField,
        "Select Father"
    );


    resetSelect(
        motherField,
        "Select Mother"
    );


    /* =================================
       ADD NEW PERSON
       ================================= */

    function addNewPersonOption(
        select
    ){

        if(!select){
            return;
        }


        const option =
            document.createElement(
                "option"
            );


        option.value =
            "__ADD_NEW__";


        option.textContent =
            "Add New Person";


        select.insertBefore(
            option,
            select.firstChild
        );

    }


    addNewPersonOption(
        partnerField
    );


    addNewPersonOption(
        fatherField
    );


    addNewPersonOption(
        motherField
    );


    /* =================================
       ADD MEMBER OPTION
       ================================= */

    function addMemberOption(
        select,
        member
    ){

        if(!select){
            return;
        }


        const fullMemberId =
            String(
                member.memberId || ""
            ).trim();


        if(!fullMemberId){
            return;
        }


        const option =
            document.createElement(
                "option"
            );


        /* =============================
           OPTION VALUE
           ============================= */

        option.value =
            fullMemberId;


        /* =============================
           MEMBER NUMBER
           ============================= */

        const memberNumber =
            fullMemberId
                .split("-")
                .pop();


        /* =============================
           MEMBER NAME
           ============================= */

        let displayName = "";


        if(
            typeof member.name ===
            "string"
        ){

            displayName =
                member.name.trim();

        }
        else if(
            member.name &&
            typeof member.name ===
            "object"
        ){

            displayName =
                String(
                    member.name.name ||
                    member.name.value ||
                    ""
                ).trim();

        }


        /* =============================
           DISPLAY
           ============================= */

        option.textContent =
            displayName +
            " (" +
            memberNumber +
            ")";


        select.appendChild(
            option
        );

    }


    /* =================================
       FILTER MEMBERS
       ================================= */

    familyMembers.forEach(
        function(member){

            const memberId =
                String(
                    member.memberId || ""
                ).trim();


            const memberGender =
                String(
                    member.gender || ""
                ).toLowerCase().trim();


            const memberMarital =
                String(
                    member.maritalStatus || ""
                ).toLowerCase().trim();
/* =============================
   MEMBER AGE
   ============================= */

const memberAge =
    calculateAge(
        member.dob
    );


console.log(
    "MEMBER AGE:",
    member.name,
    memberAge
);

            const isMarried =
                memberMarital === "yes";


            /* =============================
               EXISTING PARTNER
               ============================= */

            const hasPartner =
                String(
                    member.partnerId || ""
                ).trim() !== "";


            console.log(
                "MEMBER:",
                member.name,
                "GENDER:",
                memberGender,
                "MARITAL:",
                memberMarital,
                "HAS PARTNER:",
                hasPartner
            );


            /* =============================
               DO NOT SHOW CURRENT MEMBER
               ============================= */

            if(
                memberId ===
                currentMemberId
            ){

                return;

            }


           /* =============================
   FATHER
   MALE + MARRIED
   + 15 YEARS OLDER
   ============================= */

if(
    memberGender === "male" &&
    isMarried &&
    currentAge !== null &&
    memberAge !== null &&
    memberAge >= currentAge + 15
){

    addMemberOption(
        fatherField,
        member
    );

}



           /* =============================
   MOTHER
   FEMALE + MARRIED
   + 15 YEARS OLDER
   ============================= */

if(
    memberGender === "female" &&
    isMarried &&
    currentAge !== null &&
    memberAge !== null &&
    memberAge >= currentAge + 15
){

    addMemberOption(
        motherField,
        member
    );

}


            /* =============================
               PARTNER
               ============================= */

            if(
                isMarried &&
                currentGender &&
                memberGender !== currentGender &&
                !hasPartner
            ){

                addMemberOption(
                    partnerField,
                    member
                );

            }

        }
    );


       /* =================================
   REFRESH RELATIONS WHEN GENDER CHANGES
   ================================= */

if(genderField){

    genderField.onchange = function(){

        loadMemberRelations();

    };

}
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
   BACK ACTION
   ============================= */

memberBackBtn.onclick =
    function(){

        console.log(
            "ADD MEMBER → BACK"
        );

        familyBtn.click();

    };

   
/* =================================
   SAVE MEMBER → GOOGLE SHEET
   ================================= */

saveMemberBtn.onclick = async function(){

    /* ================================
       CURRENT FAMILY
       ================================ */

 let currentFamily =
    JSON.parse(
        localStorage.getItem(
            "currentFamily"
        ) || "null"
    );
/* =================================
   LOAD CURRENT USER FAMILY
   IF NOT ALREADY AVAILABLE
   ================================= */

if(!currentFamily){

    const loggedUser =
        JSON.parse(
            sessionStorage.getItem(
                "user"
            )
        ) || null;


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

                console.log(
                    "ADD MEMBER FAMILY RESULT:",
                    result
                );


                if(
                    result.status !==
                    "success"
                ){

                    console.log(
                        "No Family Tree found for current user."
                    );

                    return;

                }


                /* =============================
                   CREATE CURRENT FAMILY
                   ============================= */

                currentFamily = {

                    familyId:
                        result.familyId || "",

                    familyName:
                        result.familyName || "",

                    loginId:
                        result.loginUserName ||
                        loggedUser.loginUserName ||
                        "",

                    userId:
                        loggedUser.userId || "",

                    userMail:
                        result.email ||
                        loggedUser.email ||
                        "",

                    mobile:
                        result.mobile ||
                        loggedUser.mobile ||
                        "",

                    createdAt:
                        new Date().toISOString()

                };


                /* =============================
                   SAVE CURRENT FAMILY
                   ============================= */

                localStorage.setItem(
                    "currentFamily",
                    JSON.stringify(
                        currentFamily
                    )
                );


                /* =============================
                   DISPLAY FAMILY ID
                   ============================= */

                const familyIdField =
                    document.getElementById(
                        "memberFamilyId"
                    );


                if(familyIdField){

                    familyIdField.textContent =
                        currentFamily.familyId || "-";

                }


                /* =============================
                   DISPLAY FAMILY NAME
                   ============================= */

                const familyNameField =
                    document.getElementById(
                        "memberFamilyName"
                    );


                if(familyNameField){

                    familyNameField.textContent =
                        currentFamily.familyName || "-";

                }


                /* =============================
                   LOAD RELATIONS
                   ============================= */

                loadMemberRelations();


                console.log(
                    "CURRENT FAMILY LOADED:",
                    currentFamily
                );

            }
        )
        .catch(
            function(error){

                console.error(
                    "Add Member Family Load Error:",
                    error
                );

            }
        );

    }

}

    if(!currentFamily){

        showMessage(
            "Family information not available.",
            "warning",
            3000
        );

        return;
    }


    /* ================================
       GET USER
       ================================ */

    const user =
        JSON.parse(
            sessionStorage.getItem(
                "user"
            ) || "null"
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
       GET FORM VALUES
       ================================ */

    const nameField =
        document.getElementById(
            "memberName"
        );

    const genderField =
        document.getElementById(
            "memberGender"
        );

    const dobField =
        document.getElementById(
            "memberDob"
        );


  const name =
    nameField
        ? String(nameField.value || "").trim()
        : "";


const gender =
    genderField
        ? String(genderField.value || "").trim()
        : "";


    const dob =
        dobField ?
        dobField.value :
        "";


    /* ================================
       VALIDATION
       ================================ */

    if(!name){

        showMessage(
            "Please enter Member Name.",
            "warning",
            3000
        );

        return;
    }


    if(!gender){

        showMessage(
            "Please select Gender.",
            "warning",
            3000
        );

        return;
    }


    if(!dob){

        showMessage(
            "Please select Date of Birth.",
            "warning",
            3000
        );

        return;
    }
/* ================================
   FUTURE DOB VALIDATION
   ================================ */

const selectedDob =
    new Date(dob);

const todayDate =
    new Date();

todayDate.setHours(
    0, 0, 0, 0
);

selectedDob.setHours(
    0, 0, 0, 0
);


if(selectedDob > todayDate){

    showMessage(
        "Future date not allowed.",
        "warning",
        3000
    );

    return;

}

    /* ================================
       MARITAL STATUS
       ================================ */

    const maritalField =
        document.querySelector(
            'input[name="memberMaritalStatus"]:checked'
        );

console.log(
    "MARITAL FIELD:",
    maritalField
);

console.log(
    "MARITAL VALUE:",
    maritalField ? maritalField.value : "NONE"
);
   const maritalStatus =
    maritalField
        ? String(maritalField.value || "").trim()
        : "";
/* ================================
   UNDER 18 MARRIAGE CONFIRMATION
   ================================ */

const birthDate =
    new Date(dob);

const today =
    new Date();

let age =
    today.getFullYear() -
    birthDate.getFullYear();

const monthDifference =
    today.getMonth() -
    birthDate.getMonth();

if(
    monthDifference < 0 ||
    (
        monthDifference === 0 &&
        today.getDate() <
        birthDate.getDate()
    )
){

    age--;

}


/* =================================
   MARITAL STATUS REQUIRED
   ================================= */

if(!maritalField){

    showMessage(
        "Please select Marital Status.",
        "warning",
        3000
    );

    return;

}


/* =================================
   UNDER 18 + MARRIED
   CONFIRMATION REQUIRED
   ================================= */

if(
    age < 18 &&
    maritalStatus.toLowerCase() === "yes"
){

    const confirmationSelected =
        (
            confirmMarriageYes &&
            confirmMarriageYes.checked
        ) ||
        (
            confirmMarriageNo &&
            confirmMarriageNo.checked
        );


    if(!confirmationSelected){

        showMessage(
            'Please Confirm marital status?',
            "warning",
            3000
        );

        return;

    }

}
   /* ================================
       RELATIONS
       ================================ */

    const fatherField =
        document.getElementById(
            "memberFather"
        );

    const motherField =
        document.getElementById(
            "memberMother"
        );

    const partnerField =
        document.getElementById(
            "memberPartner"
        );


    const fatherId =
        fatherField ?
        fatherField.value :
        "";


    const motherId =
        motherField ?
        motherField.value :
        "";


    const partnerId =
        partnerField ?
        partnerField.value :
        "";


   /* ================================
   MEMBER ID
   ================================ */

const memberIdField =
    document.getElementById(
        "memberId"
    );

const memberId = "";
   
    /* ================================
       PHOTO
       ================================ */

    const photoField =
        document.getElementById(
            "memberPhoto"
        );


    let photo = "";


    if(
        photoField &&
        photoField.files &&
        photoField.files.length > 0
    ){

        const file =
            photoField.files[0];


        photo =
            file.name;

    }


    /* ================================
       DISABLE SAVE BUTTON
       ================================ */

    saveMemberBtn.disabled = true;

    saveMemberBtn.textContent =
        "Saving...";


    /* ================================
       API PARAMETERS
       ================================ */

    const params =
        new URLSearchParams();


    params.append(
        "action",
        "saveMember"
    );


    params.append(
        "familyId",
        currentFamily.familyId || ""
    );


    params.append(
        "familyName",
        currentFamily.familyName || ""
    );


    params.append(
        "memberId",
        memberId
    );


    params.append(
        "name",
        name
    );


    params.append(
        "gender",
        gender
    );


    params.append(
        "dob",
        dob
    );


    params.append(
        "photo",
        photo
    );


    params.append(
        "maritalStatus",
        maritalStatus
    );


    params.append(
        "fatherId",
        fatherId
    );


    params.append(
        "motherId",
        motherId
    );


    params.append(
        "partnerId",
        partnerId
    );


    params.append(
        "createdBy",
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
       SEND TO GOOGLE APPS SCRIPT
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
           ERROR
           ================================ */

        if(
            result.status !==
            "success"
        ){

            saveMemberBtn.disabled =
                false;

            saveMemberBtn.textContent =
                "Save Member";


            showMessage(
                result.message ||
                "Member could not be saved.",
                "error",
                3000
            );

            return;
        }


        /* ================================
           SUCCESS
           ================================ */

        showMessage(
            "Member saved successfully.",
            "success",
            3000
        );

/* ================================
   DISPLAY GENERATED MEMBER ID
   ================================ */

const generatedMemberId =
    result.memberId ||
    result.memberID ||
    "";

console.log(
    "GENERATED MEMBER ID:",
    generatedMemberId
);


if(
    memberIdField &&
    generatedMemberId
){

    memberIdField.textContent =
        generatedMemberId;

    memberIdField.dataset.memberId =
        generatedMemberId;

}
       /* ================================
   UPDATE MEMBER ID DISPLAY
   ================================ */

const savedMemberId =
    result.memberId || "";

if(
    memberIdField &&
    savedMemberId
){

    memberIdField.textContent =
        savedMemberId;

    memberIdField.dataset.memberId =
        savedMemberId;

}
/* ================================
   UPDATE LOCAL MEMBER LIST
   ================================ */

let familyMembers =
    JSON.parse(
        localStorage.getItem(
            "familyMembers"
        ) || "[]"
    );

/* ================================
   GET CLEAN MEMBER VALUES
   ================================ */

const savedName =
    String(
        document.getElementById(
            "memberName"
        )?.value || ""
    ).trim();


const savedGender =
    String(
        document.getElementById(
            "memberGender"
        )?.value || ""
    ).trim();


const savedDob =
    String(
        document.getElementById(
            "memberDob"
        )?.value || ""
    ).trim();

       
const newMember = {

    memberId:
        result.memberId || memberId,

    familyId:
        currentFamily.familyId,

    familyName:
        currentFamily.familyName,

    name:
        savedName,

    gender:
        savedGender,

    dob:
        savedDob,

    maritalStatus:
        document.querySelector(
            'input[name="memberMaritalStatus"]:checked'
        )?.value || "",

    fatherId:
        fatherId,

    motherId:
        motherId,

    partnerId:
        partnerId,

    createdAt:
        new Date().toISOString()

};
familyMembers.push(
    newMember
);


localStorage.setItem(
    "familyMembers",
    JSON.stringify(
        familyMembers
    )
);

        saveMemberBtn.disabled =
            false;

        saveMemberBtn.textContent =
            "Save Member";


    }catch(error){

        console.error(
            "Save Member Error:",
            error
        );


        saveMemberBtn.disabled =
            false;

        saveMemberBtn.textContent =
            "Save Member";


        showMessage(
            "Unable to save Member.",
            "error",
            3000
        );

    }

};
    
    
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
    function(e){

        e.preventDefault();

        console.log(
            "MEMBER HOME CLICKED"
        );

        showHome();

    };
 /* =============================
   BACK ACTION
   ============================= */

memberBackBtn.onclick =
    function(e){

        e.preventDefault();

        console.log(
            "MEMBER BACK CLICKED"
        );

        familyBtn.click();

    };

}
  

/* =================================
   GET CURRENT FAMILY
   ================================= */

/* =================================
   GET CURRENT USER
   ================================= */

const loggedUser =
    JSON.parse(
        sessionStorage.getItem("user")
    ) || {};


/* =================================
   GET STORED FAMILY
   ================================= */

const storedFamily =
    JSON.parse(
        localStorage.getItem(
            "currentFamily"
        ) || "null"
    );


/* =================================
   VERIFY FAMILY BELONGS TO USER
   ================================= */

let currentFamily = null;


if(
    storedFamily &&
    loggedUser
){

    const loginMatch =
        storedFamily.loginId &&
        loggedUser.loginUserName &&
        String(
            storedFamily.loginId
        ).trim().toLowerCase() ===
        String(
            loggedUser.loginUserName
        ).trim().toLowerCase();


    const emailMatch =
        storedFamily.userMail &&
        loggedUser.email &&
        String(
            storedFamily.userMail
        ).trim().toLowerCase() ===
        String(
            loggedUser.email
        ).trim().toLowerCase();


    const mobileMatch =
        storedFamily.mobile &&
        loggedUser.mobile &&
        String(
            storedFamily.mobile
        ).trim() ===
        String(
            loggedUser.mobile
        ).trim();


    if(
        loginMatch ||
        emailMatch ||
        mobileMatch
    ){

        currentFamily =
            storedFamily;

    }

}


/* =================================
   INVALID OLD FAMILY
   ================================= */

/* =================================
   LOAD FAMILY FROM SERVER
   ================================= */

if(!currentFamily){

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


    console.log(
        "ADD MEMBER → GET FAMILY:",
        loggedUser.loginUserName,
        loggedUser.email,
        loggedUser.mobile
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

            console.log(
                "ADD MEMBER → FAMILY RESULT:",
                result
            );


            if(
                result.status !==
                "success"
            ){

                console.log(
                    "NO FAMILY FOUND"
                );

                return;

            }


            /* =========================
               CREATE CURRENT FAMILY
               ========================= */

            currentFamily = {

                familyId:
                    result.familyId || "",

                familyName:
                    result.familyName || "",

                loginId:
                    result.loginUserName ||
                    loggedUser.loginUserName ||
                    "",

                userId:
                    loggedUser.userId || "",

                userMail:
                    result.email ||
                    loggedUser.email ||
                    "",

                mobile:
                    result.mobile ||
                    loggedUser.mobile ||
                    "",

                createdAt:
                    new Date().toISOString()

            };


            /* =========================
               SAVE
               ========================= */

            localStorage.setItem(
                "currentFamily",
                JSON.stringify(
                    currentFamily
                )
            );


            /* =========================
               DISPLAY FAMILY ID
               ========================= */

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
                    currentFamily.familyId ||
                    "-";

            }


            if(familyNameField){

                familyNameField.textContent =
                    currentFamily.familyName ||
                    "-";

            }


            /* =========================
               LOAD RELATIONS
               ========================= */

            loadMemberRelations();


        }
    )
    .catch(
        function(error){

            console.error(
                "ADD MEMBER FAMILY ERROR:",
                error
            );

        }
    );

}


/* =================================
   DISPLAY FAMILY INFORMATION
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



       
};
}
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

/* =================================
   CLEAR OLD FAMILY DATA
   ================================= */

localStorage.removeItem(
    "currentFamily"
);

localStorage.removeItem(
    "familyMembers"
);

console.log(
    "OLD FAMILY DATA CLEARED"
);

/* =================================
   GET FAMILY TREE
   ================================= */

           
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
    async function(response){

        const text =
            await response.text();

        console.log(
            "API STATUS:",
            response.status
        );

        console.log(
            "API RESPONSE:",
            text
        );

        if(!response.ok){

            throw new Error(
                "API HTTP Error " +
                response.status +
                ": " +
                text.substring(0,300)
            );

        }

        try{

            return JSON.parse(text);

        }catch(error){

            console.error(
                "API returned NON-JSON:",
                text
            );

            throw new Error(
                "Server did not return JSON."
            );

        }

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

    console.log(
        "NO FAMILY TREE FOR CURRENT USER"
    );

    localStorage.removeItem(
        "currentFamily"
    );

    localStorage.removeItem(
        "familyMembers"
    );

    return;

}

/* ================================
   SET CURRENT FAMILY FROM SERVER
   ================================ */

const serverFamily = {

    familyId:
        result.familyId || "",

    familyName:
        result.familyName || "",

    loginId:
        loggedUser.loginUserName || "",

    userId:
        loggedUser.userId || "",

    userMail:
        loggedUser.email || "",

    mobile:
        loggedUser.mobile || "",

    createdAt:
        new Date().toISOString()

};


localStorage.setItem(
    "currentFamily",
    JSON.stringify(
        serverFamily
    )
);
           
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
console.log(
    "SAVE MEMBER RESULT:",
    result
);

console.log(
    "GENERATED MEMBER ID:",
    result.memberId
);

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

