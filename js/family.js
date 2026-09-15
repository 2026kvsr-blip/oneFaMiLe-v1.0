

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
                    Create Family
                </span>

            </button>


            <button
                id="searchMemberBtn"
                class="grid-btn">

                <img
                    src="images/colorbtns/CustomSearch1.png"
                    class="btn-icon">

                <span>
                    Search - edit
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
   FAMILY → TREE VIEW
   ===================================== */

const treeViewBtn =
    document.getElementById(
        "treeViewBtn"
    );

if(treeViewBtn){

    treeViewBtn.onclick =
        function(){

            console.log(
                "TREE VIEW CLICKED"
            );

            openFamilyTreePage();

        };

}
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
    class="relations-section relation-direct-row relations-partner">
    <div class="relation-row">

        <span class="relation-label partner-label">
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
    class="relations-section relations-children">

    <h3 id="relationChildrenTitle">
        Children
    </h3>

    <div
        id="relationSonsRow"
        class="relation-child-group">

        <div
            id="relationSonsTitle"
            class="relation-child-title">
        </div>

        <div
            id="relationSons">
        </div>

    </div>


    <div
        id="relationDaughtersRow"
        class="relation-child-group">

        <div
            id="relationDaughtersTitle"
            class="relation-child-title">
        </div>

        <div
            id="relationDaughters">
        </div>

    </div>

</div>

<!-- 3. PARENTS -->
<div
    id="relationParentsSection"
    class="relations-section relations-parents">
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
    class="relations-section relations-siblings">

<h3 id="relationSiblingsTitle">
    Siblings
</h3>
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
    class="relations-section relation-father-siblings">

<h3 id="relationFatherSiblingsTitle">
    Father Siblings
</h3>
    <div
    id="relationFatherSiblings">

    <div
        id="relationFatherSiblingsTitle"
        class="relation-siblings-title">
    </div>

    <div
        id="relationFatherSiblingsBrothersRow"
        class="relation-siblings-group">

        <div
            id="relationFatherSiblingsBrothersTitle"
            class="relation-siblings-subtitle">
        </div>

        <div
            id="relationFatherSiblingsBrothers">
        </div>

    </div>

    <div
        id="relationFatherSiblingsSistersRow"
        class="relation-siblings-group">

        <div
            id="relationFatherSiblingsSistersTitle"
            class="relation-siblings-subtitle">
        </div>

        <div
            id="relationFatherSiblingsSisters">
        </div>

    </div>

</div>
</div>


<!-- 6. MOTHER SIBLINGS -->
<div
    id="relationMotherSiblingsSection"
    class="relations-section relation-mother-siblings">

    <h3 id="relationMotherSiblingsTitle">
        Mother Siblings
    </h3>


    <div
        id="relationMotherSiblings">


        <!-- BROTHERS -->
        <div
            id="relationMotherSiblingsBrothersRow"
            class="relation-siblings-group">

            <div
                id="relationMotherSiblingsBrothersTitle"
                class="relation-siblings-subtitle">
            </div>

            <div
                id="relationMotherSiblingsBrothers">
            </div>

        </div>


        <!-- SISTERS -->
        <div
            id="relationMotherSiblingsSistersRow"
            class="relation-siblings-group">

            <div
                id="relationMotherSiblingsSistersTitle"
                class="relation-siblings-subtitle">
            </div>

            <div
                id="relationMotherSiblingsSisters">
            </div>

        </div>


    </div>

</div>   
<div
        id="relationMotherSiblingsBrothersRow"
        class="relation-siblings-group">

        <div
            id="relationMotherSiblingsBrothersTitle"
            class="relation-siblings-subtitle">
        </div>

        <div
            id="relationMotherSiblingsBrothers">
        </div>

    </div>

    <div
        id="relationMotherSiblingsSistersRow"
        class="relation-siblings-group">

        <div
            id="relationMotherSiblingsSistersTitle"
            class="relation-siblings-subtitle">
        </div>

        <div
            id="relationMotherSiblingsSisters">
        </div>

    </div>

</div>

</div>


<!-- 7. IN-LAWS -->
<div
    id="relationInLawsSection"
    class="relations-section relations-inlaws">

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
    class="relations-section relation-father-inlaw-siblings">

    <h3 id="relationFatherInLawSiblingsTitle">
        Father-in-Law Siblings
    </h3>


    <div
        id="relationFatherInLawSiblings">


        <!-- BROTHERS -->
        <div
            id="relationFatherInLawSiblingsBrothersRow"
            class="relation-siblings-group">

            <div
                id="relationFatherInLawSiblingsBrothersTitle"
                class="relation-siblings-subtitle">
            </div>

            <div
                id="relationFatherInLawSiblingsBrothers">
            </div>

        </div>


        <!-- SISTERS -->
        <div
            id="relationFatherInLawSiblingsSistersRow"
            class="relation-siblings-group">

            <div
                id="relationFatherInLawSiblingsSistersTitle"
                class="relation-siblings-subtitle">
            </div>

            <div
                id="relationFatherInLawSiblingsSisters">
            </div>

        </div>


    </div>

</div>

<!-- 9. MOTHER-IN-LAW SIBLINGS -->
<div
    id="relationMotherInLawSiblingsSection"
    class="relations-section relation-mother-inlaw-siblings">

    <h3 id="relationMotherInLawSiblingsTitle">
        Mother-in-Law Siblings
    </h3>


    <div
        id="relationMotherInLawSiblings">


        <!-- BROTHERS -->
        <div
            id="relationMotherInLawSiblingsBrothersRow"
            class="relation-siblings-group">

            <div
                id="relationMotherInLawSiblingsBrothersTitle"
                class="relation-siblings-subtitle">
            </div>

            <div
                id="relationMotherInLawSiblingsBrothers">
            </div>

        </div>


        <!-- SISTERS -->
        <div
            id="relationMotherInLawSiblingsSistersRow"
            class="relation-siblings-group">

            <div
                id="relationMotherInLawSiblingsSistersTitle"
                class="relation-siblings-subtitle">
            </div>

            <div
                id="relationMotherInLawSiblingsSisters">
            </div>

        </div>


    </div>

</div>


<!-- 10. GRAND PARENTS -->
<div
    id="relationGrandParentsSection"
    class="relations-section relation-grandparents">

    <h3>
        Grand Parents
    </h3>


    <strong>
        Paternal Grand Parents
    </strong>


    <div
        id="paternalGrandParents">


        <div
            id="relationFathersFatherRow"
            class="grandparent-row">

            <span class="grandparent-label">
                Father's Father
            </span>

            <span class="grandparent-colon">
                :
            </span>

            <span
                id="relationFathersFather"
                class="grandparent-value">
            </span>

        </div>


        <div
            id="relationFathersMotherRow"
            class="grandparent-row">

            <span class="grandparent-label">
                Father's Mother
            </span>

            <span class="grandparent-colon">
                :
            </span>

            <span
                id="relationFathersMother"
                class="grandparent-value">
            </span>

        </div>

    </div>


  <strong id="maternalGrandParentsTitle">
    Maternal Grand Parents
</strong>


    <div
        id="maternalGrandParents">


        <div
            id="relationMothersFatherRow"
            class="grandparent-row">

            <span class="grandparent-label">
                Mother's Father
            </span>

            <span class="grandparent-colon">
                :
            </span>

            <span
                id="relationMothersFather"
                class="grandparent-value">
            </span>

        </div>


        <div
            id="relationMothersMotherRow"
            class="grandparent-row">

            <span class="grandparent-label">
                Mother's Mother
            </span>

            <span class="grandparent-colon">
                :
            </span>

            <span
                id="relationMothersMother"
                class="grandparent-value">
            </span>

        </div>

    </div>

</div>
<!-- 11. GRAND GRAND PARENTS -->
<div
    id="relationGrandGrandParentsSection"
    class="relations-section relation-grand-grandparents">

    <h3>
        Grand Grand Parents
    </h3>


    <!-- PATERNAL GRAND PARENTS -->
    <strong id="grandGrandPaternalTitle">
        Paternal Grand Parents
    </strong>

    <div id="grandGrandPaternal">

        <div
            id="ggPaternalFatherFatherRow"
            class="grand-grandparent-row">

            <span class="grand-grandparent-label">
                Grand Fa - Father
            </span>

            <span class="grand-grandparent-colon">
                :
            </span>

            <span
                id="ggPaternalFatherFather"
                class="grand-grandparent-value">
            </span>

        </div>


        <div
            id="ggPaternalFatherMotherRow"
            class="grand-grandparent-row">

            <span class="grand-grandparent-label">
                Grand Fa - Mother
            </span>

            <span class="grand-grandparent-colon">
                :
            </span>

            <span
                id="ggPaternalFatherMother"
                class="grand-grandparent-value">
            </span>

        </div>


        <div
            id="ggPaternalMotherFatherRow"
            class="grand-grandparent-row">

            <span class="grand-grandparent-label">
                Grand Ma - Father
            </span>

            <span class="grand-grandparent-colon">
                :
            </span>

            <span
                id="ggPaternalMotherFather"
                class="grand-grandparent-value">
            </span>

        </div>


        <div
            id="ggPaternalMotherMotherRow"
            class="grand-grandparent-row">

            <span class="grand-grandparent-label">
                Grand Ma - Mother
            </span>

            <span class="grand-grandparent-colon">
                :
            </span>

            <span
                id="ggPaternalMotherMother"
                class="grand-grandparent-value">
            </span>

        </div>

    </div>


    <!-- MATERNAL GRAND PARENTS -->
    <strong id="grandGrandMaternalTitle">
        Maternal Grand Parents
    </strong>

    <div id="grandGrandMaternal">

        <div
            id="ggMaternalFatherFatherRow"
            class="grand-grandparent-row">

            <span class="grand-grandparent-label">
                Grand Fa - Father
            </span>

            <span class="grand-grandparent-colon">
                :
            </span>

            <span
                id="ggMaternalFatherFather"
                class="grand-grandparent-value">
            </span>

        </div>


        <div
            id="ggMaternalFatherMotherRow"
            class="grand-grandparent-row">

            <span class="grand-grandparent-label">
                Grand Fa - Mother
            </span>

            <span class="grand-grandparent-colon">
                :
            </span>

            <span
                id="ggMaternalFatherMother"
                class="grand-grandparent-value">
            </span>

        </div>


        <div
            id="ggMaternalMotherFatherRow"
            class="grand-grandparent-row">

            <span class="grand-grandparent-label">
                Grand Ma - Father
            </span>

            <span class="grand-grandparent-colon">
                :
            </span>

            <span
                id="ggMaternalMotherFather"
                class="grand-grandparent-value">
            </span>

        </div>


        <div
            id="ggMaternalMotherMotherRow"
            class="grand-grandparent-row">

            <span class="grand-grandparent-label">
                Grand Ma - Mother
            </span>

            <span class="grand-grandparent-colon">
                :
            </span>

            <span
                id="ggMaternalMotherMother"
                class="grand-grandparent-value">
            </span>

        </div>

    </div>

</div>

<!-- BACK + HOME BUTTONS -->
<div
    class="relations-navigation"
    align="center">

    <button
        id="relationsBackBtn"
        class="back-btn">

        ← Back

    </button>

    <button
        id="relationsHomeBtn"
        class="back-btn">

        🏠 Home

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

            /* =================================
               MEMBER SELECTED
               → GO BACK TO MEMBER SELECTION
               ================================= */

            if(
                relationsMemberSearch &&
                relationsMemberSearch.value.trim() !== ""
            ){

                /* Clear selected member */

                relationsMemberSearch.value =
                    "";


                /* Hide member details header */

                const memberHeader =
                    document.querySelector(
                        ".relations-member-header"
                    );

                if(memberHeader){

                    memberHeader.style.display =
                        "none";

                }


                /* Show member selection */

                const memberGroup =
                    document.getElementById(
                        "relationsMemberGroup"
                    );

                if(memberGroup){

                    memberGroup.style.display =
                        "";

                }


                /* Hide all relation details */

                document.querySelectorAll(
                    ".relations-section"
                ).forEach(
                    function(section){

                        section.style.display =
                            "none";

                    }
                );


                /* Clear member dropdown list */

                if(relationsMemberDropdown){

                    relationsMemberDropdown.innerHTML =
                        "";

                    relationsMemberDropdown.style.display =
                        "none";

                }

            }

            /* =================================
               NO MEMBER SELECTED
               → ONE STEP BACK
               ================================= */

            else{

                familyBtn.click();

            }

        };

}
      
const relationsHomeBtn =
    document.getElementById(
        "relationsHomeBtn"
    );

if(relationsHomeBtn){

    relationsHomeBtn.onclick =
        function(){

            homeBtn.click();

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


    /* =================================
       HIDE MEMBER SEARCH
       ================================= */

    const memberGroup =
        document.getElementById(
            "relationsMemberGroup"
        );

    if(memberGroup){

        memberGroup.style.display =
            "none";

    }


    /* =================================
       SHOW MEMBER HEADER
       ================================= */

    const memberHeader =
        document.querySelector(
            ".relations-member-header"
        );

    if(memberHeader){

        memberHeader.style.display =
            "flex";

    }
/* ================================
   SHOW ALL RELATION SECTIONS
   ================================ */

document.querySelectorAll(
    ".relations-section"
).forEach(
    function(section){

        section.style.display =
            "block";

    }
);

    /* =================================
       MEMBER NAME
       ================================= */

    const nameField =
        document.getElementById(
            "relationMemberName"
        );

    if(nameField){

        nameField.textContent =
            member.name || "-";

    }


    /* =================================
       MEMBER GENDER
       ================================= */

    const genderField =
        document.getElementById(
            "relationMemberGender"
        );

    if(genderField){

        genderField.textContent =
            member.gender || "-";

    }


    /* =================================
       MEMBER PHOTO
       ================================= */

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

                    photoField.innerHTML =
                        "";

                };

            photoField.appendChild(
                img
            );

        }

    }


    /* =================================
       HELPER
       ================================= */

    function findMember(id){

        if(!id){

            return null;

        }

        return familyMembers.find(
            function(item){

                return String(
                    item.memberId || ""
                ).trim() ===
                String(
                    id
                ).trim();

            }
        ) || null;

    }


    function getName(member){

        if(!member){

            return "";

        }

        return String(
            member.name || ""
        ).trim();

    }


    function hideSection(id){

        const section =
            document.getElementById(id);

        if(section){

            section.style.display =
                "none";

        }

    }


    function showSection(id){

        const section =
            document.getElementById(id);

        if(section){

            section.style.display =
                "";

        }

    }


    /* =================================
       FIND DIRECT RELATIONS
       ================================= */

    const father =
        findMember(
            member.fatherId
        );


    const mother =
        findMember(
            member.motherId
        );


    const partner =
        findMember(
            member.partnerId
        );


    const maritalStatus =
        String(
            member.maritalStatus || ""
        )
        .trim()
        .toLowerCase();


    const isMarried =
        maritalStatus === "yes" ||
        !!partner;


    console.log(
        "RELATIONS DIRECT:",
        {
            father,
            mother,
            partner,
            isMarried
        }
    );


    /* =================================
       1. PARTNER
       ================================= */

    const partnerSection =
        document.getElementById(
            "relationPartnerSection"
        );


    const partnerField =
        document.getElementById(
            "relationPartner"
        );


    if(
        isMarried &&
        partner &&
        getName(partner)
    ){

       if(partnerSection){

    console.log(
        "PARTNER SECTION FOUND:",
        partnerSection
    );

    partnerSection.style.display =
        "block";

    partnerSection.style.visibility =
        "visible";

    partnerSection.style.height =
        "auto";

}

        if(partnerField){

            partnerField.textContent =
                getName(partner);

        }

    }
    else{

        hideSection(
            "relationPartnerSection"
        );

    }


   /* =================================
   2. CHILDREN
   ================================= */

const children =
    familyMembers.filter(
        function(item){

            if(
                String(
                    item.memberId || ""
                ).trim() ===
                String(
                    member.memberId || ""
                ).trim()
            ){

                return false;

            }

            const isFather =
                String(
                    item.fatherId || ""
                ).trim() ===
                String(
                    member.memberId || ""
                ).trim();

            const isMother =
                String(
                    item.motherId || ""
                ).trim() ===
                String(
                    member.memberId || ""
                ).trim();

            return (
                isFather ||
                isMother
            );

        }
    );


/* =================================
   CHILDREN SECTION
   ================================= */

const childrenSection =
    document.getElementById(
        "relationChildrenSection"
    );


const childrenTitle =
    document.getElementById(
        "relationChildrenTitle"
    );


const sonsRow =
    document.getElementById(
        "relationSonsRow"
    );


const daughtersRow =
    document.getElementById(
        "relationDaughtersRow"
    );


const sonsTitle =
    document.getElementById(
        "relationSonsTitle"
    );


const daughtersTitle =
    document.getElementById(
        "relationDaughtersTitle"
    );


const sonsField =
    document.getElementById(
        "relationSons"
    );


const daughtersField =
    document.getElementById(
        "relationDaughters"
    );


/* =================================
   HIDE CHILDREN IF NOT MARRIED
   ================================= */

if(!isMarried){

    hideSection(
        "relationChildrenSection"
    );

}
else{

    if(childrenSection){

    childrenSection.style.display =
        "block";

}


    /* ===============================
       CHILDREN TOTAL COUNT
       =============================== */

    if(childrenTitle){

    if(children.length === 0){

        childrenTitle.textContent =
            "Children : No";

    }
    else{

        childrenTitle.textContent =
            "Children : " +
            children.length;

    }

}


    /* ===============================
       SPLIT SONS
       =============================== */

    const sons =
        children.filter(
            function(child){

                return String(
                    child.gender || ""
                )
                .trim()
                .toLowerCase() ===
                "male";

            }
        );


    /* ===============================
       SPLIT DAUGHTERS
       =============================== */

    const daughters =
        children.filter(
            function(child){

                return String(
                    child.gender || ""
                )
                .trim()
                .toLowerCase() ===
                "female";

            }
        );


    /* ===============================
       SONS
       =============================== */

    if(sons.length === 0){

        if(sonsRow){

            sonsRow.style.display =
                "none";

        }

    }
    else{

        if(sonsRow){

            sonsRow.style.display =
                "";

        }


        if(sonsTitle){

            sonsTitle.textContent =
                "Sons : " +
                sons.length;

        }


        if(sonsField){

            sonsField.innerHTML =
                "";

            sons.forEach(
                function(
                    son,
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
                            getName(son) ||
                            "--------"
                        );

                    sonsField.appendChild(
                        div
                    );

                }
            );

        }

    }


    /* ===============================
       DAUGHTERS
       =============================== */

    if(daughters.length === 0){

        if(daughtersRow){

            daughtersRow.style.display =
                "none";

        }

    }
    else{

        if(daughtersRow){

            daughtersRow.style.display =
                "";

        }


        if(daughtersTitle){

            daughtersTitle.textContent =
                "Daughters : " +
                daughters.length;

        }


        if(daughtersField){

            daughtersField.innerHTML =
                "";

            daughters.forEach(
                function(
                    daughter,
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
                            getName(daughter) ||
                            "--------"
                        );

                    daughtersField.appendChild(
                        div
                    );

                }
            );

        }

    }

}
    /* =================================
       3. PARENTS
       ================================= */

    const fatherField =
        document.getElementById(
            "relationFather"
        );


    const motherField =
        document.getElementById(
            "relationMother"
        );


    if(fatherField){

        fatherField.textContent =
            getName(father);

        const fatherRow =
            fatherField.closest(
                ".relation-row"
            );

        if(fatherRow){

    fatherRow.style.display =
        getName(father)
            ? "flex"
            : "none";

}

    }


    if(motherField){

        motherField.textContent =
            getName(mother);

        const motherRow =
            motherField.closest(
                ".relation-row"
            );

       if(motherRow){

    motherRow.style.display =
        getName(mother)
            ? "flex"
            : "none";

}
    }


    if(
    getName(father) ||
    getName(mother)
){

    const parentsSection =
        document.getElementById(
            "relationParentsSection"
        );

    if(parentsSection){

        parentsSection.style.display =
            "block";

    }

}    else{

        hideSection(
            "relationParentsSection"
        );

    }

    /* =================================
       4. SIBLINGS
       ================================= */

    const siblings =
        familyMembers.filter(
            function(item){

                if(
                    String(
                        item.memberId || ""
                    ).trim() ===
                    String(
                        member.memberId || ""
                    ).trim()
                ){

                    return false;

                }


                const sameFather =
                    member.fatherId &&
                    item.fatherId &&
                    String(
                        item.fatherId
                    ).trim() ===
                    String(
                        member.fatherId
                    ).trim();


                const sameMother =
                    member.motherId &&
                    item.motherId &&
                    String(
                        item.motherId
                    ).trim() ===
                    String(
                        member.motherId
                    ).trim();


                return (
                    sameFather ||
                    sameMother
                );

            }
        );
const siblingsTitle =
    document.getElementById(
        "relationSiblingsTitle"
    );

if(siblingsTitle){

    siblingsTitle.textContent =
        "Siblings : " +
        siblings.length;

}

    const brothers =
        siblings.filter(
            function(item){

                return String(
                    item.gender || ""
                )
                .trim()
                .toLowerCase() ===
                "male";

            }
        );


    const sisters =
        siblings.filter(
            function(item){

                return String(
                    item.gender || ""
                )
                .trim()
                .toLowerCase() ===
                "female";

            }
        );


    const brothersField =
        document.getElementById(
            "relationBrothers"
        );


    const sistersField =
        document.getElementById(
            "relationSisters"
        );


/* =================================
   SIBLINGS → BROTHERS / SISTERS
   ================================= */

