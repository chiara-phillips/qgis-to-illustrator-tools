#target illustrator

// Define the folders
var imageFolder = new Folder("/path_to_your_qgis_pngs");
var exportFolder = new Folder("/path_to_your_desired_output_directory);
var linkedFile = "cmems_mod_glo_bgc-pft_anfc_0.25deg_P1D-m_chl_180.00W-179.75E_80.00S-90.00N_0.49m_2024-03-01.png"
var dateFrame = "MARCH 01"

// Ensure folders exist
if (!imageFolder.exists) {
    alert("Image folder not found!");
    exit();
}
if (!exportFolder.exists) {
    exportFolder.create(); // Create export folder if it doesn't exist
}

// Get all PNG files in the folder
var imageFiles = imageFolder.getFiles("*.png");

// Get the active Illustrator document
var doc = app.activeDocument;

// Find the linked image in the document (assumes only one linked item)
var linkedItem = null;
for (var i = 0; i < doc.placedItems.length; i++) {
    if (doc.placedItems[i].file) {
        if (doc.placedItems[i].file.name === linkedFile) { // Match the existing linked filename
            linkedItem = doc.placedItems[i];
            break;
        }
    }
}

// If no linked image is found, exit
if (!linkedItem) {
    alert("No linked image found matching ${linkedFile}.");
    exit();
}

// Find the text frame to update
var textFrame = null;
for (var i = 0; i < doc.textFrames.length; i++) {
    if (doc.textFrames[i].contents === dateFrame) { // Change this to match the placeholder format in Illustrator
        textFrame = doc.textFrames[i];
        break;
    }
}

// If no text frame is found, exit
if (!textFrame) {
    alert("No text frame placeholder matching ${dateFrame}.");
    exit();
}

// Month mapping
var monthNames = {
    "01": "JANUARY", "02": "FEBRUARY", "03": "MARCH", "04": "APRIL", "05": "MAY",
    "06": "JUNE", "07": "JULY", "08": "AUGUST", "09": "SEPTEMBER", "10": "OCTOBER",
    "11": "NOVEMBER", "12": "DECEMBER"
};

// ImageCaptureOptions for 300 DPI export
var opts = new ImageCaptureOptions();
opts.resolution = 300;        // 300 DPI for high-quality export
opts.antialiasing = true;     // Enable anti-aliasing
opts.transparency = true;     // Maintain transparency

// Get the artboard bounds (to capture the entire artboard)
var artboardBounds = doc.artboards[doc.artboards.getActiveArtboardIndex()].artboardRect;

// Loop through all images in the folder
for (var j = 0; j < imageFiles.length; j++) {
    var newImageFile = new File(imageFiles[j]);

    // Extract the month and day from the filename
    var match = newImageFile.name.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
        var monthNum = match[2]; // Extract month
        var day = match[3]; // Extract day
        var monthName = monthNames[monthNum]; // Get full month name

        if (monthName) {
            textFrame.contents = monthName + " " + day; // Update the text in Illustrator
        } else {
            alert("Invalid month number in filename: " + newImageFile.name);
            continue; // Skip this file
        }
    } else {
        alert("Filename format not recognized: " + newImageFile.name);
        continue; // Skip this file
    }

    // Relink the image
    linkedItem.file = newImageFile;

    // Get filename for export
    var imageName = newImageFile.name; // Keep the original filename

    // Use imageCapture for high-resolution export of the entire artboard
    try {
        var exportPath = exportFolder + "/" + imageName; // Define the export path
        doc.imageCapture(
            new File(exportPath),         // File path for the exported image
            artboardBounds,               // Capture the bounds of the entire artboard
            opts                          // Pass export options (resolution, anti-aliasing)
        );
    } catch (e) {
        alert("Error during image capture: " + e.message);
    }
}

alert("Batch export complete!");
