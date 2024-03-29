CREATE TABLE Planes_Table (
    AirlineName VARCHAR(300) PRIMARY KEY,
    a DOUBLE PRECISION (8,7),
    b DOUBLE PRECISION (8,7),
    c DOUBLE PRECISION (8,7),
    Seats DOUBLE PRECISION (8,7),
    PassengerLoadFactor DOUBLE PRECISION (8,7),
    CargoFactor DOUBLE PRECISION (8,7),
    EconomyFactor DOUBLE PRECISION (8,7),
    PremiumFactor DOUBLE PRECISION (8,7),
    BusinessFactor DOUBLE PRECISION (8,7),
    FirstClassFactor DOUBLE PRECISION (8,7), 
    EmissionFactor DOUBLE PRECISION (8,7),
    NonCO2Effects DOUBLE PRECISION (8,7),
    PreProduction DOUBLE PRECISION (8,7),
    AircraftFactor DOUBLE PRECISION (8,7),
    AirportInfrastructure DOUBLE PRECISION (8,7)
);

INSERT INTO Planes_Table (AirlineName, a, b, c, Seats, PassengerLoadFactor,
                    CargoFactor, EconomyFactor, PremiumFactor, BusinessFactor, 
                    FirstClassFactor, EmissionFactor, PreProduction,
                    NonCO2Effects, 
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
        0.26, 1, 1, 1.5, 1.5, 3.16, 0.538, 3, 0.00034, 11.68),
('United (SH)', 0.000007, 2.775, 1260.608, 145.25, 0.796,
        0.26, 1, 1, 1.5, 1.5, 3.16, 0.538, 3, 0.00034, 11.68),
('United (LH)', 0.00029, 3.475, 3259.691, 243.25, 0.82,
        0.26, 1, 1.5, 4, 5, 3.16, 0.538, 3, 0.00034, 11.68);