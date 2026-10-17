/* oneFaMiLe Expense module. Loaded after app.js; overrides only Expenses navigation. */
(function(){
  'use strict';
  const API = "https://script.google.com/macros/s/AKfycbzYblwgxrGFDF2MKhiWLvrlSLdJTIgQoplD0Z2-A_tLmwrdUPWsTqzOF9-txnug4DFLpg/exec";
  const CATEGORIES = {
    "Food & Groceries":["Vegetables","Rice & Groceries","Milk & Dairy","Fruits","Meat & Fish","Hotel & Tiffin","Other Food"],
    "House & Utilities":["Electricity","Water","Gas Cylinder","Rent","Internet & Phone","House Repairs","Cleaning","Other House Expense"],
    "Medical & Health":["Doctor","Medicines","Medical Tests","Hospital","Dental","Health Insurance","Other Medical"],
    "Vehicle Maintenance":["Vehicle Maintenance"],
    "Transport & Travel":["Petrol","Diesel","Bus","Train","Auto / Taxi","Parking & Tolls","Tour & Travel","Other Transport"],
    "Education":["School Fees","College Fees","Books & Stationery","Uniform","Tuition","Exam Fees","Other Education"],
    "Personal & Shopping":["Clothes","Footwear","Haircut","Cosmetics & Personal Care","Accessories","Other Shopping"],
    "Family & Functions":["Marriage","Birthday","Festivals","Gifts","Family Functions","Donations","Other Family Expense"],
    "Loans & Financial":["Loan Interest","Bank Charges","Late Fees","Financial Charges","Other Financial"],
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
  function status(message,type=''){const el=$('expenseStatus');if(el){el.className='expense-status '+type;el.textContent=message||'';}}
  function field(label, control, id){return `<div class="expense-field"><label class="expense-label" for="${id||''}"><span class="expense-label-text">${label}</span><span class="expense-colon">:</span></label>${control}</div>`}
  function selectOptions(items,placeholder='Select') {return `<option value="">${placeholder}</option>`+items.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}
  function shell(title,inner){return `<div class="expense-page"><h2 class="expense-title">${esc(title)}</h2>${inner}<div class="expense-actions"><button type="button" class="expense-secondary" id="expenseModuleBack">← Back</button></div></div>`}
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
      ${field('Sub Category',`<select id="exSubCategory" name="subCategory" required>${selectOptions([],'Select Subcategory')}</select>`,'exSubCategory')}
      <div id="exVehicleFields" class="hidden">
       ${field('Vehicle Type',`<select id="exVehicleType" name="vehicleType">${selectOptions(VEHICLE_TYPES,'Select Vehicle')}</select>`,'exVehicleType')}
       ${field('Maintenance Type',`<select id="exMaintenanceType" name="maintenanceType">${selectOptions(MAINTENANCE_TYPES,'Select Maintenance')}</select>`,'exMaintenanceType')}
       ${field('Vehicle Number',`<input id="exVehicleNumber" name="vehicleNumber" maxlength="30" placeholder="Optional vehicle number">`,'exVehicleNumber')}
      </div>
      ${field('Amount',`<input id="exAmount" name="amount" type="number" min="0.01" step="0.01" inputmode="decimal" placeholder="Enter Amount ₹" required>`,'exAmount')}
      ${field('Spent By',`<div class="expense-spentby"><input id="exSpentBySearch" list="exMemberList" placeholder="Search or type a new name" value="${esc(defaultName)}" required><datalist id="exMemberList">${memberNames.map(n=>`<option value="${esc(n)}"></option>`).join('')}</datalist></div>`,'exSpentBySearch')}
      <div class="expense-help">Login name is selected by default. Search a family member or type a new name.</div>
      ${field('Payment Mode',`<select id="exPaymentMode" name="paymentMode" required>${selectOptions(PAYMENT_MODES,'Select Payment Mode')}</select>`,'exPaymentMode')}
      ${field('Sensitive',`<select id="exSensitive" name="sensitive" required><option value="No" selected>No</option><option value="Yes">Yes</option></select>`,'exSensitive')}
      ${field('Description',`<textarea id="exDescription" name="description" maxlength="1000" placeholder="Enter expense details"></textarea>`,'exDescription')}
      <div id="expenseStatus" class="expense-status" role="status"></div>
      <div class="expense-actions"><button class="expense-primary" type="submit" id="expenseSaveBtn">Save Expense</button><button class="expense-secondary" type="reset" id="expenseResetBtn">Reset</button></div>
    </form>`;
    showPage(shell('Add Expense',inner));
    $('expenseModuleBack').onclick=goBack;
    const cat=$('exCategory'),sub=$('exSubCategory'),vehicleFields=$('exVehicleFields');
    cat.onchange=()=>{
      const isVehicle=cat.value==='Vehicle Maintenance';
      vehicleFields.classList.toggle('hidden',!isVehicle);
      sub.innerHTML=selectOptions(CATEGORIES[cat.value]||[],'Select Subcategory');
      if(isVehicle)sub.value='Vehicle Maintenance';
      sub.required=true;
    };
    $('expenseForm').onsubmit=async ev=>{
      ev.preventDefault();
      const amount=Number($('exAmount').value);
      if(!family().familyId){status('Current family was not found. Please open your family and try again.','error');return}
      if(!token()){status('Login session expired. Please login again.','error');return}
      if(!Number.isFinite(amount)||amount<=0){status('Enter an amount greater than zero.','error');$('exAmount').focus();return}
      if(!$('exSpentBySearch').value.trim()){status('Select a family member or enter a name.','error');return}
      const btn=$('expenseSaveBtn');btn.disabled=true;btn.textContent='Saving…';status('Saving expense…');
      try{
        const payload={expenseDate:$('exDate').value,mainCategory:cat.value,subCategory:sub.value,vehicleType:$('exVehicleType').value,maintenanceType:$('exMaintenanceType').value,vehicleNumber:$('exVehicleNumber').value.trim(),amount:String(amount),spentBy:$('exSpentBySearch').value.trim(),paymentMode:$('exPaymentMode').value,sensitive:$('exSensitive').value,description:$('exDescription').value.trim()};
        const res=await request('saveExpense',payload);
        if(res.status!=='success')throw new Error(res.message||'Could not save expense.');
        status('Expense saved successfully.','success');
        $('expenseForm').reset();$('exDate').value=dateToday();$('exSpentBySearch').value=defaultName;vehicleFields.classList.add('hidden');sub.innerHTML=selectOptions([],'Select Subcategory');
      }catch(err){status(err.message||'Unable to save expense. Please try again.','error')}
      finally{btn.disabled=false;btn.textContent='Save Expense'}
    };
    $('expenseResetBtn').onclick=()=>setTimeout(()=>{ $('exDate').value=dateToday();$('exSpentBySearch').value=defaultName;vehicleFields.classList.add('hidden');sub.innerHTML=selectOptions([],'Select Subcategory');status('');},0);
  }
  function renderSensitiveGate(kind){
    activeReport=kind;
    const label=kind==='sensitive'?'Sensitive Reports':'All Reports';
    const inner=`<div class="expense-panel"><p>Enter your Sensitive Pass Code to continue.</p>${field('Pass Code','<input id="exReportPass" type="password" inputmode="numeric" autocomplete="current-password" placeholder="Enter Pass Code">','exReportPass')}<div id="expenseStatus" class="expense-status" role="status"></div><div class="expense-actions"><button id="exVerifyPass" class="expense-primary">Verify</button></div></div>`;
    showPage(shell(label,inner));$('expenseModuleBack').onclick=goBack;
    $('exVerifyPass').onclick=async()=>{const pass=$('exReportPass').value.trim();if(!pass){status('Enter Pass Code.','error');return}const btn=$('exVerifyPass');btn.disabled=true;try{const res=await request('getExpenses',{reportAccess:kind,passCode:pass});if(res.status!=='success')throw new Error(res.message||'Verification failed.');cachedExpenses=res.expenses||[];renderReports(kind, cachedExpenses)}catch(err){status(err.message,'error');btn.disabled=false}};
  }
  function reportControls(custom=false){
    const types=['Today','Daily','Weekly','Monthly','Yearly','Abstract'];
    const periods=['Today','This Week','This Month','This Year','Selected Date','Month','Year'];
    return `<div class="expense-panel"><div class="expense-filter-grid">
      <div class="expense-field"><label class="expense-label" for="exReportType"><span class="expense-label-text">Report Type</span></label><select id="exReportType">${selectOptions(types,'Select Type')}</select></div>
      <div class="expense-field"><label class="expense-label" for="exReportPeriod"><span class="expense-label-text">Report Period</span></label><select id="exReportPeriod">${selectOptions(periods,'Select Period')}</select></div>
      <div class="expense-field hidden" id="exSelectedDateWrap"><label class="expense-label" for="exSelectedDate"><span class="expense-label-text">Selected Date</span></label><input id="exSelectedDate" type="date" value="${dateToday()}"></div>
      <div class="expense-field hidden" id="exMonthWrap"><label class="expense-label" for="exMonth"><span class="expense-label-text">Month</span></label><input id="exMonth" type="month" value="${dateToday().slice(0,7)}"></div>
      <div class="expense-field hidden" id="exYearWrap"><label class="expense-label" for="exYear"><span class="expense-label-text">Year</span></label><select id="exYear">${Array.from({length:8},(_,i)=>new Date().getFullYear()-i).map(y=>`<option value="${y}">${y}</option>`).join('')}</select></div>
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
      </div><div class="expense-actions"><button id="exRunReport" class="expense-primary">${custom?'Search':'Show Report'}</button></div><div id="expenseStatus" class="expense-status" role="status"></div></div><div id="exReportOutput"></div>`;
  }
  function setupReportControls(custom,kind){
    $('expenseModuleBack').onclick=goBack;
    const period=$('exReportPeriod');
    const toggle=()=>{const p=period.value;$('exSelectedDateWrap').classList.toggle('hidden',p!=='Selected Date');$('exMonthWrap').classList.toggle('hidden',p!=='Month');$('exYearWrap').classList.toggle('hidden',p!=='Year');};
    period.onchange=toggle;
    if(custom){$('exFilterCategory').onchange=()=>{$('exFilterSub').innerHTML=selectOptions(CATEGORIES[$('exFilterCategory').value]||[],'All Subcategories')};$('exFilterSensitive').onchange=()=>{$('exCustomPassWrap').classList.toggle('hidden',$('exFilterSensitive').value==='No')}}
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
    if(!custom){$('exReportType').value='Monthly';period.value='This Month';toggle()}
    if(custom){$('exReportType').value='Abstract';period.value='This Month';toggle()}
  }
  function filterRows(rows,custom,kind){
    const p=$('exReportPeriod').value;const type=$('exReportType').value;let from='',to='';const now=new Date();
    if(custom){from=$('exFromDate').value;to=$('exToDate').value}
    if((!custom || (!from && !to)) && p==='Today'){from=to=dateToday()}
    else if((!custom || (!from && !to)) && p==='This Week'){const d=new Date();const day=(d.getDay()+6)%7;d.setDate(d.getDate()-day);from=fmt(d);const end=new Date(d);end.setDate(end.getDate()+6);to=fmt(end)}
    else if((!custom || (!from && !to)) && p==='This Month'){from=dateToday().slice(0,7)+'-01';to=dateToday()}
    else if((!custom || (!from && !to)) && p==='This Year'){from=now.getFullYear()+'-01-01';to=dateToday()}
    else if((!custom || (!from && !to)) && p==='Selected Date'){from=to=$('exSelectedDate').value}
    else if((!custom || (!from && !to)) && p==='Month'){const m=$('exMonth').value;if(m){from=m+'-01';const parts=m.split('-').map(Number);to=m+'-'+String(new Date(parts[0],parts[1],0).getDate()).padStart(2,'0')}}
    else if((!custom || (!from && !to)) && p==='Year'){const y=$('exYear').value;from=y+'-01-01';to=y+'-12-31'}
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
    } else if(['Daily','Weekly','Monthly','Yearly'].includes(type)){
      const groups={};
      rows.forEach(r=>{
        const ds=String(r.expenseDate||'').slice(0,10);let key=ds||'Unknown';
        if(type==='Monthly')key=ds.slice(0,7)||'Unknown';
        if(type==='Yearly')key=ds.slice(0,4)||'Unknown';
        if(type==='Weekly'&&ds){const d=new Date(ds+'T12:00:00');d.setDate(d.getDate()-((d.getDay()+6)%7));key=fmt(d)}
        if(!groups[key])groups[key]={amount:0,count:0};groups[key].amount+=Number(r.amount||0);groups[key].count++;
      });
      const label=type==='Daily'?'Date':type==='Weekly'?'Week Starting':type==='Monthly'?'Month':'Year';
      table=`<div class="expense-results"><table><thead><tr><th>${label}</th><th>Records</th><th>Total Amount</th></tr></thead><tbody>${Object.keys(groups).sort().reverse().map(k=>`<tr><td>${esc(k)}</td><td>${groups[k].count}</td><td>${money(groups[k].amount)}</td></tr>`).join('')||'<tr><td colspan="3">No records found.</td></tr>'}</tbody></table></div>`;
    } else {
      table=`<div class="expense-results"><table><thead><tr><th>Date</th><th>Category / Subcategory</th><th>Spent By</th><th>Payment</th><th>Amount</th><th>Sensitive</th><th>Description</th></tr></thead><tbody>${rows.slice().sort((a,b)=>String(b.expenseDate).localeCompare(String(a.expenseDate))).map(r=>`<tr><td>${esc(r.expenseDate)}</td><td>${esc(r.mainCategory)}<br>${esc(r.subCategory)}${r.vehicleType?'<br>'+esc(r.vehicleType)+' / '+esc(r.maintenanceType):''}</td><td>${esc(r.spentBy)}</td><td>${esc(r.paymentMode)}</td><td>${money(r.amount)}</td><td>${esc(r.sensitive)}</td><td>${esc(r.description)}</td></tr>`).join('')||'<tr><td colspan="7">No records found.</td></tr>'}</tbody></table></div>`;
    }
    $('exReportOutput').innerHTML=`<div class="expense-summary"><div class="expense-summary-card"><small>Total Records</small><strong>${counts}</strong></div><div class="expense-summary-card"><small>Total Expense</small><strong>${money(total)}</strong></div></div>${table}`;
  }
  function renderReports(kind='normal',prefetched=null){
    activeReport=kind;cachedExpenses=prefetched||[];const title=kind==='sensitive'?'Sensitive Expenses Reports':kind==='all'?'All Expenses Reports':'Expenses Reports';
    showPage(shell(title,reportControls(false)));setupReportControls(false,kind);
  }
  function renderCustomSearch(){
    activeReport='normal';cachedExpenses=[];
    showPage(shell('Expenses — Custom Search',reportControls(true)));setupReportControls(true,'normal');
  }
  function showInfo(){showPage(shell('About Expenses','<div class="expense-panel"><p>Record family expenses and search reports by date, category, member, payment mode, amount and sensitivity.</p><p>Normal Reports exclude Sensitive = Yes records. Sensitive and All Reports require the Sensitive Pass Code.</p></div>'));$('expenseModuleBack').onclick=goBack}
  // Initialize member list before form opens; form also works if member loading fails.
  document.addEventListener('DOMContentLoaded',()=>{loadMembers()});
  const expenseButton=$('expensesBtn');
  if(expenseButton)expenseButton.onclick=openMenu;
})();
