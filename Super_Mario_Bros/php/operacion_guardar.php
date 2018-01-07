<?php
	$lifes = $_POST['lifes'];
	$coins = $_POST['coins'];
	$score = $_POST['score'];
	$time = $_POST['time'];
	
    require("conexion.php");
	$query = "INSERT INTO ranking(lifes,coins,score,time) VALUES('$lifes','$coins','$score','$time')";
	$resultado = $conexion->query($query);
	
	if($resultado){
		echo "Insercion exitosa";
	}
	else{
		echo "Insercion no exitosa";
	}
?>