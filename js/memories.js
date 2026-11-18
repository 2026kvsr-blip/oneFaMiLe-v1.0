
/* =====================================
   oneFaMiLe - MEMORIES FRONTEND
===================================== */

function openAddMemoryScreen() {

    showPage(

        pageTitle(
            "Add Memory",
            "images/colorbtns/Memories1.png"
        )

        + `

        <div class="expense-panel">

        <form id="memoryForm" class="expense-form">

            <div class="expense-filter-grid">

                <div class="expense-field">
                    <label class="expense-label">Title *</label>
                    <input type="text" id="memoryTitle"
                    placeholder="Enter memory title" required>
                </div>

                <div class="expense-field">
                    <label class="expense-label">Memory Date *</label>
                    <input type="date" id="memoryDate" required>
                </div>

                <div class="expense-field">
                    <label class="expense-label">Memory Type *</label>
                    <select id="memoryType" required>
                        <option value="">Select Memory Type</option>
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
                        <option value="">Select Category</option>
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
                    <textarea id="memoryDescription"
                    rows="3" placeholder="Write your memories here"></textarea>
                </div>

                <div class="expense-field">
                    <label class="expense-label">Photos (Maximum 5)</label>
                    <input type="file" id="memoryPhotos"
                    accept="image/*" multiple>
                    <small>Maximum 5 photos</small>
                </div>

                <div class="expense-field">
                    <label class="expense-label">Videos (Maximum 3)</label>
                    <input type="file" id="memoryVideos"
                    accept="video/*" multiple>
                    <small>
                    Each video: Maximum 10 minutes.
                    Total duration: Maximum 20 minutes.
                    </small>
                </div>

                <div class="expense-field">
                    <label class="expense-label">Voice Messages (Maximum 3)</label>
                    <input type="file" id="memoryVoice"
                    accept="audio/*" multiple>
                    <small>Each voice message: Maximum 10 minutes</small>
                </div>

            </div>

            <div style="margin:12px 0;">
                <label>
                    <input type="checkbox" id="memorySensitive">
                    Sensitive Memory
                </label>
            </div>

            <div class="expense-actions">

                <button type="button"
                class="expense-primary"
                id="memorySaveBtn">
                Save
                </button>

                <button type="reset"
                class="expense-secondary">
                Reset
                </button>

                <button type="button"
                class="expense-secondary"
                id="memoryBackBtn">
                ← Back
                </button>

            </div>

        </form>
        </div>

        `
    );

    document.getElementById("memoryBackBtn").onclick = () => {
        memoriesBtn.click();
    };

}


/* ADD MEMORY BUTTON CLICK */

document.addEventListener("click", function(event) {

    if (event.target.closest("#addMemoryBtn")) {

        openAddMemoryScreen();

    }

});

