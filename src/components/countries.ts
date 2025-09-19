export interface CityCountryInterface {
    name: string;
    lat: number;
    lng: number;
}

export interface CountriesDataInterface {
    name: string;
    cities: CityCountryInterface[];
}

export const countriesData: CountriesDataInterface[] = [
    {
        "name": "Indonesia",
        "cities": [
            { "name": "Jakarta", "lat": -6.2088, "lng": 106.8456 },
            { "name": "Bali", "lat": -8.3405, "lng": 115.0920 },
            { "name": "Surabaya", "lat": -7.2575, "lng": 112.7521 },
            { "name": "Bandung", "lat": -6.9175, "lng": 107.6191 },
            { "name": "Medan", "lat": 3.5952, "lng": 98.6722 }
        ]
    },
    {
        "name": "United States",
        "cities": [
            { "name": "New York", "lat": 40.7128, "lng": -74.0060 },
            { "name": "Los Angeles", "lat": 34.0522, "lng": -118.2437 },
            { "name": "San Francisco", "lat": 37.7749, "lng": -122.4194 },
            { "name": "Chicago", "lat": 41.8781, "lng": -87.6298 },
            { "name": "Houston", "lat": 29.7604, "lng": -95.3698 }
        ]
    },
    {
        "name": "Japan",
        "cities": [
            { "name": "Tokyo", "lat": 35.6895, "lng": 139.6917 },
            { "name": "Osaka", "lat": 34.6937, "lng": 135.5023 },
            { "name": "Kyoto", "lat": 35.0116, "lng": 135.7681 },
            { "name": "Sapporo", "lat": 43.0618, "lng": 141.3545 },
            { "name": "Fukuoka", "lat": 33.5902, "lng": 130.4017 }
        ]
    },
    {
        "name": "Germany",
        "cities": [
            { "name": "Berlin", "lat": 52.5200, "lng": 13.4050 },
            { "name": "Munich", "lat": 48.1351, "lng": 11.5820 },
            { "name": "Hamburg", "lat": 53.5511, "lng": 9.9937 },
            { "name": "Frankfurt", "lat": 50.1109, "lng": 8.6821 },
            { "name": "Cologne", "lat": 50.9375, "lng": 6.9603 }
        ]
    },
    {
        "name": "Australia",
        "cities": [
            { "name": "Sydney", "lat": -33.8688, "lng": 151.2093 },
            { "name": "Melbourne", "lat": -37.8136, "lng": 144.9631 },
            { "name": "Brisbane", "lat": -27.4698, "lng": 153.0251 },
            { "name": "Perth", "lat": -31.9505, "lng": 115.8605 },
            { "name": "Adelaide", "lat": -34.9285, "lng": 138.6007 }
        ]
    }
]
