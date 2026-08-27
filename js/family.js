
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
     SELECT / SEARCH MEMBER
     ================================= -->

<div
    id="relationsMemberGroup"
    class="common-form-group">

    <label class="common-form-label">
        Member
    </label>
    
    <span class="common-form-colon">
        :
    </span>

    <div
        class="relations-member-search-wrap">

        <input
            type="text"
            id="relationsMemberSearch"
            class="common-form-select"
            placeholder="Select / Search Member"
            autocomplete="off">

        <div
            id="relationsMemberDropdown"
            class="relations-member-dropdown">
        </div>

    </div>

</div>
<div class="relations-page">

           <div class="relations-member-header">

    <div id="relationMemberPhoto">
    </div>

    <div id="relationMemberName">
        
    </div>

    <div id="relationMemberGender">
      
    </div>

</div>


   
<!-- =================================
     RELATIONS DETAILS
     ================================= -->

<!-- 1. PARTNER -->
<div
    id="relationPartnerSection"
    class="relations-section relation-direct-row">

    <div class="relation-row">

        <span class="relation-label">
            Partner
        </span>

        <span class="relation-colon">
            :
        </span>

        <span
            id="relationPartner"
            class="relation-value">
            --------
        </span>

    </div>

</div>


<!-- 2. CHILDREN -->
<div
    id="relationChildrenSection"
    class="relations-section">

    <h3>Children</h3>

    <div
        id="relationChildren">
        --------
    </div>

</div>


<!-- 3. PARENTS -->
<div
    id="relationParentsSection"
    class="relations-section">

    <h3>Parents</h3>

    <div class="relation-row">

        <span class="relation-label">
            Father
        </span>

        <span class="relation-colon">
            :
        </span>

        <span
            id="relationFather"
            class="relation-value">
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

        <span
            id="relationMother"
            class="relation-value">
            --------
        </span>

    </div>

</div>


<!-- 4. SIBLINGS -->
<div
    id="relationSiblingsSection"
    class="relations-section">

    <h3>Siblings</h3>

    <strong>Brothers</strong>

    <div
        id="relationBrothers">
        --------
    </div>


    <strong>Sisters</strong>

    <div
        id="relationSisters">
        --------
    </div>

</div>


<!-- 5. FATHER SIBLINGS -->
<div
    id="relationFatherSiblingsSection"
    class="relations-section">

    <h3>Father Siblings</h3>

    <div
        id="relationFatherSiblings">
        --------
    </div>

</div>


<!-- 6. MOTHER SIBLINGS -->
<div
    id="relationMotherSiblingsSection"
    class="relations-section">

    <h3>Mother Siblings</h3>

    <div
        id="relationMotherSiblings">
        --------
    </div>

</div>


<!-- 7. IN-LAWS -->
<div
    id="relationInLawsSection"
    class="relations-section">

    <h3>In-Laws</h3>

    <div class="relation-row">

        <span class="relation-label">
            Father-in-Law
        </span>

        <span class="relation-colon">
            :
        </span>

        <span
            id="relationFatherInLaw"
            class="relation-value">
            --------
        </span>

    </div>


    <div class="relation-row">

        <span class="relation-label">
            Mother-in-Law
        </span>

        <span class="relation-colon">
            :
        </span>

        <span
            id="relationMotherInLaw"
            class="relation-value">
            --------
        </span>

    </div>

</div>


<!-- 8. FATHER-IN-LAW SIBLINGS -->
<div
    id="relationFatherInLawSiblingsSection"
    class="relations-section">

    <h3>Father-in-Law Siblings</h3>

    <div
        id="relationFatherInLawSiblings">
        --------
    </div>

</div>


<!-- 9. MOTHER-IN-LAW SIBLINGS -->
<div
    id="relationMotherInLawSiblingsSection"
    class="relations-section">

    <h3>Mother-in-Law Siblings</h3>

    <div
        id="relationMotherInLawSiblings">
        --------
    </div>

</div>


<!-- 10. GRAND PARENTS -->
<div
    id="relationGrandParentsSection"
    class="relations-section">

    <h3>Grand Parents</h3>

    <div
        id="relationGrandParents">
        --------
    </div>

</div>


<!-- 11. GRAND GRAND PARENTS -->
<div
    id="relationGrandGrandParentsSection"
    class="relations-section">

    <h3>Grand Grand Parents</h3>

    <div
        id="relationGrandGrandParents">
        --------
    </div>

</div>


<!-- BACK BUTTON -->
<div align="center">

    <button
        id="relationsBackBtn"
        class="back-btn">

        ← Back

    </button>

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

const relationsMemberSearch =
    document.getElementById(
        "relationsMemberSearch"
    );

const relationsMemberDropdown =
    document.getElementById(
        "relationsMemberDropdown"
    );


/* =====================================
   LOAD MEMBERS INTO RELATIONS SEARCH
   ===================================== */

