
/* =====================================
   oneFaMiLe - MEMORIES FRONTEND
===================================== */

function memoryStyleOnce() {
    if (document.getElementById('memoryPageStyles')) return;

    const style = document.createElement('style');
    style.id = 'memoryPageStyles';

    style.textContent = `
        .memory-page {
            max-width: 1100px;
    
            margin: 0 auto;
        }

        .memory-page .expense-panel {
            padding: 12px;
            background: #f0f7ff;
            border: 1px solid #c4d4ff;
            border-radius: 14px;
            box-sizing: border-box;
        }

       .memory-page .memory-fields-grid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 10px !important;
    align-items: stretch !important;
}

.memory-page .memory-fields-grid > .expense-field {
    min-width: 0 !important;
    width: 100% !important;
    box-sizing: border-box !important;
}
.memory-page #memoryDescription {
    grid-column: 1 / -1 !important;
}
        .memory-page .expense-field {
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 5px !important;
        }

        .memory-page .expense-label {
            font-weight: 600;
            color: #2d5274;
            display: block;
            white-space: normal;
            margin: 0 !important;
            padding: 0 !important;
            line-height: 1.15 !important;
        }

        .memory-page .expense-field input,
        .memory-page .expense-field select,
        .memory-page .expense-field textarea {
            width: 100%;
            min-width: 0;
            max-width: 100%;
            height: 36px !important;
            min-height: 36px !important;
            max-height: 36px !important;
            padding: 6px 9px !important;
            box-sizing: border-box;
            border: 1px solid #9bb9d4;
            border-radius: 8px;
            background: #fff;
            color: #222;
            font: inherit;
        }
.memory-page #memoryDescription {
    height: 72px !important;
    min-height: 72px !important;
    max-height: 72px !important;
    resize: vertical;
}
       .memory-page .expense-field input[type="file"] {
    width: 100% !important;
    font-size: 0 !important;
    border: 1px solid #9bb9d4 !important;
    background: #fff !important;
    padding: 4px 8px !important;
    height: 36px !important;
    min-height: 36px !important;
    border-radius: 8px !important;
    box-sizing: border-box !important;
}

.memory-page .expense-field input[type="file"]::file-selector-button {
    font-size: 13px !important;
    padding: 0 !important;
    margin-right: 8px !important;
    border: none !important;
    background: transparent !important;
    color: #245b91 !important;
    cursor: pointer;
}

.memory-page .expense-field input[type="file"]::file-selector-button {
    font-size: 13px !important;
    padding: 0 !important;
    border: none !important;
    background: transparent !important;
    color: #245b91 !important;
    cursor: pointer;
}

        .memory-page .expense-field small {
            font-size: 11px;
            color: #52677b;
            line-height: 1.25;
        }
        .memory-page .memory-sensitive-line {
    margin-top: 12px !important;
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
}
.memory-page .memory-sensitive-line label {
    display: inline-flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 7px !important;
    width: auto !important;
}

.memory-page .memory-sensitive-line input[type="checkbox"] {
    display: inline-block !important;
    width: 18px !important;
    height: 18px !important;
    min-height: 18px !important;
    margin: 0 !important;
    flex: 0 0 18px !important;
}
        .memory-page.memory-form-view > .expense-title {
            margin-top: -50px !important;
            margin-bottom: 10px !important;
            padding-top: 0 !important;
            position: relative !important;
            z-index: 1 !important;
        }

        .memory-page.memory-form-view #memoryForm {
            padding-bottom: 30px !important;
        }

        .memory-page.memory-form-view #memoryForm .expense-actions {
            position: fixed !important;
            left: 50% !important;
            bottom: calc(env(safe-area-inset-bottom, 0px) + 8px) !important;
            transform: translateX(-50%) !important;
            width: calc(100% - 24px) !important;
            max-width: 1076px !important;
            margin: 0 !important;
            padding: 8px !important;
            background: rgba(240,247,255,.97) !important;
            border: 1px solid #c4d4ff !important;
            border-radius: 14px !important;
            box-shadow: 0 -3px 12px rgba(45,82,116,.12) !important;
            z-index: 99999 !important;
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            align-items: stretch !important;
            gap: 8px !important;
        }

        .memory-page.memory-form-view #memoryForm .expense-actions > button {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            height: 40px !important;
            margin: 0 !important;
            padding: 10px 3px !important;
            white-space: nowrap !important;
            box-sizing: border-box !important;
        }
.memory-page.memory-form-view #memoryForm .expense-actions > button.expense-secondary {
    background: transparent !important;
    background-color: transparent !important;
    border: 1px solid #4a90d9 !important;
    color: #2d5274 !important;
    box-shadow: none !important;
}
   .memory-page .memory-photo-slots {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-auto-rows: 36px;
    gap: 5px;
    margin: 0 !important;
    padding: 4px;
    height: 36px !important;
    border: 1px solid #9bb9d4;
    border-radius: 8px;
    background: #fff;
    box-sizing: border-box;
    align-items: stretch;
}

.memory-page .memory-photo-field input[type="file"] {
    display: none !important;
}

.memory-page .memory-photo-slot {
    position: relative;
    width: 100% !important;
    height: 26px !important;
    min-height: 26px !important;
    max-height: 26px !important;
    aspect-ratio: auto !important;
    min-width: 0 !important;
    border: 1px dashed #7fa6cc;
    border-radius: 7px;
    background: #fff;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;
}


.memory-page .memory-photo-slot img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.memory-page .memory-photo-slot .memory-photo-add {
    color: #245b91;
    font-size: 18px;
    font-weight: normal;
}
/* VIDEO 3 EQUAL RECTANGULAR BOXES */

.memory-page .memory-video-field input[type="file"] {
    display: none !important;
}
.memory-page .memory-coming-soon {
    display: inline-block;
    margin-left: 6px;
    padding: 2px 6px;
    border-radius: 5px;
    background: #e8f0e8;
    color: #2e8b57;
    font-size: 10px;
    font-weight: 600;
    vertical-align: middle;
}
.memory-page .memory-video-slots {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 5px;
    margin: 0 !important;
    padding: 4px;
    height: 36px !important;
    min-height: 36px !important;
    max-height: 36px !important;
    border: 1px solid #9bb9d4;
    border-radius: 8px;
    background: #fff;
    box-sizing: border-box;
    align-items: stretch;
}

.memory-page .memory-video-slot {
    position: relative;
    width: 100%;
    height: 26px !important;
    min-height: 26px !important;
    max-height: 26px !important;
    aspect-ratio: auto !important;
    min-width: 0;
    border: 1px dashed #7fa6cc;
    border-radius: 7px;
    background: #fff;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;
}
.memory-page .memory-video-slot video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.memory-page .memory-video-slot:has(video) {
    background: #dff3e3 !important;
    border: 2px solid #2e8b57 !important;
}



.memory-page .memory-video-remove {
    background: #d93025 !important;
    color: #fff !important;
}


/* VOICE MESSAGE - FOUR EQUAL BOXES */

.memory-page .memory-voice-field input[type="file"] {
    display: none !important;
}

.memory-page .memory-voice-slots {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 5px;
    margin: 0 !important;
    padding: 4px;
    height: 36px !important;
    min-height: 36px !important;
    max-height: 36px !important;
    border: 1px solid #9bb9d4;
    border-radius: 8px;
    background: #fff;
    box-sizing: border-box;
    align-items: stretch;
}

.memory-page .memory-voice-slot {
    position: relative;
    width: 100%;
    height: 26px !important;
    min-height: 26px !important;
    max-height: 26px !important;
    aspect-ratio: auto !important;
    min-width: 0;
    border: 1px dashed #9bb9d4;
    border-radius: 7px;
    background: transparent;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;
}
.memory-page .memory-voice-slot audio {
    width: 100%;
    max-width: 100%;
    height: 22px !important;
    min-height: 22px !important;
    display: block;
    object-fit: contain;
}
.memory-page .memory-voice-slot:has(audio) {
    background: #dff3e3 !important;
    border: 2px solid #2e8b57 !important;
}


/* FOURTH BOX - RECORDING */
.memory-page .memory-voice-slot:nth-child(4) {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
}
/* RECORD BUTTON */
.memory-page .memory-record-button {
    display: grid !important;
    grid-template-columns: auto auto !important;
    grid-template-rows: auto auto !important;
    align-content: center !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 2px 4px !important;
    width: 100% !important;
    height: 100% !important;
        background: transparent !important;
    border: none !important;
}

/* MICROPHONE */
.memory-page .memory-record-button .memory-mic-icon {
    grid-column: 1 / 3;
    justify-self: center;
    transform: translateX(8px);
}

/* GREEN SQUARE */
.memory-page .memory-record-stop-square {
    grid-column: 1;
    grid-row: 1;
    justify-self: end;
    color: #176b36 !important;
    font-size: 18px !important;
}

/* TIMER BELOW */
.memory-page .memory-record-timer {
    grid-column: 1 / 3;
    grid-row: 2;
    justify-self: center;
    position: static !important;
    transform: none !important;
    color: #176b36 !important;
    font-size: 13px !important;
    font-weight: 700 !important;
}

/* STOP BESIDE GREEN SQUARE */
.memory-page .memory-record-label {
    grid-column: 2;
    grid-row: 1;
    justify-self: start;
    color: #52677b !important;
    font-size: 10px !important;
}


/* MOBILE RECORD BUTTON SIZE AND CENTER */

@media (max-width: 600px) {
    .memory-page .memory-record-button {
        width: 100% !important;
        height: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        font-size: 16px !important;
        line-height: 1 !important;
        padding: 0 !important;
        margin: 0 !important;
        text-align: center !important;
    }

    .memory-page .memory-record-button small {
        font-size: 6px !important;
        margin-top: 0px;
    }
}
/* DESKTOP MICROPHONE SIZE */
.memory-page .memory-mic-icon {
    width: 26px !important;
    height: 26px !important;
    stroke-width: 1.5 !important;
}
@media (max-width: 600px) {
    .memory-page .memory-mic-icon {
    width: 25px !important;
    height: 25px !important;
    stroke-width: 1.3 !important;
    display: block;
    margin: 0 auto;
}
}
.memory-page .memory-photo-remove {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 19px !important;
    min-width: 19px !important;
    max-width: 19px !important;
    height: 19px !important;
    min-height: 19px !important;
    max-height: 19px !important;
    padding: 0 !important;
    margin: 0 !important;
    border: none;
    border-radius: 50%;
    background: #d93025;
    color: white;
    font-size: 15px;
    line-height: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
}
.memory-page .memory-photo-slot:has(img) {
    background: #dff3e3 !important;
    border: 2px solid #2e8b57 !important;
}

.memory-page .memory-photo-remove {
    background: #d93025 !important;
    color: #ffffff !important;
}
.memory-delete-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000000;
}

.memory-delete-box {
    width: calc(100% - 40px);
    max-width: 320px;
    padding: 20px;
    background: #fff;
    border: 1px solid #c4d4ff;
    border-radius: 14px;
    box-shadow: 0 5px 25px rgba(0,0,0,0.2);
    text-align: center;
}

/* FAMILY GROUPS POPUP DESIGN */
.memory-family-groups-box {
    width: calc(100% - 36px) !important;
    max-width: 420px !important;
    max-height: 70vh !important;
    overflow-y: auto !important;
    box-sizing: border-box !important;
    padding: 20px !important;
}
/* FAVOURITE LIST POPUP DESIGN */
.memory-favourite-popup {
    width: calc(100% - 36px) !important;
    max-width: 420px !important;
    max-height: 75vh !important;
    overflow-y: auto !important;
    box-sizing: border-box !important;
    padding: 18px !important;
    text-align: left !important;
}

.memory-favourite-popup h3 {
    text-align: center !important;
    margin-bottom: 14px !important;
}

.memory-favourite-items {
    max-height: 55vh;
    overflow-y: auto;
}

.memory-favourite-popup .memory-favourite-close-btn {
    display: block !important;
    margin: 14px auto 0 !important;
    background: #2196f3 !important;
    background-color: #2196f3 !important;
    color: white !important;
    border: none !important;
    border-radius: 7px !important;
    padding: 7px 20px !important;
    width: auto !important;
    min-width: 85px !important;
    height: 34px !important;
    min-height: 34px !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    cursor: pointer !important;
}
.memory-family-groups-box h3 {
    font-size: 20px !important;
    margin-bottom: 16px !important;
}

.memory-family-groups-box .memory-share-group {
    display: block !important;
    margin: 8px 0 !important;
    padding: 10px 12px !important;
    border: 1px solid #d8e3f4 !important;
    border-radius: 9px !important;
    background: #f8fbff !important;
    text-align: left !important;
}

.memory-family-groups-box .memory-share-group-title {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    font-size: 15px !important;
    font-weight: 600 !important;
}

.memory-family-groups-box .memory-share-group-title input {
    width: 19px !important;
    height: 19px !important;
    flex: 0 0 19px !important;
    margin: 0 !important;
}

.memory-family-groups-box .memory-delete-confirm {
    margin-top: 14px !important;
    padding: 9px 28px !important;
    border-radius: 7px !important;
    background: #2d5274 !important;
    border-color: #2d5274 !important;
}

.memory-delete-box h3 {
    margin: 0 0 10px;
    color: #2d5274;
}

.memory-delete-box p {
    margin: 0 0 18px;
    color: #52677b;
}

.memory-delete-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.memory-delete-actions button {
    flex: 1;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
}

.memory-delete-cancel {
    background: #fff;
    border: 1px solid #4a90d9;
    color: #2d5274;
}

.memory-delete-confirm {
    background: #d93025;
    border: 1px solid #d93025;
    color: #fff;
}
.memory-success-overlay .memory-delete-box {
    border-color: #2e8b57 !important;
}

.memory-success-overlay .memory-delete-box h3 {
    color: #2e8b57 !important;
}

.memory-success-overlay .memory-delete-confirm {
    background: #2e8b57 !important;
    border-color: #2e8b57 !important;
}
@media (max-width: 600px) {
    .memory-page .memory-photo-slots {
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 5px;
    }
}
        @media (max-width: 600px) {
            .memory-page .memory-fields-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
        }
 /* Memory Count and Clear Button */
.memory-page .memory-count-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 3px;
}

.memory-page .memory-count-row small {
    font-size: 11px;
    color: #666;
}

.memory-page .memory-clear-btn {
    border: none !important;
    background: transparent !important;
    color: #e53935 !important;
    font-size: 11px !important;
    font-weight: 600;
    padding: 2px 5px !important;
    cursor: pointer !important;
}
/* PHOTO PLUS - NORMAL FONT */
.memory-page .memory-photo-slot .memory-photo-add {
    font-weight: 400 !important;
    font-family: Arial, sans-serif !important;
    -webkit-text-stroke: 0 !important;
}
.memory-page .memory-description-field {
    grid-column: 1 / -1 !important;
}

.memory-page .memory-description-header {
    display: grid !important;
    grid-template-columns: 1fr 1fr 1fr !important;
    align-items: center !important;
    gap: 4px !important;
    width: 100% !important;
}

.memory-page .memory-description-header > .expense-label {
    text-align: left !important;
    font-size: 14px !important;
    white-space: nowrap !important;
}

.memory-page .memory-language-group:first-child {
    justify-content: center !important;
}

.memory-page .memory-language-group:last-child {
    justify-content: flex-end !important;
}

.memory-page .memory-speech-controls {
    display: contents !important;
}
.memory-page .memory-language-group {
    display: flex;
    align-items: center;
    gap: 3px;
    white-space: nowrap;
}

.memory-page .memory-language-group select {
    width: auto !important;
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
    padding: 0 !important;
    border: none !important;
    outline: none !important;
    background: transparent !important;
    appearance: none !important;
    -webkit-appearance: none !important;
font-size: 12px !important;
font-weight: 400 !important;
color: #2d5274 !important;
}
.memory-page .memory-description-input-wrap {
    position: relative;
    width: 100%;
}

.memory-page .memory-description-input-wrap textarea {
    width: 100% !important;
    height: 72px !important;
    min-height: 72px !important;
    max-height: 72px !important;
    padding-right: 42px !important;
    box-sizing: border-box !important;
}

.memory-page .memory-description-mic {
    position: absolute;
    right: 8px;
    bottom: 7px;
    width: 30px !important;
    min-width: 30px !important;
    max-width: 30px !important;
    height: 30px !important;
    min-height: 30px !important;
    max-height: 30px !important;
    padding: 0 !important;
    border: none !important;
    background: transparent !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer;
}
.memory-page .memory-sharing-line {
    grid-column:1 / -1;
    margin-top:6px;
    padding:5px 9px;
    border:1px solid #c4d4ff;
    border-radius:9px;
    background:#f8fbff;
}


.memory-page .memory-share-heading {
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size:11px;
    font-weight:600;
    color:#52677b;
    margin-bottom:3px;
}
.memory-page .memory-share-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
    border-bottom: 1px solid #d8e3f4;
padding-bottom: 7px;
}

.memory-page .memory-share-top a {
    color: #52677b;
    text-decoration: none;
    font-size: 11px;
    font-weight: 600;
}

.memory-page .memory-share-options {
    margin:3px 0 !important;
    gap:14px;
}
.memory-page .memory-share-toggle { display:flex; align-items:center; gap:8px; font-size:14px; color:#2d5274; font-weight:600; }
.memory-page .memory-share-toggle input { width:18px !important; height:18px !important; min-height:18px !important; margin:0 !important; }
.memory-page .memory-share-picker { margin-top:10px; padding-top:8px; border-top:1px solid #d8e3f4; }
.memory-page #addMemoryFavouriteBtn {    display: inline-flex !important;    align-items: center !important;    justify-content: center !important;    padding: 9px 16px !important;    margin-top: 10px !important;
    background: #2d5274 !important;    color: #ffffff !important;    border: 1px solid #2d5274 !important;    border-radius: 7px !important;    font-weight: 600 !important;    cursor: pointer !important;}
.memory-page .memory-share-options {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: nowrap;
    margin: 8px 0;
}

.memory-page .memory-share-options label {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 600;
    color: #2d5274;
    cursor: pointer;
}

.memory-page .memory-share-options input[type="radio"] {
    width: 16px !important;
    height: 16px !important;
    min-height: 16px !important;
    margin: 0 !important;
    cursor: pointer;
}
.memory-page .memory-share-help { font-size:12px; color:#52677b; margin-bottom:8px; }
.memory-page .memory-share-group { border:1px solid #d8e3f4; border-radius:8px; padding:8px; margin:7px 0; background:#fff; }
.memory-page .memory-share-group-title { display:flex; align-items:center; gap:8px; font-weight:600; color:#2d5274; }
.memory-page .memory-share-members { margin:8px 0 0 24px; display:grid; gap:6px; }
.memory-page .memory-share-members[hidden] {    display: none !important;}
.memory-page .memory-share-member { display:flex; align-items:center; gap:7px; font-size:13px; }
.memory-page .memory-share-member input, .memory-page .memory-share-group-title input { width:16px !important; height:16px !important; min-height:16px !important; margin:0 !important; }

    `;


    document.head.appendChild(style);
}


