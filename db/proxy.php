
<?php
/********************
 *    lang: "E",
      dguid: "2016A00055915004",
      topic: 5,
      notes: 0,
      stat: 0
    0 = All topics
    1 = Aboriginal peoples
    2 = Education
    3 = Ethnic origin
    4 = Families, households and marital status
    5 = Housing
    6 = Immigration and citizenship
    7 = Income
    8 = Journey to work
    9 = Labour
    10 = Language
    11 = Language of work
    12 = Mobility
    13 = Population
    14 = Visible minority

 */
error_reporting(E_ALL);
ini_set('display_errors', 1);
function url(){
  return sprintf(
    "%s://%s%s",
    isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
    $_SERVER['SERVER_NAME'] ,
    ""  // $_SERVER['REQUEST_URI']
  );
}

// echo url();

include_once('D:\wamp64\www\pidRealty\app\public\wp-content\themes\realhomes-child\inc\debug.php');
// $X = set_debug(__FILE__);

$url = (isset($_GET['url'])) ? $_GET['url'] : false;
$lang = (isset($_GET['lang'])) ? $_GET['lang'] : 'E';
$dguid = (isset($_GET['dguid'])) ? $_GET['dguid'] : '2016A00055915004' /* Surrey */; 
// $dguid = (isset($_GET['dguid'])) ? $_GET['dguid'] : '2016A00055915015' /* Richmond */ ;
// $dguid = (isset($_GET['dguid'])) ? $_GET['dguid'] : '2016A00055915022' /* Vancouver */ ;
// $dguid = (isset($_GET['dguid'])) ? $_GET['dguid'] : '2016A00055915025' /* Burnaby */ ;
// $dguid = (isset($_GET['dguid'])) ? $_GET['dguid'] : '2016A00055915034' /* Coquitlam */ ;
// print_X($X, __LINE__, $dguid);

if(isset($_GET['city_code'])){
    $city_code = $_GET['City_Code'];
}else{
    $mysqli = new mysqli("localhost", "root", "root", "local");
    $sql_query = "SELECT City_Code FROM pid_census_subdivision_bc WHERE GEO_UID='" . $dguid . "'";
    $mysqli->real_query($sql_query);
    $result = $mysqli->use_result();
    $city_code = $result->fetch_assoc()['City_Code'];
    // echo $city_code . '</br>';
    $mysqli->close();
}
// SETUP TOPIC THEME:
$topic = (isset($_GET['topic'])) ? $_GET['topic'] : 0;
$notes = (isset($_GET['notes'])) ? $_GET['notes'] : 0;
$stat = (isset($_GET['stat'])) ? $_GET['stat'] : 0;
$referer_test = true;
// $url = "https://www12.statcan.gc.ca/rest/census-recensement/CPR2016.json?lang=E&dguid=2016A00055915004&topic=5&notes=0&stat=0";
$url = "https://www12.statcan.gc.ca/rest/census-recensement/CPR2016.json?";
//$url_query = lang=E&dguid=2016A00055915004&topic=5&notes=0&stat=0
$url_query = 'lang=' . $lang . '&dguid=' . $dguid . '&topic=' . $topic . '&notes=' . $notes . '&stat=' . $stat;
$url .= $url_query;
// echo $url;

if (!$url) {
    exit;
}
// https://pidrealty.local/wp-content/themes/realhomes-child/db/proxy.php


$referer = (isset($_SERVER['HTTP_REFERER'])) ? strtolower($_SERVER['HTTP_REFERER']) : false;
// echo $referer;
$is_allowed = $referer && strpos($referer, strtolower($_SERVER['SERVER_NAME'])) !== false; //deny abuse of your proxy from outside your site
// echo strpos($referer, strtolower($_SERVER['SERVER_NAME']));
// echo $_SERVER['SERVER_NAME'];
// echo $_SERVER['HTTP_REFERER'];
// var_dump($_SERVER);