if(brothersField){

    brothersField.innerHTML = "";

    const brothersLabel =
        brothersField.previousElementSibling;

    if(brothers.length === 0){

        /* Hide Brothers row */
        brothersField.style.display =
            "none";

        if(brothersLabel){

            brothersLabel.style.display =
                "none";

        }

    }
    else{

        /* Show Brothers row */
        brothersField.style.display =
            "";

        if(brothersLabel){

            brothersLabel.style.display =
                "";

            brothersLabel.textContent =
                "Brothers : " +
                brothers.length;

        }

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
                    getName(brother);

                brothersField.appendChild(
                    div
                );

            }
        );

    }

}


if(sistersField){

    sistersField.innerHTML = "";

    const sistersLabel =
        sistersField.previousElementSibling;

    if(sisters.length === 0){

        /* Hide Sisters row */
        sistersField.style.display =
            "none";

        if(sistersLabel){

            sistersLabel.style.display =
                "none";

        }

    }
    else{

        /* Show Sisters row */
        sistersField.style.display =
            "";

        if(sistersLabel){

            sistersLabel.style.display =
                "";

            sistersLabel.textContent =
                "Sisters : " +
                sisters.length;

        }

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
                    getName(sister);

                sistersField.appendChild(
                    div
                );

            }
        );

    }

}


      
    if(
    brothers.length ||
    sisters.length
){

    const siblingsSection =
        document.getElementById(
            "relationSiblingsSection"
        );

    if(siblingsSection){

        siblingsSection.style.display =
            "block";

    }

}
else{

    hideSection(
        "relationSiblingsSection"
    );

}

/* =================================
   5. FATHER SIBLINGS
   ================================= */

const fatherSiblings =
    father
        ? familyMembers.filter(
            function(item){

                if(
                    String(
                        item.memberId || ""
                    ).trim() ===
                    String(
                        father.memberId || ""
                    ).trim()
                ){

                    return false;

                }


                const sameFather =
                    father.fatherId &&
                    item.fatherId &&
                    String(
                        item.fatherId
                    ).trim() ===
                    String(
                        father.fatherId
                    ).trim();


                const sameMother =
                    father.motherId &&
                    item.motherId &&
                    String(
                        item.motherId
                    ).trim() ===
                    String(
                        father.motherId
                    ).trim();


                return (
                    sameFather ||
                    sameMother
                );

            }
        )
        : [];


/* =================================
   FATHER SIBLINGS ELEMENTS
   ================================= */

const fatherSiblingsField =
    document.getElementById(
        "relationFatherSiblings"
    );


const fatherSiblingsTitle =
    document.getElementById(
        "relationFatherSiblingsTitle"
    );


const fatherSiblingsBrothersRow =
    document.getElementById(
        "relationFatherSiblingsBrothersRow"
    );


const fatherSiblingsSistersRow =
    document.getElementById(
        "relationFatherSiblingsSistersRow"
    );


const fatherSiblingsBrothersTitle =
    document.getElementById(
        "relationFatherSiblingsBrothersTitle"
    );


const fatherSiblingsSistersTitle =
    document.getElementById(
        "relationFatherSiblingsSistersTitle"
    );


const fatherSiblingsBrothers =
    document.getElementById(
        "relationFatherSiblingsBrothers"
    );


const fatherSiblingsSisters =
    document.getElementById(
        "relationFatherSiblingsSisters"
    );


/* =================================
   CLEAR OLD CONTENT
   ================================= */

if(fatherSiblingsField){

    /*
       Important:
       Don't use innerHTML = ""
       here because the child elements
       are inside this container.
    */

}


/* =================================
   SPLIT BROTHERS
   ================================= */

const fatherBrothers =
    fatherSiblings.filter(
        function(item){

            return String(
                item.gender || ""
            )
            .trim()
            .toLowerCase() ===
            "male";

        }
    );


/* =================================
   SPLIT SISTERS
   ================================= */

const fatherSisters =
    fatherSiblings.filter(
        function(item){

            return String(
                item.gender || ""
            )
            .trim()
            .toLowerCase() ===
            "female";

        }
    );


/* =================================
   TOTAL COUNT
   ================================= */

const fatherSiblingsHeading =
    document.getElementById(
        "relationFatherSiblingsTitle"
    );

if(fatherSiblingsHeading){

    fatherSiblingsHeading.textContent =
        "Father Siblings : " +
        fatherSiblings.length;

}

/* =================================
   BROTHERS
   ================================= */

if(
    fatherBrothers.length === 0
){

    if(fatherSiblingsBrothersRow){

        fatherSiblingsBrothersRow.style.display =
            "none";

    }

}
else{

    if(fatherSiblingsBrothersRow){

        fatherSiblingsBrothersRow.style.display =
            "";

    }

   
    if(fatherSiblingsBrothersTitle){

        fatherSiblingsBrothersTitle.textContent =
            "Brothers : " +
            fatherBrothers.length;

    }


    if(fatherSiblingsBrothers){

        fatherSiblingsBrothers.innerHTML =
            "";


        fatherBrothers.forEach(
            function(
                item,
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
                        getName(item) ||
                        "--------"
                    );


                fatherSiblingsBrothers.appendChild(
                    div
                );

            }
        );

    }

}


/* =================================
   SISTERS
   ================================= */

if(
    fatherSisters.length === 0
){

    if(fatherSiblingsSistersRow){

        fatherSiblingsSistersRow.style.display =
            "none";

    }

}
else{

    if(fatherSiblingsSistersRow){

        fatherSiblingsSistersRow.style.display =
            "";

    }


    if(fatherSiblingsSistersTitle){

        fatherSiblingsSistersTitle.textContent =
            "Sisters : " +
            fatherSisters.length;

    }


    if(fatherSiblingsSisters){

        fatherSiblingsSisters.innerHTML =
            "";


        fatherSisters.forEach(
            function(
                item,
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
                        getName(item) ||
                        "--------"
                    );


                fatherSiblingsSisters.appendChild(
                    div
                );

            }
        );

    }

}


/* =================================
   SHOW / HIDE SECTION
   ================================= */

if(
    fatherSiblings.length
){

    const fatherSiblingsSection =
        document.getElementById(
            "relationFatherSiblingsSection"
        );


    if(fatherSiblingsSection){

        fatherSiblingsSection.style.display =
            "block";

    }

}
else{

    hideSection(
        "relationFatherSiblingsSection"
    );

}
      
 /* =================================
   6. MOTHER SIBLINGS
   ================================= */

const motherSiblings =
    mother
        ? familyMembers.filter(
            function(item){

                if(
                    String(
                        item.memberId || ""
                    ).trim() ===
                    String(
                        mother.memberId || ""
                    ).trim()
                ){

                    return false;

                }


                const sameFather =
                    mother.fatherId &&
                    item.fatherId &&
                    String(
                        item.fatherId
                    ).trim() ===
                    String(
                        mother.fatherId
                    ).trim();


                const sameMother =
                    mother.motherId &&
                    item.motherId &&
                    String(
                        item.motherId
                    ).trim() ===
                    String(
                        mother.motherId
                    ).trim();


                return (
                    sameFather ||
                    sameMother
                );

            }
        )
        : [];


/* =================================
   MOTHER SIBLINGS ELEMENTS
   ================================= */

const motherSiblingsTitle =
    document.getElementById(
        "relationMotherSiblingsTitle"
    );


const motherSiblingsBrothersRow =
    document.getElementById(
        "relationMotherSiblingsBrothersRow"
    );


const motherSiblingsSistersRow =
    document.getElementById(
        "relationMotherSiblingsSistersRow"
    );


const motherSiblingsBrothersTitle =
    document.getElementById(
        "relationMotherSiblingsBrothersTitle"
    );


const motherSiblingsSistersTitle =
    document.getElementById(
        "relationMotherSiblingsSistersTitle"
    );


const motherSiblingsBrothers =
    document.getElementById(
        "relationMotherSiblingsBrothers"
    );


const motherSiblingsSisters =
    document.getElementById(
        "relationMotherSiblingsSisters"
    );


/* =================================
   TOTAL COUNT
   ================================= */

if(motherSiblingsTitle){

    motherSiblingsTitle.textContent =
        "Mother Siblings : " +
        motherSiblings.length;

}


/* =================================
   BROTHERS
   ================================= */

const motherBrothers =
    motherSiblings.filter(
        function(item){

            return String(
                item.gender || ""
            )
            .trim()
            .toLowerCase() ===
            "male";

        }
    );


if(motherBrothers.length === 0){

    if(motherSiblingsBrothersRow){

        motherSiblingsBrothersRow.style.display =
            "none";

    }

}
else{

    if(motherSiblingsBrothersRow){

        motherSiblingsBrothersRow.style.display =
            "";

    }


    if(motherSiblingsBrothersTitle){

        motherSiblingsBrothersTitle.textContent =
            "Brothers : " +
            motherBrothers.length;

    }


    if(motherSiblingsBrothers){

        motherSiblingsBrothers.innerHTML =
            "";


        motherBrothers.forEach(
            function(
                item,
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
                        getName(item) ||
                        "--------"
                    );


                motherSiblingsBrothers.appendChild(
                    div
                );

            }
        );

    }

}


/* =================================
   SISTERS
   ================================= */

const motherSisters =
    motherSiblings.filter(
        function(item){

            return String(
                item.gender || ""
            )
            .trim()
            .toLowerCase() ===
            "female";

        }
    );


if(motherSisters.length === 0){

    if(motherSiblingsSistersRow){

        motherSiblingsSistersRow.style.display =
            "none";

    }

}
else{

    if(motherSiblingsSistersRow){

        motherSiblingsSistersRow.style.display =
            "";

    }


    if(motherSiblingsSistersTitle){

        motherSiblingsSistersTitle.textContent =
            "Sisters : " +
            motherSisters.length;

    }


    if(motherSiblingsSisters){

        motherSiblingsSisters.innerHTML =
            "";


        motherSisters.forEach(
            function(
                item,
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
                        getName(item) ||
                        "--------"
                    );


                motherSiblingsSisters.appendChild(
                    div
                );

            }
        );

    }

}


/* =================================
   SHOW / HIDE SECTION
   ================================= */

if(
    motherSiblings.length
){

    const motherSiblingsSection =
        document.getElementById(
            "relationMotherSiblingsSection"
        );


    if(motherSiblingsSection){

        motherSiblingsSection.style.display =
            "block";

    }

}
else{

    hideSection(
        "relationMotherSiblingsSection"
    );

}

    /* =================================
       7. IN-LAWS
       ================================= */

    let fatherInLaw =
        null;

    let motherInLaw =
        null;


    if(isMarried && partner){

        fatherInLaw =
            findMember(
                partner.fatherId
            );

        motherInLaw =
            findMember(
                partner.motherId
            );

    }


    const fatherInLawField =
        document.getElementById(
            "relationFatherInLaw"
        );


    const motherInLawField =
        document.getElementById(
            "relationMotherInLaw"
        );


    if(fatherInLawField){

        fatherInLawField.textContent =
            getName(fatherInLaw);

        const row =
            fatherInLawField.closest(
                ".relation-row"
            );

        if(row){

            row.style.display =
                getName(fatherInLaw)
                    ? ""
                    : "none";

        }

    }


    if(motherInLawField){

        motherInLawField.textContent =
            getName(motherInLaw);

        const row =
            motherInLawField.closest(
                ".relation-row"
            );

        if(row){

            row.style.display =
                getName(motherInLaw)
                    ? ""
                    : "none";

        }

    }


   if(
    isMarried &&
    (
        getName(fatherInLaw) ||
        getName(motherInLaw)
    )
){

    const inLawsSection =
        document.getElementById(
            "relationInLawsSection"
        );

    if(inLawsSection){

        inLawsSection.style.display =
            "block";

    }

}
else{

    hideSection(
        "relationInLawsSection"
    );

}

      /* =================================
   SPECIAL SIBLING RELATION CHECK
   ================================= */

/* =================================
   SPECIAL SIBLING RELATION CHECK
   ================================= */

function areSiblingsForSpecialRelation(
    person1,
    person2
){

    if(
        !person1 ||
        !person2
    ){
        return false;
    }

    /* SAME PERSON CHECK */

    const person1Id =
        String(
            person1.memberId || ""
        ).trim();

    const person2Id =
        String(
            person2.memberId || ""
        ).trim();

    if(
        !person1Id ||
        !person2Id ||
        person1Id === person2Id
    ){
        return false;
    }


    /* SAME FAMILY CHECK */

    const family1 =
        String(
            person1.familyId || ""
        ).trim();

    const family2 =
        String(
            person2.familyId || ""
        ).trim();

    if(
        family1 &&
        family2 &&
        family1 !== family2
    ){
        return false;
    }


    /* FATHER CHECK */

    const father1 =
        String(
            person1.fatherId || ""
        ).trim();

    const father2 =
        String(
            person2.fatherId || ""
        ).trim();

    const sameFather =
        father1 &&
        father2 &&
        father1 === father2;


    /* MOTHER CHECK */

    const mother1 =
        String(
            person1.motherId || ""
        ).trim();

    const mother2 =
        String(
            person2.motherId || ""
        ).trim();

    const sameMother =
        mother1 &&
        mother2 &&
        mother1 === mother2;


    return !!(
        sameFather ||
        sameMother
    );
}
      /* =================================
       8. FATHER-IN-LAW SIBLINGS
       ================================= */

    const fatherInLawSiblings =
        fatherInLaw
            ? familyMembers.filter(
                function(item){

                    if(
                        String(
                            item.memberId || ""
                        ).trim() ===
                        String(
                            fatherInLaw.memberId || ""
                        ).trim()
                    ){

                        return false;

                    }


                    const sameFather =
                        fatherInLaw.fatherId &&
                        item.fatherId &&
                        String(
                            item.fatherId
                        ).trim() ===
                        String(
                            fatherInLaw.fatherId
                        ).trim();


                    const sameMother =
                        fatherInLaw.motherId &&
                        item.motherId &&
                        String(
                            item.motherId
                        ).trim() ===
                        String(
                            fatherInLaw.motherId
                        ).trim();


                    return (
                        sameFather ||
                        sameMother
                    );

                }
            )
            : [];

/* =================================
   SPECIAL CASE
   FATHER-IN-LAW IS MOTHER'S BROTHER
   ================================= */

const fatherInLawIsMothersSibling =
    !!fatherInLaw &&
    !!mother &&
    areSiblingsForSpecialRelation(
        fatherInLaw,
        mother
    );
      
   /* =================================
   FATHER-IN-LAW SIBLINGS
   BROTHERS / SISTERS
   ================================= */

const fatherInLawSiblingsTitle =
    document.getElementById(
        "relationFatherInLawSiblingsTitle"
    );


const fatherInLawSiblingsBrothersRow =
    document.getElementById(
        "relationFatherInLawSiblingsBrothersRow"
    );


const fatherInLawSiblingsSistersRow =
    document.getElementById(
        "relationFatherInLawSiblingsSistersRow"
    );


const fatherInLawSiblingsBrothersTitle =
    document.getElementById(
        "relationFatherInLawSiblingsBrothersTitle"
    );


const fatherInLawSiblingsSistersTitle =
    document.getElementById(
        "relationFatherInLawSiblingsSistersTitle"
    );


const fatherInLawSiblingsBrothers =
    document.getElementById(
        "relationFatherInLawSiblingsBrothers"
    );


const fatherInLawSiblingsSisters =
    document.getElementById(
        "relationFatherInLawSiblingsSisters"
    );


/* =================================
   TITLE + TOTAL COUNT
   ================================= */

if(fatherInLawSiblingsTitle){

    fatherInLawSiblingsTitle.textContent =
        "Father-in-Law Siblings : " +
        fatherInLawSiblings.length;

}
      const fatherInLawSiblingsContainer =
    document.getElementById(
        "relationFatherInLawSiblings"
    );
      
  /* =================================
   REMOVE OLD SPECIAL MESSAGE
   ================================= */

document
    .querySelectorAll(
        ".father-in-law-special-message"
    )
    .forEach(
        function(message){
            message.remove();
        }
    );    
/* =================================
   FATHER-IN-LAW SIBLINGS
   SPECIAL CONDITION
   ================================= */
if(
    fatherInLawIsMothersSibling
){

    /* Hide normal Brothers row */

    if(fatherInLawSiblingsBrothersRow){

        fatherInLawSiblingsBrothersRow.style.display =
            "none";

    }


    /* Hide normal Sisters row */

    if(fatherInLawSiblingsSistersRow){

        fatherInLawSiblingsSistersRow.style.display =
            "none";

    }


    /* Change title */

    if(fatherInLawSiblingsTitle){

        fatherInLawSiblingsTitle.textContent =
            "Father-in-Law Siblings";
    }


    /* Show special message */

   if(fatherInLawSiblingsContainer){

        const message =
            document.createElement(
                "div"
            );

        message.className =
    "father-in-law-special-message";
        message.textContent =
            "Same as Mother " +
            (
                getName(mother) ||
                "Mother"
            ) +
            " siblings because Father-in-Law is my mother's brother";


        fatherInLawSiblingsContainer.appendChild(
            message
        );

    }

}
      else{

    /* =================================
       NORMAL BROTHERS / SISTERS
       ================================= */

    const fatherInLawBrothers =
        fatherInLawSiblings.filter(
            function(item){

                return String(
                    item.gender || ""
                )
                .trim()
                .toLowerCase() ===
                "male";

            }
        );


    const fatherInLawSisters =
        fatherInLawSiblings.filter(
            function(item){

                return String(
                    item.gender || ""
                )
                .trim()
                .toLowerCase() ===
                "female";

            }
        );


    /* =================================
       BROTHERS
       ================================= */

    if(
        fatherInLawBrothers.length === 0
    ){

        if(fatherInLawSiblingsBrothersRow){

            fatherInLawSiblingsBrothersRow.style.display =
                "none";

        }

    }
    else{

        if(fatherInLawSiblingsBrothersRow){

            fatherInLawSiblingsBrothersRow.style.display =
                "";

        }


        if(fatherInLawSiblingsBrothersTitle){

            fatherInLawSiblingsBrothersTitle.textContent =
                "Brothers : " +
                fatherInLawBrothers.length;

        }


        if(fatherInLawSiblingsBrothers){

            fatherInLawSiblingsBrothers.innerHTML =
                "";


            fatherInLawBrothers.forEach(
                function(
                    item,
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
                            getName(item) ||
                            "--------"
                        );


                    fatherInLawSiblingsBrothers.appendChild(
                        div
                    );

                }
            );

        }

    }


    /* =================================
       SISTERS
       ================================= */

    if(
        fatherInLawSisters.length === 0
    ){

        if(fatherInLawSiblingsSistersRow){

            fatherInLawSiblingsSistersRow.style.display =
                "none";

        }

    }
    else{

        if(fatherInLawSiblingsSistersRow){

            fatherInLawSiblingsSistersRow.style.display =
                "";

        }


        if(fatherInLawSiblingsSistersTitle){

            fatherInLawSiblingsSistersTitle.textContent =
                "Sisters : " +
                fatherInLawSisters.length;

        }


        if(fatherInLawSiblingsSisters){

            fatherInLawSiblingsSisters.innerHTML =
                "";


            fatherInLawSisters.forEach(
                function(
                    item,
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
                            getName(item) ||
                            "--------"
                        );


                    fatherInLawSiblingsSisters.appendChild(
                        div
                    );

                }
            );

        }

    }

}


/* =================================
   SHOW / HIDE SECTION
   ================================= */

if(
    isMarried &&
    fatherInLawSiblings.length > 0
){

    const fatherInLawSiblingsSection =
        document.getElementById(
            "relationFatherInLawSiblingsSection"
        );


    if(fatherInLawSiblingsSection){

        fatherInLawSiblingsSection.style.display =
            "block";

    }

}
else{

    hideSection(
        "relationFatherInLawSiblingsSection"
    );

}


    /* =================================
       9. MOTHER-IN-LAW SIBLINGS
       ================================= */

    const motherInLawSiblings =
        motherInLaw
            ? familyMembers.filter(
                function(item){

                    if(
                        String(
                            item.memberId || ""
                        ).trim() ===
                        String(
                            motherInLaw.memberId || ""
                        ).trim()
                    ){

                        return false;

                    }


                    const sameFather =
                        motherInLaw.fatherId &&
                        item.fatherId &&
                        String(
                            item.fatherId
                        ).trim() ===
                        String(
                            motherInLaw.fatherId
                        ).trim();


                    const sameMother =
                        motherInLaw.motherId &&
                        item.motherId &&
                        String(
                            item.motherId
                        ).trim() ===
                        String(
                            motherInLaw.motherId
                        ).trim();


                    return (
                        sameFather ||
                        sameMother
                    );

                }
            )
            : [];

      

const motherInLawIsMySibling =
    !!motherInLaw &&
    !!member &&
    areSiblingsForSpecialRelation(
        motherInLaw,
        member
    );

const motherInLawIsFathersSibling =
    !!motherInLaw &&
    !!father &&
    areSiblingsForSpecialRelation(
        motherInLaw,
        father
    );

      console.log(
    "SELECTED MEMBER =",
    getName(member),
    member
);

console.log(
    "MOTHER-IN-LAW =",
    getName(motherInLaw),
    motherInLaw
);

console.log(
    "FATHER =",
    getName(father),
    father
);

console.log(
    "MIL IS MY SIBLING =",
    motherInLawIsMySibling
);

console.log(
    "MIL IS FATHER SIBLING =",
    motherInLawIsFathersSibling
);
      /* =================================
   MOTHER-IN-LAW SIBLINGS
   BROTHERS / SISTERS
   ================================= */

const motherInLawSiblingsTitle =
    document.getElementById(
        "relationMotherInLawSiblingsTitle"
    );


const motherInLawSiblingsBrothersRow =
    document.getElementById(
        "relationMotherInLawSiblingsBrothersRow"
    );


const motherInLawSiblingsSistersRow =
    document.getElementById(
        "relationMotherInLawSiblingsSistersRow"
    );