function openAddMemoryScreen() {
   memoryStyleOnce();
    showPage(`
        <div class="expense-page memory-page">
            <h2 class="expense-title">Add Memory</h2>

            <div class="expense-panel">
                <form id="memoryForm" class="expense-form" autocomplete="off">

            
<div class="expense-filter-grid memory-fields-grid">

    <!-- Row 1 -->
    <div class="expense-field">
        <label class="expense-label">Title *</label>
        <input type="text" id="memoryTitle"
            placeholder="Memory title" required>
    </div>

    <div class="expense-field">
        <label class="expense-label">Memory Date *</label>
        <input type="date" id="memoryDate" required>
    </div>

    <!-- Row 2 -->
    <div class="expense-field">
        <label class="expense-label">Memory Type *</label>
        <select id="memoryType" required>
            <option value="">Memory Type</option>
            <option>Text</option>
            <option>Photo</option>
            <option>Video</option>
            <option>Voice</option>
            <option>Mixed</option>
        </select>
    </div>

    <div class="expense-field">
        <label class="expense-label">Category</label>
        <select id="memoryCategory">
            <option value="">Category</option>
            <option>Family</option>
            <option>Childhood</option>
            <option>Birthdays</option>
            <option>Festivals</option>
            <option>Functions</option>
            <option>Education</option>
            <option>Trips</option>
            <option>Achievements</option>
            <option>Others</option>
        </select>
    </div>

    <!-- Row 3 -->
    <div class="expense-field">
        <label class="expense-label">Memory Place</label>
        <input type="text" id="memoryPlace"
            placeholder="Enter place">
    </div>

    <div class="expense-field memory-photo-field">
        <label class="expense-label">Photos (Max 2)</label>
        <input type="file" id="memoryPhotos"
            accept="image/*" multiple hidden>
        <div id="memoryPhotoSlots" class="memory-photo-slots"></div>
        <div class="memory-count-row">
            <small id="memoryPhotosCount">0 photos selected</small>
            <button type="button" class="memory-clear-btn"
                id="clearMemoryPhotos">Clear</button>
        </div>
    </div>

    <!-- Row 4 -->
    <div class="expense-field memory-video-field">
    <label class="expense-label">
        Videos <span class="memory-coming-soon">Coming Soon</span>
    </label>
    <input type="file" id="memoryVideos"
        accept="video/*" hidden disabled>

        <div id="memoryVideoSlots" class="memory-video-slots"
            style="pointer-events:none; opacity:0.4; cursor:not-allowed;"></div>
        <div class="memory-count-row" style="display:none;">
            <small id="memoryVideosCount">0 videos selected</small>
            <button type="button" class="memory-clear-btn"
                id="clearMemoryVideos" disabled>Clear</button>
        </div>
    </div>

    <div class="expense-field memory-voice-field">
        <label class="expense-label">Voice Messages (Max 1)</label>
        <input type="file" id="memoryVoice"
            accept="audio/*" hidden>
        <div id="memoryVoiceSlots" class="memory-voice-slots"></div>
        <div class="memory-count-row">
            <small id="memoryVoiceCount">0 voice selected</small>
            <button type="button" class="memory-clear-btn"
                id="clearMemoryVoices">Clear</button>
        </div>
    </div>

   <!-- Row 5: Description -->
<div class="expense-field memory-description-field">
    <div class="memory-description-header">
        <label class="expense-label">Description</label>

        <div class="memory-speech-controls">

            <div class="memory-language-group">
<label class="expense-label">Speaking</label>
<select id="memorySpeechInputLang">
                    <option value="te-IN" selected>తెలుగు</option>
                    <option value="en-IN">English</option>
                    <option value="hi-IN">हिन्दी</option>
                    <option value="kn-IN">ಕನ್ನಡ</option>
                    <option value="ta-IN">தமிழ்</option>
                    <option value="ml-IN">മലയാളം</option>
                </select>
            </div>

            <div class="memory-language-group">
<label class="expense-label">Text</label>
<select id="memorySpeechOutputLang">
                    <option value="te">తెలుగు</option>
                    <option value="en" selected>English</option>
                    <option value="hi">हिन्दी</option>
                    <option value="kn">ಕನ್ನಡ</option>
                    <option value="ta">தமிழ்</option>
                    <option value="ml">മലയാളം</option>
                </select>
            </div>

        </div>
    </div>

    <div class="memory-description-input-wrap">

        <textarea id="memoryDescription" rows="3"
            maxlength="500"
            placeholder="About Memory"></textarea>

        <button type="button" id="memorySpeechBtn"
            class="memory-description-mic">

            <svg class="memory-mic-icon" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor"
                 stroke-width="1.4" stroke-linecap="round"
                 stroke-linejoin="round">
                <rect x="9" y="2" width="6" height="12" rx="3"/>
                <path d="M5 10a7 7 0 0 0 14 0"/>
                <path d="M12 17v5"/>
                <path d="M8 22h8"/>
            </svg>

        </button>
    </div>

    <div class="memory-count-row">
        <small></small>
        <button type="button" class="memory-clear-btn"
            id="clearMemoryDescription" style="display:none;">Clear</button>
    </div>

</div>

                    </div>

                 <div class="memory-sharing-line">
               <div class="memory-share-top">
    <a href="#" id="memoryFamilyGroupsBtn">
        My Family Groups
    </a>

    <a href="#" id="memoryFavouriteListsBtn">
        My Favourite List
    </a>
</div>

<div class="memory-share-heading">
    <span>Visible To</span>
</div>
    <div class="memory-share-options">
        <label>
            <input type="radio" name="memoryShareType"
                   value="group" id="memoryShareGroup">
            Family Group
        </label>

        <label>
            <input type="radio" name="memoryShareType"
                   value="favourites" id="memoryShareFavourites">
            Favourites
        </label>

       <label>
    <input type="radio" name="memoryShareType"
           value="" id="memoryShareNone" checked>
    None
</label>
    </div>

    <div id="memorySharePicker" class="memory-share-picker" hidden>
    <div id="memoryShareGroups"></div>
</div>

<div id="memoryFavouritesPanel" class="memory-share-picker" hidden>
    <div class="memory-share-help">Favourite Members</div>

    <div id="memoryFavouriteList"></div>

   
</div>
</div>

                    <div class="memory-sensitive-line" id="memorySensitiveLine">
    <label>
        <input type="checkbox" id="memorySensitive">
        Sensitive
    </label>
</div>

                    <div class="expense-actions">
                        <button type="button" class="expense-primary"
                            id="memorySaveBtn">Save</button>

                        <button type="reset" class="expense-secondary">
                            Reset
                        </button>

                        <button type="button" class="expense-secondary"
                            id="memoryBackBtn">← Back</button>
                    </div>

                </form>
            </div>
        </div>
    `);
const memoryDateInput = document.getElementById('memoryDate');

const today = new Date();
const localToday =
    today.getFullYear() + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0');

memoryDateInput.max = localToday;
    document.querySelector('.memory-page')
        ?.classList.add('memory-form-view');

    document.getElementById("memoryBackBtn").onclick = () => {
        memoriesBtn.click();
    };
   const shareTypeOptions = document.querySelectorAll('input[name="memoryShareType"]');
const sharePicker = document.getElementById('memorySharePicker');
const shareGroupsContainer = document.getElementById('memoryShareGroups');
const sensitiveLine = document.getElementById('memorySensitiveLine');
const favouritesPanel = document.getElementById('memoryFavouritesPanel');
const favouriteList = document.getElementById('memoryFavouriteList');
  const MEMORY_API =
    "https://script.google.com/macros/s/AKfycbzYblwgxrGFDF2MKhiWLvrlSLdJTIgQoplD0Z2-A_tLmwrdUPWsTqzOF9-txnug4DFLpg/exec";
  
// PRELOAD FAVOURITE LISTS WHEN MEMORY PAGE OPENS

if (!Array.isArray(window.memoryFavouritesDataCache)) {
    window.memoryFavouritesDataCache = null;
}

if (
    !window.memoryFavouritesDataCache &&
    !window.memoryFavouritesDataPromise
) {
    window.memoryFavouritesDataPromise = (async () => {

        const token = sessionStorage.getItem('sessionToken') || '';
        if (!token) return [];

        const params = new URLSearchParams({
            action: 'getMemoryFavourites',
            sessionToken: token
        });

        const response = await fetch(MEMORY_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        const result = await response.json();

        if (result.status !== 'success') {
            throw new Error(
                result.message || 'Favourite Lists loading failed.'
            );
        }

        window.memoryFavouritesDataCache = result.lists || [];

        console.log(
            'Favourite Lists Loaded:',
            window.memoryFavouritesDataCache
        );

        return window.memoryFavouritesDataCache;

    })().catch(error => {
        console.error('Favourite Lists preload error:', error);
        window.memoryFavouritesDataPromise = null;
        return [];
    });
}
;
   // MY FAVOURITE LIST WINDOW



document.getElementById('memoryFavouriteListsBtn')
    .addEventListener('click', async function(event) {

    event.preventDefault();

    const token = sessionStorage.getItem('sessionToken') || '';

    if (!token) {
        showMemoryMessage('Login Required', 'Please login again.');
        return;
    }

    // Open window immediately
    const overlay = document.createElement('div');
    overlay.className = 'memory-delete-overlay';

    const box = document.createElement('div');
box.className = 'memory-delete-box memory-favourite-popup';
    const heading = document.createElement('h3');
    heading.textContent = 'My Favourites';

    const itemsBox = document.createElement('div');
    itemsBox.className = 'memory-favourite-items';
    itemsBox.textContent = 'Loading...';

    const closeBtn = document.createElement('button');
   closeBtn.type = 'button';
closeBtn.className = 'memory-favourite-close-btn';
closeBtn.textContent = 'Close';
    closeBtn.onclick = () => overlay.remove();

    box.append(heading, itemsBox, closeBtn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

       
// Reuse cached lists when available
    
   try {

    let lists = window.memoryFavouritesDataCache;

    // Fetch fresh data when cache is empty
    if (!Array.isArray(lists)) {

        if (!window.memoryFavouritesDataPromise) {

            window.memoryFavouritesDataPromise = (async () => {

                const params = new URLSearchParams({
                    action: 'getMemoryFavourites',
                    sessionToken: token
                });

                const response = await fetch(MEMORY_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: params
                });

                const result = await response.json();

                if (result.status !== 'success') {
                    throw new Error(
                        result.message || 'Favourite Lists loading failed.'
                    );
                }

                window.memoryFavouritesDataCache = result.lists || [];

                return window.memoryFavouritesDataCache;

            })().catch(error => {
                window.memoryFavouritesDataPromise = null;
                throw error;
            });
        }

        lists = await window.memoryFavouritesDataPromise;
    }

    if (!overlay.isConnected) return;

    itemsBox.innerHTML = '';
      
let openFavouriteMenu = null;
       let openFavouriteMembers = null;
       lists.forEach(item => {
    const row = document.createElement('div');
          row.classList.add('memory-favourite-list-row');
   row.style.cssText =
    'display:flex; align-items:center; gap:10px; width:100%; box-sizing:border-box; padding:8px; margin:6px 0;';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
const membersBox = document.createElement('div');
membersBox.style.cssText =
    'display:none; padding:8px 25px; margin-bottom:8px;';
let showFavouriteMembersByMenu = false;
checkbox.addEventListener('change', function() {
    if (openFavouriteMembers) {
        openFavouriteMembers.box.style.display = 'none';
        openFavouriteMembers = null;
    }
});


function showFavouriteMembers() {

    // Previous open list close
    if (openFavouriteMembers) {
        openFavouriteMembers.box.style.display = 'none';
    }

    membersBox.innerHTML = '';

    // HEADER: Favourite Name + List title
    const header = document.createElement('div');
    header.style.cssText =
        'display:flex; align-items:center; justify-content:space-between; gap:10px; padding:8px 0; margin-bottom:8px; border-bottom:1px solid #c4d4ff;';

    const listHeading = document.createElement('strong');
    listHeading.textContent = item.listName || '';
    listHeading.style.cssText =
        'font-size:15px; color:#2d5274; flex:1;';

    const listTitle = document.createElement('span');
    listTitle.textContent = 'List';
    listTitle.style.cssText =
        'font-size:14px; font-weight:700; color:#7952b3;';

    header.append(listHeading, listTitle);
    membersBox.appendChild(header);

    let serialNumber = 0;

    (item.groups || []).forEach(group => {

        (group.members || []).forEach(member => {

            serialNumber++;

            const memberRow = document.createElement('div');
            memberRow.className = 'memory-favourite-member-row';

            memberRow.style.cssText =
                'display:flex; align-items:center; gap:10px; width:100%; padding:7px 0; border-bottom:1px solid #eeeeee;';

            // Serial Number
            const serialNo = document.createElement('span');
            serialNo.textContent = serialNumber + '.';
            serialNo.style.cssText =
                'width:22px; flex:0 0 22px; text-align:right; color:#555;';

            // Member Name
            const memberName = document.createElement('span');
            memberName.textContent =
                member.name || member.loginUserName || '';
            memberName.style.cssText =
                'flex:1; text-align:left;';

            // DELETE BUTTON
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.textContent = '×';
            removeBtn.title = 'Remove Member';
            removeBtn.style.cssText =
                'width:28px; height:28px; flex:0 0 28px; border:none; border-radius:50%; background:transparent; color:#d93025; font-size:23px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center;';

            removeBtn.addEventListener('click', async function(event) {

                event.stopPropagation();

                const confirmed = await showFavouriteConfirm(
                    'Remove this member from this Favourite List?'
                );

                if (!confirmed) return;

                removeBtn.disabled = true;

                const removeParams = new URLSearchParams({
                    action: 'removeMemoryFavourite',
                    sessionToken: token,
                    familyId: group.familyId,
                    userId: member.userId,
                    favouriteListId: item.favouriteListId
                });

                try {

                    const response = await fetch(MEMORY_API, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: removeParams
                    });

                    const result = await response.json();

                    if (result.status !== 'success') {
                        throw new Error(
                            result.message || 'Member removal failed.'
                        );
                    }

                    // Remove member from current data
                    group.members = group.members.filter(m =>
                        !(
                            m.userId === member.userId
&& m.familyId === group.familyId
                        )
                    );

                    // Remove from selected members cache
                    const listId = String(item.favouriteListId);

                    if (selectedFavouriteMembers[listId]) {
                        selectedFavouriteMembers[listId] =
                            selectedFavouriteMembers[listId].filter(m =>
                                !(
                                    m.userId === member.userId
                                    && m.familyId === group.familyId
                                )
                            );
                    }

                    // Remove row from screen
                    memberRow.remove();

                    // Update serial numbers
                    membersBox.querySelectorAll(
                        '.memory-favourite-member-row'
                    ).forEach((row, index) => {
                        row.querySelector('span').textContent =
                            (index + 1) + '.';
                    });

                    // Update cached list data
window.memoryFavouritesDataCache = null;
window.memoryFavouritesDataPromise = null;
                    showMemoryMessage(
                        'Success',
                        'Member removed from Favourite List.'
                    );

                } catch (error) {

                    removeBtn.disabled = false;
                    showMemoryMessage('Error', error.message);

                }

            });

            memberRow.append(serialNo, memberName, removeBtn);
            membersBox.appendChild(memberRow);

        });

    });

    if (serialNumber === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.textContent = 'No Members in this Favourite List.';
        emptyMessage.style.cssText =
            'padding:12px 0; text-align:center; color:#888; font-size:13px;';

        membersBox.appendChild(emptyMessage);
    }

    membersBox.style.display = 'block';

    openFavouriteMembers = {
        box: membersBox
    };
}


    const name = document.createElement('div');
    name.textContent = item.listName || '';
            name.style.cssText =
                'padding:12px 8px; margin:6px 0; cursor:pointer; user-select:none;';
          name.style.flex = '1';
name.style.minWidth = '0';
name.style.textAlign = 'left';
const menuBtn = document.createElement('button');
          menuBtn.classList.add('memory-favourite-menu-trigger');
menuBtn.type = 'button';
menuBtn.textContent = '⋮';
menuBtn.title = 'Favourite List Options';
menuBtn.style.cssText =
    'border:none; background:transparent; font-size:24px; cursor:pointer; padding:4px 10px; color:#2d5274;';
          const menuBox = document.createElement('div');
          menuBox.classList.add('memory-favourite-menu');
menuBox.style.cssText =
    'display:none; margin:0 0 8px 35px; padding:8px 12px; background:#f5f8fc; border:1px solid #c4d4ff; border-radius:8px;';
       const parentFavouritesOverlay = overlay;  
          function showFavouriteConfirm(message) {
    return new Promise(resolve => {
        const confirmOverlay = document.createElement('div');
        confirmOverlay.className = 'memory-delete-overlay';

        const confirmBox = document.createElement('div');
        confirmBox.className =
            'memory-delete-box memory-favourite-popup';

        const heading = document.createElement('h3');
        heading.textContent = 'Confirm Delete';

        const messageText = document.createElement('p');
        messageText.textContent = message;

        const buttons = document.createElement('div');
      buttons.style.cssText =
    'display:flex; justify-content:center; gap:10px; margin-top:15px; width:100%;';

        const yesBtn = document.createElement('button');
        yesBtn.textContent = 'Yes';
        yesBtn.style.cssText =
    'flex:1; max-width:110px; height:36px; background:#d93025; color:white; border:0; border-radius:6px; cursor:pointer;';
        const noBtn = document.createElement('button');
        noBtn.textContent = 'Cancel';
       noBtn.style.cssText =
    'flex:1; max-width:110px; height:36px; background:#2196f3; color:white; border:0; border-radius:6px; cursor:pointer;';

        yesBtn.onclick = () => {
            confirmOverlay.remove();
            resolve(true);
        };

        noBtn.onclick = () => {
            confirmOverlay.remove();
            resolve(false);
        };

        buttons.append(yesBtn, noBtn);
        confirmBox.append(heading, messageText, buttons);
        confirmOverlay.appendChild(confirmBox);
        document.body.appendChild(confirmOverlay);
    });
}
async function openAddFavouriteMembers(item) {

    const token = sessionStorage.getItem('sessionToken') || '';

    try {
        const params = new URLSearchParams({
            action: 'getMemoryShareOptions',
            sessionToken: token
        });

        const response = await fetch(MEMORY_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        const result = await response.json();

        if (result.status !== 'success') {
            throw new Error(result.message || 'Unable to load Family Groups.');
        }

        const overlay = document.createElement('div');
        overlay.className = 'memory-delete-overlay';

        const box = document.createElement('div');
        box.className = 'memory-delete-box memory-favourite-popup';

        const heading = document.createElement('h3');
        heading.textContent = 'Add Members - ' + item.listName;

        const groupsBox = document.createElement('div');
        groupsBox.style.cssText =
            'max-height:60vh; overflow-y:auto; padding:10px;';
const filterLabel = document.createElement('label');
filterLabel.style.cssText =
    'display:none; align-items:center; gap:8px; padding:8px 10px; font-weight:600;';

const showSelectedOnly = document.createElement('input');
showSelectedOnly.type = 'checkbox';

filterLabel.append(showSelectedOnly, 'Show Selected Only');
filterLabel.style.display = 'none';
       function updateShowSelectedOnlyVisibility() {
    const hasSelection = groupsBox.querySelector(
        '.add-favourite-member-check:checked'
    );

    filterLabel.style.display = hasSelection ? 'flex' : 'none';

    if (!hasSelection) {
        showSelectedOnly.checked = false;

        groupsBox.querySelectorAll('.add-favourite-member-row')
            .forEach(row => row.style.display = 'flex');
    }
}
      


const existingLists = window.memoryFavouritesDataCache ||
    await window.memoryFavouritesDataPromise;

const currentList = (existingLists || []).find(
    list => list.favouriteListId === item.favouriteListId
);

const alreadyAdded = new Set();

(currentList?.groups || []).forEach(group => {
    (group.members || []).forEach(member => {
        alreadyAdded.add(group.familyId + ':' + member.userId);
    });
});

        (result.groups || []).forEach(group => {
const availableMembers = (group.members || []).filter(member =>
    !alreadyAdded.has(group.familyId + ':' + member.userId)
);

            const groupLabel = document.createElement('label');
            groupLabel.style.cssText =
                'display:flex; gap:10px; padding:12px 5px; font-weight:600;';

            const groupCheck = document.createElement('input');
            groupCheck.type = 'checkbox';
groupCheck.disabled = !availableMembers.length;
          
            groupLabel.append(
                groupCheck,
                document.createTextNode(group.familyName || 'Family')
            );

            const membersBox = document.createElement('div');
            membersBox.style.cssText =
                'display:none; padding:5px 25px;';
if (!availableMembers.length) {
    membersBox.textContent = 'Members not available';
    membersBox.style.display = 'block';
    membersBox.style.color = '#888';
    membersBox.style.fontSize = '13px';
    membersBox.style.padding = '5px 25px';
}
availableMembers.forEach(member => {
                const memberLabel = document.createElement('label');
                memberLabel.style.cssText =
                    'display:flex; gap:10px; padding:7px 0;';
memberLabel.classList.add('add-favourite-member-row');
                const memberCheck = document.createElement('input');
                memberCheck.type = 'checkbox';
                memberCheck.className = 'add-favourite-member-check';
                memberCheck.value = member.userId;
                memberCheck.dataset.familyId = group.familyId;

                const memberName = document.createElement('span');
                memberName.textContent = member.name || member.loginUserName || '';

            memberCheck.addEventListener('change', function() {
    updateShowSelectedOnlyVisibility();

    if (showSelectedOnly.checked) {
        memberLabel.style.display =
            memberCheck.checked ? 'flex' : 'none';
    }

    saveBtn.disabled = !groupsBox.querySelector(
        '.add-favourite-member-check:checked'
    );
});

memberLabel.append(memberCheck, memberName);
membersBox.appendChild(memberLabel);
            });

           showSelectedOnly.addEventListener('change', function() {
    groupsBox.querySelectorAll('.add-favourite-member-row')
        .forEach(memberLabel => {
            const memberCheck = memberLabel.querySelector(
                '.add-favourite-member-check'
            );

            memberLabel.style.display =
                showSelectedOnly.checked && !memberCheck.checked
                    ? 'none'
                    : 'flex';
        });
});
            groupCheck.addEventListener('change', () => {
                membersBox.style.display =
                    groupCheck.checked ? 'block' : 'none';

               if (!groupCheck.checked) {
    membersBox.querySelectorAll('input')
        .forEach(cb => cb.checked = false);

    updateShowSelectedOnlyVisibility();
}
            });

            groupsBox.append(groupLabel, membersBox);
        });

        const buttonRow = document.createElement('div');
buttonRow.style.cssText =
    'display:flex; gap:10px; justify-content:center; margin-top:12px;';
const saveBtn = document.createElement('button');
saveBtn.type = 'button';
saveBtn.textContent = 'Add';
saveBtn.disabled = true;
saveBtn.style.cssText =
    'flex:1; max-width:110px; height:34px; padding:6px 10px; background:#2e8b57; color:white; border:none; border-radius:6px; font-size:14px; font-weight:600; cursor:pointer;';
const closeBtn = document.createElement('button');
closeBtn.type = 'button';
closeBtn.textContent = 'Close';
closeBtn.style.cssText =
    'flex:1; max-width:110px; height:34px; padding:6px 10px; background:#2196f3; color:white; border:none; border-radius:6px; font-size:14px; font-weight:600; cursor:pointer;';
closeBtn.onclick = () => overlay.remove();

buttonRow.append(saveBtn, closeBtn);
        closeBtn.onclick = () => overlay.remove();

        saveBtn.onclick = async () => {

            const selected = Array.from(
                groupsBox.querySelectorAll('.add-favourite-member-check:checked')
            );

            if (!selected.length) {
                showMemoryMessage(
                    'Select Members',
                    'Please select at least one member.'
                );
                return;
            }

            saveBtn.disabled = true;

            try {
                for (const cb of selected) {

                    const saveParams = new URLSearchParams({
                        action: 'addMemoryFavourite',
                        sessionToken: token,
                        familyId: cb.dataset.familyId,
                        userId: cb.value,
                        favouriteListId: item.favouriteListId
                    });

                    const saveResponse = await fetch(MEMORY_API, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: saveParams
                    });

                    const saveResult = await saveResponse.json();

                    if (saveResult.status !== 'success') {
                        throw new Error(
                            saveResult.message || 'Member save failed.'
                        );
                    }
                }

             window.memoryFavouritesDataCache = null;
window.memoryFavouritesDataPromise = null;

overlay.remove();
// Close existing My Favourites window
parentFavouritesOverlay.remove();

// Reopen My Favourites with fresh data
document.getElementById('memoryFavouriteListsBtn').click();

showMemoryMessage(
    'Success',
    'Selected Members added to ' + item.listName + '.'
);

            } catch (error) {
                saveBtn.disabled = false;
                showMemoryMessage('Error', error.message);
            }
        };

box.append(heading, filterLabel, groupsBox, buttonRow);
       overlay.appendChild(box);
        document.body.appendChild(overlay);

    } catch (error) {
        showMemoryMessage('Error', error.message);
    }
}menuBox.style.cssText =
    'display:none; flex-direction:row; align-items:center; justify-content:space-around; gap:0; width:calc(100% - 35px); box-sizing:border-box; margin:0 0 8px 35px; padding:4px 4px; background:#f5f8fc; border:1px solid #c4d4ff; border-radius:8px;';
const menuColors = {
    List: '#7952b3',
    Add: '#2e8b57',
    Rename: '#ed8b24',
    Delete: '#d93025'
};

['List', 'Add', 'Rename', 'Delete'].forEach(option => {

    const optionBtn = document.createElement('button');
    optionBtn.type = 'button';
    optionBtn.textContent = option;

    optionBtn.style.cssText =
        `flex:1 1 0; width:25%; padding:5px 0; border:none; background:transparent; color:${menuColors[option]}; cursor:pointer; font-size:14px; font-weight:700; text-align:center; white-space:nowrap;`;

    menuBox.appendChild(optionBtn);
if (option === 'Delete') {

    const isSystemFavouriteList =
        /^Favourite\s*[123]$/i.test(
            String(item.listName || '').trim()
        );

    const memberCount = (item.groups || []).reduce(
        (total, group) =>
            total + (group.members || []).length,
        0
    );

    if (isSystemFavouriteList && memberCount === 0) {
        optionBtn.disabled = true;

        optionBtn.style.color = '#aaaaaa';
        optionBtn.style.cursor = 'not-allowed';
        optionBtn.style.opacity = '0.5';
    }
}
    if (option === 'List') {
    optionBtn.onclick = function(event) {
        event.stopPropagation();
        menuBox.style.display = 'none';
        showFavouriteMembers();
    };
}

    if (option === 'Add') {
        optionBtn.onclick = function() {
            menuBox.style.display = 'none';
            openAddFavouriteMembers(item);
        };
    }

    if (option === 'Rename') {
        optionBtn.onclick = function() {
            menuBox.style.display = 'none';
            renameList();
        };
    }
if (option === 'Delete') {
    optionBtn.onclick = async function() {
        menuBox.style.display = 'none';

        const confirmed = await showFavouriteConfirm(
'Are you sure you want to delete this Favourite List?'        );

        if (!confirmed) return;

        try {
            const deleteParams = new URLSearchParams({
                action: 'deleteMemoryFavouriteList',
                sessionToken: token,
                favouriteListID: item.favouriteListId
            });

            const deleteResponse = await fetch(MEMORY_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: deleteParams
            });

            const deleteResult = await deleteResponse.json();

            if (deleteResult.status !== 'success') {
                throw new Error(
                    deleteResult.message || 'Delete failed.'
                );
            }

            window.memoryFavouriteListsCache = null;
            window.memoryFavouriteListsPromise = null;

            parentFavouritesOverlay.remove();

            showMemoryMessage(
                'Success',
                'Favourite List reset successfully.'
            );

            document.getElementById('memoryFavouriteListsBtn').click();

        } catch (error) {
            showMemoryMessage('Error', error.message);
        }
    };
}
});
menuBtn.addEventListener('click', function(event) {
    event.stopPropagation();

    // ఇప్పటికే open అయిన menu ఉంటే దాన్ని close చేయాలి
    if (openFavouriteMenu && openFavouriteMenu !== menuBox) {
        openFavouriteMenu.style.display = 'none';
    }

    const isOpen = menuBox.style.display !== 'none';

    if (!isOpen) {
    // ప్రస్తుతం చూపిస్తున్న Members List ను మాత్రమే close చేయాలి
    if (openFavouriteMembers) {
        openFavouriteMembers.box.style.display = 'none';
        openFavouriteMembers = null;
    }

    // 4 menu buttons చూపించాలి
    menuBox.style.display = 'flex';
    openFavouriteMenu = menuBox;

    }
    else {
        menuBox.style.display = 'none';
        openFavouriteMenu = null;
    }
});
          name.style.flex = '1';
name.style.minWidth = '0';

menuBtn.style.width = '32px';
menuBtn.style.minWidth = '32px';
menuBtn.style.marginLeft = 'auto';
menuBtn.style.textAlign = 'center';
            let pressTimer = null;
            let longPressed = false;

            const renameList = async () => {
               
              const oldName = item.listName || '';

const newName = await new Promise(resolve => {

    const renameOverlay = document.createElement('div');
    renameOverlay.className = 'memory-delete-overlay';

    const renameBox = document.createElement('div');
    renameBox.className =
        'memory-delete-box memory-favourite-popup';

    const heading = document.createElement('h3');
    heading.textContent = 'Rename Favourite List';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = oldName;
    nameInput.placeholder = 'Enter Favourite List Name';
    nameInput.style.cssText =
        'width:100%; box-sizing:border-box; padding:10px; border:1px solid #9bb9d4; border-radius:7px; font-size:15px;';

    const buttons = document.createElement('div');
    buttons.style.cssText =
        'display:flex; gap:10px; justify-content:center; margin-top:15px; width:100%;';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.style.cssText =
        'flex:1; max-width:110px; height:36px; background:#2e8b57; color:white; border:0; border-radius:6px; cursor:pointer;';

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText =
        'flex:1; max-width:110px; height:36px; background:#2196f3; color:white; border:0; border-radius:6px; cursor:pointer;';

    saveBtn.onclick = () => {
        renameOverlay.remove();
        resolve(nameInput.value);
    };

    cancelBtn.onclick = () => {
        renameOverlay.remove();
        resolve(null);
    };

    buttons.append(saveBtn, cancelBtn);
    renameBox.append(heading, nameInput, buttons);
    renameOverlay.appendChild(renameBox);
    document.body.appendChild(renameOverlay);

    nameInput.focus();
    nameInput.select();
});

if (newName === null) return;

const cleanName = newName.trim();
                if (!cleanName) {
                    showMemoryMessage(
                        'Invalid Name',
                        'Please enter a list name.'
                    );
                    return;
                }

                if (cleanName === oldName) return;

                // Update UI immediately
                item.listName = cleanName;
                name.textContent = cleanName;

             const renameParams = new URLSearchParams({
    action: 'renameMemoryFavouriteList',
    sessionToken: token,
    favouriteListID: item.favouriteListId,
    listName: cleanName
});
                try {
                    const renameResponse = await fetch(MEMORY_API, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: renameParams
                    });

                    const renameResult = await renameResponse.json();

                    if (renameResult.status !== 'success') {
                        throw new Error(
                            renameResult.message || 'Rename failed.'
                        );
                    }

                } catch (error) {
                    // Restore old name if saving fails
                    item.listName = oldName;
                    name.textContent = oldName;

                    showMemoryMessage('Error', error.message);
                }
            };

            // Desktop: Double click to rename
            name.addEventListener('dblclick', renameList);

            // Mobile: Long press to rename
            name.addEventListener('touchstart', () => {
                longPressed = false;

                pressTimer = setTimeout(() => {
                    longPressed = true;
                    renameList();
                }, 650);
            }, { passive: true });

            name.addEventListener('touchend', () => {
                clearTimeout(pressTimer);
            });

            name.addEventListener('touchmove', () => {
                clearTimeout(pressTimer);
            });

            name.addEventListener('touchcancel', () => {
                clearTimeout(pressTimer);
            });

row.append(checkbox, name, menuBtn);
         itemsBox.appendChild(row);
itemsBox.appendChild(menuBox);
itemsBox.appendChild(membersBox);
       });
// Close expanded Favourite List when clicking outside it
const closeFavouriteMembersOnOutsideClick = function(event) {
    if (!overlay.isConnected) {
        document.removeEventListener(
            'click',
            closeFavouriteMembersOnOutsideClick
        );
        return;
    }

    if (!openFavouriteMembers) return;

if (
    !openFavouriteMembers.box.contains(event.target) &&
    !event.target.closest('.memory-favourite-list-row') &&
    !event.target.closest('.memory-favourite-menu')
) {        openFavouriteMembers.box.style.display = 'none';
        openFavouriteMembers = null;
    }
};
document.addEventListener(
    'click',
    closeFavouriteMembersOnOutsideClick
);
       // Close Favourite Menu when clicking anywhere else
document.addEventListener('click', function(event) {

    if (!openFavouriteMenu) return;

    const clickedInsideMenu =
        event.target.closest('.memory-favourite-menu');

    const clickedMenuButton =
        event.target.closest('.memory-favourite-menu-trigger');

    if (clickedInsideMenu || clickedMenuButton) {
        if (clickedInsideMenu) {
            openFavouriteMenu.style.display = 'none';
            openFavouriteMenu = null;
        }
        return;
    }

    openFavouriteMenu.style.display = 'none';
    openFavouriteMenu = null;

});
    } catch (error) {
        itemsBox.textContent = 'Unable to load Favourite Lists.';
        showMemoryMessage('Error', error.message);
        window.memoryFavouriteListsPromise = null;
    }
});
let selectedFavouriteMembers = {};
let selectedMemoryShareType = '';
let memoryShareOptionsLoaded = false;
let memoryShareGroupsData = [];
   

   function updateMemoryVisibilityControls() {
    const selected = document.querySelector(
        'input[name="memoryShareType"]:checked'
    );

    selectedMemoryShareType = selected ? selected.value : '';

    // Entire Group: member selection అవసరం లేదు
    // Favourites: Favourite List ఆధారంగా access
    // Custom: individual members ఎంపిక

favouritesPanel.hidden = selectedMemoryShareType !== 'favourites';
    // Sharing ఎంపిక చేసినప్పుడు Sensitive OFF
    sensitiveLine.style.display = selectedMemoryShareType ? 'none' : '';

    if (selectedMemoryShareType) {
        document.getElementById('memorySensitive').checked = false;
    }
}

    async function loadMemoryShareOptions() {
        if (memoryShareOptionsLoaded) return;
        const token = sessionStorage.getItem('sessionToken') || '';
        if (!token) throw new Error('Login session expired. Please login again.');
        const params = new URLSearchParams({action:'getMemoryShareOptions', sessionToken:token});
        const response = await fetch(MEMORY_API, {
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:params
        });
        const result = await response.json();
        if (result.status !== 'success') throw new Error(result.message || 'Unable to load Family Groups.');
        memoryShareGroupsData = Array.isArray(result.groups) ? result.groups : [];
        memoryShareOptionsLoaded = true;
        renderMemoryShareGroups();
        if (!memoryShareGroupsData.length) {
            shareGroupsContainer.textContent = 'No Family Groups with registered app members were found for your account.';
        }
    }
    function renderMemoryShareGroups() {
        shareGroupsContainer.innerHTML = '';
        memoryShareGroupsData.forEach((group, groupIndex) => {
            const card = document.createElement('div');
            card.className = 'memory-share-group';
            const title = document.createElement('label');
            title.className = 'memory-share-group-title';
            const groupCheck = document.createElement('input');
            groupCheck.type = 'checkbox';
            groupCheck.className = 'memory-share-group-check';
            groupCheck.dataset.groupIndex = String(groupIndex);
            const groupName = document.createElement('span');
            groupName.textContent = (group.familyName || 'Family') + ' (' + group.familyId + ')';
            title.append(groupCheck, groupName);
            card.appendChild(title);

            const membersBox = document.createElement('div');
            membersBox.className = 'memory-share-members';
            membersBox.hidden = true;
            (group.members || []).forEach(member => {
                const memberLabel = document.createElement('label');
                memberLabel.className = 'memory-share-member';
                const memberCheck = document.createElement('input');
                memberCheck.type = 'checkbox';
                memberCheck.className = 'memory-share-member-check';
                memberCheck.dataset.familyId = group.familyId;
                memberCheck.value = member.userId;
                const memberName = document.createElement('span');
                memberName.textContent = member.name + (member.loginUserName ? ' (' + member.loginUserName + ')' : '');
                memberLabel.append(memberCheck, memberName);
                membersBox.appendChild(memberLabel);
               memberCheck.addEventListener('change', () => {

    if (selectedMemoryShareType !== 'custom') return;

    const selectedCount = shareGroupsContainer
        .querySelectorAll('.memory-share-member-check:checked')
        .length;

    if (selectedCount > 5) {
        memberCheck.checked = false;

        showMemoryMessage(
            'Maximum Limit',
            'You can select maximum 5 members only.'
        );
    }

});
            });
          groupCheck.addEventListener('change', () => {

    const showMembers =
        selectedMemoryShareType === 'custom' &&
        groupCheck.checked;

    membersBox.hidden = !showMembers;

    if (!showMembers) {
        membersBox.querySelectorAll('input')
            .forEach(cb => cb.checked = false);
    }

});
            card.appendChild(membersBox);
            shareGroupsContainer.appendChild(card);
        });
    }
 
