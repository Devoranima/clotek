<?php
ini_set('display_errors','On');
error_reporting('E_ALL');

$name = $_POST['name'];
$phone = $_POST['num'];
$text = $_POST['message'];

$name = htmlspecialchars($name);
$phone = htmlspecialchars($phone);
$text = htmlspecialchars($text);

$name = urldecode($name);
$phone = urldecode($phone);
$text = urldecode($text);

$name = trim($name);
$text = trim($text);


if ($_POST['submit']){
  
echo $name;
echo "<br>";
echo $phone;
echo "<br>";
echo $text;
}