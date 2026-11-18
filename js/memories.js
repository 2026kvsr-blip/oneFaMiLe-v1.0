
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
            align-items: start;
        }

        .memory-page .expense-field {
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 2px !important;
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
    margin-top: 22px !important;
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
            padding-bottom: 78px !important;
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

        @media (max-width: 600px) {
            .memory-page .memory-fields-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
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

                        <div class="expense-field">
                            <label class="expense-label">Title *</label>
                            <input type="text" id="memoryTitle"
                                placeholder="Memory title" required>
                        </div>

                        <div class="expense-field">
                            <label class="expense-label">Memory Date *</label>
                            <input type="date" id="memoryDate" required>
                        </div>

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

                        <div class="expense-field">
                            <label class="expense-label">Memory Place</label>
                            <input type="text" id="memoryPlace"
                                placeholder="Enter place">
                        </div>

                        <div class="expense-field">
                           <label class="expense-label">Description</label>
<textarea id="memoryDescription" rows="3"
    placeholder="About Memory"></textarea>
                        </div>

                     <div class="expense-field">
    <label class="expense-label">Photos (Max 5)</label>
    <input type="file" id="memoryPhotos"
        accept="image/*" multiple>
    <small id="memoryPhotosCount">0 photos selected</small>
</div>

                     <div class="expense-field">
    <label class="expense-label">Videos (Max 3)</label>
    <input type="file" id="memoryVideos"
        accept="video/*" multiple>
    <small id="memoryVideosCount">0 videos selected</small>
</div>

                      <div class="expense-field">
    <label class="expense-label">Voice Messages (Max 3)</label>
    <input type="file" id="memoryVoice"
        accept="audio/*" multiple>
    <small id="memoryVoiceCount">0 voice messages selected</small>
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

    document.querySelector('.memory-page')
        ?.classList.add('memory-form-view');

    document.getElementById("memoryBackBtn").onclick = () => {
        memoriesBtn.click();
    };
   const memoryFileCounts = [
    ['memoryPhotos', 'memoryPhotosCount', 'photos'],
    ['memoryVideos', 'memoryVideosCount', 'videos'],
    ['memoryVoice', 'memoryVoiceCount', 'voice messages']
];

memoryFileCounts.forEach(([inputId, countId, label]) => {
    const input = document.getElementById(inputId);
    const count = document.getElementById(countId);

    input.addEventListener('change', () => {
        const total = input.files.length;
        count.textContent = `${total} ${label} selected`;
    });
});
}



/* ADD MEMORY BUTTON CLICK */

document.addEventListener("click", function(event) {

    if (event.target.closest("#addMemoryBtn")) {

        openAddMemoryScreen();

    }

});

