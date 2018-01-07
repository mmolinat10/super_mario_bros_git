<?php
    require("conexion.php");
	$query = "SELECT lifes, coins, score, time FROM ranking ORDER BY score DESC, coins DESC, lifes DESC, time DESC LIMIT 10";
	$resultado = mysqli_query($conexion, $query);
	
	$usuarios = array();

    while ($obj = mysqli_fetch_object($resultado)) {
    $usuarios[] = array('lifes' => $obj->lifes,
                   'coins' => $obj->coins,
                   'score' => $obj->score,
                   'time' => $obj->time);
    }
  //--------------------------------------------------------------------------
  //echo result as json 
  //--------------------------------------------------------------------------
    
    echo json_encode($usuarios);

?>