document.getElementById('memoryFamilyGroupsBtn')
    .addEventListener('click', async function(event) {

    event.preventDefault();

    const token = sessionStorage.getItem('sessionToken') || '';

    if (!token) {
        showMemoryMessage('Login Required', 'Please login again.');
        return;
    }

    const originalParent = sharePicker.parentNode;
    const originalNext = sharePicker.nextSibling;

    const overlay = document.createElement('div');
    overlay.className = 'memory-delete-overlay';

    const box = document.createElement('div');
box.className = 'memory-delete-box memory-family-groups-box';
    const heading = document.createElement('h3');
    heading.textContent = 'My Family Groups';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'memory-delete-confirm';
    closeBtn.textContent = 'Close';

    const closePopup = () => {
        sharePicker.hidden = true;
        originalParent.insertBefore(sharePicker, originalNext);
        overlay.remove();
    };

    closeBtn.onclick = closePopup;

    box.append(heading, sharePicker, closeBtn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    sharePicker.hidden = false;

    try {
        await loadMemoryShareOptions();
    } catch (error) {
        closePopup();
        showMemoryMessage('Family Groups', error.message);
    }
});

shareTypeOptions.forEach(option => {
    option.addEventListener('change', async () => {
        updateMemoryVisibilityControls();
shareGroupsContainer.querySelectorAll('.memory-share-group').forEach(card => {
    const groupCheck = card.querySelector('.memory-share-group-check');
    const membersBox = card.querySelector('.memory-share-members');

    membersBox.hidden = !(
        selectedMemoryShareType === 'custom' &&
        groupCheck &&
        groupCheck.checked
    );
});
if (!['group', 'custom'].includes(option.value)) {
    return;
}

        try {
            await loadMemoryShareOptions();
        } catch (error) {
            option.checked = false;
            updateMemoryVisibilityControls();
            showMemoryMessage('Sharing Options', error.message);
        }
    });
});

    // Sensitive and Family Sharing are mutually exclusive.
    // Selecting Sensitive automatically clears and hides Family Sharing.
    document.getElementById('memorySensitive').addEventListener('change', () => {
    if (document.getElementById('memorySensitive').checked) {
        shareTypeOptions.forEach(option => {
            option.checked = false;
        });

        selectedMemoryShareType = '';
        updateMemoryVisibilityControls();

        shareGroupsContainer.querySelectorAll('input[type="checkbox"]')
            .forEach(cb => cb.checked = false);

        shareGroupsContainer.querySelectorAll('.memory-share-members')
            .forEach(el => el.hidden = true);
    }
});
   document.getElementById('memoryForm').addEventListener('reset', () => {
    setTimeout(() => {

        // మూడు Sharing Options‌ను Unselect చేయడం
        shareTypeOptions.forEach(option => {
            option.checked = false;
        });

        selectedMemoryShareType = '';

        // Sharing మరియు Sensitive controls‌ను Reset చేయడం
        updateMemoryVisibilityControls();

        // పాత Member Selections అన్నీ Clear చేయడం
        shareGroupsContainer.querySelectorAll('input[type="checkbox"]')
            .forEach(cb => cb.checked = false);

        // Member Lists అన్నీ Hide చేయడం
        shareGroupsContainer.querySelectorAll('.memory-share-members')
            .forEach(el => el.hidden = true);

    }, 0);
});
  


// PHOTO SELECTION - MAX 2 (SLOTS 3-5 DISABLED)
const memoryPhotosInput = document.getElementById('memoryPhotos');
const memoryPhotoSlots = document.getElementById('memoryPhotoSlots');
const memoryPhotosCount = document.getElementById('memoryPhotosCount');

let selectedMemoryPhotos = [];

document.getElementById('memorySaveBtn').addEventListener('click', async () => {
    const saveBtn = document.getElementById('memorySaveBtn');

    try {
        const sessionToken =
            sessionStorage.getItem('sessionToken') || '';

        if (!sessionToken) {
            showMemoryMessage('Login Required', 'Please login again.');
            return;
        }

      const shareSelection = [];

if (['group', 'custom'].includes(selectedMemoryShareType)) {

    shareGroupsContainer.querySelectorAll('.memory-share-group').forEach(card => {

        const groupCheck = card.querySelector('.memory-share-group-check');

        if (!groupCheck || !groupCheck.checked) return;

        const allMemberChecks = Array.from(
            card.querySelectorAll('.memory-share-member-check')
        );

        const first = allMemberChecks[0];

        const userIds = selectedMemoryShareType === 'group'
            ? allMemberChecks.map(cb => cb.value)
            : allMemberChecks
                .filter(cb => cb.checked)
                .map(cb => cb.value);

        if (userIds.length && first) {
            shareSelection.push({
                familyId: first.dataset.familyId,
                userIds: userIds
            });
        }
    });

    if (!shareSelection.length) {
        showMemoryMessage(
            'Select Members',
            selectedMemoryShareType === 'group'
                ? 'Please select at least one Family Group.'
                : 'Please select at least one member for Custom sharing.'
        );
        return;
    }
}
if (selectedMemoryShareType === 'favourites') {

    Object.values(selectedFavouriteMembers).flat().forEach(member => {

        let group = shareSelection.find(
            item => item.familyId === member.familyId
        );

        if (!group) {
            group = {
                familyId: member.familyId,
                userIds: []
            };
            shareSelection.push(group);
        }

        if (!group.userIds.includes(member.userId)) {
            group.userIds.push(member.userId);
        }
    });

    if (!shareSelection.length) {
        showMemoryMessage(
            'Select Members',
            'Please select at least one member from Favourite Lists.'
        );
        return;
    }
}
        const title =
            document.getElementById('memoryTitle').value.trim();

        if (!title) {
            showMemoryMessage('Required', 'Please enter Memory Title.');
            return;
        }

        const body = new URLSearchParams({
            action: 'saveMemory',
            sessionToken: sessionToken,
            title: title,
            memoryDate: document.getElementById('memoryDate').value,
            memoryType: document.getElementById('memoryType').value,
            category: document.getElementById('memoryCategory').value,
            memoryPlace: document.getElementById('memoryPlace').value,
            description: document.getElementById('memoryDescription').value,
            isSensitive: String(
    !selectedMemoryShareType &&
    document.getElementById('memorySensitive').checked
),
            shareType: selectedMemoryShareType,
shareSelection: JSON.stringify(shareSelection)
        });

        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving...';

        // PHOTOS: upload directly from the browser to Google Drive in parallel.
        const photoUploadStart = performance.now();
        if (selectedMemoryPhotos.length > 0) {
            if (!googleAccessToken) {
                connectGoogleDrive();
                showMemoryMessage(
                    'Google Drive Permission',
                    'Please allow Google Drive access. After permission is granted, tap Save again.'
                );
                return;
            }

            if (!GOOGLE_DRIVE_FOLDER_ID) {
                throw new Error('Google Drive folder ID is missing.');
            }

            saveBtn.textContent = 'Uploading Photos...';

            const photoUrls = await Promise.all(
                selectedMemoryPhotos.slice(0, 2).map((photo, index) => {
                    const originalFile = photo.file;
                    const extension =
                        originalFile.type === 'image/png' ? '.png' :
                        originalFile.type === 'image/webp' ? '.webp' : '.jpg';
                    const uploadFile = new File(
                        [originalFile],
                        'MemoryPhoto_' + Date.now() + '_' + (index + 1) + extension,
                        { type: originalFile.type }
                    );
                    return uploadMemoryVideoToDrive(uploadFile);
                })
            );

            photoUrls.forEach((url, index) => {
                body.append('photo' + (index + 1) + 'Url', url);
            });

            console.log('Direct photo upload count:', photoUrls.length);
            console.log(
                'Direct photo upload time:',
                ((performance.now() - photoUploadStart) / 1000).toFixed(2),
                'seconds'
            );
        }

        // VIDEOS: retain the existing upload flow.
        if (selectedMemoryVideos.length > 0) {
            if (!googleAccessToken) {
                connectGoogleDrive();
                showMemoryMessage(
                    'Google Drive Permission',
                    'Please allow Google Drive access. After permission is granted, tap Save again.'
                );
                return;
            }

            if (!GOOGLE_DRIVE_FOLDER_ID) {
                throw new Error('Google Drive folder ID is missing.');
            }

            saveBtn.textContent = 'Uploading Videos...';

            for (let i = 0; i < selectedMemoryVideos.length; i++) {
                const videoFile = selectedMemoryVideos[i].file;
                const videoUrl = await uploadMemoryVideoToDrive(videoFile);
                body.append('video' + (i + 1) + 'Url', videoUrl);
            }
        }
        const response = await fetch(MEMORY_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });

        const result = await response.json();

        if (result.status !== 'success') {
            throw new Error(result.message || 'Memory save failed.');
        }


console.log(
  'MEMORY SAVE TIMINGS:',
  result.timings
);

console.log(
  'TOTAL MEMORY SAVE TIME:',
  result.totalSaveSeconds,
  'seconds'
);
console.log(
  'TOTAL MEMORY SAVE TIME:',
  result.totalSaveSeconds,
  'seconds'
);
showMemoryMessage(
    'Success',
    'Memory saved successfully.'
);
document.getElementById('memoryForm').reset();
    } catch (error) {
        console.error('Memory Save Error:', error);

        showMemoryMessage(
            'Save Failed',
            error.message || 'Unable to save Memory.'
        );

    } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save';
    }
});
   

