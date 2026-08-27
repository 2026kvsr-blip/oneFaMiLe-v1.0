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
