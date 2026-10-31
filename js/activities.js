
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
  async function compressActivityPhoto(file){
    const dataUrl = await new Promise((resolve,reject)=>{
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result||''));
      reader.onerror = () => reject(new Error('Unable to read selected photo.'));
      reader.readAsDataURL(file);
    });
    const img = await new Promise((resolve,reject)=>{
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Invalid photo selected.'));
      image.src = dataUrl;
    });
    const maxDimension=1400;
    const scale=Math.min(1,maxDimension/Math.max(img.width,img.height));
    const canvas=document.createElement('canvas');
    canvas.width=Math.max(1,Math.round(img.width*scale));
    canvas.height=Math.max(1,Math.round(img.height*scale));
    const ctx=canvas.getContext('2d');
    if(!ctx)throw new Error('Unable to process selected photo.');
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    let quality=0.75;
    let result=canvas.toDataURL('image/jpeg',quality);
    while(result.length*0.75>250*1024&&quality>0.3){quality-=0.1;result=canvas.toDataURL('image/jpeg',quality)}
    if(result.length*0.75>700*1024)throw new Error('Photo is too large. Please choose a smaller photo.');
    return result;
  }
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
  // Report categories are derived directly from ACTIVITY_CONFIG.
  // Do not depend on the separate Expenses module or a global CATEGORIES variable.
  const reportCategoryKeys = () => [...new Set(Object.values(ACTIVITY_CONFIG).flatMap(group => Object.keys(group)))].sort((a,b)=>a.localeCompare(b,undefined,{sensitivity:'base'}));
  const reportSubCategoryKeys = category => [...new Set(Object.values(ACTIVITY_CONFIG).flatMap(group => category ? (group[category] || []) : Object.values(group).flat()))].sort((a,b)=>a.localeCompare(b,undefined,{sensitivity:'base'}));
  const statusOptions=['Pending','In Progress','On Hold','Completed','Cancelled'];
  const priorityOptions=['Low','Normal','High','Urgent'];
  const repeatOptions=['Does not repeat','Daily','Weekly','Monthly','Yearly','Custom'];
  const categoryKeys = type => Object.keys(ACTIVITY_CONFIG[type] || {'Others':['Other']});
  const subCategoryKeys = (type,category) => (ACTIVITY_CONFIG[type] || {'Others':['Other']})[category] || [];
  const sensitiveFlag = value => value === true || ['true','yes','1','sensitive'].includes(String(value == null ? '' : value).trim().toLowerCase());
  const customChoice = '＋ Custom text…';
  function dropdown(items,placeholder,allowCustom=true){return `<option value="">${esc(placeholder)}</option>${items.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}${allowCustom?`<option value="__custom__">${esc(customChoice)}</option>`:''}`}
  function field(label,id,control,wide=false){return `<div class="expense-field${wide?' wide':''}" data-field="${esc(id)}"><label class="expense-label" for="${esc(id)}">${esc(label)}</label>${control}</div>`}
  function selectField(id,label,items,placeholder,required=false,wide=false,allowCustom=true){return field(label,id,`<select id="${id}" name="${id}"${required?' required':''}>${dropdown(items,placeholder,allowCustom)}</select>${allowCustom?`<input id="${id}Custom" class="activity-custom-input" type="text" placeholder="Type a custom value" aria-label="Custom ${esc(label)}" hidden>`:''}`,wide)}
  let cached=[], lastRows=[], dateAscending=true, activeAccess='normal', reportSettings=null;
  function options(items,placeholder='Select',preserve=false){const list=preserve?items.slice():items.slice().sort((a,b)=>String(a).localeCompare(String(b),undefined,{sensitivity:'base'}));return `<option value="">${esc(placeholder)}</option>`+list.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}
  // Report Type and Report Period are mandatory selections, so do not show a blank placeholder option.
  function reportChoiceOptions(items,selected=''){return items.map(x=>`<option value="${esc(x)}"${x===selected?' selected':''}>${esc(x)}</option>`).join('')}
  function page(html){if(typeof window.showPage==='function')window.showPage(html);else{const el=$('homeContent')||$('pageContent')||$('mainContent');if(el)el.innerHTML=html}}
  function title(text){return typeof window.pageTitle==='function'?window.pageTitle(text,'images/colorbtns/Activities1.png'):`<h2 class="page-title">${esc(text)}</h2>`}
  function shell(text,inner,inside=false){return `<div class="expense-page activity-page"><h2 class="expense-title">${esc(text)}</h2>${inner}${inside?'':'<div class="expense-actions"><button type="button" class="expense-secondary" id="activityModuleBack">← Back</button></div>'}</div>`}
  function backToMenu(){try{openMenu();return}catch(e){console.warn('Activities menu navigation failed',e)}const b=$('activitiesBtn');if(b)b.click();else if(typeof window.showHome==='function')window.showHome()}
  function bindBack(){const b=$('activityModuleBack');if(b)b.onclick=backToMenu}
  function status(message,type=''){const el=$('activityStatus');if(el){el.textContent=message||'';el.className='expense-status '+type}}
  // Fixed toast for Add Activity save/validation messages. It overlays the page
  // instead of taking layout space, so the Save / Reset / Back buttons do not move.
  function activityToast(message,type='info',duration=3200){
    let el=$('activityToast');
    if(!el){el=document.createElement('div');el.id='activityToast';el.setAttribute('role','status');el.setAttribute('aria-live','polite');document.body.appendChild(el);}
    clearTimeout(window.activityToastTimer);
    clearTimeout(window.activityToastHideTimer);
    const bg=type==='success'?'#218838':type==='error'?'#b42318':type==='warning'?'#9a6700':'#2d5274';
    el.textContent=message||'';
    el.style.cssText=`position:fixed;top:calc(env(safe-area-inset-top, 0px) + 16px);left:50%;transform:translateX(-50%);z-index:2147483647;max-width:calc(100vw - 28px);width:max-content;box-sizing:border-box;padding:11px 17px;border-radius:10px;background:${bg};color:#fff;box-shadow:0 4px 14px rgba(0,0,0,.22);font-size:14px;font-weight:600;text-align:center;line-height:1.35;white-space:normal;opacity:1;display:block;pointer-events:none;transition:opacity .25s ease`;
         window.activityToastTimer=setTimeout(()=>{
       if(el){
         el.style.opacity='0';
         window.activityToastHideTimer=setTimeout(()=>{if(el.style.opacity==='0')el.style.display='none'},260);
       }
     },duration);
  }
  function styleOnce(){if($('activityReportStyles'))return;const st=document.createElement('style');st.id='activityReportStyles';st.textContent=`
    .activity-page{max-width:1100px;margin:0 auto}.activity-page .expense-panel{padding:12px;background:#f0f7ff;border:1px solid #c4d4ff;border-radius:14px;box-sizing:border-box}
    .activity-page .expense-filter-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;align-items:start}
    .activity-page .activity-fields-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important;align-items:start}
    .activity-page .activity-fields-grid>[data-field="activityType"]{grid-column:auto!important}
    .activity-page .activity-fields-grid>[data-field="activityPhotos"]{grid-column:1/-1!important;min-width:0;width:100%;box-sizing:border-box}
    .activity-page .activity-photo-picker{display:flex;align-items:center;gap:7px;flex-wrap:nowrap;width:100%;min-width:0;box-sizing:border-box}
    .activity-page .activity-photo-picker button{height:40px;min-height:40px;max-height:40px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;padding:0 8px;border:1px solid #9bb9d4;border-radius:8px;background:#fff;color:#2477c8;font-weight:600;flex:0 0 auto}
    .activity-page .activity-photo-picker #activityPhotoChooseBtn{width:72px;min-width:72px}
    .activity-page .activity-photo-picker .activity-photo-slot{width:46px;min-width:46px;height:40px;min-height:40px;max-height:40px}
    .activity-page .activity-photo-picker .activity-photo-slot.has-photo{background:#d9f2df;border-color:#218838;color:#218838}
    .activity-page .activity-photo-count{display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1 1 76px;min-width:76px;max-width:100%;margin:0 0 0 auto;color:#526b80;font-size:clamp(9px,2.7vw,12px);line-height:1.15;text-align:center;white-space:normal;overflow-wrap:normal;box-sizing:border-box}
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
    .activity-page .expense-results{width:100%;max-width:100%;overflow-x:auto;overflow-y:visible;margin-top:8px;-webkit-overflow-scrolling:touch}.activity-page .expense-results table{width:max-content;min-width:100%;table-layout:auto;border-collapse:collapse;background:#fff;font-size:13px}.activity-page .expense-results th,.activity-page .expense-results td{border:1px solid #c4d4ff;padding:7px 8px;text-align:left;vertical-align:top;white-space:normal;word-break:normal;overflow-wrap:break-word;min-width:95px;max-width:220px}.activity-page .expense-results th{white-space:normal}.activity-page .expense-results th:nth-child(7),.activity-page .expense-results td:nth-child(7){min-width:150px;max-width:300px}
    .activity-page .expense-results th.report-center,.activity-page .expense-results td.report-center{text-align:center!important;vertical-align:middle!important;width:1%;min-width:58px;max-width:108px;padding:6px 4px;white-space:normal;overflow-wrap:anywhere}
    .activity-page .expense-results th.report-center:nth-child(4),.activity-page .expense-results td.report-center:nth-child(4),.activity-page .expense-results th.report-center:nth-child(11),.activity-page .expense-results td.report-center:nth-child(11){min-width:76px;max-width:92px}
    .activity-page .expense-results th.report-center:nth-child(5),.activity-page .expense-results td.report-center:nth-child(5),.activity-page .expense-results th.report-center:nth-child(12),.activity-page .expense-results td.report-center:nth-child(12){min-width:62px;max-width:78px}
    .activity-page .expense-results th{background:#dce7ff;color:#2d5274;position:sticky;top:0}.activity-page .expense-report-subheading th{background:#fff!important;text-align:left;border-top:1px solid #c4d4ff;border-bottom:1px solid #c4d4ff;color:#2d5274}
    .activity-page .expense-report-year th{font-size:22px!important;font-weight:700;padding:10px 8px;background:#fff!important;color:#218838!important}.activity-page .expense-report-month th{font-size:16px!important;font-weight:700;padding:8px;background:#fff!important;color:#e67e22!important}
    .activity-page .expense-report-total td{font-weight:700;background:#fff!important;border-top:1px solid #c4d4ff}.activity-page .expense-abstract-title{font-size:23px;text-align:center;color:#3477b7;margin:10px 0 8px;font-weight:700}
    .activity-page .expense-abstract-heading{font-size:18px;font-weight:700;color:#e67e22;margin:8px 0;padding:8px;border-bottom:1px solid #c4d4ff}
    .activity-page .expense-summary{display:flex;align-items:center;gap:8px;width:100%;margin:10px 0 14px;box-sizing:border-box;flex-wrap:nowrap}.activity-page .expense-summary-card{display:flex;align-items:center;justify-content:center;gap:5px;white-space:nowrap;min-width:0;min-height:44px;box-sizing:border-box;padding:9px 8px;border:1px solid #c4d4ff;border-radius:8px;flex:1 1 50%;width:50%;line-height:1.2}.activity-page .expense-summary-card small,.activity-page .expense-summary-card strong{display:inline-flex;align-items:center;line-height:1.2}.activity-page .expense-summary-card small{font-size:clamp(9px,2.6vw,12px)}.activity-page .expense-summary-card strong{font-size:clamp(10px,2.9vw,14px)}
    .activity-page .activity-date-sort-field .expense-date-sort{display:flex;align-items:center;justify-content:center;width:100%;min-width:0;max-width:100%;height:40px;min-height:40px;max-height:40px;box-sizing:border-box;padding:8px 10px;border:1px solid #9bb9d4;border-radius:8px;background:#fff;color:#222;font:inherit;white-space:nowrap;box-shadow:none}
    .activity-page #activityDownloadBtn,.activity-page #activityReportBack,.activity-page #activityModuleBack{background:transparent!important;background-color:transparent!important;color:#2477c8!important;border:1.5px solid #2477c8!important;box-shadow:none!important}
.activity-page .expense-panel:has(#activityDownloadBtn) .expense-report-actions{display:flex!important;align-items:stretch!important;gap:8px!important;width:100%!important;box-sizing:border-box!important}
.activity-page .expense-panel:has(#activityDownloadBtn) .expense-report-actions>.expense-download-wrap,.activity-page .expense-panel:has(#activityDownloadBtn) .expense-report-actions>button{flex:1 1 0!important;width:0!important;min-width:0!important;max-width:none!important;box-sizing:border-box!important}
.activity-page .expense-panel:has(#activityDownloadBtn) .expense-report-actions>.expense-download-wrap>button{display:block!important;width:100%!important;min-width:0!important;box-sizing:border-box!important}.activity-page .expense-status{margin:8px 0;white-space:pre-wrap}.activity-page .expense-panel .expense-actions:has(#activityVerifyPass){display:flex!important;justify-content:center!important;align-items:center!important;gap:16px!important;width:100%!important;text-align:center!important}.activity-page #activityVerifyPass,.activity-page #activityModuleBack{flex:0 0 140px!important;min-width:140px!important;max-width:140px!important}
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
    .activity-page .activity-reminder-grid .expense-label{white-space:normal!important}
    .activity-page .activity-fields-grid>[data-field="reminderFields"]{margin-top:0!important;align-items:start!important}

    /* Report refinements: fixed scroll viewport, centered two-line headers, and report-page date sort */
    .activity-page .expense-results{max-height:55vh!important;overflow:auto!important;overscroll-behavior:contain}
    /* Detailed Activities: remove the real gap above the table; do not overlap margins. */
    .activity-page.activity-report-detailed .expense-results{margin-top:0!important;overflow-x:auto!important;overflow-y:auto!important;position:relative!important;isolation:isolate!important}
    .activity-page.activity-report-detailed #actReportOutput>.expense-summary{margin-bottom:0!important;padding-bottom:0!important}
    .activity-page.activity-report-detailed #actReportOutput>.expense-results{margin-top:0!important;padding-top:0!important}
    .activity-page.activity-report-detailed #actReportOutput>.expense-results table{margin:0!important;border-spacing:0!important}
    .activity-page.activity-report-detailed #actReportOutput>.expense-results table thead th{position:sticky!important;top:0!important;z-index:100!important;background:#dce7ff!important;background-color:#dce7ff!important;background-clip:border-box!important}
    .activity-page .expense-results table th{height:58px;box-sizing:border-box;vertical-align:middle!important;text-align:center!important;line-height:1.15;overflow-wrap:normal;word-break:normal;min-width:76px;max-width:112px;padding:6px 5px}.activity-page .expense-results table th:nth-child(11){min-width:92px;max-width:96px}.activity-page .expense-results table th:nth-child(12),.activity-page .expense-results table th:nth-child(13){min-width:82px;max-width:92px}
    .activity-page .expense-results th.report-center,.activity-page .expense-results td.report-center{vertical-align:middle!important}
    .activity-page .expense-results td.report-vcenter{vertical-align:middle!important}
    .activity-page .expense-results .activity-abstract-center{text-align:center!important;vertical-align:middle!important}
    /* Abstract date-grouped reports: compact S.No, Year, Month and No columns. */
    .activity-page.activity-report-abstract .expense-results th.activity-abstract-col-sno,.activity-page.activity-report-abstract .expense-results td.activity-abstract-col-sno{width:1%!important;min-width:42px!important;max-width:50px!important;padding-left:4px!important;padding-right:4px!important;white-space:nowrap!important}
    .activity-page.activity-report-abstract .expense-results th.activity-abstract-col-year,.activity-page.activity-report-abstract .expense-results td.activity-abstract-col-year{width:1%!important;min-width:56px!important;max-width:66px!important;padding-left:5px!important;padding-right:5px!important;white-space:nowrap!important}
    .activity-page.activity-report-abstract .expense-results th.activity-abstract-col-month,.activity-page.activity-report-abstract .expense-results td.activity-abstract-col-month{width:1%!important;min-width:78px!important;max-width:100px!important;padding-left:5px!important;padding-right:5px!important;white-space:nowrap!important}
    .activity-page.activity-report-abstract .expense-results th.activity-abstract-col-no,.activity-page.activity-report-abstract .expense-results td.activity-abstract-col-no{width:1%!important;min-width:48px!important;max-width:58px!important;padding-left:4px!important;padding-right:4px!important;white-space:nowrap!important}
    /* Detailed report column widths: compact S.No/Edit, readable Status and two-line Scheduled Time. */
    .activity-page .expense-results th.report-sno,.activity-page .expense-results td.report-sno{width:36px!important;min-width:36px!important;max-width:36px!important;padding:4px 2px!important;white-space:nowrap!important;text-align:center!important;overflow-wrap:normal!important}
    .activity-page .expense-results th.report-status,.activity-page .expense-results td.report-status{width:96px!important;min-width:96px!important;max-width:108px!important;white-space:nowrap!important;text-align:center!important;overflow-wrap:normal!important}
    .activity-page .expense-results th.report-scheduled-date,.activity-page .expense-results td.report-scheduled-date{width:76px!important;min-width:76px!important;max-width:84px!important;text-align:center!important}
    .activity-page .expense-results th.report-scheduled-time,.activity-page .expense-results td.report-scheduled-time{width:82px!important;min-width:82px!important;max-width:88px!important;text-align:center!important;white-space:nowrap!important}
    .activity-page .expense-results th.report-edit-cell,.activity-page .expense-results td.report-edit-cell{width:48px!important;min-width:48px!important;max-width:48px!important;padding:4px 2px!important;text-align:center!important;vertical-align:middle!important;white-space:nowrap!important}
    .activity-page .expense-results .activity-edit-text{display:inline-block!important;width:100%!important;min-width:0!important;padding:2px 0!important;margin:0!important;border:0!important;border-radius:0!important;background:transparent!important;color:#2477c8!important;box-shadow:none!important;font:inherit!important;font-weight:600!important;text-align:center!important;text-decoration:none!important;white-space:nowrap!important;cursor:pointer!important}
    .activity-page .expense-results table thead th{height:48px!important;min-height:48px!important;padding:4px 5px!important;line-height:1.05!important;vertical-align:middle!important}
    .activity-page .expense-summary-card{justify-content:center!important;gap:4px!important;white-space:nowrap!important}
    .activity-page .expense-summary-card small,.activity-page .expense-summary-card strong{white-space:nowrap!important}
    .activity-page .activity-date-sort-field{display:none!important}
    .activity-page #activityReportDateSort{width:100%;margin:0 0 10px;padding:8px 10px;border:1.5px solid #2477c8;border-radius:8px;background:transparent;color:#2477c8;font-weight:700}
    .activity-page.activity-report-abstract #activityReportDateSort{display:none!important}

    /* Report page only: reduce the large gap before the single report title. */
    .activity-page.activity-report-view>.expense-title{margin-top:-70px!important;margin-bottom:12px!important;padding-top:0!important}
    /* Download, Date Order, and Back remain in one row with equal widths. */
    .activity-page .expense-panel:has(#activityReportDateSort) .expense-report-actions{display:flex!important;align-items:stretch!important;justify-content:space-between!important;gap:8px!important;flex-wrap:nowrap!important;width:100%!important;box-sizing:border-box!important}
    .activity-page .expense-panel:has(#activityReportDateSort) .expense-report-actions>.expense-download-wrap,
    .activity-page .expense-panel:has(#activityReportDateSort) .expense-report-actions>button{flex:1 1 0!important;width:0!important;min-width:0!important;max-width:none!important;box-sizing:border-box!important}
    .activity-page .expense-panel:has(#activityReportDateSort) .expense-report-actions>.expense-download-wrap>button{display:block!important;width:100%!important;min-width:0!important;box-sizing:border-box!important}
    .activity-page #activityReportDateSort{margin:0!important;min-width:0!important;max-width:none!important;box-sizing:border-box!important;white-space:nowrap!important;padding:8px 4px!important;font-size:12px!important;flex:1 1 0!important}
    /* Add Activity: keep Save, Reset and Back equal-width inside the form panel. */
    .activity-page #activityForm{width:100%!important;min-width:0!important;max-width:100%!important;box-sizing:border-box!important}
    .activity-page #activityForm .expense-actions{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;align-items:stretch!important;justify-content:stretch!important;gap:8px!important;width:100%!important;min-width:0!important;max-width:100%!important;margin:12px 0 0!important;padding:0!important;position:static!important;box-sizing:border-box!important}
    .activity-page #activityForm .expense-actions>button{display:flex!important;align-items:center!important;justify-content:center!important;flex:initial!important;width:100%!important;min-width:0!important;max-width:100%!important;margin:0!important;padding:10px 3px!important;white-space:nowrap!important;box-sizing:border-box!important;font-size:clamp(12px,3.2vw,16px)!important}
    /* Compact the three report summary cards and remove excess top gap. */
    .activity-page .expense-summary{margin:2px 0 9px!important;gap:6px!important}
    .activity-page #actReportOutput>.expense-summary{margin-top:0!important}
    .activity-page .expense-summary-card{height:auto!important;min-height:38px!important;padding:5px 4px!important;gap:3px!important;line-height:1.1!important}
    .activity-page .expense-summary-card small{font-size:clamp(8px,2.4vw,11px)!important;white-space:nowrap!important}
    .activity-page .expense-summary-card strong{font-size:clamp(10px,2.7vw,13px)!important;white-space:nowrap!important}
    /* Reset remains transparent with a blue outline, matching the secondary action style. */
    .activity-page #activityResetBtn{background:transparent!important;background-color:transparent!important;color:#2477c8!important;border:1.5px solid #2477c8!important;box-shadow:none!important}
    /* Place the Reminder selector below Status, in the left column. */
    .activity-page .activity-fields-grid>[data-field="reminderEnabled"]{grid-column:1!important}
  `;document.head.appendChild(st)}
  function openMenu(){const btn=$('activitiesBtn');if(!btn)return;if(typeof window.updateMenuIcon==='function')window.updateMenuIcon();if(typeof window.setActiveButton==='function')window.setActiveButton(btn);page(title('Activities')+`<div class="grid-3x2">
    <button class="grid-btn" id="activityAddBtn"><img src="images/colorbtns/Add1.png" class="btn-icon"><span>Add Activity</span></button>
    <button class="grid-btn" id="activityReportsBtn"><img src="images/colorbtns/Reports1.png" class="btn-icon"><span>Reports</span></button>
    <button class="grid-btn" id="activitySensitiveBtn"><img src="images/colorbtns/SensitiveReports1.png" class="btn-icon"><span>Sensitive Reports</span></button>
    <button class="grid-btn" id="activityAllBtn"><img src="images/colorbtns/AllReports1.png" class="btn-icon"><span>All Reports</span></button>
    <button class="grid-btn" id="activityCustomBtn"><img src="images/colorbtns/CustomSearch1.png" class="btn-icon"><span>Custom Search</span></button>
    <button class="grid-btn" id="activityAboutBtn"><img src="images/colorbtns/About1.png" class="btn-icon"><span>About</span></button></div><div style="text-align:center"><button class="back-btn" id="activityHomeBack">← Back</button></div>`);
    $('activityAddBtn').onclick=()=>openForm(null);$('activityReportsBtn').onclick=()=>renderReports('normal',false);$('activitySensitiveBtn').onclick=()=>sensitiveGate('sensitive');$('activityAllBtn').onclick=()=>sensitiveGate('all');$('activityCustomBtn').onclick=()=>renderReports('normal',true);$('activityAboutBtn').onclick=openAbout;$('activityHomeBack').onclick=()=>{const b=$('homeBtn');if(b)b.click();else if(typeof window.showHome==='function')window.showHome()};}
  function openForm(editRecord=null){
    styleOnce();
    const typeItems=Object.keys(ACTIVITY_CONFIG).filter(x=>x!=='Reminder');
    const inner=`<div class="expense-panel"><form id="activityForm" class="expense-form" autocomplete="off">
      <div class="expense-filter-grid activity-fields-grid" id="activityFieldsGrid">
      ${selectField('activityType','Activity Type',typeItems,'Select Type',true,false,false)}
      ${selectField('category','Category',[],'Select Activity Type first',true,false,false)}
      ${selectField('subCategory','Sub Category',[],'Select Category first',true,false,false)}
      ${field('Scheduled Date *','startDate','<input id="startDate" name="startDate" type="date" value="'+today()+'" required>')}
      ${field('Schedule Time','startTime','<input id="startTime" name="startTime" type="time">')}
      ${field('Photos','activityPhotos',`<div class="activity-photo-picker"><button type="button" id="activityPhotoChooseBtn" class="expense-secondary">Photo</button><button type="button" class="activity-photo-slot" id="activityPhotoSlot1" aria-label="Choose photo 1">1</button><button type="button" class="activity-photo-slot" id="activityPhotoSlot2" aria-label="Choose photo 2">2</button><button type="button" class="activity-photo-slot" id="activityPhotoSlot3" aria-label="Choose photo 3">3</button><small id="activityPhotoCount" class="activity-photo-count"><span>0 photos selected</span><span>(Maximum 3)</span></small><input id="activityPhotosFile" type="file" accept="image/*" multiple hidden></div>`,true)}
      ${field('Description','description','<textarea id="description" name="description" rows="2" maxlength="2000" placeholder="Enter details"></textarea>')}
      ${field('Status','status','<select id="status" name="status"><option value="Pending">Pending</option><option value="In Progress">In Progress</option><option value="On Hold">On Hold</option><option value="Completed">Completed</option><option value="Cancelled">Cancelled</option><option value="Not Necessary">Not Necessary</option></select>')}
      ${field('Reminder','reminderEnabled','<select id="reminderEnabled" name="reminderEnabled"><option value="false" selected>No</option><option value="true">Yes</option></select>')}
      <div class="expense-filter-grid activity-reminder-grid" data-field="reminderFields" hidden>
      ${field('Reminder Repeat','reminderRepeat','<select id="reminderRepeat" name="reminderRepeat"><option value="Once" selected>Once</option><option value="Daily">Daily</option><option value="Weekly">Weekly</option><option value="Monthly">Monthly</option><option value="Yearly">Yearly</option></select>')}
      ${field('Reminder Date *','reminderDate','<input id="reminderDate" name="reminderDate" type="date">')}
      ${field('Reminder Time *','reminderTime','<input id="reminderTime" name="reminderTime" type="time">')}</div>
      ${field('Venue','venue','<input id="venue" name="venue" placeholder="Venue">')}
      ${field('Location / Link','locationLink','<input id="locationLink" name="locationLink" placeholder="Address or meeting link">')}
      ${field('Person / Doctor / Office','appointmentPerson','<input id="appointmentPerson" name="appointmentPerson" placeholder="Name">')}
      ${field('Follow-up Date','followUpDate','<input id="followUpDate" name="followUpDate" type="date">')}
      ${field('Assigned To','assignedTo','<input id="assignedTo" name="assignedTo" placeholder="Family member / Self">')}
      ${selectField('priority','Priority',priorityOptions,'Select Priority')}
      ${field('Completed Date','completedDate','<input id="completedDate" name="completedDate" type="date">')}
      <input type="hidden" id="title" name="title" value="">
      </div>
      <div class="activity-sensitive-line"><label for="isSensitive"><input id="isSensitive" name="isSensitive" type="checkbox" value="true"> Sensitive</label></div>
      <div id="activityStatus" class="expense-status" role="status" aria-live="polite"></div><div class="expense-actions"><button type="submit" id="activitySaveBtn" class="expense-primary">Save</button><button type="reset" id="activityResetBtn" class="expense-secondary">Reset</button><button type="button" id="activityModuleBack" class="expense-secondary">← Back</button></div>
    </form></div>`;
    page(shell(editRecord?'Edit Activity':'Add Activity',inner,true));bindBack();
    if($('activitySaveBtn'))$('activitySaveBtn').textContent=editRecord?'Update':'Save';
    const form=$('activityForm'),type=$('activityType'),cat=$('category'),sub=$('subCategory');
    const activityPhotoInput=$('activityPhotosFile');
    let selectedActivityPhotos=[null,null,null];
    let activeActivityPhotoSlot=0;
    function updateActivityPhotoSlots(){
      let count=0;
      selectedActivityPhotos.forEach((file,index)=>{
        const slot=$('activityPhotoSlot'+(index+1));
        if(!slot)return;
        if(file){count++;slot.textContent='✓';slot.title=file.name;slot.classList.add('has-photo')}
        else{slot.textContent=String(index+1);slot.title='Choose photo '+(index+1);slot.classList.remove('has-photo')}
      });
      const countLabel=$('activityPhotoCount');
      if(countLabel)countLabel.innerHTML='<span>'+count+' photo(s) selected</span><span>(Maximum 3)</span>';
    }
    function openActivityPhotoPicker(slotIndex){
      activeActivityPhotoSlot=slotIndex;
      if(activityPhotoInput){activityPhotoInput.value='';activityPhotoInput.click()}
    }
    $('activityPhotoChooseBtn').onclick=()=>{
      const nextSlot=selectedActivityPhotos.findIndex(file=>!file);
      if(nextSlot<0){activityToast('Maximum 3 photos can be selected.','warning');return}
      openActivityPhotoPicker(nextSlot);
    };
    [1,2,3].forEach(number=>{
      const slot=$('activityPhotoSlot'+number);
      if(slot)slot.onclick=()=>openActivityPhotoPicker(number-1);
    });
    if(activityPhotoInput){
      activityPhotoInput.addEventListener('change',()=>{
        const files=Array.from(activityPhotoInput.files||[]);
        if(!files.length)return;
        if(files.some(file=>!file.type||!file.type.startsWith('image/'))){activityToast('Please select image files only.','error');activityPhotoInput.value='';return}
        if(files.length>3-activeActivityPhotoSlot){activityToast('You can select up to 3 photos.','warning');activityPhotoInput.value='';return}
        files.forEach((file,index)=>{selectedActivityPhotos[activeActivityPhotoSlot+index]=file});
        updateActivityPhotoSlots();activityPhotoInput.value='';
      });
    }
    updateActivityPhotoSlots();
    function val(id){const el=$(id);if(!el)return '';if(el.value==='__custom__')return ($(`${id}Custom`)?.value||'').trim();return el.value}
    function customToggle(id){const sel=$(id),inp=$(id+'Custom');if(!sel||!inp)return;const sync=()=>{inp.hidden=sel.value!=='__custom__';inp.required=sel.value==='__custom__';if(!inp.hidden)inp.focus()};sel.addEventListener('change',sync);sync()}
    function updateSub(){const old=val('subCategory');const custom=$('subCategoryCustom');if(custom){custom.value='';custom.hidden=true;custom.required=false}sub.innerHTML=dropdown(subCategoryKeys(val('activityType'),val('category')),'Select Sub Category',false);if(subCategoryKeys(val('activityType'),val('category')).includes(old))sub.value=old;}
    function updateCat(){const old=val('category');const custom=$('categoryCustom');if(custom){custom.value='';custom.hidden=true;custom.required=false}cat.innerHTML=dropdown(categoryKeys(val('activityType')),'Select Category',false);if(categoryKeys(val('activityType')).includes(old))cat.value=old;updateSub()}
    function isDaily(t){return t==='Daily Activity'}
    function show(id,yes){const el=document.querySelector(`[data-field="${id}"]`);if(el)el.hidden=!yes}
    // Reorder direct form fields safely. This helper was missing, which caused
    // updateVisibility() to throw before the Save handler could be attached.
    function arrangeActivityFields(order){
      const grid=$('activityFieldsGrid');
      if(!grid)return;
      const children=Array.from(grid.children);
      const fields=children.filter(el=>el.hasAttribute('data-field'));
      const byName=new Map(fields.map(el=>[el.getAttribute('data-field'),el]));
      order.forEach(name=>{
        const el=byName.get(name);
        if(el){grid.appendChild(el);byName.delete(name);}
      });
      // Keep any additional fields in their original order after the requested ones.
      fields.forEach(el=>{if(byName.has(el.getAttribute('data-field'))){grid.appendChild(el);byName.delete(el.getAttribute('data-field'));}});
    }
    function updateVisibility(){
      const t=val('activityType'),task=t==='Task',event=t==='Event',meeting=t==='Meeting',appt=t==='Appointment',reminderOn=val('reminderEnabled')==='true';
      // These six fields are common to every activity type and always occupy
      // the first three rows: Type + Description, Category + Sub Category,
      // Scheduled Date + Scheduled Time.
      show('startTime',true);
      show('assignedTo',task);show('priority',task);show('status',true);show('completedDate',val('status')==='Completed');
      show('venue',event);show('locationLink',meeting||appt);show('appointmentPerson',appt);show('followUpDate',appt);
      const reminderGrid=document.querySelector('[data-field="reminderFields"]');if(reminderGrid)reminderGrid.hidden=!reminderOn;
      const reminderField=document.querySelector('[data-field="reminderEnabled"]');
      if(reminderField)reminderField.style.gridColumn='1';
      const follow=$('[data-field="followUpDate"]');if(follow)follow.style.gridColumn='auto';
      const extraOrder=['status'];
      // When an activity is completed, place Completed Date in the second
      // grid column directly to the right of Status.
      if(val('status')==='Completed')extraOrder.push('completedDate');
      extraOrder.push('reminderEnabled','reminderFields');
      if(event)extraOrder.push('venue');
      if(meeting||appt)extraOrder.push('locationLink');
      if(appt)extraOrder.push('appointmentPerson','followUpDate');
      if(task)extraOrder.push('assignedTo','priority');
      arrangeActivityFields(['activityType','description','category','subCategory','startDate','startTime','activityPhotos',...extraOrder]);
      // Keep the backend title field populated for compatibility.
      if($('title'))$('title').value=val('subCategory')||val('category')||t||'Activity';
    }
    [type,cat,sub,$('priority'),$('status')].forEach(el=>{if(el)customToggle(el.id)});
    // Cascade refresh: changing a parent selection clears every field after it,
    // while preserving the parent selections that the user just made.
    const cascadeOrder=['activityType','category','subCategory','startDate','startTime','description','status','reminderEnabled','reminderRepeat','reminderDate','reminderTime','venue','locationLink','appointmentPerson','followUpDate','assignedTo','priority','completedDate'];
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
      if($('startDate')&&!$('startDate').value)$('startDate').value=today();
      if($('isSensitive'))$('isSensitive').checked=false;
    }
    type.addEventListener('change',()=>{refreshFieldsAfter('activityType');updateCat();updateVisibility()});
    cat.addEventListener('change',()=>{refreshFieldsAfter('category');updateSub();updateVisibility()});
    sub.addEventListener('change',()=>{refreshFieldsAfter('subCategory');updateVisibility()});
    $('reminderEnabled').addEventListener('change',()=>{syncReminderRequired();updateVisibility()});$('status').addEventListener('change',updateVisibility);
    const reminderDateInput=$('reminderDate'),reminderTimeInput=$('reminderTime');
    function syncReminderConstraints(){
      const todayValue=today();
      if(reminderDateInput)reminderDateInput.min=todayValue;
      if(reminderTimeInput){
        if(reminderDateInput&&reminderDateInput.value===todayValue){
          const now=new Date();
          reminderTimeInput.min=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
        }else reminderTimeInput.removeAttribute('min');
      }
    }
    function syncReminderRequired(){const enabled=$('reminderEnabled').value==='true';['reminderDate','reminderTime'].forEach(id=>{const el=$(id);if(el)el.required=enabled});const dateLabel=document.querySelector('[data-field="reminderDate"] .expense-label');const timeLabel=document.querySelector('[data-field="reminderTime"] .expense-label');if(dateLabel)dateLabel.textContent=enabled?'Reminder Date *':'Reminder Date';if(timeLabel)timeLabel.textContent=enabled?'Reminder Time *':'Reminder Time';syncReminderConstraints()}
    if(reminderDateInput){reminderDateInput.addEventListener('input',syncReminderConstraints);reminderDateInput.addEventListener('change',syncReminderConstraints)}
    if(reminderTimeInput){reminderTimeInput.addEventListener('input',syncReminderConstraints);reminderTimeInput.addEventListener('change',syncReminderConstraints)}
    updateCat();$('reminderEnabled').value='false';$('status').value='Pending';$('priority').value='Normal';syncReminderRequired();updateVisibility();
    function resetForm(){form.reset();selectedActivityPhotos=[null,null,null];if(activityPhotoInput)activityPhotoInput.value='';updateActivityPhotoSlots();$('startDate').value=today();$('status').value='Pending';$('priority').value='Normal';$('reminderEnabled').value='false';document.querySelectorAll('.activity-custom-input').forEach(e=>{e.value='';e.hidden=true;e.required=false});updateCat();syncReminderRequired();updateVisibility();status('')}
    if(editRecord){
      const put=(id,value)=>{const el=$(id);if(!el)return;const text=String(value==null?'':value);if(el.tagName==='SELECT'&&text&&!Array.from(el.options).some(o=>o.value===text))el.add(new Option(text,text));el.value=text;};
      put('activityType',editRecord.activityType||'General');updateCat();
      put('category',editRecord.category||'Others');updateSub();put('subCategory',editRecord.subCategory||'Others');
      ['startDate','startTime','description','status','reminderRepeat','reminderDate','reminderTime','venue','locationLink','appointmentPerson','followUpDate','assignedTo','priority','completedDate'].forEach(id=>put(id,editRecord[id]||''));
      put('reminderEnabled',editRecord.reminderEnabled?'true':'false');
      $('isSensitive').checked=sensitiveFlag(editRecord.isSensitive);
      // Keep the original photo selection counter wording while editing.
      updateActivityPhotoSlots();
      syncReminderRequired();updateVisibility();
    }
    form.onsubmit=async ev=>{ev.preventDefault();if(!family().familyId){activityToast('Current family was not found. Please open your family and try again.','error');return}if(!token()){activityToast('Login session expired. Please login again.','error');return}
      const activityType=val('activityType'),category=val('category'),subCategory=val('subCategory');if(!activityType||!category||!subCategory){activityToast('Activity Type, Category and Sub Category are required.','error');return}if(!$('startDate').value){activityToast('Scheduled Date is required.','error');$('startDate').focus();return}
      if($('reminderEnabled').value==='true'){
        const reminderDateValue=reminderDateInput?.value||'',reminderTimeValue=reminderTimeInput?.value||'';
        if(!reminderDateValue||!reminderTimeValue){activityToast('Reminder Date and Reminder Time are required when Reminder is Yes.','error');const missing=!reminderDateValue?reminderDateInput:reminderTimeInput;missing?.focus();return}
        if(reminderDateValue<today()){activityToast('Reminder Date must be today or a future date.','error');reminderDateInput?.focus();return}
        const reminderDateTime=new Date(reminderDateValue+'T'+reminderTimeValue+':00');
        if(!Number.isFinite(reminderDateTime.getTime())||reminderDateTime.getTime()<=Date.now()){activityToast('Reminder time must be in the future. Please select a later date or time.','error');reminderTimeInput?.focus();return}
      }
      if($('title'))$('title').value=val('subCategory')||val('category')||activityType||'Activity';
      const btn=$('activitySaveBtn');btn.disabled=true;btn.textContent='Saving…';try{const fd=new FormData(form),fields={};for(const [k,v] of fd.entries())fields[k]=String(v);
        ['activityType','category','subCategory','status','priority','reminderRepeat','reminderEnabled'].forEach(id=>{if($(id))fields[id]=val(id)});fields.activityType=activityType;fields.category=category;fields.subCategory=subCategory;fields.isSensitive=$('isSensitive').checked?'true':'false';
        for(let i=0;i<3;i++)fields['photo'+(i+1)+'Data']=selectedActivityPhotos[i]?await compressActivityPhoto(selectedActivityPhotos[i]):'';
        if(editRecord)fields.activityId=String(editRecord.activityId||'');
        const res=await request(editRecord?'updateActivity':'saveActivity',fields);if(res.status!=='success')throw new Error(res.message||'Unable to save activity.');
        if(editRecord){
          btn.disabled=false;btn.textContent='Update';
          activityToast('Activity updated successfully. Activity ID: '+(res.activityId||editRecord.activityId||''),'success',2600);
          cached=[];backToMenu();return;
        }
        btn.disabled=false;btn.textContent='Save';
        activityToast('Activity saved successfully. Activity ID: '+(res.activityId||''),'success',2600);cached=[];resetForm();
      }catch(e){activityToast(e.message||'Unable to save activity.','error',5000)}finally{if(btn.isConnected){btn.disabled=false;btn.textContent=editRecord?'Update':'Save'}}};
    $('activityResetBtn').onclick=()=>setTimeout(resetForm,0);
  }
  function sensitiveGate(kind){styleOnce();const label=kind==='sensitive'?'Sensitive Activities - Report':'All Activities - Report';const inner=`<div class="expense-panel"><div class="expense-field"><label class="expense-label" for="activityPassCode">Pass Code</label><input id="activityPassCode" type="password" inputmode="numeric" autocomplete="current-password" placeholder="Enter Pass Code"></div><div id="activityStatus" class="expense-status" role="status"></div><div class="expense-actions" style="display:flex;align-items:center;justify-content:center;align-items:center;gap:16px;margin-top:32px;flex-wrap:nowrap;width:100%"><button type="button" id="activityVerifyPass" class="expense-primary" style="margin:0">Verify</button><button type="button" id="activityModuleBack" class="expense-secondary" style="margin:0">← Back</button></div></div>`;page(shell(label,inner,true));bindBack();$('activityVerifyPass').onclick=async()=>{const pass=$('activityPassCode').value.trim();if(!pass){status('Enter Pass Code.','error');return}const btn=$('activityVerifyPass');btn.disabled=true;status('Verifying…');try{const res=await request('getActivities',{includeSensitive:'true',passCode:pass});if(res.status!=='success')throw new Error(res.message||'Pass Code verification failed.');cached=res.activities||[];activeAccess=kind;renderReports(kind,false,cached)}catch(e){status(e.message||'Verification failed.','error');btn.disabled=false}}}
  function reportControls(custom){return `<style>.activity-page .expense-filter-grid .expense-field.hidden{display:none!important}.activity-page .expense-report-inline{display:flex;flex-direction:column;gap:5px}.activity-page .expense-report-inline .expense-label{white-space:nowrap;width:100%;margin:0!important}.activity-page .expense-report-inline select{display:block;width:100%;min-width:0;box-sizing:border-box}.activity-page .activity-custom-grid .expense-field{min-width:0}.activity-page .activity-custom-grid>.expense-field:has(#actFromDate){grid-row:4!important;grid-column:1!important}.activity-page .activity-custom-grid>.expense-field:has(#actToDate){grid-row:4!important;grid-column:2!important}.activity-page .activity-custom-grid>.expense-field:has(#actSearchText){grid-row:5!important;grid-column:1!important}.activity-page .activity-custom-grid>.expense-field:has(#actAssignedTo){grid-row:5!important;grid-column:2!important}.activity-page .activity-custom-grid>.expense-field:has(#actPersonDoctorOffice){grid-row:6!important;grid-column:1!important}.activity-page .activity-custom-grid #actShowColumnsField{grid-row:6!important;grid-column:2!important}.activity-page .expense-panel>.expense-report-actions{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;align-items:stretch!important;justify-content:stretch!important;gap:8px!important;width:100%!important;margin-top:24px!important;padding-top:2px!important;box-sizing:border-box!important}.activity-page:not(.activity-report-view) .expense-panel>.expense-report-actions>button{display:block!important;width:100%!important;min-width:0!important;max-width:100%!important;flex:none!important;box-sizing:border-box!important}</style><div class="expense-panel"><div class="expense-filter-grid ${custom?'activity-custom-grid':''}">
    <div class="expense-field expense-report-inline"><label class="expense-label" for="actReportType">Report Type</label><select id="actReportType">${reportChoiceOptions(['Abstract','Detailed'],'Abstract')}</select></div>
    <div class="expense-field expense-report-inline"><label class="expense-label" for="actReportPeriod">Report Period</label><select id="actReportPeriod">${reportChoiceOptions(['Today','This Week','This Month','This Year','All'],'Today')}</select></div>
    <div class="expense-field"><label class="expense-label" for="actFilterCategory">Category</label><select id="actFilterCategory">${options(reportCategoryKeys(),'All')}</select></div>
    <div class="expense-field"><label class="expense-label" for="actFilterSub">Sub Category</label><select id="actFilterSub">${options(reportSubCategoryKeys(''),'All')}</select></div>
    <div class="expense-field"><label class="expense-label" for="actFilterStatus">Status</label><select id="actFilterStatus">${options(statusOptions,'All',true)}</select></div>
    <div class="expense-field"><label class="expense-label" for="actFilterPriority">Priority</label><select id="actFilterPriority">${options(priorityOptions,'All',true)}</select></div>
    <div class="expense-field activity-date-sort-field"><label class="expense-label" for="actDateSortBtn">Date order</label><button type="button" id="actDateSortBtn" class="expense-date-sort" aria-label="Sort date ascending" title="Sort date ascending">↑ Date Ascending</button></div>
    <div class="expense-field hidden" id="actShowColumnsField"><label class="expense-label" for="actShowColumns">Show Columns</label><select id="actShowColumns"><option value="limited" selected>Limited</option><option value="all">All</option></select></div>
    ${custom?`<div class="expense-field"><label class="expense-label" for="actFromDate">From Date</label><input id="actFromDate" type="date"></div><div class="expense-field"><label class="expense-label" for="actToDate">To Date</label><input id="actToDate" type="date"></div><div class="expense-field"><label class="expense-label" for="actSearchText">Search Text</label><input id="actSearchText" type="search" placeholder="Activity, description, category…"></div><div class="expense-field"><label class="expense-label" for="actAssignedTo">Assigned To</label><input id="actAssignedTo" placeholder="Any member/person"></div><div class="expense-field"><label class="expense-label" for="actPersonDoctorOffice">Person / Doctor / Office</label><input id="actPersonDoctorOffice" placeholder="Any person / doctor / office"></div>`:''}
    </div><div class="expense-report-actions"><button type="button" id="actRunReport" class="expense-primary">Show Report</button><button type="button" id="activityReportBack" class="expense-secondary">← Back</button></div><div id="activityStatus" class="expense-status" role="status" aria-live="polite"></div></div>`}
  function renderReports(kind='normal',custom=false,prefetched=null){styleOnce();activeAccess=kind;cached=prefetched||[];const label=kind==='sensitive'?'Sensitive Activities Reports':kind==='all'?'All Activities Reports':custom?'Activities — Custom Search':'Activities Reports';page(shell(label,reportControls(custom),true));bindBack();setupReportControls(kind,custom);}
  function setupReportControls(kind,custom){
    const type=$('actReportType'),period=$('actReportPeriod'),cat=$('actFilterCategory'),sub=$('actFilterSub'),run=$('actRunReport');
    const abstractPeriods=['Today','This Week','This Month','This Year','All','Daily','Weekly','Monthly','Yearly'];
    const detailedPeriods=['Today','This Week','This Month','This Year','All'];
    const syncPeriodOptions=()=>{const previous=period.value;const choices=type.value==='Abstract'?abstractPeriods:detailedPeriods;const selected=choices.includes(previous)?previous:'Today';period.innerHTML=reportChoiceOptions(choices,selected);period.value=selected;};
    const syncDateSortVisibility=()=>{const p=period.value,isAbstract=type.value==='Abstract';const hide=isAbstract&&['All','Today','This Week','This Month','This Year'].includes(p);const sortField=$('actDateSortBtn')?.closest('.expense-field');if(sortField)sortField.classList.toggle('hidden',hide);};
    const syncShowColumnsVisibility=()=>{const field=$('actShowColumnsField');if(field)field.classList.toggle('hidden',type.value!=='Detailed');};
    type.onchange=()=>{syncPeriodOptions();syncDateSortVisibility();syncShowColumnsVisibility();if(lastRows.length)renderReportResults(lastRows,type.value)};syncPeriodOptions();period.onchange=syncDateSortVisibility;
    const syncSub=(preserveSelection=false)=>{const previous=preserveSelection?sub.value:'';const relatedSubCategories=cat.value?reportSubCategoryKeys(cat.value):[];sub.innerHTML=options(relatedSubCategories,'All');if(previous&&relatedSubCategories.includes(previous))sub.value=previous;else sub.value='';};cat.onchange=()=>syncSub(false);syncSub(false);
    const back=$('activityReportBack');if(back)back.onclick=event=>{event.preventDefault();event.stopPropagation();backToMenu()};
    
    const dateSortBtn=$('actDateSortBtn');if(dateSortBtn)dateSortBtn.onclick=()=>{dateAscending=!dateAscending;dateSortBtn.textContent=dateAscending?'↑ Date Ascending':'↓ Date Descending';dateSortBtn.setAttribute('aria-label',dateAscending?'Sort date ascending':'Sort date descending');dateSortBtn.title=dateAscending?'Sort date ascending':'Sort date descending';if(lastRows.length)renderReportResults(lastRows,type.value)};
    const showColumns=$('actShowColumns');if(showColumns)showColumns.onchange=()=>{if(lastRows.length)renderReportResults(lastRows,type.value)};
    run.onclick=async()=>{run.disabled=true;status('Loading activities…');try{let rows=cached;if(!rows.length){const fields={};if(kind==='sensitive'||kind==='all'){fields.includeSensitive='true';const pass=$('activityPassCode')?.value?.trim();if(pass)fields.passCode=pass;}const res=await request('getActivities',fields);if(res.status!=='success')throw new Error(res.message||'Unable to load activities.');rows=res.activities||[];cached=rows;}const filtered=filterRows(rows,custom,kind);lastRows=filtered.slice();reportSettings={type:type.value,period:period.value,category:cat.value,subCategory:sub.value,status:$('actFilterStatus').value,priority:$('actFilterPriority').value,showColumns:$('actShowColumns')?.value||'limited',dateAscending,from:$('actFromDate')?.value||'',to:$('actToDate')?.value||'',search:$('actSearchText')?.value||'',assigned:$('actAssignedTo')?.value||'',personDoctorOffice:$('actPersonDoctorOffice')?.value||''};renderReportPage(filtered,type.value,kind,custom);}catch(e){status(e.message||'Unable to load activities.','error')}finally{run.disabled=false}};
    type.value='Abstract';syncPeriodOptions();period.value='Today';syncDateSortVisibility();syncShowColumnsVisibility();
    if(reportSettings){type.value=reportSettings.type;syncPeriodOptions();period.value=reportSettings.period;cat.value=reportSettings.category;syncSub(true);if(Array.from(sub.options).some(option=>option.value===reportSettings.subCategory))sub.value=reportSettings.subCategory;$('actFilterStatus').value=reportSettings.status;$('actFilterPriority').value=reportSettings.priority;if($('actShowColumns'))$('actShowColumns').value=reportSettings.showColumns;if($('actFromDate'))$('actFromDate').value=reportSettings.from;if($('actToDate'))$('actToDate').value=reportSettings.to;if($('actSearchText'))$('actSearchText').value=reportSettings.search;if($('actAssignedTo'))$('actAssignedTo').value=reportSettings.assigned;if($('actPersonDoctorOffice'))$('actPersonDoctorOffice').value=reportSettings.personDoctorOffice||'';dateAscending=reportSettings.dateAscending;syncDateSortVisibility();syncShowColumnsVisibility();reportSettings=null;}
  }
  function reportPageTitle(type,kind,custom,period='All'){
    const detail=type==='Detailed';
    if(!detail){
      const periodLabel=period==='This Week'?'This week':String(period||'All');
      if(kind==='sensitive')return `Sensitive Activities Abstract - ${periodLabel}`;
      if(kind==='all')return `All Activities Abstract - ${periodLabel}`;
      if(custom)return `Activities Custom Search - Abstract - ${periodLabel}`;
      return `Activities Abstract - ${periodLabel}`;
    }
    const periodLabel=period==='This Week'?'This week':String(period||'All');
    if(kind==='sensitive')return `Sensitive Activities Detailed - ${periodLabel}`;
    if(kind==='all')return `All Activities Detailed - ${periodLabel}`;
    if(custom)return `Activities Custom Search - Detailed - ${periodLabel}`;
    return `Activities Detailed - ${periodLabel}`;
  }
  function renderReportPage(rows,type,kind,custom){
    styleOnce();
    const selectedPeriod=$('actReportPeriod')?.value||reportSettings?.period||'All';
    const label=reportPageTitle(type,kind,custom,selectedPeriod);
    // Detailed report uses normal block flow: summary cards occupy their own
    // fixed-height row, and the report scroll viewport starts immediately below.
    // Separate table borders avoid Chrome's collapsed-border bleed-through on sticky TH cells.
    const detailedReportStyles=type==='Detailed'?`<style id="activityDetailedReportOverrides">
      .activity-page.activity-report-detailed #actReportOutput{
        display:block!important;position:relative!important;overflow:visible!important;
        margin:0!important;padding:0!important;line-height:normal!important;
      }
      .activity-page.activity-report-detailed #actReportOutput>.expense-summary{
        display:flex!important;position:relative!important;z-index:5!important;
        width:100%!important;height:40px!important;min-height:40px!important;
        margin:0!important;padding:0!important;border:0!important;
        box-sizing:border-box!important;background:#f0f7ff!important;
        opacity:1!important;isolation:isolate!important;
      }
      .activity-page.activity-report-detailed #actReportOutput>.expense-summary>.expense-summary-card{
        position:relative!important;z-index:6!important;flex:1 1 0!important;
        height:40px!important;min-height:40px!important;margin:0!important;
        box-sizing:border-box!important;background:#f0f7ff!important;
        background-color:#f0f7ff!important;opacity:1!important;
      }
      .activity-page.activity-report-detailed #actReportOutput>.expense-results{
        display:block!important;position:relative!important;z-index:1!important;
        clear:both!important;float:none!important;top:auto!important;
        width:100%!important;height:55vh!important;min-height:55vh!important;max-height:55vh!important;
        margin:0!important;padding:0!important;border:0!important;
        overflow:auto!important;overscroll-behavior:contain!important;
        -webkit-overflow-scrolling:touch!important;background:#fff!important;
      }
      .activity-page.activity-report-detailed #actReportOutput>.expense-results table{
        display:table!important;width:max-content!important;min-width:100%!important;
        margin:0!important;padding:0!important;border-spacing:0!important;
        border-collapse:separate!important;background:#fff!important;
      }
      .activity-page.activity-report-detailed #actReportOutput>.expense-results table>thead>tr>th{
        position:sticky!important;top:0!important;z-index:20!important;
        background:#dce7ff!important;background-color:#dce7ff!important;
        background-image:none!important;background-clip:padding-box!important;
        opacity:1!important;border:1px solid #aebfe0!important;
      }
      .activity-page.activity-report-detailed #actReportOutput>.expense-results table>tbody>tr>td{
        border-right:1px solid #c4d4ff!important;border-bottom:1px solid #c4d4ff!important;
      }
      .activity-page.activity-report-detailed #actReportOutput>.expense-results table>tbody>tr>td:first-child{
        border-left:1px solid #c4d4ff!important;
      }
      .activity-page.activity-report-detailed #actReportOutput>.expense-results table>tbody>tr.expense-report-month{
        height:26px!important;min-height:26px!important;
      }
      .activity-page.activity-report-detailed #actReportOutput>.expense-results table>tbody>tr.expense-report-month>th{
        position:static!important;top:auto!important;z-index:auto!important;display:table-cell!important;
        height:26px!important;min-height:26px!important;max-height:26px!important;
        padding:2px 9px!important;line-height:1.1!important;vertical-align:middle!important;
        text-align:left!important;white-space:nowrap!important;font-size:14px!important;font-weight:700!important;
        color:#e67e22!important;background:#fff1d9!important;background-color:#fff1d9!important;
        border:1px solid #e8cda6!important;
      }
      .activity-page.activity-report-detailed .activity-month-heading-content{
        display:grid!important;grid-template-columns:170px 150px!important;
        grid-auto-flow:column!important;justify-content:start!important;align-items:center!important;
        width:100%!important;min-width:0!important;height:20px!important;
        box-sizing:border-box!important;white-space:nowrap!important;
      }
      .activity-page.activity-report-detailed .activity-month-name{
        display:block!important;min-width:0!important;text-align:left!important;
        color:#e67e22!important;font-weight:700!important;
      }
      .activity-page.activity-report-detailed .activity-month-records{
        display:block!important;min-width:0!important;text-align:left!important;
        color:#9a5b12!important;font-weight:700!important;
      }
      /* Detailed report: green period totals and month-wise totals. */
      .activity-page.activity-report-detailed #actReportOutput>.expense-results table>tbody>tr.activity-report-summary-row>th{
        position:static!important;top:auto!important;z-index:auto!important;display:table-cell!important;
        height:32px!important;min-height:32px!important;padding:4px 9px!important;
        line-height:1.1!important;vertical-align:middle!important;text-align:left!important;
        white-space:nowrap!important;font-size:13px!important;font-weight:700!important;
        color:#2e6b43!important;background:#e8f5e9!important;background-color:#e8f5e9!important;
        border:1px solid #b7d8bd!important;
      }
      .activity-page.activity-report-detailed .activity-report-summary-content{
        display:grid!important;grid-template-columns:minmax(145px,1.2fr) minmax(130px,1fr) minmax(105px,1fr)!important;
        align-items:center!important;justify-content:start!important;column-gap:12px!important;
        width:100%!important;min-width:0!important;min-height:22px!important;
        box-sizing:border-box!important;white-space:nowrap!important;
      }
      .activity-page.activity-report-detailed .activity-report-summary-content>span{
        display:block!important;min-width:0!important;text-align:left!important;
        color:#2e6b43!important;font-size:13px!important;font-weight:700!important;
      }
      @media(max-width:600px){
        .activity-page.activity-report-detailed .activity-report-summary-content{
          grid-template-columns:minmax(125px,1.1fr) minmax(125px,1fr) minmax(105px,1fr)!important;
          column-gap:7px!important;
        }
        .activity-page.activity-report-detailed #actReportOutput>.expense-results table>tbody>tr.activity-report-summary-row>th{
          font-size:12px!important;padding-left:6px!important;padding-right:6px!important;
        }
        .activity-page.activity-report-detailed .activity-report-summary-content>span{font-size:12px!important}
      }
    </style>`:'';
    const inner=`${detailedReportStyles}<div class="expense-panel"><div id="actReportOutput"></div><div class="expense-report-actions"><div class="expense-download-wrap"><button type="button" id="activityDownloadBtn" class="expense-secondary">Download ▾</button><div id="activityDownloadMenu" class="expense-download-menu hidden"><button type="button" data-export="pdf">PDF</button><button type="button" data-export="word">Word</button><button type="button" data-export="excel">Excel</button></div></div><button type="button" id="activityReportDateSort" class="expense-date-sort">${dateAscending?'↑ Date Ascending':'↓ Date Descending'}</button><button type="button" id="activityReportBack" class="expense-secondary">← Back</button></div></div>`;
    page(shell(label,inner,true));const reportPage=document.querySelector('.activity-page');if(reportPage){reportPage.classList.add('activity-report-view');if(type==='Detailed')reportPage.classList.add('activity-report-detailed');else reportPage.classList.add('activity-report-abstract');}renderReportResults(rows,type);const reportSort=$('activityReportDateSort');if(reportSort)reportSort.onclick=()=>{dateAscending=!dateAscending;reportSort.textContent=dateAscending?'↑ Date Ascending':'↓ Date Descending';reportSort.setAttribute('aria-label',dateAscending?'Sort date ascending':'Sort date descending');reportSort.title=dateAscending?'Sort date ascending':'Sort date descending';renderReportResults(lastRows,type)};const dl=$('activityDownloadBtn'),menu=$('activityDownloadMenu');if(dl&&menu){dl.onclick=()=>menu.classList.toggle('hidden');menu.querySelectorAll('[data-export]').forEach(b=>b.onclick=()=>{menu.classList.add('hidden');exportReport(b.dataset.export)});}const back=$('activityReportBack');if(back)back.onclick=()=>renderReports(kind,custom,cached);
  }
  function filterRows(rows,custom,kind){
    let from=custom?($('actFromDate')?.value||''):'',to=custom?($('actToDate')?.value||''):'';const p=$('actReportPeriod').value,now=new Date();
    if(!custom||(!from&&!to)){if(p==='Today')from=to=today();else if(p==='This Week'){const d=new Date();d.setDate(d.getDate()-((d.getDay()+6)%7));from=fmt(d);const e=new Date(d);e.setDate(e.getDate()+6);to=fmt(e)}else if(p==='This Month'){from=today().slice(0,7)+'-01';to=today()}else if(p==='This Year'){from=now.getFullYear()+'-01-01';to=today()}}
    const start=from?new Date(from+'T00:00:00').getTime():null,end=to?new Date(to+'T23:59:59').getTime():null;const c=$('actFilterCategory').value,s=$('actFilterSub').value,st=$('actFilterStatus').value,pr=$('actFilterPriority').value,q=custom?($('actSearchText')?.value||'').trim().toLowerCase():'',assigned=custom?($('actAssignedTo')?.value||'').trim().toLowerCase():'',personDoctorOffice=custom?($('actPersonDoctorOffice')?.value||'').trim().toLowerCase():'';
    return rows.filter(r=>{const date=String(r.startDate||r.dueDate||r.createdAt||'').slice(0,10);const time=date?new Date(date+'T12:00:00').getTime():0;if(start!==null&&time<start)return false;if(end!==null&&time>end)return false;if(c&&String(r.category||'')!==c)return false;if(s&&String(r.subCategory||'')!==s)return false;if(st&&String(r.status||'')!==st)return false;if(pr&&String(r.priority||'')!==pr)return false;if(assigned&&!String(r.assignedTo||'').toLowerCase().includes(assigned))return false;if(personDoctorOffice&&!`${r.appointmentPerson||''} ${r.person||''} ${r.doctor||''} ${r.office||''}`.toLowerCase().includes(personDoctorOffice))return false;if(q&&!`${r.title||''} ${r.category||''} ${r.subCategory||''} ${r.description||''} ${r.tags||''} ${r.status||''} ${r.activityType||''} ${r.assignedTo||''}`.toLowerCase().includes(q))return false;if(kind==='normal'&&sensitiveFlag(r.isSensitive))return false;if(kind==='sensitive'&&!sensitiveFlag(r.isSensitive))return false;return true})
  }
  function renderReportResults(rows,type){
    const typeOrder=Object.keys(ACTIVITY_CONFIG).filter(name=>name!=='Reminder');
    const typeRank=new Map(typeOrder.map((name,index)=>[name,index]));
    const dateKey=row=>String(row.startDate||row.dueDate||row.createdAt||'').slice(0,10);
    const timeKey=row=>{
      const raw=String(row.startTime||row.scheduledTime||row.scheduleTime||row.time||'').trim();
      if(!raw)return '';
      const match=raw.match(/(?:T|\s)(\d{1,2}:\d{2})/)||raw.match(/^(\d{1,2}:\d{2})/);
      if(!match)return '';
      const time=match[1]||match[0];
      const parts=time.split(':');
      return String(parts[0]).padStart(2,'0')+':'+parts[1];
    };
    rows=rows.slice().sort((a,b)=>{
      const da=dateKey(a),db=dateKey(b),dateDiff=da.localeCompare(db);
      if(dateDiff)return dateAscending?dateDiff:-dateDiff;
      const ta=timeKey(a),tb=timeKey(b);
      // For the same date, scheduled-time rows are ordered by time. Rows without
      // a time follow those rows and are arranged in the Activity Type menu order.
      if(ta&&tb){const timeDiff=ta.localeCompare(tb);if(timeDiff)return dateAscending?timeDiff:-timeDiff;}
      else if(ta&&!tb)return -1;
      else if(!ta&&tb)return 1;
      const ra=typeRank.has(String(a.activityType||''))?typeRank.get(String(a.activityType||'')):typeOrder.length;
      const rb=typeRank.has(String(b.activityType||''))?typeRank.get(String(b.activityType||'')):typeOrder.length;
      if(ra!==rb)return ra-rb;
      return String(a.activityType||'').localeCompare(String(b.activityType||''),undefined,{sensitivity:'base'});
    });
    const total=rows.length,completed=rows.filter(r=>String(r.status).toLowerCase()==='completed').length,pending=rows.filter(r=>String(r.status).toLowerCase()==='pending').length;let table='';const p=$('actReportPeriod')?.value||reportSettings?.period||'All';
    if(type==='Abstract'){
      if(['Daily','Weekly','Monthly','Yearly'].includes(p)){
        // Date-grouped Abstract reports mirror the Expenses layout.
        // Every column is horizontally centered in these four grouped views.
        const groups={};
        rows.forEach(record=>{
          const ds=dateKey(record);
          const parts=ds.match(/^(\d{4})-(\d{2})-(\d{2})$/);
          let key='Unknown';
          if(parts){
            const year=parts[1],month=parts[2];
            if(p==='Daily')key=`${year}-${month}-${parts[3]}`;
            else if(p==='Weekly'){
              const weekStart=new Date(ds+'T12:00:00');
              weekStart.setDate(weekStart.getDate()-((weekStart.getDay()+6)%7));
              key=fmt(weekStart);
            }else if(p==='Monthly')key=`${year}-${month}`;
            else key=year;
          }
          if(!groups[key])groups[key]={year:'—',month:'—',date:'—',week:'—',count:0,completed:0};
          if(parts){
            groups[key].year=parts[1];
            groups[key].month=new Date(Number(parts[1]),Number(parts[2])-1,1).toLocaleString('en-US',{month:'long'});
            groups[key].date=showDate(ds);
          }
          if(p==='Weekly'&&key!=='Unknown'){
            const weekStart=new Date(key+'T12:00:00');
            const weekEnd=new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate()+6);
            groups[key].week=`${showDate(fmt(weekStart))}\u00a0to\u00a0${showDate(fmt(weekEnd))}`;
          }
          groups[key].count++;
          if(String(record.status||'').toLowerCase()==='completed')groups[key].completed++;
        });
        const keys=Object.keys(groups).sort((a,b)=>dateAscending?a.localeCompare(b):b.localeCompare(a));
        const abstractColumnClass=name=>({
          'S.No':'activity-abstract-col-sno',
          'Year':'activity-abstract-col-year',
          'Month':'activity-abstract-col-month',
          'No':'activity-abstract-col-no'
        }[name]||'');
        const centeredHeader=label=>`<th class="activity-abstract-center ${abstractColumnClass(label)}">${label}</th>`;
        let headers='';
        if(p==='Daily')headers=['S.No','Year','Month','Date','No','Completed'].map(centeredHeader).join('');
        else if(p==='Weekly')headers=['S.No','Year','Week','No','Completed'].map(centeredHeader).join('');
        else if(p==='Monthly')headers=['S.No','Year','Month','No','Completed'].map(centeredHeader).join('');
        else headers=['S.No','Year','No','Completed'].map(centeredHeader).join('');
        const td=(value,column='')=>`<td class="activity-abstract-center ${abstractColumnClass(column)}">${value}</td>`;
        const cells=(key,g,i)=>{
          if(p==='Daily')return `${td(i+1,'S.No')}${td(esc(g.year),'Year')}${td(esc(g.month),'Month')}${td(esc(g.date),'Date')}${td(g.count,'No')}${td(g.completed,'Completed')}`;
          if(p==='Weekly'){
            const weekYear=key==='Unknown'?'—':String(new Date(key+'T12:00:00').getFullYear());
            return `${td(i+1,'S.No')}${td(esc(weekYear),'Year')}${td(esc(g.week),'Week')}${td(g.count,'No')}${td(g.completed,'Completed')}`;
          }
          if(p==='Monthly')return `${td(i+1,'S.No')}${td(esc(g.year),'Year')}${td(esc(g.month),'Month')}${td(g.count,'No')}${td(g.completed,'Completed')}`;
          return `${td(i+1,'S.No')}${td(esc(g.year),'Year')}${td(g.count,'No')}${td(g.completed,'Completed')}`;
        };
        const colspan=p==='Daily'?6:(p==='Weekly'||p==='Monthly'?5:4);
        const groupedPeriodHeading=p==='Daily'?'Daily Records':p==='Monthly'?'Monthly Records':p==='Yearly'?'Yearly Records':'';
        table=`${groupedPeriodHeading?`<div class="expense-abstract-heading activity-abstract-period-subheading">${groupedPeriodHeading}</div>`:''}<div class="expense-results"><table><thead><tr>${headers}</tr></thead><tbody>${keys.map((key,i)=>`<tr>${cells(key,groups[key],i)}</tr>`).join('')||`<tr><td class="activity-abstract-center" colspan="${colspan}">No records found.</td></tr>`}</tbody></table></div>`;
      }else if(['Today','This Week','This Month','This Year'].includes(p)){
        // Period Abstract: show the selected period as a subheading, followed by
        // expandable Category / Sub Category rows with record and completed counts.
        const now=new Date();
        const todayValue=today();
        let periodHeading='';
        if(p==='Today'){
          periodHeading=`Date: ${showDate(todayValue)}`;
        }else if(p==='This Week'){
          const weekStart=new Date(todayValue+'T12:00:00');
          weekStart.setDate(weekStart.getDate()-((weekStart.getDay()+6)%7));
          const weekEnd=new Date(weekStart);
          weekEnd.setDate(weekEnd.getDate()+6);
          periodHeading=`Week: ${showDate(fmt(weekStart))}\u00a0to\u00a0${showDate(fmt(weekEnd))}`;
        }else if(p==='This Month'){
          periodHeading=`Month: ${now.toLocaleString('en-US',{month:'long',year:'numeric'})}`;
        }else{
          periodHeading=`Year: ${now.getFullYear()}`;
        }

        const groups={};
        rows.forEach(record=>{
          const category=String(record.category||'Other');
          const subCategory=String(record.subCategory||'Other');
          const isCompleted=String(record.status||'').toLowerCase()==='completed';
          if(!groups[category])groups[category]={count:0,completed:0,subs:{}};
          groups[category].count++;
          if(isCompleted)groups[category].completed++;
          if(!groups[category].subs[subCategory])groups[category].subs[subCategory]={count:0,completed:0};
          groups[category].subs[subCategory].count++;
          if(isCompleted)groups[category].subs[subCategory].completed++;
        });

        let categoryIndex=0;
        const categoryRows=Object.keys(groups).sort((a,b)=>a.localeCompare(b,undefined,{sensitivity:'base'})).map(category=>{
          const index=categoryIndex++;
          const group=groups[category];
          const subRows=Object.keys(group.subs).sort((a,b)=>a.localeCompare(b,undefined,{sensitivity:'base'})).map(subCategory=>{
            const detail=group.subs[subCategory];
            return `<tr class="activity-abstract-subrow" data-parent="${index}" hidden><td style="padding-left:28px">↳ ${esc(subCategory)}</td><td class="activity-abstract-center">${detail.count}</td><td class="activity-abstract-center">${detail.completed}</td></tr>`;
          }).join('');
          return `<tr class="activity-abstract-parent" data-index="${index}" tabindex="0" role="button" aria-expanded="false" style="cursor:pointer"><td><span class="activity-toggle">＋</span> ${esc(category)}</td><td class="activity-abstract-center">${group.count}</td><td class="activity-abstract-center">${group.completed}</td></tr>${subRows}`;
        }).join('');

        table=`<div class="expense-abstract-heading activity-abstract-period-subheading">${esc(periodHeading)}</div><div class="expense-results"><table><thead><tr><th>+ Category</th><th class="activity-abstract-center">No</th><th class="activity-abstract-center">Completed</th></tr></thead><tbody>${categoryRows||'<tr><td colspan="3">No records found.</td></tr>'}</tbody></table></div>`;
      }else{
        // "All" retains the existing expandable Category / SubCategory summary.
        const groups={};
        rows.forEach(r=>{
          const c=String(r.category||'Other'),subCategory=String(r.subCategory||'Other');
          if(!groups[c])groups[c]={count:0,completed:0,subs:{}};
          groups[c].count++;
          if(String(r.status).toLowerCase()==='completed')groups[c].completed++;
          if(!groups[c].subs[subCategory])groups[c].subs[subCategory]=0;
          groups[c].subs[subCategory]++;
        });
        let i=0;
        const body=Object.keys(groups).sort().map(c=>{
          const idx=i++,g=groups[c];
          const subRows=Object.keys(g.subs).sort().map(subCategory=>`<tr class="activity-abstract-subrow" data-parent="${idx}" hidden><td style="padding-left:28px">↳ ${esc(subCategory)}</td><td class="activity-abstract-center">${g.subs[subCategory]}</td><td class="activity-abstract-center">—</td></tr>`).join('');
          return `<tr class="activity-abstract-parent" data-index="${idx}" tabindex="0" role="button" aria-expanded="false" style="cursor:pointer"><td><span class="activity-toggle">＋</span> ${esc(c)}</td><td class="activity-abstract-center">${g.count}</td><td class="activity-abstract-center">${g.completed}</td></tr>${subRows}`;
        }).join('');
        table=`<div class="expense-abstract-heading activity-abstract-period-subheading">All Records</div><div class="expense-results"><table><thead><tr><th>Category / SubCategory</th><th class="activity-abstract-center">Activities</th><th class="activity-abstract-center">Completed</th></tr></thead><tbody>${body||'<tr><td colspan="3">No records found.</td></tr>'}</tbody></table></div>`;
      }
    }
    else{
      const yesNo=v=>v===true||['true','yes','1','on'].includes(String(v==null?'':v).trim().toLowerCase())?'Yes':'No';
      const timeOnly=v=>{const x=String(v==null?'':v).trim();if(!x)return '';const m=x.match(/(?:T|\s)(\d{1,2}:\d{2})(?::\d{2})?/);if(m)return m[1].padStart(5,'0');const n=x.match(/^(\d{1,2}:\d{2})(?::\d{2})?$/);return n?n[1].padStart(5,'0'):x};
      const photoValues=r=>[1,2,3].map(n=>{
        const candidates=[r['photo'+n+'Url'],r['photo'+n+'URL'],r['photo'+n],r['photo'+n+'Link'],r['photo'+n+'url']];
        return candidates.find(v=>typeof v==='string'&&v.trim()&&/^(https?:|data:image\/)/i.test(v.trim()))||'';
      }).filter(Boolean);
      const photoThumbUrl=url=>{
        const raw=String(url||'');
        const match=raw.match(/[?&]id=([^&]+)/i)||raw.match(/\/d\/([^/?]+)/i);
        return /drive\.google\.com/i.test(raw)&&match?`https://drive.google.com/thumbnail?id=${match[1]}&sz=w180`:raw;
      };
      const photoHtml=r=>{
        const photos=photoValues(r);
        return photos.length?photos.map((url,i)=>`<button type="button" class="activity-photo-preview-btn" data-activity-photo="${esc(url)}" title="View photo ${i+1}" aria-label="View photo ${i+1}" style="display:inline-flex;flex:0 0 28px;width:28px;height:28px;align-items:center;justify-content:center;padding:0;border:0;background:transparent;cursor:pointer"><img src="${esc(photoThumbUrl(url))}" alt="Photo ${i+1}" loading="lazy" style="display:block;width:26px;height:26px;object-fit:cover;border:1px solid #c4d4ff;border-radius:4px" onerror="this.style.display='none';this.parentElement.textContent='Open'"></button>`).join(''):'—';
      };
      const centerNames=['Scheduled Date','Scheduled Time','Status','Sensitive','Reminder','Reminder Repeat','Reminder Date','Reminder Time','Priority','No of photos'];
      const allColumns=[
        ['Activity Type',r=>r.activityType||''],['Category',r=>r.category||''],['Sub Category',r=>r.subCategory||''],
        ['Scheduled Date',r=>showDate(r.startDate||r.createdAt)],['Scheduled Time',r=>timeOnly(r.startTime)],
        ['Status',r=>r.status||''],['Sensitive',r=>yesNo(r.isSensitive)],['Description',r=>r.description||''],
        ['Reminder',r=>yesNo(r.reminderEnabled)],['Reminder Repeat',r=>r.reminderRepeat||''],
        ['Reminder Date',r=>showDate(r.reminderDate)],['Reminder Time',r=>timeOnly(r.reminderTime)],
        ['Venue',r=>r.venue||''],['Location / Link',r=>r.locationLink||''],['Person / Doctor / Office',r=>r.appointmentPerson||''],
        ['Follow-up Date',r=>showDate(r.followUpDate)],['Assigned To',r=>r.assignedTo||''],['Priority',r=>r.priority||''],
        ['Completed Date',r=>showDate(r.completedDate)],['No of photos',r=>String(photoValues(r).length)],['Photos',photoHtml],
        ['Edit',r=>`<button type="button" class="activity-edit-text" data-edit-activity="${esc(r.activityId||'')}" aria-label="Edit activity">Edit</button>`]
      ];
      // Show Columns=Limited retains the required activity summary fields, photo columns and Edit action.
      const limitedNames=['Activity Type','Category','Sub Category','Scheduled Date','Status','Sensitive','Reminder','Venue','No of photos','Photos','Edit'];
      const selectedMode=$('actShowColumns')?.value||reportSettings?.showColumns||'limited';
      const columns=selectedMode==='limited'?allColumns.filter(c=>limitedNames.includes(c[0])):allColumns;
      const reportColClass={
        'Activity Type':'report-vcenter',
        'Category':'report-vcenter',
        'Sub Category':'report-vcenter',
        'Scheduled Date':'report-scheduled-date',
        'Scheduled Time':'report-scheduled-time',
        'Status':'report-status',
        'Edit':'report-edit-cell'
      };
      const reportPeriod=$('actReportPeriod')?.value||'All';
      const reportColCount=columns.length+1;
      let grouped='';
      // Detailed report period headings include their own Total Records and Completed counts.
      // This Year and All additionally show month-wise count rows before each month's records.
      const completedIn = list => list.filter(record=>String(record.status||'').toLowerCase()==='completed').length;
      const summaryRow = (label, recordCount, completedCount) =>
        `<tr class="expense-report-subheading activity-report-summary-row"><th colspan="${reportColCount}"><div class="activity-report-summary-content"><span>${esc(label)}</span><span>Total Records : ${recordCount}</span><span>Completed : ${completedCount}</span></div></th></tr>`;
      const selectedDate=today();
      let periodLabel='';
      if(reportPeriod==='Today'){
        periodLabel=`Date : ${showDate(selectedDate)}`;
      }else if(reportPeriod==='This Week'){
        const weekStart=new Date(selectedDate+'T12:00:00');
        weekStart.setDate(weekStart.getDate()-((weekStart.getDay()+6)%7));
        const weekEnd=new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate()+6);
        periodLabel=`Week : ${showDate(fmt(weekStart))} to ${showDate(fmt(weekEnd))}`;
      }else if(reportPeriod==='This Month'){
        periodLabel=`Month : ${new Date().toLocaleString('en-US',{month:'long',year:'numeric'})}`;
      }else if(reportPeriod==='This Year'){
        periodLabel=`Year : ${new Date().getFullYear()}`;
      }else if(reportPeriod==='All'){
        periodLabel='All Records';
      }

      const monthStats=new Map();
      if(reportPeriod==='This Year'||reportPeriod==='All'){
        rows.forEach(record=>{
          const ds=dateKey(record);
          const monthKey=/^\d{4}-\d{2}-\d{2}$/.test(ds)?ds.slice(0,7):'Unknown';
          if(!monthStats.has(monthKey))monthStats.set(monthKey,{count:0,completed:0});
          const stats=monthStats.get(monthKey);
          stats.count++;
          if(String(record.status||'').toLowerCase()==='completed')stats.completed++;
        });
      }
      if(periodLabel){
        grouped+=summaryRow(periodLabel,total,completed);
      }

      const appendDetailedActivityRow=(record,rowIndex)=>{
        const cells=columns.map(c=>{
          const value=c[1](record);
          const cls=reportColClass[c[0]]||'';
          return `<td class="${centerNames.includes(c[0])?'report-center ':''}${cls}">${(c[0]==='Photos'||c[0]==='Edit')?value:esc(value)}</td>`;
        }).join('');
        grouped+=`<tr><td class="report-center report-sno">${rowIndex+1}</td>${cells}</tr>`;
      };

      if(reportPeriod==='This Year'||reportPeriod==='All'){
        let currentMonthKey=null;
        rows.forEach((record,rowIndex)=>{
          const ds=dateKey(record);
          const monthKey=/^\d{4}-\d{2}-\d{2}$/.test(ds)?ds.slice(0,7):'Unknown';
          if(monthKey!==currentMonthKey){
            currentMonthKey=monthKey;
            const stats=monthStats.get(monthKey)||{count:0,completed:0};
            let monthLabel='Unknown Date';
            if(monthKey!=='Unknown'){
              const [year,month]=monthKey.split('-').map(Number);
              const monthName=new Date(year,month-1,1).toLocaleString('en-US',{month:'long'});
              monthLabel=reportPeriod==='All'?`${monthName} - ${year}`:monthName;
            }
            grouped+=summaryRow(monthLabel,stats.count,stats.completed);
          }
          appendDetailedActivityRow(record,rowIndex);
        });
      }else{
        rows.forEach(appendDetailedActivityRow);
      }
      if(!rows.length){
        grouped+=`<tr class="activity-report-empty"><td colspan="${reportColCount}">No records found.</td></tr>`;
      }
      table=`<div class="expense-results"><table><thead><tr><th class="report-center report-sno">S.No</th>${columns.map(c=>{const cls=reportColClass[c[0]]||'';const label=c[0]==='Scheduled Time'?'Scheduled<br>Time':esc(c[0]);return `<th class="${centerNames.includes(c[0])?'report-center ':''}${cls}">${label}</th>`}).join('')}</tr></thead><tbody>${grouped||`<tr><td colspan="${reportColCount}">No records found.</td></tr>`}</tbody></table></div>`;
    }
    $('actReportOutput').innerHTML=`<div class="expense-summary"><div class="expense-summary-card"><small>Total Records :</small><strong>${total}</strong></div><div class="expense-summary-card"><small>Completed :</small><strong>${completed}</strong></div></div>${table}`;
    // If an older renderer escaped the Edit HTML into visible text, convert only that
    // specific cell back into a real button. This is safe for normal rendered buttons too.
    $('actReportOutput').querySelectorAll('td').forEach(td=>{
      const shown=td.textContent||'';
      if(shown.includes('<button') && shown.includes('data-edit-activity')){
        const holder=document.createElement('div');holder.innerHTML=shown;
        const parsed=holder.querySelector('button[data-edit-activity]');
        if(parsed)td.replaceChildren(parsed);
      }
    });
    // Clickable photo thumbnails use the same Drive-preview pattern as Expenses reports.
    $('actReportOutput').querySelectorAll('.activity-photo-preview-btn').forEach(photoBtn=>photoBtn.addEventListener('click',()=>{
      const rawUrl=photoBtn.getAttribute('data-activity-photo')||'';
      const match=rawUrl.match(/[?&]id=([^&]+)/i)||rawUrl.match(/\/d\/([^/?]+)/i);
      const displayUrl=/drive\.google\.com/i.test(rawUrl)&&match?`https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`:rawUrl;
      let modal=document.getElementById('activityPhotoPreviewModal');
      if(!modal){modal=document.createElement('div');modal.id='activityPhotoPreviewModal';modal.style.cssText='position:fixed;inset:0;z-index:1000000;background:rgba(0,0,0,.82);display:flex;align-items:center;justify-content:center;padding:18px;box-sizing:border-box;';modal.innerHTML='<button type="button" aria-label="Close photo preview" style="position:absolute;top:12px;right:16px;width:42px;height:42px;border:0;border-radius:50%;background:#fff;color:#222;font-size:30px;line-height:1;cursor:pointer;z-index:1">×</button><img alt="Activity photo preview" style="display:block;max-width:100%;max-height:88vh;object-fit:contain;border-radius:6px;box-shadow:0 4px 20px #0008">';document.body.appendChild(modal);const close=()=>modal.style.display='none';modal.querySelector('button').addEventListener('click',close);modal.addEventListener('click',ev=>{if(ev.target===modal)close()});document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&modal.style.display!=='none')close()});}
      modal.querySelector('img').src=displayUrl;modal.style.display='flex';
    }));
    $('actReportOutput').querySelectorAll('.activity-abstract-parent').forEach(row=>{const toggle=()=>{const idx=row.dataset.index,opening=row.getAttribute('aria-expanded')!=='true';$('actReportOutput').querySelectorAll(`.activity-abstract-subrow[data-parent="${idx}"]`).forEach(r=>r.hidden=!opening);row.setAttribute('aria-expanded',String(opening));const mark=row.querySelector('.activity-toggle');if(mark)mark.textContent=opening?'－':'＋'};row.onclick=toggle;row.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}}});
    $('actReportOutput').querySelectorAll('[data-edit-activity]').forEach(editBtn=>editBtn.addEventListener('click',event=>{
      event.preventDefault();event.stopPropagation();
      const id=editBtn.getAttribute('data-edit-activity')||'';
      const record=rows.find(item=>String(item.activityId||'')===id)||cached.find(item=>String(item.activityId||'')===id);
      if(record)openForm(record);else activityToast('This activity record could not be found. Please run the report again.','error',5000);
    }));}
  function exportReport(format){const output=$('actReportOutput');if(!output||!output.innerHTML.trim()){status('Press Show Report first.','error');return}const heading=document.querySelector('.activity-page .expense-title')?.textContent||'oneFaMiLe Activities Report';const html=`<!doctype html><html><head><meta charset="utf-8"><title>${esc(heading)}</title><style>body{font-family:Arial,sans-serif;padding:20px;color:#222}table{border-collapse:collapse;width:100%}th,td{border:1px solid #888;padding:6px;text-align:left}.expense-summary{display:flex;gap:12px;margin-bottom:16px}.expense-summary-card{border:1px solid #aaa;padding:10px}</style></head><body><h2>${esc(heading)}</h2>${output.innerHTML}</body></html>`;if(format==='pdf'){const w=window.open('','_blank');if(!w){status('Popup blocked. Allow popups to print/save PDF.','error');return}w.document.open();w.document.write(html);w.document.close();w.focus();setTimeout(()=>w.print(),300);return}const word=format==='word',blob=new Blob([html],{type:(word?'application/msword':'application/vnd.ms-excel')+';charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='oneFaMiLe_Activities_Report.'+(word?'doc':'xls');document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
  function openAbout(){styleOnce();const html=`<div class="expense-panel"><h3 style="margin-top:0;color:#2477c8">About oneFaMiLe Activities</h3><h4>1. Add Activity</h4><p>Record activities with Activity Date, Activity Type, Title, Category, SubCategory, Description, status, priority, due date and optional tags.</p><h4>2. Reports</h4><p>Abstract reports summarize records by Category and SubCategory or by Daily, Weekly, Monthly and Yearly periods. Detailed reports list each activity and its dates, status and priority.</p><h4>3. Custom Search</h4><p>Filter activities by date range, category, subcategory, status, priority, assigned person and search text. Reports can be printed/saved as PDF or downloaded in Word/Excel-compatible format.</p><h4>4. Sensitive Activities</h4><p>Sensitive Reports and All Reports require the Sensitive Pass Code. Ordinary Activities Reports exclude sensitive records.</p><h4>5. Family data</h4><p>Activity records are associated with the selected family and current login session. Check the activity details before saving.</p></div>`;page(shell('About Activities',html));bindBack()}
  function install(){const b=$('activitiesBtn');if(!b){setTimeout(install,250);return}b.onclick=openMenu}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
