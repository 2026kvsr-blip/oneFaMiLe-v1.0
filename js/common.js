/* =========================================
   oneFaMiLe
   COMMON JAVASCRIPT
   ========================================= */

function getCurrentUser(){

   
    try{

        const user =
            JSON.parse(
                sessionStorage.getItem("user")
            );

        return user || null;

    }catch(error){

        console.error(
            "Unable to read current user:",
            error
        );

        return null;
    }
}


function getUserIdentity(){

    const user =
        getCurrentUser();


    if(!user){

        return {

            loginUserName: "",
            email: "",
            mobile: ""

        };

    }


    return {

        loginUserName:
            user.loginUserName || "",

        email:
            user.email || "",

        mobile:
            user.mobile || ""

    };

}
/* =========================================
   COMMON FORM FUNCTIONS
   ========================================= */


/* =========================================
   CREATE INPUT FIELD
   ========================================= */

function createInputField(
    labelText,
    inputId,
    type = "text",
    placeholder = ""
){

    const group =
        document.createElement("div");

    group.className =
        "common-form-group";


    /* ================================
       LABEL
       ================================ */

    const label =
        document.createElement("label");

    label.className =
        "common-form-label";

    label.textContent =
        labelText;

    label.htmlFor =
        inputId;


    /* ================================
       COLON
       ================================ */

    const colon =
        document.createElement("span");

    colon.className =
        "common-form-colon";

    colon.textContent =
        ":";


    /* ================================
       INPUT
       ================================ */

    const input =
        document.createElement("input");

    input.className =
        "common-form-input";

    input.id =
        inputId;

    input.type =
        type;

    input.placeholder =
        placeholder;


    /* ================================
       BUILD ROW
       ================================ */

    group.appendChild(
        label
    );

    group.appendChild(
        colon
    );

    group.appendChild(
        input
    );


    return group;
}

/* =========================================
   CREATE SELECT FIELD
   ========================================= */

function createSelectField(
    labelText,
    selectId,
    options = []
){

    const group =
        document.createElement("div");

    group.className =
        "common-form-group";


    const label =
        document.createElement("label");

    label.className =
        "common-form-label";
label.textContent =
    labelText;
    label.htmlFor =
        selectId;


    const select =
        document.createElement("select");

    select.className =
        "common-form-select";

    select.id =
        selectId;


    options.forEach(
        function(option){

            const optionElement =
                document.createElement("option");

            optionElement.value =
                option.value;

            optionElement.textContent =
                option.label;

            select.appendChild(
                optionElement
            );

        }
    );


    group.appendChild(label);
    group.appendChild(select);


    return group;
}


/* =========================================
   CREATE RADIO FIELD
   ========================================= */

function createRadioField(
    labelText,
    name,
    options = []
){

    const group =
        document.createElement("div");

    group.className =
        "common-form-group";


    const label =
        document.createElement("div");

    label.className =
        "common-form-label";

   label.textContent =
    labelText;

    const radioGroup =
        document.createElement("div");

    radioGroup.className =
        "common-radio-group";


    options.forEach(
        function(option){

            const item =
                document.createElement("label");

            item.className =
                "common-radio-item";


            const radio =
                document.createElement("input");

            radio.type =
                "radio";

            radio.name =
                name;

            radio.value =
                option.value;


            const text =
                document.createElement("span");

            text.textContent =
                option.label;


            item.appendChild(radio);
            item.appendChild(text);

            radioGroup.appendChild(item);

        }
    );


    group.appendChild(label);
    group.appendChild(radioGroup);


    return group;
}


/* =========================================
   CREATE PRIMARY BUTTON
   ========================================= */

function createPrimaryButton(
    text,
    buttonId
){

    const button =
        document.createElement("button");

    button.type =
        "button";

    button.id =
        buttonId;

    button.className =
        "common-primary-btn";

    button.textContent =
        text;


    return button;
}


/* =========================================
   CREATE SECONDARY BUTTON
   ========================================= */

function createSecondaryButton(
    text,
    buttonId
){

    const button =
        document.createElement("button");

    button.type =
        "button";

    button.id =
        buttonId;

    button.className =
        "common-secondary-btn";

    button.textContent =
        text;


    return button;
}


/* =========================================
   CREATE BACK BUTTON
   ========================================= */

function createBackButton(
    buttonId
){

    const button =
        document.createElement("button");

    button.type =
        "button";

    button.id =
        buttonId;

    button.className =
        "common-back-btn";

    button.textContent =
        "← Back";


    return button;
}


/* =========================================
   SHOW FORM STATUS
   ========================================= */

function showFormStatus(
    element,
    message,
    type = ""
){

    if(!element){
        return;
    }


    element.textContent =
        message;


    element.className =
        "common-status";


    if(type){

        element.classList.add(
            type
        );

    }

}
/* =========================================
   COMMON FORM TEST
   ========================================= */

function createCommonFormTest(){

    const container =
        document.getElementById(
            "commonFormTest"
        );

    if(!container){
        return;
    }
    container.innerHTML = "";
    /* ================================
       PAGE
       ================================ */
    const page =
        document.createElement("div");

    page.className =
        "common-page";


    /* ================================
       TITLE
       ================================ */

    const title =
        document.createElement("div");

    title.className =
        "common-page-title";

    title.textContent =
        "Common Form Test";


    /* ================================
       FORM
       ================================ */

    const form =
        document.createElement("div");

    form.className =
        "common-form";


    /* ================================
       INPUT
       ================================ */

    form.appendChild(
        createInputField(
            "Name",
            "testName",
            "text",
            "Enter Name"
        )
    );


    /* ================================
       SELECT
       ================================ */

    form.appendChild(
        createSelectField(
            "Gender",
            "testGender",
            [
                {
                    value: "",
                    label: "Select Gender"
                },
                {
                    value: "Male",
                    label: "Male"
                },
                {
                    value: "Female",
                    label: "Female"
                }
            ]
        )
    );


    /* ================================
       RADIO
       ================================ */

    form.appendChild(
        createRadioField(
            "Marital Status",
            "testMaritalStatus",
            [
                {
                    value: "Yes",
                    label: "Yes"
                },
                {
                    value: "No",
                    label: "No"
                }
            ]
        )
    );


    /* ================================
       STATUS
       ================================ */

    const status =
        document.createElement("div");

    status.id =
        "commonTestStatus";

    status.className =
        "common-status";


    form.appendChild(
        status
    );


    /* ================================
       BUTTONS
       ================================ */

    const actions =
        document.createElement("div");

    actions.className =
        "common-form-actions";


    const saveButton =
        createPrimaryButton(
            "Save",
            "commonTestSave"
        );


    const backButton =
        createBackButton(
            "commonTestBack"
        );


    actions.appendChild(
        saveButton
    );

    actions.appendChild(
        backButton
    );


    form.appendChild(
        actions
    );


    /* ================================
       BUILD PAGE
       ================================ */

    page.appendChild(
        title
    );

    page.appendChild(
        form
    );

    container.appendChild(
        page
    );


    /* ================================
       SAVE TEST
       ================================ */

    saveButton.onclick =
        function(){

            showFormStatus(
                status,
                "Common Form is working successfully.",
                "success"
            );

        };


    /* ================================
       BACK TEST
       ================================ */

    backButton.onclick =
        function(){

            container.innerHTML = "";

        };

}
document.addEventListener(
    "DOMContentLoaded",
    function(){

        createCommonFormTest();

    }
);
