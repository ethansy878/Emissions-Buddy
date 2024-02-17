function calculateEmission(start, end, method){
    let distanceKm = "API: Start/End Distance";
    let method = "big or small airplane";
    
    // Begin Formula
    
    let takeoffKeroseneTons = 1.1; // 1.1 tons of kerosene
    let takeoffKeroseneKg = takeoffKeroseneTons * 907.185;

    let flyKeroseneKg = 15.8 * distanceKm;

    let CO2Kg = 3.1 * (flyKeroseneKg + takeoffKeroseneKg); 
    // 3.1 kg CO2 per 1kg of fuel used

    let passengers = "Plane Capacity"
    let personalCO2 = CO2Kg / passengers;
    return personalCO2;
}