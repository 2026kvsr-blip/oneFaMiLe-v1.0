

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
    <h3>Children</h3>

    <div
        id="relationChildren">
        --------
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
    class="relations-section relation-father-siblings">

    <h3>Father Siblings</h3>

    <div
        id="relationFatherSiblings">
        --------
    </div>

</div>


<!-- 6. MOTHER SIBLINGS -->
<div
    id="relationMotherSiblingsSection"
    class="relations-section relation-mother-siblings">

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


    const childrenSection =
        document.getElementById(
            "relationChildrenSection"
        );


    const childrenField =
        document.getElementById(
            "relationChildren"
        );


    if(!isMarried){

        hideSection(
            "relationChildrenSection"
        );

    }
    else{

        showSection(
            "relationChildrenSection"
        );


        if(childrenField){            childrenField.innerHTML =                "";
            if(children.length === 0){                childrenField.textContent =                    "No";            }
            else{                children.forEach(                    function(                        child,                        index                    ){
                        const div =                            document.createElement(                                "div"                            );
                        div.textContent =          (index + 1) +         ". " +       (         getName(child) ||               "--------"                        );
                        childrenField.appendChild(                            div                        );                    }
                );

            }

        }
const childrenSection =
    document.getElementById(
        "relationChildrenSection"
    );

if(childrenSection){

    if(isMarried){

        childrenSection.style.display =
            "block";

    }
    else{

        childrenSection.style.display =
            "none";

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


    const fatherSiblingsField =
        document.getElementById(
            "relationFatherSiblings"
        );


    if(fatherSiblingsField){

        fatherSiblingsField.innerHTML =
            "";


        fatherSiblings.forEach(
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
                    getName(item);

                fatherSiblingsField.appendChild(
                    div
                );

            }
        );

    }


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


    const motherSiblingsField =
        document.getElementById(
            "relationMotherSiblings"
        );


    if(motherSiblingsField){

        motherSiblingsField.innerHTML =
            "";


        motherSiblings.forEach(
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
                    getName(item);

                motherSiblingsField.appendChild(
                    div
                );

            }
        );

    }


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


    const fatherInLawSiblingsField =
        document.getElementById(
            "relationFatherInLawSiblings"
        );


    if(fatherInLawSiblingsField){

        fatherInLawSiblingsField.innerHTML =
            "";


        fatherInLawSiblings.forEach(
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
                    getName(item);

                fatherInLawSiblingsField.appendChild(
                    div
                );

            }
        );

    }


   if(
    isMarried &&
    fatherInLawSiblings.length
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


    const motherInLawSiblingsField =
        document.getElementById(
            "relationMotherInLawSiblings"
        );


    if(motherInLawSiblingsField){

        motherInLawSiblingsField.innerHTML =
            "";


        motherInLawSiblings.forEach(
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
                    getName(item);

                motherInLawSiblingsField.appendChild(
                    div
                );

            }
        );

    }


   if(
    isMarried &&
    motherInLawSiblings.length
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

    const grandParents = [];


    if(father){

        const paternalGrandFather =
            findMember(
                father.fatherId
            );

        const paternalGrandMother =
            findMember(
                father.motherId
            );


        if(paternalGrandFather){

            grandParents.push(
                paternalGrandFather
            );

        }

        if(paternalGrandMother){

            grandParents.push(
                paternalGrandMother
            );

        }

    }


    if(mother){

        const maternalGrandFather =
            findMember(
                mother.fatherId
            );

        const maternalGrandMother =
            findMember(
                mother.motherId
            );


        if(
            maternalGrandFather &&
            !grandParents.some(
                function(item){

                    return String(
                        item.memberId
                    ) === String(
                        maternalGrandFather.memberId
                    );

                }
            )
        ){

            grandParents.push(
                maternalGrandFather
            );

        }


        if(
            maternalGrandMother &&
            !grandParents.some(
                function(item){

                    return String(
                        item.memberId
                    ) === String(
                        maternalGrandMother.memberId
                    );

                }
            )
        ){

            grandParents.push(
                maternalGrandMother
            );

        }

    }


    const grandParentsField =
        document.getElementById(
            "relationGrandParents"
        );


    if(grandParentsField){

        grandParentsField.innerHTML =
            "";


        grandParents.forEach(
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
                    getName(item);

                grandParentsField.appendChild(
                    div
                );

            }
        );

    }


    if(grandParents.length){

    const grandParentsSection =
        document.getElementById(
            "relationGrandParentsSection"
        );

    if(grandParentsSection){

        grandParentsSection.style.display =
            "block";

    }

}
else{

    hideSection(
        "relationGrandParentsSection"
    );

}

    /* =================================
       11. GRAND GRAND PARENTS
       ================================= */

    const grandGrandParents = [];


    grandParents.forEach(
        function(grandParent){

            const ggFather =
                findMember(
                    grandParent.fatherId
                );

            const ggMother =
                findMember(
                    grandParent.motherId
                );


            if(
                ggFather &&
                !grandGrandParents.some(
                    function(item){

                        return String(
                            item.memberId
                        ) === String(
                            ggFather.memberId
                        );

                    }
                )
            ){

                grandGrandParents.push(
                    ggFather
                );

            }


            if(
                ggMother &&
                !grandGrandParents.some(
                    function(item){

                        return String(
                            item.memberId
                        ) === String(
                            ggMother.memberId
                        );

                    }
                )
            ){

                grandGrandParents.push(
                    ggMother
                );

            }

        }
    );


    const grandGrandParentsField =
        document.getElementById(
            "relationGrandGrandParents"
        );


    if(grandGrandParentsField){

        grandGrandParentsField.innerHTML =
            "";


        grandGrandParents.forEach(
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
                    getName(item);

                grandGrandParentsField.appendChild(
                    div
                );

            }
        );

    }


   if(
    grandGrandParents.length
){

    const grandGrandParentsSection =
        document.getElementById(
            "relationGrandGrandParentsSection"
        );

    if(grandGrandParentsSection){

        grandGrandParentsSection.style.display =
            "block";

    }

}
else{

    hideSection(
        "relationGrandGrandParentsSection"
    );

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
            motherInLawSiblings,
            grandParents,
            grandGrandParents
        }
    );

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
            savedFamily.familyId || "-";

    }


    if(newFamilyNameField){

        newFamilyNameField.value =
            savedFamily.familyName || "";

        newFamilyNameField.disabled =
            true;

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
