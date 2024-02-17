CREATE DATABASE planes;
CREATE TABLE Planes_Table (
    AirlineName VARCHAR(300),
    a FLOAT,
    b FLOAT,
    c FLOAT,
    Seats FLOAT,
    PassengerLoadFactor FLOAT,
    CargoFactor FLOAT,
    EconomyFactor FLOAT,
    PremiumFactor FLOAT,
    BusinessFactor FLOAT,
    FirstClassFactor FLOAT, 
    EmissionFactor FLOAT,
    NonCO2Effects FLOAT,
    PreProduction FLOAT,
    AircraftFactor FLOAT,
    AirportInfrastructure FLOAT,
);

INSERT INTO planes (AirlineName, a, b, c, Seats, PassengerLoadFactor,
                    CargoFactor, EconomyFactor, PremiumFactor, BusinessFactor, 
                    FirstClassFactor, EmissionFactor, NonCO2Effects, PreProduction, 
                    AircraftFactor, AirportInfrastructure)
VALUES 
('Alaska', 0.000007, 2.775, 1260.608, 150.2857, 0.796,
        0.26, 1, 1, 1.5, 1.5, 3.16, 0.538, 3, 0.00034, 11.68),
('Delta (SH)', 0.000007, 2.775, 1260.608, 158, 0.796,
        0.26, 1, 1, 1.5, 1.5, 3.16, 0.538, 3, 0.00034, 11.68),
('Delta (LH)', 0.00029, 3.475, 3259.691, 245, 0.82,
        0.26, 1, 1.5, 4, 5, 3.16, 0.538, 3, 0.00034, 11.68),
('American (SH)', 0.000007, 2.775, 1260.608, 156.3333, 0.796,
        0.26, 1, 1, 1.5, 1.5, 3.16, 0.538, 3, 0.00034, 11.68),
('American (LH)', 0.00029, 3.475, 3259.691, 275, 0.82,
        0.26, 1, 1.5, 4, 5, 3.16, 0.538, 3, 0.00034, 11.68),
('Southwest', 0.000007, 2.775, 1260.608, 159, 0.796,
        0.26, 1, 1, 1.5, 1.5, 3.16, 0.538, 3, 0.00034, 11.68);