/* =====================================
   oneFaMiLe
   FAMILY MODULE
   ===================================== */

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


        /* ================================
           AUTOMATIC FAMILY ID
           ================================ */

        const familyId =
            "FAM-" +
            Date.now()
                .toString(36)
                .toUpperCase();


        /* ================================
           CREATE FAMILY TREE PAGE
           ================================ */

        showPage(

    pageTitle(
        "Create Family Tree",
        "images/colorbtns/AddFamily1.png"
    )

    +`

    <div class="family-info-form">

        <div class="family-field">

            <span class="family-label">
                Family ID
            </span>

            <span class="family-colon">
                :
            </span>

            <input
                type="text"
                id="newFamilyId"
                placeholder="Enter Family Name first"
                readonly
            >

        </div>


        <div class="family-field">

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
                autocomplete="off"
            >

        </div>


        <div align="center">

            <button
                id="createFamilyTreeBtn"
                class="primary-btn">

                Create Family Tree

            </button>

        </div>


        <div align="center">

            <button
                id="createFamilyBackBtn"
                class="back-btn">

                ← Back

            </button>

        </div>

    </div>

    `
);
        /* =====================================
           CREATE FAMILY TREE
           ===================================== */

        document
            .getElementById("createFamilyTreeBtn")
            .onclick = () => {


            const familyName =
                document
                    .getElementById("newFamilyName")
                    .value
                    .trim();


            if(!familyName){

                validationMessage(
                    "Please enter Family Name.",
                    document.getElementById(
                        "newFamilyName"
                    )
                );

                return;
            }


            /* ============================
               FAMILY OBJECT
               ============================ */

           const familyData = {

    familyId:
        document.getElementById(
            "newFamilyId"
        ).value,

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

            /* ============================
               SAVE CURRENT FAMILY
               ============================ */

            localStorage.setItem(
                "currentFamily",
                JSON.stringify(
                    familyData
                )
            );


            /* ============================
               SAVE FAMILY LIST
               ============================ */

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


            /* ============================
               RETURN TO FAMILY MENU
               ============================ */

            familyBtn.click();

        };


        /* =====================================
           CREATE FAMILY TREE → BACK
           ===================================== */

        document
            .getElementById("createFamilyBackBtn")
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
