

/* oneFaMiLe Expense module. Loaded after app.js; overrides only Expenses navigation. */
(function(){
  'use strict';
  const API = "https://script.google.com/macros/s/AKfycbzYblwgxrGFDF2MKhiWLvrlSLdJTIgQoplD0Z2-A_tLmwrdUPWsTqzOF9-txnug4DFLpg/exec";
  const CATEGORIES = {
    "Food & Groceries":["Vegetables","Rice & Groceries","Milk & Dairy","Fruits","Meat & Fish","Hotel & Tiffin","Other Food"],
    "House & Utilities":["Electricity","Water","Gas Cylinder","Rent","Internet & Phone","House Repairs","Cleaning","House Servants","Other House Expense"],
    "Medical & Health":["Doctor","Medicines","Medical Tests","Hospital","Other Medical"],
    "Vehicle Maintenance":["Vehicle Maintenance"],
    "Transport & Travel":["Petrol","Diesel","Bus","Train","Auto / Taxi","Parking & Tolls","Tour & Travel","Other Transport"],
    "Education":["Fees","Books & Stationery","Other Education"],
    "Personal & Shopping":["Clothes","Footwear","Haircut","Cosmetics & Personal Care","Accessories","Other Shopping"],
    "Family & Functions":["Marriage","Birthday","Festivals","Gifts","Family Functions","Donations","Other Family Expense"],
    "Loans & Financial":["Car Loan","Bike Loan","House Loan","Site Loan","Personal Loan","Other Loans"],
    "Home Items & Appliances":["Furniture","Fridge / TV / Appliances","Kitchen Items","Home Repairs","Other Home Items"],
    "Entertainment & Recreation":["Movies","Outings","Games","Subscriptions","Sports","Other Entertainment"],
    "Other Expenses":["Other"]
  };
  const VEHICLE_TYPES = ["Car","Bike","Others"];
  const MAINTENANCE_TYPES = ["Repairs","Oil","Servicing","Tyres & Puncture","Battery","Insurance","Other"];
  const PAYMENT_MODES = ["Cash","UPI","Bank Transfer","Credit Card","Debit Card","Other"];
  let members = [];
  let activeReport = 'normal';
  let cachedExpenses = [];
  const $ = id => document.getElementById(id);
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  function family(){ try{return JSON.parse(localStorage.getItem('currentFamily')||'{}')}catch(_){return {}} }
  function user(){ try{return JSON.parse(sessionStorage.getItem('user')||'{}')}catch(_){return {}} }
  function token(){return sessionStorage.getItem('sessionToken')||''}
  function loginName(){const u=user();return String(u.loginUserName||u.name||'').trim()}
  function money(n){return '₹'+(Number(n)||0).toLocaleString('en-IN',{maximumFractionDigits:2})}
  function dateToday(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
  function request(action, fields={}){
    const f=family();
    const body=new URLSearchParams({action,sessionToken:token(),familyId:String(f.familyId||''),...fields});
    return fetch(API,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body}).then(r=>r.json());
  }
  
async function compressExpensePhoto(file){
  const imageUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Unable to read photo."));
    reader.readAsDataURL(file);
  });

  const img = await new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Invalid photo selected."));
    image.src = imageUrl;
  });

  const maxDimension = 1400;
  const scale = Math.min(
    1,
    maxDimension / Math.max(img.width, img.height)
  );

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.width * scale));
  canvas.height = Math.max(1, Math.round(img.height * scale));

  const ctx = canvas.getContext("2d");
  if(!ctx) throw new Error("Unable to process photo.");

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  let quality = 0.75;
  let data = canvas.toDataURL("image/jpeg", quality);

  while(data.length * 0.75 > 250 * 1024 && quality > 0.3){
    quality -= 0.1;
    data = canvas.toDataURL("image/jpeg", quality);
  }

  if(data.length * 0.75 > 700 * 1024){
    throw new Error("Photo is too large. Please choose a smaller photo.");
  }

  return data;
}


