SELECT GEO_NAME_NOM, a.City_Code FROM pid_census_subdivision_bc a
RIGHT JOIN pid_cities c ON GEO_NAME_NOM = c.City_Name
WHERE GEO_UID='2016A00055915004';

UPDATE pid_census_subdivision_bc, 
	(SELECT City_Code, City_Name FROM pid_cities) AS City_Codes
SET pid_census_subdivision_bc.City_Code = City_Codes. City_Code
WHERE GEO_NAME_NOM = City_Codes.City_Name;