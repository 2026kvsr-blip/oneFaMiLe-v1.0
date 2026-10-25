
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
  let dateSortAscending = true;
  let lastReportRows = [];
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
  function selectOptions(items,placeholder='Select',preserveOrder=false) {const list=preserveOrder?items.slice():items.slice().sort((a,b)=>String(a).localeCompare(String(b),undefined,{sensitivity:'base'}));return `<option value="">${placeholder}</option>`+list.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}
  function shell(title,inner,backInside=false){return `<div class="expense-page"><h2 class="expense-title">${esc(title)}</h2>${inner}${backInside?'':`<div class="expense-actions"><button type="button" class="expense-secondary" id="expenseModuleBack">← Back</button></div>`}</div>`}
  function goBack(){
    // Always return to the Expenses menu, with a safe fallback if rendering fails.
    try { openMenu(); return; } catch (e) { console.warn('Expenses menu navigation failed', e); }
    try { const menuButton=$('expensesBtn'); if(menuButton) menuButton.click(); else if(typeof showHome==='function') showHome(); } catch (_) { if(typeof showHome==='function') showHome(); }
  }
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
    <div class="expense-photo-picker" style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;min-width:0;width:100%;max-width:100%;box-sizing:border-box;overflow:visible;">
      <button type="button" id="exPhotoChooseBtn" class="expense-secondary" style="min-width:62px;width:62px;max-width:62px;box-sizing:border-box;flex:0 0 62px;">Photo</button>
      <button type="button" class="expense-photo-slot" data-photo-slot="0" id="exPhotoSlot1" aria-label="Choose photo 1" style="width:42px;height:52px;min-width:42px;max-width:42px;flex:0 0 42px;box-sizing:border-box;border:1px solid #8aa6c1;border-radius:7px;background:#fff;">1</button>
      <button type="button" class="expense-photo-slot" data-photo-slot="1" id="exPhotoSlot2" aria-label="Choose photo 2" style="width:42px;height:52px;min-width:42px;max-width:42px;flex:0 0 42px;box-sizing:border-box;border:1px solid #8aa6c1;border-radius:7px;background:#fff;">2</button>
      <button type="button" class="expense-photo-slot" data-photo-slot="2" id="exPhotoSlot3" aria-label="Choose photo 3" style="width:42px;height:52px;min-width:42px;max-width:42px;flex:0 0 42px;box-sizing:border-box;border:1px solid #8aa6c1;border-radius:7px;background:#fff;">3</button>
    </div>
    <input id="exPhotos" type="file" accept="image/*" multiple style="display:none;">
    <small id="exPhotoCount" style="display:block;align-self:flex-start;text-align:left;white-space:nowrap;font-size:12px;line-height:16px;margin:0;padding:0;">0 photos selected (Max 3)</small>
  </div>