const motherInLawSiblingsBrothersTitle =
    document.getElementById(
        "relationMotherInLawSiblingsBrothersTitle"
    );


const motherInLawSiblingsSistersTitle =
    document.getElementById(
        "relationMotherInLawSiblingsSistersTitle"
    );


const motherInLawSiblingsBrothers =
    document.getElementById(
        "relationMotherInLawSiblingsBrothers"
    );


const motherInLawSiblingsSisters =
    document.getElementById(
        "relationMotherInLawSiblingsSisters"
    );


/* =================================
   TITLE + TOTAL COUNT
   ================================= */

if(motherInLawSiblingsTitle){

    motherInLawSiblingsTitle.textContent =
        "Mother-in-Law Siblings : " +
        motherInLawSiblings.length;

}


/* =================================
   SEPARATE BROTHERS
   ================================= */

const motherInLawBrothers =
    motherInLawSiblings.filter(
        function(item){

            return String(
                item.gender || ""
            )
            .trim()
            .toLowerCase() ===
            "male";

        }
    );


/* =================================
   SEPARATE SISTERS
   ================================= */

const motherInLawSisters =
    motherInLawSiblings.filter(
        function(item){

            return String(
                item.gender || ""
            )
            .trim()
            .toLowerCase() ===
            "female";

        }
    );


/* =================================
   BROTHERS
   ================================= */

if(
    motherInLawBrothers.length === 0
){

    if(motherInLawSiblingsBrothersRow){

        motherInLawSiblingsBrothersRow.style.display =
            "none";

    }

}
else{

    if(motherInLawSiblingsBrothersRow){

        motherInLawSiblingsBrothersRow.style.display =
            "";

    }


    if(motherInLawSiblingsBrothersTitle){

        motherInLawSiblingsBrothersTitle.textContent =
            "Brothers : " +
            motherInLawBrothers.length;

    }


    if(motherInLawSiblingsBrothers){

        motherInLawSiblingsBrothers.innerHTML =
            "";


        motherInLawBrothers.forEach(
            function(
                item,
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
                        getName(item) ||
                        "--------"
                    );


                motherInLawSiblingsBrothers.appendChild(
                    div
                );

            }
        );

    }

}


/* =================================
   SISTERS
   ================================= */

if(
    motherInLawSisters.length === 0
){

    if(motherInLawSiblingsSistersRow){

        motherInLawSiblingsSistersRow.style.display =
            "none";

    }

}
else{

    if(motherInLawSiblingsSistersRow){

        motherInLawSiblingsSistersRow.style.display =
            "";

    }


    if(motherInLawSiblingsSistersTitle){

        motherInLawSiblingsSistersTitle.textContent =
            "Sisters : " +
            motherInLawSisters.length;

    }


    if(motherInLawSiblingsSisters){

        motherInLawSiblingsSisters.innerHTML =
            "";


        motherInLawSisters.forEach(
            function(
                item,
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
                        getName(item) ||
                        "--------"
                    );


                motherInLawSiblingsSisters.appendChild(
                    div
                );

            }
        );

    }

}

      const motherInLawSiblingsContainer =
    document.getElementById(
        "relationMotherInLawSiblings"
    );


       /* =================================
   REMOVE OLD SPECIAL MESSAGE
   ================================= */

document
    .querySelectorAll(
        ".mother-in-law-special-message"
    )
    .forEach(
        function(message){
            message.remove();
        }
    );


/* =================================
   MOTHER-IN-LAW IS MY SIBLING
   ================================= */

if(
    motherInLawIsMySibling
){
    if(motherInLawSiblingsBrothersRow){
        motherInLawSiblingsBrothersRow.style.display =
            "none";
    }
    if(motherInLawSiblingsSistersRow){
        motherInLawSiblingsSistersRow.style.display =
            "none";
    }
    if(motherInLawSiblingsTitle){
        motherInLawSiblingsTitle.textContent =
            "Mother-in-Law Siblings";
    }
    const motherInLawSiblingsContainer =
        document.getElementById(
            "relationMotherInLawSiblings"
        );
    if(motherInLawSiblingsContainer){
       
       const specialMessage =
    document.createElement(
        "div"
    );

specialMessage.className =
    "mother-in-law-special-message";

specialMessage.textContent =
    "Same as my siblings because Mother-in-Law is my sister";

motherInLawSiblingsContainer.appendChild(
    specialMessage
);
    }

}else if(
    motherInLawIsFathersSibling
){

    if(motherInLawSiblingsBrothersRow){

        motherInLawSiblingsBrothersRow.style.display =
            "none";

    }


    if(motherInLawSiblingsSistersRow){

        motherInLawSiblingsSistersRow.style.display =
            "none";

    }


    if(motherInLawSiblingsTitle){

        motherInLawSiblingsTitle.textContent =
            "Mother-in-Law Siblings";

    }


    const motherInLawSiblingsContainer =
        document.getElementById(
            "relationMotherInLawSiblings"
        );


    if(motherInLawSiblingsContainer){

           const specialMessage =
            document.createElement(
                "div"
            );
        specialMessage.className =
       "mother-in-law-special-message";

        specialMessage.textContent =
            "Same as Father " +
            (
                getName(father) ||
                "Father"
            ) +
            " siblings because Mother-in-Law is my father's sister";


        motherInLawSiblingsContainer.appendChild(
            specialMessage
        );

    }

}

   else{

    /* =================================
       NORMAL MOTHER-IN-LAW SIBLINGS
       ================================= */

    if(motherInLawSiblingsBrothersRow){

        motherInLawSiblingsBrothersRow.style.display =
            motherInLawBrothers.length > 0
                ? ""
                : "none";

    }


    if(motherInLawSiblingsSistersRow){

        motherInLawSiblingsSistersRow.style.display =
            motherInLawSisters.length > 0
                ? ""
                : "none";

    }


    if(motherInLawSiblingsBrothersTitle){

        motherInLawSiblingsBrothersTitle.textContent =
            "Brothers : " +
            motherInLawBrothers.length;

    }


    if(motherInLawSiblingsSistersTitle){

        motherInLawSiblingsSistersTitle.textContent =
            "Sisters : " +
            motherInLawSisters.length;

    }


    if(motherInLawSiblingsBrothers){

        motherInLawSiblingsBrothers.innerHTML =
            "";

        motherInLawBrothers.forEach(
            function(item, index){

                const div =
                    document.createElement(
                        "div"
                    );

                div.textContent =
                    (index + 1) +
                    ". " +
                    (
                        getName(item) ||
                        "--------"
                    );

                motherInLawSiblingsBrothers.appendChild(
                    div
                );

            }
        );

    }


    if(motherInLawSiblingsSisters){

        motherInLawSiblingsSisters.innerHTML =
            "";

        motherInLawSisters.forEach(
            function(item, index){

                const div =
                    document.createElement(
                        "div"
                    );

                div.textContent =
                    (index + 1) +
                    ". " +
                    (
                        getName(item) ||
                        "--------"
                    );

                motherInLawSiblingsSisters.appendChild(
                    div
                );

            }
        );

    }

}   
/* =================================
   SHOW / HIDE SECTION
   ================================= */

if(
    isMarried &&
    motherInLawSiblings.length > 0
){

    const motherInLawSiblingsSection =
        document.getElementById(
            "relationMotherInLawSiblingsSection"
        );


    if(motherInLawSiblingsSection){

        motherInLawSiblingsSection.style.display =
            "block";

    }

}
else{

    hideSection(
        "relationMotherInLawSiblingsSection"
    );

}

   
/* =================================
   10. GRAND PARENTS
   ================================= */


/* =================================
   FIND PATERNAL GRAND PARENTS
   ================================= */

const fathersFather =
    father &&
    father.fatherId
        ? familyMembers.find(
            function(item){

                return String(
                    item.memberId || ""
                ).trim() ===
                String(
                    father.fatherId
                ).trim();

            }
        )
        : null;


const fathersMother =
    father &&
    father.motherId
        ? familyMembers.find(
            function(item){

                return String(
                    item.memberId || ""
                ).trim() ===
                String(
                    father.motherId
                ).trim();

            }
        )
        : null;


/* =================================
   FIND MATERNAL GRAND PARENTS
   ================================= */

const mothersFather =
    mother &&
    mother.fatherId
        ? familyMembers.find(
            function(item){

                return String(
                    item.memberId || ""
                ).trim() ===
                String(
                    mother.fatherId
                ).trim();

            }
        )
        : null;


const mothersMother =
    mother &&
    mother.motherId
        ? familyMembers.find(
            function(item){

                return String(
                    item.memberId || ""
                ).trim() ===
                String(
                    mother.motherId
                ).trim();

            }
        )
        : null;


/* =================================
   FATHER'S FATHER
   ================================= */

const fathersFatherRow =
    document.getElementById(
        "relationFathersFatherRow"
    );

const fathersFatherField =
    document.getElementById(
        "relationFathersFather"
    );


if(
    fathersFather &&
    getName(fathersFather)
){

    fathersFatherField.textContent =
        getName(fathersFather);

    fathersFatherRow.style.display =
        "";

}
else{

    fathersFatherRow.style.display =
        "none";

}


/* =================================
   FATHER'S MOTHER
   ================================= */

const fathersMotherRow =
    document.getElementById(
        "relationFathersMotherRow"
    );

const fathersMotherField =
    document.getElementById(
        "relationFathersMother"
    );


if(
    fathersMother &&
    getName(fathersMother)
){

    fathersMotherField.textContent =
        getName(fathersMother);

    fathersMotherRow.style.display =
        "";

}
else{

    fathersMotherRow.style.display =
        "none";

}


/* =================================
   MOTHER'S FATHER
   ================================= */

const mothersFatherRow =
    document.getElementById(
        "relationMothersFatherRow"
    );

const mothersFatherField =
    document.getElementById(
        "relationMothersFather"
    );


if(
    mothersFather &&
    getName(mothersFather)
){

    mothersFatherField.textContent =
        getName(mothersFather);

    mothersFatherRow.style.display =
        "";

}
else{

    mothersFatherRow.style.display =
        "none";

}


/* =================================
   MOTHER'S MOTHER
   ================================= */

const mothersMotherRow =
    document.getElementById(
        "relationMothersMotherRow"
    );

const mothersMotherField =
    document.getElementById(
        "relationMothersMother"
    );


if(
    mothersMother &&
    getName(mothersMother)
){

    mothersMotherField.textContent =
        getName(mothersMother);

    mothersMotherRow.style.display =
        "";

}
else{

    mothersMotherRow.style.display =
        "none";

}


/* =================================
   SHOW / HIDE GRAND PARENTS
   ================================= */

const grandParentsSection =
    document.getElementById(
        "relationGrandParentsSection"
    );


const hasGrandParents =
    (
        fathersFather &&
        getName(fathersFather)
    ) ||
    (
        fathersMother &&
        getName(fathersMother)
    ) ||
    (
        mothersFather &&
        getName(mothersFather)
    ) ||
    (
        mothersMother &&
        getName(mothersMother)
    );


if(grandParentsSection){

    if(hasGrandParents){

        grandParentsSection.style.display =
            "block";

    }
    else{

        grandParentsSection.style.display =
            "none";

    }

}

/* =================================
   HIDE EMPTY GRAND PARENT GROUP TITLES
   ================================= */

const paternalGrandParentsTitle =
    document.querySelector(
        "#paternalGrandParents"
    )?.previousElementSibling;

const maternalGrandParentsTitle =
    document.getElementById(
        "maternalGrandParentsTitle"
    );


const hasPaternalGrandParents =
    (
        fathersFather &&
        getName(fathersFather)
    ) ||
    (
        fathersMother &&
        getName(fathersMother)
    );


const hasMaternalGrandParents =
    (
        mothersFather &&
        getName(mothersFather)
    ) ||
    (
        mothersMother &&
        getName(mothersMother)
    );


if(paternalGrandParentsTitle){

    paternalGrandParentsTitle.style.display =
        hasPaternalGrandParents
            ? ""
            : "none";

}


if(maternalGrandParentsTitle){

    maternalGrandParentsTitle.style.display =
        hasMaternalGrandParents
            ? ""
            : "none";

}

/* =================================
   11. GRAND GRAND PARENTS
   ================================= */


/* =================================
   HELPER FUNCTION
   ================================= */

function setGrandGrandParentRow(
    rowId,
    fieldId,
    person
){

    const row =
        document.getElementById(
            rowId
        );

    const field =
        document.getElementById(
            fieldId
        );


    if(
        person &&
        getName(person)
    ){

        if(field){

            field.textContent =
                getName(person);

        }

        if(row){

            row.style.display =
                "";

        }

        return true;

    }


    if(row){

        row.style.display =
            "none";

    }

    return false;

}


/* =================================
   PATERNAL GRAND PARENTS
   ================================= */


/* Grand Fa - Father */

const ggPaternalFatherFather =
    fathersFather &&
    fathersFather.fatherId
        ? findMember(
            fathersFather.fatherId
        )
        : null;


/* Grand Fa - Mother */

const ggPaternalFatherMother =
    fathersFather &&
    fathersFather.motherId
        ? findMember(
            fathersFather.motherId
        )
        : null;


/* Grand Ma - Father */

const ggPaternalMotherFather =
    fathersMother &&
    fathersMother.fatherId
        ? findMember(
            fathersMother.fatherId
        )
        : null;


/* Grand Ma - Mother */

const ggPaternalMotherMother =
    fathersMother &&
    fathersMother.motherId
        ? findMember(
            fathersMother.motherId
        )
        : null;


/* =================================
   MATERNAL GRAND PARENTS
   ================================= */


/* Grand Fa - Father */

const ggMaternalFatherFather =
    mothersFather &&
    mothersFather.fatherId
        ? findMember(
            mothersFather.fatherId
        )
        : null;


/* Grand Fa - Mother */

const ggMaternalFatherMother =
    mothersFather &&
    mothersFather.motherId
        ? findMember(
            mothersFather.motherId
        )
        : null;


/* Grand Ma - Father */

const ggMaternalMotherFather =
    mothersMother &&
    mothersMother.fatherId
        ? findMember(
            mothersMother.fatherId
        )
        : null;


/* Grand Ma - Mother */

const ggMaternalMotherMother =
    mothersMother &&
    mothersMother.motherId
        ? findMember(
            mothersMother.motherId
        )
        : null;


/* =================================
   SHOW / HIDE PATERNAL ROWS
   ================================= */

const hasGGPaternalFatherFather =
    setGrandGrandParentRow(
        "ggPaternalFatherFatherRow",
        "ggPaternalFatherFather",
        ggPaternalFatherFather
    );


const hasGGPaternalFatherMother =
    setGrandGrandParentRow(
        "ggPaternalFatherMotherRow",
        "ggPaternalFatherMother",
        ggPaternalFatherMother
    );


const hasGGPaternalMotherFather =
    setGrandGrandParentRow(
        "ggPaternalMotherFatherRow",
        "ggPaternalMotherFather",
        ggPaternalMotherFather
    );


const hasGGPaternalMotherMother =
    setGrandGrandParentRow(
        "ggPaternalMotherMotherRow",
        "ggPaternalMotherMother",
        ggPaternalMotherMother
    );


/* =================================
   SHOW / HIDE MATERNAL ROWS
   ================================= */

const hasGGMaternalFatherFather =
    setGrandGrandParentRow(
        "ggMaternalFatherFatherRow",
        "ggMaternalFatherFather",
        ggMaternalFatherFather
    );


const hasGGMaternalFatherMother =
    setGrandGrandParentRow(
        "ggMaternalFatherMotherRow",
        "ggMaternalFatherMother",
        ggMaternalFatherMother
    );


const hasGGMaternalMotherFather =
    setGrandGrandParentRow(
        "ggMaternalMotherFatherRow",
        "ggMaternalMotherFather",
        ggMaternalMotherFather
    );


const hasGGMaternalMotherMother =
    setGrandGrandParentRow(
        "ggMaternalMotherMotherRow",
        "ggMaternalMotherMother",
        ggMaternalMotherMother
    );


/* =================================
   PATERNAL TITLE SHOW / HIDE
   ================================= */

const grandGrandPaternalTitle =
    document.getElementById(
        "grandGrandPaternalTitle"
    );


const hasAnyGGPaternal =
    hasGGPaternalFatherFather ||
    hasGGPaternalFatherMother ||
    hasGGPaternalMotherFather ||
    hasGGPaternalMotherMother;


if(grandGrandPaternalTitle){

    grandGrandPaternalTitle.style.display =
        hasAnyGGPaternal
            ? ""
            : "none";

}


/* =================================
   MATERNAL TITLE SHOW / HIDE
   ================================= */

const grandGrandMaternalTitle =
    document.getElementById(
        "grandGrandMaternalTitle"
    );


const hasAnyGGMaternal =
    hasGGMaternalFatherFather ||
    hasGGMaternalFatherMother ||
    hasGGMaternalMotherFather ||
    hasGGMaternalMotherMother;


if(grandGrandMaternalTitle){

    grandGrandMaternalTitle.style.display =
        hasAnyGGMaternal
            ? ""
            : "none";

}


/* =================================
   SHOW / HIDE GRAND GRAND PARENTS
   ================================= */

const grandGrandParentsSection =
    document.getElementById(
        "relationGrandGrandParentsSection"
    );


const hasAnyGrandGrandParents =
    hasAnyGGPaternal ||
    hasAnyGGMaternal;


if(grandGrandParentsSection){

    if(hasAnyGrandGrandParents){

        grandGrandParentsSection.style.display =
            "block";

    }
    else{

        grandGrandParentsSection.style.display =
            "none";

    }

}
      
   
      
console.log(
    "RELATIONS SECTIONS IN DOM:",
    document.querySelectorAll(
        ".relations-section"
    ).length
);

console.log(
    "RELATIONS PAGE IN DOM:",
    document.querySelector(
        ".relations-page"
    )
);

    console.log(
    "RELATIONS COMPLETE:",
    {
        partner,
        children,
        father,
        mother,
        siblings,
        fatherSiblings,
        motherSiblings,
        fatherInLaw,
        motherInLaw,
        fatherInLawSiblings,
        motherInLawSiblings
    }
);
      
}


/* =====================================
   FAMILY → SEARCH / EDIT MEMBER
   ===================================== */

/* =====================================
   FAMILY → SEARCH / EDIT MEMBER
   ===================================== */

