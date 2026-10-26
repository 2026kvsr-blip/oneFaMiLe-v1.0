/* oneFaMiLe Activities module — load after app.js */
(function(){
  'use strict';
  const API = "https://script.google.com/macros/s/AKfycbzYblwgxrGFDF2MKhiWLvrlSLdJTIgQoplD0Z2-A_tLmwrdUPWsTqzOF9-txnug4DFLpg/exec";
  const $ = id => document.getElementById(id);
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function family(){try{return JSON.parse(localStorage.getItem('currentFamily')||'{}')}catch(_){return {}}}
  function user(){try{return JSON.parse(sessionStorage.getItem('user')||'{}')}catch(_){return {}}}
  function token(){return sessionStorage.getItem('sessionToken')||''}
  function request(action,fields={}){
    const f=family();
    const body=new URLSearchParams({action,sessionToken:token(),familyId:String(f.familyId||''),...fields});
    return fetch(API,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body}).then(r=>r.json());
  }
  const CATEGORIES={
    'Personal':['Routine','Goal','Appointment','Other'],
    'Family':['Family Meeting','Family Function','Visit','Other'],
    'Health':['Medical Checkup','Medicine','Exercise','Appointment','Other'],
    'Home':['Cleaning','Repair','Maintenance','Other'],
    'Work':['Meeting','Task','Project','Deadline','Other'],
    'Finance':['Payment','Bill Due','Loan','Banking','Other'],
    'Education':['Study','Exam','Course','Other'],
    'Travel':['Trip','Booking','Visit','Other'],
    'Social':['Function','Event','Community','Other'],
    'Other':['General','Other']
  };
  function page(html){ if(typeof window.showPage==='function') window.showPage(html); else { const el=$('pageContent')||$('mainContent'); if(el)el.innerHTML=html; } }
  function title(text){return typeof window.pageTitle==='function'?window.pageTitle(text,'images/colorbtns/Activities1.png'):`<h2>${esc(text)}</h2>`}
  function backButton(){return '<div style="text-align:center;margin:18px"><button id="activitiesModuleBack" class="back-btn">← Back</button></div>'}
  function bindBack(){const b=$('activitiesModuleBack');if(b)b.onclick=()=>{const btn=$('activitiesBtn');if(btn)btn.click()}}
  function status(text,type){const el=$('activityStatus');if(!el)return;el.textContent=text;el.style.color=type==='error'?'#b00020':type==='success'?'#167d36':'#333'}
  function categoryOptions(selected=''){return Object.keys(CATEGORIES).map(c=>`<option value="${esc(c)}" ${c===selected?'selected':''}>${esc(c)}</option>`).join('')}
  function subOptions(cat,selected=''){return (CATEGORIES[cat]||[]).map(c=>`<option value="${esc(c)}" ${c===selected?'selected':''}>${esc(c)}</option>`).join('')}
  function openForm(){
    page(title('Add Activity')+`<div class="activity-module" style="max-width:680px;margin:0 auto;padding:16px;background:#f0f7ff;border-radius:18px;box-sizing:border-box">
      <form id="activityForm">
        <label>Activity Type</label><select name="activityType" class="activity-input"><option>General</option><option>Task</option><option>Appointment</option><option>Event</option><option>Reminder</option><option>Goal</option></select>
        <label>Title *</label><input name="title" required maxlength="150" placeholder="Enter activity title" class="activity-input">
        <label>Category *</label><select id="activityCategory" name="category" required class="activity-input">${categoryOptions()}</select>
        <label>SubCategory *</label><select id="activitySubCategory" name="subCategory" required class="activity-input"></select>
        <label>Description *</label><textarea name="description" required rows="4" placeholder="Enter full details" class="activity-input"></textarea>
        <label>Tags (optional)</label><input name="tags" placeholder="Example: urgent, family" class="activity-input">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px">
          <div><label>Start Date</label><input name="startDate" type="date" class="activity-input"></div>
          <div><label>Start Time</label><input name="startTime" type="time" class="activity-input"></div>
          <div><label>Due Date</label><input name="dueDate" type="date" class="activity-input"></div>
          <div><label>Due Time</label><input name="dueTime" type="time" class="activity-input"></div>
        </div>
        <label>Status</label><select name="status" class="activity-input"><option>Pending</option><option>In Progress</option><option>Completed</option><option>Cancelled</option></select>
        <label>Priority</label><select name="priority" class="activity-input"><option>Low</option><option selected>Medium</option><option>High</option><option>Urgent</option></select>
        <label style="display:flex;align-items:center;gap:8px;margin-top:12px"><input name="isSensitive" type="checkbox" value="true"> Sensitive Activity (shown only in Sensitive Reports)</label>
        <p id="activityStatus" role="status" aria-live="polite"></p>
        <button type="submit" class="grid-btn" style="width:100%;margin-top:12px">Save Activity</button>
      </form></div>`+backButton());
    const form=$('activityForm'), cat=$('activityCategory'), sub=$('activitySubCategory');
    const refresh=()=>{const previous=sub.value;sub.innerHTML=subOptions(cat.value,previous);};
    cat.onchange=refresh;refresh();bindBack();
    form.onsubmit=async ev=>{
      ev.preventDefault();const btn=form.querySelector('[type="submit"]');btn.disabled=true;status('Saving activity...');
      try{
        const fd=new FormData(form), fields={};for(const [k,v] of fd.entries())fields[k]=String(v);
        fields.isSensitive=form.elements.isSensitive.checked?'true':'false';
        const result=await request('saveActivity',fields);
        if(result.status!=='success')throw new Error(result.message||'Unable to save activity.');
        status('Activity saved successfully.','success');form.reset();refresh();
      }catch(err){status(err.message||'Unable to save activity.','error')}finally{btn.disabled=false}
    };
  }
  async function openList(mode='normal',query=''){
    page(title(mode==='search'?'Search Activities':mode==='sensitive'?'Sensitive Reports':mode==='all'?'All Activities':'Activities Reports')+`<div style="max-width:900px;margin:auto;padding:12px"><div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px"><input id="activitySearchBox" placeholder="Search title, category, subcategory, description..." style="flex:1;min-width:220px;padding:11px;border:1px solid #aac7e8;border-radius:10px" value="${esc(query)}"><button id="activitySearchGo" class="grid-btn">Search</button></div><div id="activityListStatus">Loading activities...</div><div id="activityListRows"></div></div>`+backButton());
    bindBack();$('activitySearchGo').onclick=()=>openList('search',$('activitySearchBox').value.trim());
    $('activitySearchBox').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();$('activitySearchGo').click()}};
    try{
      const needsSensitive = mode==='sensitive' || mode==='all';
      let requestFields = {};
      if(needsSensitive){
        const passCode = window.__activitySensitivePassCode || '';
        requestFields = {includeSensitive:'true',passCode};
      }
      const result=await request('getActivities',requestFields);
      if(result.status!=='success')throw new Error(result.message||'Unable to load activities.');
      let rows=result.activities||[];
      if(mode==='sensitive')rows=rows.filter(a=>a.isSensitive);
      if(mode==='normal')rows=rows.filter(a=>!a.isSensitive);
      if(mode==='search'&&query){const q=query.toLowerCase();rows=rows.filter(a=>[a.title,a.category,a.subCategory,a.description,a.tags,a.status].some(v=>String(v||'').toLowerCase().includes(q)))}
      $('activityListStatus').textContent=rows.length?`${rows.length} activity record(s)`: 'No activities found.';
      $('activityListRows').innerHTML=rows.map(a=>`<article style="border:1px solid #c4d4ff;border-radius:12px;padding:12px;margin:10px 0;background:#fff"><div style="display:flex;gap:8px;justify-content:space-between;flex-wrap:wrap"><strong>${esc(a.title)}</strong><span>${esc(a.status)} · ${esc(a.priority)}</span></div><div style="margin-top:6px;color:#315a7d">${esc(a.category)} / ${esc(a.subCategory)}${a.startDate?' · '+esc(a.startDate):''}</div><p style="white-space:pre-wrap;margin:8px 0">${esc(a.description)}</p>${a.tags?`<small>Tags: ${esc(a.tags)}</small>`:''}${a.isSensitive?'<div style="color:#b00020;font-weight:600">Sensitive</div>':''}</article>`).join('');
    }catch(err){$('activityListStatus').textContent=err.message||'Unable to load activities.'}
  }
  function openAbout(){page(title('About Activities')+`<div style="max-width:700px;margin:auto;padding:16px;line-height:1.7"><p>Activities helps you record and review family tasks, appointments, events, reminders and goals.</p><p>Each record includes Category, SubCategory and Description, along with dates, status, priority and optional sensitive classification.</p><p>Sensitive records are excluded from the ordinary Activities list and are displayed separately in Sensitive Reports.</p></div>`+backButton());bindBack()}
  function install(){
    const activities=$('activitiesBtn');if(!activities){setTimeout(install,250);return}
    activities.onclick=()=>{
      if(typeof window.updateMenuIcon==='function')window.updateMenuIcon();
      if(typeof window.setActiveButton==='function')window.setActiveButton(activities);
      page(title('Activities')+`<div class="grid-3x2">
        <button class="grid-btn" id="addActivitiesBtn"><img src="images/colorbtns/Add1.png" class="btn-icon"><span>Add Activity</span></button>
        <button class="grid-btn" id="reportsActivitiesBtn"><img src="images/colorbtns/Reports1.png" class="btn-icon"><span>Reports</span></button>
        <button class="grid-btn" id="sensitiveActivitiesBtn"><img src="images/colorbtns/SensitiveReports1.png" class="btn-icon"><span>Sensitive Reports</span></button>
        <button class="grid-btn" id="allReportsActivitiesBtn"><img src="images/colorbtns/AllReports1.png" class="btn-icon"><span>All Reports</span></button>
        <button class="grid-btn" id="searchActivitiesBtn"><img src="images/colorbtns/CustomSearch1.png" class="btn-icon"><span>Custom Search</span></button>
        <button class="grid-btn" id="aboutActivitiesBtn"><img src="images/colorbtns/About1.png" class="btn-icon"><span>About</span></button></div><div style="text-align:center"><button id="activitiesBackBtn" class="back-btn">← Back</button></div>`);
      $('addActivitiesBtn').onclick=openForm;
      $('reportsActivitiesBtn').onclick=()=>openList('normal');
      $('sensitiveActivitiesBtn').onclick=()=>{
        const pass=prompt('Enter Sensitive Pass Code to open Sensitive Reports:');
        if(pass===null)return;
        window.__activitySensitivePassCode=pass;
        openList('sensitive').finally(()=>{window.__activitySensitivePassCode=''});
      };
      $('allReportsActivitiesBtn').onclick=()=>{
        const pass=prompt('Enter Sensitive Pass Code to open All Reports:');
        if(pass===null)return;
        window.__activitySensitivePassCode=pass;
        openList('all').finally(()=>{window.__activitySensitivePassCode=''});
      };
      $('searchActivitiesBtn').onclick=()=>openList('search');
      $('aboutActivitiesBtn').onclick=openAbout;
      $('activitiesBackBtn').onclick=()=>{const home=$('homeBtn');if(home)home.click()};
    };
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