async function compressMemoryPhoto(file) {

    const targetSize = 300 * 1024; // 300 KB

    if (file.size <= targetSize) {
        return file;
    }

    const image = new Image();
    const imageUrl = URL.createObjectURL(file);

    try {
        await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
            image.src = imageUrl;
        });

        let width = image.naturalWidth;
        let height = image.naturalHeight;

        const maxDimension = 1920;

        if (Math.max(width, height) > maxDimension) {
            const scale = maxDimension / Math.max(width, height);
            width = Math.round(width * scale);
            height = Math.round(height * scale);
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        while (true) {

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(image, 0, 0, width, height);

            for (let quality = 0.82; quality >= 0.45; quality -= 0.05) {

                const blob = await new Promise(resolve => {
                    canvas.toBlob(resolve, 'image/jpeg', quality);
                });

                if (blob && blob.size <= targetSize) {
                    return new File(
                        [blob],
                        file.name.replace(/\.[^/.]+$/, '') + '.jpg',
                        { type: 'image/jpeg' }
                    );
                }
            }

            if (Math.max(width, height) <= 900) {
                break;
            }

            width = Math.round(width * 0.85);
            height = Math.round(height * 0.85);
        }

        throw new Error('Photo could not be compressed within 300 KB.');

    } finally {
        URL.revokeObjectURL(imageUrl);
    }
}

   
// CUSTOM MEMORY MESSAGE WINDOW
function showMemoryMessage(title, message) {
    const overlay = document.createElement('div');
    overlay.className = 'memory-delete-overlay';
if (title === 'Success') {
    overlay.classList.add('memory-success-overlay');
}
    overlay.innerHTML = `
        <div class="memory-delete-box">
            <h3>${title}</h3>
            <p>${message}</p>
            <div class="memory-delete-actions">
                <button type="button"
                    class="memory-delete-confirm">OK</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('.memory-delete-confirm').onclick = () => {
        overlay.remove();
    };

    overlay.addEventListener('click', event => {
        if (event.target === overlay) {
            overlay.remove();
        }
    });
}
function updateMemoryPhotoSlots() {
    memoryPhotoSlots.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        const photo = selectedMemoryPhotos[i];
        const slot = document.createElement('div');

        slot.className = 'memory-photo-slot';
        if (i >= 2) {
            slot.classList.add('memory-slot-disabled');
            slot.style.opacity = '0.35';
            slot.style.cursor = 'not-allowed';
            slot.style.pointerEvents = 'none';
        }

        if (photo) {
            slot.innerHTML = `
                <img src="${photo.url}" alt="Selected photo">
                <button type="button"
                    class="memory-photo-remove"
                    data-remove-photo="${i}">×</button>
            `;
        } else {
            slot.innerHTML = `<span class="memory-photo-add">+</span>`;
            slot.dataset.empty = 'true';
        }

        memoryPhotoSlots.appendChild(slot);
    }

    memoryPhotosCount.textContent =
        `${selectedMemoryPhotos.length} photos selected`;
const clearPhotosBtn =
    document.getElementById('clearMemoryPhotos');

clearPhotosBtn.style.display =
    selectedMemoryPhotos.length > 0 ? 'inline-flex' : 'none';
    const transfer = new DataTransfer();

    selectedMemoryPhotos.forEach(photo => {
        transfer.items.add(photo.file);
    });

    memoryPhotosInput.files = transfer.files;
}

memoryPhotoSlots.addEventListener('click', event => {
    const removeButton = event.target.closest('[data-remove-photo]');

    if (removeButton) {
        const index = Number(removeButton.dataset.removePhoto);

        const overlay = document.createElement('div');
        overlay.className = 'memory-delete-overlay';

        overlay.innerHTML = `
            <div class="memory-delete-box">
                <h3>Delete Photo?</h3>
                <p>Are you sure you want to delete this photo?</p>

                <div class="memory-delete-actions">
                    <button type="button"
                        class="memory-delete-cancel">Cancel</button>

                    <button type="button"
                        class="memory-delete-confirm">Delete</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        overlay.querySelector('.memory-delete-cancel').onclick = () => {
            overlay.remove();
        };

        overlay.querySelector('.memory-delete-confirm').onclick = () => {
            if (selectedMemoryPhotos[index]) {
                URL.revokeObjectURL(selectedMemoryPhotos[index].url);
                selectedMemoryPhotos.splice(index, 1);
                updateMemoryPhotoSlots();
            }

            overlay.remove();
        };

        overlay.addEventListener('click', event => {
            if (event.target === overlay) {
                overlay.remove();
            }
        });

        return;
    }

    const emptySlot = event.target.closest('[data-empty="true"]');

    if (emptySlot) {
        memoryPhotosInput.click();
    }
});

