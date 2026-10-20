

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
  function loginName(){const u=user();return String(u.loginUserName||u.loginName||u.userName||u.username||u.name||u.fullName||'').trim()}
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
      ${field('Expense Date *',`<input id="exDate" name="expenseDate" type="date" value="${dateToday()}" required>`,'exDate')}
      ${field('Main Category *',`<select id="exCategory" name="mainCategory" required>${selectOptions(Object.keys(CATEGORIES),'Select Category')}</select>`,'exCategory')}
      <div id="exSubCategoryRow">${field('Sub Category *',`<select id="exSubCategory" name="subCategory" required>${selectOptions([],'Select Subcategory')}</select>`,'exSubCategory')}</div>
      <div id="exNormalDescription">${field('Description',`<textarea id="exDescription" name="description" rows="1" style="height:38px;min-height:38px;resize:none;box-sizing:border-box;" maxlength="30" placeholder="Enter expense details"></textarea>`,'exDescription')}</div>
      <div id="exVehicleFields" class="hidden">
       ${field('Maintenance Type',`<select id="exMaintenanceType" name="maintenanceType">${selectOptions(MAINTENANCE_TYPES,'Select Maintenance')}</select>`,'exMaintenanceType')}
       ${field('Vehicle Number',`<input id="exVehicleNumber" name="vehicleNumber" maxlength="30" placeholder="Optional vehicle number">`,'exVehicleNumber')}
       ${field('Description',`<textarea id="exVehicleDescription" name="vehicleDescription" rows="1" style="height:38px;min-height:38px;resize:none;box-sizing:border-box;" maxlength="30" placeholder="Enter expense details"></textarea>`,'exVehicleDescription')}
      </div>
      ${field('Amount *',`<input id="exAmount" name="amount" type="number" min="0.01" step="0.01" inputmode="decimal" placeholder="₹ Enter Amount" required disabled style="background-color:#fff !important;color:#333 !important;opacity:1;-webkit-text-fill-color:#333;box-sizing:border-box;max-width:100%;">`,'exAmount')}

      ${field('Payment Mode',`<select id="exPaymentMode" name="paymentMode">${selectOptions(PAYMENT_MODES,'Select Payment Mode')}</select>`,'exPaymentMode')}
      ${field('Sensitive',`<select id="exSensitive" name="sensitive"><option value="No" selected>No</option><option value="Yes">Yes</option></select>`,'exSensitive')}
      ${field('Expense by',`<div class="expense-spentby"><input id="exSpentBySearch" list="exMemberList" placeholder="      " value="" disabled style="background-color:#fff !important;color:#333 !important;opacity:1;-webkit-text-fill-color:#333;box-sizing:border-box;max-width:100%;"><datalist id="exMemberList">${memberNames.map(n=>`<option value="${esc(n)}"></option>`).join('')}</datalist></div>`,'exSpentBySearch')}
      <div class="expense-help">By default Login user name.</div>


