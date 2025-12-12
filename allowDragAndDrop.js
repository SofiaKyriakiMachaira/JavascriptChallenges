// Problem: Allow drag and drop functionality on p:fileUpload (JSF PrimeFaces) component with display="none"
// Solution: prevent default drop and dragover behavior, add security checks 
// (ensure file name has allowed characters, only accept certain file extensions, p:fileUpload attributes handle the rest)

function allowDragAndDrop() {
    function sanitizeFileName(name) {
        return name
            .normalize("NFC") // normalize Unicode
            .replace(
                /[^A-Za-z0-9\u0370-\u03FF\u1F00-\u1FFF.,-_'"\(\)\[\]\s]+/g,
                ""
            );
    }

    function bindDragAndDrop() {
        document.addEventListener("dragover", element => {
            element.preventDefault();
        }, { passive: false });

        document.addEventListener("drop", element => {
            const findTarget = element.target.classList.contains("upload-button") ? 1 : (element.target.parentElement.classList.contains("custom-upload-button") ? 1 : null);
            if (findTarget == null || !findTarget) return;

            element.preventDefault();
            const input = element.target.querySelector("input[type='file']");
            const dt = new DataTransfer();
            // Only allow certain file extensions for security reasons
            const allowedExtensions = ['.pdf'];

            const fileList = [...element.dataTransfer.files].filter(file => {
                if (!(file instanceof File)) return false;
                if (file.name !== sanitizeFileName(file.name)) return false;
                return allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
            });

            if (fileList.length === 0) return;

            for (const file of fileList)
                dt.items.add(file);

            input.files = dt.files;
            input.dispatchEvent(new Event("change"));
        }, { passive: false });
    }
    window.addEventListener("DOMContentLoaded", bindDragAndDrop);
}
allowDragAndDrop();