memoryPhotosInput.addEventListener('change', async () => {

    const newFiles = Array.from(memoryPhotosInput.files);
    const remaining = 2 - selectedMemoryPhotos.length;

    if (newFiles.length > remaining) {
        showMemoryMessage(
            'Maximum Limit Reached',
            `You can select only ${remaining} more photos.`
        );
    }
const maxPhotoSize = 8 * 1024 * 1024;

const oversizedFiles = newFiles.filter(
    file => file.size > maxPhotoSize
);

if (oversizedFiles.length > 0) {
    showMemoryMessage(
        'Photo Size Limit',
        'Each photo must be 8 MB or less.'
    );

    memoryPhotosInput.value = '';
    return;
}
   const filesToAdd = newFiles.slice(0, remaining);

    memoryPhotosInput.disabled = true;

    try {
        for (const file of filesToAdd) {

            const compressedFile = await compressMemoryPhoto(file);

            selectedMemoryPhotos.push({
                file: compressedFile,
                url: URL.createObjectURL(compressedFile)
            });
        }

        updateMemoryPhotoSlots();

    } catch (error) {
        showMemoryMessage(
            'Photo Error',
            'Unable to process the selected photo.'
        );

    } finally {
        memoryPhotosInput.disabled = false;
    }
});
updateMemoryPhotoSlots();
document.getElementById('memoryForm').addEventListener('reset', () => {
    selectedMemoryPhotos.forEach(photo => {
        URL.revokeObjectURL(photo.url);
    });

    selectedMemoryPhotos = [];
    memoryPhotosInput.value = '';

    updateMemoryPhotoSlots();
});