if(
    relationsMemberSearch &&
    relationsMemberDropdown
){

    const familyMembers =
        JSON.parse(
            localStorage.getItem(
                "familyMembers"
            ) || "[]"
        );


    console.log(
        "RELATIONS FAMILY MEMBERS:",
        familyMembers
    );


    /* =================================
       SHOW MEMBER LIST
       ================================= */

    function showRelationsMemberDropdown(){

        const searchText =
            String(
                relationsMemberSearch.value || ""
            )
            .trim()
            .toLowerCase();


        relationsMemberDropdown.innerHTML =
            "";


        /* =============================
           FILTER MEMBERS
           ============================= */

        const matchingMembers =
            familyMembers.filter(
                function(member){

                    if(
                        !member ||
                        !member.memberId
                    ){

                        return false;

                    }


                    const memberName =
                        String(
                            member.name || ""
                        )
                        .trim()
                        .toLowerCase();


                    /* EMPTY SEARCH
                       → SHOW ALL */

                    if(
                        searchText === ""
                    ){

                        return (
                            memberName !== ""
                        );

                    }


                    /* TEXT SEARCH */

                    return (
                        memberName !== "" &&
                        memberName.includes(
                            searchText
                        )
                    );

                }
            );


        console.log(
            "RELATIONS SEARCH:",
            searchText,
            matchingMembers
        );


        /* =============================
           NO MATCH
           ============================= */

        if(
            matchingMembers.length === 0
        ){

            relationsMemberDropdown.innerHTML =
                `<div class="relations-no-match">
                    No matching member
                </div>`;

            relationsMemberDropdown.style.display =
                "block";

            return;

        }


        /* =============================
           CREATE MEMBER ITEMS
           ============================= */

        matchingMembers.forEach(
            function(member){

                const option =
                    document.createElement(
                        "div"
                    );


                option.className =
                    "relations-member-option";


                option.textContent =
                    member.name ||
                    "Unnamed";


                option.dataset.memberId =
                    member.memberId;


                relationsMemberDropdown.appendChild(
                    option
                );

            }
        );


        relationsMemberDropdown.style.display =
            "block";

    }


  /* =================================
   MEMBER SEARCH
   ================================= */

relationsMemberSearch.addEventListener(
    "focus",
    function(){

        showRelationsMemberDropdown();

    }
);


relationsMemberSearch.addEventListener(
    "input",
    function(){

        showRelationsMemberDropdown();

    }
);
    /* =================================
       MEMBER SELECT
       ================================= */

    relationsMemberDropdown.addEventListener(
        "click",
        function(event){

            const option =
                event.target.closest(
                    ".relations-member-option"
                );


            if(!option){

                return;

            }


            const selectedMemberId =
                option.dataset.memberId;


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


            /* =========================
               PUT SELECTED NAME
               IN SEARCH BOX
               ========================= */

            relationsMemberSearch.value =
                selectedMember.name ||
                "";


            /* =========================
               HIDE LIST ONLY
               ========================= */

            relationsMemberDropdown.innerHTML =
                "";

            relationsMemberDropdown.style.display =
                "none";


            /* =========================
               LOAD RELATIONS
               ========================= */

            loadSelectedMemberRelations(
                selectedMember,
                familyMembers
            );

        }
    );


    /* =================================
       OUTSIDE CLICK
       → HIDE LIST
       → KEEP EMPTY BOX
       ================================= */

    document.addEventListener(
        "click",
        function(event){

            if(
                !event.target.closest(
                    ".relations-member-search-wrap"
                )
            ){

                relationsMemberDropdown.innerHTML =
                    "";

                relationsMemberDropdown.style.display =
                    "none";

            }

        }
    );

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

    console.log(
        "LOADING RELATIONS FOR:",
        member.name
    );


    /* ================================
       HIDE MEMBER SEARCH BOX
       ================================ */

    const memberGroup =
        document.getElementById(
            "relationsMemberGroup"
        );

    if(memberGroup){

        memberGroup.style.display =
            "none";

    }


    /* ================================
       SHOW SELECTED MEMBER HEADER
       ================================ */

    const memberHeader =
        document.querySelector(
            ".relations-member-header"
        );

    if(memberHeader){

        memberHeader.style.display =
            "flex";

    }


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
       MEMBER GENDER
       ================================ */

    const genderField =
        document.getElementById(
            "relationMemberGender"
        );

    if(genderField){

        genderField.textContent =
            member.gender || "-";

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

        const photoUrl =
            member.photo ||
            member.photoUrl ||
            member.photoURL ||
            member.profilePhoto ||
            member.image ||
            "";

        console.log(
            "RELATIONS MEMBER PHOTO:",
            photoUrl
        );

        if(photoUrl){

            const img =
                document.createElement(
                    "img"
                );

            img.src =
                photoUrl;

            img.alt =
                member.name || "Member";

            img.onerror =
                function(){

                    console.log(
                        "RELATIONS PHOTO LOAD FAILED:",
                        photoUrl
                    );

                    photoField.innerHTML =
                        "";

                };

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
       SIBLINGS
       ================================ */

    const siblings =
        familyMembers.filter(
            function(item){

                if(
                    String(item.memberId) ===
                    String(member.memberId)
                ){

                    return false;

                }


                const sameFather =
                    member.fatherId &&
                    item.fatherId &&
                    String(item.fatherId) ===
                    String(member.fatherId);


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

        brothersField.innerHTML =
            "";

        if(
            brothers.length === 0
        ){

            brothersField.textContent =
                "--------";

        }
        else{

            brothers.forEach(
                function(
                    brother,
                    index
                ){

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

        sistersField.innerHTML =
            "";

        if(
            sisters.length === 0
        ){

            sistersField.textContent =
                "--------";

        }
        else{

            sisters.forEach(
                function(
                    sister,
                    index
                ){

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

        childrenField.innerHTML =
            "";


        if(
            children.length === 0
        ){

            childrenField.textContent =
                "No";

        }
        else{

            children.forEach(
                function(
                    child,
                    index
                ){

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
       NEW SECTIONS
       ================================ */

    const newRelationFields = [

        "relationFatherSiblings",

        "relationMotherSiblings",

        "relationFatherInLaw",

        "relationMotherInLaw",

        "relationFatherInLawSiblings",

        "relationMotherInLawSiblings",

        "relationGrandParents",

        "relationGrandGrandParents"

    ];


    newRelationFields.forEach(
        function(id){

            const field =
                document.getElementById(
                    id
                );

            if(field){

                field.innerHTML =
                    "";

            }

        }
    );


    console.log(
        "BASIC RELATIONS LOADED"
    );

}
