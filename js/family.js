/* =====================================
   oneFaMiLe
   FAMILY MODULE
   ===================================== */
/* =====================================
   GENERATE FAMILY ID
   ===================================== */

/* =====================================
   GENERATE UNIQUE FAMILY ID
   ===================================== */

function generateFamilyId(familyName){

    const cleanName =
        familyName
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "");

    const namePart =
        cleanName.substring(0,4);

    const uniquePart =
        Math.random()
            .toString(36)
            .substring(2,8)
            .toUpperCase();

    return `FAM-${namePart}-${uniquePart}`;
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
<div
        id="familyIdStatus"
        class="family-id-status">
    </div>



                <!-- FAMILY NAME -->

                <div class="family-row">

                    <span class="family-label">
                        Family Name
                    </span>

                    <span class="family-colon">
                        :
                    </span>

                    <input
                        type="text"
                        id="newFamilyName"
                        placeholder="Enter Family Name"
                            maxlength="20"

                        autocomplete="off"
                    >

                </div>

            </div>


            <!-- CREATE BUTTON -->

            <div class="family-create-action">

               <button
    id="createFamilyTreeBtn"
    class="family-create-btn">

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
           FAMILY NAME → GENERATE FAMILY ID
           ===================================== */

      /* =====================================
   FAMILY NAME → FAMILY ID
   ===================================== */

/* =====================================
   FAMILY NAME → FAMILY ID
   VERIFY AVAILABILITY
   ===================================== */

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
               RESET STATUS
               ================================= */

            statusField.textContent = "";

            statusField.className =
                "family-id-status";

            createBtn.disabled = true;


            /* =================================
               EMPTY / LESS THAN 4 LETTERS
               ================================= */

            if(familyName.length < 4){

                familyIdField.textContent =
                    "auto generation";

                familyIdField.classList.remove(
                    "generated"
                );

                return;
            }


            /* =================================
               GENERATE ONLY ON FIRST 4 LETTERS
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
               GET FIXED FAMILY ID
               ================================= */

            const generatedFamilyId =
                familyIdField.textContent.trim();


            /* =================================
               VERIFYING
               ================================= */

            statusField.textContent =
                "Verifying...";

            statusField.className =
                "family-id-status verifying";


            /* =================================
               CHECK EXISTING FAMILY IDS
               ================================= */

            setTimeout(
                function(){

                    const existingFamilies =
                        JSON.parse(
                            localStorage.getItem(
                                "familyTrees"
                            ) || "[]"
                        );


                    const alreadyExists =
                        existingFamilies.some(
                            function(family){

                                return (
                                    family.familyId ===
                                    generatedFamilyId
                                );

                            }
                        );


                    /* =========================
                       ID NOT AVAILABLE
                       ========================= */

                    if(alreadyExists){

                        statusField.textContent =
                            "Family ID not available";

                        statusField.className =
                            "family-id-status not-available";

                        createBtn.disabled = true;

                        return;
                    }


                    /* =========================
                       ID AVAILABLE
                       ========================= */

                    statusField.textContent =
                        "Family ID available";

                    statusField.className =
                        "family-id-status available";

                    createBtn.disabled = false;

                },
                800
            );

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
    .onclick = () => {


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
       CHECK AGAINST EXISTING FAMILIES
       ================================ */

    const existingFamilies =
        JSON.parse(
            localStorage.getItem(
                "familyTrees"
            ) || "[]"
        );


    const duplicateFamily =
        existingFamilies.some(
            function(family){

                return (
                    family.familyId ===
                    savedFamilyId
                );

            }
        );


    /* ================================
       DUPLICATE ID
       ================================ */

    if(duplicateFamily){

        showMessage(
            "This Family ID already exists. Please try again.",
            "warning",
            3000
        );

        return;
    }


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
       SUCCESS MESSAGE
       ================================ */

    showMessage(
        "Family Tree Created Successfully.",
        "success",
        3000
    );


    /* ================================
       RETURN TO FAMILY PAGE
       ================================ */

    familyBtn.click();

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