// VIDEO SELECTION - MAX 1 (SLOTS 2-3 DISABLED)
const memoryVideosInput = document.getElementById('memoryVideos');
const memoryVideoSlots = document.getElementById('memoryVideoSlots');
const memoryVideosCount = document.getElementById('memoryVideosCount');

// Video uploads are temporarily disabled until upload performance is improved.
memoryVideosInput.disabled = true;
memoryVideoSlots.style.pointerEvents = 'none';
memoryVideoSlots.style.opacity = '0.45';
document.getElementById('clearMemoryVideos').disabled = true;
document.getElementById('clearMemoryVideos').style.display = 'none';

let selectedMemoryVideos = [];

function updateMemoryVideoSlots() {
    memoryVideoSlots.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const video = selectedMemoryVideos[i];
        const slot = document.createElement('div');

        slot.className = 'memory-video-slot memory-slot-disabled';
        // Keep all three Coming Soon boxes visually identical and non-interactive.
        slot.style.cursor = 'not-allowed';
        slot.style.pointerEvents = 'none';

        if (video) {
            slot.innerHTML = `
                <video src="${video.url}" muted playsinline></video>
                <button type="button"
                    class="memory-photo-remove"
                    data-remove-video="${i}">×</button>
            `;
        } else {
            slot.innerHTML = `<span class="memory-photo-add">+</span>`;
            slot.dataset.empty = 'true';
        }

        memoryVideoSlots.appendChild(slot);
    }

    memoryVideosCount.textContent =
        `${selectedMemoryVideos.length} videos selected`;