$string = ($is_allowed or $referer_test) ? utf8_encode(file_get_contents($url)) : 'You are not allowed to use this proxy!';
$string = ltrim($string, '//');
// var_dump($string->columns);
$demographics = json_decode($string);
// var_dump($demographics);
// var_dump($demographics->COLUMNS);
?>
    <div>
        <table>
            <tr>
                <th> Row_ID </th> <th> | </th>
            <?php
                foreach($demographics->COLUMNS as $field){
                    switch($field){
                        case 'PROV_TERR_ID':
                        case 'PROV_TERR_NAME_NOM':
                        case 'NOTE_ID':
                        case 'NOTE':
                        continue 2;
                        default:
                        break;
                    }
                    echo ' <th>' . $field . '</th> <th> | </th>' ;
                }
            ?>
            </tr>
<?php
$geo_uid = array_search('GEO_UID', $demographics->COLUMNS);
$geo_id = array_search('GEO_ID', $demographics->COLUMNS);
$geo_type = array_search('GEO_TYPE', $demographics->COLUMNS);
$indent_id = array_search('INDENT_ID', $demographics->COLUMNS);
$topic_theme_id = array_search('TOPIC_THEME', $demographics->COLUMNS);
$text_name_nom = array_search('TEXT_NAME_NOM', $demographics->COLUMNS);
$t_data_donnee = array_search('T_DATA_DONNEE', $demographics->COLUMNS);
$m_data_donnee = array_search('M_DATA_DONNEE', $demographics->COLUMNS);
$f_data_donnee = array_search('F_DATA_DONNEE', $demographics->COLUMNS);
$text_id = array_search('TEXT_ID', $demographics->COLUMNS);
// var_dump($topic_theme_id);
// $json = json_encode($string);
$json = $string;
/**************
 * 
 */
$sql_row_for_population_table =[];
$sql_row_for_housing_table = [];
$sql_row_for_ethnicity_table = [];
$sql_row_for_ethnicity_minority_group = [];

// $sql_row_for_population_table['TEXT_ID'] = 5;
$sql_rows_for_population_table = [];
$sql_rows_for_Housing = [];
$sql_rows_for_ethnicity = [];
$sql_rows_for_ethnicity_minority_group =[];
// var_dump($sql_row_for_population_table);

$level =1 ;
$row_id =1;
$sql_row_for_population_table = array();
$sql_row_for_population_table['City_Code'] = $city_code;
$sql_row_for_population_table['GEO_UID'] = $demographics->DATA[0][$geo_uid];
$sql_row_for_population_table['GEO_ID'] = $demographics->DATA[0][$geo_id];
$sql_row_for_population_table['GEO_TYPE'] = $demographics->DATA[0][$geo_type];
$sql_row_for_population_table['Year'] = strval(substr($demographics->DATA[0][$geo_uid], 0, 4));
// $sql_row_for_population_table['TEXT_ID'] = $demographics->DATA[0][$text_id];
// $sql_row_for_population_table['HIER_ID'] = $demographics->DATA[0][array_search('HIER_ID', $demographics->COLUMNS)];
// $sql_row_for_population_table['INDENT_ID'] = $demographics->DATA[0][$indent_id];

$sql_row_for_housing_table = array();
$sql_row_for_housing_table['City_Code'] = $city_code;
$sql_row_for_housing_table['GEO_UID'] = $demographics->DATA[0][$geo_uid];
$sql_row_for_housing_table['GEO_ID'] = $demographics->DATA[0][$geo_id];
$sql_row_for_housing_table['GEO_TYPE'] = $demographics->DATA[0][$geo_type];
$sql_row_for_housing_table['Year'] = strval(substr($demographics->DATA[0][$geo_uid], 0, 4));

