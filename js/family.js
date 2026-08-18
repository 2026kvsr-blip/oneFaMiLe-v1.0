/* =====================================
   oneFaMiLe
   FAMILY MODULE
   ===================================== */


/* =====================================
   FAMILY MAIN PAGE
   ===================================== */

familyBtn.onclick = () => {
    updateMenuIcon();

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

function generateFamilyId(familyName){

    const cleanName =
        familyName
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "");

    const namePart =
        cleanName
            .substring(0,4)
            .padEnd(4,"X");

    const uniquePart =
        Math.random()
            .toString(36)
            .substring(2,6)
            .toUpperCase();

    return `FAM-${namePart}-${uniquePart}`;
}
    /* =====================================
       FAMILY → ADD TREE
       ===================================== */

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

                <span>
                    Family ID
                </span>

                <strong
                    id="newFamilyId">
                    -
                </strong>

            </div>


            <!-- FAMILY NAME -->

            <div class="family-row">

                <span>
                    Family Name
                </span>

                <input
                    type="text"
                    id="newFamilyName"
                    placeholder="Enter Family Name"
                    autocomplete="off"
                >

            </div>


        </div>


        <!-- CREATE BUTTON -->

        <div class="family-create-action">

            <button
                id="createFamilyTreeBtn"
                class="grid-btn">

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


                /* LESS THAN 4 LETTERS */

                if(familyName.length < 4){

                    familyIdField.textContent =
                        "-";

                    return;
                }


                /* 4 OR MORE LETTERS */

                familyIdField.textContent =
                    generateFamilyId(
                        familyName
                    );

            }
        );


    /* =====================================
       CREATE FAMILY TREE
       ===================================== */

    document
        .getElementById("createFamilyTreeBtn")
        .onclick = () => {


        const familyName =
            document
                .getElementById(
                    "newFamilyName"
                )
                .value
                .trim();


        /* =================================
           MINIMUM 4 LETTERS
           ================================= */

        if(familyName.length < 4){

            validationMessage(
                "Family Name must contain at least 4 letters.",
                document.getElementById(
                    "newFamilyName"
                )
            );

            return;
        }


        /* =================================
           GET GENERATED FAMILY ID
           ================================= */

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


        /* =================================
           SAVE CURRENT FAMILY
           ================================= */

        localStorage.setItem(
            "currentFamily",
            JSON.stringify(
                familyData
            )
        );


        /* =================================
           SAVE FAMILY LIST
           ================================= */

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


        /* =================================
           SUCCESS
           ================================= */

        showMessage(
            "Family Tree Created Successfully.",
            "success",
            3000
        );


        /* =================================
           RETURN TO FAMILY MENU
           ================================= */

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