${field('Photos',`
  <div style="display:flex;flex-direction:column;align-items:flex-start;gap:4px;min-width:0;width:100%;max-width:100%;box-sizing:border-box;">
    <div class="expense-photo-picker" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;min-width:0;width:100%;max-width:100%;box-sizing:border-box;">
      <button type="button" id="exPhotoChooseBtn" class="expense-secondary" style="min-width:76px;max-width:100%;box-sizing:border-box;flex:0 0 auto;">Photo</button>
      <button type="button" class="expense-photo-slot" data-photo-slot="0" id="exPhotoSlot1" aria-label="Choose photo 1" style="width:42px;height:38px;min-width:42px;flex:0 0 42px;box-sizing:border-box;border:1px solid #8aa6c1;border-radius:7px;background:#fff;">1</button>
      <button type="button" class="expense-photo-slot" data-photo-slot="1" id="exPhotoSlot2" aria-label="Choose photo 2" style="width:42px;height:38px;min-width:42px;flex:0 0 42px;box-sizing:border-box;border:1px solid #8aa6c1;border-radius:7px;background:#fff;">2</button>
      <button type="button" class="expense-photo-slot" data-photo-slot="2" id="exPhotoSlot3" aria-label="Choose photo 3" style="width:42px;height:38px;min-width:42px;flex:0 0 42px;box-sizing:border-box;border:1px solid #8aa6c1;border-radius:7px;background:#fff;">3</button>
    </div>
    <input id="exPhotos" type="file" accept="image/*" multiple style="display:none;">
    <small id="exPhotoCount" style="display:block;white-space:nowrap;font-size:12px;line-height:16px;margin:0;">0 photos selected (Max 3)</small>
  </div>
`,'exPhotos')}
<div id="expenseStatus" class="expense-status" role="status"></div>
      <div class="expense-actions"><button class="expense-primary" type="submit" id="expenseSaveBtn">Save</button><button class="expense-secondary" type="reset" id="expenseResetBtn">Reset</button><button type="button" class="expense-secondary" id="expenseModuleBack">← Back</button></div>
    </form>`;
    showPage(shell('Add Expense',inner,true));
    // Disabled Amount / Expense by remain white while preserving disabled state.
    const expenseWhiteStyle = document.createElement('style');
    expenseWhiteStyle.textContent = '#expenseForm #exAmount:disabled, #expenseForm #exSpentBySearch:disabled { background:#fff !important; color:#333 !important; opacity:1 !important; -webkit-text-fill-color:#333 !important; } #expenseForm .expense-photo-picker { max-width:100%; }';
    document.head.appendChild(expenseWhiteStyle);
    $('expenseModuleBack').onclick=goBack;
    const photoField = $('exPhotos')?.closest('.expense-field');
    if (photoField) { const photoLabel = photoField.querySelector('.expense-label'); if (photoLabel) { photoLabel.style.alignSelf='center'; photoLabel.style.marginTop='0'; } }
    
    // =====================================
    // EXPENSE PHOTOS: PHOTO BUTTON + 3 SLOTS
    // =====================================
    const photoInput = $('exPhotos');
    let selectedExpensePhotos = [null, null, null];
    let activePhotoSlot = 0;
    function setPhotoSelectionEnabled(enabled){
      ['exPhotoChooseBtn','exPhotoSlot1','exPhotoSlot2','exPhotoSlot3'].forEach(id=>{const b=$(id);if(b){b.disabled=!enabled;b.style.opacity=enabled?'1':'0.5';b.style.cursor=enabled?'pointer':'not-allowed';}});
    }
    setPhotoSelectionEnabled(false);

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
      if ($('exAmount').disabled || !(Number($('exAmount').value)>0)) { alert('ముందుగా Amount నమోదు చేయండి.'); return; }
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
    const amountInput=$('exAmount'),expenseByInput=$('exSpentBySearch');
    function syncEntrySequence(){
      const essentialsFilled=!!($('exDate').value && cat.value && sub.value);
      amountInput.disabled=!essentialsFilled;
      const amountValid=essentialsFilled && amountInput.value.trim()!=='' && Number.isFinite(Number(amountInput.value)) && Number(amountInput.value)>0;
      expenseByInput.disabled=!amountValid;
      setPhotoSelectionEnabled(amountValid);
      if(amountValid){
        if(!expenseByInput.value.trim()) expenseByInput.value=defaultName;
      } else {
        expenseByInput.value='';
      }
    }
    $('exDate').addEventListener('input',syncEntrySequence);
    $('exDate').addEventListener('change',syncEntrySequence);
    amountInput.addEventListener('input',syncEntrySequence);
    amountInput.addEventListener('change',syncEntrySequence);
    cat.onchange=()=>{
      const isVehicle=cat.value==='Vehicle Maintenance';
      vehicleFields.classList.toggle('hidden',!isVehicle);
      $('exNormalDescription').classList.toggle('hidden',isVehicle);
      subRow.classList.remove('hidden');
      sub.innerHTML=selectOptions(isVehicle ? VEHICLE_TYPES : (CATEGORIES[cat.value]||[]),'Select Subcategory');
      sub.required=true;
      sub.value='';
      amountInput.value='';
      expenseByInput.value='';
      syncEntrySequence();
    };
    sub.addEventListener('change',()=>{amountInput.value='';expenseByInput.value='';syncEntrySequence()});
    syncEntrySequence();
    $('expenseForm').onsubmit=async ev=>{
      ev.preventDefault();
      const amount=Number($('exAmount').value);
      if(!family().familyId){status('Current family was not found. Please open your family and try again.','error');return}
      if(!token()){status('Login session expired. Please login again.','error');return}
      if(!Number.isFinite(amount)||amount<=0){status('Enter an amount greater than zero.','error');$('exAmount').focus();return}
      if(!$('exDate').value){status('Expense Date is required.','error');$('exDate').focus();return}
      if(!cat.value){status('Main Category is required.','error');cat.focus();return}
      if(!sub.value){status('Sub Category is required.','error');sub.focus();return}
      const btn=$('expenseSaveBtn');btn.disabled=true;btn.textContent='Saving…';
     try {
  const photoFiles = selectedExpensePhotos.slice();

  const payload = {
    expenseDate: $('exDate').value,
    mainCategory: cat.value,
    subCategory: sub.value,
    vehicleType: cat.value === 'Vehicle Maintenance' ? sub.value : '',
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
  $('exSpentBySearch').value = '';
  $('exSpentBySearch').disabled = true;
  $('exAmount').value = '';
  $('exAmount').disabled = true;
  vehicleFields.classList.add('hidden');
  $('exNormalDescription').classList.remove('hidden');
  sub.innerHTML = selectOptions([], 'Select Subcategory');
  subRow.classList.remove('hidden');
  sub.required = true;
  syncEntrySequence();

} catch(err){status(err.message||'Unable to save expense. Please try again.','error')}
      finally{btn.disabled=false;btn.textContent='Save'}
    };
    $('expenseResetBtn').onclick=()=>setTimeout(()=>{ selectedExpensePhotos=[null,null,null];updateExpensePhotoSlots();$('exDate').value=dateToday();$('exSpentBySearch').value='';$('exSpentBySearch').disabled=true;$('exAmount').value='';$('exAmount').disabled=true;setPhotoSelectionEnabled(false);vehicleFields.classList.add('hidden');$('exNormalDescription').classList.remove('hidden');sub.innerHTML=selectOptions([],'Select Subcategory');subRow.classList.remove('hidden');sub.required=true;syncEntrySequence();status('');},0);
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
    const periods=['Today','This Week','This Month','This Year','Daily','Weekly','Monthly','Yearly'];
    return `<style>.expense-report-actions{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:nowrap}.expense-report-actions>button,.expense-download-wrap>button{white-space:nowrap}.expense-download-wrap{position:relative}.expense-download-menu{position:absolute;right:0;top:100%;z-index:9999;display:flex;flex-direction:column;min-width:100px;background:#fff;border:1px solid #9ab;border-radius:8px;box-shadow:0 4px 12px #0002}.expense-download-menu.hidden{display:none}.expense-download-menu button{background:#fff;border:0;padding:9px 14px;text-align:left;color:#222}.expense-report-subheading th{background:#eaf3ff;text-align:left}.expense-report-actions .expense-secondary,.expense-report-actions .expense-primary{padding:8px 12px}</style><div class="expense-panel"><div class="expense-filter-grid">
      <div class="expense-field"><label class="expense-label" for="exReportType"><span class="expense-label-text">Report Type</span></label><select id="exReportType">${selectOptions(types,'Select Type')}</select></div>
      <div class="expense-field"><label class="expense-label" for="exReportPeriod"><span class="expense-label-text">Report Period</span></label><select id="exReportPeriod">${selectOptions(periods,'Select Period')}</select></div>
      <div class="expense-field hidden" id="exSelectedDateWrap"><label class="expense-label" for="exSelectedDate"><span class="expense-label-text">Selected Date</span></label><input id="exSelectedDate" type="date" value="${dateToday()}"></div>
      ${custom?`<div class="expense-field"><label class="expense-label" for="exFromDate"><span class="expense-label-text">From Date</span></label><input id="exFromDate" type="date"></div><div class="expense-field"><label class="expense-label" for="exToDate"><span class="expense-label-text">To Date</span></label><input id="exToDate" type="date"></div>
      <div class="expense-field"><label class="expense-label" for="exFilterCategory"><span class="expense-label-text">Main Category</span></label><select id="exFilterCategory">${selectOptions(Object.keys(CATEGORIES),'All Categories')}</select></div>
      <div class="expense-field"><label class="expense-label" for="exFilterSub"><span class="expense-label-text">Sub Category</span></label><select id="exFilterSub">${selectOptions([],'All Subcategories')}</select></div>
      <div class="expense-field"><label class="expense-label" for="exFilterSpentBy"><span class="expense-label-text">Spent By</span></label><input id="exFilterSpentBy" list="exSearchMembers" placeholder="Any member/name"><datalist id="exSearchMembers">${[...new Set([loginName(),...members].filter(Boolean))].map(n=>`<option value="${esc(n)}"></option>`).join('')}</datalist></div>
      <div class="expense-field"><label class="expense-label" for="exFilterPayment"><span class="expense-label-text">Payment Mode</span></label><select id="exFilterPayment">${selectOptions(PAYMENT_MODES,'All Modes')}</select></div>
      <div class="expense-field"><label class="expense-label" for="exFilterSensitive"><span class="expense-label-text">Sensitive</span></label><select id="exFilterSensitive"><option value="No" selected>No</option><option value="Yes">Yes</option><option value="All">All</option></select></div>
      <div class="expense-field hidden" id="exCustomPassWrap"><label class="expense-label" for="exCustomPass"><span class="expense-label-text">Sensitive Pass Code</span></label><input id="exCustomPass" type="password" inputmode="numeric" placeholder="Required for Yes / All"></div>
      <div class="expense-field"><label class="expense-label" for="exMinAmount"><span class="expense-label-text">Minimum Amount</span></label><input id="exMinAmount" type="number" min="0" step="0.01" placeholder="Any"></div>
      <div class="expense-field"><label class="expense-label" for="exMaxAmount"><span class="expense-label-text">Maximum Amount</span></label><input id="exMaxAmount" type="number" min="0" step="0.01" placeholder="Any"></div>
      <div class="expense-field" style="grid-column:1/-1"><label class="expense-label" for="exSearchText"><span class="expense-label-text">Search Text</span></label><input id="exSearchText" type="search" placeholder="Description, category, spent by…"></div>`:''}
      </div><div class="expense-actions expense-report-actions"><button type="button" id="exRunReport" class="expense-primary">Show Report</button><div class="expense-download-wrap"><button type="button" id="exDownloadBtn" class="expense-secondary">Download ▾</button><div id="exDownloadMenu" class="expense-download-menu hidden"><button type="button" data-export="pdf">PDF</button><button type="button" data-export="word">Word</button><button type="button" data-export="excel">Excel</button></div></div><button type="button" id="expenseReportBack" class="expense-secondary">← Back</button></div><div id="expenseStatus" class="expense-status" role="status"></div></div><div id="exReportOutput"></div>`;
  }
  function setupReportControls(custom,kind){
    const period=$('exReportPeriod');
    const toggle=()=>{$('exSelectedDateWrap').classList.add('hidden');};
    period.onchange=toggle;
    const back=$('exReportBack'); if(back) back.onclick=goBack;
    const downloadBtn=$('exDownloadBtn'), downloadMenu=$('exDownloadMenu');
    if(downloadBtn&&downloadMenu){
      downloadBtn.onclick=()=>downloadMenu.classList.toggle('hidden');
      downloadMenu.querySelectorAll('[data-export]').forEach(item=>item.onclick=()=>{downloadMenu.classList.add('hidden');exportExpenseReport(item.dataset.export);});
    }
    if(custom){$('exFilterCategory').onchange=()=>{const c=$('exFilterCategory').value;$('exFilterSub').innerHTML=selectOptions(c==='Vehicle Maintenance'?VEHICLE_TYPES:(CATEGORIES[c]||[]),'All Subcategories')};$('exFilterSensitive').onchange=()=>{$('exCustomPassWrap').classList.toggle('hidden',$('exFilterSensitive').value==='No')}}
    $('exRunReport').onclick=async()=>{
      let rows=cachedExpenses;
      let access=kind;
      const searchSensitive=custom ? $('exFilterSensitive').value : '';
      if(custom && searchSensitive!=='No'){
        const pass=$('exCustomPass').value.trim();
        if(!pass){status('Sensitive Pass Code is required when searching Sensitive = Yes or All.','error');$('exCustomPass').focus();return}
        access='all';
      }
      if(!rows.length || (custom && searchSensitive!=='No' && !rows.some(r=>r.sensitive==='Yes'))){$('exRunReport').disabled=true;status('Loading expenses…');try{const fields={reportAccess:access};if(access==='all'&&custom)fields.passCode=$('exCustomPass').value.trim();const res=await request('getExpenses',fields);if(res.status!=='success')throw new Error(res.message||'Unable to load expenses');rows=res.expenses||[];cachedExpenses=rows}catch(e){status(e.message,'error');$('exRunReport').disabled=false;return}finally{$('exRunReport').disabled=false}}
      const filtered=filterRows(rows,custom,kind);renderResults(filtered,$('exReportType').value||'Abstract');status(`${filtered.length} expense record(s) found.`,'success');
    };
    if(!custom){$('exReportType').value='Abstract';period.value='This Month';toggle()}
    if(custom){$('exReportType').value='Detailed';period.value='This Month';toggle()}
  }
  function filterRows(rows,custom,kind){
    const p=$('exReportPeriod').value;const type=$('exReportType').value;let from='',to='';const now=new Date();
    if(custom){from=$('exFromDate').value;to=$('exToDate').value}
    if((!custom || (!from && !to)) && p==='Today'){from=to=dateToday()}
    else if((!custom || (!from && !to)) && p==='This Week'){const d=new Date();const day=(d.getDay()+6)%7;d.setDate(d.getDate()-day);from=fmt(d);const end=new Date(d);end.setDate(end.getDate()+6);to=fmt(end)}
    else if((!custom || (!from && !to)) && p==='This Month'){from=dateToday().slice(0,7)+'-01';to=dateToday()}
    else if((!custom || (!from && !to)) && p==='This Year'){from=now.getFullYear()+'-01-01';to=dateToday()}
    const start=from?new Date(from+'T00:00:00').getTime():null;const end=to?new Date(to+'T23:59:59').getTime():null;
    return rows.filter(r=>{
      const d=String(r.expenseDate||'').slice(0,10);const dt=d?new Date(d+'T12:00:00').getTime():0;
      if(start!==null&&dt<start)return false;if(end!==null&&dt>end)return false;
      if(custom){if($('exFilterCategory').value&&r.mainCategory!==$('exFilterCategory').value)return false;if($('exFilterSub').value&&r.subCategory!==$('exFilterSub').value)return false;if($('exFilterSpentBy').value.trim()&&String(r.spentBy||'').toLowerCase().indexOf($('exFilterSpentBy').value.trim().toLowerCase())<0)return false;if($('exFilterPayment').value&&r.paymentMode!==$('exFilterPayment').value)return false;if($('exFilterSensitive').value==='Yes'&&r.sensitive!=='Yes')return false;if($('exFilterSensitive').value==='No'&&r.sensitive!=='No')return false;const min=$('exMinAmount').value,max=$('exMaxAmount').value;if(min!==''&&Number(r.amount)<Number(min))return false;if(max!==''&&Number(r.amount)>Number(max))return false;const q=$('exSearchText').value.trim().toLowerCase();if(q&&!`${r.description||''} ${r.mainCategory||''} ${r.subCategory||''} ${r.spentBy||''}`.toLowerCase().includes(q))return false}
      return true;
    });
  }
  function fmt(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
  function renderResults(rows,type){
    const total=rows.reduce((s,r)=>s+Number(r.amount||0),0);const counts=rows.length;
    let table='';
    if(type==='Abstract'){
      const sums={};rows.forEach(r=>{const k=r.mainCategory||'Other';if(!sums[k])sums[k]={amount:0,count:0};sums[k].amount+=Number(r.amount||0);sums[k].count++});
      table=`<div class="expense-results"><table><thead><tr><th>Main Category</th><th>Records</th><th>Total Amount</th></tr></thead><tbody>${Object.keys(sums).sort().map(k=>`<tr><td>${esc(k)}</td><td>${sums[k].count}</td><td>${money(sums[k].amount)}</td></tr>`).join('')||'<tr><td colspan="3">No records found.</td></tr>'}</tbody></table></div>`;
    } else if(type==='GroupedLegacy'){
      table='';
    } else {
      const reportPeriod=$('exReportPeriod')?.value||'Detailed';
      const sortedRows=rows.slice().sort((a,b)=>String(a.expenseDate).localeCompare(String(b.expenseDate)));
      let groupedRows=''; let previousHeading='';
      sortedRows.forEach(r=>{const ds=String(r.expenseDate||'').slice(0,10);let headings=[];if(reportPeriod==='Yearly'){headings=['Year: '+(ds.slice(0,4)||'Unknown'),'Month: '+(ds?new Date(ds+'T12:00:00').toLocaleString('en-US',{month:'long'}):'Unknown')];}else if(reportPeriod==='Monthly'){headings=['Year: '+(ds.slice(0,4)||'Unknown'),'Month: '+(ds?new Date(ds+'T12:00:00').toLocaleString('en-US',{month:'long'}):'Unknown')];}else if(reportPeriod==='Weekly'&&ds){const d=new Date(ds+'T12:00:00');d.setDate(d.getDate()-((d.getDay()+6)%7));headings=['Week starting: '+fmt(d)];}else if(reportPeriod==='Daily')headings=['Date: '+ds];for(const heading of headings){const key=reportPeriod==='Yearly'&&heading.startsWith('Month: ')?'  '+heading:heading;if(key!==previousHeading){groupedRows+=`<tr class="expense-report-subheading"><th colspan="7">${esc(key)}</th></tr>`;previousHeading=key;}}groupedRows+=`<tr><td>${esc(r.expenseDate)}</td><td>${esc(r.mainCategory)}<br>${esc(r.subCategory)}${r.maintenanceType?'<br>'+esc(r.maintenanceType):''}</td><td>${esc(r.spentBy)}</td><td>${esc(r.paymentMode)}</td><td>${money(r.amount)}</td><td>${esc(r.sensitive)}</td><td>${esc(r.description)}</td></tr>`;});
      table=`<div class="expense-results"><table><thead><tr><th>Date</th><th>Category / Subcategory</th><th>Spent By</th><th>Payment</th><th>Amount</th><th>Sensitive</th><th>Description</th></tr></thead><tbody>${groupedRows||'<tr><td colspan="7">No records found.</td></tr>'}</tbody></table></div>`;
    }
    $('exReportOutput').innerHTML=`<div class="expense-summary"><div class="expense-summary-card"><small>Total Records</small><strong>${counts}</strong></div><div class="expense-summary-card"><small>Total Expense</small><strong>${money(total)}</strong></div></div>${table}`;
  }

  function exportExpenseReport(format){
    const output=$('exReportOutput');
    if(!output || !output.innerHTML.trim()){status('மుందుగా Show Report నొక్కండి.','error');return;}
    const title=$('expenseReportTitle')?.textContent||'oneFaMiLe Expense Report';
    const html=`<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title><style>body{font-family:Arial,sans-serif;padding:20px;color:#222}table{border-collapse:collapse;width:100%}th,td{border:1px solid #888;padding:6px;text-align:left}.expense-summary{display:flex;gap:16px;margin-bottom:16px}.expense-summary-card{border:1px solid #aaa;padding:10px}</style></head><body><h2>${esc(title)}</h2>${output.innerHTML}</body></html>`;
    if(format==='pdf'){const w=window.open('','_blank');if(!w){status('Popup blocked. Please allow popups to save PDF.','error');return;}w.document.open();w.document.write(html);w.document.close();w.focus();setTimeout(()=>w.print(),300);return;}
    const mime=format==='word'?'application/msword':'application/vnd.ms-excel';
    const extension=format==='word'?'doc':'xls';
    const blob=new Blob([html],{type:mime+';charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='oneFaMiLe_Expense_Report.'+extension;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  function renderReports(kind='normal',prefetched=null){
    activeReport=kind;cachedExpenses=prefetched||[];const title=kind==='sensitive'?'Sensitive Expenses Reports':kind==='all'?'All Expenses Reports':'Expenses Reports';
    showPage(shell(title,reportControls(false),true));const reportTitle=document.querySelector('.expense-title');if(reportTitle)reportTitle.id='expenseReportTitle';setupReportControls(false,kind);
  }
  function renderCustomSearch(){
    activeReport='normal';cachedExpenses=[];
    showPage(shell('Expenses — Custom Search',reportControls(true),true));const reportTitle=document.querySelector('.expense-title');if(reportTitle)reportTitle.id='expenseReportTitle';setupReportControls(true,'normal');
  }
  function showInfo(){showPage(shell('About Expenses','<div class="expense-panel"><p>Record family expenses and search reports by date, category, member, payment mode, amount and sensitivity.</p><p>Normal Reports exclude Sensitive = Yes records. Sensitive and All Reports require the Sensitive Pass Code.</p></div>'));$('expenseModuleBack').onclick=goBack}
  // Initialize member list before form opens; form also works if member loading fails.
  document.addEventListener('DOMContentLoaded',()=>{loadMembers()});
  const expenseButton=$('expensesBtn');
  if(expenseButton)expenseButton.onclick=openMenu;
})();