function bindSearchMemberButton(){

    const searchMemberBtn =
        document.getElementById(
            "searchMemberBtn"
        );


    if(!searchMemberBtn){
        return;
    }

window.openSearchEditMemberPage =
    function(){
    
            const currentFamily =
                JSON.parse(
                    localStorage.getItem(
                        "currentFamily"
                    ) || "null"
                );


            if(!currentFamily){

                alert(
                    "Family not found."
                );

                return;

            }


            /* =================================
               LOAD SEARCH PAGE
               ================================= */

            showPage(

                pageTitle(
                    "Search - Edit Member",
                    "images/colorbtns/CustomSearch1.png"
                )

                +

                `
                <div class="common-page">

                    <div class="common-form">

                        <div class="common-form-group">

                            <label
                                class="common-form-label"
                                for="searchEditMember">
                                Member
                            </label>

                            <span
                                class="common-form-colon">
                                :
                            </span>


                            <div
                                class="search-edit-member-wrapper">

                                <input
                                    type="text"
                                    id="searchEditMember"
                                    class="common-form-input"
                                    placeholder="Search Member"
                                    autocomplete="off">


                                <div
                                    id="searchEditMemberDropdown"
                                    class="relations-member-dropdown"
                                    style="display:none;">
                                </div>

                            </div>

                        </div>

                    </div>


<div class="search-edit-bottom-actions">
    <button
        type="button"
        id="searchEditBackBtn"
        class="back-btn">
        ← Back
    </button>

    <button
        type="button"
        id="searchEditHomeBtn"
        class="back-btn">
        🏠 Home
    </button>

</div>
                </div>
                `
            );


            const searchInput =
                document.getElementById(
                    "searchEditMember"
                );


            const dropdown =
                document.getElementById(
                    "searchEditMemberDropdown"
                );


            const backBtn =
                document.getElementById(
                    "searchEditBackBtn"
                );
            const homeBtn =
    document.getElementById(
        "searchEditHomeBtn"
    );

            /* =================================
               VARIABLES
               ================================= */
let members =
    JSON.parse(
        localStorage.getItem(
            "familyMembers"
        ) || "[]"
    );


let membersLoading =
    members.length === 0;


let membersLoaded =
    members.length > 0;

            /* =================================
               BACK
               ================================= */

            if(backBtn){

                backBtn.onclick =
                    function(){

                        const familyBtn =
                            document.getElementById(
                                "familyBtn"
                            );


                        if(familyBtn){

                            familyBtn.click();

                        }

                    };

            }

/* =================================
   HOME
   ================================= */

if(homeBtn){

    homeBtn.onclick =
        function(){

            const mainHomeBtn =
                document.getElementById(
                    "homeBtn"
                );

            if(mainHomeBtn){
                mainHomeBtn.click();
            }

        };

}
            /* =================================
               SHOW SEARCH MEMBERS
               ================================= */

            function showSearchMembers(){


                /* =============================
                   STILL LOADING
                   ============================= */

                if(membersLoading){

                    dropdown.innerHTML =
                        `
                        <div class="relations-no-match">
                            Loading members...
                        </div>
                        `;


                    dropdown.style.display =
                        "block";


                    return;

                }


                /* =============================
                   NO MEMBERS
                   ============================= */

                if(
                    membersLoaded &&
                    members.length === 0
                ){

                    dropdown.innerHTML =
                        `
                        <div class="relations-no-match">
                            No members found
                        </div>
                        `;


                    dropdown.style.display =
                        "block";


                    return;

                }


                /* =============================
                   SEARCH TEXT
                   ============================= */

                const searchText =
                    String(
                        searchInput.value || ""
                    )
                    .trim()
                    .toLowerCase();


                dropdown.innerHTML =
                    "";


                /* =============================
                   FILTER MEMBERS
                   ============================= */

                const matchingMembers =
                    members.filter(
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


                            const memberId =
                                String(
                                    member.memberId || ""
                                )
                                .trim()
                                .toLowerCase();


                            if(
                                searchText === ""
                            ){

                                return (
                                    memberName !== ""
                                );

                            }


                            return (

                                memberName.includes(
                                    searchText
                                )

                                ||

                                memberId.includes(
                                    searchText
                                )

                            );

                        }
                    );


                /* =============================
                   NO MATCH
                   ============================= */

                if(
                    matchingMembers.length === 0
                ){

                    dropdown.innerHTML =
                        `
                        <div class="relations-no-match">
                            No matching member
                        </div>
                        `;


                    dropdown.style.display =
                        "block";


                    return;

                }


                /* =============================
                   CREATE MEMBER LIST
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
                            (member.name || "") +
                            " (" +
                            (member.memberId || "") +
                            ")";


                        option.dataset.memberId =
                            member.memberId;


                       option.onclick =
    function(){

        console.log(
            "SELECTED MEMBER:",
            member
        );


        /* =================================
           SAVE SELECTED MEMBER FOR EDIT
           ================================= */

        localStorage.setItem(
            "editMember",
            JSON.stringify(member)
        );


        searchInput.value =
            member.name || "";


        dropdown.innerHTML =
            "";


        dropdown.style.display =
            "none";


        /* =================================
           FIRST OPEN FAMILY PAGE
           ================================= */

        const familyBtn =
            document.getElementById(
                "familyBtn"
            );


        if(!familyBtn){

            console.error(
                "Family button not found"
            );

            return;

        }


        familyBtn.click();


        /* =================================
           THEN OPEN ADD MEMBER PAGE
           ================================= */

        setTimeout(
            function(){

                const addMemberBtn =
                    document.getElementById(
                        "addMemberBtn"
                    );


               if(addMemberBtn){

    sessionStorage.setItem(
        "openMemberMode",
        "edit"
    );

    addMemberBtn.click();

}                else{

                    console.error(
                        "Add Member button not found"
                    );

                }

            },
            50
        );

    };
                        dropdown.appendChild(
                            option
                        );

                    }
                );


                dropdown.style.display =
                    "block";

            }


            /* =================================
               SEARCH EVENTS

               IMPORTANT:
               THESE ARE ADDED BEFORE FETCH
               ================================= */

            searchInput.addEventListener(
                "focus",
                function(){

                    showSearchMembers();

                }
            );


            searchInput.addEventListener(
                "input",
                function(){

                    showSearchMembers();

                }
            );


            /* =================================
               OUTSIDE CLICK
               ================================= */

            document.addEventListener(
                "click",
                function(event){

                    if(
                        !searchInput.contains(
                            event.target
                        )

                        &&

                        !dropdown.contains(
                            event.target
                        )
                    ){

                        dropdown.style.display =
                            "none";

                    }

                }
            );


            /* =================================
               GET MEMBERS FROM GOOGLE SHEET
               ================================= */

            async function loadSearchMembers(){

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
                                method:
                                    "POST",

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
                        "SEARCH EDIT MEMBERS:",
                        result
                    );


                    if(
                        result.status !==
                        "success"
                    ){

                        membersLoading =
                            false;

                        membersLoaded =
                            false;


                        dropdown.innerHTML =
                            `
                            <div class="relations-no-match">
                                Members could not be loaded
                            </div>
                            `;


                        if(
                            document.activeElement ===
                            searchInput
                        ){

                            dropdown.style.display =
                                "block";

                        }


                        return;

                    }


                    members =
                        Array.isArray(
                            result.members
                        )
                            ? result.members
                            : [];
localStorage.setItem(
    "familyMembers",
    JSON.stringify(
        members
    )
);

                    membersLoading =
                        false;


                    membersLoaded =
                        true;


                    console.log(
                        "SEARCH MEMBERS COUNT:",
                        members.length
                    );


                    /* =============================
                       USER ALREADY CLICKED INPUT
                       → SHOW LIST IMMEDIATELY
                       ============================= */

                    if(
                        document.activeElement ===
                        searchInput
                    ){

                        showSearchMembers();

                    }


                }
                catch(error){

                    membersLoading =
                        false;

                    membersLoaded =
                        false;


                    console.error(
                        "Search Edit Load Error:",
                        error
                    );


                    dropdown.innerHTML =
                        `
                        <div class="relations-no-match">
                            Unable to load members
                        </div>
                        `;


                    if(
                        document.activeElement ===
                        searchInput
                    ){

                        dropdown.style.display =
                            "block";

                    }

                }

            }


            /* =================================
               START LOADING MEMBERS
               ================================= */

            loadSearchMembers();

        };

    searchMemberBtn.onclick =
        window.openSearchEditMemberPage;

}

/* =====================================
   BIND SEARCH MEMBER BUTTON
   ================================= */

bindSearchMemberButton();


   
/* =====================================
   FAMILY → ADD MEMBER
   ===================================== */

