

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
    gap: 5px;
    margin: 2px 0;
    padding: 5px;
    border: 1px solid #9bb9d4;
    border-radius: 8px;
    background: #fff;
    box-sizing: border-box;
    align-items: center;
}

.memory-page .memory-photo-field input[type="file"] {
    display: none !important;
}

.memory-page .memory-photo-slot {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
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
    font-size: 25px;
    font-weight: bold;
}
/* VIDEO 3 EQUAL SIZE BOXES */
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
}

.memory-page .memory-video-slot {
    width: 100%;
    aspect-ratio: 1 / 1;
    min-width: 0;
    border: 1px dashed #9bb9d4;
    border-radius: 6px;
    background: #f7faff;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}

.memory-page .memory-video-slot:has(video) {
    background: #dff3e3 !important;
    border: 2px solid #2e8b57 !important;
}

.memory-page .memory-video-remove {
    background: #d93025 !important;
    color: #fff !important;
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

                  <div class="expense-field memory-photo-field">
    <label class="expense-label">Photos (Max 5)</label>

    <input type="file" id="memoryPhotos"
        accept="image/*" multiple hidden>

    <div id="memoryPhotoSlots" class="memory-photo-slots"></div>

    <small id="memoryPhotosCount">0 photos selected</small>
</div>

                    <div class="expense-field memory-video-field">
    <label class="expense-label">Videos (Max 3)</label>
    <input type="file" id="memoryVideos"
        accept="video/*" multiple hidden>
    <div id="memoryVideoSlots" class="memory-video-slots"></div>
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
  


// PHOTO SELECTION - MAX 5
const memoryPhotosInput = document.getElementById('memoryPhotos');
const memoryPhotoSlots = document.getElementById('memoryPhotoSlots');
const memoryPhotosCount = document.getElementById('memoryPhotosCount');

let selectedMemoryPhotos = [];

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

memoryPhotosInput.addEventListener('change', () => {
    const newFiles = Array.from(memoryPhotosInput.files);
    const remaining = 5 - selectedMemoryPhotos.length;

    if (newFiles.length > remaining) {
        alert(`You can select only ${remaining} more photos.`);
    }

    newFiles.slice(0, remaining).forEach(file => {
        selectedMemoryPhotos.push({
            file: file,
            url: URL.createObjectURL(file)
        });
    });

    updateMemoryPhotoSlots();
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

    const transfer = new DataTransfer();

    selectedMemoryVideos.forEach(video => {
        transfer.items.add(video.file);
    });

    memoryVideosInput.files = transfer.files;
}

memoryVideoSlots.addEventListener('click', event => {
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
        memoryVideosInput.click();
    }
});

memoryVideosInput.addEventListener('change', () => {
    const newFiles = Array.from(memoryVideosInput.files);
    const remaining = 3 - selectedMemoryVideos.length;

    if (newFiles.length > remaining) {
        alert(`You can select only ${remaining} more videos.`);
    }

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

// VOICE FILE COUNT
const memoryVoiceInput = document.getElementById('memoryVoice');
const memoryVoiceCount = document.getElementById('memoryVoiceCount');

memoryVoiceInput.addEventListener('change', () => {
    if (memoryVoiceInput.files.length > 3) {
        alert('Maximum 3 voice messages only allowed.');
        memoryVoiceInput.value = '';
        memoryVoiceCount.textContent = '0 voice messages selected';
        return;
    }

    memoryVoiceCount.textContent =
        `${memoryVoiceInput.files.length} voice messages selected`;
});
const memoryVideosInput = document.getElementById('memoryVideos');

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
            alert('Unable to read video duration. Please select a valid video.');
            memoryVideosInput.value = '';
            document.getElementById('memoryVideosCount').textContent = '0 videos selected';
            return;
        }

        if (duration > 600) {
            alert('Each video must not exceed 10 minutes.');
            memoryVideosInput.value = '';
            document.getElementById('memoryVideosCount').textContent = '0 videos selected';
            return;
        }

        totalDuration += duration;
    }

    if (totalDuration > 1200) {
        alert('Total duration of all videos must not exceed 20 minutes.');
        memoryVideosInput.value = '';
        document.getElementById('memoryVideosCount').textContent = '0 videos selected';
    }
});
   const memoryVoiceInput = document.getElementById('memoryVoice');

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
                resolve(seconds);
            };

            audio.onerror = () => {
                URL.revokeObjectURL(url);
                resolve(NaN);
            };

            audio.src = url;
        });

        if (!Number.isFinite(duration)) {
            alert('Unable to read voice message duration. Please select a valid audio file.');
            memoryVoiceInput.value = '';
            document.getElementById('memoryVoiceCount').textContent = '0 voice messages selected';
            return;
        }

        if (duration > 600) {
            alert('Each voice message must not exceed 10 minutes.');
            memoryVoiceInput.value = '';
            document.getElementById('memoryVoiceCount').textContent = '0 voice messages selected';
            return;
        }
    }
});
}



/* ADD MEMORY BUTTON CLICK */

document.addEventListener("click", function(event) {

    if (event.target.closest("#addMemoryBtn")) {

        openAddMemoryScreen();

    }

});