const clearVideosBtn =
    document.getElementById('clearMemoryVideos');

clearVideosBtn.style.display =
    selectedMemoryVideos.length > 0 ? 'inline-flex' : 'none';
    const transfer = new DataTransfer();

    selectedMemoryVideos.forEach(video => {
        transfer.items.add(video.file);
    });

    memoryVideosInput.files = transfer.files;
}

memoryVideoSlots.addEventListener('click', async event => {
   const removeButton = event.target.closest('[data-remove-video]');
    if (removeButton) {
        const index = Number(removeButton.dataset.removeVideo);
        const overlay = document.createElement('div');
        overlay.className = 'memory-delete-overlay';
        overlay.innerHTML = `
            <div class="memory-delete-box">
                <h3>Delete Video?</h3>
                <p>Are you sure you want to delete this video?</p>
                <div class="memory-delete-actions">
                    <button type="button"
                        class="memory-delete-cancel">Cancel</button>
                    <button type="button"
                        class="memory-delete-confirm">Delete</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        overlay.querySelector('.memory-delete-cancel').onclick = () => {
            overlay.remove();
        };

        overlay.querySelector('.memory-delete-confirm').onclick = () => {
            if (selectedMemoryVideos[index]) {
                URL.revokeObjectURL(selectedMemoryVideos[index].url);
                selectedMemoryVideos.splice(index, 1);
                updateMemoryVideoSlots();
            }

            overlay.remove();
        };

        overlay.addEventListener('click', event => {
            if (event.target === overlay) {
                overlay.remove();
            }
        });

        return;
    }

    const emptySlot = event.target.closest('[data-empty="true"]');

if (emptySlot) {

    let totalDuration = 0;

    for (const video of selectedMemoryVideos) {

        const url = video.url;

        const duration = await new Promise(resolve => {
            const tempVideo = document.createElement('video');

            tempVideo.preload = 'metadata';

            tempVideo.onloadedmetadata = () => {
                resolve(tempVideo.duration);
            };

            tempVideo.onerror = () => {
                resolve(0);
            };

            tempVideo.src = url;
        });

        totalDuration += duration;
    }

    if (totalDuration >= 600) {

        showMemoryMessage(
            'Maximum Duration Reached',
            'Only one video is allowed, with a maximum duration of 10 minutes.'
        );

        return;
    }

    memoryVideosInput.click();
}
});

memoryVideosInput.addEventListener('change', () => {
    const newFiles = Array.from(memoryVideosInput.files);
    const remaining = 1 - selectedMemoryVideos.length;

    if (newFiles.length > remaining) {
if (selectedMemoryVideos.length === 0) {
    showMemoryMessage(
        'Maximum Limit Reached',
        'You can select max 1 video only.'
    );
} else {
    showMemoryMessage(
        'Maximum Limit Reached',
        `You can select only ${remaining} more videos.`
    );
}    }

    newFiles.slice(0, remaining).forEach(file => {
        selectedMemoryVideos.push({
            file: file,
            url: URL.createObjectURL(file)
        });
    });

    updateMemoryVideoSlots();
});

updateMemoryVideoSlots();

document.getElementById('memoryForm').addEventListener('reset', () => {
    selectedMemoryVideos.forEach(video => {
        URL.revokeObjectURL(video.url);
    });

    selectedMemoryVideos = [];
    memoryVideosInput.value = '';

    updateMemoryVideoSlots();
});

// VOICE MESSAGE SELECTION - MAX 1 (VOICE SLOTS 2-3 DISABLED)

const memoryVoiceInput = document.getElementById('memoryVoice');
const memoryVoiceSlots = document.getElementById('memoryVoiceSlots');
const memoryVoiceCount = document.getElementById('memoryVoiceCount');
 
const GOOGLE_CLIENT_ID = "216923084943-pjo421a0hake4ml4qtem2rsn4teso9cf.apps.googleusercontent.com";
const GOOGLE_DRIVE_FOLDER_ID = "1qEYuDvWWkGY0FIRfvgQOnk7UdyzTkETo";
   let googleAccessToken = null;

const googleTokenClient = google.accounts.oauth2.initTokenClient({
  client_id: GOOGLE_CLIENT_ID,
  scope: "https://www.googleapis.com/auth/drive.file",
  callback: (response) => {
    if (response.access_token) {
      googleAccessToken = response.access_token;
      console.log("Google Drive connected successfully");
    } else {
      console.error("Google login failed", response);
    }
  }
});
  function connectGoogleDrive() {
  if (!window.google || !google.accounts || !google.accounts.oauth2) {
    alert("Google Login library is not loaded. Please refresh the page.");
    return;
  }

  googleTokenClient.requestAccessToken();
} 

async function uploadMemoryVideoToDrive(file) {
    if (!googleAccessToken) {
        throw new Error("Please connect Google Drive first.");
    }

    if (!GOOGLE_DRIVE_FOLDER_ID) {
        throw new Error("Google Drive folder ID is missing.");
    }

    const metadata = {
        name: file.name,
        mimeType: file.type,
        parents: [GOOGLE_DRIVE_FOLDER_ID]
    };

    const response = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",
        {
            method: "POST",
            headers: {
                Authorization: "Bearer " + googleAccessToken,
                "Content-Type": "application/json; charset=UTF-8",
                "X-Upload-Content-Type": file.type,
                "X-Upload-Content-Length": String(file.size)
            },
            body: JSON.stringify(metadata)
        }
    );

    if (!response.ok) {
        throw new Error(
            "Google Drive upload session failed: " + response.status
        );
    }

    const uploadUrl = response.headers.get("Location");

    if (!uploadUrl) {
        throw new Error("Google Drive upload URL not received.");
    }

    const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
            "Content-Type": file.type
        },
        body: file
    });

    if (!uploadResponse.ok) {
        throw new Error(
            "Video upload failed: " + uploadResponse.status
        );
    }

    const uploadedFile = await uploadResponse.json();

    return "https://drive.google.com/file/d/" +
        uploadedFile.id + "/view";
}

   // DESCRIPTION VOICE TO TEXT
const memoryDescription =
    document.getElementById('memoryDescription');

const clearMemoryDescriptionBtn =
    document.getElementById('clearMemoryDescription');

function updateMemoryDescriptionClearButton() {
    clearMemoryDescriptionBtn.style.display =
        memoryDescription.value.trim().length > 0 ? 'inline-flex' : 'none';
}

memoryDescription.addEventListener('input', updateMemoryDescriptionClearButton);

clearMemoryDescriptionBtn.addEventListener('click', () => {
    memoryDescription.value = '';
    updateMemoryDescriptionClearButton();
    memoryDescription.focus();
});

const memorySpeechBtn =
    document.getElementById('memorySpeechBtn');

const memorySpeechInputLang =
    document.getElementById('memorySpeechInputLang');

const memorySpeechOutputLang =
    document.getElementById('memorySpeechOutputLang');

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let memorySpeechRecognition = null;
let memorySpeechActive = false;
if (SpeechRecognition) {
    memorySpeechRecognition = new SpeechRecognition();
    memorySpeechRecognition.continuous = false;
    memorySpeechRecognition.interimResults = false;
}

memorySpeechBtn.addEventListener('click', () => {

       // iPhone: Use native keyboard dictation
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        memoryDescription.focus();
        return;
    }
    if (!memorySpeechRecognition) {
        showMemoryMessage(
            'Not Supported',
            'Please use Chrome browser for Voice to Text.'
        );
        return;
    }

    if (memorySpeechActive) {
        return;
    }

    memorySpeechRecognition.lang = memorySpeechInputLang.value;

    try {
        memorySpeechRecognition.start();
        memorySpeechActive = true;
    } catch (error) {
        memorySpeechActive = false;
        console.error('Speech Recognition Error:', error);
    }
});

memorySpeechRecognition.onend = () => {
    memorySpeechActive = false;
};

memorySpeechRecognition.onerror = (event) => {
    memorySpeechActive = false;

    console.error('Microphone Error:', event.error);

    showMemoryMessage(
        'Microphone Error',
        'Error: ' + event.error
    );
};
memorySpeechRecognition && (
    memorySpeechRecognition.onresult = async (event) => {
        try {
            const spokenText =
                event.results[0][0].transcript;

            const f = (() => {
                try {
                    return JSON.parse(
                        localStorage.getItem('currentFamily') || '{}'
                    );
                } catch (_) {
                    return {};
                }
            })();

            const body = new URLSearchParams({
                action: 'translateMemorySpeech',
                sessionToken: sessionStorage.getItem('sessionToken') || '',
                familyId: String(f.familyId || ''),
                text: spokenText,
                targetLanguage: memorySpeechOutputLang.value
            });

            const response = await fetch(MEMORY_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body
            });

            const result = await response.json();

            if (result.status !== 'success') {
                throw new Error(
                    result.message || 'Translation failed.'
                );
            }

            memoryDescription.value +=
                (memoryDescription.value ? ' ' : '') +
                result.translatedText;
            updateMemoryDescriptionClearButton();

        } catch (error) {
            showMemoryMessage(
                'Translation Error',
                error.message || 'Unable to translate speech.'
            );
        }
    }
);
   
let selectedMemoryVoices = [];


function updateMemoryVoiceSlots() {
    memoryVoiceSlots.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        const slot = document.createElement('div');
        slot.className = 'memory-voice-slot';

        // FOURTH BOX - RECORD BUTTON
        if (i === 3) {
            const recordDisabled = selectedMemoryVoices.length >= 1;
            if (recordDisabled) {
                slot.style.opacity = '0.35';
                slot.style.cursor = 'not-allowed';
            }

slot.innerHTML = `
    <button type="button" class="memory-record-button" ${recordDisabled ? 'disabled' : ''} style="${recordDisabled ? 'opacity:.35;cursor:not-allowed;' : ''}">
        <svg class="memory-mic-icon" viewBox="0 0 24 24"
             fill="none" stroke="currentColor"
             stroke-width="1.4" stroke-linecap="round"
             stroke-linejoin="round">
            <rect x="9" y="2" width="6" height="12" rx="3"/>
            <path d="M5 10a7 7 0 0 0 14 0"/>
            <path d="M12 17v5"/>
            <path d="M8 22h8"/>
        </svg>

        <span class="memory-record-timer"
              style="display:none;">00:00</span>

        <small class="memory-record-label"
               style="display:none;">Stop</small>
    </button>
`;


        } else if (i >= 1) {
            slot.classList.add('memory-slot-disabled');
            slot.style.opacity = '0.35';
            slot.style.cursor = 'not-allowed';
            slot.style.pointerEvents = 'none';
            slot.innerHTML = `<span class="memory-photo-add">—</span>`;

        } else if (selectedMemoryVoices[i]) {

            const audio = document.createElement('audio');
            audio.src = selectedMemoryVoices[i].url;
            audio.controls = true;
            slot.appendChild(audio);

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'memory-photo-remove';
            removeBtn.textContent = '×';

            removeBtn.onclick = (event) => {
                event.stopPropagation();

                const overlay = document.createElement('div');
                overlay.className = 'memory-delete-overlay';

                overlay.innerHTML = `
                    <div class="memory-delete-box">
                        <h3>Delete Voice Message?</h3>
                        <p>Are you sure you want to delete this voice message?</p>
                        <div class="memory-delete-actions">
                            <button type="button" class="memory-delete-cancel">Cancel</button>
                            <button type="button" class="memory-delete-confirm">Delete</button>
                        </div>
                    </div>
                `;

                document.body.appendChild(overlay);

                overlay.querySelector('.memory-delete-cancel').onclick = () => {
                    overlay.remove();
                };

                overlay.querySelector('.memory-delete-confirm').onclick = () => {
                    URL.revokeObjectURL(selectedMemoryVoices[i].url);
                    selectedMemoryVoices.splice(i, 1);

                    const dt = new DataTransfer();
                    selectedMemoryVoices.forEach(item => {
                        dt.items.add(item.file);
                    });

                    memoryVoiceInput.files = dt.files;

                    updateMemoryVoiceSlots();
                    overlay.remove();
                };
            };

            slot.appendChild(removeBtn);

        } else {
            slot.innerHTML = `<span class="memory-photo-add">+</span>`;

            slot.onclick = () => {
                memoryVoiceInput.click();
            };
        }

        memoryVoiceSlots.appendChild(slot);
    }

    memoryVoiceCount.textContent =
        `${selectedMemoryVoices.length} voice selected`;
   const clearVoicesBtn =
    document.getElementById('clearMemoryVoices');

clearVoicesBtn.style.display =
    selectedMemoryVoices.length > 0 ? 'inline-flex' : 'none';
}

memoryVoiceInput.addEventListener('change', () => {  
   const newFiles = Array.from(memoryVoiceInput.files);   
   const remaining = 1 - selectedMemoryVoices.length;  
   if (newFiles.length > remaining) {      
      if (selectedMemoryVoices.length === 0) {
         
            showMemoryMessage(          
               'Maximum Limit Reached',  
               'You can select only 1 voice message.'  
            );      
      } else {            showMemoryMessage(   
         'Maximum Limit Reached',
                `You can select only ${remaining}
                more voice messages.`        
      );       }    }  
   newFiles.slice(0, remaining).forEach(file => {  
      selectedMemoryVoices.push({           
         file: file,
            url: URL.createObjectURL(file)  
      });    });   
   const dt = new DataTransfer();  
   selectedMemoryVoices.forEach(item => dt.items.add(item.file));   
   memoryVoiceInput.files = dt.files;    
   updateMemoryVoiceSlots();
});
   updateMemoryVoiceSlots();
   
// DIRECT VOICE RECORDING - TESTING 30 SECONDS

let memoryRecorder = null;
let memoryRecordingChunks = [];
let memoryRecordingStream = null;
let memoryRecordingTimer = null;
let memoryRecordingInterval = null;
let memoryRecordingStartTime = null;
memoryVoiceSlots.addEventListener('click', async (event) => {

    const recordButton = event.target.closest('.memory-record-button');
    if (!recordButton) return;

    // IF ALREADY RECORDING, STOP IT
    if (memoryRecorder && memoryRecorder.state === 'recording') {
        memoryRecorder.stop();
        return;
    }

    // ONLY ONE VOICE MESSAGE IS ALLOWED
    if (selectedMemoryVoices.length >= 1) {
        showMemoryMessage(
            'Maximum Limit Reached',
            'Only one voice message is allowed.'
        );
        return;
    }

    try {
        memoryRecordingStream =
            await navigator.mediaDevices.getUserMedia({ audio: true });

        memoryRecordingChunks = [];

        memoryRecorder = new MediaRecorder(memoryRecordingStream);

        memoryRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                memoryRecordingChunks.push(event.data);
            }
        };

        memoryRecorder.onstop = () => {

            clearTimeout(memoryRecordingTimer);
    clearInterval(memoryRecordingInterval);
    memoryRecordingInterval = null;
            const mimeType = memoryRecorder.mimeType || 'audio/webm';

            const audioBlob = new Blob(memoryRecordingChunks, {
                type: mimeType
            });

            const extension = mimeType.includes('mp4') ? 'mp4' : 'webm';

            const audioFile = new File(
                [audioBlob],
                `Voice_${Date.now()}.${extension}`,
                { type: mimeType }
            );

            if (audioFile.size > 0 && selectedMemoryVoices.length < 1) {

                selectedMemoryVoices.push({
                    file: audioFile,
                    url: URL.createObjectURL(audioFile)
                });

                const dt = new DataTransfer();

                selectedMemoryVoices.forEach(item => {
                    dt.items.add(item.file);
                });

                memoryVoiceInput.files = dt.files;

                updateMemoryVoiceSlots();
               const finalTimer =
    memoryVoiceSlots.querySelector('.memory-record-timer');

if (finalTimer) {
    finalTimer.style.display = 'block';

   finalTimer.style.display = 'none';
}
            }

            memoryRecordingStream.getTracks().forEach(track => {
                track.stop();
            });

            memoryRecordingStream = null;
            memoryRecorder = null;
            memoryRecordingChunks = [];
        };

        memoryRecorder.start();
// START RECORDING TIMER
memoryRecordingStartTime = Date.now();

const timerDisplay =
    memoryVoiceSlots.querySelector('.memory-record-timer');

if (timerDisplay) {
    timerDisplay.style.display = 'block';
    timerDisplay.textContent = '00:00';
}

memoryRecordingInterval = setInterval(() => {
    const elapsed = Math.floor(
        (Date.now() - memoryRecordingStartTime) / 1000
    );

    const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const seconds = String(elapsed % 60).padStart(2, '0');

    const timer = memoryVoiceSlots.querySelector('.memory-record-timer');

    if (timer) {
        timer.textContent = `${minutes}:${seconds}`;
    }
}, 1000);
       
       recordButton.innerHTML = `
    <span class="memory-record-stop-square">■</span>
    <span class="memory-record-timer">00:00</span>
    <small class="memory-record-label">Stop</small>
`;
        // AUTOMATIC STOP AFTER 30 SECONDS
        memoryRecordingTimer = setTimeout(() => {
            if (memoryRecorder && memoryRecorder.state === 'recording') {
                memoryRecorder.stop();
            }
        }, 30000);

    } catch (error) {

        showMemoryMessage(
            'Microphone Error',
            'Microphone permission is required for voice recording.'
        );

        if (memoryRecordingStream) {
            memoryRecordingStream.getTracks().forEach(track => {
                track.stop();
            });
        }

        memoryRecordingStream = null;
        memoryRecorder = null;
    }
});

   document.getElementById('memoryForm').addEventListener('reset', () => {  
      selectedMemoryVoices.forEach(voice => {        URL.revokeObjectURL(voice.url);    });    selectedMemoryVoices = [];
    memoryVoiceInput.value = '';    updateMemoryVoiceSlots();
});


// VIDEO DURATION VALIDATION
memoryVideosInput.addEventListener('change', async () => {
    const files = Array.from(memoryVideosInput.files);

    if (!files.length) return;

    let totalDuration = 0;

    for (const file of files) {
        const url = URL.createObjectURL(file);

        const duration = await new Promise(resolve => {
            const video = document.createElement('video');
            video.preload = 'metadata';

            video.onloadedmetadata = () => {
                const seconds = video.duration;
                URL.revokeObjectURL(url);
                resolve(seconds);
            };

            video.onerror = () => {
                URL.revokeObjectURL(url);
                resolve(NaN);
            };

            video.src = url;
        });

       
if (!Number.isFinite(duration)) {
    showMemoryMessage(
        'Invalid Video',
        'Unable to read video duration. Please select a valid video.'
    );
    clearMemoryVideos();
    return;
}


        if (duration > 600) {
            alert('Each video must not exceed 10 minutes.');
            clearMemoryVideos();
            return;
        }

        totalDuration += duration;
    }

    if (totalDuration > 600) {
        alert('Video duration must not exceed 10 minutes.');
        clearMemoryVideos();
        return;
    }
});

function clearMemoryVideos() {
    selectedMemoryVideos.forEach(video => {
        URL.revokeObjectURL(video.url);
    });

    selectedMemoryVideos = [];
    memoryVideosInput.value = '';

    updateMemoryVideoSlots();
}   

memoryVoiceInput.addEventListener('change', async () => {
    const files = Array.from(memoryVoiceInput.files);
    if (!files.length) return;
    for (const file of files) {
        const url = URL.createObjectURL(file);
        const duration = await new Promise(resolve => {
            const audio = document.createElement('audio');
            audio.preload = 'metadata';
            audio.onloadedmetadata = () => {
                const seconds = audio.duration;
                URL.revokeObjectURL(url);
                resolve(seconds);            };
            audio.onerror = () => {
                URL.revokeObjectURL(url);
                resolve(NaN);            };
            audio.src = url;        });
if (!Number.isFinite(duration)) {
    showMemoryMessage(        'Invalid Voice Message',
        'Unable to read voice message duration. Please select a valid audio file.'    );    clearMemoryVoices();    return;}
if (duration > 600) {    showMemoryMessage(        'Duration Limit Exceeded',        'Each voice message must not exceed 10 minutes.'    );    clearMemoryVoices();    return;}    }
});

function clearMemoryVoices() {
    selectedMemoryVoices.forEach(voice => {
        URL.revokeObjectURL(voice.url);
    });

    selectedMemoryVoices = [];
    memoryVoiceInput.value = '';

    updateMemoryVoiceSlots();
}
   // CLEAR PHOTOS
document.getElementById('clearMemoryPhotos').addEventListener('click', () => {
    selectedMemoryPhotos.forEach(photo => {
        URL.revokeObjectURL(photo.url);
    });

    selectedMemoryPhotos = [];
    memoryPhotosInput.value = '';
    updateMemoryPhotoSlots();
});

// CLEAR VIDEOS
document.getElementById('clearMemoryVideos').addEventListener('click', () => {
    clearMemoryVideos();
});

// CLEAR VOICE MESSAGES
document.getElementById('clearMemoryVoices').addEventListener('click', () => {
    clearMemoryVoices();
});
   
}



/* ADD MEMORY BUTTON CLICK */

document.addEventListener("click", function(event) {

    if (event.target.closest("#addMemoryBtn")) {

        openAddMemoryScreen();

    }

});