function bindAddMemberButton(){

    const addMemberBtn =
        document.getElementById("addMemberBtn");

    if(!addMemberBtn) return;

   addMemberBtn.onclick = () => {

    /* =================================
       ADD / EDIT MEMBER MODE
       ================================= */

    const openMemberMode =
        sessionStorage.getItem(
            "openMemberMode"
        ) || "add";


    sessionStorage.removeItem(
        "openMemberMode"
    );


    /* NORMAL ADD MEMBER
       → REMOVE OLD EDIT MEMBER */

    if(openMemberMode !== "edit"){

        localStorage.removeItem(
            "editMember"
        );

    }


    console.log(
        "OPEN MEMBER MODE:",
        openMemberMode
    );


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

           <div
    class="common-form-group"
    style="display:none;">

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

<div
    class="common-form-group"
    style="display:none;">
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
     MARRIAGE DATE
     ================================= -->

<div
    id="marriageDateGroup"
    class="common-form-group"
    style="display:none;">

    <label
        class="common-form-label"
        for="memberMarriageDate">
        Marriage Date
    </label>

    <span class="common-form-colon">
        :
    </span>

    <input
        type="date"
        id="memberMarriageDate"
        class="common-form-input">

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
<option value="">
        Select Partner
    </option>

    <option value="__ADD_NEW__">
        Add New Person
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
<option value="">
            Select Father
        </option>
        <option value="__ADD_NEW__">
            Add New Person
            
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
 <option value="">
            Select Mother
        </option>

        <option value="__ADD_NEW__">
            Add New Person
        </option>

       
    </select>

</div>

<!-- =================================
     NATIVE PLACE
     ================================= -->

<div class="common-form-group">

    <label
        class="common-form-label"
        for="memberNativePlace">
        Native Place
    </label>

    <span class="common-form-colon">
        :
    </span>

    <input
        type="text"
        id="memberNativePlace"
        class="common-form-input"
        placeholder="Enter Native Place"
            maxlength="15"

        autocomplete="off">

</div>


<!-- =================================
     OCCUPATION
     ================================= -->

<div class="common-form-group">

    <label
        class="common-form-label"
        for="memberOccupation">
        Occupation
    </label>

    <span class="common-form-colon">
        :
    </span>

    <div class="occupation-dropdown">

        <input
            type="text"
            id="memberOccupation"
            class="common-form-input"
            placeholder="Select / Enter Occupation"
            maxlength="15"
            autocomplete="off">

        <div
            id="occupationList"
            class="occupation-list">

            <div class="occupation-option">
                Engineer
            </div>

            <div class="occupation-option">
                Doctor
            </div>

            <div class="occupation-option">
                Teacher
            </div>

            <div class="occupation-option">
                Government Employee
            </div>
              <div class="occupation-option">
                Private Employee
                 </div>
             <div class="occupation-option">
                Software Engineer
            </div>

            <div class="occupation-option">
                Business
            </div>

            <div class="occupation-option">
                Farmer
            </div>

        </div>

    </div>

</div>

<!-- =================================
     QUALIFICATION
     ================================= -->

<div class="common-form-group">

    <label
        class="common-form-label"
        for="memberQualification">
        Qualification
    </label>

    <span class="common-form-colon">
        :
    </span>

    <div
        class="qualification-dropdown">

        <input
            type="text"
            id="memberQualification"
            class="common-form-input"
            placeholder="Select / Enter Qualification"
            maxlength="15"
            autocomplete="off">

        <div
            id="qualificationList"
            class="qualification-list">

            <div
                class="qualification-option">
                10th
            </div>

            <div
                class="qualification-option">
                Intermediate
            </div>

            <div
                class="qualification-option">
                Diploma
            </div>

            <div
                class="qualification-option">
                Graduation
            </div>

            <div
                class="qualification-option">
                Post Graduation
            </div>

            <div
                class="qualification-option">
                PhD
            </div>

        </div>

    </div>

</div>
<!-- =================================
     LIFE STATUS
     ================================= -->

<div class="common-form-group">

    <label
        class="common-form-label"
        for="memberLifeStatus">
        Life Status
    </label>

    <span class="common-form-colon">
        :
    </span>

    <select
        id="memberLifeStatus"
        class="common-form-select"
        required>

        <option value="">
            Select Status
        </option>

        <option value="Living">
            Living
        </option>

        <option value="Deceased">
            Deceased
        </option>

    </select>

</div>


<!-- =================================
     BLOOD GROUP
     ================================= -->

<div
    id="bloodGroupGroup"
    class="common-form-group"
    style="display:none;">

    <label
        class="common-form-label"
        for="memberBloodGroup">
        Blood Group
    </label>

    <span class="common-form-colon">
        :
    </span>

    <select
        id="memberBloodGroup"
        class="common-form-select">

        <option value="">
            Select Blood Group
        </option>

        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>

    </select>

</div>


<!-- =================================
     MOBILE NUMBER
     ================================= -->

<div
    id="mobileNumberGroup"
    class="common-form-group"
    style="display:none;">

    <label
        class="common-form-label"
        for="memberMobileNumber">
        Mobile Number
    </label>

    <span class="common-form-colon">
        :
    </span>

    <input
        type="tel"
        id="memberMobileNumber"
        class="common-form-input"
        placeholder="Enter Mobile Number"
        maxlength="10"
    inputmode="numeric"
    pattern="[0-9]{10}"
        autocomplete="tel">

</div>


<!-- =================================
     CURRENT PLACE
     ================================= -->

<div
    id="currentPlaceGroup"
    class="common-form-group"
    style="display:none;">

    <label
        class="common-form-label"
        for="memberCurrentPlace">
        Current Place
    </label>

    <span class="common-form-colon">
        :
    </span>

    <input
        type="text"
        id="memberCurrentPlace"
        class="common-form-input"
        placeholder="Enter Current Place"
        autocomplete="off">

</div>

<!-- =================================
     DECEASED DATE
     ================================= -->

<div
    id="deceasedDateGroup"
    class="common-form-group"
    style="display:none;">

    <label
        class="common-form-label"
        for="memberDeceasedDate">
        Deceased Date
    </label>

    <span class="common-form-colon">
        :
    </span>

    <input
        type="date"
        id="memberDeceasedDate"
        class="common-form-input">

</div>

<!-- =================================
     ABOUT ME
     ================================= -->

<div class="common-form-group">

    <label
        class="common-form-label"
        for="memberAboutMe">
        About Me
    </label>

    <span class="common-form-colon">
        :
    </span>

    <textarea
    id="memberAboutMe"
    class="common-form-input"
    maxlength="500"
    rows="10"
    placeholder="Write about yourself..."
    autocomplete="off"></textarea>
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
   LIFE STATUS LOGIC
   ================================= */

const memberLifeStatus =
    document.getElementById(
        "memberLifeStatus"
    );

const bloodGroupGroup =
    document.getElementById(
        "bloodGroupGroup"
    );

const mobileNumberGroup =
    document.getElementById(
        "mobileNumberGroup"
    );

const currentPlaceGroup =
    document.getElementById(
        "currentPlaceGroup"
    );
const deceasedDateGroup =
    document.getElementById(
        "deceasedDateGroup"
    );

/* =================================
   LIFE STATUS CHANGE
   ================================= */

if(memberLifeStatus){

    memberLifeStatus.addEventListener(
        "change",
        function(){

            /* =============================
               LIVING
               ============================= */

            if(this.value === "Living"){

                if(bloodGroupGroup){

                    bloodGroupGroup.style.display =
                        "flex";

                }

                if(mobileNumberGroup){

                    mobileNumberGroup.style.display =
                        "flex";

                }

                if(currentPlaceGroup){

                    currentPlaceGroup.style.display =
                        "flex";

                }
               if(deceasedDateGroup){

    deceasedDateGroup.style.display =
        "none";

}

            }


            /* =============================
               DECEASED
               ============================= */

            else if(this.value === "Deceased"){

                if(bloodGroupGroup){

                    bloodGroupGroup.style.display =
                        "none";

                }

                if(mobileNumberGroup){

                    mobileNumberGroup.style.display =
                        "none";

                }

                if(currentPlaceGroup){

                    currentPlaceGroup.style.display =
                        "none";

                }
               if(deceasedDateGroup){

    deceasedDateGroup.style.display =
        "flex";

}

            }


            /* =============================
               NOTHING SELECTED
               ============================= */

            else{

                if(bloodGroupGroup){

                    bloodGroupGroup.style.display =
                        "none";

                }

                if(mobileNumberGroup){

                    mobileNumberGroup.style.display =
                        "none";

                }

                if(currentPlaceGroup){

                    currentPlaceGroup.style.display =
                        "none";

                }
               if(deceasedDateGroup){

    deceasedDateGroup.style.display =
        "none";

}

            }

        }
    );

}
       
   /* =================================
   MARITAL STATUS LOGIC
   ================================= */

const memberDob =
    document.getElementById(
        "memberDob"
    );
       const memberOccupation =
    document.getElementById(
        "memberOccupation"
    );
       /* =================================
   OCCUPATION DROPDOWN
   ================================= */

const occupationList =
    document.getElementById(
        "occupationList"
    );

const occupationOptions =
    document.querySelectorAll(
        ".occupation-option"
    );


if(memberOccupation){

    memberOccupation.addEventListener(
        "focus",
        function(){

            if(occupationList){

                occupationList.style.display =
                    "block";

            }

        }
    );


    memberOccupation.addEventListener(
        "input",
        function(){

            const searchText =
                this.value
                    .trim()
                    .toLowerCase();


            occupationOptions.forEach(
                function(option){

                    const text =
                        option.textContent
                            .trim()
                            .toLowerCase();


                    if(
                        searchText === "" ||
                        text.includes(searchText)
                    ){

                        option.style.display =
                            "block";

                    }
                    else{

                        option.style.display =
                            "none";

                    }

                }
            );


            if(occupationList){

                occupationList.style.display =
                    "block";

            }

        }
    );


    occupationOptions.forEach(
        function(option){

            option.addEventListener(
                "click",
                function(){

                    memberOccupation.value =
                        this.textContent.trim();


                    if(occupationList){

                        occupationList.style.display =
                            "none";

                    }

                }
            );

        }
    );

}
       /* =================================
   CLOSE OCCUPATION DROPDOWN
   WHEN CLICKING OUTSIDE
   ================================= */

document.addEventListener(
    "click",
    function(event){

        const occupationDropdown =
            document.querySelector(
                ".occupation-dropdown"
            );

        if(!occupationDropdown){
            return;
        }

        if(
            !occupationDropdown.contains(
                event.target
            )
        ){

            if(occupationList){

                occupationList.style.display =
                    "none";

            }

        }

    }
);
       
/* =====================================
   EDIT MEMBER MODE
   ===================================== */

const editMember =
    JSON.parse(
        localStorage.getItem(
            "editMember"
        ) || "null"
    );


if(editMember){

    console.log(
        "EDIT MEMBER LOADED:",
        editMember
    );


    /* =================================
       CHANGE PAGE TITLE
       ================================= */

    const pageHeading =
        document.querySelector(
            "h2.page-title"
        );


    if(pageHeading){

        pageHeading.textContent =
    "Update Member";

    }


    /* =================================
       MEMBER ID
       ================================= */

    const editMemberIdField =
        document.getElementById(
            "memberId"
        );


    if(editMemberIdField){

        editMemberIdField.textContent =
            editMember.memberId || "-";


        editMemberIdField.dataset.memberId =
            editMember.memberId || "";

    }


    /* =================================
       NAME
       ================================= */

    const editNameField =
        document.getElementById(
            "memberName"
        );


    if(editNameField){

        editNameField.value =
            editMember.name || "";

    }


    /* =================================
       GENDER
       ================================= */

    const editGenderField =
        document.getElementById(
            "memberGender"
        );


    if(editGenderField){

        editGenderField.value =
            editMember.gender || "";

    }


    /* =================================
       DATE OF BIRTH
       ================================= */

   const editDobField =
    document.getElementById(
        "memberDob"
    );


if(editDobField){

    let dobValue =
        String(
            editMember.dob || ""
        ).trim();


    if(
        dobValue.includes("T")
    ){

        dobValue =
            dobValue.split("T")[0];

    }

    else if(
        dobValue.includes("/")
    ){

        const parts =
            dobValue.split("/");

        if(parts.length === 3){

            dobValue =
                parts[2] +
                "-" +
                parts[1].padStart(2, "0") +
                "-" +
                parts[0].padStart(2, "0");

        }

    }

    else if(
        /^\d{2}-\d{2}-\d{4}$/.test(
            dobValue
        )
    ){

        const parts =
            dobValue.split("-");

        dobValue =
            parts[2] +
            "-" +
            parts[1] +
            "-" +
            parts[0];

    }


    editDobField.value =
        dobValue;


    console.log(
        "EDIT DOB:",
        editMember.dob,
        "→",
        dobValue
    );

}

/* =================================
   MARITAL STATUS
   ================================= */

const editMaritalStatus =
    String(
        editMember.maritalStatus || ""
    )
    .trim()
    .toLowerCase();

const editMarriedYes =
    document.getElementById(
        "marriedYes"
    );

const editMarriedNo =
    document.getElementById(
        "marriedNo"
    );


if(editMaritalStatus === "yes"){

    if(editMarriedYes){
        editMarriedYes.checked = true;
    }

    if(editMarriedNo){
        editMarriedNo.checked = false;
    }

    /* SHOW MARRIAGE DATE ROW */

    const editMarriageDateGroup =
        document.getElementById(
            "marriageDateGroup"
        );

    if(editMarriageDateGroup){

        editMarriageDateGroup.style.display =
            "flex";

    }

}
else if(editMaritalStatus === "no"){

    if(editMarriedYes){
        editMarriedYes.checked = false;
    }

    if(editMarriedNo){
        editMarriedNo.checked = true;
    }

    const editMarriageDateGroup =
        document.getElementById(
            "marriageDateGroup"
        );

    if(editMarriageDateGroup){

        editMarriageDateGroup.style.display =
            "none";

    }

}
   
/* =================================
   MARRIAGE DATE
   ================================= */

const editMarriageDateField =
    document.getElementById(
        "memberMarriageDate"
    );

if(editMarriageDateField){

    let marriageDateValue =
        String(
            editMember.marriageDate || ""
        ).trim();
console.log(
    "EDIT MARRIAGE DATE RAW:",
    editMember.marriageDate
);

console.log(
    "FULL EDIT MEMBER:",
    editMember
);
    if(marriageDateValue.includes("T")){

        marriageDateValue =
            marriageDateValue.split("T")[0];

    }

    else if(marriageDateValue.includes("/")){

        const parts =
            marriageDateValue.split("/");

        if(parts.length === 3){

            marriageDateValue =
                parts[2] +
                "-" +
                parts[1].padStart(2, "0") +
                "-" +
                parts[0].padStart(2, "0");

        }

    }

    else if(
        /^\d{2}-\d{2}-\d{4}$/.test(
            marriageDateValue
        )
    ){

        const parts =
            marriageDateValue.split("-");

        marriageDateValue =
            parts[2] +
            "-" +
            parts[1] +
            "-" +
            parts[0];

    }

    editMarriageDateField.value =
        marriageDateValue;

}

/* =================================
   EDIT MEMBER - ADDITIONAL DETAILS
   ================================= */

/* LIFE STATUS */

const editLifeStatusField =
    document.getElementById(
        "memberLifeStatus"
    );

if(editLifeStatusField){

    editLifeStatusField.value =
        editMember.lifeStatus || "";

    editLifeStatusField.dispatchEvent(
        new Event(
            "change",
            {
                bubbles: true
            }
        )
    );

}

/* NATIVE PLACE */

const editNativePlaceField =
    document.getElementById(
        "memberNativePlace"
    );

if(editNativePlaceField){

    editNativePlaceField.value =
        editMember.nativePlace || "";

}


/* OCCUPATION */

const editOccupationField =
    document.getElementById(
        "memberOccupation"
    );

if(editOccupationField){

    editOccupationField.value =
        editMember.occupation || "";

}


/* QUALIFICATION */

const editQualificationField =
    document.getElementById(
        "memberQualification"
    );

if(editQualificationField){

    editQualificationField.value =
        editMember.qualification || "";

}


/* BLOOD GROUP */

const editBloodGroupField =
    document.getElementById(
        "memberBloodGroup"
    );

if(editBloodGroupField){

    editBloodGroupField.value =
        editMember.bloodGroup || "";

}


/* MOBILE NUMBER */

const editMobileNumberField =
    document.getElementById(
        "memberMobileNumber"
    );

if(editMobileNumberField){

    editMobileNumberField.value =
        editMember.mobileNumber || "";

}


/* CURRENT PLACE */

const editCurrentPlaceField =
    document.getElementById(
        "memberCurrentPlace"
    );

if(editCurrentPlaceField){

    editCurrentPlaceField.value =
        editMember.currentPlace || "";

}


/* DECEASED DATE */

const editDeceasedDateField =
    document.getElementById(
        "memberDeceasedDate"
    );

if(editDeceasedDateField){

    let deceasedDateValue =
        String(
            editMember.deceasedDate || ""
        ).trim();

    if(
        deceasedDateValue.includes("T")
    ){

        deceasedDateValue =
            deceasedDateValue.split("T")[0];

    }

    editDeceasedDateField.value =
        deceasedDateValue;

}


/* ABOUT ME */

const editAboutMeField =
    document.getElementById(
        "memberAboutMe"
    );

if(editAboutMeField){

    editAboutMeField.value =
        editMember.aboutMe || "";

}
   
}

/* =================================
   LOAD RELATIONS AFTER EDIT VALUES
   ================================= */

loadMemberRelations();
/* =================================
   ENABLE FORM AFTER NAME + GENDER + DOB
   ================================= */

const memberName =
    document.getElementById(
        "memberName"
    );
const memberQualification =
    document.getElementById(
        "memberQualification"
    );
/* =================================
   QUALIFICATION DROPDOWN
   ================================= */

const qualificationList =
    document.getElementById(
        "qualificationList"
    );


const qualificationOptions =
    document.querySelectorAll(
        ".qualification-option"
    );


if(memberQualification){

    memberQualification.addEventListener(
        "focus",
        function(){

            if(qualificationList){

                qualificationList.style.display =
                    "block";

            }

        }
    );


    memberQualification.addEventListener(
        "input",
        function(){

            const searchText =
                this.value
                    .trim()
                    .toLowerCase();


            qualificationOptions.forEach(
                function(option){

                    const text =
                        option.textContent
                            .trim()
                            .toLowerCase();


                    if(
                        searchText === "" ||
                        text.includes(searchText)
                    ){

                        option.style.display =
                            "block";

                    }
                    else{

                        option.style.display =
                            "none";

                    }

                }
            );


            if(qualificationList){

                qualificationList.style.display =
                    "block";

            }

        }
    );


    qualificationOptions.forEach(
        function(option){

            option.addEventListener(
                "click",
                function(){

                    memberQualification.value =
                        this.textContent.trim();


                    if(qualificationList){

                        qualificationList.style.display =
                            "none";

                    }

                }
            );

        }
    );

}
   /* =================================
   CLOSE QUALIFICATION DROPDOWN
   WHEN CLICKING OUTSIDE
   ================================= */

document.addEventListener(
    "click",
    function(event){

        const qualificationDropdown =
            document.querySelector(
                ".qualification-dropdown"
            );

        if(!qualificationDropdown){
            return;
        }

        if(
            !qualificationDropdown.contains(
                event.target
            )
        ){

            if(qualificationList){

                qualificationList.style.display =
                    "none";

            }

        }

    }
);    
/* =================================
   ENABLE / DISABLE MEMBER FORM
   NAME + GENDER + DOB REQUIRED
   ================================= */

function updateMemberFormState(){

    const nameReady =
        memberName &&
        memberName.value.trim() !== "";

    const genderReady =
        memberGender &&
        memberGender.value !== "";

    const dobReady =
        memberDob &&
        memberDob.value !== "";

    const basicDetailsReady =
        nameReady &&
        genderReady &&
        dobReady;


    /* =============================
       ELEMENTS TO ENABLE / DISABLE
       ============================= */

    const fieldsToEnable = [

        "memberPhotoBtn",

        "marriedYes",
        "marriedNo",

        "memberPartner",

        "memberFather",
        "memberMother",

        "memberLifeStatus",

        "memberNativePlace",
        "memberOccupation",
        "memberQualification",
        "memberAboutMe",

        "memberBloodGroup",
        "memberMobileNumber",
        "memberCurrentPlace",

        "memberDeceasedDate"

    ];


    /* =============================
       APPLY DISABLED STATE
       ============================= */

    fieldsToEnable.forEach(
        function(id){

            const element =
                document.getElementById(id);

            if(element){

                element.disabled =
                    !basicDetailsReady;

            }

        }
    );


    /* =============================
       PHOTO BUTTON
       ============================= */

    const photoBtn =
        document.getElementById(
            "memberPhotoBtn"
        );

    if(photoBtn){

        photoBtn.disabled =
            !basicDetailsReady;

    }

   /* ================================
   LIFE STATUS CHANGE
   CLEAR DECEASED DATE WHEN LIVING
   ================================ */

const lifeStatusField =
    document.getElementById(
        "memberLifeStatus"
    );

const deceasedDateField =
    document.getElementById(
        "memberDeceasedDate"
    );


if(lifeStatusField){

    lifeStatusField.onchange =
        function(){

            const status =
                String(
                    lifeStatusField.value || ""
                )
                .trim()
                .toLowerCase();


            /* =========================
               LIVING
               ========================= */

            if(
                status === "living"
            ){

                /* CLEAR OLD DECEASED DATE */

                if(deceasedDateField){

                    deceasedDateField.value =
                        "";

                }


                /* DISABLE DECEASED DATE */

                if(deceasedDateField){

                    deceasedDateField.disabled =
                        true;

                }


                /* HIDE DECEASED DATE ROW */

                const deceasedGroup =
                    deceasedDateField
                        ?.closest(
                            ".common-form-group"
                        );

                if(deceasedGroup){

                    deceasedGroup.style.display =
                        "none";

                }

            }


            /* =========================
               DECEASED
               ========================= */

            else if(
                status === "deceased"
            ){

                /* ENABLE DECEASED DATE */

                if(deceasedDateField){

                    deceasedDateField.disabled =
                        false;

                }


                /* SHOW DECEASED DATE ROW */

                const deceasedGroup =
                    deceasedDateField
                        ?.closest(
                            ".common-form-group"
                        );

                if(deceasedGroup){

                    deceasedGroup.style.display =
                        "";

                }

            }

        };

}

}
       
/* ================================
   MOBILE NUMBER - NUMBERS ONLY
   ================================ */

const memberMobileNumber =
    document.getElementById(
        "memberMobileNumber"
    );

if(memberMobileNumber){

    memberMobileNumber.addEventListener(
        "input",
        function(){

            this.value =
                this.value.replace(
                    /[^0-9]/g,
                    ""
                );

        }
    );

}
       if(memberName){

    memberName.addEventListener(
        "input",
        updateMemberFormState
    );

}
       if(memberGender){

    memberGender.addEventListener(
        "change",
        updateMemberFormState
    );

}
       if(memberDob){

    memberDob.addEventListener(
        "change",
        updateMemberFormState
    );

}
       updateMemberFormState();
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

const marriageDateGroup =
    document.getElementById(
        "marriageDateGroup"
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
       if(marriageDateGroup){

        marriageDateGroup.style.display =
            "none";

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

    if(
        marriedYes &&
        marriedYes.checked
    ){

        showPartner();

        if(marriageDateGroup){
            marriageDateGroup.style.display =
                "flex";
        }

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


/* =============================
   SHOW MARRIAGE DATE
   ============================= */

if(marriageDateGroup){

    marriageDateGroup.style.display =
        "flex";

}
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


/* =============================
   SHOW MARRIAGE DATE
   ============================= */

if(marriageDateGroup){

    marriageDateGroup.style.display =
        "flex";

}
        }
    );

}



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

/* =================================
   LOAD MEMBERS FROM CACHE
   ================================= */

let members = [];

try{

    const cachedMembers =
        JSON.parse(
            localStorage.getItem(
                "familyMembers"
            ) || "[]"
        );


    if(
        Array.isArray(cachedMembers)
    ){

        members =
            cachedMembers;

    }


    console.log(
        "RELATIONS MEMBERS FROM CACHE:",
        members.length
    );

}
catch(error){

    console.error(
        "Members Cache Error:",
        error
    );

    members = [];

}
   
/* =================================
   CURRENT FAMILY MEMBERS
   ================================= */

const filteredFamilyMembers =
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
   FALLBACK

   Search/Edit API already fetched
   members using current familyId.
   ================================= */

const familyMembers =
    filteredFamilyMembers.length > 0
        ? filteredFamilyMembers
        : members;


console.log(
    "TOTAL CACHE MEMBERS:",
    members.length,
    "CURRENT FAMILY MEMBERS:",
    familyMembers.length
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
    select.children[1] || null
);

    }


    addNewPersonOption(
        partnerField
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
   FATHER     MALE + MARRIED   + 15 YEARS OLDER
   ============================= */

if(
    memberGender === "male" &&
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
   MOTHER   FEMALE + MARRIED   + 15 YEARS OLDER
   ============================= */

if(
    memberGender === "female" &&
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
   ADD NEW PERSON
   FATHER / MOTHER
   ================================= */

if(fatherField){

    addNewPersonOption(
        fatherField
    );

}

if(motherField){

    addNewPersonOption(
        motherField
    );

}

   /* =====================================
   EDIT MEMBER - SELECT EXISTING RELATIONS
   ===================================== */

const relationEditMember =
    JSON.parse(
        localStorage.getItem(
            "editMember"
        ) || "null"
    );


if(
    relationEditMember &&
    String(
        relationEditMember.memberId || ""
    ).trim() === currentMemberId
){

    /* =================================
       HELPER
       ================================= */

    function selectExistingRelation(
        selectField,
        relationId
    ){

        if(
            !selectField ||
            !relationId
        ){
            return;
        }


        const relationIdText =
            String(
                relationId
            ).trim();


        const relationMember =
            familyMembers.find(
                function(member){

                    return String(
                        member.memberId || ""
                    ).trim() ===
                    relationIdText;

                }
            );


        if(!relationMember){
            return;
        }


        /* CHECK WHETHER OPTION EXISTS */

        const optionExists =
            Array.from(
                selectField.options
            ).some(
                function(option){

                    return String(
                        option.value
                    ) === relationIdText;

                }
            );


        /* ADD OPTION IF FILTER DID NOT ADD IT */

        if(!optionExists){

            addMemberOption(
                selectField,
                relationMember
            );

        }


        /* SELECT EXISTING VALUE */

        selectField.value =
            relationIdText;

    }


    /* =================================
       FATHER
       ================================= */

    selectExistingRelation(
        fatherField,
        relationEditMember.fatherId
    );


    /* =================================
       MOTHER
       ================================= */

    selectExistingRelation(
        motherField,
        relationEditMember.motherId
    );


    /* =================================
       PARTNER
       ================================= */

    selectExistingRelation(
        partnerField,
        relationEditMember.partnerId
    );

}
/* =================================
   REFRESH RELATIONS WHEN GENDER CHANGES
   ================================= */

if(genderField){

    genderField.onchange = function(){

        loadMemberRelations();

    };

}


/* =================================
   REFRESH RELATIONS WHEN DOB CHANGES
   ================================= */

const dobField =
    document.getElementById(
        "memberDob"
    );

if(dobField){

    dobField.onchange = function(){

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
        editMember
            ? "Update"
            : "Save",
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
   DECEASED DATE VALIDATION
   ================================ */

const deceasedDateField =
    document.getElementById(
        "memberDeceasedDate"
    );

const deceasedDate =
    deceasedDateField
        ? deceasedDateField.value
        : "";


if(deceasedDate){

    const selectedDeceasedDate =
        new Date(deceasedDate);

    const todayDeceasedDate =
        new Date();

    todayDeceasedDate.setHours(
        0, 0, 0, 0
    );

    selectedDeceasedDate.setHours(
        0, 0, 0, 0
    );


    if(
        selectedDeceasedDate >
        todayDeceasedDate
    ){

        showMessage(
            "Future date not allowed.",
            "warning",
            3000
        );

        return;

    }

/* ================================
   DECEASED DATE BEFORE DOB
   ================================ */

if(
    selectedDeceasedDate <
    selectedDob
){

    showMessage(
        "Date cannot be before Date of Birth.",
        "warning",
        3000
    );

    return;

}
   
}

   /* ================================
   MARRIAGE DATE VALIDATION
   ================================ */

const marriageDateField =
    document.getElementById(
        "memberMarriageDate"
    );

const marriageDate =
    marriageDateField
        ? marriageDateField.value
        : "";


if(marriageDate){

    const selectedMarriageDate =
        new Date(marriageDate);

    selectedMarriageDate.setHours(
        0, 0, 0, 0
    );


    /* ================================
       MARRIAGE DATE BEFORE DOB
       ================================ */

    if(
        selectedMarriageDate <
        selectedDob
    ){

        showMessage(
            "Marriage Date cannot be before Date of Birth.",
            "warning",
            3000
        );

        return;

    }


    /* ================================
       FUTURE MARRIAGE DATE
       ================================ */

    if(
        selectedMarriageDate >
        todayDate
    ){

        showMessage(
            "Future date not allowed.",
            "warning",
            3000
        );

        return;

    }

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
   MARRIAGE DATE
   ================================ */

   /* ================================
   DECEASED DATE AFTER MARRIAGE DATE
   ================================ */

if(
    maritalStatus.toLowerCase() === "yes" &&
    deceasedDate &&
    marriageDate
){

    const selectedMarriageDate =
        new Date(marriageDate);

    const selectedDeceasedDate =
        new Date(deceasedDate);

    selectedMarriageDate.setHours(
        0, 0, 0, 0
    );

    selectedDeceasedDate.setHours(
        0, 0, 0, 0
    );


    if(
        selectedDeceasedDate <=
        selectedMarriageDate
    ){

        showMessage(
            "Deceased Date must be after Marriage Date.",
            "warning",
            3000
        );

        return;

    }

}
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

const editMember =
    JSON.parse(
        localStorage.getItem(
            "editMember"
        ) || "null"
    );

const memberId =
    editMember
        ? String(
            editMember.memberId || ""
          ).trim()
        : "";   
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
    editMember
        ? "Updating..."
        : "Saving...";

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
    "marriageDate",
    maritalStatus.toLowerCase() === "yes"
        ? (
            document.getElementById(
                "memberMarriageDate"
            )?.value || ""
        )
        : ""
);
/* ================================
   MARRIAGE DATE
   ================================ */

params.append(
    "marriageDate",
    maritalStatus.toLowerCase() === "yes"
        ? (
            document.getElementById(
                "memberMarriageDate"
            )?.value || ""
        )
        : ""
);
/* ================================
   ADDITIONAL MEMBER DETAILS
   ================================ */
params.append(
    "lifeStatus",
    document.getElementById(
        "memberLifeStatus"
    )?.value || ""
);
params.append(
    "nativePlace",
    document.getElementById(
        "memberNativePlace"
    )?.value || ""
);

params.append(
    "occupation",
    document.getElementById(
        "memberOccupation"
    )?.value || ""
);

params.append(
    "qualification",
    document.getElementById(
        "memberQualification"
    )?.value || ""
);

params.append(
    "bloodGroup",
    document.getElementById(
        "memberBloodGroup"
    )?.value || ""
);

params.append(
    "mobileNumber",
    document.getElementById(
        "memberMobileNumber"
    )?.value || ""
);

params.append(
    "currentPlace",
    document.getElementById(
        "memberCurrentPlace"
    )?.value || ""
);

/* ================================
   DECEASED DATE
   ================================ */

const currentLifeStatus =
    String(
        document.getElementById(
            "memberLifeStatus"
        )?.value || ""
    )
    .trim()
    .toLowerCase();


const currentDeceasedDate =
    currentLifeStatus === "deceased"
        ? (
            document.getElementById(
                "memberDeceasedDate"
            )?.value || ""
        )
        : "";


params.append(
    "deceasedDate",
    currentDeceasedDate
);
params.append(
    "aboutMe",
    document.getElementById(
        "memberAboutMe"
    )?.value || ""
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
    editMember
        ? "Update"
        : "Save";


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
    editMember
        ? "Member updated successfully."
        : "Member saved successfully.",
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

    marriageDate:
        document.getElementById(
            "memberMarriageDate"
        )?.value || "",

    lifeStatus:
        document.getElementById(
            "memberLifeStatus"
        )?.value || "",

    nativePlace:
        document.getElementById(
            "memberNativePlace"
        )?.value || "",

    occupation:
        document.getElementById(
            "memberOccupation"
        )?.value || "",

    qualification:
        document.getElementById(
            "memberQualification"
        )?.value || "",

    bloodGroup:
        document.getElementById(
            "memberBloodGroup"
        )?.value || "",

    mobileNumber:
        document.getElementById(
            "memberMobileNumber"
        )?.value || "",

    currentPlace:
        document.getElementById(
            "memberCurrentPlace"
        )?.value || "",

    deceasedDate:
        document.getElementById(
            "memberDeceasedDate"
        )?.value || "",

    aboutMe:
        document.getElementById(
            "memberAboutMe"
        )?.value || "",

    createdAt:
        editMember
            ? (
                editMember.createdAt || ""
              )
            : new Date().toISOString()

};
       if(editMember){

    const index =
        familyMembers.findIndex(
            function(member){

                return String(
                    member.memberId || ""
                ).trim() ===
                String(
                    editMember.memberId || ""
                ).trim();

            }
        );

    if(index !== -1){

        familyMembers[index] =
            newMember;

    }

}
else{

    familyMembers.push(
        newMember
    );

} 

       

/* =================================
   SAVE UPDATED MEMBERS TO CACHE
   ================================= */

localStorage.setItem(
    "familyMembers",
    JSON.stringify(
        familyMembers
    )
);


/* =================================
   CLEAR EDIT MEMBER AFTER UPDATE
   ================================= */

if(editMember){

    localStorage.removeItem(
        "editMember"
    );

}
       
/* ================================
   NEW MEMBER ADDED → NOT FOR EDIT
   ================================ */

/* ================================
   CHANGE PAGE TITLE
   ================================ */

/* ================================
   CHANGE TITLE AFTER SAVE
   ================================ */

const addMemberPageTitle =
    document.querySelector(
        "h2.page-title"
    );

if(addMemberPageTitle){

    addMemberPageTitle.innerHTML =
        editMember
            ? "Member updated"
            : "New Member added";

}
       
/* ================================
   DISABLE ALL MEMBER FIELDS
   ================================ */

const memberFields =
    [

        "memberName",
        "memberGender",
        "memberDob",

        "memberPhotoBtn",

        "memberPartner",
        "memberMarriageDate",
        "memberFather",
        "memberMother",

        "memberLifeStatus",
        "memberNativePlace",
        "memberOccupation",
        "memberQualification",

        "memberBloodGroup",
        "memberMobileNumber",
        "memberCurrentPlace",

        "memberDeceasedDate",
        "memberAboutMe"

    ];

/* ================================
   MARITAL STATUS → SINGLE TEXT
   ================================ */

const maritalStatusGroup =
    document.getElementById(
        "marriedYes"
    )?.closest(
        ".common-form-group"
    );


const selectedMarital =
    document.querySelector(
        'input[name="memberMaritalStatus"]:checked'
    );


if(maritalStatusGroup){

    /* ================================
       GET SELECTED VALUE
       ================================ */

    const maritalValue =
        selectedMarital
            ? String(
                selectedMarital.value || ""
              ).trim()
            : "";


    /* ================================
       HIDE ALL MARITAL CONTROLS   KEEP ONLY:
       Marital Status label
       :
       ================================ */

    Array.from(
        maritalStatusGroup.children
    ).forEach(
        function(element){

            if(
                element.classList.contains(
                    "common-form-label"
                )
            ){

                return;

            }


            if(
                element.classList.contains(
                    "common-form-colon"
                )
            ){

                return;

            }


            element.style.display =
                "none";

        }
    );


    /* ================================
       REMOVE OLD DISPLAY
       ================================ */

    const oldMaritalDisplay =
        maritalStatusGroup.querySelector(
            ".saved-marital-status"
        );

    if(oldMaritalDisplay){

        oldMaritalDisplay.remove();

    }


    /* ================================
       CREATE SINGLE TEXT
       ================================ */

    const maritalDisplay =
        document.createElement(
            "span"
        );

    maritalDisplay.className =
        "common-form-value saved-marital-status";


    maritalDisplay.textContent =
        maritalValue || "--------";


    /* ================================
       ADD ONLY SELECTED STATUS
       ================================ */

    maritalStatusGroup.appendChild(
        maritalDisplay
    );

}
       
/* ================================
   HIDE MARRIAGE CONFIRMATION
   AFTER SAVE
   ================================ */

const confirmMarriageYesField =
    document.getElementById(
        "confirmMarriageYes"
    );

if(confirmMarriageYesField){

    const confirmationGroup =
        confirmMarriageYesField.closest(
            ".common-form-group"
        );

    if(confirmationGroup){

        confirmationGroup.style.display =
            "none";

    }

}
/* ================================
   NEW MEMBER → TEXT ONLY
   REMOVE INPUT BOXES
   ================================ */

memberFields.forEach(
    function(id){

        const field =
            document.getElementById(id);

        if(!field){
            return;
        }


        /* ================================
           GET DISPLAY VALUE
           ================================ */

        let displayValue = "";


        /* SELECT FIELD */

        /* SELECT FIELD */

if(
    field.tagName ===
    "SELECT"
){

    const selectedOption =
        field.options[
            field.selectedIndex
        ];


    if(
        selectedOption &&
        field.selectedIndex > 0 &&
        selectedOption.value
    ){

        displayValue =
            selectedOption.textContent
                .trim();

    }
    else{

        displayValue =
            "";

    }

}
        /* INPUT / TEXTAREA */

        else{

            displayValue =
                field.value || "";

        }


        /* ================================
           CREATE TEXT
           ================================ */

        const text =
            document.createElement(
                "span"
            );

        text.className =
            "common-form-value";

        text.textContent =
            displayValue || "--------";


        /* ================================
           ABOUT ME
           ================================ */

        if(
            id ===
            "memberAboutMe"
        ){

            text.classList.add(
                "member-about-me-value"
            );

        }


        /* ================================
           REPLACE BOX
           ================================ */

        field.replaceWith(
            text
        );

    }
);

/* ================================
   HIDE SAVE BUTTON
   ================================ */

if(saveMemberBtn){

    saveMemberBtn.style.display =
        "none";

}


/* ================================
   BACK → ADD MEMBER
   ================================ */

if(memberBackBtn){

    memberBackBtn.onclick =
        function(){

            /* ================================
               UPDATED MEMBER
               → DIRECT SEARCH - EDIT MEMBER
               ================================ */

            if(editMember){

                console.log(
                    "UPDATED MEMBER → SEARCH EDIT"
                );

                if(
                    typeof window.openSearchEditMemberPage ===
                    "function"
                ){

                    window.openSearchEditMemberPage();

                }

                return;
            }


            /* ================================
               NEW MEMBER
               → ADD MEMBER PAGE
               ================================ */

            console.log(
                "NEW MEMBER → ADD MEMBER"
            );

            if(addMemberBtn){

                addMemberBtn.click();

            }

        };

}
       saveMemberBtn.disabled =
            false;

        saveMemberBtn.textContent =
    editMember
        ? "Update"
        : "Save";

    }catch(error){

        console.error(
            "Save Member Error:",
            error
        );


        saveMemberBtn.disabled =
            false;

        saveMemberBtn.textContent =
    editMember
        ? "Update"
        : "Save";


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
   SHOW CURRENT FAMILY IMMEDIATELY
   ================================= */

const savedFamily =
    JSON.parse(
        localStorage.getItem(
            "currentFamily"
        ) || "null"
    );


const newFamilyIdField =
    document.getElementById(
        "newFamilyId"
    );

const newFamilyNameField =
    document.getElementById(
        "newFamilyName"
    );

if(savedFamily){

    if(newFamilyIdField){

        newFamilyIdField.textContent =
            savedFamily.familyId || "";

        newFamilyIdField.classList.remove(
            "generated"
        );

        newFamilyIdField.classList.add(
            "family-id-grey"
        );

    }


    if(newFamilyNameField){

        newFamilyNameField.value =
            savedFamily.familyName || "";

        newFamilyNameField.disabled =
            true;

        newFamilyNameField.classList.add(
            "family-name-grey"
        );

    }


    const statusField =
        document.getElementById(
            "familyIdStatus"
        );


    if(statusField){

        statusField.textContent =
            "User already have a Family Tree.";

        statusField.className =
            "family-id-status available";

    }

}

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
        result.familyId || "";

    familyIdField.classList.remove(
        "generated"
    );

    familyIdField.classList.add(
        "family-id-grey"
    );

}

/* =========================
   SHOW FAMILY NAME
   ========================= */

if(familyNameInput){

    familyNameInput.value =
        result.familyName || "";

    familyNameInput.disabled =
        true;

    familyNameInput.classList.add(
        "family-name-grey"
    );

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



let familyTreeBaseScale = 1;
let familyTreeZoomFactor = 1;
let familyTreePanX = 0;
let familyTreePanY = 0;

let familyTreeIsDragging = false;

let familyTreeDragStartX = 0;
let familyTreeDragStartY = 0;

let familyTreePanStartX = 0;
let familyTreePanStartY = 0;
/* =====================================
   AUTO FIT FAMILY TREE TO SCREEN
   ===================================== */

function fitFamilyTreeToScreen(){

    const wrapper =
        document.querySelector(
            ".family-tree-scroll"
        );

    const canvas =
        document.getElementById(
            "familyTreeCanvas"
        );

    if(!wrapper || !canvas){
        return;
    }


    canvas.style.transform =
        "none";

    canvas.style.marginBottom =
        "0";

    canvas.style.marginLeft =
        "0";


    const treeWidth =
        canvas.scrollWidth;

    const availableWidth =
        wrapper.clientWidth;


    familyTreeBaseScale = 1;


    if(
        treeWidth > availableWidth &&
        treeWidth > 0
    ){

        familyTreeBaseScale =
            availableWidth /
            treeWidth;

    }


  familyTreeZoomFactor = 1;


const scaledTreeWidth =
    treeWidth *
    familyTreeBaseScale;


familyTreePanX =
    Math.max(
        0,
        (
            availableWidth -
            scaledTreeWidth
        ) / 2
    );


familyTreePanY = 0;


applyFamilyTreeZoom();

applyFamilyTreeZoom();
}
function applyFamilyTreeZoom(){

    const canvas =
        document.getElementById(
            "familyTreeCanvas"
        );

    const zoomValue =
        document.getElementById(
            "familyTreeZoomValue"
        );

    if(!canvas){
        return;
    }


    const finalScale =
        familyTreeBaseScale *
        familyTreeZoomFactor;


   canvas.style.transformOrigin =
    "top left";

    canvas.style.transform =
    `translate(${familyTreePanX}px, ${familyTreePanY}px) scale(${finalScale})`;


    const originalHeight =
        canvas.scrollHeight;


    const scaledHeight =
        originalHeight *
        finalScale;


    const extraHeight =
        originalHeight -
        scaledHeight;


    canvas.style.marginBottom =
        `-${extraHeight}px`;


   if(zoomValue){

    zoomValue.textContent =
        Math.round(
            finalScale *
            100
        ) + "%";

}

}
/* =====================================
   OPEN FAMILY TREE PAGE
   ===================================== */

async function openFamilyTreePage(){
    let members =
    JSON.parse(
        localStorage.getItem(
            "familyMembers"
        ) || "[]"
    );


const currentFamily =
    JSON.parse(
        localStorage.getItem(
            "currentFamily"
        ) || "{}"
    );


if(
    !Array.isArray(members) ||
    members.length === 0
){

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
                    method:
                        "POST",

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


        if(
            result.status ===
            "success"
        ){

            members =
                Array.isArray(
                    result.members
                )
                    ? result.members
                    : [];


            localStorage.setItem(
                "familyMembers",
                JSON.stringify(
                    members
                )
            );

        }

    }
    catch(error){

        console.error(
            "Family Tree Members Load Error:",
            error
        );

    }

}
   

const familyName =
    currentFamily.familyName ||
    currentFamily.name ||
    "";
    showPage(

       pageTitle(
    familyName
        ? familyName + " - Family Tree"
        : "Family Tree",
    "images/colorbtns/Family1.png"
)
        +

        `
        <div class="family-tree-page">

            <!-- MEMBER -->

            <div class="family-tree-control">

    <label class="family-tree-label">
        Select Member
    </label>

    <span class="family-tree-colon">
        :
    </span>

   <div class="search-edit-member-wrapper">

    <input
        type="text"
        id="familyTreeMemberSearch"
        class="common-form-input"
        placeholder="Search Member"
        autocomplete="off">

    <div
        id="familyTreeMemberDropdown"
        class="relations-member-dropdown"
        style="display:none;">
    </div>

</div>
            </div>


            <!-- GENERATIONS -->

            <div class="family-tree-generation-row">

                <div class="family-tree-control">

    <label class="family-tree-label">
        Before Generations
    </label>

    <span class="family-tree-colon">
        :
    </span>

    <select
        id="familyTreeBefore"
        class="common-form-input">

        <option value="1">1</option>
        <option value="2" selected>2</option>
        <option value="3">3</option>

    </select>

</div>
                <div class="family-tree-control">

    <label class="family-tree-label">
        After Generations
    </label>

    <span class="family-tree-colon">
        :
    </span>

    <select
        id="familyTreeAfter"
        class="common-form-input">

        <option value="1">1</option>
        <option value="2" selected>2</option>
        <option value="3">3</option>

    </select>

</div>
            </div>


            <button
                type="button"
                id="showFamilyTreeBtn"
                class="family-create-btn">

                Show Family Tree

            </button>


            <!-- TREE WILL COME HERE -->

            <div
                id="familyTreeDiagram"
                class="family-tree-diagram">

            </div>


            <div class="family-tree-bottom-actions">

                <button
                    type="button"
                    id="familyTreeBackBtn"
                    class="back-btn">

                    ← Back

                </button>

                <button
                    type="button"
                    id="familyTreeHomeBtn"
                    class="back-btn">

                    🏠 Home

                </button>

            </div>

        </div>
        `
    );


    /* ================================
       LOAD MEMBERS INTO SELECT
       ================================ */

/* =====================================
   TREE VIEW MEMBER SEARCH
   ===================================== */

const familyTreeSearchInput =
    document.getElementById(
        "familyTreeMemberSearch"
    );


const familyTreeDropdown =
    document.getElementById(
        "familyTreeMemberDropdown"
    );


let selectedFamilyTreeMemberId =
    "";


/* =====================================
   SHOW / FILTER MEMBERS
   ===================================== */

function showFamilyTreeMembers(){

    const searchText =
        String(
            familyTreeSearchInput.value || ""
        )
        .trim()
        .toLowerCase();


    familyTreeDropdown.innerHTML =
        "";


    const matchingMembers =
        members
            .filter(
                function(member){

                    if(
                        !member ||
                        !member.memberId ||
                        !member.name
                    ){

                        return false;

                    }


                    const memberName =
                        String(
                            member.name || ""
                        )
                        .trim()
                        .toLowerCase();


                    const memberId =
                        String(
                            member.memberId || ""
                        )
                        .trim()
                        .toLowerCase();


                    /* EMPTY SEARCH
                       → SHOW ALL MEMBERS */

                    if(
                        searchText === ""
                    ){

                        return true;

                    }


                    /* NAME OR MEMBER ID SEARCH */

                    return (
                        memberName.includes(
                            searchText
                        )
                        ||
                        memberId.includes(
                            searchText
                        )
                    );

                }
            )
            .sort(
                function(a,b){

                    return String(
                        a.name || ""
                    )
                    .localeCompare(
                        String(
                            b.name || ""
                        )
                    );

                }
            );


    /* =====================================
       NO MATCH
       ===================================== */

    if(
        matchingMembers.length === 0
    ){

        familyTreeDropdown.innerHTML =
            `
            <div class="relations-no-match">
                No matching member
            </div>
            `;


        familyTreeDropdown.style.display =
            "block";


        return;

    }


    /* =====================================
       CREATE DROPDOWN ITEMS
       ===================================== */

    matchingMembers.forEach(
        function(member){

            const option =
                document.createElement(
                    "div"
                );


            option.className =
                "relations-member-option";


            option.textContent =
                member.name +
                " (" +
                member.memberId +
                ")";


            option.dataset.memberId =
                member.memberId;


            /* =================================
               MEMBER SELECT
               ================================= */

            option.onclick =
                function(){

                    selectedFamilyTreeMemberId =
                        member.memberId;


                    familyTreeSearchInput.value =
                        member.name;


                    familyTreeDropdown.innerHTML =
                        "";


                    familyTreeDropdown.style.display =
                        "none";

                };


            familyTreeDropdown.appendChild(
                option
            );

        }
    );


    familyTreeDropdown.style.display =
        "block";

}

/* =====================================
   TREE VIEW SEARCH EVENTS
   ===================================== */

familyTreeSearchInput.addEventListener(
    "focus",
    function(){

        selectedFamilyTreeMemberId =
            "";

        showFamilyTreeMembers();

    }
);


familyTreeSearchInput.addEventListener(
    "input",
    function(){

        selectedFamilyTreeMemberId =
            "";

        showFamilyTreeMembers();

    }
);
   
/* =====================================
   SHOW FAMILY TREE BUTTON
   ===================================== */

const showFamilyTreeBtn =
    document.getElementById(
        "showFamilyTreeBtn"
    );

if(showFamilyTreeBtn){

    showFamilyTreeBtn.onclick =
        function(){

           const memberId =
    selectedFamilyTreeMemberId;

            if(!memberId){

                showMessage(
                    "Please select a member.",
                    "warning",
                    2500
                );

                return;
            }


            const selectedMember =
                members.find(
                    member =>
                        String(member.memberId) ===
                        String(memberId)
                );


            if(!selectedMember){

                showMessage(
                    "Member not found.",
                    "error",
                    2500
                );

                return;
            }
           /* =====================================
   HIDE TREE SELECTION CONTROLS
   ===================================== */

const memberControl =
    document.getElementById(
        "familyTreeMemberSearch"
    )?.closest(
        ".family-tree-control"
    );

const beforeControl =
    document.getElementById(
        "familyTreeBefore"
    )?.closest(
        ".family-tree-control"
    );


const afterControl =
    document.getElementById(
        "familyTreeAfter"
    )?.closest(
        ".family-tree-control"
    );


if(memberControl){
    memberControl.style.display =
        "none";
}


if(beforeControl){
    beforeControl.style.display =
        "none";
}


if(afterControl){
    afterControl.style.display =
        "none";
}


const generationRow =
    document.querySelector(
        ".family-tree-generation-row"
    );

if(generationRow){
    generationRow.style.display =
        "none";
}


showFamilyTreeBtn.style.display =
    "none";

            const genderLetter =
                String(selectedMember.gender)
                    .toLowerCase() === "female"
                    ? "F"
                    : "M";


            const diagram =
                document.getElementById(
                    "familyTreeDiagram"
                );
/* =====================================
   GET FATHER AND MOTHER
   ===================================== */

const father =
    members.find(
        member =>
            String(member.memberId) ===
            String(selectedMember.fatherId || "")
    );


const mother =
    members.find(
        member =>
            String(member.memberId) ===
            String(selectedMember.motherId || "")
    );


function createTreeMemberBox(member){

    if(!member){
        return "";
    }

    const gender =
        String(member.gender)
            .toLowerCase() === "female"
            ? "F"
            : "M";

    const genderClass =
        gender === "M"
            ? "gender-male"
            : "gender-female";


    return `

        <div class="family-tree-test-node">

            <strong>
                ${member.name}
            </strong>

            <span class="${genderClass}">
                ${gender}
            </span>

        </div>

    `;

}

           const partner =
    members.find(
        member =>
            String(member.memberId) ===
            String(selectedMember.partnerId || "")
    )
    ||
    members.find(
        member =>
            String(member.partnerId || "") ===
            String(selectedMember.memberId)
    );


let partnerHTML = "";


if(partner){

    const partnerGender =
        String(partner.gender)
            .toLowerCase() === "female"
            ? "F"
            : "M";


    partnerHTML = `

        <div class="family-tree-spouse-line"></div>


        <div class="family-tree-test-node">

            <strong>
                ${partner.name}
            </strong>

            <span class="${
    partnerGender === "M"
        ? "gender-male"
        : "gender-female"
}">
    ${partnerGender}
</span>

        </div>

    `;

}


/* =====================================
   FAMILY TREE RELATIONS
   ===================================== */

const getMemberById =
    function(id){

        if(!id){
            return null;
        }

        return members.find(
            m =>
                String(m.memberId) ===
                String(id)
        ) || null;

    };


const getChildren =
    function(member){

        if(!member){
            return [];
        }

        return members.filter(
            m =>
                String(m.fatherId || "") ===
                    String(member.memberId)
                ||
                String(m.motherId || "") ===
                    String(member.memberId)
        );

    };



/* =====================================
   SELECTED MEMBER SIBLINGS
   ===================================== */

const siblings =
    members.filter(
        m => {

            if(
                String(m.memberId) ===
                String(selectedMember.memberId)
            ){
                return false;
            }

            const sameFather =
                selectedMember.fatherId &&
                String(m.fatherId || "") ===
                String(selectedMember.fatherId);

            const sameMother =
                selectedMember.motherId &&
                String(m.motherId || "") ===
                String(selectedMember.motherId);

            return sameFather || sameMother;

        }
    );


/* =====================================
   PARTNER PARENTS
   ===================================== */

const partnerFather =
    partner
        ? getMemberById(
            partner.fatherId
          )
        : null;


const partnerMother =
    partner
        ? getMemberById(
            partner.motherId
          )
        : null;
/* =====================================
   GRAND PARENTS
   ===================================== */

/* Selected Member - Father's Parents */

const fatherFather =
    father
        ? getMemberById(father.fatherId)
        : null;

const fatherMother =
    father
        ? getMemberById(father.motherId)
        : null;


/* Selected Member - Mother's Parents */

const motherFather =
    mother
        ? getMemberById(mother.fatherId)
        : null;

const motherMother =
    mother
        ? getMemberById(mother.motherId)
        : null;


/* Partner - Father's Parents */

const partnerFatherFather =
    partnerFather
        ? getMemberById(
            partnerFather.fatherId
        )
        : null;

const partnerFatherMother =
    partnerFather
        ? getMemberById(
            partnerFather.motherId
        )
        : null;


/* Partner - Mother's Parents */

const partnerMotherFather =
    partnerMother
        ? getMemberById(
            partnerMother.fatherId
        )
        : null;

const partnerMotherMother =
    partnerMother
        ? getMemberById(
            partnerMother.motherId
        )
        : null;
/* =====================================
   PARTNER SIBLINGS
   ===================================== */

const partnerSiblings =
    partner
        ? members.filter(
            function(member){

                if(
                    !member ||
                    String(member.memberId) ===
                    String(partner.memberId)
                ){
                    return false;
                }


                const sameFather =
                    partner.fatherId &&
                    String(
                        member.fatherId || ""
                    ) ===
                    String(
                        partner.fatherId
                    );


                const sameMother =
                    partner.motherId &&
                    String(
                        member.motherId || ""
                    ) ===
                    String(
                        partner.motherId
                    );


                return (
                    sameFather ||
                    sameMother
                );

            }
        )
        : [];      

/* =====================================
   CHILDREN
   ===================================== */

const children =
    members.filter(
        m =>
            String(m.fatherId || "") ===
                String(selectedMember.memberId)
            ||
            String(m.motherId || "") ===
                String(selectedMember.memberId)
            ||
            (
                partner &&
                (
                    String(m.fatherId || "") ===
                        String(partner.memberId)
                    ||
                    String(m.motherId || "") ===
                        String(partner.memberId)
                )
            )
    );
/* =====================================
   GREAT GRANDPARENTS
   Parents of Grandparents
   ===================================== */

// Father's Father parents
const fatherFatherFather =
    fatherFather
        ? getMemberById(fatherFather.fatherId)
        : null;

const fatherFatherMother =
    fatherFather
        ? getMemberById(fatherFather.motherId)
        : null;


// Father's Mother parents
const fatherMotherFather =
    fatherMother
        ? getMemberById(fatherMother.fatherId)
        : null;

const fatherMotherMother =
    fatherMother
        ? getMemberById(fatherMother.motherId)
        : null;


// Mother's Father parents
const motherFatherFather =
    motherFather
        ? getMemberById(motherFather.fatherId)
        : null;

const motherFatherMother =
    motherFather
        ? getMemberById(motherFather.motherId)
        : null;


// Mother's Mother parents
const motherMotherFather =
    motherMother
        ? getMemberById(motherMother.fatherId)
        : null;

const motherMotherMother =
    motherMother
        ? getMemberById(motherMother.motherId)
        : null;


// Partner Father's Father parents
const partnerFatherFatherFather =
    partnerFatherFather
        ? getMemberById(
            partnerFatherFather.fatherId
        )
        : null;

const partnerFatherFatherMother =
    partnerFatherFather
        ? getMemberById(
            partnerFatherFather.motherId
        )
        : null;


// Partner Father's Mother parents
const partnerFatherMotherFather =
    partnerFatherMother
        ? getMemberById(
            partnerFatherMother.fatherId
        )
        : null;

const partnerFatherMotherMother =
    partnerFatherMother
        ? getMemberById(
            partnerFatherMother.motherId
        )
        : null;


// Partner Mother's Father parents
const partnerMotherFatherFather =
    partnerMotherFather
        ? getMemberById(
            partnerMotherFather.fatherId
        )
        : null;

const partnerMotherFatherMother =
    partnerMotherFather
        ? getMemberById(
            partnerMotherFather.motherId
        )
        : null;


// Partner Mother's Mother parents
const partnerMotherMotherFather =
    partnerMotherMother
        ? getMemberById(
            partnerMotherMother.fatherId
        )
        : null;

const partnerMotherMotherMother =
    partnerMotherMother
        ? getMemberById(
            partnerMotherMother.motherId
        )
        : null;

/* =====================================
   TREE BOX
   ===================================== */

function treeBox(member, extraClass = ""){

    if(!member){
        return "";
    }

    const isFemale =
        String(member.gender)
            .toLowerCase() === "female";

    const genderClass =
        isFemale
            ? "tree-female"
            : "tree-male";


    return `

        <div
            class="
                family-tree-test-node
                ${genderClass}
                ${extraClass}
            "
            data-tree-member="${member.memberId}">

            <strong>
                ${member.name || ""}
            </strong>

        </div>

    `;

}


/* =====================================
   GRAND CHILDREN HTML
   ===================================== */

let childrenHTML = "";


children.forEach(
    child => {

        const childPartner =
            members.find(
                m =>
                    String(m.memberId) ===
                    String(child.partnerId || "")
            )
            ||
            members.find(
                m =>
                    String(m.partnerId || "") ===
                    String(child.memberId)
            );


        const grandChildren =
            getChildren(child);


        childrenHTML += `

            <div class="family-tree-child-branch">

                <div class="family-tree-child-couple">

                    ${treeBox(
                        child,
                        "tree-child-node"
                    )}

                    ${
                        childPartner
                            ? treeBox(
                                childPartner,
                                "tree-child-partner"
                              )
                            : ""
                    }

                </div>


                ${
                    grandChildren.length
                    ? `

                        <div class="family-tree-grandchildren-row">

                            ${
                                grandChildren
    .map(
        grandChild => {

            const grandChildPartner =
                members.find(
                    member =>
                        String(member.memberId) ===
                        String(grandChild.partnerId || "")
                )
                ||
                members.find(
                    member =>
                        String(member.partnerId || "") ===
                        String(grandChild.memberId)
                );

            const greatGrandChildren =
                members.filter(
                    member =>
                        String(member.fatherId || "") ===
                            String(grandChild.memberId)
                        ||
                        String(member.motherId || "") ===
                            String(grandChild.memberId)
                        ||
                        (
                            grandChildPartner &&
                            (
                                String(member.fatherId || "") ===
                                    String(grandChildPartner.memberId)
                                ||
                                String(member.motherId || "") ===
                                    String(grandChildPartner.memberId)
                            )
                        )
                );

            return `
                <div class="family-tree-grandchild-branch">

                    <div class="family-tree-grandchild-couple">

                        ${treeBox(
                            grandChild,
                            "tree-grandchild-node"
                        )}

                        ${
                            grandChildPartner
                                ? treeBox(
                                    grandChildPartner,
                                    "tree-grandchild-partner"
                                  )
                                : ""
                        }

                    </div>

                    ${
                        greatGrandChildren.length
                            ? `
                                <div class="family-tree-great-grandchildren-row">

                                    ${
                                        greatGrandChildren
                                            .map(
                                                greatGrandChild =>
                                                    treeBox(
                                                        greatGrandChild,
                                                        "tree-great-grandchild-node"
                                                    )
                                            )
                                            .join("")
                                    }

                                </div>
                              `
                            : ""
                    }

                </div>
            `;
        }
    )
    .join("")
                            }

                        </div>

                      `
                    : ""
                }

            </div>

        `;

    }
);
/* =====================================
   SIBLINGS + PARTNERS + CHILDREN
   ===================================== */

let siblingsHTML = "";

siblings.forEach(
    sibling => {

        const siblingPartner =
            members.find(
                member =>
                    String(member.memberId) ===
                    String(sibling.partnerId || "")
            )
            ||
            members.find(
                member =>
                    String(member.partnerId || "") ===
                    String(sibling.memberId)
            );


        const siblingChildren =
            members.filter(
                child =>
                    String(child.fatherId || "") ===
                        String(sibling.memberId)
                    ||
                    String(child.motherId || "") ===
                        String(sibling.memberId)
                    ||
                    (
                        siblingPartner &&
                        (
                            String(child.fatherId || "") ===
                                String(siblingPartner.memberId)
                            ||
                            String(child.motherId || "") ===
                                String(siblingPartner.memberId)
                        )
                    )
            );


        siblingsHTML += `

            <div class="family-tree-sibling-branch">

                <div class="family-tree-sibling-couple">

                    ${treeBox(
                        sibling,
                        "tree-sibling"
                    )}

                    ${
                        siblingPartner
                            ? treeBox(
                                siblingPartner,
                                "tree-sibling-partner"
                              )
                            : ""
                    }

                </div>


   ${
    siblingChildren.length
        ? `
            <div class="family-tree-sibling-children-row">

                ${
                    siblingChildren
                        .map(
                            child => {

                                const childPartner =
                                    members.find(
                                        member =>
                                            String(member.memberId) ===
                                            String(child.partnerId || "")
                                    )
                                    ||
                                    members.find(
                                        member =>
                                            String(member.partnerId || "") ===
                                            String(child.memberId)
                                    );


                                const childChildren =
                                    members.filter(
                                        member =>
                                            String(member.fatherId || "") ===
                                                String(child.memberId)
                                            ||
                                            String(member.motherId || "") ===
                                                String(child.memberId)
                                            ||
                                            (
                                                childPartner &&
                                                (
                                                    String(member.fatherId || "") ===
                                                        String(childPartner.memberId)
                                                    ||
                                                    String(member.motherId || "") ===
                                                        String(childPartner.memberId)
                                                )
                                            )
                                    );


                                return `

                                    <div class="family-tree-sibling-child-branch">

                                        <div class="family-tree-sibling-child-couple">

                                            ${treeBox(
                                                child,
                                                "tree-sibling-child"
                                            )}

                                            ${
                                                childPartner
                                                    ? treeBox(
                                                        childPartner,
                                                        "tree-sibling-child-partner"
                                                      )
                                                    : ""
                                            }

                                        </div>


                                        ${
                                            childChildren.length
                                                ? `
                                                    <div class="family-tree-sibling-grandchildren-row">

                                                        ${
                                                            childChildren
                                                                .map(
                                                                    grandChild =>
                                                                        treeBox(
                                                                            grandChild,
                                                                            "tree-sibling-grandchild"
                                                                        )
                                                                )
                                                                .join("")
                                                        }

                                                    </div>
                                                  `
                                                : ""
                                        }

                                    </div>
                                `;

                            }
                        )
                        .join("")
                }

            </div>
          `
        : ""
}

            </div>
        `;

    }
);
 /* =====================================
   PARTNER SIBLINGS + PARTNERS + CHILDREN
   ===================================== */

let partnerSiblingsHTML = "";

partnerSiblings.forEach(
    sibling => {

        const siblingPartner =
            members.find(
                member =>
                    String(member.memberId) ===
                    String(sibling.partnerId || "")
            )
            ||
            members.find(
                member =>
                    String(member.partnerId || "") ===
                    String(sibling.memberId)
            );


        const siblingChildren =
            members.filter(
                child =>
                    String(child.fatherId || "") ===
                        String(sibling.memberId)
                    ||
                    String(child.motherId || "") ===
                        String(sibling.memberId)
                    ||
                    (
                        siblingPartner &&
                        (
                            String(child.fatherId || "") ===
                                String(siblingPartner.memberId)
                            ||
                            String(child.motherId || "") ===
                                String(siblingPartner.memberId)
                        )
                    )
            );


        partnerSiblingsHTML += `

            <div class="family-tree-partner-sibling-branch">

                <div class="family-tree-partner-sibling-couple">

                    ${treeBox(
                        sibling,
                        "tree-partner-sibling"
                    )}

                    ${
                        siblingPartner
                            ? treeBox(
                                siblingPartner,
                                "tree-partner-sibling-partner"
                              )
                            : ""
                    }

                </div>


               ${
    siblingChildren.length
        ? `
            <div class="family-tree-partner-sibling-children-row">

                ${
                    siblingChildren
                        .map(
                            child => {

                                const childPartner =
                                    members.find(
                                        member =>
                                            String(member.memberId) ===
                                            String(child.partnerId || "")
                                    )
                                    ||
                                    members.find(
                                        member =>
                                            String(member.partnerId || "") ===
                                            String(child.memberId)
                                    );


                                const childChildren =
                                    members.filter(
                                        member =>
                                            String(member.fatherId || "") ===
                                                String(child.memberId)
                                            ||
                                            String(member.motherId || "") ===
                                                String(child.memberId)
                                            ||
                                            (
                                                childPartner &&
                                                (
                                                    String(member.fatherId || "") ===
                                                        String(childPartner.memberId)
                                                    ||
                                                    String(member.motherId || "") ===
                                                        String(childPartner.memberId)
                                                )
                                            )
                                    );


                                return `

                                    <div class="family-tree-partner-sibling-child-branch">

                                        <div class="family-tree-partner-sibling-child-couple">

                                            ${treeBox(
                                                child,
                                                "tree-partner-sibling-child"
                                            )}

                                            ${
                                                childPartner
                                                    ? treeBox(
                                                        childPartner,
                                                        "tree-partner-sibling-child-partner"
                                                      )
                                                    : ""
                                            }

                                        </div>


                                        ${
                                            childChildren.length
                                                ? `
                                                    <div class="family-tree-partner-sibling-grandchildren-row">

                                                        ${
                                                            childChildren
                                                                .map(
                                                                    grandChild =>
                                                                        treeBox(
                                                                            grandChild,
                                                                            "tree-partner-sibling-grandchild"
                                                                        )
                                                                )
                                                                .join("")
                                                        }

                                                    </div>
                                                  `
                                                : ""
                                        }

                                    </div>
                                `;

                            }
                        )
                        .join("")
                }

            </div>
          `
        : ""
}
            </div>
        `;

    }
);          
/* =====================================
   MAIN TREE HTML
   ===================================== */

diagram.innerHTML = `
<div class="family-tree-toolbar">

    <div class="family-tree-legend">

        <div class="family-tree-legend-item">
            <span class="legend-box legend-male"></span>
            <span>Male</span>
        </div>

        <div class="family-tree-legend-item">
            <span class="legend-box legend-female"></span>
            <span>Female</span>
        </div>

    </div>


    <div class="family-tree-zoom-controls">

        <button
            type="button"
            id="familyTreeZoomOut"
            class="family-tree-zoom-btn">
            −
        </button>

        <span id="familyTreeZoomValue">
            100%
        </span>

        <button
            type="button"
            id="familyTreeZoomIn"
            class="family-tree-zoom-btn">
            +
        </button>

        <button
            type="button"
            id="familyTreeZoomReset"
            class="family-tree-zoom-reset">
            Reset
        </button>

    </div>

</div>
<div class="family-tree-scroll">

        <div
            id="familyTreeCanvas"
            class="family-tree-canvas">


            <svg
                id="familyTreeLines"
                class="family-tree-lines">
   
            </svg>

<!-- =====================
     GREAT GRANDPARENTS ROW
     ===================== -->

<div class="family-tree-great-grandparents-row">

    <div class="family-tree-great-grandparent-couple">
        ${fatherFatherFather
            ? treeBox(
                fatherFatherFather,
                "tree-father-father-father"
              )
            : ""}

        ${fatherFatherMother
            ? treeBox(
                fatherFatherMother,
                "tree-father-father-mother"
              )
            : ""}
    </div>

    <div class="family-tree-great-grandparent-couple">
        ${fatherMotherFather
            ? treeBox(
                fatherMotherFather,
                "tree-father-mother-father"
              )
            : ""}

        ${fatherMotherMother
            ? treeBox(
                fatherMotherMother,
                "tree-father-mother-mother"
              )
            : ""}
    </div>

    <div class="family-tree-great-grandparent-couple">
        ${motherFatherFather
            ? treeBox(
                motherFatherFather,
                "tree-mother-father-father"
              )
            : ""}

        ${motherFatherMother
            ? treeBox(
                motherFatherMother,
                "tree-mother-father-mother"
              )
            : ""}
    </div>

    <div class="family-tree-great-grandparent-couple">
        ${motherMotherFather
            ? treeBox(
                motherMotherFather,
                "tree-mother-mother-father"
              )
            : ""}

        ${motherMotherMother
            ? treeBox(
                motherMotherMother,
                "tree-mother-mother-mother"
              )
            : ""}
    </div>


    <!-- PARTNER SIDE -->

    <div class="family-tree-great-grandparent-couple">
        ${partnerFatherFatherFather
            ? treeBox(
                partnerFatherFather,
                "tree-partner-father-father-father"
              )
            : ""}

        ${partnerFatherFatherMother
            ? treeBox(
                partnerFatherFatherMother,
                "tree-partner-father-father-mother"
              )
            : ""}
    </div>

    <div class="family-tree-great-grandparent-couple">
        ${partnerFatherMotherFather
            ? treeBox(
                partnerFatherMotherFather,
                "tree-partner-father-mother-father"
              )
            : ""}

        ${partnerFatherMotherMother
            ? treeBox(
                partnerFatherMotherMother,
                "tree-partner-father-mother-mother"
              )
            : ""}
    </div>

    <div class="family-tree-great-grandparent-couple">
        ${partnerMotherFatherFather
            ? treeBox(
                partnerMotherFatherFather,
                "tree-partner-mother-father-father"
              )
            : ""}

        ${partnerMotherFatherMother
            ? treeBox(
                partnerMotherFatherMother,
                "tree-partner-mother-father-mother"
              )
            : ""}
    </div>

    <div class="family-tree-great-grandparent-couple">
        ${partnerMotherMotherFather
            ? treeBox(
                partnerMotherMotherFather,
                "tree-partner-mother-mother-father"
              )
            : ""}

        ${partnerMotherMotherMother
            ? treeBox(
                partnerMotherMotherMother,
                "tree-partner-mother-mother-mother"
              )
            : ""}
    </div>

</div>
   <div class="family-tree-grandparents-row">


    <!-- MEMBER FATHER PARENTS -->

    <div class="family-tree-grandparent-couple">

        ${
            fatherFather
                ? treeBox(
                    fatherFather,
                    "tree-father-father"
                  )
                : ""
        }

        ${
            fatherMother
                ? treeBox(
                    fatherMother,
                    "tree-father-mother"
                  )
                : ""
        }

    </div>


    <!-- MEMBER MOTHER PARENTS -->

    <div class="family-tree-grandparent-couple">

        ${
            motherFather
                ? treeBox(
                    motherFather,
                    "tree-mother-father"
                  )
                : ""
        }

        ${
            motherMother
                ? treeBox(
                    motherMother,
                    "tree-mother-mother"
                  )
                : ""
        }

    </div>


    <!-- PARTNER FATHER PARENTS -->

    <div class="family-tree-grandparent-couple">

        ${
            partnerFatherFather
                ? treeBox(
                    partnerFatherFather,
                    "tree-partner-father-father"
                  )
                : ""
        }

        ${
            partnerFatherMother
                ? treeBox(
                    partnerFatherMother,
                    "tree-partner-father-mother"
                  )
                : ""
        }

    </div>


    <!-- PARTNER MOTHER PARENTS -->

    <div class="family-tree-grandparent-couple">

        ${
            partnerMotherFather
                ? treeBox(
                    partnerMotherFather,
                    "tree-partner-mother-father"
                  )
                : ""
        }

        ${
            partnerMotherMother
                ? treeBox(
                    partnerMotherMother,
                    "tree-partner-mother-mother"
                  )
                : ""
        }

    </div>


</div>         

<!-- =====================
     PARENTS ROW
     ===================== -->

<div class="family-tree-top-row">


    <!-- =====================
         SELECTED MEMBER
         FATHER + MOTHER
         ===================== -->

    <div class="family-tree-parent-group">

        ${
            father
                ? treeBox(
                    father,
                    "tree-father"
                  )
                : ""
        }


        ${
            mother
                ? treeBox(
                    mother,
                    "tree-mother"
                  )
                : ""
        }

    </div>


    <!-- =====================
         PARTNER
         FATHER + MOTHER
         ===================== -->

    ${
        partner
        ? `

            <div class="family-tree-parent-group">

                ${
                    partnerFather
                        ? treeBox(
                            partnerFather,
                            "tree-partner-father"
                          )
                        : ""
                }


                ${
                    partnerMother
                        ? treeBox(
                            partnerMother,
                            "tree-partner-mother"
                          )
                        : ""
                }

            </div>

          `
        : ""
    }


</div>
            <!-- =====================
                 MAIN GENERATION
                 ===================== -->

 <div class="family-tree-main-row">

<div class="family-tree-siblings-row">

    ${siblingsHTML}

</div>


    <div class="family-tree-selected-branch">

    <div class="family-tree-selected-couple">

        ${treeBox(
            selectedMember,
            "tree-selected"
        )}

        ${
            partner
                ? treeBox(
                    partner,
                    "tree-partner"
                  )
                : ""
        }

    </div>


    ${
        children.length
            ? `
                <div class="family-tree-selected-children-row">

                    ${childrenHTML}

                </div>
              `
            : ""
    }

</div>

    ${
        partner
            ? `
            <div class="family-tree-partner-siblings-row">

    ${partnerSiblingsHTML}

</div>
              `
            : ""
    }

</div>


            <!-- =====================
                 CHILDREN
                 ===================== -->

          

        </div>

    </div>

`;
        
    requestAnimationFrame(
    function(){

        drawFamilyTreeLines();

        fitFamilyTreeToScreen();
       const zoomInBtn =
    document.getElementById(
        "familyTreeZoomIn"
    );

const zoomOutBtn =
    document.getElementById(
        "familyTreeZoomOut"
    );

const zoomResetBtn =
    document.getElementById(
        "familyTreeZoomReset"
    );


       
/* =====================================
   ZOOM IN
   ===================================== */

if(zoomInBtn){

    zoomInBtn.onclick =
        function(){

           familyTreeZoomFactor =
    Math.min(
        familyTreeZoomFactor * 1.5,
        10 / familyTreeBaseScale
    );
            applyFamilyTreeZoom();

        };

}


/* =====================================
   ZOOM OUT
   ===================================== */

if(zoomOutBtn){

    zoomOutBtn.onclick =
        function(){

            familyTreeZoomFactor =
                Math.max(
                    familyTreeZoomFactor / 1.5,
                    0.1
                );

            applyFamilyTreeZoom();
        };
}

/* =====================================
   RESET ZOOM
   ===================================== */

if(zoomResetBtn){

    zoomResetBtn.onclick =
        function(){

            familyTreeZoomFactor = 1;

            familyTreePanX = 0;
            familyTreePanY = 0;
            applyFamilyTreeZoom();

        };

}

/* =====================================
   FAMILY TREE
   PAN + PINCH ZOOM
   DESKTOP + MOBILE
   ===================================== */

const treeWrapper =
    document.querySelector(
        ".family-tree-scroll"
    );


if(treeWrapper){

    const activePointers =
        new Map();


    let pinchStartDistance = 0;
    let pinchStartZoom = 1;


    function getPointerDistance(){

        const points =
            Array.from(
                activePointers.values()
            );

        if(points.length < 2){
            return 0;
        }


        const dx =
            points[0].x -
            points[1].x;

        const dy =
            points[0].y -
            points[1].y;


        return Math.sqrt(
            dx * dx +
            dy * dy
        );

    }


    treeWrapper.addEventListener(
        "pointerdown",
        function(event){

            activePointers.set(
                event.pointerId,
                {
                    x: event.clientX,
                    y: event.clientY
                }
            );


            treeWrapper.setPointerCapture(
                event.pointerId
            );


            if(
                activePointers.size === 1
            ){

                familyTreeIsDragging =
                    true;

                familyTreeDragStartX =
                    event.clientX;

                familyTreeDragStartY =
                    event.clientY;

                familyTreePanStartX =
                    familyTreePanX;

                familyTreePanStartY =
                    familyTreePanY;


                treeWrapper.classList.add(
                    "dragging"
                );

            }


            if(
                activePointers.size === 2
            ){

                familyTreeIsDragging =
                    false;


                pinchStartDistance =
                    getPointerDistance();


                pinchStartZoom =
                    familyTreeZoomFactor;

            }


            event.preventDefault();

        }
    );


    treeWrapper.addEventListener(
        "pointermove",
        function(event){

            if(
                !activePointers.has(
                    event.pointerId
                )
            ){
                return;
            }


            activePointers.set(
                event.pointerId,
                {
                    x: event.clientX,
                    y: event.clientY
                }
            );


            /* =========================
               TWO FINGER PINCH
               ========================= */

            if(
                activePointers.size >= 2
            ){

                const currentDistance =
                    getPointerDistance();


                if(
                    pinchStartDistance > 0
                ){

                    const ratio =
                        currentDistance /
                        pinchStartDistance;


                    familyTreeZoomFactor =
                        Math.max(
                            5,
                            Math.min(
                                50,
                                pinchStartZoom *
                                ratio
                            )
                        );


                    applyFamilyTreeZoom();

                }


                event.preventDefault();

                return;

            }


            /* =========================
               ONE FINGER PAN
               ========================= */

            if(
                familyTreeIsDragging
            ){

                const moveX =
                    event.clientX -
                    familyTreeDragStartX;

                const moveY =
                    event.clientY -
                    familyTreeDragStartY;


                familyTreePanX =
                    familyTreePanStartX +
                    moveX;

                familyTreePanY =
                    familyTreePanStartY +
                    moveY;


                applyFamilyTreeZoom();

            }


            event.preventDefault();

        }
    );


    function endPointer(event){

        activePointers.delete(
            event.pointerId
        );


        if(
            treeWrapper.hasPointerCapture(
                event.pointerId
            )
        ){

            treeWrapper.releasePointerCapture(
                event.pointerId
            );

        }


        if(
            activePointers.size === 0
        ){

            familyTreeIsDragging =
                false;

            treeWrapper.classList.remove(
                "dragging"
            );

        }


        if(
            activePointers.size === 1
        ){

            const remainingPoint =
                Array.from(
                    activePointers.values()
                )[0];


            familyTreeIsDragging =
                true;


            familyTreeDragStartX =
                remainingPoint.x;

            familyTreeDragStartY =
                remainingPoint.y;


            familyTreePanStartX =
                familyTreePanX;

            familyTreePanStartY =
                familyTreePanY;

        }

    }


    treeWrapper.addEventListener(
        "pointerup",
        endPointer
    );


    treeWrapper.addEventListener(
        "pointercancel",
        endPointer
    );

}


       
    }
);  
        
        };

}

/* =====================================
   FAMILY TREE → BACK
   ===================================== */

const familyTreeBackBtn =
    document.getElementById(
        "familyTreeBackBtn"
    );


if(familyTreeBackBtn){

    familyTreeBackBtn.onclick =
        function(){

            const diagram =
                document.getElementById(
                    "familyTreeDiagram"
                );

            const treeCanvas =
                document.getElementById(
                    "familyTreeCanvas"
                );


            /* =====================================
               TREE OPEN UNTE
               → TREE CLEAR
               → SELECTION PAGE READY
               ===================================== */

            if(treeCanvas){

                if(diagram){

                    diagram.innerHTML =
                        "";

                }


                /* MEMBER CONTROL */

                const memberControl =
                    document.getElementById(
                        "familyTreeMemberSearch"
                    )?.closest(
                        ".family-tree-control"
                    );


                if(memberControl){

                    memberControl.style.display =
                        "";

                }


                /* GENERATION ROW */

                const generationRow =
                    document.querySelector(
                        ".family-tree-generation-row"
                    );


                if(generationRow){

                    generationRow.style.display =
                        "";

                }


                /* SHOW BUTTON */

                const showTreeBtn =
                    document.getElementById(
                        "showFamilyTreeBtn"
                    );


                if(showTreeBtn){

                    showTreeBtn.style.display =
                        "";

                }


                /* RESET MEMBER SEARCH */

                const searchInput =
                    document.getElementById(
                        "familyTreeMemberSearch"
                    );


                if(searchInput){

                    searchInput.value =
                        "";

                }


                selectedFamilyTreeMemberId =
                    "";


                /* CLOSE DROPDOWN */

                const dropdown =
                    document.getElementById(
                        "familyTreeMemberDropdown"
                    );


                if(dropdown){

                    dropdown.innerHTML =
                        "";

                    dropdown.style.display =
                        "none";

                }


                /* RESET ZOOM / PAN */

                familyTreeZoomFactor = 1;

                familyTreePanX = 0;

                familyTreePanY = 0;


                return;

            }


            /* =====================================
               TREE LEKAPOTHE
               → ONE STEP BACK TO FAMILY PAGE
               ===================================== */

            const mainFamilyBtn =
                document.getElementById(
                    "familyBtn"
                );


            if(mainFamilyBtn){

                mainFamilyBtn.click();

            }

        };

}
/* =====================================
   FAMILY TREE → HOME
   ===================================== */

const familyTreeHomeBtn =
    document.getElementById(
        "familyTreeHomeBtn"
    );

if(familyTreeHomeBtn){

    familyTreeHomeBtn.onclick =
        function(){

            const mainHomeBtn =
                document.getElementById(
                    "homeBtn"
                );

            if(mainHomeBtn){

                mainHomeBtn.click();

            }

        };

}
   
}
/* =====================================
   DRAW FAMILY TREE CONNECTING LINES
   ===================================== */

function drawFamilyTreeLines(){

    const canvas =
        document.getElementById(
            "familyTreeCanvas"
        );

    const svg =
        document.getElementById(
            "familyTreeLines"
        );


    if(!canvas || !svg){
        return;
    }


    const canvasRect =
        canvas.getBoundingClientRect();


    svg.setAttribute(
        "width",
        canvas.scrollWidth
    );

    svg.setAttribute(
        "height",
        canvas.scrollHeight
    );


    svg.innerHTML = "";


    function getPoint(
        element,
        position
    ){

        if(!element){
            return null;
        }

        const rect =
            element.getBoundingClientRect();


        const left =
            rect.left -
            canvasRect.left;


        const top =
            rect.top -
            canvasRect.top;


        if(position === "top"){

            return {
                x:
                    left +
                    rect.width / 2,

                y:
                    top
            };

        }


        if(position === "bottom"){

            return {
                x:
                    left +
                    rect.width / 2,

                y:
                    top +
                    rect.height
            };

        }


        if(position === "left"){

            return {
                x:
                    left,

                y:
                    top +
                    rect.height / 2
            };

        }


        return {
            x:
                left +
                rect.width,

            y:
                top +
                rect.height / 2
        };

    }


    function addLine(
        x1,
        y1,
        x2,
        y2
    ){

        const line =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
            );


        line.setAttribute(
            "x1",
            x1
        );

        line.setAttribute(
            "y1",
            y1
        );

        line.setAttribute(
            "x2",
            x2
        );

        line.setAttribute(
            "y2",
            y2
        );

        line.setAttribute(
            "class",
            "family-tree-svg-line"
        );


        svg.appendChild(
            line
        );

    }


    function connectCouple(
        first,
        second
    ){

        if(!first || !second){
            return null;
        }


        const p1 =
            getPoint(
                first,
                "right"
            );


        const p2 =
            getPoint(
                second,
                "left"
            );


        addLine(
            p1.x,
            p1.y,
            p2.x,
            p2.y
        );


        return {
            x:
                (
                    p1.x +
                    p2.x
                ) / 2,

            y:
                p1.y
        };

    }
function connectParentsToChildren(
    parentCenter,
    children
){

    if(
        !parentCenter ||
        !children ||
        !children.length
    ){
        return;
    }


    const childPoints =
        children
            .map(
                child =>
                    getPoint(
                        child,
                        "top"
                    )
            )
            .filter(Boolean);


    if(!childPoints.length){
        return;
    }


    /* =====================================
       SINGLE CHILD
       ===================================== */

    if(childPoints.length === 1){

        const childPoint =
            childPoints[0];


        const middleY =
            parentCenter.y +
            (
                childPoint.y -
                parentCenter.y
            ) / 2;


        /* Parent center ↓ */

        addLine(
            parentCenter.x,
            parentCenter.y,
            parentCenter.x,
            middleY
        );


        /* Horizontal adjustment */

        addLine(
            parentCenter.x,
            middleY,
            childPoint.x,
            middleY
        );


        /* ↓ exact child box top-center */

        addLine(
            childPoint.x,
            middleY,
            childPoint.x,
            childPoint.y
        );


        return;
    }


    /* =====================================
       MULTIPLE CHILDREN
       ===================================== */

    const childTopY =
        Math.min(
            ...childPoints.map(
                point => point.y
            )
        );


    const busY =
        parentCenter.y +
        (
            childTopY -
            parentCenter.y
        ) / 2;


    const minX =
        Math.min(
            ...childPoints.map(
                point => point.x
            )
        );


    const maxX =
        Math.max(
            ...childPoints.map(
                point => point.x
            )
        );


    /*
       Parent center kuda horizontal bus
       range lo compulsory include cheyyali
    */

    const busStartX =
        Math.min(
            minX,
            parentCenter.x
        );


    const busEndX =
        Math.max(
            maxX,
            parentCenter.x
        );


    /* Parent center ↓ bus */

    addLine(
        parentCenter.x,
        parentCenter.y,
        parentCenter.x,
        busY
    );


    /* Horizontal children bus */

    addLine(
        busStartX,
        busY,
        busEndX,
        busY
    );


    /* Bus ↓ each actual child box */

    childPoints.forEach(
        point => {

            addLine(
                point.x,
                busY,
                point.x,
                point.y
            );

        }
    );

}
/* =====================================
   GRANDPARENTS → PARENTS
   ===================================== */


/* -------------------------
   FATHER'S PARENTS → FATHER
   ------------------------- */

const fatherFather =
    canvas.querySelector(
        ".tree-father-father"
    );

const fatherMother =
    canvas.querySelector(
        ".tree-father-mother"
    );

const fatherNode =
    canvas.querySelector(
        ".tree-father"
    );


let fatherGrandParentCenter =
    null;


if(
    fatherFather &&
    fatherMother
){

    fatherGrandParentCenter =
        connectCouple(
            fatherFather,
            fatherMother
        );

}
else{

    const singleFatherParent =
        fatherFather ||
        fatherMother;

    if(singleFatherParent){

        fatherGrandParentCenter =
            getPoint(
                singleFatherParent,
                "bottom"
            );

    }

}


connectParentsToChildren(
    fatherGrandParentCenter,
    fatherNode
        ? [fatherNode]
        : []
);


/* -------------------------
   MOTHER'S PARENTS → MOTHER
   ------------------------- */

const motherFather =
    canvas.querySelector(
        ".tree-mother-father"
    );

const motherMother =
    canvas.querySelector(
        ".tree-mother-mother"
    );

const motherNode =
    canvas.querySelector(
        ".tree-mother"
    );


let motherGrandParentCenter =
    null;


if(
    motherFather &&
    motherMother
){

    motherGrandParentCenter =
        connectCouple(
            motherFather,
            motherMother
        );

}
else{

    const singleMotherParent =
        motherFather ||
        motherMother;

    if(singleMotherParent){

        motherGrandParentCenter =
            getPoint(
                singleMotherParent,
                "bottom"
            );

    }

}


connectParentsToChildren(
    motherGrandParentCenter,
    motherNode
        ? [motherNode]
        : []
);


/* -------------------------
   PARTNER FATHER'S PARENTS
   → PARTNER FATHER
   ------------------------- */

const partnerFatherFather =
    canvas.querySelector(
        ".tree-partner-father-father"
    );

const partnerFatherMother =
    canvas.querySelector(
        ".tree-partner-father-mother"
    );

const partnerFatherNode =
    canvas.querySelector(
        ".tree-partner-father"
    );


let partnerFatherGrandParentCenter =
    null;


if(
    partnerFatherFather &&
    partnerFatherMother
){

    partnerFatherGrandParentCenter =
        connectCouple(
            partnerFatherFather,
            partnerFatherMother
        );

}
else{

    const singlePartnerFatherParent =
        partnerFatherFather ||
        partnerFatherMother;

    if(singlePartnerFatherParent){

        partnerFatherGrandParentCenter =
            getPoint(
                singlePartnerFatherParent,
                "bottom"
            );

    }

}


connectParentsToChildren(
    partnerFatherGrandParentCenter,
    partnerFatherNode
        ? [partnerFatherNode]
        : []
);


/* -------------------------
   PARTNER MOTHER'S PARENTS
   → PARTNER MOTHER
   ------------------------- */

const partnerMotherFather =
    canvas.querySelector(
        ".tree-partner-mother-father"
    );

const partnerMotherMother =
    canvas.querySelector(
        ".tree-partner-mother-mother"
    );

const partnerMotherNode =
    canvas.querySelector(
        ".tree-partner-mother"
    );


let partnerMotherGrandParentCenter =
    null;


if(
    partnerMotherFather &&
    partnerMotherMother
){

    partnerMotherGrandParentCenter =
        connectCouple(
            partnerMotherFather,
            partnerMotherMother
        );

}
else{

    const singlePartnerMotherParent =
        partnerMotherFather ||
        partnerMotherMother;

    if(singlePartnerMotherParent){

        partnerMotherGrandParentCenter =
            getPoint(
                singlePartnerMotherParent,
                "bottom"
            );

    }

}


connectParentsToChildren(
    partnerMotherGrandParentCenter,
    partnerMotherNode
        ? [partnerMotherNode]
        : []
);
    /* ================================
       SELECTED MEMBER PARENTS
       ================================ */

    const father =
        canvas.querySelector(
            ".tree-father"
        );

    const mother =
        canvas.querySelector(
            ".tree-mother"
        );


    let parentCenter = null;


    if(father && mother){

        parentCenter =
            connectCouple(
                father,
                mother
            );

    }
    else{

        const singleParent =
            father || mother;


        if(singleParent){

            parentCenter =
                getPoint(
                    singleParent,
                    "bottom"
                );

        }

    }


    const siblings =
        Array.from(
            canvas.querySelectorAll(
                ".tree-sibling"
            )
        );


    const selected =
        canvas.querySelector(
            ".tree-selected"
        );


    const selectedChildrenRow =
        [
            ...siblings,
            selected
        ].filter(Boolean);


connectParentsToChildren(
    parentCenter,
    selectedChildrenRow
);

  /* =====================================
   SIBLING + PARTNER → THEIR CHILDREN
   ===================================== */

const siblingBranches =
    Array.from(
        canvas.querySelectorAll(
            ".family-tree-sibling-branch"
        )
    );


siblingBranches.forEach(
    branch => {

        const sibling =
            branch.querySelector(
                ".tree-sibling"
            );

        const siblingPartner =
            branch.querySelector(
                ".tree-sibling-partner"
            );

        const siblingChildren =
            Array.from(
                branch.querySelectorAll(
                    ".tree-sibling-child"
                )
            );


        let siblingCoupleCenter =
            null;


        if(
            sibling &&
            siblingPartner
        ){

            siblingCoupleCenter =
                connectCouple(
                    sibling,
                    siblingPartner
                );

        }
        else if(sibling){

            siblingCoupleCenter =
                getPoint(
                    sibling,
                    "bottom"
                );

        }


        connectParentsToChildren(
            siblingCoupleCenter,
            siblingChildren
        );

    }
); 
   /* ================================
       PARTNER PARENTS
       ================================ */

    const partnerFather =
        canvas.querySelector(
            ".tree-partner-father"
        );

    const partnerMother =
        canvas.querySelector(
            ".tree-partner-mother"
        );

    const partner =
        canvas.querySelector(
            ".tree-partner"
        );


    let partnerParentCenter = null;


    if(
        partnerFather &&
        partnerMother
    ){

       partnerParentCenter =
    connectCouple(
        partnerFather,
        partnerMother
    );
    }
    else{

        const singlePartnerParent =
            partnerFather ||
            partnerMother;


        if(singlePartnerParent){

            partnerParentCenter =
                getPoint(
                    singlePartnerParent,
                    "bottom"
                );

        }

    }


 /* =====================================
   PARTNER PARENTS
   → PARTNER + PARTNER SIBLINGS
   ===================================== */

const partnerSiblings =
    Array.from(
        canvas.querySelectorAll(
            ".tree-partner-sibling"
        )
    );


const partnerChildrenRow =
    [
        partner,
        ...partnerSiblings
    ].filter(Boolean);


connectParentsToChildren(
    partnerParentCenter,
    partnerChildrenRow
);

   
/* =====================================
   PARTNER SIBLING + PARTNER
   → THEIR CHILDREN
   ===================================== */

const partnerSiblingBranches =
    Array.from(
        canvas.querySelectorAll(
            ".family-tree-partner-sibling-branch"
        )
    );


partnerSiblingBranches.forEach(
    branch => {

        const sibling =
            branch.querySelector(
                ".tree-partner-sibling"
            );

        const siblingPartner =
            branch.querySelector(
                ".tree-partner-sibling-partner"
            );

        const siblingChildren =
            Array.from(
                branch.querySelectorAll(
                    ".tree-partner-sibling-child"
                )
            );


        let siblingCoupleCenter =
            null;


        if(
            sibling &&
            siblingPartner
        ){

            /* sibling ↔ partner horizontal line */

            siblingCoupleCenter =
                connectCouple(
                    sibling,
                    siblingPartner
                );

        }
        else if(sibling){

            siblingCoupleCenter =
                getPoint(
                    sibling,
                    "bottom"
                );

        }


        /* couple → biological children */

        connectParentsToChildren(
            siblingCoupleCenter,
            siblingChildren
        );

    }
);
   
    /* ================================
       SELECTED + PARTNER
       ================================ */

    let selectedCoupleCenter = null;


    if(selected && partner){

        selectedCoupleCenter =
            connectCouple(
                selected,
                partner
            );

    }
    else if(selected){

        selectedCoupleCenter =
            getPoint(
                selected,
                "bottom"
            );

    }


    /* ================================
       CHILDREN
       ================================ */

    const childBranches =
    Array.from(
        canvas.querySelectorAll(
            ".family-tree-child-branch"
        )
    );


const childTargets =
    childBranches
        .map(
            branch => {

                const child =
                    branch.querySelector(
                        ".tree-child-node"
                    );

                const childPartner =
                    branch.querySelector(
                        ".tree-child-partner"
                    );


                if(
                    child &&
                    childPartner
                ){

                    return {
                        child,
                        childPartner,
                        couple: true
                    };

                }


                if(child){

                    return {
                        child,
                        childPartner: null,
                        couple: false
                    };

                }


                return null;

            }
        )
        .filter(Boolean);


/* CHILD / CHILD-PARTNER COUPLE LINES */

const childCenters = [];


childTargets.forEach(
    item => {

        if(
            item.couple &&
            item.childPartner
        ){

            connectCouple(
                item.child,
                item.childPartner
            );

            const childTop =
                getPoint(
                    item.child,
                    "top"
                );

            childCenters.push(
                {
                    element:
                        item.child,

                    x:
                        childTop.x,

                    y:
                        childTop.y
                }
            );

        }
        else{

            const topPoint =
                getPoint(
                    item.child,
                    "top"
                );

            childCenters.push(
                {
                    element:
                        item.child,

                    x:
                        topPoint.x,

                    y:
                        topPoint.y
                }
            );

        }

    }
);
   

/* =====================================
   SELECTED COUPLE → CHILDREN
   ===================================== */

if(
    selectedCoupleCenter &&
    childCenters.length
){

    const childTopY =
        Math.min(
            ...childCenters.map(
                point => point.y
            )
        );


    /* parents/spouse line mariyu
       children madhya bus position */

    const childBusY =
        selectedCoupleCenter.y +
        (
            childTopY -
            selectedCoupleCenter.y
        ) / 2;


    /* =================================
       COUPLE MIDPOINT → DOWN TO BUS
       ================================= */

    addLine(
        selectedCoupleCenter.x,
        selectedCoupleCenter.y,
        selectedCoupleCenter.x,
        childBusY
    );


    /* =================================
       ONLY ONE CHILD
       ================================= */

    if(childCenters.length === 1){

        const childPoint =
            childCenters[0];


        /* bus level lo child X varaku */

        addLine(
            selectedCoupleCenter.x,
            childBusY,
            childPoint.x,
            childBusY
        );


        /* child box TOP-CENTER varaku */

        addLine(
            childPoint.x,
            childBusY,
            childPoint.x,
            childPoint.y
        );

    }


    /* =================================
       TWO OR MORE CHILDREN
       ================================= */

    else{

        const minChildX =
            Math.min(
                ...childCenters.map(
                    point => point.x
                )
            );


        const maxChildX =
            Math.max(
                ...childCenters.map(
                    point => point.x
                )
            );


        /*
           Couple midpoint horizontal bus
           range bayata unna kuda
           line disconnect kakunda include chestam
        */

        const busStartX =
            Math.min(
                minChildX,
                selectedCoupleCenter.x
            );


        const busEndX =
            Math.max(
                maxChildX,
                selectedCoupleCenter.x
            );


        /* horizontal children bus */

        addLine(
            busStartX,
            childBusY,
            busEndX,
            childBusY
        );


        /* bus → ONLY actual child boxes */

        childCenters.forEach(
            childPoint => {

                addLine(
                    childPoint.x,
                    childBusY,
                    childPoint.x,
                    childPoint.y
                );

            }
        );

    }

}

   /* =====================================
   MEMBER SIBLING CHILD + PARTNER
   → THEIR CHILDREN
   ===================================== */

const siblingChildBranches =
    Array.from(
        canvas.querySelectorAll(
            ".family-tree-sibling-child-branch"
        )
    );


siblingChildBranches.forEach(
    branch => {

        const child =
            branch.querySelector(
                ".tree-sibling-child"
            );

        const childPartner =
            branch.querySelector(
                ".tree-sibling-child-partner"
            );

        const grandChildren =
            Array.from(
                branch.querySelectorAll(
                    ".tree-sibling-grandchild"
                )
            );


        let childCoupleCenter = null;


        if(
            child &&
            childPartner
        ){

            childCoupleCenter =
                connectCouple(
                    child,
                    childPartner
                );

        }
        else if(child){

            childCoupleCenter =
                getPoint(
                    child,
                    "bottom"
                );

        }


        connectParentsToChildren(
            childCoupleCenter,
            grandChildren
        );

    }
);


/* =====================================
   PARTNER SIBLING CHILD + PARTNER
   → THEIR CHILDREN
   ===================================== */

const partnerSiblingChildBranches =
    Array.from(
        canvas.querySelectorAll(
            ".family-tree-partner-sibling-child-branch"
        )
    );


partnerSiblingChildBranches.forEach(
    branch => {

        const child =
            branch.querySelector(
                ".tree-partner-sibling-child"
            );

        const childPartner =
            branch.querySelector(
                ".tree-partner-sibling-child-partner"
            );

        const grandChildren =
            Array.from(
                branch.querySelectorAll(
                    ".tree-partner-sibling-grandchild"
                )
            );


        let childCoupleCenter = null;


        if(
            child &&
            childPartner
        ){

            childCoupleCenter =
                connectCouple(
                    child,
                    childPartner
                );

        }
        else if(child){

            childCoupleCenter =
                getPoint(
                    child,
                    "bottom"
                );

        }


        connectParentsToChildren(
            childCoupleCenter,
            grandChildren
        );

    }
);
    /* ================================
       GRAND CHILDREN
       ================================ */

    const branches =
        canvas.querySelectorAll(
            ".family-tree-child-branch"
        );


    branches.forEach(
        branch => {

            const child =
                branch.querySelector(
                    ".tree-child-node"
                );


            const grandChildren =
                Array.from(
                    branch.querySelectorAll(
                        ".tree-grandchild-node"
                    )
                );


            if(
                !child ||
                !grandChildren.length
            ){
                return;
            }


            const childPartner =
    branch.querySelector(
        ".tree-child-partner"
    );


let childParentCenter;


if(
    childPartner
){

    const childRight =
        getPoint(
            child,
            "right"
        );

    const partnerLeft =
        getPoint(
            childPartner,
            "left"
        );


    childParentCenter = {
        x:
            (
                childRight.x +
                partnerLeft.x
            ) / 2,

        y:
            childRight.y
    };

}
else{

    childParentCenter =
        getPoint(
            child,
            "bottom"
        );

}


connectParentsToChildren(
    childParentCenter,
    grandChildren
);
        }
    );
/* =====================================
   GRANDCHILD + PARTNER
   → GREAT GRANDCHILDREN
   ===================================== */

const grandChildBranches =
    Array.from(
        canvas.querySelectorAll(
            ".family-tree-grandchild-branch"
        )
    );

grandChildBranches.forEach(
    branch => {

        const grandChild =
            branch.querySelector(
                ".tree-grandchild-node"
            );

        const grandChildPartner =
            branch.querySelector(
                ".tree-grandchild-partner"
            );

        const greatGrandChildren =
            Array.from(
                branch.querySelectorAll(
                    ".tree-great-grandchild-node"
                )
            );

        let grandChildCoupleCenter = null;

        if(
            grandChild &&
            grandChildPartner
        ){

            grandChildCoupleCenter =
                connectCouple(
                    grandChild,
                    grandChildPartner
                );

        }
        else if(grandChild){

            grandChildCoupleCenter =
                getPoint(
                    grandChild,
                    "bottom"
                );

        }

        connectParentsToChildren(
            grandChildCoupleCenter,
            greatGrandChildren
        );

    }
);
}

