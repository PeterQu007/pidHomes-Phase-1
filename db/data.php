<?php 
// if (isset($_POST["postTitle"]))
// {
//   $title = $_POST["postTitle"];
//   // echo $title;
//   // echo " is your tab title";
//   print_r($title);
// } 
// else 
// {
//   $title = null;
//   echo "<p>no postTitle supplied</p>";
// }

// if (isset($_POST["postID"]))
// {
//   $ID = $_POST["postID"];
//   // echo $ID;
//   // echo " is your tab id";
//   print_r($ID);
// } 
// else 
// {
//   $ID = null;
//   echo "<p>no tab ID supplied</p>";
// }
/* <div > <?php echo $title . $ID ?> </div> */
?> 
<?php 

  $mysqli = new mysqli("localhost", "root", "root", "local");

  $strSql = "SELECT City_Name FROM pid_cities WHERE city_ID=1";
  $mysqli->real_query($strSql);
  $res = $mysqli->use_result();

  while ($row = $res->fetch_assoc()){
    echo $row['City_Name'];
  }

?>