$sql_row_for_ethnicity_table = array();
$sql_row_for_ethnicity_table['City_Code'] = $city_code;
$sql_row_for_ethnicity_table['GEO_UID'] = $demographics->DATA[0][$geo_uid];
$sql_row_for_ethnicity_table['GEO_ID'] = $demographics->DATA[0][$geo_id];
$sql_row_for_ethnicity_table['GEO_TYPE'] = $demographics->DATA[0][$geo_type];
$sql_row_for_ethnicity_table['Year'] = strval(substr($demographics->DATA[0][$geo_uid], 0, 4));
$sql_row_for_ethnicity_table['TEXT_ID'] = $demographics->DATA[0][$text_id];
$sql_row_for_ethnicity_table['HIER_ID'] = $demographics->DATA[0][array_search('HIER_ID', $demographics->COLUMNS)];
$sql_row_for_ethnicity_table['INDENT_ID'] = $demographics->DATA[0][$indent_id];
$sql_row_for_ethnicity_table['TOPIC_THEME'] = 'IMMIGRATION';
$sql_row_for_ethnicity_table['Minority_from_Country'] = "ALL";

$sql_row_for_ethnicity_minority_group = array();
$sql_row_for_ethnicity_minority_group['City_Code'] = $city_code;
$sql_row_for_ethnicity_minority_group['GEO_UID'] = $demographics->DATA[0][$geo_uid];
$sql_row_for_ethnicity_minority_group['GEO_ID'] = $demographics->DATA[0][$geo_id];
$sql_row_for_ethnicity_minority_group['GEO_TYPE'] = $demographics->DATA[0][$geo_type];
$sql_row_for_ethnicity_minority_group['Year'] = strval(substr($demographics->DATA[0][$geo_uid], 0, 4));
$sql_row_for_ethnicity_minority_group['TEXT_ID'] = $demographics->DATA[0][$text_id];
$sql_row_for_ethnicity_minority_group['HIER_ID'] = $demographics->DATA[0][array_search('HIER_ID', $demographics->COLUMNS)];
$sql_row_for_ethnicity_minority_group['INDENT_ID'] = $demographics->DATA[0][$indent_id];
$sql_row_for_ethnicity_minority_group['TOPIC_THEME'] = 'MINORITY';

