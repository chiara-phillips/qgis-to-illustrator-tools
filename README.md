# QGIS to Illustrator Tools

## Overview

This repository contains a collection of scripts used in the [North Atlantic Phytoplankton Bloom map](https://www.chiaraphillips.com/maps/phytoplankton-bloom) designed by Chiara Phillips for the E.U. Copernicus Marine Service and Mercator Ocean as part of the [Data Viz Webinar Series](https://youtu.be/Ie22d4oVOPA?t=3377).
These tools help with isolating the time periods needed to map the North Atlantic Phytoplankton Bloom, converting Zarr files to GeoTiff formats, and automating the export of map layouts from QGIS and Illustrator.

Inside, there are:
- 4 step-by-step Jupyter notebooks for spatial and temporal analysis
- 1 Python script for use in **QGIS**
- 1 JavaScript script for use in **Illustrator**

---

## Installation

### Create environment from environment.yml

```bash
conda env create -f environment.yml
```

### Activate the environment
```bash
conda activate py3.10
```

### Install dependencies with poetry
```bash
poetry install
```
---

## Outline
#### Jupyter Notebooks (for data exploration & analysis)
**Use it by running:**
```bash
jupyter notebook
```
##### `00_cms_data_download.ipynb`
- Downloads chlorophyll-a concentration Zarr data for the year 2024 from the Copernicus Marine Service platform

##### `01_create_latitude_blocks.ipynb`
- Creates global 10 degree **latitude band polygons** from the Equator to the North Pole.
- Saves them as a vector file for clipping or spatial joins.
- Displays map of the latitude bands.

##### `02_zarr_by_latitude.ipynb`
- Loads the **North Atlantic Ocean** polygon from a GOaS vector file.
- Creates a time-series chart of daily chlorophyll-a values within each latitude band of the North Atlantic

##### `03_zarr_to_geotiffs.ipynb`
- Loads a chlorophyll-a Zarr dataset using `xarray`.
- Extracts each daily **time step** as a **GeoTIFF raster**.
- Output rasters go to: `data/rasters/`
-

### Python Script (for QGIS export)

##### `qgis_layout_export.py`
- Custom QGIS layout automation script to be used in the QGIS Python Console

**Use it by:**
1. Styling all of your GeoTiffs in your layers panel in QGIS.
2. Creating a map layout.
3. Running the script via QGIS Python Console.


### JavaScript script (for Illustrator export)

##### `illustrator_relink_and_export.js`
- Adds **text labels** for each latitude band directly in Illustrator based on file name.
- Designed to work with all PNG layers in a directory, exported from QGIS.
- Reads the file names and places text objects at a fixed position.

**Use it by:**
1. Creating an Illustrator Layout with a textbox that says your month and day, ex. "MARCH 01"
2. Adding your map PNG as a linked image to your Illustrator layout.
3. Editing file paths/variables to match your paths in the JavaScript script
4. Running the script via **File > Scripts > Other Script...**

---

## CHANGELOG
- 0.2.0 - Add CMS data download, switch from NetCDF to Zarr
- 0.1.0 - Initial Release

---

## License

This project is licensed under the MIT License. See LICENSE for details.

---

## Contact

For questions or suggestions, open an issue on GitHub or reach out to the repository maintainer.
