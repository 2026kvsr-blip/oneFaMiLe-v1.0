

/* oneFaMiLe Activities module — report page structure follows expense.js */
(function(){
  'use strict';
  const API = 'https://script.google.com/macros/s/AKfycbzYblwgxrGFDF2MKhiWLvrlSLdJTIgQoplD0Z2-A_tLmwrdUPWsTqzOF9-txnug4DFLpg/exec';
  const $ = id => document.getElementById(id);
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const today = () => {const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
  const fmt = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const showDate = v => {const s=String(v||'').slice(0,10);const m=s.match(/^(\d{4})-(\d{2})-(\d{2})$/);return m?`${m[3]}-${m[2]}-${m[1].slice(2)}`:s};
  function family(){try{return JSON.parse(localStorage.getItem('currentFamily')||'{}')}catch(_){return {}}}
  function token(){return sessionStorage.getItem('sessionToken')||''}
  function request(action,fields={}){const f=family();const body=new URLSearchParams({action,sessionToken:token(),familyId:String(f.familyId||''),...fields});return fetch(API,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body}).then(r=>r.json())}
  const ACTIVITY_CONFIG = {
    'Daily Activity': {'Personal':['Morning Routine','Exercise','Reading','Shopping','Personal Work','Rest','Others'],'Family':['Family Time','Family Care','Family Discussion','Visiting Relatives','Others'],'Household':['Cooking','Cleaning','Groceries','Repairs','Home Maintenance','Others'],'Health':['Medicine','Walking','Yoga','Health Check-up','Diet','Others'],'Friends':['Phone Call','Meeting Friends','Visiting Friends','Get-together','Others'],'Office':['Office Work','Meeting','Field Visit','Official Call','Meet Officials','Others'],'Others':['General Work','Other Activity','Others']},
    'Task': {'Personal':['Personal Work','Shopping','Learning','Follow-up','Others'],'Family':['Family Work','Family Responsibilities','Relatives Work','Others'],'Household':['Cleaning','Repairs','Maintenance','Groceries','Others'],'Health':['Medicine','Health Check-up','Exercise','Follow-up','Others'],'Friends':['Contact Friend','Visit','Help Friend','Others'],'Office':['Office Work','File Work','Field Work','Meet Officials','Follow-up','Others'],'Education':['Study','Exam Preparation','Assignment','Application','Others'],'Official':['Official Work','Documentation','Inspection','Report Submission','Others'],'Social':['Social Service','Community Work','Function Arrangements','Others'],'Others':['General Task','Other Work','Others']},
    'Event': {'Personal':['Personal Function','Celebration','Others'],'Family':['Birthday','Marriage','Family Function','Anniversary','Others'],'Household':['Housewarming','Home Function','Others'],'Health':['Health Camp','Medical Camp','Others'],'Friends':['Get-together','Birthday Party','Marriage','Family Function','Reunion','Others'],'Office':['Office Function','Office Celebration','Conference','Meetings','Others'],'Education':['School Event','College Event','Seminar','Others'],'Official':['Official Function','Inauguration','Public Meeting','Others'],'Social':['Community Event','Cultural Programme','Festival','Others'],'Others':['General Event','Other Programme','Others']},
    'Reminder': {'Personal':['Personal Work','Important Date','Follow-up','Others'],'Family':['Family Reminder','Birthday','Anniversary','Others'],'Household':['Bill Payment','Maintenance','Groceries','Others'],'Health':['Medicine','Doctor Visit','Health Check-up','Others'],'Friends':['Birthday','Call Friend','Meeting','Others'],'Office':['Office Work','Meeting','Official Call','Deadline','Others'],'Education':['Exam Date','Assignment','Application Deadline','Others'],'Official':['Due Date','Document Submission','Application Follow-up','Others'],'Social':['Function','Festival','Community Event','Others'],'Others':['General Reminder','Other','Others']},
    'Meeting': {'Personal':['Personal Meeting','Discussion','Others'],'Family':['Family Discussion','Planning','Others'],'Household':['Home-related','Repairs','Purchase','Others'],'Friends':['Meeting','Get-together','Others'],'Office':['Office Meeting','Review Meeting','Conference','Team Meeting','Meet Officials','Others'],'Others':['General Meeting','Other Discussion','Others']},
    'Appointment': {'Personal':['Personal Work','Personal Visit','Follow-up'],'Family':['Family Visit','Family Consultation','Follow-up'],'Health':['Doctor Visit','Hospital Visit','Medical Test','Dental Visit','Follow-up'],'Friends':['Meet Friend','Personal Visit','Others'],'Office':['Office Visit','Meet Officials','Document Submission','Follow-up'],'Education':['School Visit','College Visit','Counselling','Admission'],'Official':['Office Visit','Application','Certificate','Verification'],'Others':['General Appointment','Other']}
 ,
    'Others': {'Others':['Others']}
  };
  const statusOptions=['Pending','In Progress','On Hold','Completed','Cancelled'];
  const priorityOptions=['Low','Normal','High','Urgent'];
  const repeatOptions=['Does not repeat','Daily','Weekly','Monthly','Yearly','Custom'];
  const categoryKeys = type => Object.keys(ACTIVITY_CONFIG[type] || {'Others':['Other']});
  const subCategoryKeys = (type,category) => (ACTIVITY_CONFIG[type] || {'Others':['Other']})[category] || [];
  const reportCategoryKeys = () => [...new Set(Object.values(ACTIVITY_CONFIG).flatMap(categories => Object.keys(categories)))].sort((a,b)=>a.localeCompare(b,undefined,{sensitivity:'base'}));
  const reportSubCategoryKeys = category => [...new Set(Object.values(ACTIVITY_CONFIG).flatMap(categories => category ? (categories[category] || []) : Object.values(categories).flat()))].sort((a,b)=>a.localeCompare(b,undefined,{sensitivity:'base'}));
  const sensitiveFlag = value => value === true || ['true','yes','1','sensitive'].includes(String(value == null ? '' : value).trim().toLowerCase());
  const customChoice = '＋ Custom text…';
  function dropdown(items,placeholder,allowCustom=true){return `<option value="">${esc(placeholder)}</option>${items.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}${allowCustom?`<option value="__custom__">${esc(customChoice)}</option>`:''}`}
  function field(label,id,control,wide=false){return `<div class="expense-field${wide?' wide':''}" data-field="${esc(id)}"><label class="expense-label" for="${esc(id)}">${esc(label)}</label>${control}</div>`}
  function selectField(id,label,items,placeholder,required=false,wide=false,allowCustom=true){return field(label,id,`<select id="${id}" name="${id}"${required?' required':''}>${dropdown(items,placeholder,allowCustom)}</select>${allowCustom?`<input id="${id}Custom" class="activity-custom-input" type="text" placeholder="Type a custom value" aria-label="Custom ${esc(label)}" hidden>`:''}`,wide)}
  let cached=[], lastRows=[], dateAscending=true, activeAccess='normal';
  function options(items,placeholder='Select',preserve=false){const list=preserve?items.slice():items.slice().sort((a,b)=>String(a).localeCompare(String(b),undefined,{sensitivity:'base'}));return `<option value="">${esc(placeholder)}</option>`+list.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}
  function page(html){if(typeof window.showPage==='function')window.showPage(html);else{const el=$('homeContent')||$('pageContent')||$('mainContent');if(el)el.innerHTML=html}}
  function title(text){return typeof window.pageTitle==='function'?window.pageTitle(text,'images/colorbtns/Activities1.png'):`<h2 class="page-title">${esc(text)}</h2>`}
  function shell(text,inner,inside=false){return `<div class="expense-page activity-page"><h2 class="expense-title">${esc(text)}</h2>${inner}${inside?'':'<div class="expense-actions"><button type="button" class="expense-secondary" id="activityModuleBack">← Back</button></div>'}</div>`}
  function backToMenu(){try{openMenu();return}catch(e){console.warn('Activities menu navigation failed',e)}const b=$('activitiesBtn');if(b)b.click();else if(typeof window.showHome==='function')window.showHome()}
  function bindBack(){const b=$('activityModuleBack');if(b)b.onclick=backToMenu}
  function status(message,type=''){const el=$('activityStatus');if(el){el.textContent=message||'';el.className='expense-status '+type}}
  function styleOnce(){if($('activityReportStyles'))return;const st=document.createElement('style');st.id='activityReportStyles';st.textContent=`
    .activity-page{max-width:1100px;margin:0 auto}.activity-page .expense-panel{padding:12px;background:#f0f7ff;border:1px solid #c4d4ff;border-radius:14px;box-sizing:border-box}
    .activity-page .expense-filter-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;align-items:start}
    .activity-page .activity-fields-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important;align-items:start}
    .activity-page .activity-fields-grid>[data-field="activityType"]{grid-column:auto!important}
    .activity-page .activity-fields-grid>[data-field="reminderFields"]{display:contents!important;grid-column:1/-1!important;width:100%;min-width:0}.activity-page .activity-fields-grid>[data-field="reminderFields"][hidden]{display:none!important}
    .activity-page .activity-fields-grid>[data-field="reminderFields"] .activity-reminder-grid{margin:0!important}
    .activity-page .activity-fields-grid>.expense-field{min-width:0;width:100%;max-width:100%;box-sizing:border-box}
    .activity-page .activity-fields-grid>.expense-field input,.activity-page .activity-fields-grid>.expense-field select,.activity-page .activity-fields-grid>.expense-field textarea{width:100%;min-width:0;max-width:100%;box-sizing:border-box}

    .activity-page .activity-description-date-row{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;align-items:start;width:100%;min-width:0;box-sizing:border-box;margin-top:10px}.activity-page .activity-description-date-row>.expense-field{min-width:0;width:100%;max-width:100%;box-sizing:border-box}.activity-page .activity-description-date-row textarea{min-height:40px}.activity-page .activity-schedule-date-row{grid-column:auto;width:100%;margin-top:0}.activity-page .activity-schedule-date-row .expense-field{max-width:100%}.activity-page .activity-id-line{display:flex!important;flex-direction:row!important;align-items:center!important;gap:5px!important;white-space:nowrap!important;overflow:visible;grid-column:1 / -1!important;justify-self:start!important;align-self:start!important;width:100%;min-height:28px;color:#888!important;font-weight:500!important;text-align:left!important;line-height:28px}.activity-page .activity-reminder-toggle-wrap{display:block;min-width:0;width:100%;box-sizing:border-box}.activity-page .activity-sensitive-line{display:flex!important;justify-content:flex-start!important;align-items:center!important;width:100%;text-align:left!important;margin:4px 0!important;padding:0!important}.activity-page .activity-sensitive-line label{display:inline-flex!important;justify-content:flex-start!important;align-items:center!important;gap:0!important;margin:0!important;padding:0!important;text-align:left!important;width:auto!important}.activity-page .activity-sensitive-line input{margin:0!important;flex:0 0 auto}.activity-page .activity-reminder-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important;grid-column:1/-1;width:100%;min-width:0;box-sizing:border-box}.activity-page .activity-reminder-grid>.expense-field{grid-column:auto!important;min-width:0!important;width:100%!important;max-width:100%!important;box-sizing:border-box}.activity-page .activity-reminder-grid input,.activity-page .activity-reminder-grid select{width:100%!important;min-width:0!important;max-width:100%!important;box-sizing:border-box}.activity-page .activity-section-title{font-size:16px;color:#2477c8;border-bottom:1px solid #c4d4ff;padding:8px 0 5px;margin:12px 0 8px}.activity-page .activity-custom-input{margin-top:5px}.activity-page [hidden],.activity-page .expense-field.hidden{display:none!important}.activity-page .expense-field{min-width:0;display:flex;flex-direction:column;gap:5px}.activity-page .expense-label{font-weight:600;color:#2d5274;display:block;white-space:normal}
    .activity-page .expense-field input,.activity-page .expense-field select,.activity-page .expense-field textarea{width:100%;min-width:0;max-width:100%;box-sizing:border-box;min-height:40px;padding:8px 10px;border:1px solid #9bb9d4;border-radius:8px;background:#fff;color:#222;font:inherit}
    .activity-page .expense-filter-grid>.expense-field{min-width:0;width:100%;max-width:100%;box-sizing:border-box}
    .activity-page .expense-filter-grid>.expense-field input,
    .activity-page .expense-filter-grid>.expense-field select{display:block;width:100%;min-width:0;max-width:100%;height:40px;min-height:40px;max-height:40px;box-sizing:border-box}
    .activity-page .expense-filter-grid>.expense-field textarea{width:100%;min-width:0;max-width:100%;min-height:40px;box-sizing:border-box}
    .activity-page .expense-filter-grid>.expense-field input[type="time"]{-webkit-appearance:none;appearance:none;height:40px!important;min-height:40px!important;max-height:40px!important;line-height:22px;box-sizing:border-box;padding:8px 10px}

    .activity-page .expense-report-inline{display:flex;flex-direction:column;gap:5px}.activity-page .expense-report-actions{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:nowrap;margin:12px 0}
    .activity-page .expense-report-actions>button,.activity-page .expense-download-wrap>button{white-space:nowrap}.activity-page .expense-download-wrap{position:relative}
    .activity-page .expense-download-menu{position:absolute;right:0;top:100%;z-index:9999;display:flex;flex-direction:column;min-width:100px;background:#fff;border:1px solid #9ab;border-radius:8px;box-shadow:0 4px 12px #0002}
    .activity-page .expense-download-menu.hidden{display:none}.activity-page .expense-download-menu button{background:#fff;border:0;padding:9px 14px;text-align:left;color:#222}
    .activity-page .expense-results{width:100%;overflow:auto;margin-top:8px}.activity-page .expense-results table{width:100%;border-collapse:collapse;background:#fff;font-size:13px}.activity-page .expense-results th,.activity-page .expense-results td{border:1px solid #c4d4ff;padding:7px 8px;text-align:left;vertical-align:top;white-space:normal;overflow-wrap:anywhere}
    .activity-page .expense-results th{background:#dce7ff;color:#2d5274;position:sticky;top:0}.activity-page .expense-report-subheading th{background:#fff!important;text-align:left;border-top:1px solid #c4d4ff;border-bottom:1px solid #c4d4ff;color:#2d5274}
    .activity-page .expense-report-year th{font-size:22px!important;font-weight:700;padding:10px 8px;background:#fff!important;color:#218838!important}.activity-page .expense-report-month th{font-size:16px!important;font-weight:700;padding:8px;background:#fff!important;color:#e67e22!important}
    .activity-page .expense-report-total td{font-weight:700;background:#fff!important;border-top:1px solid #c4d4ff}.activity-page .expense-abstract-title{font-size:23px;text-align:center;color:#3477b7;margin:10px 0 8px;font-weight:700}
    .activity-page .expense-abstract-heading{font-size:18px;font-weight:700;color:#e67e22;margin:8px 0;padding:8px;border-bottom:1px solid #c4d4ff}
    .activity-page .expense-summary{display:flex;align-items:center;gap:8px;width:100%;margin:10px 0 14px;box-sizing:border-box;flex-wrap:nowrap}.activity-page .expense-summary-card{display:flex;align-items:center;gap:5px;white-space:nowrap;min-width:0;box-sizing:border-box;padding:9px 8px;border:1px solid #c4d4ff;border-radius:8px;flex:1 1 33%;width:33%}.activity-page .expense-summary-card small{font-size:clamp(9px,2.6vw,12px)}.activity-page .expense-summary-card strong{font-size:clamp(10px,2.9vw,14px)}
    .activity-page #activityDownloadBtn,.activity-page #activityReportBack{background:transparent!important;color:#2477c8!important;border:1.5px solid #2477c8!important;box-shadow:none!important}.activity-page .expense-status{margin:8px 0;white-space:pre-wrap}
    @media(max-width:600px){.activity-page .expense-filter-grid{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:9px;row-gap:10px}.activity-page .expense-filter-grid>.expense-field{grid-column:auto;min-width:0}.activity-page .expense-filter-grid .wide{grid-column:1/-1}.activity-page .expense-report-actions{gap:6px}.activity-page .expense-report-actions button{min-width:0;flex:1 1 0;padding:8px 4px;font-size:12px}.activity-page .expense-summary-card{padding:8px 5px;gap:3px}}

    /* Activity form alignment and spacing fixes */
    .activity-page .activity-description-date-row .expense-label,
    .activity-page .activity-description-date-row label{
      text-align:left!important;align-self:stretch!important;width:100%!important;
      margin-left:0!important;margin-right:0!important;justify-self:start!important;
    }
    .activity-page .activity-description-date-row>.expense-field{
      align-items:stretch!important;gap:5px!important;
    }
    .activity-page .activity-reminder-grid{
      row-gap:16px!important;column-gap:10px!important;margin-top:14px!important;
    }
    .activity-page .activity-reminder-grid .expense-label{
      text-align:left!important;align-self:stretch!important;width:100%!important;
      margin:0 0 5px 0!important;justify-self:start!important;
    }
    .activity-page .activity-reminder-grid .expense-field{gap:5px!important;align-items:stretch!important}
    .activity-page .activity-sensitive-line{
      margin-top:18px!important;margin-bottom:8px!important;
    }
    @media(max-width:600px){
      .activity-page .activity-description-date-row .expense-label,
      .activity-page .activity-reminder-grid .expense-label{text-align:left!important}
      .activity-page .activity-reminder-grid{row-gap:16px!important;margin-top:14px!important}
      .activity-page .activity-sensitive-line{margin-top:18px!important}
    }


    .activity-page .activity-reminder-grid [data-field="reminderTime"] input[type="time"]{
      display:block!important;-webkit-appearance:none!important;appearance:none!important;
      width:100%!important;min-width:0!important;max-width:100%!important;
      height:40px!important;min-height:40px!important;max-height:40px!important;
      line-height:22px!important;padding:8px 10px!important;margin:0!important;
      box-sizing:border-box!important;border:1px solid #9bb9d4!important;
      border-radius:8px!important;background:#fff!important;font:inherit!important;
    }
    .activity-page .activity-reminder-grid{row-gap:10px!important;column-gap:10px!important;margin-top:0!important;align-items:start!important}
    .activity-page .activity-reminder-grid>.expense-field{margin:0!important}
    .activity-page .activity-fields-grid>[data-field="reminderFields"]{margin-top:0!important;align-items:start!important}

  `;document.head.appendChild(st)}
  function openMenu(){const btn=$('activitiesBtn');if(!btn)return;if(typeof window.updateMenuIcon==='function')window.updateMenuIcon();if(typeof window.setActiveButton==='function')window.setActiveButton(btn);page(title('Activities')+`<div class="grid-3x2">
    <button class="grid-btn" id="activityAddBtn"><img src="images/colorbtns/Add1.png" class="btn-icon"><span>Add Activity</span></button>
    <button class="grid-btn" id="activityReportsBtn"><img src="images/colorbtns/Reports1.png" class="btn-icon"><span>Reports</span></button>
    <button class="grid-btn" id="activitySensitiveBtn"><img src="images/colorbtns/SensitiveReports1.png" class="btn-icon"><span>Sensitive Reports</span></button>
    <button class="grid-btn" id="activityAllBtn"><img src="images/colorbtns/AllReports1.png" class="btn-icon"><span>All Reports</span></button>
    <button class="grid-btn" id="activityCustomBtn"><img src="images/colorbtns/CustomSearch1.png" class="btn-icon"><span>Custom Search</span></button>
    <button class="grid-btn" id="activityAboutBtn"><img src="images/colorbtns/About1.png" class="btn-icon"><span>About</span></button></div><div style="text-align:center"><button class="back-btn" id="activityHomeBack">← Back</button></div>`);
    $('activityAddBtn').onclick=openForm;$('activityReportsBtn').onclick=()=>renderReports('normal',false);$('activitySensitiveBtn').onclick=()=>sensitiveGate('sensitive');$('activityAllBtn').onclick=()=>sensitiveGate('all');$('activityCustomBtn').onclick=()=>renderReports('normal',true);$('activityAboutBtn').onclick=openAbout;$('activityHomeBack').onclick=()=>{const b=$('homeBtn');if(b)b.click();else if(typeof window.showHome==='function')window.showHome()};}
  function openForm(){
    styleOnce();
    const typeItems=Object.keys(ACTIVITY_CONFIG).filter(x=>x!=='Reminder');
    const inner=`<div class="expense-panel"><form id="activityForm" class="expense-form" autocomplete="off">
      <div class="expense-filter-grid activity-fields-grid" id="activityFieldsGrid">
      ${selectField('activityType','Activity Type',typeItems,'Select Type',true,false,false)}
      ${selectField('category','Category',[],'Select Activity Type first',true,false,false)}
      ${selectField('subCategory','Sub Category',[],'Select Category first',true,false,false)}
      ${field('Scheduled Date *','startDate','<input id="startDate" name="startDate" type="date" value="'+today()+'" required>')}
      ${field('Schedule Time','startTime','<input id="startTime" name="startTime" type="time">')}
      ${field('Description','description','<textarea id="description" name="description" rows="2" maxlength="2000" placeholder="Enter details"></textarea>')}
      ${field('Status','status','<select id="status" name="status"><option value="Pending">Pending</option><option value="In Progress">In Progress</option><option value="On Hold">On Hold</option><option value="Completed">Completed</option><option value="Cancelled">Cancelled</option><option value="Not Necessary">Not Necessary</option></select>')}
      ${field('Reminder','reminderEnabled','<select id="reminderEnabled" name="reminderEnabled"><option value="false" selected>No</option><option value="true">Yes</option></select>')}
      <div class="expense-filter-grid activity-reminder-grid" data-field="reminderFields" hidden>
      ${field('Reminder Repeat','reminderRepeat','<select id="reminderRepeat" name="reminderRepeat"><option value="Once" selected>Once</option><option value="Daily">Daily</option><option value="Weekly">Weekly</option><option value="Monthly">Monthly</option><option value="Yearly">Yearly</option></select>')}
      ${field('Reminder Date','reminderDate','<input id="reminderDate" name="reminderDate" type="date">')}
      ${field('Reminder Time','reminderTime','<input id="reminderTime" name="reminderTime" type="time">')}</div>
      ${field('Venue','venue','<input id="venue" name="venue" placeholder="Venue">')}
      ${field('Location / Link','locationLink','<input id="locationLink" name="locationLink" placeholder="Address or meeting link">')}
      ${field('Person / Doctor / Office','appointmentPerson','<input id="appointmentPerson" name="appointmentPerson" placeholder="Name">')}
      ${field('Follow-up Date','followUpDate','<input id="followUpDate" name="followUpDate" type="date">')}
      ${field('Assigned To','assignedTo','<input id="assignedTo" name="assignedTo" placeholder="Family member / Self">')}
      ${selectField('priority','Priority',priorityOptions,'Select Priority')}
      ${field('Completed Date','completedDate','<input id="completedDate" name="completedDate" type="date">')}
      ${field('End Date','endDate','<input id="endDate" name="endDate" type="date">')}
      ${field('End Time','endTime','<input id="endTime" name="endTime" type="time">')}
      ${field('Due Date','dueDate','<input id="dueDate" name="dueDate" type="date">')}
      ${field('Due Time','dueTime','<input id="dueTime" name="dueTime" type="time">')}
      ${field('Repeat','repeatType','<select id="repeatType" name="repeatType"><option value="Does not repeat" selected>Does not repeat</option><option value="Daily">Daily</option><option value="Weekly">Weekly</option><option value="Monthly">Monthly</option><option value="Yearly">Yearly</option></select>')}
      ${field('Repeat Until','repeatUntil','<input id="repeatUntil" name="repeatUntil" type="date">')}
      ${field('Organiser','organiser','<input id="organiser" name="organiser" placeholder="Organiser">')}
      ${field('Participants','participants','<input id="participants" name="participants" placeholder="Names / family members">')}
      ${field('Meeting With','meetingWith','<input id="meetingWith" name="meetingWith" placeholder="Person / team">')}
      ${field('Agenda','agenda','<input id="agenda" name="agenda" placeholder="Meeting agenda">')}
      <input type="hidden" id="title" name="title" value="">
      </div>
      <div class="activity-sensitive-line"><label for="isSensitive"><input id="isSensitive" name="isSensitive" type="checkbox" value="true"> Sensitive</label></div>
      <div id="activityStatus" class="expense-status" role="status" aria-live="polite"></div><div class="expense-actions"><button type="submit" id="activitySaveBtn" class="expense-primary">Save</button><button type="reset" id="activityResetBtn" class="expense-secondary">Reset</button><button type="button" id="activityModuleBack" class="expense-secondary">← Back</button></div>
    </form></div>`;
    page(shell('Add Activity',inner,true));bindBack();
    const form=$('activityForm'),type=$('activityType'),cat=$('category'),sub=$('subCategory');
    function val(id){const el=$(id);if(!el)return '';if(el.value==='__custom__')return ($(`${id}Custom`)?.value||'').trim();return el.value}
    function customToggle(id){const sel=$(id),inp=$(id+'Custom');if(!sel||!inp)return;const sync=()=>{inp.hidden=sel.value!=='__custom__';inp.required=sel.value==='__custom__';if(!inp.hidden)inp.focus()};sel.addEventListener('change',sync);sync()}
    function updateSub(){const old=val('subCategory');const custom=$('subCategoryCustom');if(custom){custom.value='';custom.hidden=true;custom.required=false}sub.innerHTML=dropdown(subCategoryKeys(val('activityType'),val('category')),'Select Sub Category',false);if(subCategoryKeys(val('activityType'),val('category')).includes(old))sub.value=old;}
    function updateCat(){const old=val('category');const custom=$('categoryCustom');if(custom){custom.value='';custom.hidden=true;custom.required=false}cat.innerHTML=dropdown(categoryKeys(val('activityType')),'Select Category',false);if(categoryKeys(val('activityType')).includes(old))cat.value=old;updateSub()}
    function isDaily(t){return t==='Daily Activity'}
    function show(id,yes){const el=document.querySelector(`[data-field="${id}"]`);if(el)el.hidden=!yes}
    function syncRepeatUntil(){const repeat=$('repeatType'),until=$('repeatUntil');if(!repeat||!until)return;const noRepeat=repeat.value==='Does not repeat';until.disabled=noRepeat;if(noRepeat){until.value='';until.setAttribute('aria-disabled','true')}else{until.removeAttribute('aria-disabled')}}
    function arrangeActivityFields(order){
      const grid=$('activityFieldsGrid');if(!grid)return;
      order.forEach(id=>{const el=grid.querySelector(`[data-field="${id}"]`);if(el)grid.appendChild(el)});
    }
    function updateVisibility(){
      const t=val('activityType'),task=t==='Task',event=t==='Event',meeting=t==='Meeting',appt=t==='Appointment',daily=isDaily(t),reminderOn=val('reminderEnabled')==='true';
      show('startTime',appt||event||meeting);show('endDate',false);show('endTime',false);show('dueDate',false);show('dueTime',false);
      show('repeatType',false);show('repeatUntil',false);syncRepeatUntil();
      show('assignedTo',task);show('priority',task);show('status',true);show('completedDate',val('status')==='Completed');
      show('venue',event);show('organiser',false);show('participants',false);show('meetingWith',false);show('locationLink',meeting||appt);show('agenda',false);show('appointmentPerson',appt);show('followUpDate',appt);
      const reminderGrid=document.querySelector('[data-field="reminderFields"]');if(reminderGrid)reminderGrid.hidden=!reminderOn;
      const reminderField=document.querySelector('[data-field="reminderEnabled"]');
      // Reminder stays the same width as other fields; never stretch it full width.
      if(reminderField)reminderField.style.gridColumn='auto';
      const follow=$('[data-field="followUpDate"]');if(follow)follow.style.gridColumn='auto';
      if(appt){
        // Schedule Time and Follow-up Date share one row; Reminder is placed last.
        arrangeActivityFields(['activityType','description','category','subCategory','startDate','startTime','status','followUpDate','locationLink','appointmentPerson','completedDate','assignedTo','priority','reminderEnabled','reminderFields']);
      }else if(event){
        // Venue first; Reminder begins on the next row at normal field width.
        arrangeActivityFields(['activityType','venue','startDate','startTime','category','subCategory','description','status','reminderEnabled','reminderFields','completedDate']);
        if(reminderField)reminderField.style.gridColumn='1';
      }else if(meeting){
        // Location / Link first; Reminder begins on the next row at normal field width.
        arrangeActivityFields(['activityType','locationLink','startDate','startTime','category','subCategory','description','status','reminderEnabled','reminderFields','completedDate']);
        if(reminderField)reminderField.style.gridColumn='1';
      }else if(daily){
        // Keep Reminder and Reminder Repeat side by side, with Date and Time beneath.
        arrangeActivityFields(['activityType','startDate','category','subCategory','description','status','reminderEnabled','reminderFields','completedDate']);
      }else if(task){
        // Assigned To and Priority share one row; Reminder follows below them.
        arrangeActivityFields(['activityType','startDate','category','subCategory','description','status','assignedTo','priority','reminderEnabled','reminderFields','completedDate']);
      }else{
        arrangeActivityFields(['activityType','startDate','category','subCategory','description','status','reminderEnabled','reminderFields','completedDate','assignedTo','priority']);
      }
      // Title is intentionally not shown; keep the backend field populated for compatibility.
      if($('title'))$('title').value=val('subCategory')||val('category')||t||'Activity';
    }
    [type,cat,sub,$('priority'),$('status')].forEach(el=>{if(el)customToggle(el.id)});
    // Cascade refresh: changing a parent selection clears every field after it,
    // while preserving the parent selections that the user just made.
    const cascadeOrder=['activityType','category','subCategory','startDate','startTime','description','status','reminderEnabled','reminderRepeat','reminderDate','reminderTime','venue','locationLink','appointmentPerson','followUpDate','assignedTo','priority','completedDate','endDate','endTime','dueDate','dueTime','repeatType','repeatUntil','organiser','participants','meetingWith','agenda'];
    function clearFieldValue(id){
      const el=$(id);if(!el)return;
      if(el.type==='checkbox'||el.type==='radio')el.checked=false;
      else if(el.tagName==='SELECT'){
        el.value='';
        const custom=$(id+'Custom');if(custom){custom.value='';custom.hidden=true;custom.required=false}
      }else if(id==='startDate')el.value=today();
      else el.value='';
    }
    function refreshFieldsAfter(id){
      const index=cascadeOrder.indexOf(id);if(index<0)return;
      cascadeOrder.slice(index+1).forEach(clearFieldValue);
      // Restore the form's normal default values after clearing dependent fields.
      if($('status'))$('status').value='Pending';
      if($('reminderEnabled'))$('reminderEnabled').value='false';
      if($('reminderRepeat'))$('reminderRepeat').value='Once';
      if($('priority'))$('priority').value='Normal';
      if($('repeatType'))$('repeatType').value='Does not repeat';
      if($('startDate')&&!$('startDate').value)$('startDate').value=today();
      if($('isSensitive'))$('isSensitive').checked=false;
      syncRepeatUntil();
    }
    type.addEventListener('change',()=>{refreshFieldsAfter('activityType');updateCat();updateVisibility()});
    cat.addEventListener('change',()=>{refreshFieldsAfter('category');updateSub();updateVisibility()});
    sub.addEventListener('change',()=>{refreshFieldsAfter('subCategory');updateVisibility()});
    $('reminderEnabled').addEventListener('change',()=>{updateVisibility()});$('status').addEventListener('change',updateVisibility);$('repeatType').addEventListener('change',syncRepeatUntil);
    updateCat();$('reminderEnabled').value='false';$('status').value='Pending';$('priority').value='Normal';updateVisibility();
    function resetForm(){form.reset();$('startDate').value=today();$('status').value='Pending';$('priority').value='Normal';$('reminderEnabled').value='false';document.querySelectorAll('.activity-custom-input').forEach(e=>{e.value='';e.hidden=true;e.required=false});updateCat();updateVisibility();status('')}
    form.onsubmit=async ev=>{ev.preventDefault();if(!family().familyId){status('Current family was not found. Please open your family and try again.','error');return}if(!token()){status('Login session expired. Please login again.','error');return}
      const activityType=val('activityType'),category=val('category'),subCategory=val('subCategory');if(!activityType||!category||!subCategory){status('Activity Type, Category and Sub Category are required.','error');return}if($('title'))$('title').value=val('subCategory')||val('category')||activityType||'Activity';
      const btn=$('activitySaveBtn');btn.disabled=true;btn.textContent='Saving…';status('Saving activity…');try{const fd=new FormData(form),fields={};for(const [k,v] of fd.entries())fields[k]=String(v);
        ['activityType','category','subCategory','status','priority','repeatType','reminderRepeat','reminderEnabled'].forEach(id=>{if($(id))fields[id]=val(id)});fields.activityType=activityType;fields.category=category;fields.subCategory=subCategory;fields.isSensitive=$('isSensitive').checked?'true':'false';
        const res=await request('saveActivity',fields);if(res.status!=='success')throw new Error(res.message||'Unable to save activity.');status('Activity saved successfully. Activity ID: '+(res.activityId||''),'success');cached=[];resetForm();
      }catch(e){status(e.message||'Unable to save activity.','error')}finally{btn.disabled=false;btn.textContent='Save'}};
    $('activityResetBtn').onclick=()=>setTimeout(resetForm,0);
  }
  function sensitiveGate(kind){styleOnce();const label=kind==='sensitive'?'Sensitive Activities Reports':'All Activities Reports';const inner=`<div class="expense-panel"><p>Enter your Sensitive Pass Code to continue.</p><div class="expense-field"><label class="expense-label" for="activityPassCode">Pass Code</label><input id="activityPassCode" type="password" inputmode="numeric" autocomplete="current-password" placeholder="Enter Pass Code"></div><div id="activityStatus" class="expense-status" role="status"></div><div class="expense-actions"><button type="button" id="activityVerifyPass" class="expense-primary">Verify</button></div></div>`;page(shell(label,inner));bindBack();$('activityVerifyPass').onclick=async()=>{const pass=$('activityPassCode').value.trim();if(!pass){status('Enter Pass Code.','error');return}const btn=$('activityVerifyPass');btn.disabled=true;status('Verifying…');try{const res=await request('getActivities',{includeSensitive:'true',passCode:pass});if(res.status!=='success')throw new Error(res.message||'Pass Code verification failed.');cached=res.activities||[];activeAccess=kind;renderReports(kind,false,cached)}catch(e){status(e.message||'Verification failed.','error');btn.disabled=false}}}
  function reportControls(custom){return `<style>.activity-page .expense-filter-grid .expense-field.hidden{display:none!important}.activity-page .expense-report-inline{display:flex;flex-direction:column;gap:5px}.activity-page .expense-report-inline .expense-label{white-space:nowrap;width:100%;margin:0!important}.activity-page .expense-report-inline select{display:block;width:100%;min-width:0;box-sizing:border-box}.activity-page .activity-custom-grid .expense-field{min-width:0}</style><div class="expense-panel"><div class="expense-filter-grid ${custom?'activity-custom-grid':''}">
    <div class="expense-field expense-report-inline"><label class="expense-label" for="actReportType">Report Type</label><select id="actReportType">${options(['Abstract','Detailed'],'Select Type',true)}</select></div>
    <div class="expense-field expense-report-inline"><label class="expense-label" for="actReportPeriod">Report Period</label><select id="actReportPeriod">${options(['Today','This Week','This Month','This Year','All'],'Select Period',true)}</select></div>
    <div class="expense-field"><label class="expense-label" for="actFilterCategory">Category</label><select id="actFilterCategory">${options(reportCategoryKeys(),'All Categories')}</select></div>
    <div class="expense-field"><label class="expense-label" for="actFilterSub">Sub Category</label><select id="actFilterSub">${options(reportSubCategoryKeys(''),'All Sub Categories')}</select></div>
    <div class="expense-field"><label class="expense-label" for="actFilterStatus">Status</label><select id="actFilterStatus">${options(statusOptions,'All Statuses',true)}</select></div>
    <div class="expense-field"><label class="expense-label" for="actFilterPriority">Priority</label><select id="actFilterPriority">${options(priorityOptions,'All Priorities',true)}</select></div>
    <div class="expense-field activity-date-sort-field"><label class="expense-label" for="actDateSortBtn">Date order</label><button type="button" id="actDateSortBtn" class="expense-date-sort" aria-label="Sort date ascending" title="Sort date ascending">↑ Date Ascending</button></div>
    ${custom?`<div class="expense-field"><label class="expense-label" for="actFromDate">From Date</label><input id="actFromDate" type="date"></div><div class="expense-field"><label class="expense-label" for="actToDate">To Date</label><input id="actToDate" type="date"></div><div class="expense-field"><label class="expense-label" for="actSearchText">Search Text</label><input id="actSearchText" type="search" placeholder="Activity, description, category…"></div><div class="expense-field"><label class="expense-label" for="actAssignedTo">Assigned To</label><input id="actAssignedTo" placeholder="Any member/person"></div>`:''}
    </div><div class="expense-report-actions"><button type="button" id="actRunReport" class="expense-primary">Show Report</button><div class="expense-download-wrap"><button type="button" id="activityDownloadBtn" class="expense-secondary" disabled>Download ▾</button><div id="activityDownloadMenu" class="expense-download-menu hidden"><button type="button" data-export="pdf">PDF</button><button type="button" data-export="word">Word</button><button type="button" data-export="excel">Excel</button></div></div><button type="button" id="activityReportBack" class="expense-secondary">← Back</button></div><div id="activityStatus" class="expense-status" role="status" aria-live="polite"></div></div><div id="actReportOutput"></div>`}
  function renderReports(kind='normal',custom=false,prefetched=null){styleOnce();activeAccess=kind;cached=prefetched||[];const label=kind==='sensitive'?'Sensitive Activities Reports':kind==='all'?'All Activities Reports':custom?'Activities — Custom Search':'Activities Reports';page(shell(label,reportControls(custom),true));bindBack();setupReportControls(kind,custom);}
  function setupReportControls(kind,custom){
    const type=$('actReportType'),period=$('actReportPeriod'),cat=$('actFilterCategory'),sub=$('actFilterSub'),run=$('actRunReport'),dl=$('activityDownloadBtn'),menu=$('activityDownloadMenu');
    const abstractPeriods=['Today','This Week','This Month','This Year','All','Daily','Weekly','Monthly','Yearly'];
    const detailedPeriods=['Today','This Week','This Month','This Year','All'];
    const syncPeriodOptions=()=>{const previous=period.value;const choices=type.value==='Abstract'?abstractPeriods:detailedPeriods;period.innerHTML=options(choices,'Select Period',true);period.value=choices.includes(previous)?previous:'This Month';};
    const syncDateSortVisibility=()=>{const p=period.value,isAbstract=type.value==='Abstract';const hide=isAbstract&&['All','Today','This Week','This Month','This Year'].includes(p);const sortField=$('actDateSortBtn')?.closest('.expense-field');if(sortField)sortField.classList.toggle('hidden',hide);};
    type.onchange=()=>{syncPeriodOptions();syncDateSortVisibility()};syncPeriodOptions();period.onchange=syncDateSortVisibility;
    const syncSub=()=>{const previous=sub.value;sub.innerHTML=options(cat.value?reportSubCategoryKeys(cat.value):reportSubCategoryKeys(''),'All Sub Categories');if([...sub.options].some(o=>o.value===previous))sub.value=previous;};cat.onchange=syncSub;syncSub();
    const back=$('activityReportBack');if(back)back.onclick=event=>{event.preventDefault();event.stopPropagation();backToMenu()};
    if(dl&&menu){dl.disabled=true;dl.onclick=()=>{if(!dl.disabled)menu.classList.toggle('hidden')};menu.querySelectorAll('[data-export]').forEach(b=>b.onclick=()=>{menu.classList.add('hidden');exportReport(b.dataset.export)})}
    const dateSortBtn=$('actDateSortBtn');if(dateSortBtn)dateSortBtn.onclick=()=>{dateAscending=!dateAscending;dateSortBtn.textContent=dateAscending?'↑ Date Ascending':'↓ Date Descending';dateSortBtn.setAttribute('aria-label',dateAscending?'Sort date ascending':'Sort date descending');dateSortBtn.title=dateAscending?'Sort date ascending':'Sort date descending';if(lastRows.length)renderReportResults(lastRows,type.value)};
    run.onclick=async()=>{run.disabled=true;status('Loading activities…');try{let rows=cached; if(!rows.length){const fields={};if(kind==='sensitive'||kind==='all'){fields.includeSensitive='true';const pass=$('activityPassCode')?.value?.trim();if(pass)fields.passCode=pass;}const res=await request('getActivities',fields);if(res.status!=='success')throw new Error(res.message||'Unable to load activities.');rows=res.activities||[];cached=rows;}const filtered=filterRows(rows,custom,kind);lastRows=filtered.slice();renderReportResults(filtered,type.value);if(dl)dl.disabled=false;status(`${filtered.length} activity record(s) found.`,'success')}catch(e){status(e.message||'Unable to load activities.','error')}finally{run.disabled=false}};
    type.value=custom?'Detailed':'Abstract';syncPeriodOptions();period.value='This Month';syncDateSortVisibility();
  }
  function filterRows(rows,custom,kind){
    let from=custom?($('actFromDate')?.value||''):'',to=custom?($('actToDate')?.value||''):'';const p=$('actReportPeriod').value,now=new Date();
    if(!custom||(!from&&!to)){if(p==='Today')from=to=today();else if(p==='This Week'){const d=new Date();d.setDate(d.getDate()-((d.getDay()+6)%7));from=fmt(d);const e=new Date(d);e.setDate(e.getDate()+6);to=fmt(e)}else if(p==='This Month'){from=today().slice(0,7)+'-01';to=today()}else if(p==='This Year'){from=now.getFullYear()+'-01-01';to=today()}}
    const start=from?new Date(from+'T00:00:00').getTime():null,end=to?new Date(to+'T23:59:59').getTime():null;const c=$('actFilterCategory').value,s=$('actFilterSub').value,st=$('actFilterStatus').value,pr=$('actFilterPriority').value,q=custom?($('actSearchText')?.value||'').trim().toLowerCase():'',assigned=custom?($('actAssignedTo')?.value||'').trim().toLowerCase():'';
    return rows.filter(r=>{const date=String(r.startDate||r.dueDate||r.createdAt||'').slice(0,10);const time=date?new Date(date+'T12:00:00').getTime():0;if(start!==null&&time<start)return false;if(end!==null&&time>end)return false;if(c&&String(r.category||'')!==c)return false;if(s&&String(r.subCategory||'')!==s)return false;if(st&&String(r.status||'')!==st)return false;if(pr&&String(r.priority||'')!==pr)return false;if(assigned&&!String(r.assignedTo||'').toLowerCase().includes(assigned))return false;if(q&&!`${r.title||''} ${r.category||''} ${r.subCategory||''} ${r.description||''} ${r.tags||''} ${r.status||''} ${r.activityType||''} ${r.assignedTo||''}`.toLowerCase().includes(q))return false;if(kind==='normal'&&sensitiveFlag(r.isSensitive))return false;if(kind==='sensitive'&&!sensitiveFlag(r.isSensitive))return false;return true})
  }
  function renderReportResults(rows,type){rows=rows.slice().sort((a,b)=>{const da=String(a.startDate||a.dueDate||a.createdAt||'').slice(0,10),db=String(b.startDate||b.dueDate||b.createdAt||'').slice(0,10);return dateAscending?da.localeCompare(db):db.localeCompare(da)});const total=rows.length,completed=rows.filter(r=>String(r.status).toLowerCase()==='completed').length,pending=rows.filter(r=>String(r.status).toLowerCase()==='pending').length;let table='';const p=$('actReportPeriod')?.value||'All';
    if(type==='Abstract'){if(['Daily','Weekly','Monthly','Yearly'].includes(p)){const groups={};rows.forEach(r=>{const ds=String(r.startDate||r.dueDate||r.createdAt||'').slice(0,10);let key='Unknown';if(/^\d{4}-\d{2}-\d{2}$/.test(ds)){const d=new Date(ds+'T12:00:00');if(p==='Daily')key=ds;else if(p==='Weekly'){d.setDate(d.getDate()-((d.getDay()+6)%7));key=fmt(d)}else if(p==='Monthly')key=ds.slice(0,7);else key=ds.slice(0,4)}if(!groups[key])groups[key]={count:0,completed:0};groups[key].count++;if(String(r.status).toLowerCase()==='completed')groups[key].completed++});const keys=Object.keys(groups).sort((a,b)=>dateAscending?a.localeCompare(b):b.localeCompare(a));table=`<div class="expense-results"><table><thead><tr><th>S.No</th><th>${esc(p==='Daily'?'Date':p==='Weekly'?'Week Starting':p==='Monthly'?'Month':'Year')}</th><th>Activities</th><th>Completed</th></tr></thead><tbody>${keys.map((k,i)=>`<tr><td>${i+1}</td><td>${esc(k)}</td><td>${groups[k].count}</td><td>${groups[k].completed}</td></tr>`).join('')||'<tr><td colspan="4">No records found.</td></tr>'}</tbody></table></div>`}else{const groups={};rows.forEach(r=>{const c=String(r.category||'Other'),s=String(r.subCategory||'Other');if(!groups[c])groups[c]={count:0,completed:0,subs:{}};groups[c].count++;if(String(r.status).toLowerCase()==='completed')groups[c].completed++;if(!groups[c].subs[s])groups[c].subs[s]=0;groups[c].subs[s]++});let i=0;const body=Object.keys(groups).sort().map(c=>{const idx=i++,g=groups[c],subRows=Object.keys(g.subs).sort().map(s=>`<tr class="activity-abstract-subrow" data-parent="${idx}" hidden><td style="padding-left:28px">↳ ${esc(s)}</td><td>${g.subs[s]}</td><td>—</td></tr>`).join('');return `<tr class="activity-abstract-parent" data-index="${idx}" tabindex="0" role="button" aria-expanded="false" style="cursor:pointer"><td><span class="activity-toggle">＋</span> ${esc(c)}</td><td>${g.count}</td><td>${g.completed}</td></tr>${subRows}`}).join('');table=`<div class="expense-results"><table><thead><tr><th>Category / SubCategory</th><th>Activities</th><th>Completed</th></tr></thead><tbody>${body||'<tr><td colspan="3">No records found.</td></tr>'}</tbody></table></div>`}}
    else{const headers=['Date','Activity Type','Title','Category','SubCategory','Description','Status','Priority','Due Date'];const grouped=rows.map(r=>`<tr><td>${esc(showDate(r.startDate||r.createdAt))}</td><td>${esc(r.activityType||'')}</td><td>${esc(r.title||'')}</td><td>${esc(r.category||'')}</td><td>${esc(r.subCategory||'')}</td><td>${esc(r.description||'')}</td><td>${esc(r.status||'')}</td><td>${esc(r.priority||'')}</td><td>${esc(showDate(r.dueDate))}</td></tr>`).join('');table=`<div class="expense-results"><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${grouped||`<tr><td colspan="${headers.length}">No records found.</td></tr>`}</tbody></table></div>`}
    const heading=`${esc(p)} - ${type==='Detailed'?'Detailed Report':'Abstract'}`;$('actReportOutput').innerHTML=`<h2 class="expense-abstract-title">${heading}</h2><div class="expense-summary"><div class="expense-summary-card"><small>Total Records :</small><strong>${total}</strong></div><div class="expense-summary-card"><small>Completed :</small><strong>${completed}</strong></div><div class="expense-summary-card"><small>Pending :</small><strong>${pending}</strong></div></div>${table}`;
    $('actReportOutput').querySelectorAll('.activity-abstract-parent').forEach(row=>{const toggle=()=>{const idx=row.dataset.index,opening=row.getAttribute('aria-expanded')!=='true';$('actReportOutput').querySelectorAll(`.activity-abstract-subrow[data-parent="${idx}"]`).forEach(r=>r.hidden=!opening);row.setAttribute('aria-expanded',String(opening));const mark=row.querySelector('.activity-toggle');if(mark)mark.textContent=opening?'－':'＋'};row.onclick=toggle;row.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}}});}
  function exportReport(format){const output=$('actReportOutput');if(!output||!output.innerHTML.trim()){status('Press Show Report first.','error');return}const heading=document.querySelector('.activity-page .expense-title')?.textContent||'oneFaMiLe Activities Report';const html=`<!doctype html><html><head><meta charset="utf-8"><title>${esc(heading)}</title><style>body{font-family:Arial,sans-serif;padding:20px;color:#222}table{border-collapse:collapse;width:100%}th,td{border:1px solid #888;padding:6px;text-align:left}.expense-summary{display:flex;gap:12px;margin-bottom:16px}.expense-summary-card{border:1px solid #aaa;padding:10px}</style></head><body><h2>${esc(heading)}</h2>${output.innerHTML}</body></html>`;if(format==='pdf'){const w=window.open('','_blank');if(!w){status('Popup blocked. Allow popups to print/save PDF.','error');return}w.document.open();w.document.write(html);w.document.close();w.focus();setTimeout(()=>w.print(),300);return}const word=format==='word',blob=new Blob([html],{type:(word?'application/msword':'application/vnd.ms-excel')+';charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='oneFaMiLe_Activities_Report.'+(word?'doc':'xls');document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
  function openAbout(){styleOnce();const html=`<div class="expense-panel"><h3 style="margin-top:0;color:#2477c8">About oneFaMiLe Activities</h3><h4>1. Add Activity</h4><p>Record activities with Activity Date, Activity Type, Title, Category, SubCategory, Description, status, priority, due date and optional tags.</p><h4>2. Reports</h4><p>Abstract reports summarize records by Category and SubCategory or by Daily, Weekly, Monthly and Yearly periods. Detailed reports list each activity and its dates, status and priority.</p><h4>3. Custom Search</h4><p>Filter activities by date range, category, subcategory, status, priority, assigned person and search text. Reports can be printed/saved as PDF or downloaded in Word/Excel-compatible format.</p><h4>4. Sensitive Activities</h4><p>Sensitive Reports and All Reports require the Sensitive Pass Code. Ordinary Activities Reports exclude sensitive records.</p><h4>5. Family data</h4><p>Activity records are associated with the selected family and current login session. Check the activity details before saving.</p></div>`;page(shell('About Activities',html));bindBack()}
  function install(){const b=$('activitiesBtn');if(!b){setTimeout(install,250);return}b.onclick=openMenu}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