foreach($demographics->DATA as $datarow){
    $output = false;
    $text_id_value = $datarow[$text_id];
    switch ($datarow[$topic_theme_id]) {
        case 'Aboriginal peoples' : //1
            continue 2;
        break;
        case 'Education' : //2
            $level =1;
            if(!(strval($datarow[$text_id])<=28014)){
                continue 2;
            }
        break;
        case 'Families, households and marital status' : // 4
            $level = 2;
            if(!(strval($datarow[$text_id])<=3009)){
                continue 2;
            }
        break;

        case 'Housing' : // 5: 
            switch(true){
                case $text_id_value >=27000 and $text_id_value <=27006 :
                break;
                case $text_id_value >=27054 and $text_id_value <=27065 :
                break;
                default: 
                continue 3;
            }
        break;

        case 'Immigration and citizenship' : // 6: 
            switch(true){
                case $text_id_value >=17000 and $text_id_value <=18999 :
                break;
                case $text_id_value >=23000 and $text_id_value <=23100 :
                break;
                default: 
                continue 3;
            }
        break;

        case 'Income' : //7
            $level = 1;
            if(!(strval($datarow[$text_id]) >= 13000 AND strval($datarow[$text_id]) < 13018)){
                // echo 'yes';
                continue 2;
            }
        break;


        case 'Population': // 13: //
            switch(true){
                case $text_id_value >=1000 and $text_id_value <=1999 :
                break;
                case $text_id_value >=2000 and $text_id_value <=2033 :
                break;
                default: 
                continue 3;
            }
        break;

        case 'Visible minority': // 14: // 
            $level = 2;
            switch(true){
                case $text_id_value >=25001 and $text_id_value <=25013 :
                break;
                default:
                continue 3;
            }
        break;

        default :

        continue 2;

    }

    if($datarow[$indent_id] <= $level){
        $field_id = 0;
        echo '<tr><td>'. $row_id++ . '</td><td> | </td>';
        foreach($datarow as $cell){
            // echo '$cell';
            switch($demographics->COLUMNS[$field_id]){
                case 'PROV_TERR_ID':
                case 'PROV_TERR_NAME_NOM':
                case 'NOTE_ID':
                case 'NOTE':
                    $field_id++;
                continue 2;
                default:
                break;
            }
            $field_id++;
            echo '<td>' . strval($cell) . '</td> <td> | </td>';
        }

        echo '</tr><tr>';
        $field_id = 0;
        foreach ($datarow as $cell) {
            switch($demographics->COLUMNS[$field_id++]){
                case 'PROV_TERR_ID':
                case 'PROV_TERR_NAME_NOM':
                case 'NOTE_ID':
                case 'NOTE':
                continue 2;
                default:
                break;
            }
            // echo '$cell';
            echo '<td>-------</td> <td> | </td>';
        }
        echo '</tr>';
        
        // echo $datarow[$topic_theme_id]; echo '</br>';
        // echo $datarow[$text_name_nom]; echo '</br>';

        switch(trim($datarow[$topic_theme_id])){ // By TOPIC_THEME
            case 'Population' :
                switch(trim($datarow[$text_name_nom])){
                    case 'Population, 2016':
                        // echo $t_data_donnee;
                        $sql_row_for_population_table['Population'] = $datarow[$t_data_donnee];
                    break;
                    case 'Population percentage change, 2011 to 2016':
                        $sql_row_for_population_table['Population_Change'] = $datarow[$t_data_donnee];
                    break;
                    case 'Population density per square kilometre':
                        $sql_row_for_population_table['Population_Density_per_square_kilometre'] = $datarow[$t_data_donnee];
                    break;
                    case 'Land area in square kilometres':
                        $sql_row_for_population_table['Land_Area_in_Square_Kilometres'] = $datarow[$t_data_donnee];
                    break;
                    case 'Average age of the population' :
                        $sql_row_for_population_table['Average_Age'] = $datarow[$t_data_donnee];
                    break;
                    case 'Median age of the population' :
                        $sql_row_for_population_table['Median_Age'] = $datarow[$t_data_donnee];
                    break;
                    case 'Total - Age groups and average age of the population - 100% data':
                        $sql_row_for_population_table['Population_Male'] = $datarow[$m_data_donnee]; //male
                        $sql_row_for_population_table['Population_Female'] = $datarow[$f_data_donnee]; //female
                    break;
                    }
            break;
            case 'Education':
                switch(trim($datarow[$text_name_nom])){
                    case 'Total - Highest certificate, diploma or degree for the population aged 15 years and over in private households - 25% sample data':
                        $sql_row_for_population_table['Education_Total'] = $datarow[$t_data_donnee];
                    break;
                    case 'No certificate, diploma or degree':
                        $sql_row_for_population_table['Education_No_Certificate'] = $datarow[$t_data_donnee];
                    break;
                    case 'Secondary (high) school diploma or equivalency certificate':
                        $sql_row_for_population_table['Education_High_school'] = $datarow[$t_data_donnee];
                    break;
                    case 'Postsecondary certificate, diploma or degree':
                        $sql_row_for_population_table['Education_Postsecondary'] = $datarow[$t_data_donnee];
                    break;
                    default:
                        // echo $datarow[$text_name_nom]; echo '</br>';
                        // echo trim($datarow[$text_name_nom]) == 'No certificate, diploma or degree' ? 'Yes..</br>' : 'No..</br>';
                        // echo '</hr>';
                    break;
                }
            break;
            case 'Income':
                switch(trim($datarow[$text_name_nom])){
                    case 'Median total income of households in 2015 ($)':
                        $sql_row_for_population_table['Median_total_income'] = $datarow[$t_data_donnee];
                    break;
                    case 'Median after-tax income of households in 2015 ($)':
                        $sql_row_for_population_table['Median_after_tax_income'] = $datarow[$t_data_donnee];
                    break;
                    case 'Average total income of households in 2015 ($)':
                        $sql_row_for_population_table['Average_total_income'] = $datarow[$t_data_donnee];
                    break;
                    case 'Average after-tax income of households in 2015 ($)':
                        $sql_row_for_population_table['Average_after_tax_income'] = $datarow[$t_data_donnee];
                    break;
                    default:
                    break;
                }
            break;
            case 'Families, households and marital status':
                switch(trim($datarow[$text_name_nom])){
                    case 'Total - Occupied private dwellings by structural type of dwelling - 100% data':
                        $sql_row_for_population_table['Total_Private_Dwellings'] = $datarow[$t_data_donnee];
                    break;
                    case 'Single-detached house':
                        $sql_row_for_population_table['Single_Detached_House'] = $datarow[$t_data_donnee];
                    break;
                    case 'Apartment in a building that has five or more storeys':
                        $sql_row_for_population_table['Apartment_5_Or_More_Storeys'] = $datarow[$t_data_donnee];
                    break;
                    case 'Other attached dwelling':
                        $sql_row_for_population_table['Other_Attached_Dwelling'] = $datarow[$t_data_donnee];
                    break;
                    case 'Movable dwelling':
                        $sql_row_for_population_table['Movable_Dwelling'] = $datarow[$t_data_donnee];
                    break;

                    case 'Semi-detached house':
                        $sql_row_for_population_table['Semi_Detached_House'] = $datarow[$t_data_donnee];
                    break;
                    case 'Row house':
                        $sql_row_for_population_table['Townhouse'] = $datarow[$t_data_donnee];
                    break;
                    case 'Apartment or flat in a duplex':
                        $sql_row_for_population_table['Apartment_in_a_duplex'] = $datarow[$t_data_donnee];
                    break;
                    case 'Apartment in a building that has fewer than five storeys':
                        $sql_row_for_population_table['Apartment_less_than_5_Storeys'] = $datarow[$t_data_donnee];
                    break;
                    case 'Other single-attached house':
                        $sql_row_for_population_table['Other_single_attached_house'] = $datarow[$t_data_donnee];
                    break;
                    default:
                    break;
                }
            break; 
            case 'Housing':
                switch(trim($datarow[$text_name_nom])){
                    case 'Total - Private households by tenure - 25% sample data':
                        $sql_row_for_housing_table['Total_Private_Dwelling'] = $datarow[$t_data_donnee];
                    break;
                    case 'Owner':
                        $sql_row_for_housing_table['Tenure_by_Owner'] = $datarow[$t_data_donnee];
                    break;
                    case 'Renter':
                        $sql_row_for_housing_table['Tenure_by_Renter'] = $datarow[$t_data_donnee];
                    break;
                    case 'Band housing':
                        $sql_row_for_housing_table['Tenure_Other'] = $datarow[$t_data_donnee];
                    break;
                    case 'Condominium':
                        $sql_row_for_housing_table['Condominium'] = $datarow[$t_data_donnee];
                    break;
                    case 'Not condominium':
                        $sql_row_for_housing_table['Not_condominium'] = $datarow[$t_data_donnee];
                    break;
                    case '% of owner households with a mortgage':
                        $sql_row_for_housing_table['Owner_mortgage_percentage'] = $datarow[$t_data_donnee];
                    break;
                    case 'Median monthly shelter costs for owned dwellings ($)':
                        $sql_row_for_housing_table['Median_Monthly_Shelter_Costs_for_owned_dwellings'] = $datarow[$t_data_donnee];
                    break;
                    case 'Average monthly shelter costs for owned dwellings ($)':
                        $sql_row_for_housing_table['Average_Monthly_Shelter_Costs_for_owned_dwellings'] = $datarow[$t_data_donnee];
                    break;
                    case 'Median monthly shelter costs for rented dwellings ($)':
                        $sql_row_for_housing_table['Median_Monthly_Shelter_Costs_for_rented_dwellings'] = $datarow[$t_data_donnee];
                    break;
                    case 'Average monthly shelter costs for rented dwellings ($)':
                        $sql_row_for_housing_table['Average_Monthly_Shelter_Costs_for_rented_dwellings'] = $datarow[$t_data_donnee];
                    break;
                    default:
                    break;
                }
            break;  
            case 'Immigration and citizenship':
                switch(trim($datarow[$text_name_nom])){
                    case 'Non-immigrants':
                        $sql_row_for_ethnicity_table['Non_immigrants'] = $datarow[$t_data_donnee];
                    break;
                    case 'Immigrants':
                        $sql_row_for_ethnicity_table['Immigrants'] = $datarow[$t_data_donnee];
                    break;
                    case 'Non-permanent residents':
                        $sql_row_for_ethnicity_table['Non_permanent_residents'] = $datarow[$t_data_donnee];
                    break;
                    case 'Economic immigrants':
                        $sql_row_for_ethnicity_table['Economic_immigrants'] = $datarow[$t_data_donnee];
                    break;
                    case 'Immigrants sponsored by family':
                        $sql_row_for_ethnicity_table['Immigrants_sponsored_by_family'] = $datarow[$t_data_donnee];
                    break;
                    case 'Refugees':
                        $sql_row_for_ethnicity_table['Refugees'] = $datarow[$t_data_donnee];
                    break;
                    case 'Other immigrants':
                        $sql_row_for_ethnicity_table['Other_immigrants'] = $datarow[$t_data_donnee];
                    break;
                    default:
                    break;
                }
            break; 
            case 'Visible minority':
                switch(trim($datarow[$text_name_nom])){
                    case 'Total visible minority population':
                        $sql_row_for_ethnicity_table['Total_visible_minority_population'] = $datarow[$t_data_donnee];
                    break;
                    default:
                        $sql_row_for_ethnicity_minority_group['Minority_from_Country'] = trim($datarow[$text_name_nom]);
                        $sql_row_for_ethnicity_minority_group['Total_visible_minority_population'] =$datarow[$t_data_donnee];
                        $sql_rows_for_ethnicity_minority_group[] = $sql_row_for_ethnicity_minority_group;
                    break;
                }
            break; 
        }
    }
}

