# Earthquakes API

## Description

The Earthquakes API is a RESTful API that provides information about earthquakes worldwide. It utilizes real-time earthquake data from various sources to provide accurate and up-to-date information. Earthquake data is retrieved from the USGS Earthquake and stored in a database for easy access.

## Installation

To install and run the Earthquakes API, follow these steps:

1. Clone the repository

```bash
https://github.com/axelnt/Earthquakes-API.git
```

2. Navigate to the project directory

```bash
cd Earthquakes-API
```

3. Install the dependencies

```bash
npm install
```

4. Start the API server

```bash
npm run start
```

## Usage

### Retrieving Earthquake Data

To retrieve earthquake data, you can send a GET request to the following endpoint:

```
GET /api/v1/earthquakes
```

#### Example Request

```bash
curl http://localhost:3000/api/v1/earthquakes
```

#### Example Response

```json
{
	"status": "success",
	"data": {
		"page": 1,
		"length": 1,
		"earthquakes": [
			{
				"code": "7000msg6",
				"location": "western Indian-Antarctic Ridge",
				"magnitude": {
					"value": 4.7,
					"uncertainty": 0.126
				},
				"magType": "mb",
				"time": {
					"value": "2024-06-14T15:38:02.253Z",
					"uncertainty": 1.23
				},
				"epochTime": 1718379482253,
				"coordinates": {
					"latitude": {
						"value": -51.5459,
						"uncertainty": 0.0812
					},
					"longitude": {
						"value": 139.4706,
						"uncertainty": 0.127
					}
				},
				"depth": {
					"meters": {
						"value": 10,
						"uncertainty": 1.92
					}
				},
				"type": "earthquake",
				"source": "us",
				"status": "reviewed",
				"numberOfStations": 26,
				"tsunami": false,
				"placeInformation": null
			}
		]
	},
	"timestamp": 1718394198364
}
```

### Filtering Earthquake Data

You can filter earthquake data by specifying query parameters in the request URL. The following query parameters are supported:

| Query       | Description                                          | Minimum Value | Maximum Value | Required | Default Value |
| ----------- | ---------------------------------------------------- | ------------- | ------------- | -------- | ------------- |
| `page`      | The page number to retrieve                          | 1             | -             | No       | 1             |
| `limit`     | The number of items to return                        | 1             | 30            | No       | 10            |
| `time`      | The time range to filter by, i.e. 1h, 1d, 30d, 20m   | 1m            | -             | No       | -             |
| `magnitude` | The magnitude range to filter by, i.e. 4.0, 5.0, 6.0 | 0.0           | 10.0          | No       | -             |
| `latitude`  | The latitude range to filter by, i.e. -90, 90        | -90.0         | 90.0          | No       | -             |
| `longitude` | The longitude range to filter by, i.e. -180, 180     | -180.0        | 180.0         | No       | -             |
| `depth`     | The depth range to filter by, i.e. 0, 100            | 0             | 1000          | No       | -             |
| `distance`  | The distance range to filter by, i.e. 100, 1000      | 0             | -             | No       | -             |
| `unit`      | The unit of distance to use, i.e. m, km, ft, yd, mi  | -             | -             | No       | -             |

#### Example Request

```bash
curl http://localhost:3000/api/v1/earthquakes?limit=5&time=1d&magnitude=5.0&latitude=0,90&longitude=0,180&depth=0,100&distance=1000&unit=km
```

### Retrieving Earthquake Data by Code

To retrieve earthquake data by code, you can send a GET request to the following endpoint:

```
GET /api/v1/earthquakes/:code/details
```

#### Example Request

```bash
curl http://localhost:3000/api/v1/earthquakes/7000msc3/details
```

#### Example Response

```json
{
	"status": "success",
	"data": {
		"earthquake": {
			"code": "7000msc3",
			"location": "southern Mid-Atlantic Ridge",
			"magnitude": {
				"value": 5.9,
				"uncertainty": 0.086
			},
			"magType": "mww",
			"time": {
				"value": "2024-06-14T09:51:57.377Z",
				"uncertainty": 1.08
			},
			"epochTime": 1718358717377,
			"coordinates": {
				"latitude": {
					"value": -31.1972,
					"uncertainty": 0.0842
				},
				"longitude": {
					"value": -13.3447,
					"uncertainty": 0.0962
				}
			},
			"depth": {
				"meters": {
					"value": 10,
					"uncertainty": 1.841
				}
			},
			"type": "earthquake",
			"source": "us",
			"status": "reviewed",
			"numberOfStations": 157,
			"tsunami": false,
			"placeInformation": null
		}
	},
	"timestamp": 1718394575247
}
```

#### Retrieving Sources

To retrieve the sources of earthquake data, you can send a GET request to the following endpoint:

```bash
GET /api/v1/sources
```

#### Example Request

```bash
curl http://localhost:3000/api/v1/sources
```

### Fetching Earthquakes from Sources Manually

