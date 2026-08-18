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
               LESS THAN 4 CHARACTERS
               ================================= */

            if(familyName.length < 4){

                familyIdField.textContent =
                    "Auto generation";

                familyIdField.classList.remove(
                    "generated"
                );


                statusField.textContent =
                    "";

                statusField.className =
                    "family-id-status";


                createBtn.disabled =
                    true;

                return;
            }


            /* =================================
               DO NOT CHANGE ID AFTER GENERATED
               ================================= */

            if(
                familyIdField.classList.contains(
                    "generated"
                )
            ){

                return;
            }


            /* =================================
               VERIFYING
               ================================= */

            statusField.className =
                "family-id-status verifying";

            statusField.innerHTML =
                `<span class="verify-spinner"></span>
                 Verifying...`;


            createBtn.disabled =
                true;


            /* =================================
               GENERATE ID ONCE
               ================================= */

            const familyId =
                generateFamilyId(
                    familyName
                );


            familyIdField.textContent =
                familyId;


            familyIdField.classList.add(
                "generated"
            );


            /* =================================
               CHECK ID
               ================================= */

            setTimeout(() => {

                const available =
                    isFamilyIdAvailable(
                        familyId
                    );


                if(available){

                    statusField.className =
                        "family-id-status available";

                    statusField.textContent =
                        "✓ Family ID available";


                    createBtn.disabled =
                        false;

                }
                else{

                    statusField.className =
                        "family-id-status not-available";

                    statusField.textContent =
                        "✕ Family ID not available";


                    createBtn.disabled =
                        true;

                }

            }, 700);

        }
    );

        /* =====================================
           CREATE FAMILY TREE
           ===================================== */

        document
            .getElementById("createFamilyTreeBtn")
            .onclick = () => {

const familyId =
    document
        .getElementById(
            "newFamilyId"
        )
        .textContent
        .trim();


const statusField =
    document.getElementById(
        "familyIdStatus"
    );


/* =================================
   FAMILY ID MUST BE AVAILABLE
   ================================= */

if(
    !familyId ||
    familyId === "Auto generation" ||
    !statusField.classList.contains(
        "available"
    )
){

    showMessage(
        "Family ID is not available.",
        "warning",
        3000
    );

    return;
}
            const familyName =
                document
                    .getElementById(
                        "newFamilyName"
                    )
                    .value
                    .trim();


            if(familyName.length < 4){

                validationMessage(
                    "Family Name at least 4 letters.",
                    document.getElementById(
                        "newFamilyName"
                    )
                );

                return;
            }


            const familyId =
                document
                    .getElementById(
                        "newFamilyId"
                    )
                    .textContent
                    .trim();


            if(!familyId || familyId === "-"){

                showMessage(
                    "Family ID could not be generated.",
                    "warning",
                    3000
                );

                return;
            }


            /* =================================
               FAMILY OBJECT
               ================================= */

            const familyData = {

                familyId:
                    familyId,

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


            localStorage.setItem(
                "currentFamily",
                JSON.stringify(
                    familyData
                )
            );


            const existingFamilies =
                JSON.parse(
                    localStorage.getItem(
                        "familyTrees"
                    ) || "[]"
                );


            existingFamilies.push(
                familyData
            );


            localStorage.setItem(
    "familyTrees",
    JSON.stringify(
        existingFamilies
    )
);


            showMessage(
                "Family Tree Created Successfully.",
                "success",
                3000
            );


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
