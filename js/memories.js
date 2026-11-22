

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
    margin: 2px 0;
    padding: 5px;
    border: 1px solid #9bb9d4;
    border-radius: 8px;
    background: #fff;
    box-sizing: border-box;
    align-items: center;
}

.memory-page .memory-video-slot {
    position: relative;
    width: 100%;
    aspect-ratio: 5 / 3;
    height: auto;
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
    margin: 2px 0;
    padding: 5px;
    border: 1px solid #9bb9d4;
    border-radius: 8px;
    background: #fff;
    box-sizing: border-box;
    align-items: stretch;
}

.memory-page .memory-voice-slot {
    position: relative;
    width: 100%;
    aspect-ratio: 5 / 4;
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
    width: 42px !important;
    height: 42px !important;
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
        <label class="expense-label">Photos (Max 5)</label>
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
        Videos (Max 3)
        <span class="memory-coming-soon">Coming Soon</span>
    </label>
    <input type="file" id="memoryVideos"
        accept="video/*" multiple hidden disabled>
            
        <div id="memoryVideoSlots" class="memory-video-slots"></div>
        <div class="memory-count-row">
            <small id="memoryVideosCount">0 videos selected</small>
            <button type="button" class="memory-clear-btn"
                id="clearMemoryVideos">Clear</button>
        </div>
    </div>

    <div class="expense-field memory-voice-field">
        <label class="expense-label">Voice Messages (Max 3)</label>
        <input type="file" id="memoryVoice"
            accept="audio/*" multiple hidden>
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
            id="clearMemoryDescription" style="display:none;">Clear Text</button>
    </div>

</div>

                    </div>

                    <div class="memory-sensitive-line">
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
  


// PHOTO SELECTION - MAX 5
const memoryPhotosInput = document.getElementById('memoryPhotos');
const memoryPhotoSlots = document.getElementById('memoryPhotoSlots');
const memoryPhotosCount = document.getElementById('memoryPhotosCount');

let selectedMemoryPhotos = [];

document.getElementById('memorySaveBtn').addEventListener('click', async () => {
    const saveBtn = document.getElementById('memorySaveBtn');

    try {
        const family = JSON.parse(
            localStorage.getItem('currentFamily') || '{}'
        );

        const sessionToken =
            sessionStorage.getItem('sessionToken') || '';

        if (!sessionToken || !family.familyId) {
            showMemoryMessage(
                'Login Required',
                'Please login again and select your family.'
            );
            return;
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
            familyId: String(family.familyId),
            title: title,
            memoryDate: document.getElementById('memoryDate').value,
            memoryType: document.getElementById('memoryType').value,
            category: document.getElementById('memoryCategory').value,
            memoryPlace: document.getElementById('memoryPlace').value,
            description: document.getElementById('memoryDescription').value,
            isSensitive: String(
                document.getElementById('memorySensitive').checked
            )
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
                selectedMemoryPhotos.slice(0, 5).map((photo, index) => {
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
    const remaining = 5 - selectedMemoryPhotos.length;

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

// VIDEO SELECTION - MAX 3
const memoryVideosInput = document.getElementById('memoryVideos');
const memoryVideoSlots = document.getElementById('memoryVideoSlots');
   memoryVideoSlots.style.pointerEvents = 'none';
memoryVideoSlots.style.opacity = '0.45';

document.getElementById('clearMemoryVideos').disabled = true;
document.getElementById('clearMemoryVideos').style.display = 'none';
const memoryVideosCount = document.getElementById('memoryVideosCount');

let selectedMemoryVideos = [];

function updateMemoryVideoSlots() {
    memoryVideoSlots.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const video = selectedMemoryVideos[i];
        const slot = document.createElement('div');

        slot.className = 'memory-video-slot';

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

    if (totalDuration >= 1200) {

        showMemoryMessage(
            'Maximum Duration Reached',
            'Total video duration cannot exceed 20 minutes.'
        );

        return;
    }

    memoryVideosInput.click();
}
});

memoryVideosInput.addEventListener('change', () => {
    const newFiles = Array.from(memoryVideosInput.files);
    const remaining = 3 - selectedMemoryVideos.length;

    if (newFiles.length > remaining) {
if (selectedMemoryVideos.length === 0) {
    showMemoryMessage(
        'Maximum Limit Reached',
        'You can select max 3 videos only.'
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

// VOICE MESSAGE SELECTION

const memoryVoiceInput = document.getElementById('memoryVoice');
const memoryVoiceSlots = document.getElementById('memoryVoiceSlots');
const memoryVoiceCount = document.getElementById('memoryVoiceCount');
   const MEMORY_API =
    "https://script.google.com/macros/s/AKfycbzYblwgxrGFDF2MKhiWLvrlSLdJTIgQoplD0Z2-A_tLmwrdUPWsTqzOF9-txnug4DFLpg/exec";
const GOOGLE_CLIENT_ID = "216923084943-pjo421a0hake4ml4qtem2rsn4teso9cf.apps.googleusercontent.com";
const GOOGLE_DRIVE_FOLDER_ID = "11-usnNbFwJN8pRr4kGgpOVilqFwGxAI0";
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
          
          
slot.innerHTML = `
    <button type="button" class="memory-record-button">
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
   const remaining = 3 - selectedMemoryVoices.length;  
   if (newFiles.length > remaining) {      
      if (selectedMemoryVoices.length === 0) {
         
            showMemoryMessage(          
               'Maximum Limit Reached',  
               'You can select max 3 voice messages only.'  
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

    // MAXIMUM 3 VOICE MESSAGES
    if (selectedMemoryVoices.length >= 3) {
        showMemoryMessage(
            'Maximum Limit Reached',
            'You can add maximum 3 voice messages only.'
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

            if (audioFile.size > 0 && selectedMemoryVoices.length < 3) {

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

    if (totalDuration > 1200) {
        alert('Total duration of all videos must not exceed 20 minutes.');
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