To fetch earthquakes from sources manually, you can send a POST request to the following endpoint. You need to provide your API Key in the request header as `x-api-key` and the source data in the request body as JSON. The following fields are required in the request body:

```bash
GET /api/v1/eartquakes/admin/fetch
```

#### Example Request

```bash
curl -X POST http://localhost:3000/api/v1/earthquakes/admin/fetch \
-H "Content-Type: application/json" \
-H "x-api-key: YOUR_API_KEY" \
```

### Creating a New Earthquake Manually

To create a new earthquake manually, you can send a POST request to the following endpoint. You need to provide your API Key in the request header as `x-api-key` and the earthquake data in the request body as JSON. The following fields are required in the request body:

```bash
POST /api/v1/earthquakes
```

#### Example Request

```bash
curl -X POST http://localhost:3000/api/v1/earthquakes \
-H "Content-Type: application/json" \
-H "x-api-key: YOUR_API_KEY" \
-d '{
    "code": "7000msc3",
    "location": "southern Mid-Atlantic Ridge",
    "magnitude": {
        "value": 5.9,
        "uncertainty": 0.086
    },
    "magType": "mww",
    "time": {
        "value": "2024-06-14T09:51:57.377Z",
        "uncertainty": 1.08
    },
    "epochTime": 1718358717377,
    "coordinates": {
        "latitude": {
        "value": -31.1972,
        "uncertainty": 0.0842
        },
        "longitude": {
        "value": -13.3447,
        "uncertainty": 0.0962
        }
    },
    "depth": {
        "meters": {
        "value": 10,
        "uncertainty": 1.841
        }
    },
    "type": "earthquake",
    "source": "us",
    "status": "reviewed",
    "numberOfStations": 157,
    "tsunami": false,
    "placeInformation": null
}'
```

#### Example Response

```json
{
	"status": "success",
	"data": {
		"earthquake": {
			"code": "7000msc3",
			"location": "southern Mid-Atlantic Ridge",
			"magnitude": {
				"value": 5.9,
				"uncertainty": 0.086
			},
			"magType": "mww",
			"time": {
				"value": "2024-06-14T09:51:57.377Z",
				"uncertainty": 1.08
			},
			"epochTime": 1718358717377,
			"coordinates": {
				"latitude": {
					"value": -31.1972,
					"uncertainty": 0.0842
				},
				"longitude": {
					"value": -13.3447,
					"uncertainty": 0.0962
				}
			},
			"depth": {
				"meters": {
					"value": 10,
					"uncertainty": 1.841
				}
			},
			"type": "earthquake",
			"source": "us",
			"status": "reviewed",
			"numberOfStations": 157,
			"tsunami": false,
			"placeInformation": null
		}
	},
	"timestamp": 1718395074504
}
```

#### Example Response

```json
{
	"status": "success",
	"data": {
		"sources": {
			"nc": "California Integrated Seismic Network",
			"ak": "Alaska Earthquake Center",
			"ci": "California Integrated Seismic Network",
			"uu": "University of Utah Seismograph Stations",
			"pr": "Puerto Rico Seismic Network",
			"hv": "Hawaii Volcano Observatory",
			"us": "USGS National Earthquake Information Center",
			"tx": "Texas Seismological Network",
			"av": "Alaska Volcano Observatory",
			"nm": "New Madrid Seismic Network"
		}
	},
	"timestamp": 1718394636829
}
```

### Health Check

To check the health of the API server, you can send a GET request to the following endpoint:

```bash
GET /api/v1/ping
```

#### Example Request

```bash
curl http://localhost:3000/api/v1/ping
```

#### Example Response

```json
{
	"status": "success",
	"message": "Still Alive!",
	"timestamp": 1718394530895
}
```

## Data Sources

The Earthquakes API utilizes data from the following sources:

- USGS (United States Geological Survey): Provides real-time earthquake data worldwide. The API retrieves earthquake data from USGS and stores it in a database for easy access.

- Nominatim from OpenStreetMap: Provides location data for earthquake events. The API uses Nominatim to deliver accurate and detailed location information.

By combining data from USGS and Nominatim, the Earthquakes API offers comprehensive and up-to-date earthquake information with precise location details.

For more information about the data sources, you can visit the following websites:

- [USGS Earthquake Hazards Program](https://www.usgs.gov/programs/earthquake-hazards)
- [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/)

## License

The Earthquakes API is licensed under the GNU General Public License (GPL) v3.0. This license grants users the freedom to use, modify, and distribute the software under certain conditions. You can find the full text of the license in the [LICENSE](https://github.com/axelnt/Earthquakes-API/blob/main/LICENSE) file.

Please note that the GNU GPL v3.0 is a copyleft license, which means that any modifications or derivative works of the Earthquakes API must also be licensed under the GPL v3.0.

For more information about the GNU General Public License (GPL) v3.0, you can visit the [GNU website](https://www.gnu.org/licenses/gpl-3.0.en.html).
