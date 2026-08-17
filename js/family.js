familyBtn.onclick = ()=>{

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

`);

document.getElementById("familyBack").onclick = 
    
    showHome;

};