//$sql_rows_for_Housing[] = $sql_row_for_housing_table;
// $sql_rows_for_population_table[] = $sql_row_for_population_table;
$sql_rows_for_ethnicity[] =$sql_row_for_ethnicity_table;
foreach($sql_rows_for_ethnicity_minority_group as $row){
    $sql_rows_for_ethnicity[] = $row;
}

?>

        </table>
    </div>
<?php

var_dump($sql_row_for_housing_table);
// var_dump($sql_row_for_ethnicity_table);
// var_dump($sql_rows_for_ethnicity_minority_group);
// var_dump($sql_rows_for_ethnicity);
// var_dump($sql_rows_for_population_table);

$mysqli = new mysqli("localhost", "root", "root", "local");
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

/***********************
 * Populate pid_population TABLE
 */
$sql_query = "SELECT count(GEO_UID) count FROM pid_population WHERE GEO_UID='" . $sql_row_for_population_table['GEO_UID'] . "'";
// printf($sql_query);
$mysqli->real_query($sql_query);
$res = $mysqli->use_result();
if($res->fetch_assoc()['count'] == 0) {
    $res->close(); //release first query;
    $sql_insert = "INSERT INTO pid_population (City_Code,GEO_UID,GEO_ID,GEO_TYPE,
                                `Year`,Population,Population_Male,Population_Female,Population_Change,
                                Population_Density_per_square_kilometre,Land_Area_in_Square_Kilometres,Median_Age,Average_Age,
                                Total_Private_Dwellings,Single_Detached_House,Apartment_5_Or_More_Storeys,
                                Other_Attached_Dwelling,Semi_Detached_House,Townhouse,Apartment_less_than_5_Storeys,
                                Apartment_in_a_duplex,Other_single_attached_house,Movable_Dwelling,
                                Median_total_income,Median_after_tax_income,Average_total_income,Average_after_tax_income,
                                Education_Total,Education_No_Certificate,Education_High_school,Education_Postsecondary ) 
                                VALUES(?,?,?,?,
                                ?,?,?,?,?,
                                ?,?,?,?,
                                ?,?,?,
                                ?,?,?,?,
                                ?,?,?,
                                ?,?,?,?,
                                ?,?,?,?)";
                                    
    if($stmt = $mysqli->prepare($sql_insert)){
    $stmt->bind_param('ssssiiiidddddiiiiiiiiiiddddiiii', 
                            $sql_row_for_population_table['City_Code'],
                            $sql_row_for_population_table['GEO_UID'],
                            $sql_row_for_population_table['GEO_ID'],
                            $sql_row_for_population_table['GEO_TYPE'],
                            $sql_row_for_population_table['Year'],
                            $sql_row_for_population_table['Population'],
                            $sql_row_for_population_table['Population_Male'],
                            $sql_row_for_population_table['Population_Female'],
                            $sql_row_for_population_table['Population_Change'],
                            $sql_row_for_population_table['Population_Density_per_square_kilometre'],
                            $sql_row_for_population_table['Land_Area_in_Square_Kilometres'],
                            $sql_row_for_population_table['Median_Age'],
                            $sql_row_for_population_table['Average_Age'],
                            $sql_row_for_population_table['Total_Private_Dwellings'],
                            $sql_row_for_population_table['Single_Detached_House'],
                            $sql_row_for_population_table['Apartment_5_Or_More_Storeys'],
                            $sql_row_for_population_table['Other_Attached_Dwelling'],
                            $sql_row_for_population_table['Semi_Detached_House'],
                            $sql_row_for_population_table['Townhouse'],
                            $sql_row_for_population_table['Apartment_less_than_5_Storeys'],
                            $sql_row_for_population_table['Apartment_in_a_duplex'],
                            $sql_row_for_population_table['Other_single_attached_house'],
                            $sql_row_for_population_table['Movable_Dwelling'],
                            $sql_row_for_population_table['Median_total_income'],
                            $sql_row_for_population_table['Median_after_tax_income'],
                            $sql_row_for_population_table['Average_total_income'],
                            $sql_row_for_population_table['Average_after_tax_income'],
                            $sql_row_for_population_table['Education_Total'],
                            $sql_row_for_population_table['Education_No_Certificate'],
                            $sql_row_for_population_table['Education_High_school'],
                            $sql_row_for_population_table['Education_Postsecondary']
                        );
    $stmt->execute();
    $stmt->close();
    }else{
        $error = $mysqli->errno . ' ' . $mysqli->error;
        echo __LINE__ . ' ' . $error;
    };
}else{
    $res->close();
    printf("error::population record exists!!!/n/l");
}