`,'exPhotos')}
<div id="expenseStatus" class="expense-status" role="status"></div>
      <div class="expense-actions"><button class="expense-primary" type="submit" id="expenseSaveBtn">Save</button><button class="expense-secondary" type="reset" id="expenseResetBtn">Reset</button><button type="button" class="expense-secondary" id="expenseModuleBack">← Back</button></div>
    </form>`;
    showPage(shell('Add Expense',inner,true));
    // Disabled Amount / Expense by remain white while preserving disabled state.
    const expenseWhiteStyle = document.createElement('style');
    expenseWhiteStyle.textContent = '#expenseForm #exAmount:disabled, #expenseForm #exSpentBySearch:disabled { background:#fff !important; color:#333 !important; opacity:1 !important; -webkit-text-fill-color:#333 !important; } #expenseForm .expense-photo-picker { max-width:100%; flex-wrap:nowrap !important; gap:6px; } #expenseForm .expense-photo-picker button { flex-shrink:0 !important; } #expenseForm .expense-photo-picker #exPhotoChooseBtn { min-width:62px!important;width:62px!important;max-width:62px!important;height:52px!important;min-height:52px!important;max-height:52px!important;flex:0 0 62px!important;background:#fff!important;background-color:#fff!important;color:#2477c8!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;padding:0!important;box-sizing:border-box!important; } #expenseForm .expense-photo-picker .expense-photo-slot { width:42px!important; min-width:42px!important; max-width:42px!important; height:52px!important; min-height:52px!important; max-height:52px!important; flex:0 0 42px!important; display:flex!important; align-items:center!important; justify-content:center!important; text-align:center!important; padding:0!important; line-height:1!important; box-sizing:border-box!important; } #expenseForm .expense-field{align-items:center} #expenseForm .expense-label{display:grid!important;grid-template-columns:minmax(0,1fr) 10px!important;align-items:center!important;align-self:center;margin-top:0!important;justify-self:stretch!important;text-align:left!important;width:100%!important;box-sizing:border-box!important} #expenseForm .expense-label-text{text-align:left!important;min-width:0!important} #expenseForm .expense-colon{text-align:center!important;display:block!important;width:10px!important}';
    document.head.appendChild(expenseWhiteStyle);
    $('expenseModuleBack').onclick=goBack;
    const photoField = $('exPhotos')?.closest('.expense-field');
    if (photoField) { const photoLabel = photoField.querySelector('.expense-label'); if (photoLabel) { photoLabel.style.alignSelf='center'; photoLabel.style.marginTop='0'; photoLabel.style.display='grid'; photoLabel.style.gridTemplateColumns='minmax(0,1fr) 10px'; photoLabel.style.alignItems='center'; photoLabel.style.justifyContent='stretch'; photoLabel.style.height='52px'; photoLabel.style.minHeight='52px'; photoLabel.style.transform='none'; } }
    document.querySelectorAll('#expenseForm .expense-field').forEach(fieldEl=>{const label=fieldEl.querySelector(':scope > .expense-label');const control=fieldEl.querySelector(':scope > input, :scope > select, :scope > textarea, :scope > div');if(label&&control){label.style.alignSelf='center';label.style.marginTop='0';}});
    
    // =====================================
    // EXPENSE PHOTOS: PHOTO BUTTON + 3 SLOTS
    // =====================================
    const photoInput = $('exPhotos');
    let selectedExpensePhotos = [null, null, null];
    let activePhotoSlot = 0;
    function setPhotoSelectionEnabled(enabled){
      ['exPhotoChooseBtn','exPhotoSlot1','exPhotoSlot2','exPhotoSlot3'].forEach(id=>{const b=$(id);if(b){b.disabled=!enabled;b.style.opacity=enabled?'1':'0.5';b.style.cursor=enabled?'pointer':'not-allowed';}});
    }
    // Keep Photo controls visually enabled; access is still guarded by the amount/category conditions below.
    setPhotoSelectionEnabled(true);

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
      const essentialsFilled=!!($('exDate').value && $('exCategory').value && $('exSubCategory').value);
      if (!essentialsFilled || $('exAmount').disabled || !(Number($('exAmount').value)>0)) { return; }
      activePhotoSlot = slotIndex;
      if (photoInput) {
        photoInput.value = '';
        photoInput.click();
      }
    }

    $('exPhotoChooseBtn').onclick = () => {
      let nextSlot = selectedExpensePhotos.findIndex(file => !file);
      if (nextSlot < 0) return;
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
          photoInput.value = '';
          return;
        }

        const availableSlots = 3 - activePhotoSlot;
        if (files.length > availableSlots) {
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
      // Photo buttons remain enabled-looking, but openExpensePhotoPicker enforces the same entry conditions.
      setPhotoSelectionEnabled(true);
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
    const periods=['Today','This Week','This Month','This Year','All'];
    return `<style>.expense-report-inline{display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:5px;grid-column:auto!important;width:100%;box-sizing:border-box}.expense-report-inline .expense-label{display:block!important;flex:0 0 auto;align-items:center;justify-content:flex-start;white-space:nowrap;min-width:0;width:100%;margin:0!important}.expense-report-inline .expense-label:after{content:':'}.expense-report-inline select{display:block!important;flex:1 1 auto;min-width:0;width:100%;max-width:none;box-sizing:border-box}.expense-report-actions{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:nowrap}.expense-report-actions>button,.expense-download-wrap>button{white-space:nowrap}.expense-download-wrap{position:relative}.expense-download-menu{position:absolute;right:0;top:100%;z-index:9999;display:flex;flex-direction:column;min-width:100px;background:#fff;border:1px solid #9ab;border-radius:8px;box-shadow:0 4px 12px #0002}.expense-download-menu.hidden{display:none}.expense-download-menu button{background:#fff;border:0;padding:9px 14px;text-align:left;color:#222}.expense-report-subheading th{background:#fff!important;text-align:left;border-top:1px solid #c4d4ff;border-bottom:1px solid #c4d4ff;color:#2d5274}.expense-report-year th{font-size:24px!important;font-weight:700;padding:10px 8px;background:#fff!important;color:#218838!important}.expense-report-month th{font-size:20px!important;font-weight:700;padding:8px;background:#fff!important;color:#e67e22!important}.expense-report-subheading.expense-report-month th{color:#e67e22!important}.expense-report-total td{font-weight:700;background:#fff!important;border-top:1px solid #c4d4ff}.expense-report-date th{font-size:13px!important;font-weight:600;background:#fff!important}.expense-report-actions .expense-secondary,.expense-report-actions .expense-primary{padding:8px 12px}.expense-date-sort-field{align-self:end}.expense-date-sort{width:100%;min-height:42px;border:1px solid #8baec8;border-radius:8px;background:#fff;color:#2d5274;font-weight:700;padding:8px;cursor:pointer}.expense-date-sort:active{background:#e5f3ff}.expense-payment-filter{grid-column:1!important}.expense-spentby-filter{grid-column:2!important}.expense-custom-filter-grid .expense-field:has(#exFilterCategory),.expense-custom-filter-grid .expense-field:has(#exFilterSub){grid-row:2!important}.expense-custom-filter-grid .expense-payment-filter,.expense-custom-filter-grid .expense-spentby-filter{grid-row:3!important}.expense-custom-filter-grid .expense-field:has(#exMinAmount),.expense-custom-filter-grid .expense-field:has(#exMaxAmount){grid-row:4!important}.expense-custom-filter-grid .expense-field:has(#exFromDate),.expense-custom-filter-grid .expense-field:has(#exToDate){grid-row:5!important}.expense-custom-filter-grid .expense-payment-filter{grid-column:1!important}.expense-custom-filter-grid .expense-spentby-filter{grid-column:2!important}.expense-custom-filter-grid .expense-search-text-filter{grid-row:6!important;grid-column:1!important}.expense-custom-filter-grid .expense-amount-sort-field{grid-row:6!important;grid-column:2!important}.expense-custom-filter-grid #exFromDate,.expense-custom-filter-grid #exToDate{height:42px!important;min-height:42px!important;max-height:42px!important;padding:8px 10px!important;box-sizing:border-box!important;line-height:normal!important}.expense-custom-filter-grid #exVehicleTypeWrap,.expense-custom-filter-grid #exMtcTypeWrap{grid-row:7!important;grid-column:auto!important}.expense-filter-grid .expense-field.hidden{display:none!important}.expense-filter-grid #exVehicleTypeWrap,.expense-filter-grid #exMtcTypeWrap{grid-column:auto!important}.expense-filter-grid #exVehicleTypeWrap.hidden,.expense-filter-grid #exMtcTypeWrap.hidden{display:none!important}.expense-report-actions #exDownloadBtn,.expense-report-actions #expenseReportBack{background:transparent!important;background-color:transparent!important;color:#2477c8!important;border:1.5px solid #2477c8!important;box-shadow:none!important}.expense-report-actions #exDownloadBtn:disabled{opacity:1!important;color:#2477c8!important;background:transparent!important;border-color:#2477c8!important;cursor:not-allowed}.expense-summary{display:flex;align-items:center;gap:8px;width:100%;margin:10px 0 14px;box-sizing:border-box;flex-wrap:nowrap}.expense-summary-card{display:flex;align-items:center;justify-content:flex-start;gap:5px;white-space:nowrap;min-width:0;box-sizing:border-box;padding:9px 8px;border:1px solid #c4d4ff;border-radius:8px;flex:1 1 50%;width:50%}.expense-summary-card small{display:inline;font-size:clamp(9px,2.6vw,12px);white-space:nowrap}.expense-summary-card strong{display:inline;font-size:clamp(10px,2.9vw,14px);white-space:nowrap}@media(max-width:600px){.expense-filter-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;column-gap:10px!important;row-gap:10px!important}.expense-filter-grid>.expense-field{grid-column:auto!important;min-width:0!important;width:100%!important;box-sizing:border-box!important}.expense-filter-grid>.expense-report-inline{grid-column:auto!important}.expense-filter-grid>.expense-field label{display:block!important;white-space:normal!important;max-width:100%!important;margin-bottom:5px!important}.expense-filter-grid>.expense-field input,.expense-filter-grid>.expense-field select{width:100%!important;min-width:0!important;box-sizing:border-box!important}.expense-report-inline .expense-label{flex:0 0 auto!important;width:100%!important;white-space:nowrap!important;margin-bottom:0!important}.expense-report-inline select{flex:1 1 auto!important;width:100%!important}.expense-report-actions{gap:6px!important}.expense-report-actions button{min-width:0!important;flex:1 1 0!important;padding:8px 4px!important;font-size:12px!important}}@media(min-width:601px){.expense-filter-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important}.expense-filter-grid>.expense-report-inline{grid-column:auto!important}}</style><div class="expense-panel"><div class="expense-filter-grid ${custom?'expense-custom-filter-grid':''}">
      <div class="expense-field expense-report-inline"><label class="expense-label" for="exReportType"><span class="expense-label-text">Report Type</span></label><select id="exReportType">${selectOptions(types,'Select Type')}</select></div>
      <div class="expense-field expense-report-inline"><label class="expense-label" for="exReportPeriod"><span class="expense-label-text">Report Period</span></label><select id="exReportPeriod">${selectOptions(periods,'Select Period',true)}</select></div>
      <div class="expense-field"><label class="expense-label" for="exFilterCategory"><span class="expense-label-text">Category</span></label><select id="exFilterCategory">${selectOptions(Object.keys(CATEGORIES),'All Categories')}</select></div>
      <div class="expense-field"><label class="expense-label" for="exFilterSub"><span class="expense-label-text">Sub-Category</span></label><select id="exFilterSub">${selectOptions([],'All Subcategories')}</select></div>
      <div class="expense-field"><label class="expense-label" for="exMinAmount"><span class="expense-label-text">Amount &gt;</span></label><input id="exMinAmount" type="number" min="0" step="0.01" placeholder="Any"></div>
      <div class="expense-field"><label class="expense-label" for="exMaxAmount"><span class="expense-label-text">Amount &lt;</span></label><input id="exMaxAmount" type="number" min="0" step="0.01" placeholder="Any"></div>
      <div class="expense-field expense-payment-filter"><label class="expense-label" for="exFilterPayment"><span class="expense-label-text">Payment Type</span></label><select id="exFilterPayment">${selectOptions(PAYMENT_MODES,'All Payment Types')}</select></div>
      <div class="expense-field expense-amount-sort-field"><label class="expense-label">Date order</label><button type="button" id="exDateSortBtn" class="expense-date-sort" aria-label="Sort date ascending" title="Sort date ascending">↑ Date Ascending</button></div>
      <div class="expense-field hidden" id="exSelectedDateWrap"><label class="expense-label" for="exSelectedDate"><span class="expense-label-text">Selected Date</span></label><input id="exSelectedDate" type="date" value="${dateToday()}"></div>
      ${custom?`<div class="expense-field"><label class="expense-label" for="exFromDate"><span class="expense-label-text">From Date</span></label><input id="exFromDate" type="date"></div><div class="expense-field"><label class="expense-label" for="exToDate"><span class="expense-label-text">To Date</span></label><input id="exToDate" type="date"></div>
      <div class="expense-field expense-spentby-filter"><label class="expense-label" for="exFilterSpentBy"><span class="expense-label-text">Expense by</span></label><input id="exFilterSpentBy" list="exSearchMembers" placeholder="Any member/name"><datalist id="exSearchMembers">${[...new Set((cachedExpenses||[]).map(r=>String(r.spentBy||'').trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b)).map(n=>`<option value="${esc(n)}"></option>`).join('')}</datalist></div>
      <div class="expense-field expense-search-text-filter"><label class="expense-label" for="exSearchText"><span class="expense-label-text">Search Text</span></label><input id="exSearchText" type="search" placeholder="Description, category, spent by…"></div>
      <div class="expense-field hidden" id="exVehicleTypeWrap"><label class="expense-label" for="exFilterVehicleType"><span class="expense-label-text">Vehicle Type</span></label><select id="exFilterVehicleType">${selectOptions(VEHICLE_TYPES,'All Vehicle Types')}</select></div>
      <div class="expense-field hidden" id="exMtcTypeWrap"><label class="expense-label" for="exFilterMtcType"><span class="expense-label-text">Mtc Type</span></label><select id="exFilterMtcType">${selectOptions(MAINTENANCE_TYPES,'All Maintenance Types')}</select></div>`:''}
      </div><div class="expense-actions expense-report-actions"><button type="button" id="exRunReport" class="expense-primary">Show Report</button><div class="expense-download-wrap"><button type="button" id="exDownloadBtn" class="expense-secondary" disabled>Download ▾</button><div id="exDownloadMenu" class="expense-download-menu hidden"><button type="button" data-export="pdf">PDF</button><button type="button" data-export="word">Word</button><button type="button" data-export="excel">Excel</button></div></div><button type="button" id="expenseReportBack" class="expense-secondary">← Back</button></div><div id="expenseStatus" class="expense-status" role="status"></div></div><div id="exReportOutput"></div>`;
  }
  function updateExpenseByOptions(rows){
    const list=$('exSearchMembers');
    if(!list)return;
    const names=[...new Set((rows||[]).map(r=>String(r.spentBy||'').trim()).filter(Boolean))]
      .sort((a,b)=>a.localeCompare(b));
    list.innerHTML=names.map(n=>`<option value="${esc(n)}"></option>`).join('');
    const input=$('exFilterSpentBy');
    if(input && input.value && !names.some(n=>n.toLowerCase()===input.value.trim().toLowerCase())) input.value='';
  }
  function setupReportControls(custom,kind){
    if(custom){
      updateExpenseByOptions(cachedExpenses);
      if(!cachedExpenses.length){
        request('getExpenses',{reportAccess:kind}).then(res=>{
          if(res && res.status==='success'){
            cachedExpenses=res.expenses||[];
            updateExpenseByOptions(cachedExpenses);
          }
        }).catch(()=>{});
      }
    }
    const period=$('exReportPeriod');
    const typeSelect=$('exReportType');
    const allPeriods=['Today','This Week','This Month','This Year','All'];
    const detailedPeriods=['Today','This Week','This Month','This Year','All'];
    const abstractPeriods=['Today','This Week','This Month','This Year','All','Daily','Weekly','Monthly','Yearly'];
    const syncPeriodOptions=()=>{const previous=period.value;const choices=typeSelect.value==='Abstract'?abstractPeriods:detailedPeriods;period.innerHTML=selectOptions(choices,'Select Period',true);period.value=choices.includes(previous)?previous:'This Month';};
    const toggle=()=>{$('exSelectedDateWrap').classList.add('hidden');const p=period.value;const isAbstract=typeSelect.value==='Abstract';const hideDateOrder=isAbstract&&['All','Today','This Week','This Month','This Year'].includes(p);const sortField=$('exDateSortBtn')?.closest('.expense-field');if(sortField)sortField.classList.toggle('hidden',hideDateOrder);};
    typeSelect.onchange=()=>{syncPeriodOptions();toggle();};
    syncPeriodOptions();
    period.onchange=toggle;
    const back=$('expenseReportBack'); if(back) { back.type='button'; const returnToMenu=(event)=>{event.preventDefault();event.stopPropagation();goBack();}; back.onclick=returnToMenu; back.addEventListener('pointerup',returnToMenu,{once:false}); }
    const downloadBtn=$('exDownloadBtn'), downloadMenu=$('exDownloadMenu');
    if(downloadBtn&&downloadMenu){
      downloadBtn.disabled=true;
      downloadBtn.onclick=()=>{if(!downloadBtn.disabled)downloadMenu.classList.toggle('hidden')};
      downloadMenu.querySelectorAll('[data-export]').forEach(item=>item.onclick=()=>{downloadMenu.classList.add('hidden');exportExpenseReport(item.dataset.export);});
    }
    const syncCategoryFilters=()=>{const c=$('exFilterCategory').value;const vehicle=c==='Vehicle Maintenance';$('exFilterSub').innerHTML=selectOptions(vehicle?VEHICLE_TYPES:(CATEGORIES[c]||[]),'All Subcategories');if(custom){$('exVehicleTypeWrap').classList.toggle('hidden',!vehicle);$('exMtcTypeWrap').classList.toggle('hidden',!vehicle);if(!vehicle){$('exFilterVehicleType').value='';$('exFilterMtcType').value='';}}};
    $('exFilterCategory').onchange=syncCategoryFilters;syncCategoryFilters();
    const dateSortBtn=$('exDateSortBtn');
    if(dateSortBtn){dateSortBtn.onclick=()=>{dateSortAscending=!dateSortAscending;dateSortBtn.textContent=dateSortAscending?'↑ Date Ascending':'↓ Date Descending';dateSortBtn.setAttribute('aria-label',dateSortAscending?'Sort date ascending':'Sort date descending');dateSortBtn.title=dateSortAscending?'Sort date ascending':'Sort date descending';if(lastReportRows.length)renderResults(lastReportRows,$('exReportType').value||'Abstract');};}
    $('exRunReport').onclick=async()=>{
      let rows=cachedExpenses;
      let access=kind;
      if(!rows.length){$('exRunReport').disabled=true;status('Loading expenses…');try{const fields={reportAccess:access};const res=await request('getExpenses',fields);if(res.status!=='success')throw new Error(res.message||'Unable to load expenses');rows=res.expenses||[];cachedExpenses=rows;if(custom)updateExpenseByOptions(rows)}catch(e){status(e.message,'error');$('exRunReport').disabled=false;return}finally{$('exRunReport').disabled=false}}
      const filtered=filterRows(rows,custom,kind);lastReportRows=filtered.slice();renderResults(filtered,$('exReportType').value||'Abstract');if(downloadBtn)downloadBtn.disabled=false;status(`${filtered.length} expense record(s) found.`,'success');
    };
    if(!custom){$('exReportType').value='Abstract';syncPeriodOptions();period.value='This Month';toggle()}
    if(custom){$('exReportType').value='Detailed';syncPeriodOptions();period.value='This Month';toggle()}
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
      if($('exFilterCategory').value&&r.mainCategory!==$('exFilterCategory').value)return false;if($('exFilterSub').value&&r.subCategory!==$('exFilterSub').value&&r.vehicleType!==$('exFilterSub').value)return false;if($('exFilterPayment').value&&r.paymentMode!==$('exFilterPayment').value)return false;const min=$('exMinAmount').value,max=$('exMaxAmount').value;if(min!==''&&Number(r.amount)<=Number(min))return false;if(max!==''&&Number(r.amount)>=Number(max))return false;if(custom){if($('exFilterCategory').value==='Vehicle Maintenance'){if($('exFilterVehicleType').value&&String(r.vehicleType||'')!==$('exFilterVehicleType').value)return false;if($('exFilterMtcType').value&&String(r.maintenanceType||'')!==$('exFilterMtcType').value)return false;}if($('exFilterSpentBy').value.trim()&&String(r.spentBy||'').toLowerCase().indexOf($('exFilterSpentBy').value.trim().toLowerCase())<0)return false;const q=$('exSearchText').value.trim().toLowerCase();if(q&&!`${r.description||''} ${r.mainCategory||''} ${r.subCategory||''} ${r.spentBy||''}`.toLowerCase().includes(q))return false}
      return true;
    });
  }
  function fmt(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
  function formatReportDate(value){const raw=String(value||'').slice(0,10);const m=raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);return m?`${m[3]}-${m[2]}-${m[1].slice(2)}`:raw;}
  function renderResults(rows,type){
    rows=rows.slice().sort((a,b)=>{const diff=String(a.expenseDate||'').slice(0,10).localeCompare(String(b.expenseDate||'').slice(0,10));return dateSortAscending?diff:-diff;});
    const total=rows.reduce((s,r)=>s+Number(r.amount||0),0);const counts=rows.length;
    let table='';
    if(type==='Abstract'){
      const selectedPeriod=$('exReportPeriod')?.value||'';
      if(['Daily','Weekly','Monthly','Yearly'].includes(selectedPeriod)){
        const groups={};
        rows.forEach(r=>{
          const ds=String(r.expenseDate||'').slice(0,10);
          const parts=ds.match(/^(\d{4})-(\d{2})-(\d{2})$/);
          let key='Unknown';
          if(parts){
            const year=parts[1], month=parts[2], day=parts[3];
            if(selectedPeriod==='Daily') key=`${year}-${month}-${day}`;
            else if(selectedPeriod==='Weekly'){
              const d=new Date(ds+'T12:00:00');
              d.setDate(d.getDate()-((d.getDay()+6)%7));
              key=fmt(d);
            } else if(selectedPeriod==='Monthly') key=`${year}-${month}`;
            else key=year;
          }
          if(!groups[key]) groups[key]={year:'—',month:'—',date:'—',week:'—',amount:0,count:0,sort:key};
          if(parts){groups[key].year=parts[1];groups[key].month=new Date(Number(parts[1]),Number(parts[2])-1,1).toLocaleString('en-US',{month:'long'});groups[key].date=formatReportDate(ds);}
          if(selectedPeriod==='Weekly'&&key!=='Unknown'){
            const start=new Date(key+'T12:00:00');const finish=new Date(start);finish.setDate(finish.getDate()+6);
            groups[key].week=`${formatReportDate(fmt(start))} - ${formatReportDate(fmt(finish))}`;
          }
          groups[key].amount+=Number(r.amount||0);groups[key].count++;
        });
        const keys=Object.keys(groups).sort((a,b)=>dateSortAscending?a.localeCompare(b):b.localeCompare(a));
        let headers='';
        if(selectedPeriod==='Daily') headers='<th>S.No</th><th>Year</th><th>Month</th><th>Date</th><th>No</th><th>Amount</th>';
        else if(selectedPeriod==='Weekly') headers='<th>S.No</th><th>Year</th><th>Week</th><th>No</th><th>Amount</th>';
        else if(selectedPeriod==='Monthly') headers='<th>S.No</th><th>Year</th><th>Month</th><th>No</th><th>Amount</th>';
        else headers='<th>S.No</th><th>Year</th><th>No</th><th>Amount</th>';
        const cells=(key,g,i)=>selectedPeriod==='Daily'?`<td>${i+1}</td><td>${esc(g.year)}</td><td>${esc(g.month)}</td><td>${esc(g.date)}</td><td>${g.count}</td><td>${money(g.amount)}</td>`:selectedPeriod==='Weekly'?`<td>${i+1}</td><td>${esc(g.year==='—'?'—':String(new Date(key+'T12:00:00').getFullYear()))}</td><td>${esc(g.week)}</td><td>${g.count}</td><td>${money(g.amount)}</td>`:selectedPeriod==='Monthly'?`<td>${i+1}</td><td>${esc(g.year)}</td><td>${esc(g.month)}</td><td>${g.count}</td><td>${money(g.amount)}</td>`:`<td>${i+1}</td><td>${esc(g.year)}</td><td>${g.count}</td><td>${money(g.amount)}</td>`;
        const colspan=selectedPeriod==='Daily'?6:selectedPeriod==='Weekly'||selectedPeriod==='Monthly'?5:4;
        table=`<div class="expense-results"><table><thead><tr>${headers}</tr></thead><tbody>${keys.map((key,i)=>`<tr>${cells(key,groups[key],i)}</tr>`).join('')||`<tr><td colspan="${colspan}">No records found.</td></tr>`}</tbody></table></div>`;
      } else {
      const selectedCategory=$('exFilterCategory')?.value||'';
      if(selectedCategory){
        const sums={};
        rows.forEach(r=>{const k=r.subCategory || (String(r.mainCategory||'').toLowerCase()==='vehicle maintenance' ? r.vehicleType : '') || 'Other';if(!sums[k])sums[k]={amount:0,count:0};sums[k].amount+=Number(r.amount||0);sums[k].count++});
        table=`<div class="expense-abstract-heading">Category: ${esc(selectedCategory)}</div><div class="expense-results"><table><thead><tr><th>Sub-Category</th><th>Records</th><th>Total Amount</th></tr></thead><tbody>${Object.keys(sums).sort().map(k=>`<tr><td>${esc(k)}</td><td>${sums[k].count}</td><td>${money(sums[k].amount)}</td></tr>`).join('')||'<tr><td colspan="3">No records found.</td></tr>'}</tbody></table></div>`;
      } else {
        const sums={};
        rows.forEach(r=>{
          const main=String(r.mainCategory||'Other');
          const sub=String(r.subCategory || (main.toLowerCase()==='vehicle maintenance' ? r.vehicleType : '') || 'Other');
          if(!sums[main])sums[main]={amount:0,count:0,subs:{}};
          sums[main].amount+=Number(r.amount||0);sums[main].count++;
          if(!sums[main].subs[sub])sums[main].subs[sub]={amount:0,count:0};
          sums[main].subs[sub].amount+=Number(r.amount||0);sums[main].subs[sub].count++;
        });
        let categoryIndex=0;
        const categoryRows=Object.keys(sums).sort().map(main=>{
          const index=categoryIndex++;
          const group=sums[main];
          const subRows=Object.keys(group.subs).sort().map(sub=>{
            const detail=group.subs[sub];
            return `<tr class="expense-abstract-subrow" data-parent-index="${index}" hidden><td style="padding-left:28px">↳ ${esc(sub)}</td><td>${detail.count}</td><td>${money(detail.amount)}</td></tr>`;
          }).join('');
          return `<tr class="expense-abstract-category-row" data-toggle-index="${index}" tabindex="0" role="button" aria-expanded="false" style="cursor:pointer"><td><span class="expense-abstract-toggle" aria-hidden="true">＋</span> ${esc(main)}</td><td>${group.count}</td><td>${money(group.amount)}</td></tr>${subRows}`;
        }).join('');
        table=`<div class="expense-results"><table class="expense-abstract-category-table"><thead><tr><th>Main Category</th><th>Records</th><th>Total Amount</th></tr></thead><tbody>${categoryRows||'<tr><td colspan="3">No records found.</td></tr>'}</tbody></table></div>`;
      }
      }
    } else {
      const reportPeriod=$('exReportPeriod')?.value||'Detailed';
      const sortedRows=rows.slice().sort((a,b)=>{const diff=String(a.expenseDate||'').slice(0,10).localeCompare(String(b.expenseDate||'').slice(0,10));return dateSortAscending?diff:-diff;});
      const hasVehicle=sortedRows.some(r=>String(r.mainCategory||'').toLowerCase()==='vehicle maintenance');
      const headers=['Date','Category','Sub-Category','Amount Rs:','Payment Type','Expense by','Sensitive','No of photos','Photos'];
      const colCount=headers.length;
      // Each uploaded photo may be returned under more than one alias
      // (for example photo1Url and photo1). Select only one value per slot.
      const photoValues=r=>[1,2,3].map(n=>{
        // Match common Google Sheet / Apps Script header aliases without case or spacing sensitivity.
        const aliases = new Set([
          'photo'+n, 'photo'+n+'url', 'photo'+n+'data', 'photo'+n+'link',
          'photos'+n, 'photos'+n+'url', 'photo'+n+'driveurl'
        ]);
        const entries = Object.entries(r || {});
        const candidates = [
          r['photo'+n+'Url'], r['photo'+n], r['photo'+n+'Data'], r['photo'+n+'Link'],
          ...entries.filter(([key]) => {
            const normalized = String(key).toLowerCase().replace(/[^a-z0-9]/g, '');
            return aliases.has(normalized);
          }).map(([,value]) => value)
        ];
        return candidates.find(v =>
          typeof v === 'string' &&
          v.trim() &&
          /^(https?:|data:image\/)/i.test(v.trim())
        ) || '';
      }).filter(Boolean);
      let groupedRows='';
      let currentYear='', currentMonth='', currentDay='', monthTotal=0, monthCount=0, yearTotal=0, yearCount=0;
      const monthName=ds=>ds?new Date(ds+'T12:00:00').toLocaleString('en-US',{month:'long'}):'Unknown';
      const addMonthTotal=()=>{if(currentMonth)groupedRows+=`<tr class="expense-report-total"><td colspan="3">${esc(currentMonth)} Total (${monthCount} records)</td><td>${money(monthTotal)}</td><td colspan="5"></td></tr>`;};
      const addYearTotal=()=>{if(currentYear)groupedRows+=`<tr class="expense-report-total"><td colspan="3">${esc(currentYear)} Total (${yearCount} records)</td><td>${money(yearTotal)}</td><td colspan="5"></td></tr>`;};
      sortedRows.forEach(r=>{
        const ds=String(r.expenseDate||'').slice(0,10);
        const yr=ds.slice(0,4)||'Unknown';
        const mon=monthName(ds);
        const wantsYearMonthGrouping=['This Year','All','Monthly','Yearly'].includes(reportPeriod);
        if(reportPeriod==='Today' && ds && ds!==currentDay){currentDay=ds;groupedRows+=`<tr class="expense-report-subheading expense-report-month"><th colspan="${colCount}">${esc(formatReportDate(ds))}</th></tr>`;}
        else if(reportPeriod==='This Week' && ds){const d=new Date(ds+'T12:00:00');d.setDate(d.getDate()-((d.getDay()+6)%7));const end=new Date(d);end.setDate(end.getDate()+6);const weekLabel=`${formatReportDate(fmt(d))} - ${formatReportDate(fmt(end))}`;if(weekLabel!==currentMonth){currentMonth=weekLabel;groupedRows+=`<tr class="expense-report-subheading expense-report-month"><th colspan="${colCount}">${esc(weekLabel)}</th></tr>`;}}
        else if(reportPeriod==='This Month' && !currentMonth){currentMonth=mon+' '+yr;groupedRows+=`<tr class="expense-report-subheading expense-report-month"><th colspan="${colCount}">${esc(mon)} ${esc(yr)}</th></tr>`;}
        else if(reportPeriod==='This Year' && !currentYear){currentYear=yr;groupedRows+=`<tr class="expense-report-subheading expense-report-year"><th colspan="${colCount}">${esc(yr)}</th></tr>`;}
        if(wantsYearMonthGrouping){
          if(yr!==currentYear){addMonthTotal();addYearTotal();currentYear=yr;currentMonth='';monthTotal=0;monthCount=0;yearTotal=0;yearCount=0;groupedRows+=`<tr class="expense-report-subheading expense-report-year"><th colspan="${colCount}">${esc(yr)}</th></tr>`;}
          const monthKey=mon+' '+yr;
          if(monthKey!==currentMonth){addMonthTotal();currentMonth=monthKey;monthTotal=0;monthCount=0;groupedRows+=`<tr class="expense-report-subheading expense-report-month"><th colspan="${colCount}">${esc(mon)}</th></tr>`;}
        } else if(reportPeriod==='Weekly'&&ds){const d=new Date(ds+'T12:00:00');d.setDate(d.getDate()-((d.getDay()+6)%7));groupedRows+=`<tr class="expense-report-subheading"><th colspan="${colCount}">Week starting: ${esc(fmt(d))}</th></tr>`;}
        else if(reportPeriod==='Daily') groupedRows+=`<tr class="expense-report-subheading expense-report-date"><th colspan="${colCount}">${esc(formatReportDate(ds))}</th></tr>`;
        const photos=photoValues(r);
        // Show small clickable thumbnails. For Google Drive links, use its thumbnail endpoint for image display.
        const photoThumbUrl=url=>{
          const match=String(url||'').match(/[?&]id=([^&]+)/i) || String(url||'').match(/\/d\/([^/?]+)/i);
          if(/drive\.google\.com/i.test(String(url||'')) && match) return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w180`;
          return String(url||'');
        };
        const photosHtml=photos.length?`<div style="display:flex;align-items:center;gap:4px;flex-wrap:nowrap;white-space:nowrap">${photos.map((url,i)=>`<button type="button" class="expense-photo-preview-btn" data-expense-photo="${esc(url)}" title="View photo ${i+1}" aria-label="View photo ${i+1}" style="display:inline-flex;flex:0 0 48px;width:48px;height:48px;align-items:center;justify-content:center;padding:0;border:0;background:transparent;cursor:pointer"><img src="${esc(photoThumbUrl(url))}" alt="Photo ${i+1}" loading="lazy" style="display:block;width:46px;height:46px;object-fit:cover;border:1px solid #c4d4ff;border-radius:5px" onerror="this.style.display='none';this.parentElement.textContent='Open';this.parentElement.style.border='1px solid #c4d4ff';this.parentElement.style.borderRadius='5px';this.parentElement.style.color='#2477c8';this.parentElement.style.fontSize='11px'"></button>`).join('')}</div>`:'—';
        const cells=[
          `<td>${esc(formatReportDate(r.expenseDate))}</td>`,
          `<td>${esc(r.mainCategory||'')}</td>`,
          `<td>${esc(r.subCategory || (String(r.mainCategory||'').toLowerCase()==='vehicle maintenance' ? r.vehicleType : '') || '')}</td>`,
          `<td>${money(r.amount)}</td>`,
          `<td>${esc(r.paymentMode||'')}</td>`,
          `<td>${esc(r.spentBy||'')}</td>`,
          `<td class="expense-center-cell">${esc(r.sensitive||'No')}</td>`,
          `<td class="expense-center-cell">${photos.length}</td>`,
          `<td>${photosHtml}</td>`
        ];
        groupedRows+=`<tr>${cells.join('')}</tr>`;
        if(['This Year','All','Monthly','Yearly'].includes(reportPeriod)){const amount=Number(r.amount)||0;monthTotal+=amount;monthCount++;yearTotal+=amount;yearCount++;}
      });
      if(['This Year','All','Monthly','Yearly'].includes(reportPeriod)){addMonthTotal();addYearTotal();}
      table=`<div class="expense-results"><table><thead><tr>${headers.map((h,i)=>`<th${i===6||i===7?' class="expense-center-cell"':''}>${h}</th>`).join('')}</tr></thead><tbody>${groupedRows||`<tr><td colspan="${colCount}">No records found.</td></tr>`}</tbody></table></div>`;
    }
    const reportPeriodTitle=$('exReportPeriod')?.value||'';
    const reportHeading=`${esc(reportPeriodTitle||'All')} - ${type==='Detailed'?'Detailed Report':'Abstract'}`;
    let abstractPeriodHeading='';
    if(type==='Abstract'){
      const dates=rows.map(r=>String(r.expenseDate||'').slice(0,10)).filter(Boolean).sort();
      const today=dateToday();
      if(reportPeriodTitle==='Today') abstractPeriodHeading=formatReportDate(today);
      else if(reportPeriodTitle==='This Week'){const d=new Date();d.setDate(d.getDate()-((d.getDay()+6)%7));const e=new Date(d);e.setDate(e.getDate()+6);abstractPeriodHeading=`${formatReportDate(fmt(d))} - ${formatReportDate(fmt(e))}`;}
      else if(reportPeriodTitle==='This Month'){const d=new Date();abstractPeriodHeading=d.toLocaleString('en-US',{month:'long',year:'numeric'});}
      else if(reportPeriodTitle==='This Year') abstractPeriodHeading=String(new Date().getFullYear());
      else if(reportPeriodTitle==='All') abstractPeriodHeading=dates.length?`${new Date(dates[dates.length-1]+'T12:00:00').toLocaleString('en-US',{month:'long',year:'numeric'})} - All Periods`:'All Periods';
    }
    const abstractHeadingHtml=abstractPeriodHeading?`<div class="expense-abstract-heading">${esc(abstractPeriodHeading)}</div>`:'';
    $('exReportOutput').innerHTML=`<h2 class="expense-abstract-title">${reportHeading}</h2><style>.expense-abstract-title{font-size:24px;text-align:center;color:#3477b7;margin:10px 0 8px;font-weight:700}.expense-abstract-heading{font-size:18px;font-weight:700;color:#e67e22;margin:8px 0;padding:8px;border-bottom:1px solid #c4d4ff}.expense-report-subheading th{color:#e67e22!important}.expense-report-subheading.expense-report-year th{color:#2e8b57!important}.expense-report-subheading.expense-report-month th{font-size:14px!important}.expense-abstract-category-row:focus{outline:2px solid #4a9fe8;outline-offset:-2px}.expense-abstract-subrow td{background:#f4f9ff!important;color:#2d5274}.expense-abstract-toggle{display:inline-block;width:16px;font-weight:700;color:#2477c8}.expense-results table th,.expense-results table td{vertical-align:middle!important}.expense-results table th.expense-center-cell,.expense-results table td.expense-center-cell{text-align:center!important;vertical-align:middle!important}</style><div class="expense-summary"><div class="expense-summary-card"><small>Total Records :</small><strong>${counts}</strong></div><div class="expense-summary-card"><small>Total Expense :</small><strong>${money(total)}</strong></div></div>${abstractHeadingHtml}${table}`;
    // Photo thumbnails open in an in-app preview; the report remains open underneath.
    const reportOutput = $('exReportOutput');
    if (reportOutput) {
      reportOutput.querySelectorAll('.expense-photo-preview-btn').forEach(photoBtn => {
        photoBtn.addEventListener('click', () => {
          const rawUrl = photoBtn.getAttribute('data-expense-photo') || '';
          const match = rawUrl.match(/[?&]id=([^&]+)/i) || rawUrl.match(/\/d\/([^/?]+)/i);
          const displayUrl = /drive\.google\.com/i.test(rawUrl) && match
            ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`
            : rawUrl;
          let modal = document.getElementById('expensePhotoPreviewModal');
          if (!modal) {
            modal = document.createElement('div');
            modal.id = 'expensePhotoPreviewModal';
            modal.style.cssText = 'position:fixed;inset:0;z-index:1000000;background:rgba(0,0,0,.82);display:flex;align-items:center;justify-content:center;padding:18px;box-sizing:border-box;';
            modal.innerHTML = '<button type="button" aria-label="Close photo preview" style="position:absolute;top:12px;right:16px;width:42px;height:42px;border:0;border-radius:50%;background:#fff;color:#222;font-size:30px;line-height:1;cursor:pointer;z-index:1">×</button><img alt="Expense photo preview" style="display:block;max-width:100%;max-height:88vh;object-fit:contain;border-radius:6px;box-shadow:0 4px 20px #0008">';
            document.body.appendChild(modal);
            const closeModal = () => { modal.style.display = 'none'; };
            modal.querySelector('button').addEventListener('click', closeModal);
            modal.addEventListener('click', ev => { if (ev.target === modal) closeModal(); });
            document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && modal.style.display !== 'none') closeModal(); });
          }
          modal.querySelector('img').src = displayUrl;
          modal.style.display = 'flex';
        });
      });
    }
    // Abstract category rows expand/collapse their own subcategory totals. Keep this
    // behavior scoped to the current report output; no global navigation or filters change.
    $('exReportOutput').querySelectorAll('.expense-abstract-category-row').forEach(row=>{
      const toggle=()=>{
        const index=row.getAttribute('data-toggle-index');
        const subRows=$('exReportOutput').querySelectorAll(`.expense-abstract-subrow[data-parent-index="${index}"]`);
        const opening=row.getAttribute('aria-expanded')!=='true';
        subRows.forEach(subRow=>{subRow.hidden=!opening;});
        row.setAttribute('aria-expanded',String(opening));
        const mark=row.querySelector('.expense-abstract-toggle');
        if(mark)mark.textContent=opening?'－':'＋';
      };
      row.addEventListener('click',toggle);
      row.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();toggle();}});
    });
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
  function showInfo(){
    const aboutHtml = `
      <div class="expense-panel">
        <h3 style="margin-top:0;color:#2477c8">About oneFaMiLe Expenses</h3>
        <p><strong>Expenses</strong> helps family members record, review and manage day-to-day household and personal expenses in one place.</p>
        <h4>1. Add Expense</h4>
        <p>Enter the expense date, main category, sub-category, amount, payment mode, whether the entry is sensitive, and the person who spent the money. Add a short description when useful. Vehicle Maintenance also supports vehicle type, maintenance type and vehicle number.</p>
        <p>You can attach up to three photos to an expense. The amount must be greater than zero, and the date and category fields are required before saving.</p>
        <h4>2. Reports</h4>
        <p>Use Abstract reports to review record counts and totals grouped by category or by day, week, month or year. Use Detailed reports to inspect individual expense entries, including date, category, amount, payment type, expense by, sensitivity and attached photos.</p>
        <h4>3. Custom Search</h4>
        <p>Filter records using date range, category, sub-category, amount range, payment type, expense by and search text. Vehicle Maintenance records can also be filtered by vehicle type and maintenance type. Reports can be downloaded in PDF, Word or Excel-compatible format.</p>
        <h4>4. Sensitive Reports</h4>
        <p>Mark an expense as Sensitive when appropriate. Normal Reports are intended to exclude sensitive entries. Sensitive Reports and All Reports require the Sensitive Pass Code.</p>
        <h4>5. Family data and privacy</h4>
        <p>Expense entries are associated with the currently selected family and the active login session. Check the selected family and the entered details before saving. Keep your login and Sensitive Pass Code private.</p>
        <p style="margin-bottom:0"><strong>Tip:</strong> Review the date, amount and category before pressing Save. Use Reports or Custom Search to find saved entries later.</p>
      </div>`;
    showPage(shell('About Expenses',aboutHtml));
    $('expenseModuleBack').onclick=goBack;
  }
  // Initialize member list before form opens; form also works if member loading fails.
  document.addEventListener('DOMContentLoaded',()=>{loadMembers()});
  const expenseButton=$('expensesBtn');
  if(expenseButton)expenseButton.onclick=openMenu;
})();