function status(message, type = '') {
  const el = $('expenseStatus');

  // విజయ సందేశం ప్రత్యేక Popup‌గా చూపించాలి
  if (type === 'success') {
    if (el) {
      el.textContent = '';
      el.className = 'expense-status';
    }

    let popup = document.getElementById('expenseToast');

    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'expenseToast';
      document.body.appendChild(popup);
    }

    popup.textContent = message;
    popup.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #218838;
      color: white;
      padding: 14px 22px;
      border-radius: 10px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.25);
      z-index: 999999;
      font-size: 16px;
      text-align: center;
      max-width: 90%;
      opacity: 1;
      transition: opacity 0.4s ease;
    `;

    clearTimeout(window.expenseToastTimer);
    clearTimeout(window.expenseToastRemoveTimer);

    popup.style.display = 'block';
    popup.style.opacity = '1';

    window.expenseToastTimer = setTimeout(() => {
      popup.style.opacity = '0';

      window.expenseToastRemoveTimer = setTimeout(() => {
        popup.style.display = 'none';
      }, 400);
    }, 3000);

    return;
  }

  // ఇతర సందేశాలు మునుపటిలాగే ఫారమ్‌లో కనిపిస్తాయి
  if (el) {
    el.className = 'expense-status ' + type;
    el.textContent = message || '';
  }
}
  function field(label, control, id){return `<div class="expense-field"><label class="expense-label" for="${id||''}"><span class="expense-label-text">${label}</span><span class="expense-colon">:</span></label>${control}</div>`}
  function selectOptions(items,placeholder='Select') {return `<option value="">${placeholder}</option>`+items.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}
  function shell(title,inner,backInside=false){return `<div class="expense-page"><h2 class="expense-title">${esc(title)}</h2>${inner}${backInside?'':`<div class="expense-actions"><button type="button" class="expense-secondary" id="expenseModuleBack">← Back</button></div>`}</div>`}
  function goBack(){const b=$('expensesBtn');if(b)b.click();else if(typeof showHome==='function')showHome()}
  function openMenu(){
    const btn=$('expensesBtn'); if(!btn)return;
    if(typeof updateMenuIcon==='function')updateMenuIcon();
    if(typeof setActiveButton==='function')setActiveButton(btn);
    const html=(typeof pageTitle==='function'?pageTitle('Expenses','images/colorbtns/Expenses1.png'):'<h2 class="page-title">Expenses</h2>')+`
      <div class="grid-3x2">
       <button class="grid-btn" id="expenseAddBtn"><img src="images/colorbtns/Add1.png" class="btn-icon"><span>Add Expense</span></button>
       <button class="grid-btn" id="expenseReportsBtn"><img src="images/colorbtns/Reports1.png" class="btn-icon"><span>Reports</span></button>
       <button class="grid-btn" id="expenseSensitiveBtn"><img src="images/colorbtns/SensitiveReports1.png" class="btn-icon"><span>Sensitive Reports</span></button>
       <button class="grid-btn" id="expenseAllReportsBtn"><img src="images/colorbtns/AllReports1.png" class="btn-icon"><span>All Reports</span></button>
       <button class="grid-btn" id="expenseCustomSearchBtn"><img src="images/colorbtns/CustomSearch1.png" class="btn-icon"><span>Custom Search</span></button>
       <button class="grid-btn" id="expenseAboutBtn"><img src="images/colorbtns/About1.png" class="btn-icon"><span>About</span></button>
      </div><div align="center"><button class="back-btn" id="expenseHomeBack">← Back</button></div>`;
    showPage(html);
    $('expenseAddBtn').onclick=()=>renderForm();
    $('expenseReportsBtn').onclick=()=>renderReports('normal');
    $('expenseSensitiveBtn').onclick=()=>renderSensitiveGate('sensitive');
    $('expenseAllReportsBtn').onclick=()=>renderSensitiveGate('all');
    $('expenseCustomSearchBtn').onclick=()=>renderCustomSearch();
    $('expenseAboutBtn').onclick=()=>showInfo();
    $('expenseHomeBack').onclick=()=>{if(typeof showHome==='function')showHome()};
  }
  async function loadMembers(){
    const f=family(); if(!f.familyId||!token())return;
    try{const res=await request('getFamilyMembers');if(res&&res.status==='success')members=(res.members||[]).map(m=>String(m.name||'').trim()).filter(Boolean)}catch(e){console.warn('Expense members load failed',e)}
  }
  function renderForm(){
    const defaultName=loginName();
    const memberNames=[...new Set([defaultName,...members].filter(Boolean))];
    const inner=`<form id="expenseForm" class="expense-form" autocomplete="off">
      ${field('Expense Date',`<input id="exDate" name="expenseDate" type="date" value="${dateToday()}" required>`,'exDate')}
      ${field('Main Category',`<select id="exCategory" name="mainCategory" required>${selectOptions(Object.keys(CATEGORIES),'Select Category')}</select>`,'exCategory')}
      <div id="exSubCategoryRow">${field('Sub Category',`<select id="exSubCategory" name="subCategory" required>${selectOptions([],'Select Subcategory')}</select>`,'exSubCategory')}</div>
      <div id="exNormalDescription">${field('Description',`<textarea id="exDescription" name="description" rows="1" style="height:38px;min-height:38px;resize:none;box-sizing:border-box;" maxlength="30" placeholder="Enter expense details"></textarea>`,'exDescription')}</div>
      <div id="exVehicleFields" class="hidden">
       ${field('Vehicle Type',`<select id="exVehicleType" name="vehicleType">${selectOptions(VEHICLE_TYPES,'Select Vehicle')}</select>`,'exVehicleType')}
       ${field('Maintenance Type',`<select id="exMaintenanceType" name="maintenanceType">${selectOptions(MAINTENANCE_TYPES,'Select Maintenance')}</select>`,'exMaintenanceType')}
       ${field('Vehicle Number',`<input id="exVehicleNumber" name="vehicleNumber" maxlength="30" placeholder="Optional vehicle number">`,'exVehicleNumber')}
       ${field('Description',`<textarea id="exVehicleDescription" name="vehicleDescription" rows="1" style="height:38px;min-height:38px;resize:none;box-sizing:border-box;" maxlength="30" placeholder="Enter expense details"></textarea>`,'exVehicleDescription')}
      </div>
      ${field('Amount',`<input id="exAmount" name="amount" type="number" min="0.01" step="0.01" inputmode="decimal" placeholder="₹ Enter Amount" required>`,'exAmount')}
      ${field('Spent By',`<div class="expense-spentby"><input id="exSpentBySearch" list="exMemberList" placeholder="Search or type a new name" value="${esc(defaultName)}" required><datalist id="exMemberList">${memberNames.map(n=>`<option value="${esc(n)}"></option>`).join('')}</datalist></div>`,'exSpentBySearch')}
      <div class="expense-help">Login name is selected by default...</div>
      ${field('Payment Mode',`<select id="exPaymentMode" name="paymentMode" required>${selectOptions(PAYMENT_MODES,'Select Payment Mode')}</select>`,'exPaymentMode')}
      ${field('Sensitive',`<select id="exSensitive" name="sensitive" required><option value="No" selected>No</option><option value="Yes">Yes</option></select>`,'exSensitive')}