/*****************
 * Populate pid_Housing TABLE
 */
$sql_query = "SELECT count(GEO_UID) count FROM pid_housing WHERE GEO_UID='" . $sql_row_for_housing_table['GEO_UID'] . "'";
// printf($sql_query);
$mysqli->real_query($sql_query);
$res = $mysqli->use_result();
if($res->fetch_assoc()['count'] == 0) {
    $res->close(); //release first query;
    $sql_insert = "INSERT INTO pid_housing (City_Code,GEO_UID,GEO_ID,GEO_TYPE,
                                `Year`,Total_Private_Dwelling, Condominium, Not_condominium,
                                Tenure_by_Owner, Tenure_by_Renter, Tenure_Other,
                                Owner_mortgage_percentage, 
                                Median_Monthly_Shelter_Costs_for_owned_dwellings, Average_Monthly_Shelter_Costs_for_owned_dwellings,
                                Median_Monthly_Shelter_Costs_for_rented_dwellings, Average_Monthly_Shelter_Costs_for_rented_dwellings)
                                VALUES(?,?,?,?,
                                ?,?,?,?,
                                ?,?,?,?,
                                ?,?,
                                ?,?
                                )";
                                    
    if($stmt = $mysqli->prepare($sql_insert)){
        echo '<br> housing stmt OK </br>';
        $stmt->bind_param('ssssiiiiiiiddddd', 
                                $sql_row_for_housing_table['City_Code'],
                                $sql_row_for_housing_table['GEO_UID'],
                                $sql_row_for_housing_table['GEO_ID'],
                                $sql_row_for_housing_table['GEO_TYPE'],
                                $sql_row_for_housing_table['Year'],
                                $sql_row_for_housing_table['Total_Private_Dwelling'],
                                $sql_row_for_housing_table['Condominium'],
                                $sql_row_for_housing_table['Not_condominium'],
                                $sql_row_for_housing_table['Tenure_by_Owner'],
                                $sql_row_for_housing_table['Tenure_by_Renter'],
                                $sql_row_for_housing_table['Tenure_Other'],
                                $sql_row_for_housing_table['Owner_mortgage_percentage'],
                                $sql_row_for_housing_table['Median_Monthly_Shelter_Costs_for_owned_dwellings'],
                                $sql_row_for_housing_table['Average_Monthly_Shelter_Costs_for_owned_dwellings'],
                                $sql_row_for_housing_table['Median_Monthly_Shelter_Costs_for_rented_dwellings'],
                                $sql_row_for_housing_table['Average_Monthly_Shelter_Costs_for_rented_dwellings']
                            );
        if($stmt->execute()){
            echo '</br>housing record affected: ';
            echo $stmt->affected_rows;
            echo '</br>';
            $stmt->close();
        }else{
            $error = $mysqli->errno . ' ' . $mysqli->error;
            echo __LINE__ . ' ' . $error;
        };
    }else{
        $error = $mysqli->errno . ' ' . $mysqli->error;
        echo __LINE__ . ' ' . $error;
    };
}else{
    printf("error::housing record exists!!!");
    $res->close();
}

