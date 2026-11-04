
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
  let lastExpenseReportContext = null;
  const $ = id => document.getElementById(id);
  // Close the Expenses download menu when the user taps anywhere outside it.
  // Capture-phase pointer/touch handling works reliably on mobile Safari too.
  function installExpenseDownloadMenuDismiss(){
    const key='__oneFaMiLeExpenseDownloadOutsideHandler';
    const previous=window[key];
    if(previous){
      document.removeEventListener('pointerdown',previous,true);
      document.removeEventListener('touchstart',previous,true);
    }
    const handler=event=>{
      const target=event.target;
      if(target && typeof target.closest==='function' && target.closest('.expense-download-wrap')) return;
      const menu=$('exDownloadMenu');
      if(menu) menu.classList.add('hidden');
    };
    window[key]=handler;
    document.addEventListener('pointerdown',handler,true);
    document.addEventListener('touchstart',handler,true);
  }
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
  // Show a short explanation immediately above the highlighted row the user taps.
  function showExpenseHighlightToast(message, kind, anchorRow){
    let toast=document.getElementById('expenseHighlightToast');
    if(!toast){
      toast=document.createElement('div');
      toast.id='expenseHighlightToast';
      toast.setAttribute('role','status');
      toast.setAttribute('aria-live','polite');
      document.body.appendChild(toast);
    }
    clearTimeout(window.expenseHighlightToastTimer);
    clearTimeout(window.expenseHighlightToastHideTimer);
    const isHigh=kind==='high';
    toast.textContent=message;
    toast.style.cssText=`position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:2147483647;max-width:calc(100vw - 28px);width:max-content;box-sizing:border-box;padding:10px 17px;border-radius:10px;background:${isHigh?'#fff0df':'#e8f5e9'};color:${isHigh?'#8a4b12':'#2e6b43'};border:1px solid ${isHigh?'#e9b77f':'#a6d5ad'};box-shadow:0 4px 14px rgba(0,0,0,.18);font-size:14px;font-weight:700;text-align:center;line-height:1.3;white-space:normal;opacity:1;display:block;pointer-events:none;transition:opacity .2s ease`;
    // Anchor the message to the selected table row, not to the top of the screen.
    if(anchorRow && anchorRow.isConnected){
      const rowRect=anchorRow.getBoundingClientRect();
      const toastRect=toast.getBoundingClientRect();
      const halfWidth=toastRect.width/2;
      const leftLimit=halfWidth+8;
      const rightLimit=Math.max(leftLimit,window.innerWidth-halfWidth-8);
      const left=Math.min(Math.max(rowRect.left+rowRect.width/2,leftLimit),rightLimit);
      const top=Math.max(8,rowRect.top-toastRect.height-8);
      toast.style.left=left+'px';
      toast.style.top=top+'px';
      toast.style.transform='translateX(-50%)';
    }
    window.expenseHighlightToastTimer=setTimeout(()=>{
      toast.style.opacity='0';
      window.expenseHighlightToastHideTimer=setTimeout(()=>{
        if(toast)toast.style.display='none';
      },200);
    },2000);
  }
  function field(label, control, id){return `<div class="expense-field"><label class="expense-label" for="${id||''}"><span class="expense-label-text">${label}</span><span class="expense-colon">:</span></label>${control}</div>`}
  function selectOptions(items,placeholder='Select',preserveOrder=false) {const list=preserveOrder?items.slice():items.slice().sort((a,b)=>String(a).localeCompare(String(b),undefined,{sensitivity:'base'}));return `<option value="">${placeholder}</option>`+list.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}
  function reportChoiceOptions(items,selected=''){return items.map(x=>`<option value="${esc(x)}"${x===selected?' selected':''}>${esc(x)}</option>`).join('')}
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
  function renderForm(editRecord=null){
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
      <button type="button" class="expense-photo-slot" data-photo-slot="0" id="exPhotoSlot1" aria-label="Choose photo 1" style="width:42px;height:40px;min-width:42px;max-width:42px;flex:0 0 42px;box-sizing:border-box;border:1px solid #8aa6c1;border-radius:7px;background:#fff;">1</button>
      <button type="button" class="expense-photo-slot" data-photo-slot="1" id="exPhotoSlot2" aria-label="Choose photo 2" style="width:42px;height:40px;min-width:42px;max-width:42px;flex:0 0 42px;box-sizing:border-box;border:1px solid #8aa6c1;border-radius:7px;background:#fff;">2</button>
      <button type="button" class="expense-photo-slot" data-photo-slot="2" id="exPhotoSlot3" aria-label="Choose photo 3" style="width:42px;height:40px;min-width:42px;max-width:42px;flex:0 0 42px;box-sizing:border-box;border:1px solid #8aa6c1;border-radius:7px;background:#fff;">3</button>
    </div>
    <input id="exPhotos" type="file" accept="image/*" multiple style="display:none;">
    <small id="exPhotoCount" style="display:block;align-self:flex-start;text-align:left;white-space:nowrap;font-size:12px;line-height:16px;margin:0;padding:0;">0 photos selected (Maximum 3)</small>
  </div>
`,'exPhotos')}
<div id="expenseStatus" class="expense-status" role="status"></div>
      <div class="expense-actions"><button class="expense-primary" type="submit" id="expenseSaveBtn">Save</button><button class="expense-secondary" type="reset" id="expenseResetBtn">Reset</button><button type="button" class="expense-secondary" id="expenseModuleBack">← Back</button></div>
    </form>`;
    showPage(shell(editRecord?'Edit Expense':'Add Expense',inner,true));
    if($('expenseSaveBtn'))$('expenseSaveBtn').textContent=editRecord?'Update':'Save';
    // Disabled Amount / Expense by remain white while preserving disabled state.
    const expenseWhiteStyle = document.createElement('style');
    expenseWhiteStyle.textContent = '#expenseForm #exAmount:disabled, #expenseForm #exSpentBySearch:disabled { background:#fff !important; color:#333 !important; opacity:1 !important; -webkit-text-fill-color:#333 !important; } #expenseForm .expense-photo-picker { max-width:100%; flex-wrap:nowrap !important; gap:6px; } #expenseForm .expense-photo-picker button { flex-shrink:0 !important; } #expenseForm .expense-photo-picker #exPhotoChooseBtn { min-width:62px!important;width:62px!important;max-width:62px!important;height:40px!important;min-height:40px!important;max-height:40px!important;flex:0 0 62px!important;background:#fff!important;background-color:#fff!important;color:#2477c8!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;padding:0!important;box-sizing:border-box!important; } #expenseForm .expense-photo-picker .expense-photo-slot { width:42px!important; min-width:42px!important; max-width:42px!important; height:40px!important; min-height:40px!important; max-height:40px!important; flex:0 0 42px!important; display:flex!important; align-items:center!important; justify-content:center!important; text-align:center!important; padding:0!important; line-height:1!important; box-sizing:border-box!important; } #expenseForm .expense-field{align-items:center} #expenseForm .expense-label{display:grid!important;grid-template-columns:minmax(0,1fr) 10px!important;align-items:center!important;align-self:center;margin-top:0!important;justify-self:stretch!important;text-align:left!important;width:100%!important;box-sizing:border-box!important} #expenseForm .expense-label-text{text-align:left!important;min-width:0!important} #expenseForm .expense-colon{text-align:center!important;display:block!important;width:10px!important} .expense-page:has(#expenseForm)>.expense-title{margin-top:-70px!important;margin-bottom:10px!important;padding-top:0!important} #expenseForm #expenseStatus{margin:0!important;min-height:0!important} #expenseForm .expense-actions{margin-top:4px!important;padding-top:0!important}';
    document.head.appendChild(expenseWhiteStyle);
    $('expenseModuleBack').onclick=goBack;
    const photoField = $('exPhotos')?.closest('.expense-field');
    if (photoField) { const photoLabel = photoField.querySelector('.expense-label'); if (photoLabel) { photoLabel.style.alignSelf='center'; photoLabel.style.marginTop='0'; photoLabel.style.display='grid'; photoLabel.style.gridTemplateColumns='minmax(0,1fr) 10px'; photoLabel.style.alignItems='center'; photoLabel.style.justifyContent='stretch'; photoLabel.style.height='40px'; photoLabel.style.minHeight='40px'; photoLabel.style.transform='none'; } }
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
    if(editRecord){
      $('exDate').value=String(editRecord.expenseDate||'').slice(0,10);
      cat.value=String(editRecord.mainCategory||'');
      cat.dispatchEvent(new Event('change'));
      const savedSub=String(editRecord.subCategory||editRecord.vehicleType||'');
      if(savedSub && !Array.from(sub.options).some(o=>o.value===savedSub)) sub.add(new Option(savedSub,savedSub));
      sub.value=savedSub;
      sub.dispatchEvent(new Event('change'));
      $('exDate').value=String(editRecord.expenseDate||'').slice(0,10);
      $('exMaintenanceType').value=String(editRecord.maintenanceType||'');
      $('exVehicleNumber').value=String(editRecord.vehicleNumber||'');
      $('exAmount').value=String(editRecord.amount==null?'':editRecord.amount);
      $('exPaymentMode').value=String(editRecord.paymentMode||'');
      $('exSensitive').value=String(editRecord.sensitive||'No');
      $('exSpentBySearch').value=String(editRecord.spentBy||defaultName||'');
      if(cat.value==='Vehicle Maintenance') $('exVehicleDescription').value=String(editRecord.description||'');
      else $('exDescription').value=String(editRecord.description||'');
      syncEntrySequence();
      $('exSpentBySearch').value=String(editRecord.spentBy||defaultName||'');
      // Keep the original Add Expense counter wording while editing.
      updateExpensePhotoSlots();
    }
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

  if(editRecord)payload.expenseId=String(editRecord.expenseId||'');
  const res = await request(editRecord?'updateExpense':'saveExpense', payload);

  if (res.status !== 'success') {
    throw new Error(res.message || 'Could not save expense.');
  }

  status(editRecord?'Expense updated successfully.':'Expense saved successfully.', 'success');
  selectedExpensePhotos = [null, null, null];
  if(editRecord){cachedExpenses=[];goBack();return;}
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
      finally{btn.disabled=false;btn.textContent=editRecord?'Update':'Save'}
    };
    $('expenseResetBtn').onclick=()=>setTimeout(()=>{ selectedExpensePhotos=[null,null,null];updateExpensePhotoSlots();$('exDate').value=dateToday();$('exSpentBySearch').value='';$('exSpentBySearch').disabled=true;$('exAmount').value='';$('exAmount').disabled=true;setPhotoSelectionEnabled(false);vehicleFields.classList.add('hidden');$('exNormalDescription').classList.remove('hidden');sub.innerHTML=selectOptions([],'Select Subcategory');subRow.classList.remove('hidden');sub.required=true;syncEntrySequence();status('');},0);
  }
  function renderSensitiveGate(kind){
    activeReport=kind;
    const label=kind==='sensitive'?'Sensitive Reports':'All Reports';
    const inner=`<div class="expense-panel">${field('Pass Code','<input id="exReportPass" type="password" inputmode="numeric" autocomplete="current-password" placeholder="Enter Pass Code">','exReportPass')}<div id="expenseStatus" class="expense-status" role="status"></div><div class="expense-actions" style="display:flex!important;flex-direction:row!important;align-items:stretch!important;justify-content:flex-start!important;gap:8px!important;flex-wrap:nowrap!important;width:100%!important;box-sizing:border-box!important;margin-top:18px!important"><button type="button" id="exVerifyPass" class="expense-primary" style="flex:1 1 0!important;width:0!important;min-width:0!important;max-width:none!important;margin:0!important;box-sizing:border-box!important">Verify</button><button type="button" id="expenseModuleBack" class="expense-secondary" style="flex:1 1 0!important;width:0!important;min-width:0!important;max-width:none!important;margin:0!important;box-sizing:border-box!important;background:transparent!important;background-color:transparent!important;color:#2477c8!important;border:1.5px solid #2477c8!important;box-shadow:none!important">← Back</button></div></div>`;
    showPage(shell(label,inner,true));$('expenseModuleBack').onclick=goBack;
    $('exVerifyPass').onclick=async()=>{const pass=$('exReportPass').value.trim();if(!pass){status('Enter Pass Code.','error');return}const btn=$('exVerifyPass');btn.disabled=true;try{const res=await request('getExpenses',{reportAccess:kind,passCode:pass});if(res.status!=='success')throw new Error(res.message||'Verification failed.');cachedExpenses=res.expenses||[];renderReports(kind, cachedExpenses)}catch(err){status(err.message,'error');btn.disabled=false}};
  }
  function reportControls(custom=false){
    const types=['Abstract','Detailed'];
    return `<style>.expense-report-inline{display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:5px;grid-column:auto!important;width:100%;box-sizing:border-box}.expense-report-inline .expense-label{display:block!important;flex:0 0 auto;align-items:center;justify-content:flex-start;white-space:nowrap;min-width:0;width:100%;margin:0!important}.expense-report-inline .expense-label:after{content:':'}.expense-report-inline select{display:block!important;flex:1 1 auto;min-width:0;width:100%;max-width:none;box-sizing:border-box}.expense-report-actions{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:nowrap}.expense-report-actions>button,.expense-download-wrap>button{white-space:nowrap}.expense-download-wrap{position:relative}.expense-download-menu{position:absolute;right:0;top:100%;z-index:9999;display:flex;flex-direction:column;min-width:100px;background:#fff;border:1px solid #9ab;border-radius:8px;box-shadow:0 4px 12px #0002}.expense-download-menu.hidden{display:none}.expense-download-menu button{background:#fff;border:0;padding:9px 14px;text-align:left;color:#222}.expense-report-subheading th{background:#fff!important;text-align:left;border-top:1px solid #c4d4ff;border-bottom:1px solid #c4d4ff;color:#2d5274}.expense-report-year th{font-size:24px!important;font-weight:700;padding:10px 8px;background:#fff!important;color:#218838!important}.expense-report-month th{font-size:20px!important;font-weight:700;padding:8px;background:#fff!important;color:#e67e22!important}.expense-report-subheading.expense-report-month th{color:#e67e22!important}.expense-report-total td{font-weight:700;background:#fff!important;border-top:1px solid #c4d4ff}.expense-report-date th{font-size:13px!important;font-weight:600;background:#fff!important}.expense-report-actions .expense-secondary,.expense-report-actions .expense-primary{padding:8px 12px}
.expense-page:has(#expenseReportTitle) .expense-report-actions{display:flex!important;align-items:stretch!important;gap:8px!important;width:100%!important;box-sizing:border-box!important}
.expense-page:has(#expenseReportTitle) .expense-report-actions>.expense-download-wrap,.expense-page:has(#expenseReportTitle) .expense-report-actions>button{flex:1 1 0!important;width:0!important;min-width:0!important;max-width:none!important;box-sizing:border-box!important}
.expense-page:has(#expenseReportTitle) .expense-report-actions>.expense-download-wrap>button{display:block!important;width:100%!important;min-width:0!important;box-sizing:border-box!important}.expense-date-sort-field{display:none!important;align-self:end}.expense-date-sort{width:100%;min-height:42px;border:1px solid #8baec8;border-radius:8px;background:#fff;color:#2d5274;font-weight:700;padding:8px;cursor:pointer}.expense-date-sort:active{background:#e5f3ff}.expense-payment-filter{grid-column:1!important}.expense-filter-grid #exShowColumnsWrap{grid-column:2!important;grid-row:4!important}.expense-filter-grid .expense-amount-sort-field{grid-column:1!important;grid-row:5!important}.expense-custom-filter-grid #exShowColumnsWrap{grid-column:2!important;grid-row:6!important}.expense-custom-filter-grid .expense-amount-sort-field{grid-column:2!important;grid-row:6!important}.expense-spentby-filter{grid-column:2!important}.expense-custom-filter-grid .expense-field:has(#exFilterCategory),.expense-custom-filter-grid .expense-field:has(#exFilterSub){grid-row:2!important}.expense-custom-filter-grid .expense-payment-filter,.expense-custom-filter-grid .expense-spentby-filter{grid-row:3!important}.expense-custom-filter-grid .expense-field:has(#exMinAmount),.expense-custom-filter-grid .expense-field:has(#exMaxAmount){grid-row:4!important}.expense-custom-filter-grid .expense-field:has(#exFromDate),.expense-custom-filter-grid .expense-field:has(#exToDate){grid-row:5!important}.expense-custom-filter-grid .expense-payment-filter{grid-column:1!important}.expense-custom-filter-grid .expense-spentby-filter{grid-column:2!important}.expense-custom-filter-grid .expense-search-text-filter{grid-row:6!important;grid-column:1!important}.expense-custom-filter-grid .expense-amount-sort-field{grid-row:6!important;grid-column:2!important}.expense-custom-filter-grid #exFromDate,.expense-custom-filter-grid #exToDate{height:40px!important;min-height:40px!important;max-height:40px!important;padding:7px 10px!important;box-sizing:border-box!important;line-height:normal!important}.expense-custom-filter-grid #exVehicleTypeWrap,.expense-custom-filter-grid #exMtcTypeWrap{grid-row:7!important;grid-column:auto!important}.expense-filter-grid .expense-field.hidden{display:none!important}.expense-filter-grid #exVehicleTypeWrap,.expense-filter-grid #exMtcTypeWrap{grid-column:auto!important}.expense-filter-grid #exVehicleTypeWrap.hidden,.expense-filter-grid #exMtcTypeWrap.hidden{display:none!important}.expense-report-actions #exDownloadBtn,.expense-report-actions #expenseReportBack{background:transparent!important;background-color:transparent!important;color:#2477c8!important;border:1.5px solid #2477c8!important;box-shadow:none!important}
.expense-page:not(.expense-report-view) .expense-report-actions #exDownloadBtn{display:none!important}.expense-report-actions #exDownloadBtn:disabled{opacity:1!important;color:#2477c8!important;background:transparent!important;border-color:#2477c8!important;cursor:not-allowed}.expense-summary{display:flex;align-items:center;gap:8px;width:100%;margin:10px 0 14px;box-sizing:border-box;flex-wrap:nowrap}.expense-summary-card{display:flex;align-items:center;justify-content:center;gap:4px;white-space:nowrap;min-width:0;box-sizing:border-box;padding:9px 8px;border:1px solid #c4d4ff;border-radius:8px;flex:1 1 50%;width:50%}.expense-summary-card small{display:inline;font-size:clamp(8px,2.4vw,12px);white-space:nowrap}.expense-summary-card strong{display:inline;font-size:clamp(9px,2.7vw,14px);white-space:nowrap}@media(max-width:600px){.expense-filter-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;column-gap:10px!important;row-gap:10px!important}.expense-filter-grid>.expense-field{grid-column:auto!important;min-width:0!important;width:100%!important;box-sizing:border-box!important}.expense-filter-grid>.expense-report-inline{grid-column:auto!important}.expense-filter-grid>.expense-field label{display:block!important;white-space:normal!important;max-width:100%!important;margin-bottom:5px!important}.expense-filter-grid>.expense-field input,.expense-filter-grid>.expense-field select{width:100%!important;min-width:0!important;box-sizing:border-box!important}.expense-report-inline .expense-label{flex:0 0 auto!important;width:100%!important;white-space:nowrap!important;margin-bottom:0!important}.expense-report-inline select{flex:1 1 auto!important;width:100%!important}.expense-report-actions{gap:6px!important}.expense-report-actions button{min-width:0!important;flex:1 1 0!important;padding:8px 4px!important;font-size:12px!important}}@media(min-width:601px){.expense-filter-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important}.expense-filter-grid>.expense-report-inline{grid-column:auto!important}}
.expense-period-label-row{display:grid;grid-template-columns:max-content minmax(0,1fr);column-gap:6px;align-items:center;width:100%;min-width:0}
.expense-period-label-row .expense-label{display:block;width:max-content!important;min-width:max-content!important;margin:0!important;white-space:nowrap!important;word-break:keep-all!important;overflow-wrap:normal!important}
.expense-period-context-label{text-align:right!important;justify-self:end!important;width:auto!important;min-width:0!important}
.expense-period-controls{display:grid;grid-template-columns:minmax(0,45fr) minmax(0,55fr);align-items:center;gap:0;width:100%;min-width:0;box-sizing:border-box}
.expense-period-controls.is-full{grid-template-columns:minmax(0,1fr)}
.expense-period-controls>#exReportPeriod{display:block;width:100%!important;min-width:0!important;max-width:100%;height:40px;min-height:40px;box-sizing:border-box;font-size:16px!important;padding:0 1px!important;line-height:1.15!important;-webkit-appearance:none!important;appearance:none!important;background-image:none!important;text-align:center!important;text-align-last:center!important}
.expense-period-controls.has-value>#exReportPeriod{border-radius:8px 0 0 8px!important;border-right:0!important}
.expense-period-controls.has-value .expense-period-trigger,.expense-period-controls.has-value #exPeriodYear{border-radius:0 8px 8px 0!important;border-left:1px solid #9bb9d4!important}
.expense-period-controls.is-full>#exReportPeriod{font-size:inherit!important;padding:0 10px!important;text-align:left!important;text-align-last:left!important;line-height:normal!important}
.expense-period-value{position:relative;z-index:5;display:flex;align-items:center;justify-content:center;min-width:0;width:100%;height:40px;min-height:40px;box-sizing:border-box}
.expense-period-value[hidden]{display:none!important}
.expense-period-trigger{display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;min-width:0!important;max-width:100%!important;height:40px!important;min-height:40px!important;margin:0!important;padding:0 4px!important;box-sizing:border-box!important;border:1px solid #9bb9d4!important;border-radius:8px!important;background:#fff!important;color:#222!important;font:inherit!important;font-size:16px!important;font-weight:400!important;line-height:1!important;white-space:nowrap!important;box-shadow:none!important;cursor:pointer!important}
.expense-period-trigger[hidden]{display:none!important}
.expense-period-value input[type=number]{width:100%;min-width:0;height:40px;min-height:40px;box-sizing:border-box;padding:0 4px;text-align:center;font-size:16px}
.expense-period-value input[hidden]{display:none!important}
.expense-period-picker{position:absolute;top:calc(100% + 6px);right:0;z-index:100000;width:290px;max-width:calc(100vw - 32px);padding:10px;box-sizing:border-box;border:1px solid #9bb9d4;border-radius:9px;background:#fff;color:#222;box-shadow:0 5px 18px rgba(0,0,0,.22);font-size:14px;text-align:center}
.expense-period-picker[hidden]{display:none!important}
.expense-period-value #exPeriodYear[hidden]{display:none!important}
.expense-picker-header{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}
.expense-picker-header strong{flex:1;text-align:center;font-size:15px}
.expense-picker-nav{width:32px;height:30px;padding:0;border:1px solid #c4d4ff;border-radius:6px;background:#f0f7ff;color:#2d5274;font-size:18px;line-height:1;box-shadow:none}
.expense-calendar-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:3px}
.expense-calendar-weekday{padding:5px 0;color:#526b80;font-weight:700;font-size:12px}
.expense-calendar-day{min-width:0;height:31px;padding:0;border:0;border-radius:5px;background:#fff;color:#222;font-size:13px;box-shadow:none}
.expense-calendar-day.outside-month{color:#a4acb5}
.expense-calendar-day.today{outline:1px solid #2477c8}
.expense-calendar-day.selected{background:#2477c8;color:#fff;font-weight:700}
.expense-picker-footer{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:9px;padding-top:7px;border-top:1px solid #e2e8f0}
.expense-picker-action{flex:1 1 0;min-width:0;padding:5px 2px;border:0;border-radius:5px;background:transparent;color:#2477c8;font-size:12px;font-weight:600;white-space:nowrap;box-shadow:none}
.expense-month-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
.expense-month-choice{height:34px;padding:0 4px;border:1px solid #e2e8f0;border-radius:6px;background:#fff;color:#222;font-size:13px;box-shadow:none}
.expense-month-choice.selected{background:#2477c8;border-color:#2477c8;color:#fff;font-weight:700}
@media(max-width:600px){.expense-period-picker{width:290px;max-width:calc(100vw - 28px);right:0;padding:9px}.expense-calendar-day{height:34px}}
</style><div class="expense-panel"><div class="expense-filter-grid ${custom?'expense-custom-filter-grid':''}">
      <div class="expense-field expense-report-inline"><label class="expense-label" for="exReportType"><span class="expense-label-text">Report Type</span></label><select id="exReportType">${reportChoiceOptions(types,'Abstract')}</select></div>
      <div class="expense-field expense-report-inline"><div class="expense-period-label-row"><label class="expense-label" for="exReportPeriod"><span class="expense-label-text">Report Period</span></label><label class="expense-label expense-period-context-label" id="exPeriodContextLabel" for="exPeriodDisplay">Today</label></div><div class="expense-period-controls" id="expensePeriodControls"><select id="exReportPeriod">${reportChoiceOptions(['Date','Week','Month','Year','All'],'Date')}</select><div class="expense-period-value" id="expensePeriodValue"><button type="button" class="expense-period-trigger" id="exPeriodDisplay" aria-haspopup="dialog" aria-expanded="false">${dateToday().slice(8,10)}-${dateToday().slice(5,7)}-${dateToday().slice(0,4)}</button><input id="exPeriodDate" type="hidden" value="${dateToday()}" aria-label="Selected report date"><input id="exPeriodWeek" type="hidden" value="${dateToday()}" aria-label="Selected report week date"><input id="exPeriodMonth" type="hidden" value="${dateToday().slice(0,7)}" aria-label="Selected report month"><input id="exPeriodYear" type="number" min="1900" max="2100" step="1" value="${new Date().getFullYear()}" aria-label="Select report year" title="Select report year" hidden><div class="expense-period-picker" id="exPeriodPicker" role="dialog" aria-label="Choose report period" hidden></div></div></div></div>
      <div class="expense-field"><label class="expense-label" for="exFilterCategory"><span class="expense-label-text">Category</span></label><select id="exFilterCategory">${selectOptions(Object.keys(CATEGORIES),'All')}</select></div>
      <div class="expense-field"><label class="expense-label" for="exFilterSub"><span class="expense-label-text">Sub-Category</span></label><select id="exFilterSub">${selectOptions([],'All')}</select></div>
      <div class="expense-field"><label class="expense-label" for="exMinAmount"><span class="expense-label-text">Amount &gt;</span></label><input id="exMinAmount" type="number" min="0" step="0.01" placeholder="Any"></div>
      <div class="expense-field"><label class="expense-label" for="exMaxAmount"><span class="expense-label-text">Amount &lt;</span></label><input id="exMaxAmount" type="number" min="0" step="0.01" placeholder="Any"></div>
      <div class="expense-field expense-payment-filter"><label class="expense-label" for="exFilterPayment"><span class="expense-label-text">Payment Type</span></label><select id="exFilterPayment">${selectOptions(PAYMENT_MODES,'All Payment Types')}</select></div>
      <div class="expense-field expense-report-inline hidden" id="exShowColumnsWrap"><label class="expense-label" for="exShowColumns"><span class="expense-label-text">Show Columns</span></label><select id="exShowColumns"><option value="all">All</option><option value="limited" selected>Limited</option></select></div>
      <div class="expense-field hidden" id="exSelectedDateWrap"><label class="expense-label" for="exSelectedDate"><span class="expense-label-text">Selected Date</span></label><input id="exSelectedDate" type="date" value="${dateToday()}"></div>
      ${custom?`<div class="expense-field"><label class="expense-label" for="exFromDate"><span class="expense-label-text">From Date</span></label><input id="exFromDate" type="date"></div><div class="expense-field"><label class="expense-label" for="exToDate"><span class="expense-label-text">To Date</span></label><input id="exToDate" type="date"></div>
      <div class="expense-field expense-spentby-filter"><label class="expense-label" for="exFilterSpentBy"><span class="expense-label-text">Expense by</span></label><input id="exFilterSpentBy" list="exSearchMembers" placeholder="Any member/name"><datalist id="exSearchMembers">${[...new Set((cachedExpenses||[]).map(r=>String(r.spentBy||'').trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b)).map(n=>`<option value="${esc(n)}"></option>`).join('')}</datalist></div>
      <div class="expense-field expense-search-text-filter"><label class="expense-label" for="exSearchText"><span class="expense-label-text">Search Text</span></label><input id="exSearchText" type="search" placeholder="Description, category, spent by…"></div>
      <div class="expense-field hidden" id="exVehicleTypeWrap"><label class="expense-label" for="exFilterVehicleType"><span class="expense-label-text">Vehicle Type</span></label><select id="exFilterVehicleType">${selectOptions(VEHICLE_TYPES,'All Vehicle Types')}</select></div>
      <div class="expense-field hidden" id="exMtcTypeWrap"><label class="expense-label" for="exFilterMtcType"><span class="expense-label-text">Mtc Type</span></label><select id="exFilterMtcType">${selectOptions(MAINTENANCE_TYPES,'All Maintenance Types')}</select></div>`:''}
      </div><div class="expense-actions expense-report-actions"><button type="button" id="exRunReport" class="expense-primary">Show Report</button><button type="button" id="expenseReportBack" class="expense-secondary">← Back</button></div><div id="expenseStatus" class="expense-status" role="status"></div></div><div id="exReportOutput"></div>`;
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
    const abstractPeriods=['Date','Week','Month','Year','All','Daily','Weekly','Monthly','Yearly'];
    const detailedPeriods=['Date','Week','Month','Year','All'];
    const syncPeriodOptions=()=>{const previous=period.value;const choices=typeSelect.value==='Abstract'?abstractPeriods:detailedPeriods;const selected=choices.includes(previous)?previous:'Date';period.innerHTML=reportChoiceOptions(choices,selected);period.value=selected;};
    const toggle=()=>{$('exSelectedDateWrap').classList.add('hidden');const showCols=$('exShowColumnsWrap');const detailed=typeSelect.value==='Detailed';if(showCols){showCols.classList.toggle('hidden',!detailed);showCols.style.setProperty('display',detailed?'flex':'none','important');}};
    const periodPicker=$('exPeriodPicker');
    const periodDisplay=$('exPeriodDisplay');
    const periodContextLabel=$('exPeriodContextLabel');
    let pickerMonth=new Date();
    const parseLocalDate=value=>{
      const match=String(value||'').match(/^(\d{4})-(\d{2})-(\d{2})$/);
      return match?new Date(Number(match[1]),Number(match[2])-1,Number(match[3])):new Date();
    };
    const toIsoDate=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
    const displayDate=value=>{
      const match=String(value||'').match(/^(\d{4})-(\d{2})-(\d{2})$/);
      return match?`${match[3]}-${match[2]}-${match[1]}`:'';
    };
    const weekStart=value=>{
      const date=parseLocalDate(value);
      date.setDate(date.getDate()-((date.getDay()+6)%7));
      date.setHours(0,0,0,0);
      return date;
    };
    const dayOrdinal=value=>{
      const date=parseLocalDate(value);
      return Math.round(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate())/86400000);
    };
    const closePeriodPicker=()=>{
      if(periodPicker)periodPicker.hidden=true;
      if(periodDisplay)periodDisplay.setAttribute('aria-expanded','false');
    };
    const resetPeriodSelectionToCurrent=()=>{
      const p=period.value;
      const current=dateToday();
      const currentDate=new Date();
      if(p==='Date'){
        const input=$('exPeriodDate');
        if(input)input.value=current;
      }else if(p==='Week'){
        const input=$('exPeriodWeek');
        if(input)input.value=current;
        pickerMonth=parseLocalDate(current);
      }else if(p==='Month'){
        const input=$('exPeriodMonth');
        if(input)input.value=current.slice(0,7);
        if(periodPicker)periodPicker.dataset.year=String(currentDate.getFullYear());
      }else if(p==='Year'){
        const input=$('exPeriodYear');
        if(input)input.value=String(currentDate.getFullYear());
      }
    };
    const updatePeriodDisplay=()=>{
      const p=period.value;
      const now=dateToday();
      const currentDate=new Date();
      let text='',caption='';
      if(p==='Date'){
        const value=$('exPeriodDate')?.value||now;
        text=displayDate(value);
        const offset=dayOrdinal(value)-dayOrdinal(now);
        caption=offset===0?'Today':offset===-1?'Yesterday':offset===1?'Tomorrow':'';
      }else if(p==='Week'){
        const value=$('exPeriodWeek')?.value||now;
        text=displayDate(value);
        const selectedWeek=dayOrdinal(toIsoDate(weekStart(value)));
        const currentWeek=dayOrdinal(toIsoDate(weekStart(now)));
        const offset=Math.round((selectedWeek-currentWeek)/7);
        caption=offset===0?'This Week':offset===-1?'Last Week':offset===1?'Next Week':'';
      }else if(p==='Month'){
        const value=$('exPeriodMonth')?.value||now.slice(0,7);
        const match=value.match(/^(\d{4})-(\d{2})$/);
        text=match?`${new Date(Number(match[1]),Number(match[2])-1,1).toLocaleString('en-US',{month:'short'})} ${match[1]}`:value;
        if(match){
          const selectedMonth=Number(match[1])*12+Number(match[2])-1;
          const currentMonth=currentDate.getFullYear()*12+currentDate.getMonth();
          const offset=selectedMonth-currentMonth;
          caption=offset===0?'This Month':offset===-1?'Last Month':offset===1?'Next Month':'';
        }
      }else if(p==='Year'){
        const value=$('exPeriodYear')?.value||String(currentDate.getFullYear());
        text=value;
        const offset=Number(value)-currentDate.getFullYear();
        caption=offset===0?'This Year':offset===-1?'Last Year':offset===1?'Next Year':'';
      }
      if(periodDisplay)periodDisplay.textContent=text;
      if(periodContextLabel){
        periodContextLabel.textContent=caption;
        periodContextLabel.hidden=!caption;
      }
    };
    const renderPeriodPicker=()=>{
      if(!periodPicker)return;
      const p=period.value;
      if(p==='Month'){
        const current=$('exPeriodMonth')?.value||dateToday().slice(0,7);
        const match=current.match(/^(\d{4})-(\d{2})$/);
        const year=match?Number(match[1]):new Date().getFullYear();
        const selectedMonth=match?Number(match[2])-1:new Date().getMonth();
        const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        periodPicker.innerHTML=`<div class="expense-picker-header"><button type="button" class="expense-picker-nav" data-month-year="-1" aria-label="Previous year">‹</button><strong>${year}</strong><button type="button" class="expense-picker-nav" data-month-year="1" aria-label="Next year">›</button></div><div class="expense-month-grid">${months.map((name,index)=>`<button type="button" class="expense-month-choice${index===selectedMonth?' selected':''}" data-pick-month="${String(index+1).padStart(2,'0')}">${name}</button>`).join('')}</div><div class="expense-picker-footer"><button type="button" class="expense-picker-action" data-period-action data-period-unit="month" data-period-offset="-1">Last Month</button><button type="button" class="expense-picker-action" data-period-action data-period-unit="month" data-period-offset="0">This Month</button><button type="button" class="expense-picker-action" data-period-action data-period-unit="month" data-period-offset="1">Next Month</button></div>`;
        periodPicker.dataset.year=String(year);
        return;
      }
      const value=p==='Week'?($('exPeriodWeek')?.value||dateToday()):($('exPeriodDate')?.value||dateToday());
      const selected=parseLocalDate(value);
      const year=pickerMonth.getFullYear(),month=pickerMonth.getMonth();
      const first=new Date(year,month,1);
      const start=new Date(year,month,1-((first.getDay()+6)%7));
      const monthName=pickerMonth.toLocaleString('en-US',{month:'long'});
      const weekdays=['Mo','Tu','We','Th','Fr','Sa','Su'];
      const selectedWeekStart=toIsoDate(weekStart(value));
      const nowDate=dateToday();
      const days=Array.from({length:42},(_,i)=>{
        const date=new Date(start);date.setDate(start.getDate()+i);
        const iso=toIsoDate(date);
        const classes=['expense-calendar-day'];
        if(date.getMonth()!==month)classes.push('outside-month');
        if(iso===nowDate)classes.push('today');
        if(p==='Week'&&toIsoDate(weekStart(iso))===selectedWeekStart)classes.push('selected');
        else if(p==='Date'&&iso===value)classes.push('selected');
        return `<button type="button" class="${classes.join(' ')}" data-pick-date="${iso}" aria-label="${iso}">${date.getDate()}</button>`;
      });
      const quickActions=p==='Week'
        ?[{label:'Last Week',unit:'week',offset:-1},{label:'This Week',unit:'week',offset:0},{label:'Next Week',unit:'week',offset:1}]
        :[{label:'Yesterday',unit:'day',offset:-1},{label:'Today',unit:'day',offset:0},{label:'Tomorrow',unit:'day',offset:1}];
      periodPicker.innerHTML=`<div class="expense-picker-header"><button type="button" class="expense-picker-nav" data-calendar-month="-1" aria-label="Previous month">‹</button><strong>${monthName} ${year}</strong><button type="button" class="expense-picker-nav" data-calendar-month="1" aria-label="Next month">›</button></div><div class="expense-calendar-grid">${weekdays.map(day=>`<span class="expense-calendar-weekday">${day}</span>`).join('')}${days.join('')}</div><div class="expense-picker-footer">${quickActions.map(action=>`<button type="button" class="expense-picker-action" data-period-action data-period-unit="${action.unit}" data-period-offset="${action.offset}">${action.label}</button>`).join('')}</div>`;
    };
    const openPeriodPicker=()=>{
      if(!periodPicker||!['Date','Week','Month'].includes(period.value))return;
      const p=period.value;
      if(p==='Month'){
        const value=$('exPeriodMonth')?.value||dateToday().slice(0,7);
        const match=value.match(/^(\d{4})-(\d{2})$/);
        periodPicker.dataset.year=match?match[1]:String(new Date().getFullYear());
      }else{
        const value=p==='Week'?($('exPeriodWeek')?.value||dateToday()):($('exPeriodDate')?.value||dateToday());
        pickerMonth=parseLocalDate(value);
      }
      renderPeriodPicker();
      periodPicker.hidden=false;
      if(periodDisplay)periodDisplay.setAttribute('aria-expanded','true');
    };
    if(periodDisplay){
      periodDisplay.addEventListener('click',event=>{
        event.preventDefault();
        if(periodPicker?.hidden)openPeriodPicker();else closePeriodPicker();
      });
    }
    if(periodPicker){
      periodPicker.addEventListener('click',event=>{
        // Keep calendar navigation clicks inside the picker; do not trigger the document outside-click closer.
        event.stopPropagation();
        const button=event.target.closest('button');
        if(!button)return;
        if(button.hasAttribute('data-period-action')){
          const unit=button.dataset.periodUnit||'';
          const offset=Number(button.dataset.periodOffset||0);
          if(unit==='day'||unit==='week'){
            const selectedDate=parseLocalDate(dateToday());
            selectedDate.setDate(selectedDate.getDate()+offset*(unit==='week'?7:1));
            const target=unit==='week'?'exPeriodWeek':'exPeriodDate';
            $(target).value=toIsoDate(selectedDate);
            if(unit==='week')pickerMonth=new Date(selectedDate.getFullYear(),selectedDate.getMonth(),1);
          }else if(unit==='month'){
            const selectedMonth=new Date();
            selectedMonth.setDate(1);
            selectedMonth.setMonth(selectedMonth.getMonth()+offset);
            $('exPeriodMonth').value=`${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth()+1).padStart(2,'0')}`;
            periodPicker.dataset.year=String(selectedMonth.getFullYear());
          }
          updatePeriodDisplay();closePeriodPicker();return;
        }
        if(button.hasAttribute('data-picker-close')){closePeriodPicker();return;}
        if(button.hasAttribute('data-calendar-month')){
          pickerMonth.setMonth(pickerMonth.getMonth()+Number(button.dataset.calendarMonth));
          renderPeriodPicker();return;
        }
        if(button.hasAttribute('data-month-year')){
          const year=Number(periodPicker.dataset.year||new Date().getFullYear())+Number(button.dataset.monthYear);
          periodPicker.dataset.year=String(year);
          const current=$('exPeriodMonth')?.value||dateToday().slice(0,7);
          const selected=Number(current.slice(5,7))-1;
          const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          periodPicker.innerHTML=`<div class="expense-picker-header"><button type="button" class="expense-picker-nav" data-month-year="-1" aria-label="Previous year">‹</button><strong>${year}</strong><button type="button" class="expense-picker-nav" data-month-year="1" aria-label="Next year">›</button></div><div class="expense-month-grid">${months.map((name,index)=>`<button type="button" class="expense-month-choice${index===selected?' selected':''}" data-pick-month="${String(index+1).padStart(2,'0')}">${name}</button>`).join('')}</div><div class="expense-picker-footer"><button type="button" class="expense-picker-action" data-period-action data-period-unit="month" data-period-offset="-1">Last Month</button><button type="button" class="expense-picker-action" data-period-action data-period-unit="month" data-period-offset="0">This Month</button><button type="button" class="expense-picker-action" data-period-action data-period-unit="month" data-period-offset="1">Next Month</button></div>`;
          return;
        }
        if(button.hasAttribute('data-pick-date')){
          const target=period.value==='Week'?'exPeriodWeek':'exPeriodDate';
          $(target).value=button.dataset.pickDate;
          updatePeriodDisplay();closePeriodPicker();return;
        }
        if(button.hasAttribute('data-pick-month')){
          const year=periodPicker.dataset.year||String(new Date().getFullYear());
          $('exPeriodMonth').value=`${year}-${button.dataset.pickMonth}`;
          updatePeriodDisplay();closePeriodPicker();return;
        }
      });
      periodPicker.addEventListener('keydown',event=>{
        if(event.key==='Escape'){event.preventDefault();closePeriodPicker();periodDisplay?.focus();}
      });
    }
    // Close the open calendar whenever the user taps/clicks anywhere outside it.
    // Replace the previous page handler so repeated report openings do not stack listeners.
    if(window.expensePeriodOutsideHandler){
      document.removeEventListener('click',window.expensePeriodOutsideHandler);
    }
    window.expensePeriodOutsideHandler=event=>{
      if(!periodPicker||periodPicker.hidden)return;
      const target=event.target;
      if(target&&typeof target.closest==='function'&&target.closest('#expensePeriodValue'))return;
      closePeriodPicker();
    };
    document.addEventListener('click',window.expensePeriodOutsideHandler);
    const yearInput=$('exPeriodYear');
    if(yearInput)yearInput.addEventListener('input',updatePeriodDisplay);
    const syncPeriodPickers=()=>{
      const p=period.value;
      const controls=$('expensePeriodControls');
      if(controls){const hasValue=['Date','Week','Month','Year'].includes(p);controls.classList.toggle('is-full',!hasValue);controls.classList.toggle('has-value',hasValue);}
      const showValue=['Date','Week','Month','Year'].includes(p);
      const valueWrap=$('expensePeriodValue');
      if(valueWrap)valueWrap.hidden=!showValue;
      if(periodContextLabel)periodContextLabel.hidden=!showValue;
      const display=$('exPeriodDisplay');
      if(display)display.hidden=p==='Year';
      const year=$('exPeriodYear');
      if(year)year.hidden=p!=='Year';
      closePeriodPicker();
      updatePeriodDisplay();
    };
    typeSelect.onchange=()=>{syncPeriodOptions();resetPeriodSelectionToCurrent();syncPeriodPickers();toggle();};
    syncPeriodOptions();
    period.onchange=()=>{resetPeriodSelectionToCurrent();syncPeriodPickers();};
    const back=$('expenseReportBack'); if(back) { back.type='button'; const returnToMenu=(event)=>{event.preventDefault();event.stopPropagation();goBack();}; back.onclick=returnToMenu; back.addEventListener('pointerup',returnToMenu,{once:false}); }
    const downloadBtn=$('exDownloadBtn'), downloadMenu=$('exDownloadMenu');
    if(downloadBtn&&downloadMenu){
      installExpenseDownloadMenuDismiss();
      downloadBtn.disabled=true;
      downloadBtn.onclick=()=>{if(!downloadBtn.disabled)downloadMenu.classList.toggle('hidden')};
      downloadMenu.querySelectorAll('[data-export]').forEach(item=>item.onclick=()=>{downloadMenu.classList.add('hidden');exportExpenseReport(item.dataset.export);});
    }
    const syncCategoryFilters=()=>{const c=$('exFilterCategory').value;const vehicle=c==='Vehicle Maintenance';const relatedItems=!c?[]:(vehicle?VEHICLE_TYPES:(CATEGORIES[c]||[]));$('exFilterSub').innerHTML=selectOptions(relatedItems,'All');$('exFilterSub').value='';if(custom){$('exVehicleTypeWrap').classList.toggle('hidden',!vehicle);$('exMtcTypeWrap').classList.toggle('hidden',!vehicle);if(!vehicle){$('exFilterVehicleType').value='';$('exFilterMtcType').value='';}}};
    $('exFilterCategory').onchange=syncCategoryFilters;syncCategoryFilters();
    $('exRunReport').onclick=async()=>{
      let rows=cachedExpenses;
      let access=kind;
      if(!rows.length){$('exRunReport').disabled=true;status('Loading expenses…');try{const fields={reportAccess:access};const res=await request('getExpenses',fields);if(res.status!=='success')throw new Error(res.message||'Unable to load expenses');rows=res.expenses||[];cachedExpenses=rows;if(custom)updateExpenseByOptions(rows)}catch(e){status(e.message,'error');$('exRunReport').disabled=false;return}finally{$('exRunReport').disabled=false}}
      const filtered=filterRows(rows,custom,kind);lastReportRows=filtered.slice();const filters=captureExpenseReportFilters();renderResults(filtered,$('exReportType').value||'Abstract');openExpenseReportPage(kind,custom,filters,filtered,$('exReportType').value||'Abstract');
    };
    $('exReportType').value='Abstract';syncPeriodOptions();period.value='Date';resetPeriodSelectionToCurrent();syncPeriodPickers();toggle();
  }
  function filterRows(rows,custom,kind){
    const p=$('exReportPeriod').value;const type=$('exReportType').value;let from='',to='';const now=new Date();
    if(custom){from=$('exFromDate').value;to=$('exToDate').value}
    if((!custom || (!from && !to)) && p==='Date'){from=to=$('exPeriodDate')?.value||dateToday()}
    else if((!custom || (!from && !to)) && p==='Week'){const reference=$('exPeriodWeek')?.value||dateToday();const d=new Date(reference+'T12:00:00');d.setDate(d.getDate()-((d.getDay()+6)%7));from=fmt(d);const end=new Date(d);end.setDate(end.getDate()+6);to=fmt(end)}
    else if((!custom || (!from && !to)) && p==='Month'){const month=$('exPeriodMonth')?.value||dateToday().slice(0,7);const [y,m]=month.split('-').map(Number);from=month+'-01';to=fmt(new Date(y,m,0))}
    else if((!custom || (!from && !to)) && p==='Year'){const year=Number($('exPeriodYear')?.value)||now.getFullYear();from=year+'-01-01';to=year+'-12-31'}
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
            groups[key].week=`${formatReportDate(fmt(start))}\u00a0to\u00a0${formatReportDate(fmt(finish))}`;
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
        const groupedAmounts=keys.map(key=>Number(groups[key].amount)||0);
        const minGroupedAmount=groupedAmounts.length?Math.min(...groupedAmounts):0;
        const maxGroupedAmount=groupedAmounts.length?Math.max(...groupedAmounts):0;
        const highlightGrouped=groupedAmounts.length>1&&maxGroupedAmount!==minGroupedAmount;
        table=`<div class="expense-results"><table><thead><tr>${headers}</tr></thead><tbody>${keys.map((key,i)=>{const amount=Number(groups[key].amount)||0;const rowClass=highlightGrouped?(amount===maxGroupedAmount?'expense-amount-high-row':amount===minGroupedAmount?'expense-amount-low-row':''):'';return `<tr class="${rowClass}">${cells(key,groups[key],i)}</tr>`;}).join('')||`<tr><td colspan="${colspan}">No records found.</td></tr>`}</tbody></table></div>`;
      } else {
      const selectedCategory=$('exFilterCategory')?.value||'';
      if(selectedCategory){
        const sums={};
        rows.forEach(r=>{const k=r.subCategory || (String(r.mainCategory||'').toLowerCase()==='vehicle maintenance' ? r.vehicleType : '') || 'Other';if(!sums[k])sums[k]={amount:0,count:0};sums[k].amount+=Number(r.amount||0);sums[k].count++});
        const subKeys=Object.keys(sums).sort(),subAmounts=subKeys.map(k=>Number(sums[k].amount)||0),minSubAmount=subAmounts.length?Math.min(...subAmounts):0,maxSubAmount=subAmounts.length?Math.max(...subAmounts):0,highlightSubGroups=subAmounts.length>1&&maxSubAmount!==minSubAmount;
        table=`<div class="expense-abstract-heading">Category: ${esc(selectedCategory)}</div><div class="expense-results"><table><thead><tr><th>Sub-Category</th><th>Records</th><th>Total Amount</th></tr></thead><tbody>${subKeys.map(k=>{const amount=Number(sums[k].amount)||0;const cls=highlightSubGroups?(amount===maxSubAmount?'expense-amount-high-row':amount===minSubAmount?'expense-amount-low-row':''):'';return `<tr class="${cls}"><td>${esc(k)}</td><td>${sums[k].count}</td><td>${money(sums[k].amount)}</td></tr>`;}).join('')||'<tr><td colspan="3">No records found.</td></tr>'}</tbody></table></div>`;
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
        const mainKeys=Object.keys(sums).sort();
        const mainAmounts=mainKeys.map(main=>Number(sums[main].amount)||0);
        const minMainAmount=mainAmounts.length?Math.min(...mainAmounts):0;
        const maxMainAmount=mainAmounts.length?Math.max(...mainAmounts):0;
        const highlightMainGroups=mainAmounts.length>1&&maxMainAmount!==minMainAmount;
        const categoryRows=mainKeys.map(main=>{
          const index=categoryIndex++;
          const group=sums[main];
          const mainAmount=Number(group.amount)||0;
          const mainRowClass=highlightMainGroups?(mainAmount===maxMainAmount?'expense-amount-high-row':mainAmount===minMainAmount?'expense-amount-low-row':''):'';
          const subRows=Object.keys(group.subs).sort().map(sub=>{
            const detail=group.subs[sub];
            return `<tr class="expense-abstract-subrow" data-parent-index="${index}" hidden><td style="padding-left:28px">↳ ${esc(sub)}</td><td>${detail.count}</td><td>${money(detail.amount)}</td></tr>`;
          }).join('');
          return `<tr class="expense-abstract-category-row ${mainRowClass}" data-toggle-index="${index}" tabindex="0" role="button" aria-expanded="false" style="cursor:pointer"><td><span class="expense-abstract-toggle" aria-hidden="true">＋</span> ${esc(main)}</td><td>${group.count}</td><td>${money(group.amount)}</td></tr>${subRows}`;
        }).join('');
        table=`<div class="expense-results"><table class="expense-abstract-category-table"><thead><tr><th>Main Category</th><th>Records</th><th>Total Amount</th></tr></thead><tbody>${categoryRows||'<tr><td colspan="3">No records found.</td></tr>'}</tbody></table></div>`;
      }
      }
    } else {
      const reportPeriod=$('exReportPeriod')?.value||'Detailed';
      const sortedRows=rows.slice().sort((a,b)=>{const diff=String(a.expenseDate||'').slice(0,10).localeCompare(String(b.expenseDate||'').slice(0,10));return dateSortAscending?diff:-diff;});
      const hasVehicle=sortedRows.some(r=>String(r.mainCategory||'').toLowerCase()==='vehicle maintenance');
      const allColumns=[
        {key:'date',label:'Date',center:true,value:r=>formatReportDate(r.expenseDate)},
        {key:'category',label:'Category',value:r=>r.mainCategory||''},
        {key:'subcategory',label:'Sub-Category',value:r=>r.subCategory || (String(r.mainCategory||'').toLowerCase()==='vehicle maintenance' ? r.vehicleType : '') || ''},
        {key:'description',label:'Description',value:r=>r.description||''},
        {key:'maintenanceType',label:'Maintenance Type',value:r=>r.maintenanceType||''},
        {key:'vehicleNumber',label:'Vehicle Number',value:r=>r.vehicleNumber||''},
        {key:'amount',label:'Amount Rs:',center:true,value:r=>money(r.amount),html:true},
        {key:'paymentMode',label:'Payment Type',center:true,value:r=>r.paymentMode||''},
        {key:'sensitive',label:'Sensitive',center:true,value:r=>r.sensitive||'No'},
        {key:'spentBy',label:'Expense by',value:r=>r.spentBy||''},
        {key:'photoCount',label:'No of photos',center:true,value:(r,photos)=>String(photos.length)},
        {key:'photos',label:'Photos',value:(r,photos)=>photos.length?photos.map((url,i)=>`<button type="button" class="expense-photo-preview-btn" data-expense-photo="${esc(url)}" title="View photo ${i+1}" aria-label="View photo ${i+1}" style="display:inline-flex;flex:0 0 28px;width:28px;height:28px;align-items:center;justify-content:center;padding:0;border:0;background:transparent;cursor:pointer"><img src="${esc(url)}" alt="Photo ${i+1}" loading="lazy" style="display:block;width:26px;height:26px;object-fit:cover;border:1px solid #c4d4ff;border-radius:4px" onerror="this.style.display='none';this.parentElement.textContent='Open'"></button>`).join(''):'—',html:true},
        {key:'edit',label:'Edit',center:true,value:(r,photos,rowIndex)=>`<button type="button" class="expense-edit-text" data-expense-edit="${esc(r.expenseId||'')}" data-expense-row-index="${rowIndex}" aria-label="Edit expense">Edit</button>`,html:true}
      ];
      const limitedKeys=['date','category','subcategory','amount','paymentMode','sensitive','description','edit'];
      const selectedMode=$('exShowColumns')?.value||'limited';
      const visibleColumns=selectedMode==='all'?allColumns:allColumns.filter(c=>limitedKeys.includes(c.key));
      const headers=[`<th class="expense-center-cell">S.No</th>`,...visibleColumns.map(c=>`<th class="expense-col-${c.key} ${c.center?'expense-center-cell ':''}${c.key==='edit'?'expense-edit-cell':''}">${c.label}</th>`)];
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
      if(['Date','Week','Month','Year'].includes(reportPeriod)){
        const selectedDate=$('exPeriodDate')?.value||dateToday();
        const selectedWeek=$('exPeriodWeek')?.value||dateToday();
        const selectedMonth=$('exPeriodMonth')?.value||dateToday().slice(0,7);
        const selectedYear=String($('exPeriodYear')?.value||new Date().getFullYear());
        let selectedLabel='';
        let headingClass='expense-report-month';
        if(reportPeriod==='Date') selectedLabel=`Date : ${formatReportDate(selectedDate)}`;
        else if(reportPeriod==='Week'){
          const d=new Date(selectedWeek+'T12:00:00');d.setDate(d.getDate()-((d.getDay()+6)%7));
          const e=new Date(d);e.setDate(e.getDate()+6);
          selectedLabel=`Week : ${formatReportDate(fmt(d))} to ${formatReportDate(fmt(e))}`;
        }else if(reportPeriod==='Month'){
          const [y,m]=selectedMonth.split('-').map(Number);
          selectedLabel=`Month : ${new Date(y,m-1,1).toLocaleString('en-US',{month:'long',year:'numeric'})}`;
        }else{
          selectedLabel=`Year : ${selectedYear}`;
          headingClass='expense-report-year';
        }
        groupedRows+=`<tr class="expense-report-subheading ${headingClass}"><th colspan="${colCount}">${esc(selectedLabel)}</th></tr>`;
      }
      const monthName=ds=>ds?new Date(ds+'T12:00:00').toLocaleString('en-US',{month:'long'}):'Unknown';
      const amountIndex=visibleColumns.findIndex(c=>c.key==='amount')+1;
      const reportAmounts=sortedRows.map(r=>Number(r.amount)||0);
      const minReportAmount=reportAmounts.length?Math.min(...reportAmounts):0;
      const maxReportAmount=reportAmounts.length?Math.max(...reportAmounts):0;
      const highlightAmountRows=reportAmounts.length>1&&maxReportAmount!==minReportAmount;
      const amountRowClass=r=>{if(!highlightAmountRows)return '';const amount=Number(r.amount)||0;return amount===maxReportAmount?'expense-amount-high-row':amount===minReportAmount?'expense-amount-low-row':'';};
      const addMonthTotal=()=>{if(currentMonth)groupedRows+=`<tr class="expense-report-total"><td colspan="${Math.max(1,amountIndex)}">${esc(currentMonth)} Total (${monthCount} records)</td><td>${money(monthTotal)}</td><td colspan="${Math.max(0,colCount-amountIndex-1)}"></td></tr>`;};
      const addYearTotal=()=>{if(currentYear)groupedRows+=`<tr class="expense-report-total"><td colspan="${Math.max(1,amountIndex)}">${esc(currentYear)} Total (${yearCount} records)</td><td>${money(yearTotal)}</td><td colspan="${Math.max(0,colCount-amountIndex-1)}"></td></tr>`;};
      sortedRows.forEach((r,rowIndex)=>{
        const ds=String(r.expenseDate||'').slice(0,10);
        const yr=ds.slice(0,4)||'Unknown';
        const mon=monthName(ds);
        const wantsYearMonthGrouping=['This Year','All','Monthly','Yearly'].includes(reportPeriod);
        if(reportPeriod==='Today' && ds && ds!==currentDay){currentDay=ds;groupedRows+=`<tr class="expense-report-subheading expense-report-month"><th colspan="${colCount}">${esc(formatReportDate(ds))}</th></tr>`;}
        else if(reportPeriod==='This Week' && ds){const d=new Date(ds+'T12:00:00');d.setDate(d.getDate()-((d.getDay()+6)%7));const end=new Date(d);end.setDate(end.getDate()+6);const weekLabel=`${formatReportDate(fmt(d))}\u00a0to\u00a0${formatReportDate(fmt(end))}`;if(weekLabel!==currentMonth){currentMonth=weekLabel;groupedRows+=`<tr class="expense-report-subheading expense-report-month"><th colspan="${colCount}">${esc(weekLabel)}</th></tr>`;}}
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
        const cells=[`<td class="expense-center-cell">${rowIndex+1}</td>`,...visibleColumns.map(col=>{
          const value=col.value(r,photos,rowIndex);
          return `<td class="expense-col-${col.key} ${col.center?'expense-center-cell ':''}${col.key==='edit'?'expense-edit-cell':''}">${col.html?value:esc(value)}</td>`;
        })];
        groupedRows+=`<tr class="${amountRowClass(r)}">${cells.join('')}</tr>`;
        if(['This Year','All','Monthly','Yearly'].includes(reportPeriod)){const amount=Number(r.amount)||0;monthTotal+=amount;monthCount++;yearTotal+=amount;yearCount++;}
      });
      if(['This Year','All','Monthly','Yearly'].includes(reportPeriod)){addMonthTotal();addYearTotal();}
      if(!sortedRows.length && ['Today','This Week','This Month','This Year'].includes(reportPeriod)){
        const now=new Date();
        let emptyHeading='',emptyHeadingClass='expense-report-month';
        if(reportPeriod==='Today'){
          emptyHeading=formatReportDate(dateToday());
          emptyHeadingClass='expense-report-date';
        }else if(reportPeriod==='This Week'){
          const start=new Date();start.setDate(start.getDate()-((start.getDay()+6)%7));
          const end=new Date(start);end.setDate(end.getDate()+6);
          emptyHeading=`${formatReportDate(fmt(start))}\u00a0to\u00a0${formatReportDate(fmt(end))}`;
        }else if(reportPeriod==='This Month'){
          emptyHeading=now.toLocaleString('en-US',{month:'long',year:'numeric'});
        }else{
          emptyHeading=String(now.getFullYear());
          emptyHeadingClass='expense-report-year';
        }
        groupedRows+=`<tr class="expense-report-subheading ${emptyHeadingClass}"><th colspan="${colCount}">${esc(emptyHeading)}</th></tr><tr><td colspan="${colCount}">No records found.</td></tr>`;
      }
      table=`<div class="expense-results"><table><thead><tr>${headers.join('')}</tr></thead><tbody>${groupedRows||`<tr><td colspan="${colCount}">No records found.</td></tr>`}</tbody></table></div>`;
    }
    const reportPeriodTitle=$('exReportPeriod')?.value||'';
    const reportHeading=`${esc(reportPeriodTitle||'All')} - ${type==='Detailed'?'Detailed Report':'Abstract'}`;
    let abstractPeriodHeading='';
    if(type==='Abstract'){
      const today=dateToday();
      const selectedDate=$('exPeriodDate')?.value||today;
      const selectedWeek=$('exPeriodWeek')?.value||today;
      const selectedMonth=$('exPeriodMonth')?.value||today.slice(0,7);
      const selectedYear=String($('exPeriodYear')?.value||new Date().getFullYear());
      const weekStart=value=>{const d=new Date(value+'T12:00:00');d.setDate(d.getDate()-((d.getDay()+6)%7));return d;};
      if(reportPeriodTitle==='Date') abstractPeriodHeading=`Date : ${formatReportDate(selectedDate)}`;
      else if(reportPeriodTitle==='Week'){const d=weekStart(selectedWeek);const e=new Date(d);e.setDate(e.getDate()+6);abstractPeriodHeading=`Week : ${formatReportDate(fmt(d))} to ${formatReportDate(fmt(e))}`;}
      else if(reportPeriodTitle==='Month'){const [y,m]=selectedMonth.split('-').map(Number);abstractPeriodHeading=`Month : ${new Date(y,m-1,1).toLocaleString('en-US',{month:'long',year:'numeric'})}`;}
      else if(reportPeriodTitle==='Year') abstractPeriodHeading=`Year : ${selectedYear}`;
      else if(reportPeriodTitle==='Today') abstractPeriodHeading=`Date : ${formatReportDate(today)}`;
      else if(reportPeriodTitle==='This Week'){const d=weekStart(today);const e=new Date(d);e.setDate(e.getDate()+6);abstractPeriodHeading=`Week : ${formatReportDate(fmt(d))} to ${formatReportDate(fmt(e))}`;}
      else if(reportPeriodTitle==='This Month'){const d=new Date();abstractPeriodHeading=`Month : ${d.toLocaleString('en-US',{month:'long',year:'numeric'})}`;}
      else if(reportPeriodTitle==='This Year') abstractPeriodHeading=`Year : ${new Date().getFullYear()}`;
      else if(reportPeriodTitle==='Daily') abstractPeriodHeading='Daily Records';
      else if(reportPeriodTitle==='Weekly') abstractPeriodHeading='Weekly Records';
      else if(reportPeriodTitle==='Monthly') abstractPeriodHeading='Monthly Records';
      else if(reportPeriodTitle==='Yearly') abstractPeriodHeading='Yearly Records';
      else if(reportPeriodTitle==='All') abstractPeriodHeading='All Records';
    }
    const abstractHeadingHtml=abstractPeriodHeading?`<div class="expense-abstract-heading">${esc(abstractPeriodHeading)}</div>`:'';
    $('exReportOutput').innerHTML=`<style>.expense-results{height:55vh!important;max-height:55vh!important;overflow:auto!important;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}.expense-results table{width:max-content;min-width:100%;border-collapse:collapse}.expense-results table th,.expense-results table td{vertical-align:middle!important}.expense-results table thead th{height:50px!important;min-height:50px!important;padding:5px 5px!important;box-sizing:border-box;text-align:center;line-height:1.1;white-space:normal;overflow-wrap:normal;word-break:normal}.expense-results table .expense-report-subheading.expense-report-month th{height:32px!important;min-height:32px!important;padding:3px 8px!important;font-size:14px!important;line-height:1.05!important}.expense-results table .expense-report-subheading.expense-report-year th{height:34px!important;min-height:34px!important;padding:3px 8px!important;font-size:17px!important;line-height:1.05!important;background:#e7eaf0!important;background-color:#e7eaf0!important;border-color:#c7ceda!important;color:#37624a!important}.expense-results table tr.expense-amount-high-row>td{background:#fff0df!important}.expense-results table tr.expense-amount-low-row>td{background:#e8f5e9!important}.expense-abstract-title{font-size:24px;text-align:center;color:#3477b7;margin:10px 0 8px;font-weight:700}.expense-abstract-heading{font-size:18px;font-weight:700;color:#e67e22;margin:8px 0;padding:8px;border-bottom:1px solid #c4d4ff}.expense-report-subheading th{color:#e67e22!important}.expense-report-subheading.expense-report-year th{color:#2e8b57!important}.expense-report-subheading.expense-report-month th{font-size:14px!important}.expense-abstract-category-row:focus{outline:2px solid #4a9fe8;outline-offset:-2px}.expense-abstract-subrow[hidden]{display:none!important}.expense-abstract-subrow td{background:#f4f9ff!important;color:#2d5274}.expense-abstract-toggle{display:inline-block;width:16px;font-weight:700;color:#2477c8}.expense-results table th,.expense-results table td{vertical-align:middle!important}.expense-results table th.expense-center-cell,.expense-results table td.expense-center-cell{text-align:center!important;vertical-align:middle!important;width:1%;min-width:58px;max-width:110px;padding:6px 4px;white-space:normal;overflow-wrap:anywhere}</style><div class="expense-summary"><div class="expense-summary-card"><small>Total Records :</small><strong>${counts}</strong></div><div class="expense-summary-card"><small>Total Expense :</small><strong>${money(total)}</strong></div></div>${abstractHeadingHtml}${table}`;
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
    // Report interactions are rebound by openExpenseReportPage() after its page swap.
  }

  function captureExpenseReportFilters(){
    const ids=['exReportType','exReportPeriod','exPeriodDate','exPeriodWeek','exPeriodMonth','exPeriodYear','exFilterCategory','exFilterSub','exMinAmount','exMaxAmount','exFilterPayment','exFilterSpentBy','exSearchText','exFromDate','exToDate','exFilterVehicleType','exFilterMtcType','exShowColumns'];
    const values={};ids.forEach(id=>{const el=$(id);if(el)values[id]=el.tagName==='BUTTON'?{text:el.textContent,ascending:dateSortAscending}:el.value;});
    return values;
  }
  function restoreExpenseReportFilters(values){
    if(!values)return;
    Object.entries(values).forEach(([id,value])=>{const el=$(id);if(!el)return;if(id==='exDateSortBtn'){dateSortAscending=!!value.ascending;el.textContent=value.text;el.setAttribute('aria-label',dateSortAscending?'Sort date ascending':'Sort date descending');el.title=dateSortAscending?'Sort date ascending':'Sort date descending';}else el.value=value;});
    $('exFilterCategory')?.dispatchEvent(new Event('change'));
    if(values.exFilterSub!==undefined&&$('exFilterSub'))$('exFilterSub').value=values.exFilterSub;
    $('exReportType')?.dispatchEvent(new Event('change'));
    if(values.exReportPeriod!==undefined&&$('exReportPeriod'))$('exReportPeriod').value=values.exReportPeriod;
    ['exPeriodDate','exPeriodWeek','exPeriodMonth','exPeriodYear'].forEach(id=>{if(values[id]!==undefined&&$(id))$(id).value=values[id]});
    if($('exShowColumnsWrap')){const detailed=$('exReportType')?.value==='Detailed';$('exShowColumnsWrap').classList.toggle('hidden',!detailed);$('exShowColumnsWrap').style.setProperty('display',detailed?'flex':'none','important');}
  }
 