${field('Photos',`
  <div style="display:flex;flex-direction:column;align-items:flex-start;gap:4px;min-width:0;">
    <div class="expense-photo-picker" style="display:flex;align-items:center;gap:8px;flex-wrap:nowrap;">
      <button type="button" id="exPhotoChooseBtn" class="expense-secondary" style="min-width:76px;">Photo</button>
      <button type="button" class="expense-photo-slot" data-photo-slot="0" id="exPhotoSlot1" aria-label="Choose photo 1" style="width:42px;height:38px;border:1px solid #8aa6c1;border-radius:7px;background:#fff;">1</button>
      <button type="button" class="expense-photo-slot" data-photo-slot="1" id="exPhotoSlot2" aria-label="Choose photo 2" style="width:42px;height:38px;border:1px solid #8aa6c1;border-radius:7px;background:#fff;">2</button>
      <button type="button" class="expense-photo-slot" data-photo-slot="2" id="exPhotoSlot3" aria-label="Choose photo 3" style="width:42px;height:38px;border:1px solid #8aa6c1;border-radius:7px;background:#fff;">3</button>
    </div>
    <input id="exPhotos" type="file" accept="image/*" multiple style="display:none;">
    <small id="exPhotoCount" style="display:block;white-space:nowrap;font-size:12px;line-height:16px;margin:0;">0 photos selected (Max 3)</small>
  </div>
`,'exPhotos')}
<div id="expenseStatus" class="expense-status" role="status"></div>
      <div class="expense-actions"><button class="expense-primary" type="submit" id="expenseSaveBtn">Save</button><button class="expense-secondary" type="reset" id="expenseResetBtn">Reset</button><button type="button" class="expense-secondary" id="expenseModuleBack">← Back</button></div>
    </form>`;
    showPage(shell('Add Expense',inner,true));
    $('expenseModuleBack').onclick=goBack;
    
    // =====================================
    // EXPENSE PHOTOS: PHOTO BUTTON + 3 SLOTS
    // =====================================
    const photoInput = $('exPhotos');
    let selectedExpensePhotos = [null, null, null];
    let activePhotoSlot = 0;

    function updateExpensePhotoSlots() {
      let count = 0;
      selectedExpensePhotos.forEach((file, index) => {
        const slot = $('exPhotoSlot' + (index + 1));
        if (file) {
          count++;
          if (slot) {
            slot.textContent = '✓';
            slot.title = file.name;
            slot.style.background = '#d9f2df';
            slot.style.borderColor = '#218838';
          }
        } else if (slot) {
          slot.textContent = String(index + 1);
          slot.title = 'Choose photo ' + (index + 1);
          slot.style.background = '#fff';
          slot.style.borderColor = '#8aa6c1';
        }
      });
      const countLabel = $('exPhotoCount');
      if (countLabel) countLabel.textContent = count + ' photo(s) selected (Maximum 3)';
    }

    function openExpensePhotoPicker(slotIndex) {
      activePhotoSlot = slotIndex;
      if (photoInput) {
        photoInput.value = '';
        photoInput.click();
      }
    }

    $('exPhotoChooseBtn').onclick = () => {
      let nextSlot = selectedExpensePhotos.findIndex(file => !file);
      if (nextSlot < 0) {
        alert('గరిష్ఠంగా 3 ఫోటోలు మాత్రమే ఎంచుకోండి. ఫోటో మార్చాలంటే 1, 2 లేదా 3 బాక్స్‌ను నొక్కండి.');
        return;
      }
      openExpensePhotoPicker(nextSlot);
    };

    [1, 2, 3].forEach(number => {
      const slot = $('exPhotoSlot' + number);
      if (slot) slot.onclick = () => openExpensePhotoPicker(number - 1);
    });

    if (photoInput) {
      photoInput.addEventListener('change', () => {
        const files = Array.from(photoInput.files || []);
        if (!files.length) return;

        // Photo బటన్ ద్వారా ఒకేసారి 1, 2 లేదా 3 ఫోటోలు ఎంచుకోవచ్చు.
        if (files.some(file => !file.type || !file.type.startsWith('image/'))) {
          alert('దయచేసి ఫోటో ఫైళ్లను మాత్రమే ఎంచుకోండి.');
          photoInput.value = '';
          return;
        }

        const availableSlots = 3 - activePhotoSlot;
        if (files.length > availableSlots) {
          alert('ఎంచుకున్న స్థానం నుంచి గరిష్ఠంగా ' + availableSlots + ' ఫోటో(లు) మాత్రమే ఎంచుకోండి. మొత్తం 3 ఫోటోల వరకు మాత్రమే అనుమతి ఉంది.');
          photoInput.value = '';
          return;
        }

        files.forEach((file, index) => {
          selectedExpensePhotos[activePhotoSlot + index] = file;
        });
        updateExpensePhotoSlots();
        photoInput.value = '';
      });
    }

    const cat=$('exCategory'),sub=$('exSubCategory'),subRow=$('exSubCategoryRow'),vehicleFields=$('exVehicleFields');
    cat.onchange=()=>{
      const isVehicle=cat.value==='Vehicle Maintenance';
      vehicleFields.classList.toggle('hidden',!isVehicle);
      $('exNormalDescription').classList.toggle('hidden',isVehicle);
      subRow.classList.toggle('hidden',isVehicle);
      sub.innerHTML=selectOptions(CATEGORIES[cat.value]||[],'Select Subcategory');
      sub.required=!isVehicle;
      if(isVehicle)sub.value='';
    };
    $('expenseForm').onsubmit=async ev=>{
      ev.preventDefault();
      const amount=Number($('exAmount').value);
      if(!family().familyId){status('Current family was not found. Please open your family and try again.','error');return}
      if(!token()){status('Login session expired. Please login again.','error');return}
      if(!Number.isFinite(amount)||amount<=0){status('Enter an amount greater than zero.','error');$('exAmount').focus();return}
      if(!$('exSpentBySearch').value.trim()){status('Select a family member or enter a name.','error');return}
      const btn=$('expenseSaveBtn');btn.disabled=true;btn.textContent='Saving…';
     try {
  const photoFiles = selectedExpensePhotos.slice();

  const payload = {
    expenseDate: $('exDate').value,
    mainCategory: cat.value,
    subCategory: cat.value === 'Vehicle Maintenance' ? 'Vehicle Maintenance' : sub.value,
    vehicleType: $('exVehicleType').value,
    maintenanceType: $('exMaintenanceType').value,
    vehicleNumber: $('exVehicleNumber').value.trim(),
    amount: String(amount),
    spentBy: $('exSpentBySearch').value.trim(),
    paymentMode: $('exPaymentMode').value,
    sensitive: $('exSensitive').value,
    description: (cat.value === 'Vehicle Maintenance' ? $('exVehicleDescription').value : $('exDescription').value).trim()
  };

  for (let i = 0; i < 3; i++) {
    payload['photo' + (i + 1) + 'Data'] =
      photoFiles[i] ? await compressExpensePhoto(photoFiles[i]) : '';
  }

  const res = await request('saveExpense', payload);

  if (res.status !== 'success') {
    throw new Error(res.message || 'Could not save expense.');
  }

  status('Expense saved successfully.', 'success');
  selectedExpensePhotos = [null, null, null];
  updateExpensePhotoSlots();

  $('expenseForm').reset();
  $('exDate').value = dateToday();
  $('exSpentBySearch').value = defaultName;
  vehicleFields.classList.add('hidden');
  $('exNormalDescription').classList.remove('hidden');
  sub.innerHTML = selectOptions([], 'Select Subcategory');
  subRow.classList.remove('hidden');
  sub.required = true;

} catch(err){status(err.message||'Unable to save expense. Please try again.','error')}
      finally{btn.disabled=false;btn.textContent='Save'}
    };
    $('expenseResetBtn').onclick=()=>setTimeout(()=>{ selectedExpensePhotos=[null,null,null];updateExpensePhotoSlots();$('exDate').value=dateToday();$('exSpentBySearch').value=defaultName;vehicleFields.classList.add('hidden');$('exNormalDescription').classList.remove('hidden');sub.innerHTML=selectOptions([],'Select Subcategory');subRow.classList.remove('hidden');sub.required=true;status('');},0);
  }
  function renderSensitiveGate(kind){
    activeReport=kind;
    const label=kind==='sensitive'?'Sensitive Reports':'All Reports';
    const inner=`<div class="expense-panel"><p>Enter your Sensitive Pass Code to continue.</p>${field('Pass Code','<input id="exReportPass" type="password" inputmode="numeric" autocomplete="current-password" placeholder="Enter Pass Code">','exReportPass')}<div id="expenseStatus" class="expense-status" role="status"></div><div class="expense-actions"><button id="exVerifyPass" class="expense-primary">Verify</button></div></div>`;
    showPage(shell(label,inner));$('expenseModuleBack').onclick=goBack;
    $('exVerifyPass').onclick=async()=>{const pass=$('exReportPass').value.trim();if(!pass){status('Enter Pass Code.','error');return}const btn=$('exVerifyPass');btn.disabled=true;try{const res=await request('getExpenses',{reportAccess:kind,passCode:pass});if(res.status!=='success')throw new Error(res.message||'Verification failed.');cachedExpenses=res.expenses||[];renderReports(kind, cachedExpenses)}catch(err){status(err.message,'error');btn.disabled=false}};
  }
  function reportControls(custom=false){
    const types=['Abstract','Detailed'];
    const periods=['Today','Daily','This Week','Weekly','This Month','Monthly','This Year','Yearly'];
    const yearOptions=Array.from({length:Math.max(1,new Date().getFullYear()-2010+1)},(_,i)=>new Date().getFullYear()-i)
      .map(y=>`<option value="${y}">${y}</option>`).join('');
    return `<div class="expense-panel"><div class="expense-filter-grid">
      <div class="expense-field"><label class="expense-label" for="exReportType"><span class="expense-label-text">Report Type</span></label><select id="exReportType">${selectOptions(types,'Select Type')}</select></div>
      <div class="expense-field"><label class="expense-label" for="exReportPeriod"><span class="expense-label-text">Report Period</span></label><select id="exReportPeriod">${selectOptions(periods,'Select Period')}</select></div>
      <div class="expense-field hidden" id="exFromDateWrap"><label class="expense-label" for="exFromDate"><span class="expense-label-text">From Date</span></label><input id="exFromDate" type="date"></div>
      <div class="expense-field hidden" id="exToDateWrap"><label class="expense-label" for="exToDate"><span class="expense-label-text">To Date</span></label><input id="exToDate" type="date" value="${dateToday()}"></div>
      <div class="expense-field hidden" id="exFromMonthWrap"><label class="expense-label" for="exFromMonth"><span class="expense-label-text">From Month</span></label><input id="exFromMonth" type="month"></div>
      <div class="expense-field hidden" id="exToMonthWrap"><label class="expense-label" for="exToMonth"><span class="expense-label-text">To Month</span></label><input id="exToMonth" type="month" value="${dateToday().slice(0,7)}"></div>
      <div class="expense-field hidden" id="exFromYearWrap"><label class="expense-label" for="exFromYear"><span class="expense-label-text">From Year</span></label><select id="exFromYear">${yearOptions}</select></div>
      <div class="expense-field hidden" id="exToYearWrap"><label class="expense-label" for="exToYear"><span class="expense-label-text">To Year</span></label><select id="exToYear">${yearOptions}</select></div>
      ${custom?`<div class="expense-field"><label class="expense-label" for="exFilterCategory"><span class="expense-label-text">Main Category</span></label><select id="exFilterCategory">${selectOptions(Object.keys(CATEGORIES),'All Categories')}</select></div>
      <div class="expense-field"><label class="expense-label" for="exFilterSub"><span class="expense-label-text">Sub Category</span></label><select id="exFilterSub">${selectOptions([],'All Subcategories')}</select></div>
      <div class="expense-field"><label class="expense-label" for="exFilterSpentBy"><span class="expense-label-text">Spent By</span></label><input id="exFilterSpentBy" list="exSearchMembers" placeholder="Any member/name"><datalist id="exSearchMembers">${[...new Set([loginName(),...members].filter(Boolean))].map(n=>`<option value="${esc(n)}"></option>`).join('')}</datalist></div>
      <div class="expense-field"><label class="expense-label" for="exFilterPayment"><span class="expense-label-text">Payment Mode</span></label><select id="exFilterPayment">${selectOptions(PAYMENT_MODES,'All Modes')}</select></div>
      <div class="expense-field"><label class="expense-label" for="exFilterSensitive"><span class="expense-label-text">Sensitive</span></label><select id="exFilterSensitive"><option value="No" selected>No</option><option value="Yes">Yes</option><option value="All">All</option></select></div>
      <div class="expense-field hidden" id="exCustomPassWrap"><label class="expense-label" for="exCustomPass"><span class="expense-label-text">Sensitive Pass Code</span></label><input id="exCustomPass" type="password" inputmode="numeric" placeholder="Required for Yes / All"></div>
      <div class="expense-field"><label class="expense-label" for="exMinAmount"><span class="expense-label-text">Minimum Amount</span></label><input id="exMinAmount" type="number" min="0" step="0.01" placeholder="Any"></div>
      <div class="expense-field"><label class="expense-label" for="exMaxAmount"><span class="expense-label-text">Maximum Amount</span></label><input id="exMaxAmount" type="number" min="0" step="0.01" placeholder="Any"></div>
      <div class="expense-field" style="grid-column:1/-1"><label class="expense-label" for="exSearchText"><span class="expense-label-text">Search Text</span></label><input id="exSearchText" type="search" placeholder="Description, category, spent by…"></div>`:''}
      </div>
      <div class="expense-actions" style="display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap;width:100%;"><button id="exRunReport" class="expense-primary">${custom?'Search':'Show Report'}</button><button type="button" id="exReportBack" class="expense-secondary">← Back</button></div>
      <div id="expenseStatus" class="expense-status" role="status"></div></div><div id="exReportOutput"></div>`;
  }
  function setupReportControls(custom,kind){
    $('exReportBack').onclick=goBack;
    const period=$('exReportPeriod'),type=$('exReportType');
    const toggle=()=>{
      const p=period.value, detailed=type.value==='Detailed';
      const dateRange=detailed&&p==='Daily',monthRange=detailed&&p==='Monthly',yearRange=detailed&&p==='Yearly';
      $('exFromDateWrap').classList.toggle('hidden',!dateRange);
      $('exToDateWrap').classList.toggle('hidden',!dateRange);
      $('exFromMonthWrap').classList.toggle('hidden',!monthRange);
      $('exToMonthWrap').classList.toggle('hidden',!monthRange);
      $('exFromYearWrap').classList.toggle('hidden',!yearRange);
      $('exToYearWrap').classList.toggle('hidden',!yearRange);
    };
    period.onchange=toggle;type.onchange=toggle;
    if(custom){
      $('exFilterCategory').onchange=()=>{$('exFilterSub').innerHTML=selectOptions(CATEGORIES[$('exFilterCategory').value]||[],'All Subcategories')};
      $('exFilterSensitive').onchange=()=>{$('exCustomPassWrap').classList.toggle('hidden',$('exFilterSensitive').value==='No')};
    }
    $('exRunReport').onclick=async()=>{
      let rows=cachedExpenses;
      let access=kind;
      const searchSensitive=custom ? $('exFilterSensitive').value : '';
      if(custom && searchSensitive!=='No'){
        const pass=$('exCustomPass').value.trim();
        if(!pass){status('Sensitive Pass Code is required when searching Sensitive = Yes or All.','error');$('exCustomPass').focus();return}
        access='all';
      }
      if(!rows.length || (custom && searchSensitive!=='No' && !rows.some(r=>String(r.sensitive||'').toLowerCase()==='yes'))){
        $('exRunReport').disabled=true;status('Loading expenses…');
        try{
          const fields={reportAccess:access};
          if((access==='all'||access==='sensitive')&&custom)fields.passCode=$('exCustomPass').value.trim();
          const res=await request('getExpenses',fields);
          if(res.status!=='success')throw new Error(res.message||'Unable to load expenses');
          rows=res.expenses||[];cachedExpenses=rows;
        }catch(e){status(e.message,'error');$('exRunReport').disabled=false;return}
        finally{$('exRunReport').disabled=false}
      }
      const filtered=filterRows(rows,custom,kind);
      renderResults(filtered,type.value||'Abstract',period.value||'Today');
      status(`${filtered.length} expense record(s) found.`,'success');
    };
    type.value='Abstract';period.value='Today';toggle();
  }
  function filterRows(rows,custom,kind){
    const p=$('exReportPeriod').value,type=$('exReportType').value;
    let from='',to='';const now=new Date();
    if(type==='Detailed'&&p==='Daily'){from=$('exFromDate').value;to=$('exToDate').value}
    else if(type==='Detailed'&&p==='Monthly'){
      const a=$('exFromMonth').value,b=$('exToMonth').value;
      if(a)from=a+'-01';
      if(b){const q=b.split('-').map(Number);to=b+'-'+String(new Date(q[0],q[1],0).getDate()).padStart(2,'0')}
    }else if(type==='Detailed'&&p==='Yearly'){
      const a=$('exFromYear').value,b=$('exToYear').value;
      if(a)from=a+'-01-01';if(b)to=b+'-12-31';
    }else if(p==='Today'){from=to=dateToday()}
    else if(p==='This Week'){const d=new Date();d.setDate(d.getDate()-((d.getDay()+6)%7));from=fmt(d);const e=new Date(d);e.setDate(e.getDate()+6);to=fmt(e)}
    else if(p==='This Month'){from=dateToday().slice(0,7)+'-01';to=dateToday()}
    else if(p==='This Year'){from=now.getFullYear()+'-01-01';to=dateToday()}
    else if(type==='Abstract'&&p==='Daily'){const d=new Date();d.setDate(d.getDate()-39);from=fmt(d);to=dateToday()}
    else if(type==='Abstract'&&p==='Weekly'){const d=new Date();d.setDate(d.getDate()-((d.getDay()+6)%7)-39*7);from=fmt(d);to=dateToday()}
    else if(type==='Abstract'&&p==='Monthly'){const d=new Date(now.getFullYear(),now.getMonth()-39,1);from=fmt(d);to=dateToday()}
    // Abstract Yearly intentionally has no date limits: include all years in the stored data.
    const start=from?new Date(from+'T00:00:00').getTime():null,end=to?new Date(to+'T23:59:59').getTime():null;
    return rows.filter(r=>{
      const d=String(r.expenseDate||'').slice(0,10),dt=d?new Date(d+'T12:00:00').getTime():0;
      if(start!==null&&dt<start)return false;if(end!==null&&dt>end)return false;
      const sensitive=String(r.sensitive||'No').trim().toLowerCase();
      if(!custom&&kind==='normal'&&sensitive!=='no')return false;
      if(!custom&&kind==='sensitive'&&sensitive!=='yes')return false;
      if(custom){
        if($('exFilterCategory').value&&r.mainCategory!==$('exFilterCategory').value)return false;
        if($('exFilterSub').value&&r.subCategory!==$('exFilterSub').value)return false;
        if($('exFilterSpentBy').value.trim()&&String(r.spentBy||'').toLowerCase().indexOf($('exFilterSpentBy').value.trim().toLowerCase())<0)return false;
        if($('exFilterPayment').value&&r.paymentMode!==$('exFilterPayment').value)return false;
        const sf=$('exFilterSensitive').value;if(sf==='Yes'&&sensitive!=='yes')return false;if(sf==='No'&&sensitive!=='no')return false;
        const min=$('exMinAmount').value,max=$('exMaxAmount').value;
        if(min!==''&&Number(r.amount)<Number(min))return false;if(max!==''&&Number(r.amount)>Number(max))return false;
        const q=$('exSearchText').value.trim().toLowerCase();
        if(q&&!`${r.description||''} ${r.mainCategory||''} ${r.subCategory||''} ${r.spentBy||''}`.toLowerCase().includes(q))return false;
      }
      return true;
    });
  }
  function fmt(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
  function renderResults(rows,type,period){
    const total=rows.reduce((s,r)=>s+Number(r.amount||0),0),counts=rows.length;
    const dateLabel=ds=>{if(!ds)return 'Unknown';if(type==='Monthly')return new Date(ds+'-01T12:00:00').toLocaleDateString('en-IN',{month:'short',year:'numeric'});return ds};
    const photoCount=r=>[r.photo1Url||r.photo1||r.photo1Data,r.photo2Url||r.photo2||r.photo2Data,r.photo3Url||r.photo3||r.photo3Data].filter(Boolean).length;
    const photoCell=r=>{const photos=[r.photo1Url||r.photo1||r.photo1Data,r.photo2Url||r.photo2||r.photo2Data,r.photo3Url||r.photo3||r.photo3Data].filter(Boolean);return photos.length?`<button type="button" class="expense-secondary expense-view-photos" data-photos="${esc(JSON.stringify(photos))}">View</button>`:'—'};
    let table='';
    if(type==='Abstract'){
      const groups={};
      rows.forEach(r=>{
        const ds=String(r.expenseDate||'').slice(0,10);let key=ds||'Unknown';
        if(period==='Today')key='Today';
        else if(period==='This Week')key='This Week';
        else if(period==='This Month')key='This Month';
        else if(period==='This Year')key='This Year';
        else if(period==='Weekly'&&ds){const d=new Date(ds+'T12:00:00');d.setDate(d.getDate()-((d.getDay()+6)%7));key=fmt(d)}
        else if(period==='Monthly'&&ds)key=ds.slice(0,7);
        else if(period==='Yearly'&&ds)key=ds.slice(0,4);
        if(!groups[key])groups[key]={amount:0,count:0};groups[key].amount+=Number(r.amount||0);groups[key].count++;
      });
      const keys=Object.keys(groups).sort((a,b)=>b.localeCompare(a));
      table=`<div class="expense-results"><table><thead><tr><th>S.No</th><th>Date</th><th>Nos</th><th>Amount</th></tr></thead><tbody>${keys.map((k,i)=>`<tr><td>${i+1}</td><td>${esc(period==='Monthly'?dateLabel(k):k)}</td><td>${groups[k].count}</td><td>${money(groups[k].amount)}</td></tr>`).join('')||'<tr><td colspan="4">No records found.</td></tr>'}</tbody></table></div>`;
    }else{
      const detailRow=(r,i)=>`<tr><td>${i+1}</td><td>${esc(r.expenseDate)}</td><td>${esc(r.mainCategory)}</td><td>${esc(r.subCategory)}${r.mainCategory==='Vehicle Maintenance'?`<br>${esc(r.vehicleType||'')} / ${esc(r.maintenanceType||'')}<br>${esc(r.vehicleNumber||'')}`:''}</td><td>${money(r.amount)}</td><td>${esc(r.spentBy)}</td><td>${esc(r.sensitive||'No')}</td><td>${photoCell(r)}</td><td>${photoCount(r)}</td></tr>`;
      const sorted=rows.slice().sort((a,b)=>String(b.expenseDate||'').localeCompare(String(a.expenseDate||'')));
      const headers='<tr><th>S.No</th><th>Date</th><th>Main Category</th><th>Sub Category</th><th>Amount Rs</th><th>Spent by</th><th>Sensitive</th><th>Photos</th><th>Nos</th></tr>';
      if(period==='This Year'){
        const byMonth={};sorted.forEach(r=>{const ds=String(r.expenseDate||'').slice(0,10),k=ds?ds.slice(0,7):'Unknown';(byMonth[k]||(byMonth[k]=[])).push(r)});
        table=Object.keys(byMonth).sort().reverse().map(k=>`<h3 style="text-align:center;margin:18px 0 8px;">${esc(k==='Unknown'?k:dateLabel(k))}</h3><div class="expense-results"><table><thead>${headers}</thead><tbody>${byMonth[k].map(detailRow).join('')}</tbody></table></div>`).join('')||`<div class="expense-results"><table><thead>${headers}</thead><tbody><tr><td colspan="9">No records found.</td></tr></tbody></table></div>`;
      }else{
        table=`<div class="expense-results"><table><thead>${headers}</thead><tbody>${sorted.map(detailRow).join('')||'<tr><td colspan="9">No records found.</td></tr>'}</tbody></table></div>`;
      }
    }
    $('exReportOutput').innerHTML=`<div class="expense-summary"><div class="expense-summary-card"><small>Total Records</small><strong>${counts}</strong></div><div class="expense-summary-card"><small>Total Expense</small><strong>${money(total)}</strong></div></div>${table}`;
    $('exReportOutput').querySelectorAll('.expense-view-photos').forEach(btn=>btn.onclick=()=>{
      let photos=[];try{photos=JSON.parse(btn.dataset.photos||'[]')}catch(_){}
      if(!photos.length)return;
      const overlay=document.createElement('div');
      overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:16px;overflow:auto;';
      const close=document.createElement('button');close.type='button';close.textContent='✕ Close';close.style.cssText='padding:10px 18px;border:0;border-radius:8px;cursor:pointer;';
      close.onclick=()=>overlay.remove();overlay.appendChild(close);
      photos.forEach(src=>{const img=document.createElement('img');img.src=src;img.alt='Expense photo';img.style.cssText='max-width:min(92vw,900px);max-height:70vh;object-fit:contain;background:white;border-radius:8px;';overlay.appendChild(img)});
      overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.remove()});document.body.appendChild(overlay);
    });
  }
  function renderReports(kind='normal',prefetched=null){
    activeReport=kind;cachedExpenses=prefetched||[];const title=kind==='sensitive'?'Sensitive Expenses Reports':kind==='all'?'All Expenses Reports':'Expenses Reports';
    showPage(shell(title,reportControls(false),true));setupReportControls(false,kind);
  }
  function renderCustomSearch(){
    activeReport='normal';cachedExpenses=[];
    showPage(shell('Expenses — Custom Search',reportControls(true),true));setupReportControls(true,'normal');
  }
  function showInfo(){showPage(shell('About Expenses','<div class="expense-panel"><p>Record family expenses and search reports by date, category, member, payment mode, amount and sensitivity.</p><p>Normal Reports exclude Sensitive = Yes records. Sensitive and All Reports require the Sensitive Pass Code.</p></div>'));$('expenseModuleBack').onclick=goBack}
  // Initialize member list before form opens; form also works if member loading fails.
  document.addEventListener('DOMContentLoaded',()=>{loadMembers()});
  const expenseButton=$('expensesBtn');
  if(expenseButton)expenseButton.onclick=openMenu;
})();