/**********************
 * Populate Ethnicity TABLE
 */
// if(true){
//     exit;
// }

$sql_query = "SELECT count(GEO_UID) count FROM pid_ethnicity WHERE GEO_UID='" . $sql_row_for_ethnicity_table['GEO_UID'] . "'";
printf("\n%s\n",$sql_query);
$mysqli->real_query($sql_query);
$error = $mysqli->errno . ' ' . $mysqli->error;
echo '</br>'. __LINE__ . ' ' . $error;
$res = $mysqli->use_result();
if($res->fetch_assoc()['count'] == 0) {
    $res->close(); //release first query;
    $sql_insert = "INSERT INTO pid_ethnicity (City_Code,GEO_UID,GEO_ID,GEO_TYPE, TEXT_ID, HIER_ID, INDENT_ID, TOPIC_THEME,
                                `Year`,Immigrants, Non_immigrants, Non_permanent_residents, 
                                Economic_immigrants, Immigrants_sponsored_by_family, Refugees, Other_immigrants,
                                Total_visible_minority_population, Minority_from_Country)
                                VALUES(?,?,?,?,?,?,?,?,
                                ?,?,?,?,
                                ?,?,?,?,
                                ?,?
                                )";
    foreach($sql_rows_for_ethnicity as $row){
        if($stmt = $mysqli->prepare($sql_insert)){
            echo '<br> ethnicity stmt OK </br>';
            $stmt->bind_param('ssssssssiiiiiiiiis', 
                                    $row['City_Code'],
                                    $row['GEO_UID'],
                                    $row['GEO_ID'],
                                    $row['GEO_TYPE'],
                                    $row['TEXT_ID'],
                                    $row['HIER_ID'],
                                    $row['INDENT_ID'],
                                    $row['TOPIC_THEME'],
                                    $row['Year'],
                                    $row['Immigrants'],
                                    $row['Non_immigrants'],
                                    $row['Non_permanent_residents'],
                                    $row['Economic_immigrants'],
                                    $row['Immigrants_sponsored_by_family'],
                                    $row['Refugees'],
                                    $row['Other_immigrants'],
                                    $row['Total_visible_minority_population'],
                                    $row['Minority_from_Country'],
                                );
            if($stmt->execute()){
                echo '</br>ethnicity record affected: ';
                echo $stmt->affected_rows;
                echo '</br>';
                $stmt->close();
            }else{
                $error = $mysqli->errno . ' ' . $mysqli->error;
                echo __LINE__ . ' ' . $error;
            };
        }else{
            $error = $mysqli->errno . ' ' . $mysqli->error;
            echo '</br>' . __LINE__ . ' ' . $error;
        };
    }
}else{
    $res->close();
    printf("error::ethnicity record exists!!!");
}


//close connection
$mysqli->close();

$callback = (isset($_GET['callback'])) ? $_GET['callback'] : false;
if ($callback) {
    $jsonp = "$callback($json)";
    header('Content-Type: application/javascript');
    echo $jsonp;
    exit;
}
// echo $json;