function expenseReportPageTitle(kind,custom,type,period='All',filters=null){

  const mode=type==='Detailed'?'Detailed':'Abstract';

  const readValue=(id,fallback)=>
    (filters && filters[id]) ||
    $(id)?.value ||
    fallback;

  const current=dateToday();

  // DD-MM-YYYY
  const fullDate=value=>{
    const m=String(value||'').match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return m ? `${m[3]}-${m[2]}-${m[1]}` : value;
  };

  const shiftDate=(value,days)=>{
    const d=new Date(value+'T12:00:00');
    d.setDate(d.getDate()+days);
    return fmt(d);
  };

  let suffix='';

  // DATE
  if(period==='Date'){

    const selected=readValue('exPeriodDate',current);

    if(selected===current)
      suffix='- Today';

    else if(selected===shiftDate(current,-1))
      suffix='- Yesterday';

    else if(selected===shiftDate(current,1))
      suffix='- Tomorrow';

    else
      suffix=`on ${fullDate(selected)}`;
  }

  // WEEK
  else if(period==='Week'){

    const selected=readValue('exPeriodWeek',current);

    const weekStart=value=>{
      const d=new Date(value+'T12:00:00');
      d.setDate(d.getDate()-((d.getDay()+6)%7));
      return fmt(d);
    };

    const selectedWeek=weekStart(selected);
    const currentWeek=weekStart(current);

    if(selectedWeek===currentWeek)
      suffix='- This Week';

    else if(selectedWeek===shiftDate(currentWeek,-7))
      suffix='- Last Week';

    else if(selectedWeek===shiftDate(currentWeek,7))
      suffix='- Next Week';

    else{

      const d=new Date(selected+'T12:00:00');

      const utc=new Date(Date.UTC(
        d.getFullYear(),d.getMonth(),d.getDate()
      ));

      utc.setUTCDate(
        utc.getUTCDate()+3-((utc.getUTCDay()+6)%7)
      );

      const year=utc.getUTCFullYear();

      const jan4=new Date(Date.UTC(year,0,4));

      const firstThursday=new Date(jan4);

      firstThursday.setUTCDate(
        firstThursday.getUTCDate()+3-((firstThursday.getUTCDay()+6)%7)
      );

      const week=1+Math.round(
        (utc-firstThursday)/604800000
      );

      const ordinal=
        week%10===1&&week%100!==11?'st':
        week%10===2&&week%100!==12?'nd':
        week%10===3&&week%100!==13?'rd':'th';

      suffix=`on ${week}${ordinal} Week of ${year}`;
    }
  }

  // MONTH
  else if(period==='Month'){

    const selected=readValue(
      'exPeriodMonth',
      current.slice(0,7)
    );

    const match=String(selected).match(
      /^(\d{4})-(0[1-9]|1[0-2])$/
    );

    if(match){

      const selectedIndex=
        Number(match[1])*12+Number(match[2])-1;

      const now=new Date();

      const currentIndex=
        now.getFullYear()*12+now.getMonth();

      if(selectedIndex===currentIndex)
        suffix='- This Month';

      else if(selectedIndex===currentIndex-1)
        suffix='- Last Month';

      else if(selectedIndex===currentIndex+1)
        suffix='- Next Month';

      else{
        const monthName=new Date(
          Number(match[1]),
          Number(match[2])-1,
          1
        ).toLocaleString('en-US',{month:'short'});

        suffix=`on ${monthName} ${match[1]}`;
      }
    }
  }

  // YEAR
  else if(period==='Year'){

    const year=String(readValue(
      'exPeriodYear',
      String(new Date().getFullYear())
    ));
    const currentYear=new Date().getFullYear();
    const selectedYear=Number(year);

    if(selectedYear===currentYear)
      suffix='- This year';
    else if(selectedYear===currentYear-1)
      suffix='- Last year';
    else if(selectedYear===currentYear+1)
      suffix='- Next year';
    else
      suffix=`on ${year}`;
  }

  // ALL / OTHER PERIODS
  else if(period==='All'){

    suffix=mode==='Abstract' ? '- All' : '- All Records';
  }

  else{
    suffix=`- ${String(period||'All')}`;
  }

  // REPORT NAME
  let baseTitle='Expenses';

  if(kind==='sensitive')
    baseTitle='Sensitive Expenses';

  else if(kind==='all')
    baseTitle='All Expenses';

  else if(custom)
    baseTitle='Expenses Custom Search';

  return `${baseTitle} ${mode} ${suffix}`;
}

  function openExpenseReportPage(kind,custom,filters,rows,type){
    const output=$('exReportOutput');
    const reportHtml=output?output.innerHTML:'';
    const selectedPeriod=filters?.exReportPeriod||$('exReportPeriod')?.value||'All';
    const titleText=expenseReportPageTitle(kind,custom,type,selectedPeriod);
    lastExpenseReportContext={kind,custom,filters,rows:rows.slice(),type};
    showPage(`<style>
      .expense-page.expense-report-view{max-width:1100px;margin:0 auto}
      .expense-page.expense-report-view>.expense-title{margin-top:-70px!important;margin-bottom:12px!important;padding-top:0!important}
      .expense-page .expense-report-panel{padding:12px;background:#f0f7ff;border:1px solid #c4d4ff;border-radius:14px;box-sizing:border-box}
      .expense-page .expense-report-panel .expense-download-wrap{position:relative;min-width:0}
      .expense-page .expense-report-panel .expense-download-menu{position:absolute;right:0;top:100%;z-index:9999;display:flex;flex-direction:column;min-width:100px;background:#fff;border:1px solid #9ab;border-radius:8px;box-shadow:0 4px 12px #0002}
      .expense-page .expense-report-panel .expense-download-menu.hidden{display:none!important}
      .expense-page .expense-report-panel .expense-download-menu button{background:#fff;border:0;padding:9px 14px;text-align:left;color:#222}
      .expense-page .expense-report-panel .expense-summary{display:flex!important;flex-wrap:nowrap!important;gap:8px!important;width:100%;margin:2px 0 9px!important;box-sizing:border-box}
      .expense-page .expense-report-panel .expense-summary-card{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:center!important;min-width:0!important;white-space:nowrap!important;box-sizing:border-box!important;padding:5px 4px!important;gap:3px!important;min-height:46px!important;height:auto!important;line-height:1.1!important}
      .expense-page .expense-report-panel .expense-summary-card:first-child{flex:35 1 0!important;width:auto!important}
      .expense-page .expense-report-panel .expense-summary-card:nth-child(2){flex:65 1 0!important;width:auto!important}
      .expense-page .expense-report-panel .expense-summary-card small,.expense-page .expense-report-panel .expense-summary-card strong{display:inline!important;white-space:nowrap!important;line-height:1.1!important;margin:0!important}
      .expense-page .expense-report-panel .expense-summary-card small{font-size:clamp(8px,2.35vw,11px)!important}
      .expense-page .expense-report-panel .expense-summary-card strong{font-size:clamp(9px,2.65vw,13px)!important}
      .expense-page .expense-report-panel .expense-results{width:100%!important;max-width:100%!important;height:55vh!important;max-height:55vh!important;overflow:auto!important;overscroll-behavior:contain!important;-webkit-overflow-scrolling:touch!important;margin-top:8px!important}
      .expense-page .expense-report-panel .expense-results table{width:max-content!important;min-width:100%!important;border-collapse:collapse!important}
      /* Detailed Expenses: keep the column-heading row fixed while the report rows scroll. */
      .expense-page.expense-report-detailed .expense-report-panel .expense-results table thead th{position:sticky!important;top:0!important;z-index:30!important;background:#dce7ff!important}
      .expense-page .expense-report-panel .expense-results table thead th{height:50px!important;min-height:50px!important;padding:5px 5px!important;line-height:1.1!important;vertical-align:middle!important}
      .expense-page.expense-report-abstract .expense-report-panel .expense-results{height:40vh!important;max-height:40vh!important;margin-top:4px!important}
      .expense-page.expense-report-abstract .expense-report-panel .expense-results table thead th{height:36px!important;min-height:36px!important;padding:3px 5px!important;line-height:1.05!important}
      .expense-page.expense-report-abstract .expense-report-panel .expense-summary{margin:0 0 6px!important;gap:5px!important}
      .expense-page.expense-report-abstract .expense-report-panel .expense-summary-card{min-height:34px!important;height:34px!important;padding:3px 4px!important}
      /* Detailed Expenses: slightly wider Date, slightly narrower Category and Sub-Category. */
      .expense-page.expense-report-detailed .expense-report-panel .expense-results th.expense-col-date,
      .expense-page.expense-report-detailed .expense-report-panel .expense-results td.expense-col-date{width:86px!important;min-width:86px!important;max-width:92px!important;padding-left:5px!important;padding-right:5px!important;text-align:center!important;white-space:nowrap!important}
      .expense-page.expense-report-detailed .expense-report-panel .expense-results th.expense-col-category,
      .expense-page.expense-report-detailed .expense-report-panel .expense-results td.expense-col-category{width:112px!important;min-width:105px!important;max-width:118px!important}
      .expense-page.expense-report-detailed .expense-report-panel .expense-results th.expense-col-subcategory,
      .expense-page.expense-report-detailed .expense-report-panel .expense-results td.expense-col-subcategory{width:120px!important;min-width:112px!important;max-width:126px!important}
      .expense-page .expense-report-panel .expense-edit-cell{width:48px!important;min-width:48px!important;max-width:48px!important;padding:4px 2px!important;text-align:center!important;vertical-align:middle!important;white-space:nowrap!important}
      .expense-page .expense-report-panel .expense-edit-text{display:inline-block!important;width:100%!important;min-width:0!important;padding:2px 0!important;margin:0!important;border:0!important;border-radius:0!important;background:transparent!important;color:#2477c8!important;box-shadow:none!important;font:inherit!important;font-weight:600!important;text-align:center!important;text-decoration:none!important;white-space:nowrap!important;cursor:pointer!important}
      .expense-page .expense-report-panel .expense-results table .expense-report-subheading.expense-report-month th{height:32px!important;min-height:32px!important;padding:3px 8px!important;line-height:1.05!important;font-size:14px!important;vertical-align:middle!important}
      .expense-page .expense-report-panel .expense-results table .expense-report-subheading.expense-report-year th{height:34px!important;min-height:34px!important;padding:3px 8px!important;line-height:1.05!important;font-size:17px!important;vertical-align:middle!important;background:#e7eaf0!important;background-color:#e7eaf0!important;border-color:#c7ceda!important;color:#37624a!important}
      .expense-page .expense-report-panel .expense-results table tr.expense-amount-high-row>td{background:#fff0df!important}
      .expense-page .expense-report-panel .expense-results table tr.expense-amount-low-row>td{background:#e8f5e9!important}
      .expense-page .expense-report-panel .expense-report-actions{display:flex!important;align-items:stretch!important;justify-content:space-between!important;gap:8px!important;flex-wrap:nowrap!important;width:100%!important;margin:12px 0 0!important;box-sizing:border-box!important}
      .expense-page .expense-report-panel .expense-report-actions>.expense-download-wrap,.expense-page .expense-report-panel .expense-report-actions>button{flex:1 1 0!important;width:0!important;min-width:0!important;max-width:none!important;box-sizing:border-box!important}
      .expense-page .expense-report-panel .expense-report-actions>.expense-download-wrap>button{display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;min-width:0!important;box-sizing:border-box!important}
      .expense-page .expense-report-panel #exDownloadBtn,.expense-page .expense-report-panel #expenseReportDateSort,.expense-page .expense-report-panel #expenseReportBack{display:flex!important;align-items:center!important;justify-content:center!important;background:transparent!important;background-color:transparent!important;color:#2477c8!important;border:1.5px solid #2477c8!important;border-radius:8px!important;box-shadow:none!important;min-height:42px!important;padding:8px 4px!important;font-size:clamp(11px,3vw,14px)!important;white-space:nowrap!important;box-sizing:border-box!important}
      .expense-page .expense-report-panel #expenseReportDateSort{width:100%!important;min-width:0!important;flex:1 1 0!important;border-radius:8px!important}
       .expense-page.expense-report-abstract .expense-report-panel #expenseReportDateSort{display:none!important}
    </style>
    <div class="expense-page expense-report-view ${type==='Abstract'?'expense-report-abstract':'expense-report-detailed'}"><h2 class="expense-title" id="expenseReportTitle">${esc(titleText)}</h2>
      <div class="expense-panel expense-report-panel"><div id="exReportOutput">${reportHtml}</div>
        <div class="expense-actions expense-report-actions">
          <div class="expense-download-wrap"><button type="button" id="exDownloadBtn" class="expense-secondary">Download ▾</button><div id="exDownloadMenu" class="expense-download-menu hidden"><button type="button" data-export="pdf">PDF</button><button type="button" data-export="word">Word</button><button type="button" data-export="excel">Excel</button></div></div>
          <button type="button" id="expenseReportDateSort" class="expense-date-sort">${dateSortAscending?'↑ Date Ascending':'↓ Date Descending'}</button>
          <button type="button" id="expenseReportBack" class="expense-secondary">← Back</button>
        </div>
      </div>
    </div>`);
    // Bind directly to the visible report rows after the page swap. This avoids
    // losing handlers when the report HTML is copied into its final display page.
    const visibleReportOutput=$('exReportOutput');
    if(visibleReportOutput){
      // A tap/click on a highlighted row explains whether it is the minimum
      // or maximum expense/group. The row's normal action (such as expand) remains intact.
      visibleReportOutput.querySelectorAll('tr.expense-amount-high-row, tr.expense-amount-low-row').forEach(row=>{
        row.addEventListener('click',()=>{
          const isMaximum=row.classList.contains('expense-amount-high-row');
          showExpenseHighlightToast(isMaximum?'Maximum expenses':'Minimum expenses',isMaximum?'high':'low',row);
        });
      });
      visibleReportOutput.querySelectorAll('.expense-abstract-category-row').forEach(row=>{
        const toggle=()=>{
          const index=row.getAttribute('data-toggle-index');
          const opening=row.getAttribute('aria-expanded')!=='true';
          visibleReportOutput.querySelectorAll(`.expense-abstract-subrow[data-parent-index="${index}"]`).forEach(subRow=>{
            subRow.hidden=!opening;
            subRow.style.display=opening?'table-row':'none';
          });
          row.setAttribute('aria-expanded',String(opening));
          const mark=row.querySelector('.expense-abstract-toggle');
          if(mark)mark.textContent=opening?'－':'＋';
        };
        row.style.cursor='pointer';
        row.addEventListener('click',event=>{event.preventDefault();toggle();});
        row.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();toggle();}});
      });
      const sortedForEdit=(rows||[]).slice().sort((a,b)=>{
        const diff=String(a.expenseDate||'').slice(0,10).localeCompare(String(b.expenseDate||'').slice(0,10));
        return dateSortAscending?diff:-diff;
      });
      visibleReportOutput.querySelectorAll('[data-expense-edit]').forEach(editBtn=>{
        editBtn.addEventListener('click',event=>{
          event.preventDefault();event.stopPropagation();
          const id=String(editBtn.getAttribute('data-expense-edit')||'').trim();
          const index=Number(editBtn.getAttribute('data-expense-row-index'));
          const record=(rows||[]).find(item=>String(item.expenseId||'').trim()===id&&id) ||
            (cachedExpenses||[]).find(item=>String(item.expenseId||'').trim()===id&&id) ||
            (Number.isInteger(index)&&index>=0?sortedForEdit[index]:null);
          if(record){renderForm(record);return;}
          let notice=document.getElementById('expenseEditNotice');
          if(!notice){notice=document.createElement('div');notice.id='expenseEditNotice';notice.style.cssText='position:fixed;top:18px;left:50%;transform:translateX(-50%);z-index:2147483647;background:#b42318;color:#fff;padding:10px 16px;border-radius:8px;max-width:90vw';document.body.appendChild(notice);}
          notice.textContent='Expense record could not be identified. Please refresh the report and try again.';
          setTimeout(()=>{if(notice)notice.remove();},3500);
        });
      });
    }

    const downloadBtn=$('exDownloadBtn'),menu=$('exDownloadMenu');
    if(downloadBtn&&menu){installExpenseDownloadMenuDismiss();downloadBtn.onclick=()=>menu.classList.toggle('hidden');menu.querySelectorAll('[data-export]').forEach(b=>b.onclick=()=>{menu.classList.add('hidden');exportExpenseReport(b.dataset.export)});}
    const reportSort=$('expenseReportDateSort');
    if(reportSort)reportSort.onclick=()=>{
      dateSortAscending=!dateSortAscending;
      const ctx=lastExpenseReportContext||{kind,custom,filters,rows,type};
      const temp=document.createElement('div');temp.style.display='none';
      temp.innerHTML=`<select id="exReportPeriod"><option>${esc(ctx.filters?.exReportPeriod||'All')}</option></select><select id="exShowColumns"><option value="all">All</option><option value="limited">Limited</option></select>`;
      document.body.appendChild(temp);
      const mode=temp.querySelector('#exShowColumns');if(mode)mode.value=ctx.filters?.exShowColumns||'limited';
      renderResults(ctx.rows||rows,ctx.type||type);temp.remove();
      openExpenseReportPage(ctx.kind||kind,ctx.custom||custom,ctx.filters||filters,ctx.rows||rows,ctx.type||type);
    };
    $('exReportOutput')?.querySelectorAll('.expense-photo-preview-btn').forEach(photoBtn=>photoBtn.addEventListener('click',()=>{
      const rawUrl=photoBtn.getAttribute('data-expense-photo')||'';
      const match=rawUrl.match(/[?&]id=([^&]+)/i)||rawUrl.match(/\/d\/([^/?]+)/i);
      const displayUrl=/drive\.google\.com/i.test(rawUrl)&&match?`https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`:rawUrl;
      let modal=document.getElementById('expensePhotoPreviewModal');
      if(!modal){modal=document.createElement('div');modal.id='expensePhotoPreviewModal';modal.style.cssText='position:fixed;inset:0;z-index:1000000;background:rgba(0,0,0,.82);display:flex;align-items:center;justify-content:center;padding:18px;box-sizing:border-box;';modal.innerHTML='<button type="button" aria-label="Close photo preview" style="position:absolute;top:12px;right:16px;width:42px;height:42px;border:0;border-radius:50%;background:#fff;color:#222;font-size:30px;line-height:1;cursor:pointer;z-index:1">×</button><img alt="Expense photo preview" style="display:block;max-width:100%;max-height:88vh;object-fit:contain;border-radius:6px;box-shadow:0 4px 20px #0008">';document.body.appendChild(modal);const close=()=>modal.style.display='none';modal.querySelector('button').addEventListener('click',close);modal.addEventListener('click',ev=>{if(ev.target===modal)close()});}
      modal.querySelector('img').src=displayUrl;modal.style.display='flex';
    }));
    $('expenseReportBack').onclick=()=>{
      const ctx=lastExpenseReportContext;
      renderReports(ctx?.kind||kind,cachedExpenses,ctx?.custom||custom);
      restoreExpenseReportFilters(ctx?.filters||filters);
      if(ctx?.rows)lastReportRows=ctx.rows.slice();
    };
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

  function renderReports(kind='normal',prefetched=null,custom=false){
    activeReport=kind;if(prefetched)cachedExpenses=prefetched;const title=kind==='sensitive'?'Sensitive Expenses - Report':kind==='all'?'All Expenses - Report':custom?'Expenses — Custom Search':'Expenses - Report';
    showPage(shell(title,reportControls(!!custom),true));const reportTitle=document.querySelector('.expense-title');if(reportTitle)reportTitle.id='expenseReportTitle';setupReportControls(!!custom,kind);
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
