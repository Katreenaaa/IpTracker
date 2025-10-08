# Ip Location Web App

A web app that fetches geolocation data for any IP address or domain. Built with React, Tailwind CSS, and Leaflet for interactive mapping. Users can search for an IP and view its location, ISP, and timezone on a dynamic map.

This project uses the IPIFY Geolocation API to fetch IP address data. To make it work:

1. Sign up at IPIFY and get your API key.

2. Create a .env file in the root of your project (this file should not be committed to Git).

3. Add your API key in the .env file like this: - VITE_IPIFY_API_KEY=your_api_key_here

4. Restart your development server after adding the .env file.

The project falls back to mock data if no valid API key is provided, so you can still run it locally without one.
