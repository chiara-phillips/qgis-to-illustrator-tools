import os

from qgis.core import QgsLayoutExporter, QgsMapLayer, QgsProject

# Load the existing QGIS project where all rasters & vector layers are styled
project_path = "/path/to_your_qgis_project.qgz"
project = QgsProject.instance()
project.read(project_path)

# Get the layout (Make sure this exists in your QGIS project)
layout_manager = project.layoutManager()
layout = layout_manager.layoutByName("Layout_Name")

# Get the root layer tree (to control visibility)
root = project.layerTreeRoot()

# Get all raster layers in the project
raster_layers = [
    layer
    for layer in project.mapLayers().values()
    if layer.type() == QgsMapLayer.RasterLayer
]

# Get all vector layers (so they remain visible)
vector_layers = [
    layer
    for layer in project.mapLayers().values()
    if layer.type() != QgsMapLayer.RasterLayer
]

# Set output directory for exported images
output_folder = "desired_output_directory"
os.makedirs(output_folder, exist_ok=True)

# Loop through all raster layers and export one at a time
for raster_layer in raster_layers:
    # Hide all raster layers
    for layer in raster_layers:
        root.findLayer(layer.id()).setItemVisibilityChecked(False)

    # Show only the current raster layer
    root.findLayer(raster_layer.id()).setItemVisibilityChecked(True)

    # Ensure all vector layers stay visible
    for vector_layer in vector_layers:
        root.findLayer(vector_layer.id()).setItemVisibilityChecked(True)

    # Refresh the project to apply changes
    project.reloadAllLayers()

    # Export layout as PNG (using raster layer name)
    exporter = QgsLayoutExporter(layout)
    out_path = os.path.join(output_folder, f"{raster_layer.name()}.png")
    exporter.exportToImage(out_path, QgsLayoutExporter.ImageExportSettings())

    print(f"Saved: {out_path}")

print("All styled images exported!")
